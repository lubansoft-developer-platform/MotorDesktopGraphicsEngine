/* Copyright (C) 2005-2017, UNIGINE Corp. All rights reserved.
 *
 * This file is a part of the UNIGINE 2.6.1.1 SDK.
 *
 * Your use and / or redistribution of this software in source and / or
 * binary form, with or without modification, is subject to: (i) your
 * ongoing acceptance of and compliance with the terms and conditions of
 * the UNIGINE License Agreement; and (ii) your inclusion of this notice
 * in any version of this software that you use or redistribute.
 * A copy of the UNIGINE License Agreement is available by contacting
 * UNIGINE Corp. at http://unigine.com/
 */


#ifndef FRAGMENT_SAMPLE_BASE
	#define FRAGMENT_SAMPLE_BASE
	
	#include <core/shaders/common/fragment.h>
	
	#ifdef PARALLAX
		#include <core/shaders/common/parallax.h>
	#endif
	
	// input texture
	INIT_TEXTURE(0,TEX_COLOR)
	INIT_TEXTURE(1,TEX_SHADING)
	INIT_TEXTURE(2,TEX_NORMAL)
	
	#ifdef DETAIL
		INIT_TEXTURE(3,TEX_COLOR_DETAIL)
		INIT_TEXTURE(4,TEX_SHADING_DETAIL)
		INIT_TEXTURE(5,TEX_NORMAL_DETAIL)
		
		#ifdef DETAIL_MASK
			INIT_TEXTURE(6,TEX_DETAIL_MASK)
		#endif
	#endif
	
	#ifdef AO_MAP
		INIT_TEXTURE(7,TEX_AO)
	#endif
	
	#ifdef MICROFIBER_MAP && SPECULAR
		INIT_TEXTURE(9,TEX_MICROFIBER)
	#endif
	
	#ifdef TRANSLUCENT_MAP
		INIT_TEXTURE(11,TEX_TRANSLUCENT)
	#endif
	
	#ifdef PARALLAX
		INIT_TEXTURE(10,TEX_PARALLAX)
	#endif
	
	#ifdef LIGHTMAP
		INIT_TEXTURE(8,TEX_LIGHTMAP)
	#endif
	
	#ifdef NOISE_2D
		INIT_TEXTURE(13,TEX_NOISE_2D)
	#endif
	
	#ifdef NOISE_3D
		INIT_TEXTURE_3D(14,TEX_NOISE_3D)
		INIT_TEXTURE(15,TEX_NOISE_3D_GRADIENT)
	#endif
		INIT_TEXTURE(19,TEX_PATCH_COLOR)
		INIT_TEXTURE(20, TEX_PATCH_VISIBLE)
		INIT_TEXTURE(21, TEX_PRETRANS_IMAGE)
		
		INIT_TEXTURE(22, TEX_PRETRANS_AREA)
	
	CBUFFER(parameters)
		
		UNIFORM float4	m_color;
		UNIFORM float4	m_shading;
		UNIFORM float	m_normal_scale;
		UNIFORM float	m_translucent;
		
		#ifdef SPECULAR
			UNIFORM float m_microfiber;
		#endif
		
		UNIFORM float m_transparent;
		UNIFORM float m_transparent_pow;
		
		UNIFORM float4 m_uv_transform;
		
		UNIFORM float4 m_ao_uv_transform;
		
		#ifdef BASE_MAPPING_TRIPLANAR
			UNIFORM float m_triplanar_blend;
		#endif
		
		#ifdef DETAIL
			UNIFORM float4	m_detail_color;
			UNIFORM float4	m_detail_shading;
			
			UNIFORM float4	m_detail_color_visible;
			UNIFORM float4	m_detail_shading_visible;
			UNIFORM float	m_detail_normal_visible;
			
			UNIFORM float	m_detail_visible;
			UNIFORM float	m_detail_visible_threshold;
			
			#ifdef DETAIL_ANGLE_FADE
				UNIFORM float m_detail_angle_fade;
				UNIFORM float m_detail_angle_fade_threshold;
			#endif
			
			#ifdef !DETAIL_MAPPING_BASE
				UNIFORM float4 m_detail_uv_transform;
			#endif
			#ifdef DETAIL_MAPPING_TRIPLANAR
				UNIFORM float m_detail_triplanar_blend;
			#endif
			
			#ifdef DETAIL_MASK && (!DETAIL_MASK_MAPPING_BASE) && (!DETAIL_MASK_MAPPING_DETAIL)
				UNIFORM float4 m_detail_mask_uv_transform;
				#ifdef DETAIL_MASK_MAPPING_TRIPLANAR
					UNIFORM float m_detail_mask_triplanar_blend;
				#endif
			#endif
		#endif
		
		#ifdef PARALLAX
			PARALLAX_PARAMETERS
			#ifdef PARALLAX_SHADOW
				PARALLAX_SHADOW_PARAMETERS
			#endif
		#endif
		
		#ifdef EMISSION
			UNIFORM float4	m_emission_color;
			UNIFORM float	m_emission_scale;
		#endif
		
		#ifdef AUXILIARY
			UNIFORM float4 m_auxiliary_color;
		#endif
		
		#ifdef LIGHTMAP
			UNIFORM float m_lightmap_scale;
			UNIFORM float m_lightmap_gamma;
			UNIFORM float4 m_lightmap_uv_transform;
		#endif
		
		#ifdef NOISE_2D
			UNIFORM float	m_noise_2d_scale;
			UNIFORM float4	m_noise_2d_uv_transform;
		#endif
		
		#ifdef NOISE_3D
			UNIFORM float	m_noise_3d_scale;
			UNIFORM float4	m_noise_3d_transform;
		#endif
	END
	
	//custom patch mode
	CBUFFER(parameters)
		UNIFORM float m_normal_mode;
		UNIFORM float m_select_mode;
	END
#else
	
	IF_DATA(DATA_OBLIQUE_FRUSTUM)
		if(DATA_OBLIQUE_FRUSTUM > 0.0f) discard;
	ENDIF
	
	IF_DATA(DATA_ALPHA_FADE)
		texture2DAlphaFadeDiscard(DATA_ALPHA_FADE,IN_POSITION.xy);
	ENDIF
	
	#ifdef METALNESS
		GBuffer gbuffer = GBufferDefault();
		#define GBUFFER gbuffer
	#else
		GBufferSpecular gbuffer_s = GBufferSpecularDefault();
		#define GBUFFER gbuffer_s
	#endif
	
	#include <core/shaders/mesh/common/uv_select.h>
	
	// TBN matrix
	float3 T = DATA_TANGENT;
	float3 B = float3_one;
	float3 N = DATA_NORMAL; 

	flatten if (m_normal_mode > EPSILON)
	{
		float3 cReprojecPos = getDepthToPosition(IN_POSITION.z, IN_POSITION.xy * s_viewport.zw);
		N = getPositionToNormal(cReprojecPos);
	}

	#ifdef CALCULATE_TANGENT_SPACE
		calculateTBN(T,B,N,DATA_POSITION,base_texcoord);
	#else
		B = cross(N, T) * DATA_SIGN_BINORMAL;//normalizationTBN(T,B,N,DATA_SIGN_BINORMAL);
	#endif
	
	#ifdef TWO_SIDED
		float front_face = 1.f;// IN_FRONTFACE ? 1.0f : -1.0f;
		T *= front_face;
		B *= front_face;
		N *= front_face;
	#endif
	
	float3x3 TBN = float3x3(T,B,N);
	
	float4 color = m_color;
	
	// parallax
	#ifdef PARALLAX
		float3 view = normalize(DATA_POSITION);
		
		ParallaxIn parallax_in;
		parallax_in.view_ts = normalize(mul(TBN,view));
		parallax_in.uv = base_texcoord;
		
		PARALLAX_INIT(parallax_in)
		
		#ifdef PARALLAX_CUTOUT
			
			float4 cutout_transform = parallaxCutoutUVTransform(m_parallax_cutout_uv_transform,m_uv_transform);
			
			Parallax parallax = parallaxOcclusionMapping(parallax_in,cutout_transform,TEXTURE_OUT(TEX_PARALLAX));
			
			if(parallax.height < -EPSILON) discard;
			
		#else
			Parallax parallax = parallaxOcclusionMapping(parallax_in,TEXTURE_OUT(TEX_PARALLAX));
		#endif
		
		#ifdef PARALLAX_SHADOW
			ParallaxShadowIn parallax_shadow_in;
			
			float3 light_dir = mul3(s_scattering_sun_dir,s_imodelview);
			parallax_shadow_in.light_ts = normalize(mul(TBN,light_dir));
			
			PARALLAX_SHADOW_INIT(parallax_shadow_in)
			
			float shadow = parallaxShadow(parallax_shadow_in,parallax_in,parallax,TEXTURE_OUT(TEX_PARALLAX));
			color *= shadow;
		#endif
		
		float delta_depth = parallaxDeltaDepth(parallax_in,parallax);
		
		#ifdef PARALLAX_DEPTH_CUTOUT
			float4 position = float4(DATA_POSITION,1.0f);
			
			position.xyz -= view * delta_depth;
			position = getPosition(position);
			OUT_DEPTH = position.z / position.w;
		#endif
		
		base_texcoord -= parallax.uv_offset;
		parallax.uv_offset /= m_uv_transform.xy;
		
		#ifdef DETAIL
			
			#ifdef (BASE_MAPPING_UV1 && DETAIL_MAPPING_UV1) || (BASE_MAPPING_UV0 && DETAIL_MAPPING_UV0)
				detail_texcoord -= uvTransform(parallax.uv_offset,m_detail_uv_transform);
			#endif
			
			#ifdef DETAIL_MASK && ((BASE_MAPPING_UV1 && DETAIL_MASK_MAPPING_UV1) || (BASE_MAPPING_UV0 && DETAIL_MASK_MAPPING_UV0))
				detail_mask_texcoord -= uvTransform(parallax.uv_offset,m_detail_mask_uv_transform);
			#endif
			
		#endif
		
	#endif
	
	//ambient occlusion
	#ifdef USE_GBUFFER_AO
		#ifdef AO_MAP
			#ifdef AO_MAPPING_BASE
				GBUFFER.occlusion *= TEXTURE_BASE(TEX_AO).r;
			#else
				
				#ifdef AO_MAPPING_UV0
					float2 ao_texcoord = DATA_UV.xy;
				#else
					float2 ao_texcoord = DATA_UV.zw;
				#endif
				
				#ifdef PARALLAX && ((BASE_MAPPING_UV1 && AO_MAPPING_UV1) || (BASE_MAPPING_UV0 && AO_MAPPING_UV0))
					ao_texcoord -= parallax.uv_offset;
				#endif
				
				ao_texcoord = uvTransform(ao_texcoord,m_ao_uv_transform);
				
				GBUFFER.occlusion *= TEXTURE(TEX_AO,ao_texcoord).r;
			#endif
		#endif
		
		#ifdef VERTEX_COLOR
			#ifdef VERTEX_AO_R
				GBUFFER.occlusion *= DATA_VERTEX_COLOR.r;
			#elif VERTEX_AO_G
				GBUFFER.occlusion *= DATA_VERTEX_COLOR.g;
			#elif VERTEX_AO_B
				GBUFFER.occlusion *= DATA_VERTEX_COLOR.b;
			#elif VERTEX_AO_A
				GBUFFER.occlusion *= DATA_VERTEX_COLOR.a;
			#endif
		#endif
	#endif
	
	// lightmap
	#ifdef (VERTEX_COLOR && VERTEX_LIGHTMAP) || LIGHTMAP
		
		GBUFFER.lightmap = float3_zero;
		
		#ifdef LIGHTMAP
			
			#ifdef LIGHTMAP_MAPPING_BASE
				GBUFFER.lightmap = TEXTURE_BASE(TEX_LIGHTMAP).rgb;
			#else
				#ifdef LIGHTMAP_MAPPING_UV0
					float2 lightmap_texcoord = DATA_UV.xy;
				#else
					float2 lightmap_texcoord = DATA_UV.zw;
				#endif
				
				#ifdef PARALLAX && ((BASE_MAPPING_UV1 && LIGHTMAP_MAPPING_UV1) || (BASE_MAPPING_UV0 && LIGHTMAP_MAPPING_UV0))
					lightmap_texcoord -= parallax.uv_offset;
				#endif
				
				lightmap_texcoord = uvTransform(lightmap_texcoord,m_lightmap_uv_transform);
				
				GBUFFER.lightmap = TEXTURE(TEX_LIGHTMAP,lightmap_texcoord).rgb;
			#endif
			
			GBUFFER.lightmap = pow(GBUFFER.lightmap * m_lightmap_scale,FLOAT3(m_lightmap_gamma));
			
		#endif
		
		#ifdef VERTEX_COLOR && VERTEX_LIGHTMAP
			#ifdef LIGHTMAP
				GBUFFER.lightmap += pow(DATA_VERTEX_COLOR.rgb * m_lightmap_scale,FLOAT3(m_lightmap_gamma));
			#else
				GBUFFER.lightmap += DATA_VERTEX_COLOR.rgb;
			#endif
		#endif
		
	#endif
	
	// base shading
	float4 shading		= TEXTURE_BASE(TEX_SHADING) * m_shading;
	float4 normal_map	= TEXTURE_BASE(TEX_NORMAL);

	//user patchID  int_patch_id pass 的片元shader中的输入变量.编译.
	uint iY = int_patch_id / 1024;
	uint iX = int_patch_id % 1024;
	float4 patch_color = TEXTURE_FETCH(TEX_PATCH_COLOR, float2(iX, iY));
	if (length(patch_color) > EPSILON)
		color = patch_color;
	else
	#ifdef PRETRANS
	{
		//float4 fTexSize = GET_TEXSIZE(TEX_PRETRANS_AREA);
		float4 fAreaVec = TEXTURE_FETCH(TEX_PRETRANS_AREA, float2(int_area_id, 0));
		if (fAreaVec.z - fAreaVec.x > EPSILON && fAreaVec.w - fAreaVec.y > EPSILON)
		{
			float fUVX = DATA_UV.x >= 0 ? frac(DATA_UV.x) : (1.0f - frac(abs(DATA_UV.x)));
			float fUVY = DATA_UV.y >= 0 ? frac(DATA_UV.y) : (1.0f - frac(abs(DATA_UV.y)));
			
			fUVX = fAreaVec.x + fUVX*(fAreaVec.z - fAreaVec.x);
			fUVY = (1.0f - fAreaVec.w) + fUVY*(fAreaVec.w - fAreaVec.y);
			color *= TEXTURE(TEX_PRETRANS_IMAGE, float2(fUVX, fUVY));
		}
		else
		{
			color *= TEXTURE_BASE(TEX_PRETRANS_IMAGE);
		}
	}
	#else
		color *= TEXTURE_BASE(TEX_COLOR);
	#endif

	float4 patch_visible = TEXTURE_FETCH(TEX_PATCH_VISIBLE, float2(iX, iY));
	if (patch_visible.x > EPSILON)
		discard;
	if (m_select_mode >= 0 && patch_visible.y > EPSILON)// 不能被拣选的patchid.
		discard;
	// normal map
	#ifdef NORMAL_MAP_OBJECT_SPACE
		float3 ts_normal = normal_map.xzy;
		ts_normal.y *= -1.0f;
		ts_normal = mul(DATA_TRANSFORM,ts_normal);
		ts_normal = mul(TBN,normalize(ts_normal)) / max(m_normal_scale,EPSILON);
	#else
		float3 ts_normal = normal_map.xyz;
	#endif
	
	#ifdef NOISE_2D
		float3 noise_2d = TEXTURE(TEX_NOISE_2D,uvTransform(DATA_NOISE_UV.xy,m_noise_2d_uv_transform)).rgb;
		color.rgb = saturate(color.rgb + (noise_2d * 2.0f - 1.0f) * m_noise_2d_scale);
	#endif
	
	#ifdef NOISE_3D
		float noise_texcoord = TEXTURE(TEX_NOISE_3D,DATA_NOISE_UV * m_noise_3d_transform.xyz).x;
		float3 noise_3d = TEXTURE(TEX_NOISE_3D_GRADIENT,float2(noise_texcoord,0.0f)).rgb;
		color.rgb = saturate(color.rgb + (noise_3d * 2.0f - 1.0f) * m_noise_3d_scale);
	#endif
	
	#ifdef VERTEX_COLOR
		#ifdef METALNESS
			#ifdef VERTEX_ALBEDO
				color.rgb *= DATA_VERTEX_COLOR.rgb;
			#endif
		#else
			#ifdef VERTEX_DIFFUSE
				color.rgb *= DATA_VERTEX_COLOR.rgb;
			#endif
			
			#ifdef VERTEX_SPECULAR
				shading.rgb *= DATA_VERTEX_COLOR.rgb;
			#endif
		#endif
	#endif
	
	// transparent
	#ifdef TRANSPARENT || ALPHA_TEST
		#ifdef OPACITY_MAP_NORMAL
			#ifdef NORMAL_MAP_OBJECT_SPACE
				color.a = normal_map.a * m_color.a;
			#else
				color.a = normal_map.b * m_color.a;
			#endif
		#endif
		
		GBUFFER.transparent = pow(max(color.a * m_transparent,0.0f),m_transparent_pow);
	#endif
	
	// detail shading
	#ifdef DETAIL
		float4 detail_shading = m_detail_shading;
		detail_shading.xy *= TEXTURE_DETAIL(TEX_SHADING_DETAIL).xy;
		
		float4 detail_color = TEXTURE_DETAIL(TEX_COLOR_DETAIL) * m_detail_color;
		
		#ifdef DETAIL_MASK
			detail_color.a *= TEXTURE_DETAIL_MASK(TEX_DETAIL_MASK).r;
		#endif
		
		#ifdef VERTEX_DETAIL_MASK_R
			detail_color.a *= DATA_VERTEX_COLOR.r;
		#elif VERTEX_DETAIL_MASK_G
			detail_color.a *= DATA_VERTEX_COLOR.g;
		#elif VERTEX_DETAIL_MASK_B
			detail_color.a *= DATA_VERTEX_COLOR.b;
		#elif VERTEX_DETAIL_MASK_A
			detail_color.a *= DATA_VERTEX_COLOR.a;
		#endif
		
		#ifdef DETAIL_ANGLE_FADE
			detail_color.a *= saturate((DATA_DETAIL_ANGLE_FADE - m_detail_angle_fade + m_detail_angle_fade_threshold * 0.5f) / max(m_detail_angle_fade_threshold,EPSILON));
		#endif
		
		detail_color.a = saturate((detail_color.a - (1.0f - m_detail_visible * 0.5f) + m_detail_visible_threshold * 0.5f) / max(m_detail_visible_threshold,EPSILON));
		
		ts_normal.xy = ts_normal.xy + TEXTURE_DETAIL(TEX_NORMAL_DETAIL).xy * m_detail_normal_visible * detail_color.a;
		
		#ifdef DETAIL_BLEND_OVERLAY
			#define DETAIL_BLEND(V0,V1,K) V0 = overlay(V0,V1,K * detail_color.a);
		#elif DETAIL_BLEND_MULTIPLY
			#define DETAIL_BLEND(V0,V1,K) V0 *= lerp(V1,float4_one,float4_one - K * detail_color.a);
		#else
			#define DETAIL_BLEND(V0,V1,K) V0 = lerp(V0,V1,K * detail_color.a);
		#endif
		
		DETAIL_BLEND(color,		detail_color,	FLOAT4(m_detail_color_visible.r))
		DETAIL_BLEND(shading,	detail_shading,	m_detail_shading_visible)
	#endif
	
	ts_normal.xy *= m_normal_scale;
	ts_normal.z = getNormalZ(ts_normal);
	//ts_normal = float3(0,1,0);
	GBUFFER.normal = normalize(mul(normalize(ts_normal),TBN));
	
	#ifdef METALNESS
		GBUFFER.albedo		= color.rgb;
		GBUFFER.metalness	= shading.r;
		GBUFFER.roughness	= shading.g;
		
		#ifdef OUT_GBUFFER_SPECULAR
			#ifdef SPECULAR_MAP
				GBUFFER.f0 = shading.b;
			#else
				GBUFFER.f0 = m_shading.b;
			#endif
		#endif
		
		#ifdef OUT_GBUFFER_MICROFIBER
			#ifdef MICROFIBER_MAP
				GBUFFER.microfiber = shading.a;
			#else
				GBUFFER.microfiber = m_shading.a;
			#endif
		#endif
		
	#else
		GBUFFER.diffuse		= color.rgb;
		GBUFFER.specular	= shading.rgb;
		GBUFFER.gloss		= shading.a;
		GBUFFER.microfiber	= m_microfiber;
		
		#ifdef MICROFIBER_MAP
			GBUFFER.microfiber *= TEXTURE_BASE(TEX_MICROFIBER).r;
		#endif
		
	#endif
	
	#ifdef OUT_GBUFFER_TRANSLUCENT
		GBUFFER.translucent = m_translucent;
		#ifdef TRANSLUCENT_MAP
			GBUFFER.translucent *= TEXTURE_BASE(TEX_TRANSLUCENT).r;
		#endif
	#endif
	
	#ifdef !METALNESS
		#undef GBUFFER
		GBuffer gbuffer = specularToMetalness(gbuffer_s);
	#endif
	
#endif

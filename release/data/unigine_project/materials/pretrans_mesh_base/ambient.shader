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

#include <core/shaders/mesh/common/common.h>

#ifdef VERTEX
	#include <core/shaders/mesh/common/vertex.h>
#elif FRAGMENT
	#include <unigine_project/materials/pretrans_mesh_base/fragment.h>
#endif

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	
	INIT_DATA(float4,0,DATA_UV)
	
	INIT_DATA(float3,1,DATA_NORMAL)
	INIT_DATA(float3,2,DATA_TANGENT)
	INIT_DATA(float,3,DATA_SIGN_BINORMAL)
	
	#ifdef NOISE_2D || NOISE_3D
		INIT_DATA(float3,6,DATA_NOISE_UV)
	#endif
	
	INIT_DATA(float4,7,DATA_OVERLAP_UV)
	
	INIT_DATA(float3,8,DATA_VERTEX_POSITION)
	INIT_DATA(float3,9,DATA_OBJECT_NORMAL)
	
	#ifdef VERTEX_COLOR
		INIT_DATA(float4,10,DATA_VERTEX_COLOR)
	#endif
	
	#ifdef DETAIL_ANGLE_FADE0 || DETAIL_ANGLE_FADE1
		INIT_DATA(float,11,DATA_DETAIL_ANGLE_FADE)
	#endif
	
	INIT_DATA(float, 12, DATA_OBLIQUE_FRUSTUM)
	
	#ifdef ALPHA_FADE && USE_ALPHA_FADE
		INIT_DATA(float,13,DATA_ALPHA_FADE)
	#endif
	
	INIT_DATA(float3,14,DATA_POSITION)
	
	#ifdef NORMAL_MAP_OBJECT_SPACE
		INIT_DATA(float3x3,15,DATA_TRANSFORM)
	#endif
	
	#ifdef TWO_SIDED
		INIT_FRONTFACE
	#endif
	
END

#ifdef VERTEX

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	#include <core/shaders/mesh/common/vertex.h>
MAIN_END

#elif FRAGMENT

#define SHADOW
#include <core/shaders/common/light/world.h>

#ifdef EMISSION
	INIT_TEXTURE(13,TEX_EMISSION)
#endif

INIT_TEXTURE_CUBE(10,TEX_REFLECTION_CUBE)

#ifdef PLANAR_REFLECTION
	INIT_TEXTURE(11,TEX_REFLECTION_2D)
#elif MULTIPLE_ENVIRONMENT_PROBES
	INIT_TEXTURE(11,TEX_TRANSPARENT_ENVIRONMENT_PROBE)
#endif

#ifdef USE_HAZE
	INIT_TEXTURE_ARRAY(12,TEX_SKY_LUT)
#endif

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	#include <unigine_project/materials/pretrans_mesh_base/fragment.h>
	
	OUT_COLOR.a = gbuffer.transparent;
	
	#ifdef LIGHT_WORLD || AMBIENT
		
		gbufferSRGB(gbuffer);
		
		gbuffer.roughness = lerpOne(gbuffer.roughness,gbuffer.microfiber);
		
		Data data;
		dataCalculateAll(data,gbuffer,DATA_POSITION,IN_POSITION.xy);
		
		#ifdef AMBIENT
			float3 world_light_color = TEXTURE_FETCH(TEX_MODULATION,float2_zero).rgb;
			world_light_color = lerp(float3_one,world_light_color,s_light_probe_is_sun_light_color);
			
			#ifdef PLANAR_REFLECTION
				float bias = 8.0f * (1.0f - pow2(1.0f - gbuffer.roughness));
				float3 reflection = TEXTURE_BIAS(TEX_REFLECTION_2D,IN_POSITION.xy * s_viewport.zw, bias).rgb;
			#else
				// dynamic reflection: light_reflection_color.w = 2
				// static reflection: light_reflection_color.w = 1
				float bias = s_light_mipmaps * (1.0f - pow(1.0f - gbuffer.roughness,s_light_reflection_color.a));
				float3 reflection = TEXTURE_BIAS(TEX_REFLECTION_CUBE,data.sky_reflect, bias).rgb * s_light_reflection_color.rgb * world_light_color;
			#endif
			
			#ifdef MULTIPLE_ENVIRONMENT_PROBES && PLANAR_REFLECTION
				float3 ambient = TEXTURE_BIAS(TEX_REFLECTION_2D,IN_POSITION.xy * s_viewport.zw,16.0f).rgb;
			#else
				float3 ambient = TEXTURE_BIAS(TEX_REFLECTION_CUBE,data.normal_w,s_light_mipmaps).rgb * s_light_ambient_color.rgb * world_light_color;
			#endif
			
			ambient = pow(ambient, FLOAT3(s_light_ambient_contrast));
			
			environmentReflectionShading(reflection,gbuffer,data);
			
			#ifdef (VERTEX_COLOR && VERTEX_LIGHTMAP) || LIGHTMAP
				#ifdef !LIGHTMAP_WITH_AMBIENT
					ambient *= 0.0f;
				#endif
				ambient += gbuffer.lightmap;
			#endif
			
			OUT_COLOR.rgb = ambient * gbuffer.albedo * data.dielectric + reflection;
			
			#ifdef MULTIPLE_ENVIRONMENT_PROBES && (!PLANAR_REFLECTION)
				float4 reflections = TEXTURE_BIAS_ZERO(TEX_TRANSPARENT_ENVIRONMENT_PROBE,IN_POSITION.xy * s_viewport.zw);
				OUT_COLOR.rgb = OUT_COLOR.rgb * (1.0f - reflections.a) + reflections.rgb;
			#endif
			
			OUT_COLOR.rgb *= gbuffer.occlusion;
		#endif
		
		#ifdef LIGHT_WORLD
			float3 diffuse_light = float3_zero;
			float3 specular_light = float3_zero;
			float3 light_modulation;
			
			getWorldLight(diffuse_light,specular_light,gbuffer,data,light_modulation);
			
			OUT_COLOR.rgb += diffuse_light * gbuffer.albedo * data.dielectric + specular_light * gbuffer.occlusion;
		#endif
		
		getMicrofiber(OUT_COLOR.rgb,data,gbuffer);
		
	#elif USE_HAZE
		Data data;
		dataCalculateAll(data,gbuffer,DATA_POSITION,IN_POSITION.xy);
	#endif
	
	#ifdef EMISSION
		float3 emission = TEXTURE_BASE(TEX_EMISSION).rgb * m_emission_color.rgb;
		#ifdef VERTEX_COLOR && VERTEX_EMISSION
			emission *= DATA_VERTEX_COLOR.rgb;
		#endif
		OUT_COLOR.rgb += srgbInv(emission) * m_emission_scale;
	#endif
	
	#ifdef USE_HAZE
		OUT_COLOR = hazeForward(OUT_COLOR,data.depth,-data.view_w,TEXTURE_OUT(TEX_SKY_LUT));
	#endif
	
	#ifdef OVERLAP_RENDER
		OUT_COLOR.rgb = srgb(OUT_COLOR.rgb);
	#endif
	
	if(OUT_COLOR.a == 0.0f) discard;
	
MAIN_END

#endif
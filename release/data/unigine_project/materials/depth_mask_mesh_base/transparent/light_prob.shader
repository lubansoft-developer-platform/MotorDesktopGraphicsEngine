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
	#include <unigine_project/materials/depth_mask_mesh_base/common/vertex.h>
#elif FRAGMENT
	#include <core/shaders/mesh/common/fragment.h>
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
	
	INIT_DATA(float3,12,DATA_POSITION)
	
	INIT_DATA(float, 13, DATA_OBLIQUE_FRUSTUM)
	
	#ifdef ALPHA_FADE && USE_ALPHA_FADE
		INIT_DATA(float,14,DATA_ALPHA_FADE)
	#endif
	
	#ifdef NORMAL_MAP_OBJECT_SPACE
		INIT_DATA(float3x3,15,DATA_TRANSFORM)
	#endif
	
	#ifdef TWO_SIDED
		INIT_FRONTFACE
	#endif
	
END

#ifdef VERTEX

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	#include <unigine_project/materials/depth_mask_mesh_base/common/vertex.h>
MAIN_END

#elif FRAGMENT


#define SHADOW

INIT_TEXTURE_CUBE(14,TEX_REFLECT)

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	#include <core/shaders/mesh/common/fragment.h>
	
	gbufferSRGB(gbuffer);
	
	gbuffer.roughness = lerpOne(gbuffer.roughness,gbuffer.microfiber);
	
	Data data;
	dataCalculateAll(data,gbuffer,DATA_POSITION,IN_POSITION.xy);
	
	float3 light_direction = data.position.xyz - s_light_position.xyz;
	light_direction = mul3(light_direction,s_light_transform);
	
	float attenuation = getLightAttenuation(light_direction) * (1.0f - s_light_shape.w);
	light_direction -= clamp(light_direction,-s_light_shape.xyz,s_light_shape.xyz);
	attenuation += getLightAttenuation(length(light_direction)) * s_light_shape.w;
	
	float3 reflect_w = getEnvironmentReflectVector(data.normal_w,data.reflection_w,gbuffer.roughness);
	
	float3 ambient = TEXTURE_BIAS(TEX_REFLECT,data.normal_w,s_light_mipmaps).rgb;
	float3 reflection = TEXTURE_BIAS(TEX_REFLECT,reflect_w,gbuffer.roughness * s_light_mipmaps).rgb;
	
	#ifdef (VERTEX_COLOR && VERTEX_LIGHTMAP) || LIGHTMAP
		#ifdef !LIGHTMAP_WITH_AMBIENT
			ambient *= 0.0f;
		#endif
	#endif
	
	ambient = pow(ambient, FLOAT3(s_light_ambient_contrast));

	reflection *= s_light_color.rgb * s_light_reflection_color.rgb;
	ambient *= s_light_color.rgb * s_light_ambient_color.rgb;
	
	environmentReflectionShading(reflection,gbuffer,data);
	
	OUT_COLOR.rgb = ambient * gbuffer.albedo * data.dielectric + reflection;
	
	OUT_COLOR.a = attenuation * max(s_light_ambient_color.a,s_light_reflection_color.a);
	OUT_COLOR.rgb *= attenuation;
	
	#ifdef OVERLAP_RENDER
		OUT_COLOR.rgb = srgb(OUT_COLOR.rgb);
	#endif
	
MAIN_END

#endif

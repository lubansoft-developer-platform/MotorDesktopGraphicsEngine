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
#undef NO_MATERIAL_REFLECTION_PARAMETERS

#ifdef VERTEX
	#include <unigine_project/materials/custom_mesh_base/common/vertex.h>
#elif FRAGMENT
	#include <core/shaders/mesh/common/fragment.h>
#endif

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	
	INIT_DATA(float4,0,DATA_UV)
	
	INIT_DATA(float3,1,DATA_TANGENT)
	INIT_DATA(float3,2,DATA_NORMAL)
	
	INIT_DATA(float4,3,DATA_REFLECTION_POS)
	INIT_DATA(float2,4,DATA_NORMAL_OFFSET)
	
	#ifdef ALPHA_FADE && USE_ALPHA_FADE
		INIT_DATA(float,5,DATA_ALPHA_FADE)
	#endif
	
	INIT_DATA(float,6,DATA_SIGN_BINORMAL)
	
END

#ifdef VERTEX

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	
	#include <unigine_project/materials/custom_mesh_base/common/vertex.h>
	
	DATA_REFLECTION_POS = mul4(s_material_reflection_transform,float4(out_d.position,1.0f));
	DATA_NORMAL_OFFSET = float2(s_projection[1].y,OUT_POSITION.w);
	
MAIN_END

#elif FRAGMENT

INIT_TEXTURE(11,TEX_REFLECTION_2D)
INIT_TEXTURE(14,TEX_GBUFFER_NORMAL)

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	IF_DATA(DATA_ALPHA_FADE)
		texture2DAlphaFadeDiscard(DATA_ALPHA_FADE,IN_POSITION.xy);
	ENDIF
	
	float2 uv = DATA_UV.xy;
	
	OUT_COLOR = float4(0.0f,0.0f,0.0f,1.0f);
	
	float4 deferred_normal = TEXTURE_BIAS_ZERO(TEX_GBUFFER_NORMAL,IN_POSITION.xy * s_viewport.zw);
	float3 normal = normalize(getDeferredNormal(deferred_normal));
	
	float2 normal_offset;
	normal_offset.x = dot(normal,DATA_TANGENT);
	normal_offset.y = dot(normal,cross(DATA_TANGENT,DATA_NORMAL) * DATA_SIGN_BINORMAL);
	
	uv = DATA_REFLECTION_POS.xy / DATA_REFLECTION_POS.w;
	uv += normal_offset * saturate(DATA_NORMAL_OFFSET.x / DATA_NORMAL_OFFSET.y);
	
	float bias = saturate(pow2(deferred_normal.a));
	
	#ifdef QUALITY_HIGH
		float weight = 0.0f;
		unroll for(uint i = 0; i < 16; i++) {
			float2 uv_l = saturate(uv + s_viewport.zw * halton16[i] * bias * 64.0f);
			OUT_COLOR.rgb += TEXTURE_BIAS(TEX_REFLECTION_2D,uv_l,bias * 4.0f).rgb;
		}
		OUT_COLOR.rgb *= 1.0f / 16.0f;
	#else
		OUT_COLOR.rgb = TEXTURE_BIAS(TEX_REFLECTION_2D,uv,bias * 8.0f).rgb;
	#endif
	
MAIN_END

#endif
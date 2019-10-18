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

//#define USE_CUSTOM_DEPTH
#define UNDEF_FRAGMENT_OUT

#include <core/shaders/common/fragment.h>

INIT_TEXTURE(0, TEX_DEPTH)
//INIT_TEXTURE(1, TEX_ALBEDO)
//INIT_TEXTURE(2, TEX_NORMAL)
//INIT_TEXTURE(3, TEX_SHADING)

STRUCT(FRAGMENT_OUT)
	INIT_MRT(TYPE_RGBA, 0)
	//INIT_MRT(TYPE_RGBA, 1)
	//INIT_MRT(TYPE_RGBA, 2)
	//INIT_MRT(TYPE_RGBA, 3)
	//INIT_MRT(TYPE_RGBA, 4)
END

#define OUT_LDEPTH		OUT_MRT(0)
//#define OUT_ALBEDO		OUT_MRT(1)
//#define OUT_NORMAL		OUT_MRT(2)
//#define OUT_METALNESS	OUT_MRT(3)
//#define OUT_ROUGHNESS	OUT_MRT(4)

MAIN_BEGIN(FRAGMENT_OUT, FRAGMENT_IN)

	float2 uv = IN_POSITION.xy * s_viewport.zw;
	
	float native_depth = TEXTURE_BIAS_ZERO(TEX_DEPTH, uv).r;
	float linear_depth = getLinearizedDepth(TEXTURE_OUT(TEX_DEPTH), uv);
	
	float clear = sign(abs(native_depth));
	float fAbsDepth = abs(native_depth);
	
	if(fAbsDepth > 0)
	{
	OUT_LDEPTH = float4(fAbsDepth,0.0f,0.0f,1.f);
	}

	// GBuffer gbuffer = GBufferDefault();
	// loadGBufferAlbedo(gbuffer, TEXTURE_OUT(TEX_ALBEDO), uv);
	// loadGBufferNormal(gbuffer, TEXTURE_OUT(TEX_NORMAL), uv);
	// loadGBufferShading(gbuffer, TEXTURE_OUT(TEX_SHADING), uv);
	// 
	// ////OUT_LDEPTH.rgb = FLOAT3(linear_depth);
	// //OUT_LDEPTH.r = native_depth*10000;
	// //OUT_LDEPTH.a = 1.0f;
	// //OUT_LDEPTH *= clear;
	// 
	// 
	// OUT_ALBEDO.rgb = gbuffer.albedo;
	// OUT_ALBEDO.a = 1.0f;
	// //OUT_ALBEDO *= clear;
	// 
	// if(fAbsDepth > 0)
	// {
	// OUT_LDEPTH = float4(fAbsDepth,0.0f,0.0f,1.f);
	// }
	// //OUT_DEPTH = 0.01f;//native_depth;
	// 
	// OUT_NORMAL.rgb = gbuffer.normal * 0.5f + 0.5f;
	// OUT_NORMAL.a = 1.0f;
	// OUT_NORMAL *= clear;
	// 
	// OUT_METALNESS.rgb = FLOAT3(gbuffer.metalness);
	// OUT_METALNESS.a = 1.0f;
	// OUT_METALNESS *= clear;
	// 
	// OUT_ROUGHNESS.rgb = FLOAT3(gbuffer.roughness);
	// OUT_ROUGHNESS.a = 1.0f;
	// OUT_ROUGHNESS *= clear;
	
MAIN_END

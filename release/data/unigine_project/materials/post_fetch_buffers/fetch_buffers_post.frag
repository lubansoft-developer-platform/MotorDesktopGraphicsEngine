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
INIT_TEXTURE(1, TEX_ALBEDO)
INIT_TEXTURE(2, TEX_SHADING)

STRUCT(FRAGMENT_OUT)
	INIT_MRT(TYPE_RGBA, 0)
	//INIT_MRT(TYPE_RGBA, 1)
END

#define OUT_LDEPTH		OUT_MRT(0)
//#define OUT_ALBEDO		OUT_MRT(1)

MAIN_BEGIN(FRAGMENT_OUT, FRAGMENT_IN)

	float2 uv = IN_POSITION.xy * s_viewport.zw;
	
	float native_depth = TEXTURE_BIAS_ZERO(TEX_DEPTH, uv).r;
	//float3 board_id = TEXTURE_BIAS_ZERO(TEX_ALBEDO, uv).rgb;
	//float board_height = TEXTURE_BIAS_ZERO(TEX_SHADING, uv).r;

	GBuffer gbuffer = GBufferDefault();
	loadGBufferAlbedo(gbuffer, TEXTURE_OUT(TEX_ALBEDO), uv);
	loadGBufferShading(gbuffer, TEXTURE_OUT(TEX_SHADING), uv);

	float fAbsDepth = abs(native_depth);
	float3 board_id = gbuffer.albedo*255.f;
	float fBoardHeiht = gbuffer.metalness;
	uint iBoardId = board_id.r + board_id.g * 256 + board_id.b * 256 * 256;
	if(fAbsDepth > 0)
	{
	OUT_LDEPTH = float4(fAbsDepth,fBoardHeiht,iBoardId,1.f);
	//OUT_LDEPTH = float4(0.8f,0.0002f,1000,1.f);
	}
	
MAIN_END

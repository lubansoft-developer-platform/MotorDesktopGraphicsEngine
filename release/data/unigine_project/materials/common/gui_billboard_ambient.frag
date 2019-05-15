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

 #define USE_CUSTOM_DEPTH
#include <core/shaders/common/fragment.h>

INIT_TEXTURE(0,TEX_COLOR)

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	INIT_IN(float4,0)
	#ifndef GUI_MESH
		INIT_IN(float4,1)
	#endif
END

CBUFFER(parameters)
	UNIFORM float4 color;
END

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	OUT_COLOR = TEXTURE(TEX_COLOR,IN_DATA(0).xy) * color;
	#ifndef GUI_MESH
		OUT_COLOR *= IN_DATA(1);
	#endif
	
	#ifdef YUV
		float2 uv = OUT_COLOR.yz - 0.5f;
		OUT_COLOR.xyz = saturate(float3(1.40200f * uv.y,-0.71414f * uv.y - 0.34414f * uv.x,1.77200f * uv.x) + OUT_COLOR.x);
	#endif
	
	if(OUT_COLOR.a <= EPSILON) discard;
	
	#ifdef !OVERLAP_RENDER
		OUT_COLOR = srgbInv(OUT_COLOR);
	#endif
	OUT_DEPTH = 0.1f;
MAIN_END

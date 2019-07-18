/* Copyright (C) 2005-2017, UNIGINE Corp. All rights reserved.
 *
 * This file is a part of the UNIGINE 2.4 SDK.
 *
 * Your use and / or redistribution of this software in source and / or
 * binary form, with or without modification, is subject to: (i) your
 * ongoing acceptance of and compliance with the terms and conditions of
 * the UNIGINE License Agreement; and (ii) your inclusion of this notice
 * in any version of this software that you use or redistribute.
 * A copy of the UNIGINE License Agreement is available by contacting
 * UNIGINE Corp. at http://unigine.com/
 */


#include <core/shaders/common/fragment.h>

INIT_TEXTURE(0,TEX_COLOR)
INIT_TEXTURE(1,TEX_MASK)

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	INIT_IN(float2,0)
	INIT_IN(float4,1)
END

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	float2 uv = IN_DATA(0).xy;
	//float2 offset = s_viewport.zw*1.f;
	//OUT_COLOR = TEXTURE_BIAS_ZERO(TEX_COLOR,uv);
	//
	//bool bRight= TEXTURE_BIAS_ZERO(TEX_COLOR,uv + offset * float2( 1, 0)).r > 0;
	//bool bTop = TEXTURE_BIAS_ZERO(TEX_COLOR,uv + offset * float2( 0, 1)).r > 0;
	//bool bLeft = TEXTURE_BIAS_ZERO(TEX_COLOR,uv + offset * float2(-1, 0)).r > 0;
	//bool bBottom = TEXTURE_BIAS_ZERO(TEX_COLOR,uv + offset * float2( 0,-1)).r > 0;
	//if(bRight || bLeft || bTop || bBottom)
	//{
	//	OUT_COLOR = float4(0.0118f,0.9608f,0.9843f,1.f);
	//}

	float2 offset = s_viewport.xy;
	int c0 = TEXTURE_FETCH(TEX_MASK,uv*offset + float2( 1, 0)).r;
	int c1 = TEXTURE_FETCH(TEX_MASK,uv*offset + float2( 0, 1)).r;
											 		 
	int c4 = TEXTURE_FETCH(TEX_MASK,uv*offset + float2(-1, 0)).r;
	int c5 = TEXTURE_FETCH(TEX_MASK,uv*offset + float2( 0,-1)).r;
	
	if( c0 == c1 && c4 == c5 && c0 == c4)
	{
	OUT_COLOR = TEXTURE_BIAS_ZERO(TEX_COLOR,uv);
	}
	else
	{
	OUT_COLOR = float4(0.0118f,0.9608f,0.9843f,1.f);
	}
	
	if(uv.x <= 0.01f || uv.x >= 0.99f || uv.y <= 0.01f || uv.y >= 0.99f)
	{
		 OUT_COLOR = TEXTURE_BIAS_ZERO(TEX_COLOR,uv);
	}
	
MAIN_END

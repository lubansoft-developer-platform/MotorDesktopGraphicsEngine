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
INIT_TEXTURE(1,TEX_AUXILIARY)
INIT_TEXTURE(2,TEX_SELECTION)

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	INIT_IN(float2,0)
	INIT_IN(float4,1)
END

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	float2 uv = IN_DATA(0).xy;
	float2 offset = s_viewport.zw*2.f;
	
	OUT_COLOR = TEXTURE_BIAS_ZERO(TEX_COLOR,uv);
	
	float3 c0 = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv + offset * float2( 1, 0)).rgb;
	float3 c1 = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv + offset * float2( 0, 1)).rgb;
	float3 c2 = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv + offset * float2( 1, 1)).rgb;
	float3 c3 = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv + offset * float2( 1,-1)).rgb;
	
	float3 c4 = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv + offset * float2(-1, 0)).rgb;
	float3 c5 = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv + offset * float2( 0,-1)).rgb;
	float3 c6 = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv + offset * float2(-1,-1)).rgb;
	float3 c7 = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv + offset * float2(-1, 1)).rgb;
	
	float3 sobel_x = c6 + c4 * 2.0f + c7 - c3 - c0 * 2.0f - c2;
	float3 sobel_y = c6 + c5 * 2.0f + c3 - c7 - c1 * 2.0f - c2;
	float3 sobel = sqrt(sobel_x * sobel_x + sobel_y * sobel_y);
	
	float edge = saturate(1.0f - dot(sobel,FLOAT3(1.f)));
	if(edge <= 0.f)
	{
	OUT_COLOR = float4(0.0118f,0.9608f,0.9843f,1.f);
	}
MAIN_END


//MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
//	
//	float2 uv = IN_DATA(0).xy;
//	
//	float4 auxiliary = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv); 
//	float4 color = TEXTURE_BIAS_ZERO(TEX_COLOR,uv); 
//	float4 selection = TEXTURE_BIAS_ZERO(TEX_SELECTION,uv); 
//
//	// if(length(auxiliary)>EPSILON)
//	// 	OUT_COLOR = float4(auxiliary.rgb*(0.8) + color.rgb* 0.2,0.6f);
//	// else
//	// 	OUT_COLOR = color ;//+ saturate(selection - auxiliary);
//	//if(length(saturate(selection - auxiliary))< EPSILON)
//	//{
//	//OUT_COLOR = color + selection*4.f;//float4(0.f,1.f,0.f,1.f);//
//	//}
//	//else
//	OUT_COLOR = color + saturate(selection - auxiliary)*10.f;
//MAIN_END

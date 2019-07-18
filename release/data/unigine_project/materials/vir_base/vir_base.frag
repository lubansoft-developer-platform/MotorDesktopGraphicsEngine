// Copyright (C) 2005-2016, Unigine Corp. All rights reserved.

#include <core/shaders/common/fragment.h>

INIT_TEXTURE(0,TEX_PATCH_IMAGE)
INIT_TEXTURE(19,TEX_PATCH_COLOR)
INIT_TEXTURE(20,TEX_PATCH_VISIBLE)

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	INIT_IN(uint,0)
	INIT_IN(float2,1)
END

//user line_color 
CBUFFER(parameters)
	UNIFORM float m_select_mode;
	UNIFORM float4	m_albedo_color;
END

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)

	//OUT_COLOR = float4(1,0,0,1);
	float2 uv = IN_DATA(1);
	
	#ifdef PRIMITIVE_POINT
		float fDistance = length(uv - float2(0.5,0.5));
		if(fDistance > 0.5)
			discard;
	#elif PRIMITIVE_CIRCLE
		float fDistance = length(uv - float2(0.5,0.5));
		if(fDistance > 0.5 || fDistance < 0.45)
			discard;
	#endif
	
	uint int_patch_id = IN_DATA(0);
	uint iY = int_patch_id / 1024;
	uint iX = int_patch_id % 1024;
	
	float4 patch_visible = TEXTURE_FETCH(TEX_PATCH_VISIBLE,float2(iX,iY));
	if (patch_visible.x > EPSILON)
		discard;
	if (m_select_mode > 0 && patch_visible.y > EPSILON)// 不能被拣选的patchid.
		discard;
	
	float4 patch_color = TEXTURE_FETCH(TEX_PATCH_COLOR,float2(iX,iY));
	if (length(patch_color)< EPSILON)
		patch_color =m_albedo_color;
	
	float4 image_color = TEXTURE_BIAS_ZERO(TEX_PATCH_IMAGE,uv); //
	OUT_COLOR = patch_color * image_color;
	
	if(OUT_COLOR.a == 0.0f) discard;
	
	if (m_select_mode >= 1.f && OUT_COLOR.a < 1.f) discard;
	
	if (m_select_mode >= 0)
	{
		uint iB = int_patch_id / (256 * 256);
		uint iG = (int_patch_id - iB * 256 * 256) / 256;
		uint iR = int_patch_id - iB * 256 * 256 - iG * 256;
		OUT_COLOR = float4(iR / 255.f, iG / 255.f, iB / 255.f, 1.f);//
	}
MAIN_END

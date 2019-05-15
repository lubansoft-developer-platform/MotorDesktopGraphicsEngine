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


#include <core/shaders/common/common.h>

STRUCT(VERTEX_IN)
	INIT_ATTRIBUTE(float4,0,POSITION)
	INIT_ATTRIBUTE(float4,1,TEXCOORD0)
	INIT_ATTRIBUTE(float4,2,COLOR0)
END

STRUCT(VERTEX_OUT)
	INIT_POSITION
	INIT_OUT(float4,0)
	INIT_OUT(float2,1)
END

MAIN_BEGIN(VERTEX_OUT,VERTEX_IN)
	
	OUT_POSITION = getPosition(IN_ATTRIBUTE(0));
	OUT_DATA(0).xy = IN_ATTRIBUTE(1).xy;
	
	OUT_DATA(0).z = (IN_ATTRIBUTE(1).x - 0.5f) * min(1.0f,s_viewport.x * s_viewport.w) + 0.5f;
	OUT_DATA(0).w = (IN_ATTRIBUTE(1).y - 0.5f) * min(1.0f,s_viewport.y * s_viewport.z) + 0.5f;
	
	#ifndef IS_RENDER_FLIPPED
		OUT_DATA(0).w = 1.0f - OUT_DATA(0).w;
	#endif
	
	OUT_DATA(1) = IN_ATTRIBUTE(1).xy * s_viewport.xy / 8.0f;
	
MAIN_END

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

INIT_TEXTURE(0,TEX_AUXILIARY)

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	INIT_IN(float2,0)
	INIT_IN(float4,1)
END

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	float2 uv = IN_DATA(0).xy;
	
	float4 auxiliary = TEXTURE_BIAS_ZERO(TEX_AUXILIARY,uv); 
	OUT_COLOR = auxiliary;
	
MAIN_END

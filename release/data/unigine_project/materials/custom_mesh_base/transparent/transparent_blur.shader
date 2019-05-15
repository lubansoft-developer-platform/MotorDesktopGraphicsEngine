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


#define UNDEF_FRAGMENT_OUT
#include <core/shaders/mesh/common/common.h>

#ifdef VERTEX
	#include <unigine_project/materials/custom_mesh_base/common/vertex.h>
#elif FRAGMENT
	#include <unigine_project/materials/custom_mesh_base/common/fragment.h>
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
	
	INIT_DATA(float2,13,DATA_NORMAL_OFFSET)
	
	INIT_DATA(float, 14, DATA_OBLIQUE_FRUSTUM)
	
	#ifdef ALPHA_FADE && USE_ALPHA_FADE
		INIT_DATA(float,15,DATA_ALPHA_FADE)
	#endif
	
	#ifdef NORMAL_MAP_OBJECT_SPACE
		INIT_DATA(float3x3,16,DATA_TRANSFORM)
	#endif
	
	#ifdef TWO_SIDED
		INIT_FRONTFACE
	#endif
	
END

#ifdef VERTEX

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	#include <unigine_project/materials/custom_mesh_base/common/vertex.h>
MAIN_END

#elif FRAGMENT

STRUCT(FRAGMENT_OUT)
	INIT_COLOR(TYPE_R)
END

CBUFFER(parameters)
	UNIFORM float m_transparent_blur;
END

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	#include <unigine_project/materials/custom_mesh_base/common/fragment.h>
	
	OUT_COLOR = gbuffer.roughness * m_transparent_blur;
	
MAIN_END

#endif

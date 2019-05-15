// Copyright (C) 2005-2016, Unigine Corp. All rights reserved.

#include <core/shaders/common/common.h>

STRUCT(GEOMETRY_OUT)
	INIT_POSITION
	INIT_OUT(float,0)
	INIT_OUT(uint,1)
	INIT_OUT(float2,2)
END

STRUCT(GEOMETRY_IN)
	INIT_POSITION
	INIT_GEOM_IN(float,0)
	INIT_GEOM_IN(uint,1)
	INIT_GEOM_IN(float2,2)
	INIT_GEOM_IN(float3,3)
END

GEOM_MAX_VERTICES(128)

GEOM_TYPE_IN(POINT_IN)
GEOM_COUNT_IN(1)

GEOM_TYPE_OUT(TRIANGLE_OUT)

MAIN_GEOM_BEGIN(GEOMETRY_OUT,GEOMETRY_IN)
	
	float m_point_radius = IN_GEOM_DATA(0,0);

	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(0.0f,0.0f);
	float4 center = (float4(IN_GEOM_POSITION(0).xyz,1.0f));//
	OUT_POSITION = getPosition(center + float4(-m_point_radius,-m_point_radius,0,0));
	EMIT_VERTEX

	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(1,0.0f);
	OUT_POSITION = getPosition(center + float4(m_point_radius,-m_point_radius,0,0));
	EMIT_VERTEX

	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(0.0f,1.0f);
	OUT_POSITION = getPosition(center + float4(-m_point_radius,m_point_radius,0,0));
	EMIT_VERTEX
	
	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(1,1.0f);
	OUT_POSITION = getPosition(center + float4(m_point_radius,m_point_radius,0,0));
	EMIT_VERTEX

	END_PRIMITIVE
	
END_GEOM
//END_GEOM 后需要加ENTE回车键,否则会出现缺失}.
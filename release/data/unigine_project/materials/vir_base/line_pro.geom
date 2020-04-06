// Copyright (C) 2005-2016, Unigine Corp. All rights reserved.

#include <core/shaders/common/common.h>

float4 reproject(float4 center,float3 offset) 
{
	float4 ret = center;
	ret.xy = center.xy + offset.xy * s_viewport.zw * center.w;
	//ret.xy = center.xy + offset.xy;
	return ret;
}

STRUCT(GEOMETRY_OUT)
	INIT_POSITION
	INIT_OUT(uint,0)
	INIT_OUT(float2,1)
	INIT_OUT(uint, 2)
END

STRUCT(GEOMETRY_IN)
	INIT_POSITION
	INIT_GEOM_IN(uint,0)
	INIT_GEOM_IN(float2,1)
	INIT_GEOM_IN(float3,2)
	INIT_GEOM_IN(uint,3)
END

//user line_width 
CBUFFER(parameters)
	UNIFORM float m_primitive_size;
END

GEOM_MAX_VERTICES(64)

GEOM_TYPE_IN(LINE_IN)
GEOM_COUNT_IN(2)

GEOM_TYPE_OUT(TRIANGLE_OUT)

MAIN_GEOM_BEGIN(GEOMETRY_OUT,GEOMETRY_IN)
	
	float4 center_0 = IN_GEOM_POSITION(0);
	float4 center_1 = IN_GEOM_POSITION(1);

	float m_line_width_0 = m_primitive_size;
	float m_line_width_1 = m_primitive_size;

	float3 dirX = normalize(float3((center_1/center_1.w - center_0/center_0.w).xy , 0));
	float3 upZ = IN_GEOM_DATA(2,1);
	float3 sideY = normalize(float3(upZ.y*dirX.z - upZ.z*dirX.y,upZ.z*dirX.x - upZ.x*dirX.z,upZ.x*dirX.y - upZ.y*dirX.x));

	//float fLength = dlength(IN_GEOM_POSITION(1).xyz - IN_GEOM_POSITION(0).xyz);

	OUT_DATA(0) = IN_GEOM_DATA(0,1);
	OUT_DATA(1) = float2(0.0f,1.0f);
	OUT_DATA(2) = IN_GEOM_DATA(3,1);
	OUT_POSITION = reproject(center_1,-sideY * m_line_width_1);
	EMIT_VERTEX

	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = float2(0.0f,0.0f);
	OUT_DATA(2) = IN_GEOM_DATA(3,0);
	OUT_POSITION = reproject(center_0 ,-sideY * m_line_width_0);
	EMIT_VERTEX
	
	OUT_DATA(0) = IN_GEOM_DATA(0,1);
	OUT_DATA(1) = float2(1,1.0f);
	OUT_DATA(2) = IN_GEOM_DATA(3,1);
	OUT_POSITION = reproject(center_1 , sideY * m_line_width_1);
	EMIT_VERTEX
	
	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = float2(1,0.0f);
	OUT_DATA(2) = IN_GEOM_DATA(3,0);
	OUT_POSITION = reproject(center_0 , sideY * m_line_width_0);
	EMIT_VERTEX
	
	END_PRIMITIVE
	
END_GEOM
//END_GEOM 后需要加ENTE回车键,否则会出现缺失}.
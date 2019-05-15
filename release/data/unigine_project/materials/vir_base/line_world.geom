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

GEOM_MAX_VERTICES(64)

GEOM_TYPE_IN(LINE_IN)
GEOM_COUNT_IN(2)

GEOM_TYPE_OUT(TRIANGLE_OUT)

MAIN_GEOM_BEGIN(GEOMETRY_OUT,GEOMETRY_IN)
	
	float3 dirX = normalize(IN_GEOM_POSITION(1).xyz - IN_GEOM_POSITION(0).xyz);
	float3 upZ = IN_GEOM_DATA(3,1);
	//if( dirX == upZ)
	//	upZ = float3(0.0f,1.0f,0.0f);
	float3 sideY = normalize(float3(upZ.y*dirX.z - upZ.z*dirX.y,upZ.z*dirX.x - upZ.x*dirX.z,upZ.x*dirX.y - upZ.y*dirX.x));
	
	float4 center_0 = float4(IN_GEOM_POSITION(0).xyz,1.0f);
	float4 center_1 = float4(IN_GEOM_POSITION(1).xyz,1.0f);
	float m_line_width_0 = IN_GEOM_DATA(0,0);
	float m_line_width_1 = IN_GEOM_DATA(0,1);

	float4 row_0 = s_transform[0];
	float4 row_1 = s_transform[1];
	float4 row_2 = s_transform[2];

	OUT_DATA(0) = IN_GEOM_DATA(0,1);
	OUT_DATA(1) = IN_GEOM_DATA(1,1);
	OUT_DATA(2) = float2(0.0f,1.0f);
	float4 fPos1 = center_1 + float4(-sideY * m_line_width_1,0);
	fPos1 = mul4(row_0,row_1,row_2,fPos1);
	OUT_POSITION = getPosition(fPos1);
	EMIT_VERTEX

	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(0.0f,0.0f);
	float4 fPos2 = center_0 + float4(-sideY * m_line_width_0,0);
	fPos2 = mul4(row_0,row_1,row_2,fPos2);
	OUT_POSITION = getPosition(fPos2);
	EMIT_VERTEX
	
	OUT_DATA(0) = IN_GEOM_DATA(0,1);
	OUT_DATA(1) = IN_GEOM_DATA(1,1);
	OUT_DATA(2) = float2(1,1.0f);
	float4 fPos0 = center_1 + float4(sideY * m_line_width_1,0);
	fPos0 = mul4(row_0,row_1,row_2,fPos0);
	OUT_POSITION = getPosition(fPos0);
	EMIT_VERTEX
	
	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(1,0.0f);
	float4 fPos3 = center_0 + float4(sideY * m_line_width_0,0);
	fPos3 = mul4(row_0,row_1,row_2,fPos3);
	OUT_POSITION = getPosition(fPos3);
	EMIT_VERTEX
	
	END_PRIMITIVE
	
END_GEOM
//END_GEOM 后需要加ENTE回车键,否则会出现缺失}.
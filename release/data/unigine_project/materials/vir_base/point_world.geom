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

	float3 upZ = normalize(IN_GEOM_DATA(3,0));
	float3 dirX = float3(1,0,0);
	float3 sideY = normalize(float3(upZ.y*dirX.z - upZ.z*dirX.y,upZ.z*dirX.x - upZ.x*dirX.z,upZ.x*dirX.y - upZ.y*dirX.x));
	dirX = normalize(float3(sideY.y*upZ.z - sideY.z*upZ.y,sideY.z*upZ.x - sideY.x*upZ.z,sideY.x*upZ.y - sideY.y*upZ.x));
	
	float4 center = (float4(IN_GEOM_POSITION(0).xyz,1.0f));//getPosition
	float4 row_0 = s_transform[0];
	float4 row_1 = s_transform[1];
	float4 row_2 = s_transform[2];


	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(0.0f,0.0f);
	float4 fPos1 = center + float4((-dirX - sideY) * m_point_radius,0);
	fPos1 = mul4(row_0,row_1,row_2,fPos1);
	OUT_POSITION = getPosition(fPos1);
	EMIT_VERTEX

	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(1,0.0f);
	float4 fPos2 = center + float4((dirX - sideY) * m_point_radius,0);
	fPos2 = mul4(row_0,row_1,row_2,fPos2);
	OUT_POSITION = getPosition(fPos2);
	EMIT_VERTEX

	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(0.0f,1.0f);
	float4 fPos0 = center + float4((-dirX + sideY) * m_point_radius ,0);
	fPos0 = mul4(row_0,row_1,row_2,fPos0);
	OUT_POSITION = getPosition(fPos0);
	EMIT_VERTEX
	
	OUT_DATA(0) = IN_GEOM_DATA(0,0);
	OUT_DATA(1) = IN_GEOM_DATA(1,0);
	OUT_DATA(2) = float2(1,1.0f);
	float4 fPos3 = center + float4((dirX + sideY) * m_point_radius,0);
	fPos3 = mul4(row_0,row_1,row_2,fPos3);
	OUT_POSITION = getPosition(fPos3);
	EMIT_VERTEX

	END_PRIMITIVE
	
END_GEOM
//END_GEOM 后需要加ENTE回车键,否则会出现缺失}.
// Copyright (C) 2005-2016, UNIGINE Corp. All rights reserved.

#include <core/shaders/common/common.h>

INIT_TEXTURE(16, TEX_PATCH_TRANSF_ROW0)
INIT_TEXTURE(17, TEX_PATCH_TRANSF_ROW1)
INIT_TEXTURE(18, TEX_PATCH_TRANSF_ROW2)

STRUCT(VERTEX_IN)
	INIT_ATTRIBUTE(float3,0,POSITION)
	INIT_ATTRIBUTE(float,1,PATCHID)
	INIT_ATTRIBUTE(float3,2,NORMAL)
END

STRUCT(VERTEX_OUT)
	INIT_POSITION
	INIT_OUT(uint,0) //patchId
	INIT_OUT(float2,1)//coord
	INIT_OUT(float3,2)//normal
END

MAIN_BEGIN(VERTEX_OUT,VERTEX_IN)
	float3 cWorldPosition = IN_ATTRIBUTE(0);
	float3 cNormal = IN_ATTRIBUTE(2);
	uint iPatchId = IN_ATTRIBUTE(1);
	OUT_DATA(0) = iPatchId;
	OUT_DATA(1) = float2(0,0);
	
	uint iY = iPatchId / 1024;
	uint iX = iPatchId % 1024;
	
	float4 patch_transf_row0 = TEXTURE_FETCH(TEX_PATCH_TRANSF_ROW0, float2(iX, iY));
	float4 patch_transf_row1 = TEXTURE_FETCH(TEX_PATCH_TRANSF_ROW1, float2(iX, iY));
	float4 patch_transf_row2 = TEXTURE_FETCH(TEX_PATCH_TRANSF_ROW2, float2(iX, iY));
	cWorldPosition = mul3(patch_transf_row0, patch_transf_row1, patch_transf_row2, cWorldPosition);
	cNormal = normalize(mul3(patch_transf_row0, patch_transf_row1, patch_transf_row2, cNormal));
	float4 cPosition = float4(0.f,0.f,0.f,1.0f);
	#ifdef COORD_EYE 
		cPosition = getPosition(mul4(s_transform[0],s_transform[1],s_transform[2],cPosition) + float4(cWorldPosition,0.f));
		cNormal = float3(0,0,-1);
	#elif COORD_PRO
		cPosition = getPosition(mul4(s_transform[0],s_transform[1],s_transform[2],cPosition))+ float4(cWorldPosition,0.f);
		cNormal = float3(0,0,-1);
	#elif COORD_WORLD
		cPosition = getPosition(mul4(s_transform[0],s_transform[1],s_transform[2],cPosition + float4(cWorldPosition,0.f)));
		cNormal = normalize(mul3(s_transform[0],s_transform[1],s_transform[2], cNormal));
	#endif
	OUT_DATA(2) = cNormal;
	OUT_POSITION = cPosition;
MAIN_END
//MAIN_END 后需要加ENTE回车键,否则会出现缺失}.
#include <core/shaders/common/common.h>

STRUCT(VERTEX_IN)
	INIT_ATTRIBUTE(float4,0,POSITION)
END

STRUCT(VERTEX_OUT)
	INIT_POSITION
	INIT_OUT(float3,0)
END

CBUFFER(perspective_parameters)
	UNIFORM float4 sphere_transform;
END

MAIN_BEGIN(VERTEX_OUT,VERTEX_IN)
	
	float4 row_0 = s_transform[0];
	float4 row_1 = s_transform[1];
	float4 row_2 = s_transform[2];
	
	float3 direction = IN_ATTRIBUTE(0).xyz * sphere_transform.xyz - float3(0.0f,0.0f,sphere_transform.w);
	float4 vertex = float4(dot(row_0.xyz,direction),dot(row_1.xyz,direction),dot(row_2.xyz,direction),1.0f);
	OUT_POSITION = mul4(s_projection,vertex);
	
	OUT_DATA(0) = direction;
	
	// infinity depth
	OUT_POSITION.z = 0.0f;
	
MAIN_END

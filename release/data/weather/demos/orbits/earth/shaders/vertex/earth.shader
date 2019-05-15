#include <core/shaders/common/common.h>

STRUCT(VERTEX_IN)
	INIT_ATTRIBUTE(float4,0,POSITION)
	INIT_ATTRIBUTE(float4,1,TEXCOORD0)
	INIT_ATTRIBUTE(float4,2,TEXCOORD1)
	INIT_ATTRIBUTE(float4,3,TEXCOORD2)
	INIT_INSTANCE
END

STRUCT(VERTEX_OUT)
	INIT_POSITION
	INIT_OUT(float4,0)
	INIT_OUT(float3,1)
	INIT_OUT(float3,2)
	INIT_OUT(float3,3)
	INIT_OUT(float3,12)
	INIT_OUT(float3,13)
	INIT_OUT(float3,14)
END

UNIFORM_BUFFER_BEGIN(instance_parameters)
	UNIFORM float4 s_instances[126];
UNIFORM_BUFFER_END

MAIN_BEGIN(VERTEX_OUT,VERTEX_IN)
	
	float4 row_0,row_1,row_2;
	
	if(IN_INSTANCE == 0) {
		row_0 = s_transform[0];
		row_1 = s_transform[1];
		row_2 = s_transform[2];
	} else {
		int3 instance = INT3(IN_INSTANCE * 3) + int3(0,1,2);
		row_0 = s_instances[instance.x];
		row_1 = s_instances[instance.y];
		row_2 = s_instances[instance.z];
	}
	
	float4 vertex = mul4(row_0,row_1,row_2,IN_ATTRIBUTE(0));
	
	float3 tangent,binormal,normal;
	getTangentBasis(IN_ATTRIBUTE(2),tangent,binormal,normal);
	
	normal = normalize(mul3(row_0,row_1,row_2,normal));
	tangent = normalize(mul3(row_0,row_1,row_2,tangent));
	binormal = normalize(mul3(row_0,row_1,row_2,binormal));
	
	#ifdef WIRE
		float radius = max(getPosition(vertex).w * s_viewport.w / s_projection[1].y,0.0f);
		vertex.xyz += normal * radius;
	#endif
	
	OUT_POSITION = getPosition(vertex);
	
	OUT_DATA(0) = IN_ATTRIBUTE(1);
	
	OUT_DATA(1) = tangent;
	OUT_DATA(2) = binormal;
	OUT_DATA(13) = normal;
	
	OUT_DATA(12) = s_light_direction;
	OUT_DATA(14) = -vertex.xyz;
	
	OUT_DATA(3).x = dot(s_light_direction,tangent);
	OUT_DATA(3).y = dot(s_light_direction,binormal);
	OUT_DATA(3).z = dot(s_light_direction,normal);
	
MAIN_END

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


#include <core/shaders/mesh/common/common.h>

#include <core/shaders/common/common.h>

STRUCT(VERTEX_IN)
	INIT_ATTRIBUTE(float4,0,POSITION)
	INIT_INSTANCE
END

STRUCT(FRAGMENT_IN)
	INIT_POSITION
END

UNIFORM_BUFFER_BEGIN(instance_parameters)
	UNIFORM float4 s_instances[RENDER_MESH_NUM_INSTANCES * 3];
UNIFORM_BUFFER_END

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	float4 row_0,row_1,row_2;
	
	#ifdef USE_CLUTTER_CLUSTER_PARAMETERS
	{
		float4x4 transform = float4x4_identity;
		
		int instance = IN_INSTANCE * 3;
		setRow(transform, 0, s_clutter_cluster_instances[instance]);
		setRow(transform, 1, s_clutter_cluster_instances[++instance]);
		setRow(transform, 2, s_clutter_cluster_instances[++instance]);
		transform = mul(s_clutter_cluster_modelview, transform);
		
		row_0 = getRow(transform, 0);
		row_1 = getRow(transform, 1);
		row_2 = getRow(transform, 2);
	}
	#else
		if(IN_INSTANCE == 0) {
			row_0 = s_transform[0];
			row_1 = s_transform[1];
			row_2 = s_transform[2];
		} else {
			int instance = IN_INSTANCE * 3;
			row_0 = s_instances[instance];
			row_1 = s_instances[++instance];
			row_2 = s_instances[++instance];
		}
	#endif
	
	OUT_POSITION = getPosition(mul4(row_0,row_1,row_2,IN_ATTRIBUTE(0)));
	
MAIN_END

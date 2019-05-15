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

#ifdef PARALLAX && PARALLAX_DEPTH_CUTOUT
	#define USE_CUSTOM_DEPTH
#endif

#ifdef VERTEX
	#include <unigine_project/materials/custom_mesh_base/common/vertex.h>
	#ifdef OUT_GBUFFER_GEODETIC_FLAT_POSITION
		#include <core/shaders/common/geodetic.h>
	#endif
#elif FRAGMENT
	#include <unigine_project/materials/custom_mesh_base/common/fragment.h>
#endif


STRUCT(FRAGMENT_IN)
	INIT_POSITION
	
	INIT_DATA(float4,0,DATA_UV)
	
	INIT_DATA(float3,1,DATA_NORMAL)
	INIT_DATA(float3,2,DATA_TANGENT)
	INIT_DATA(float,3,DATA_SIGN_BINORMAL)
	
	#ifdef OUT_GBUFFER_VELOCITY
		INIT_DATA(float3,4,DATA_NEW_POSITION)
		INIT_DATA(float3,5,DATA_OLD_POSITION)
	#endif
	
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
	
	#ifdef PARALLAX || CALCULATE_TANGENT_SPACE
		INIT_DATA(float3,12,DATA_POSITION)
	#endif
	
	INIT_DATA(float, 13, DATA_OBLIQUE_FRUSTUM)
	
	#ifdef ALPHA_FADE && USE_ALPHA_FADE
		INIT_DATA(float,14,DATA_ALPHA_FADE)
	#endif
	
	#ifdef OUT_GBUFFER_GEODETIC_FLAT_POSITION
		INIT_DATA(float3,15,DATA_GEODETIC_FLAT_POSITION)
	#endif
	
	#ifdef NORMAL_MAP_OBJECT_SPACE
		INIT_DATA(float3x3,16,DATA_TRANSFORM)
	#endif

	INIT_DATA(uint, 17, int_patch_id)///////��դ��ʱ����ֵ MODIFER_NOINTERPOLATION 
	
	#ifdef TWO_SIDED
		INIT_FRONTFACE
	#endif
	

END

#ifdef VERTEX

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	
	#include <unigine_project/materials/custom_mesh_base/common/vertex.h>
	
	#ifdef OUT_GBUFFER_VELOCITY
		// old transform
		#ifdef USE_CLUTTER_CLUSTER_PARAMETERS
		{
			float4x4 old_transform = float4x4_identity;
			
			int instance = IN_INSTANCE * 3;
			setRow(old_transform, 0, s_clutter_cluster_instances[instance]);
			setRow(old_transform, 1, s_clutter_cluster_instances[++instance]);
			setRow(old_transform, 2, s_clutter_cluster_instances[++instance]);
			in_d.texcoord.w = old_transform[0].w;
			old_transform[0].w = 0;
			old_transform = mul(s_clutter_cluster_old_modelview, old_transform);
			
			in_d.row_0 = getRow(old_transform, 0);
			in_d.row_1 = getRow(old_transform, 1);
			in_d.row_2 = getRow(old_transform, 2);
		}
		#else
			if(IN_INSTANCE == 0) {
				in_d.row_0 = s_old_transform[0];
				in_d.row_1 = s_old_transform[1];
				in_d.row_2 = s_old_transform[2];
			}
			else {
				int instance = IN_INSTANCE * 3;
				in_d.row_0 = s_old_instances[instance];
				in_d.row_1 = s_old_instances[++instance];
				in_d.row_2 = s_old_instances[++instance];
			}
		#endif

		
		in_d.imodelview = s_old_imodelview;
		in_d.position = ATTRIBUTE_OLD_POSITION;
		
		#ifdef ANIMATION_VEGETATION
			
			in_d.animation_stem = s_material_old_animation_stem;
			
			#ifdef FIELD_ANIMATION
				in_d.animation_field_transforms = s_field_animation_old_transforms;
			#endif
			
			#ifdef LEAFS_GEOMETRY || LEAFS_BILLBOARD
				in_d.animation_leaf = s_material_old_animation_leaf;
			#endif
			
		#endif
		
		COMMON_OUT old_out = getCommon(in_d);
		
		#ifdef PARALLAX
			DATA_NEW_POSITION = mul3(s_imodelview,out_d.position);
			DATA_OLD_POSITION = mul3(s_imodelview,old_out.position);
		#else
			float4 new_position = float4(mul3(s_imodelview,out_d.position),1.0f);
			DATA_NEW_POSITION = mul4(s_modelview_projection_x,s_modelview_projection_y,s_modelview_projection_w,new_position).xyz;
			
			float4 old_position = float4(mul3(s_imodelview,old_out.position),1.0f);
			DATA_OLD_POSITION = mul4(s_modelview_projection_old_x,s_modelview_projection_old_y,s_modelview_projection_old_w,old_position).xyz;
		#endif
	#endif
	
	#ifdef OUT_GBUFFER_GEODETIC_FLAT_POSITION
		DATA_GEODETIC_FLAT_POSITION = geodeticEllipsoidToFlatCameraView(out_d.position);
	#endif
		int_patch_id = DATA_UV.a;
MAIN_END

#elif FRAGMENT

MAIN_BEGIN_DEFERRED(FRAGMENT_IN)
	
	#include <unigine_project/materials/custom_mesh_base/common/fragment.h>
	
	#ifdef OUT_GBUFFER_VELOCITY
		#ifdef PARALLAX
			view *= delta_depth;
			
			float3 new_position = DATA_NEW_POSITION;
			float3 old_position = DATA_OLD_POSITION;
			
			new_position-= mul3(s_old_imodelview,view);
			old_position-= mul3(s_imodelview,view);
			
			new_position = mul4(s_modelview_projection_x,s_modelview_projection_y,s_modelview_projection_w,new_position);
			old_position = mul4(s_modelview_projection_old_x,s_modelview_projection_old_y,s_modelview_projection_old_w,old_position);
			
			gbuffer.velocity = getScreenVelocity(old_position,new_position);
		#else
			gbuffer.velocity = getScreenVelocity(DATA_OLD_POSITION,DATA_NEW_POSITION);
		#endif
		
	#endif
	
	#ifdef OUT_GBUFFER_GEODETIC_FLAT_POSITION
		gbuffer.geodetic_flat_position = DATA_GEODETIC_FLAT_POSITION;
	#endif
	
	//#ifdef ALPHA_TEST
	//	if(gbuffer.transparent * m_color.a <= 0.5f) discard;
	//#endif

	if (m_select_mode >= 0)
	{
		uint iB = int_patch_id / (256 * 256);
		uint iG = (int_patch_id - iB * 256 * 256) / 256;
		uint iR = int_patch_id - iB * 256 * 256 - iG * 256;
		float3 cDeferredColor = float3(0.f, 1.f, 0.f);// float3(iR / 255.f, iG / 255.f, iB / 255.f);//
		#ifdef METALNESS
			GBUFFER.albedo = cDeferredColor;
		#else
			GBUFFER.diffuse = cDeferredColor;
		#endif
		#ifdef TRANSPARENT || ALPHA_TEST
			GBUFFER.transparent = 1.f;
		#endif
	}

	//GBuffer gbuffer = GBufferDefault();
	//gbuffer.albedo = float3(0.f, 1.f, 0.f);
	setGBuffer(gbuffer);

MAIN_END

#endif

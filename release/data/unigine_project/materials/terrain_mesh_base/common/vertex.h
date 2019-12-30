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


#ifndef VERTEX_BASE
	#define VERTEX_BASE
	
	#include <core/shaders/common/common.h>

	#ifdef SPLINE
		#include <core/shaders/common/spline.h>
	#endif

	UNIFORM_BUFFER_BEGIN(instance_parameters)
		UNIFORM float4 s_instances[RENDER_MESH_NUM_INSTANCES * 3];
	UNIFORM_BUFFER_END
	
	UNIFORM_BUFFER_BEGIN(old_instance_parameters)
		UNIFORM float4 s_old_instances[RENDER_MESH_NUM_INSTANCES * 3];
	UNIFORM_BUFFER_END
	INIT_TEXTURE(18, TEX_BOARD_DEPTH)
	INIT_TEXTURE(19, TEX_BOARD_ID)

	CBUFFER(parameters)
		UNIFORM float4 m_uv_transform;
		UNIFORM float m_vertex_balloon;
		UNIFORM float m_triplanar_blend;
		#ifdef DETAIL
			UNIFORM float m_detail_triplanar_blend;
			#ifdef DETAIL_MASK
				UNIFORM float4 m_detail_mask_uv_transform;
				UNIFORM float m_detail_mask_triplanar_blend;
			#endif
		#endif
		#ifdef SHADOW_OFFSET
			UNIFORM float m_shadow_offset;
		#endif
		#ifdef ANGLE_FADE && VEGETATION
			UNIFORM float m_angle_power;
		#endif
	END
///////////////     ortho_parameters       ///////////////////////////
	CBUFFER(ortho_parameters)
		UNIFORM float4 m_modeView_transform[4];
		UNIFORM float4 m_projection_transform[4];
		UNIFORM float4 m_iprojection_transform[4];
		UNIFORM float4 m_viewport;
	END
	
	struct COMMON_IN {
		float3 position;
		float4 texcoord;
		float4 basis;
		float4 row_0;
		float4 row_1;
		float4 row_2;
		float4x4 imodelview;
		#ifdef ANIMATION_VEGETATION
			float4 animation_stem;
			#ifdef LEAFS_GEOMETRY || LEAFS_BILLBOARD
				float3 animation_leaf;
			#endif
			#ifdef FIELD_ANIMATION
				float4 animation_field_transforms[24];
			#endif
		#endif
		int instance;
	};
	
	struct COMMON_OUT {
		float3 position;
		float3 tangent;
		float3 binormal;
		float3 normal;
		float3 object_normal;
		float3 world_position;
	};
	
	COMMON_OUT getCommon(COMMON_IN in_d) {
		
		COMMON_OUT out_d;
		
		#ifdef SPLINE
			
			float3 position = in_d.position;
			int i = in_d.instance;
			
			int forw_axis = s_spline_forward_axis[i];
			float min_v = s_spline_min_max_up_angle[i].x;
			float max_v = s_spline_min_max_up_angle[i].y;
			float up_angle = s_spline_min_max_up_angle[i].z;
			
			// mapped to object space
			float local_t = (position[forw_axis] - min_v) / (max_v - min_v);
			
			// mapped to a region of spline or the same as local_t if no tiling applied
			float global_t = s_spline_t_values[i].x + local_t * (s_spline_t_values[i].y - s_spline_t_values[i].x);
			
			// get basis of segment point
			float3 p = splineCalcSegmentPoint(s_spline_start_point[i].xyz, s_spline_end_point[i].xyz, s_spline_start_tangent[i].xyz, s_spline_end_tangent[i].xyz, global_t) - s_spline_start_point[i].xyz;
			float3 t = normalize(splineCalcSegmentTangent(s_spline_start_point[i].xyz, s_spline_end_point[i].xyz, s_spline_start_tangent[i].xyz, s_spline_end_tangent[i].xyz, global_t));
			float3 n = splineCalcSegmentUpVector(s_spline_start_up[i].xyz, s_spline_end_up[i].xyz, s_spline_min_max_up_angle[i].z, global_t);
			float3 b = normalize(cross(n, t));
			n = normalize(cross(t, b));
			
			float4x4 basis_transform = float4x4_identity;
			
			// TODO: need to fix bug with not working setColumn3 on opengl
			#ifdef OPENGL
				basis_transform[0].xyz = t;
				basis_transform[1].xyz = b;
				basis_transform[2].xyz = n;
				basis_transform[3].xyz = p;
			#else
				setColumn3(basis_transform, 0, t);
				setColumn3(basis_transform, 1, b);
				setColumn3(basis_transform, 2, n);
				setColumn3(basis_transform, 3, p);
			#endif
			
			if (s_spline_forward_axis[i] == 1)
			{
				float4x4 rot = rotate(float3(0.0f, 0.0f, 1.0f), PI / 2.0f);
				basis_transform = mul(basis_transform, rot);
			}
			else if (s_spline_forward_axis[i] == 2)
			{
				float4x4 rot = rotate(float3(0.0f, 1.0f, 0.0f), -PI / 2.0f);
				basis_transform = mul(basis_transform, rot);
			}
			
			position.x *= (s_spline_forward_axis[i] == 0) ? 0.0f : 1.0f;
			position.y *= (s_spline_forward_axis[i] == 1) ? 0.0f : 1.0f;
			position.z *= (s_spline_forward_axis[i] == 2) ? 0.0f : 1.0f;
			in_d.position = mul4(basis_transform, position);
			in_d.basis.xyz = mul3(basis_transform, in_d.basis.xyz);
			
		#endif

		out_d.position = mul4(in_d.row_0,in_d.row_1,in_d.row_2,float4(in_d.position,1.0f)).xyz;
		out_d.world_position = mul4(in_d.imodelview,out_d.position);
		
		#ifdef USE_CLUTTER_CLUSTER_PARAMETERS
			out_d.world_position -= s_clutter_cluster_offset;
		#endif
		
		float3 tangent,binormal,normal;
		
		#ifdef LEAFS_BILLBOARD && VEGETATION
			normal = float3(0.0f,0.0f,length(in_d.row_2.xyz));
			tangent = -float3(length(in_d.row_0.xyz),0.0f,0.0f);
			binormal = -float3(0.0f,length(in_d.row_1.xyz),0.0f);
			
			out_d.object_normal = normal;
			
			if(dot(cross(in_d.row_0.xyz,in_d.row_1.xyz),in_d.row_2.xyz) < 0.0f) binormal = -binormal;
			
			#ifdef ANIMATION_VEGETATION
				float leaf_time = dot(in_d.position,FLOAT3(in_d.animation_leaf.x)) + in_d.animation_leaf.z;
				float leaf_angle = sin(leaf_time) * in_d.animation_leaf.y;
				#ifdef FIELD_ANIMATION
					loop for(int i = 0, j = 0; i < s_field_animation_num_animations.y; i++, j += 3) {
						float4 x = in_d.animation_field_transforms[j + 0];
						float4 y = in_d.animation_field_transforms[j + 1];
						float4 z = in_d.animation_field_transforms[j + 2];
						float attenuation = 1.0f - getFieldAttenuation(out_d.position,x,y,z,s_field_animation_parameters[j + 0],(i < s_field_animation_num_animations.x));
						float4 parameters = s_field_animation_parameters[j + 1];
						leaf_angle += sin(leaf_time + in_d.animation_leaf.z * parameters.z) * in_d.animation_leaf.y * parameters.y * attenuation;
					}
				#endif
				float leaf_sin = sin(leaf_angle);
				float leaf_cos = cos(leaf_angle);
				float3 leaf_tangent = tangent;
				float3 leaf_binormal = binormal;
				tangent = leaf_tangent * leaf_cos - leaf_binormal * leaf_sin;
				binormal = leaf_tangent * leaf_sin + leaf_binormal * leaf_cos;
			#endif
			
			out_d.position -= tangent * in_d.texcoord.z;
			out_d.position += binormal * in_d.texcoord.w;
			
		#else
			
			getTangentBasis(in_d.basis,tangent,binormal,normal);
			
			out_d.object_normal = normal;

			normal = normalize(mul3(in_d.row_0,in_d.row_1,in_d.row_2,normal));
			tangent = normalize(mul3(in_d.row_0,in_d.row_1,in_d.row_2,tangent));
			binormal = normalize(mul3(in_d.row_0,in_d.row_1,in_d.row_2,binormal));
			
		#endif
		
		#ifdef SHADOW_OFFSET
			out_d.position -= float3(0.0f,0.0f,length(in_d.row_2.xyz)) * m_shadow_offset;
		#endif
		
		out_d.tangent = tangent;
		out_d.binormal = binormal;
		out_d.normal = normal;
		
		#ifdef ANIMATION_VEGETATION
			float2 stem_center = mul4(in_d.imodelview,float3(in_d.row_0.w,in_d.row_1.w,in_d.row_2.w)).xy;
			
			#ifdef USE_CLUTTER_CLUSTER_PARAMETERS
				stem_center -= s_clutter_cluster_offset.xy;
			#endif
			
			float stem_scale = max(in_d.position.z * in_d.animation_stem.y,0.0f);
			float stem_angle = dot(stem_center,FLOAT2(in_d.animation_stem.x)) + in_d.animation_stem.w;
			
			float2 stem_offset = getAnimationOffset(stem_angle) * (stem_scale * stem_scale);
			float3 vertex_offset = float3(stem_offset,dot(stem_offset,stem_center - out_d.world_position.xy) * in_d.animation_stem.z);
			out_d.position += mul3(s_material_animation_wind, in_d.imodelview) * (stem_scale * stem_scale);
			
			#ifdef LEAFS_GEOMETRY
				float leaf_scale = dot(in_d.texcoord.zw,FLOAT2(1.0f));
				float leaf_time = dot(in_d.position,FLOAT3(in_d.animation_leaf.x)) + in_d.animation_leaf.z;
				vertex_offset.z += sin(leaf_time) * leaf_scale * in_d.animation_leaf.y;
			#endif
			
			#ifdef FIELD_ANIMATION
				loop for(int i = 0, j = 0; i < s_field_animation_num_animations.y; i++, j += 3) {
					float4 x = in_d.animation_field_transforms[j + 0];
					float4 y = in_d.animation_field_transforms[j + 1];
					float4 z = in_d.animation_field_transforms[j + 2];
					float attenuation = 1.0f - getFieldAttenuation(out_d.position,x,y,z,s_field_animation_parameters[j + 0],(i < s_field_animation_num_animations.x));
					
					float4 parameters = s_field_animation_parameters[j + 1];
					float angle = stem_angle + in_d.animation_stem.w * parameters.z;
					float scale = stem_scale * parameters.x;
					scale *= scale;
					scale *= attenuation;
					
					float2 offset = getAnimationOffset(angle) * scale;
					vertex_offset.xy += offset;
					vertex_offset.z += dot(offset,stem_center - out_d.world_position.xy) * in_d.animation_stem.z;
					
					out_d.position += mul(s_field_animation_parameters[j + 2].xyz, float3x3(x.xyz,y.xyz,z.xyz)) * scale;
				}
			#endif
			
			out_d.position += mul3(in_d.row_0,in_d.row_1,in_d.row_2,vertex_offset);
		#endif
		
		#ifndef VEGETATION && LEAFS_BILLBOARD
			#ifdef WIRE
				float radius = max(getPosition(out_d.position).w * s_viewport.w / s_projection[1].y,0.0f);
				out_d.position += normal * (radius * m_vertex_balloon);
			#elif BALLOON
				out_d.position += normal * (m_vertex_balloon);
			#endif
		#endif
		
		return out_d;
	}
	
	
#else
	
	COMMON_IN in_d;
	
	in_d.texcoord	= ATTRIBUTE_UV;
	in_d.position	= ATTRIBUTE_POSITION.xyz;
	in_d.basis		= ATTRIBUTE_BASIS;
	in_d.imodelview	= s_imodelview;
	in_d.instance	= IN_INSTANCE;
	
	#ifdef ANIMATION_VEGETATION
		
		in_d.animation_stem = s_material_animation_stem;
		
		#ifdef FIELD_ANIMATION
			in_d.animation_field_transforms = s_field_animation_transforms;
		#endif
		
		#ifdef LEAFS_GEOMETRY || LEAFS_BILLBOARD
			in_d.animation_leaf = s_material_animation_leaf;
		#endif
		
	#endif
	
	#ifdef USE_CLUTTER_CLUSTER_PARAMETERS
	{
		float4x4 transform = float4x4_identity;
		
		int instance = IN_INSTANCE * 3;
		setRow(transform, 0, s_clutter_cluster_instances[instance]);
		setRow(transform, 1, s_clutter_cluster_instances[++instance]);
		setRow(transform, 2, s_clutter_cluster_instances[++instance]);
		transform = mul(s_clutter_cluster_modelview, transform);
		
		in_d.row_0 = getRow(transform, 0);
		in_d.row_1 = getRow(transform, 1);
		in_d.row_2 = getRow(transform, 2);

	}
	#else
		if(IN_INSTANCE == 0) {
			in_d.row_0 = s_transform[0];
			in_d.row_1 = s_transform[1];
			in_d.row_2 = s_transform[2];
		} else {
			int instance = IN_INSTANCE * 3;
			in_d.row_0 = s_instances[instance];
			in_d.row_1 = s_instances[++instance];
			in_d.row_2 = s_instances[++instance];
		}
	#endif

	COMMON_OUT out_d = getCommon(in_d);
	#ifdef BOARDMASK
		float4x4 cModeView = float4x4(m_modeView_transform[0][0],m_modeView_transform[0][1],m_modeView_transform[0][2],m_modeView_transform[0][3],
									  m_modeView_transform[1][0],m_modeView_transform[1][1],m_modeView_transform[1][2],m_modeView_transform[1][3],
									  m_modeView_transform[2][0],m_modeView_transform[2][1],m_modeView_transform[2][2],m_modeView_transform[2][3],
									  m_modeView_transform[3][0],m_modeView_transform[3][1],m_modeView_transform[3][2],m_modeView_transform[3][3]);
		float4x4 cProjection = float4x4(m_projection_transform[0][0],m_projection_transform[0][1],m_projection_transform[0][2],m_projection_transform[0][3],
										m_projection_transform[1][0],m_projection_transform[1][1],m_projection_transform[1][2],m_projection_transform[1][3],
										m_projection_transform[2][0],m_projection_transform[2][1],m_projection_transform[2][2],m_projection_transform[2][3],
										m_projection_transform[3][0],m_projection_transform[3][1],m_projection_transform[3][2],m_projection_transform[3][3]);
		float4x4 cIProjection = float4x4(m_iprojection_transform[0][0],m_iprojection_transform[0][1],m_iprojection_transform[0][2],m_iprojection_transform[0][3],
										 m_iprojection_transform[1][0],m_iprojection_transform[1][1],m_iprojection_transform[1][2],m_iprojection_transform[1][3],
										 m_iprojection_transform[2][0],m_iprojection_transform[2][1],m_iprojection_transform[2][2],m_iprojection_transform[2][3],
										 m_iprojection_transform[3][0],m_iprojection_transform[3][1],m_iprojection_transform[3][2],m_iprojection_transform[3][3]);

		float4 cVertex = float4(out_d.world_position, 1.0f);
		cVertex = mul4(cModeView, cVertex);
		cVertex = mul4(cProjection, cVertex);
		float4 fDepthPosition = float4(0.0f,0.0f, 0.0f, 0.0f);
		float4 fBoardId = float4(0.0f, 0.0f, 0.0f, 0.0f);
		if (cVertex.x > -1 && cVertex.x < 1 && cVertex.y > -1 && cVertex.y < 1)
		{
			fDepthPosition = TEXTURE_FETCH(TEX_BOARD_DEPTH, float2((cVertex.x*0.5 + 0.5) * m_viewport.x, (-cVertex.y*0.5 + 0.5) * m_viewport.y));//float2(600, 300));// 
			uint iY = fDepthPosition.b / 1024;
			uint iX = fDepthPosition.b % 1024;
			fBoardId = TEXTURE_FETCH(TEX_BOARD_ID, float2(iX, iY));
			if (fDepthPosition.a > 0 && fBoardId.r > 0)
			{
				float4 position = mul4(cIProjection, float4(cVertex.x, cVertex.y, fDepthPosition.r + fDepthPosition.g, 1.0f));
				position.xyz = position.xyz / position.w;
		
				out_d.world_position.z = position.z - m_modeView_transform[2][3];
				out_d.position = mul4(s_modelview, float4(out_d.world_position, 1.0f)).xyz;
			}
		}
		else
		{
			cVertex.z = fDepthPosition.r;
		}
	#endif
	OUT_POSITION = mul4(s_projection,float4(out_d.position, 1.0f));

	IF_DATA(DATA_OBLIQUE_FRUSTUM)
		DATA_OBLIQUE_FRUSTUM = isObliqueFrustumDiscard(out_d.position);
	ENDIF
	
	IF_DATA(DATA_TRANSFORM)
		DATA_TRANSFORM = float3x3(in_d.row_0.xyz,in_d.row_1.xyz,in_d.row_2.xyz);
	ENDIF
	
	IF_DATA(DATA_POSITION)
		DATA_POSITION = out_d.position;
	ENDIF
	
	IF_DATA(DATA_NORMAL)
		DATA_NORMAL = out_d.normal;
	ENDIF
	
	IF_DATA(DATA_TANGENT)
		DATA_TANGENT = out_d.tangent;
	ENDIF
	
	IF_DATA(DATA_SIGN_BINORMAL)
		DATA_SIGN_BINORMAL = sign(ATTRIBUTE_BASIS.w);
	ENDIF
	
	IF_DATA(DATA_UV)
		DATA_UV = in_d.texcoord;
	ENDIF
	
	IF_DATA(DATA_VERTEX_POSITION)
		DATA_VERTEX_POSITION = in_d.position;
	ENDIF
	
	IF_DATA(DATA_OBJECT_NORMAL)
		DATA_OBJECT_NORMAL = out_d.object_normal;
	ENDIF
	
	IF_DATA(DATA_OVERLAP_UV)
		DATA_OVERLAP_UV.xy = in_d.position.xy;
		DATA_OVERLAP_UV.zw = mul4(s_imodelview,out_d.position).xy;
	ENDIF
	
	IF_DATA(DATA_VERTEX_COLOR)
		DATA_VERTEX_COLOR = ATTRIBUTE_COLOR;
	ENDIF
	
	IF_DATA(DATA_DETAIL_ANGLE_FADE)
		#ifdef DETAIL_ANGLE_FADE0
			DATA_DETAIL_ANGLE_FADE = out_d.object_normal.z;
		#elif DETAIL_ANGLE_FADE1
			DATA_DETAIL_ANGLE_FADE = mul3(s_imodelview,out_d.normal).z;
		#endif
	ENDIF
	
	IF_DATA(DATA_ALPHA_FADE)
		DATA_ALPHA_FADE = getAlphaFade(in_d.row_0,in_d.row_1,in_d.row_2);
	ENDIF
	
	IF_DATA(DATA_ANGLE_FADE_VEGETATION)
		DATA_ANGLE_FADE_VEGETATION = pow(saturate(out_d.normal.z),m_angle_power) * 0.5f + 0.49f;
	ENDIF
	
	IF_DATA(DATA_NOISE_UV)
		#ifdef LEAFS_BILLBOARD && VEGETATION
			float3 noise = out_d.world_position;
			noise -= out_d.tangent * ATTRIBUTE_UV.z;
			noise += out_d.binormal * ATTRIBUTE_UV.w;
			DATA_NOISE_UV = noise;
		#else
			DATA_NOISE_UV = out_d.world_position;
		#endif
	ENDIF

#endif

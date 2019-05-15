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
#elif FRAGMENT
	#include <core/shaders/mesh/common/fragment.h>
#endif

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	
	INIT_DATA(float4,0,DATA_UV)
	
	INIT_DATA(float3,1,DATA_VERTEX_POSITION)
	INIT_DATA(float3,2,DATA_OBJECT_NORMAL)
	
	#ifdef VERTEX_COLOR
		INIT_DATA(float4,3,DATA_VERTEX_COLOR)
	#endif
	
	#ifdef PARALLAX
		INIT_DATA(float3,5,DATA_NORMAL)
		INIT_DATA(float3,6,DATA_TANGENT)
		INIT_DATA(float,7,DATA_SIGN_BINORMAL)
		
		INIT_DATA(float3,8,DATA_POSITION)
	#endif
	
	#ifdef TWO_SIDED
		INIT_FRONTFACE
	#endif
END

#ifdef VERTEX

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	#include <unigine_project/materials/custom_mesh_base/common/vertex.h>
MAIN_END

#elif FRAGMENT

INIT_TEXTURE(13,TEX_EMISSION)

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	#include <core/shaders/mesh/common/uv_select.h>
	
	// parallax
	#ifdef PARALLAX
		
		// TBN matrix
		float3 T = DATA_TANGENT;
		float3 B = float3_one;
		float3 N = DATA_NORMAL;
		
		#ifdef CALCULATE_TANGENT_SPACE
			calculateTBN(T,B,N,DATA_POSITION,base_texcoord);
		#else
			normalizationTBN(T,B,N,DATA_SIGN_BINORMAL);
		#endif
		
		#ifdef TWO_SIDED
			float front_face = IN_FRONTFACE ? 1.0f : -1.0f;
			T *= front_face;
			B *= front_face;
			N *= front_face;
		#endif
		
		float3x3 TBN = float3x3(T,B,N);
		
		float3 view = normalize(DATA_POSITION);
		
		ParallaxIn parallax_in;
		parallax_in.view_ts = normalize(mul(TBN,view));
		parallax_in.uv = base_texcoord;
		
		PARALLAX_INIT(parallax_in)
		
		#ifdef PARALLAX_CUTOUT
			float4 cutout_transform = parallaxCutoutUVTransform(m_parallax_cutout_uv_transform,m_uv_transform);
			
			Parallax parallax = parallaxOcclusionMapping(parallax_in,cutout_transform,TEXTURE_OUT(TEX_PARALLAX));
			
			if(parallax.height < -EPSILON) discard;
			
		#else
			Parallax parallax = parallaxOcclusionMapping(parallax_in,TEXTURE_OUT(TEX_PARALLAX));
		#endif
		
		#ifdef PARALLAX_DEPTH_CUTOUT
			float4 position = float4(DATA_POSITION,1.0f);
			position.xyz -= view * parallaxDeltaDepth(parallax_in,parallax);
			position = getPosition(position);
			OUT_DEPTH = position.z / position.w;
		#endif
		
		base_texcoord -= parallax.uv_offset;
		
	#endif
	
	OUT_COLOR.rgb = TEXTURE_BASE(TEX_EMISSION).rgb * m_emission_color.rgb;
	#ifdef VERTEX_COLOR && VERTEX_EMISSION
		OUT_COLOR.rgb *= DATA_VERTEX_COLOR.rgb;
	#endif
	
	OUT_COLOR.rgb = srgbInv(OUT_COLOR.rgb) * m_emission_scale;
	
	OUT_COLOR.rgb = max(OUT_COLOR.rgb,float3_zero);
	
MAIN_END

#endif

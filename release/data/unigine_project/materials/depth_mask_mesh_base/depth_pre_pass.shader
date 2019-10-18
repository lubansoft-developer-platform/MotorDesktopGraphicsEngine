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

#ifdef !TRANSPARENT_BLEND
	#define DISABLE_OUT_RT
#endif

#ifdef (!PARALLAX_CUTOUT) && (!ALPHA_TEST) && (!PARALLAX_DEPTH_CUTOUT)
	#undef PARALLAX
#endif

#ifdef PARALLAX && PARALLAX_DEPTH_CUTOUT
	#define USE_CUSTOM_DEPTH
#endif

#ifdef VERTEX
	#include <unigine_project/materials/depth_mask_mesh_base/common/vertex.h>
#elif FRAGMENT
	#include <unigine_project/materials/depth_mask_mesh_base/common/fragment.h>
#endif

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	
	INIT_DATA(float4,0,DATA_UV)
	
	INIT_DATA(float3,8,DATA_VERTEX_POSITION)
	INIT_DATA(float3,9,DATA_OBJECT_NORMAL)
	
	#ifdef ALPHA_FADE && USE_ALPHA_FADE
		INIT_DATA(float,1,DATA_ALPHA_FADE)
	#endif
	
	#ifdef PARALLAX
		INIT_DATA(float3,2,DATA_NORMAL)
		INIT_DATA(float3,3,DATA_TANGENT)
		INIT_DATA(float,4,DATA_SIGN_BINORMAL)
		
		INIT_DATA(float3,5,DATA_POSITION)
	#endif
	
	#ifdef ANGLE_FADE_VEGETATION
		INIT_DATA(float,6,DATA_ANGLE_FADE_VEGETATION)
	#endif
	
	INIT_DATA(float, 7, DATA_OBLIQUE_FRUSTUM)
	
	#ifdef TWO_SIDED
		INIT_FRONTFACE
	#endif
	
END

#ifdef VERTEX

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	#include <unigine_project/materials/depth_mask_mesh_base/common/vertex.h>
MAIN_END

#elif FRAGMENT

#ifdef TRANSPARENT_BLEND
	MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
#else
	MAIN_SHADOW_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
#endif
	
	IF_DATA(DATA_OBLIQUE_FRUSTUM)
		if(DATA_OBLIQUE_FRUSTUM > 0.0f) discard;
	ENDIF
	
	IF_DATA(DATA_ALPHA_FADE)
		texture2DAlphaFadeDiscard(DATA_ALPHA_FADE,IN_POSITION.xy);
	ENDIF
	
	#include <core/shaders/mesh/common/uv_select.h>
	
	// parallax
	#ifdef PARALLAX
		
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
		
		Parallax parallax;
		
		ParallaxIn parallax_in;
		parallax_in.view_ts = normalize(mul(TBN,view));
		parallax_in.uv = base_texcoord;
		
		PARALLAX_INIT(parallax_in)
		
		#ifdef PARALLAX_CUTOUT
			
			float4 cutout_transform = parallaxCutoutUVTransform(m_parallax_cutout_uv_transform,m_uv_transform);
			
			parallax = parallaxOcclusionMapping(parallax_in,cutout_transform,TEXTURE_OUT(TEX_PARALLAX));
			
			if(parallax.height < -EPSILON) discard;
			
		#else
			parallax = parallaxOcclusionMapping(parallax_in,TEXTURE_OUT(TEX_PARALLAX));
		#endif
		
		#ifdef PARALLAX_DEPTH_CUTOUT
			float4 position = float4(DATA_POSITION,1.0f);
			position.xyz -= view * parallaxDeltaDepth(parallax_in,parallax);
			position = getPosition(position);
			OUT_DEPTH = position.z / position.w;
		#endif
		
		base_texcoord -= parallax.uv_offset;
		
	#endif
	
	#ifdef ALPHA_TEST
		#ifdef OPACITY_MAP_NORMAL
			#ifdef NORMAL_MAP_OBJECT_SPACE
				float transparent = TEXTURE_BASE(TEX_NORMAL).a;
			#else
				float transparent = TEXTURE_BASE(TEX_NORMAL).b;
			#endif
		#else
			float transparent = TEXTURE_BASE(TEX_COLOR).a;
		#endif
		
		#ifdef ANGLE_FADE_VEGETATION
			transparent *= DATA_ANGLE_FADE_VEGETATION;
		#endif
		
		transparent *= m_color.a * m_transparent;
		transparent = pow(max(transparent,0.0f),m_transparent_pow);
		
		#ifdef JITTER_TRANSPARENCY
			if(transparent < nrandTiled(IN_POSITION.xy,8.0f)) discard;
		#else
			if(transparent < 0.5f) discard;
		#endif
	#endif
	
#ifdef TRANSPARENT_BLEND
	OUT_COLOR = float4_zero;
	MAIN_END
#else
	MAIN_SHADOW_END
#endif

#endif

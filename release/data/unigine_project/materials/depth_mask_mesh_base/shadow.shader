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


#define DISABLE_OUT_RT

#include <core/shaders/mesh/common/common.h>

#ifdef (!PARALLAX_DEPTH_CUTOUT)
	#undef PARALLAX
#endif

#ifdef PARALLAX
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
	
	#ifdef ALPHA_FADE && USE_ALPHA_FADE
		INIT_DATA(float,1,DATA_ALPHA_FADE)
	#endif
	
	#ifdef PARALLAX
		INIT_DATA(float3,2,DATA_NORMAL)
		INIT_DATA(float3,3,DATA_TANGENT)
		INIT_DATA(float,4,DATA_SIGN_BINORMAL)
		
		INIT_DATA(float3,5,DATA_POSITION)
	#endif
	
	#ifdef BASE_MAPPING_TRIPLANAR
		INIT_DATA(float3,6,DATA_OBJECT_NORMAL)
		INIT_DATA(float3,7,DATA_VERTEX_POSITION)
	#endif
	
	#ifdef ANGLE_FADE_VEGETATION
		INIT_DATA(float,6,DATA_ANGLE_FADE_VEGETATION)
	#endif
	
	#ifdef TWO_SIDED
		INIT_FRONTFACE
	#endif
	
END

#ifdef VERTEX

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	#include <unigine_project/materials/depth_mask_mesh_base/common/vertex.h>
MAIN_END

#elif FRAGMENT

MAIN_SHADOW_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
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
		
		float3 view_ts = normalize(mul(TBN,DATA_POSITION));
		
		float4 p = float4(DATA_POSITION,1.0f);
		p.xyz -= normalize(DATA_POSITION) * m_parallax_scale / view_ts.z;
		p = getPosition(p);
		OUT_DEPTH = p.z / p.w;
		
	#endif
	
	
	#ifdef ALPHA_TEST || (!BLEND_NONE)
		#ifdef OPACITY_MAP_NORMAL
			#ifdef NORMAL_MAP_OBJECT_SPACE
				float transparent = TEXTURE_BASE(TEX_NORMAL).a;
			#else
				float transparent = TEXTURE_BASE(TEX_NORMAL).b;
			#endif
		#else
			float transparent = TEXTURE_BASE(TEX_COLOR).a;
		#endif
		
		transparent *= m_color.a * m_transparent;
		transparent = pow(max(transparent,0.0f),m_transparent_pow);
		
		#ifdef ANGLE_FADE_VEGETATION
			transparent *= DATA_ANGLE_FADE_VEGETATION;
		#endif
		
		#ifdef ALPHA_TEST
			if(transparent * m_color.a <= 0.5f) discard;
		#elif TRANSPARENT_SHADOW
			float noise = nrand(frac(IN_POSITION.xy / 4.0f));
			if(noise >= transparent) discard;
		#else
			if(transparent * m_color.a <= 0.0f) discard;
		#endif
		
	#endif
	
MAIN_SHADOW_END

#endif

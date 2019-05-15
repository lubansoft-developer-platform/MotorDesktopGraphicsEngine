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


#include <core/shaders/common/fragment.h>

INIT_TEXTURE(0,TEX_SCREEN_COLOR)

#ifdef DIRT
	INIT_TEXTURE(1,TEX_DIRT)
#endif

#ifdef BLOOM
	INIT_TEXTURE(2,TEX_BLOOM)
#endif

#ifdef SUN_SHAFTS
	INIT_TEXTURE(3,TEX_SUN_SHAFTS)
#endif

#ifdef CROSS
	INIT_TEXTURE(4,TEX_CROSS)
#endif

#ifdef LENS
	INIT_TEXTURE(5,TEX_LENS)
#endif

#ifdef SHADOW_SHAFTS
	INIT_TEXTURE(6,TEX_SHADOW_SHAFTS)
#endif

#ifdef LUT
	INIT_TEXTURE_3D(7,TEX_LUT)
#endif

INIT_TEXTURE(8,TEX_DITHERING)
INIT_TEXTURE(9,TEX_MATERIAL_MASK)

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	INIT_IN(float4,0)
	INIT_IN(float2,1)
END

#ifdef FILMIC
	UNIFORM float4 filmic_curve;
	UNIFORM float4 filmic_white;
#endif

UNIFORM float dirt_scale;

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	float2 uv = IN_DATA(0).xy;
	
	OUT_COLOR = TEXTURE_BIAS_ZERO(TEX_SCREEN_COLOR,uv);
	
	#ifdef BLOOM || SUN_SHAFTS || CROSS || LENS
		float3 dirt = float3_one;
		#ifdef DIRT
			dirt = lerp(dirt,TEXTURE_BIAS_ZERO(TEX_DIRT,IN_DATA(0).zw).rgb,FLOAT3(dirt_scale));
		#endif
		
		#ifdef BLOOM || SUN_SHAFTS || CROSS
			float3 camera_effects = float3_zero;
			#ifdef BLOOM
				camera_effects += TEXTURE(TEX_BLOOM,uv).rgb;
			#endif
			
			#ifdef SUN_SHAFTS
				camera_effects += TEXTURE(TEX_SUN_SHAFTS,uv).rgb;
			#endif
			
			#ifdef CROSS
				camera_effects += TEXTURE(TEX_CROSS,uv).rgb;
			#endif
			
			OUT_COLOR.rgb += camera_effects * dirt;
		#endif
		
		#ifdef LENS
			OUT_COLOR.rgb += max(TEXTURE_2D_CUBIC(TEX_LENS,uv).rgb * dirt,0.0f);
		#endif
		
	#endif
	
	#ifdef SHADOW_SHAFTS
		OUT_COLOR.rgb *= TEXTURE_2D_CUBIC(TEX_SHADOW_SHAFTS,uv).x;
	#endif
	
	#ifdef FILMIC
		int material_mask = TEXTURE(TEX_MATERIAL_MASK,uv).x;
		if(material_mask > 0 || checkMask(material_mask,1<<23))
		{
			float3 x = OUT_COLOR.rgb;
			OUT_COLOR.rgb = x * (x * filmic_curve.x + filmic_curve.y) + filmic_curve.z;
			OUT_COLOR.rgb /= x * (x * filmic_curve.x + filmic_curve.w) + filmic_white.x;
			OUT_COLOR.rgb = max(OUT_COLOR.rgb - filmic_white.y,0.0f) * filmic_white.z;
		}
	#endif
	
	#ifdef LUT
		OUT_COLOR.rgb = TEXTURE_BIAS_ZERO(TEX_LUT,OUT_COLOR.rgb * (31.0f / 32.0f) + 1.0f / 64.0f).rgb;
	#endif
	
	#ifdef RG11B10
		OUT_COLOR.rgb += TEXTURE(TEX_DITHERING,IN_DATA(1)).rgb * (1.0f / 64.0f);
	#else
		OUT_COLOR.rgb += TEXTURE(TEX_DITHERING,IN_DATA(1)).rgb * (1.0f / 256.0f);
	#endif
	
MAIN_END

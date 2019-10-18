#ifndef FRAGMENT_UV_SELECT_BASE
	#define FRAGMENT_UV_SELECT_BASE
	
	#define WEIGHT_TRIPLANAR(NAME,BLEND) float3 NAME = weightTriplanar(DATA_OBJECT_NORMAL,BLEND);
	
	// base mapping
	#define UV_BASE(TYPE,TEXCOORD) TYPE base_texcoord = uvTransform(TEXCOORD,m_uv_transform);
	
	#ifdef BASE_MAPPING_TRIPLANAR
		UV_BASE(float4,DATA_VERTEX_POSITION.xyyz);
		WEIGHT_TRIPLANAR(base_weight,m_triplanar_blend)
	#elif BASE_MAPPING_UV1
		UV_BASE(float2,DATA_UV.zw);
	#else
		UV_BASE(float2,DATA_UV.xy);
	#endif
	
	#ifdef BASE_MAPPING_TRIPLANAR
		#define TEXTURE_BASE(TEXTURE_ID) TEXTURE_TRIPLANAR(TEXTURE_ID,base_texcoord,base_weight)
	#else
		#define TEXTURE_BASE(TEXTURE_ID) TEXTURE(TEXTURE_ID,base_texcoord)
	#endif
	
	// detail mapping
	#ifdef DETAIL
		
		#ifdef DETAIL_MAPPING_BASE
			#define TEXTURE_DETAIL(TEXTURE_ID) TEXTURE_BASE(TEXTURE_ID)
		#else
			#define UV_DETAIL(TYPE,TEXCOORD) TYPE detail_texcoord = uvTransform(TEXCOORD,m_detail_uv_transform);
			#ifdef DETAIL_MAPPING_TRIPLANAR
				UV_DETAIL(float4,DATA_VERTEX_POSITION.xyyz);
				WEIGHT_TRIPLANAR(detail_weight,m_detail_triplanar_blend)
			#elif DETAIL_MAPPING_OVERLAP0
				UV_DETAIL(float2,DATA_OVERLAP_UV.xy);
			#elif DETAIL_MAPPING_OVERLAP1
				UV_DETAIL(float2,DATA_OVERLAP_UV.zw);
			#elif DETAIL_MAPPING_UV1
				UV_DETAIL(float2,DATA_UV.zw);
			#else
				UV_DETAIL(float2,DATA_UV.xy);
			#endif
			
			#ifdef DETAIL_MAPPING_TRIPLANAR
				#define TEXTURE_DETAIL(TEXTURE_ID) TEXTURE_TRIPLANAR(TEXTURE_ID,detail_texcoord,detail_weight)
			#else
				#define TEXTURE_DETAIL(TEXTURE_ID) TEXTURE(TEXTURE_ID,detail_texcoord)
			#endif
		#endif
	#endif
	
	// detail mask mapping
	#ifdef DETAIL_MASK && DETAIL
		
		#ifdef DETAIL_MASK_MAPPING_BASE
			#define TEXTURE_DETAIL_MASK(TEXTURE_ID) TEXTURE_BASE(TEXTURE_ID)
		#elif DETAIL_MASK_MAPPING_DETAIL
			#define TEXTURE_DETAIL_MASK(TEXTURE_ID) TEXTURE_DETAIL(TEXTURE_ID)
		#else
			#define UV_DETAIL_MASK(TYPE,TEXCOORD) TYPE detail_mask_texcoord = uvTransform(TEXCOORD,m_detail_mask_uv_transform);
			
			#ifdef DETAIL_MASK_MAPPING_TRIPLANAR
				UV_DETAIL_MASK(float4,DATA_VERTEX_POSITION.xyyz);
				WEIGHT_TRIPLANAR(detail_mask_weight,m_detail_mask_triplanar_blend)
			#elif DETAIL_MASK_MAPPING_OVERLAP0
				UV_DETAIL_MASK(float2,DATA_OVERLAP_UV.xy);
			#elif DETAIL_MASK_MAPPING_OVERLAP1
				UV_DETAIL_MASK(float2,DATA_OVERLAP_UV.zw);
			#elif DETAIL_MASK_MAPPING_UV1
				UV_DETAIL_MASK(float2,DATA_UV.zw);
			#else
				UV_DETAIL_MASK(float2,DATA_UV.xy);
			#endif
			
			#ifdef DETAIL_MASK_MAPPING_TRIPLANAR
				#define TEXTURE_DETAIL_MASK(TEXTURE_ID) TEXTURE_TRIPLANAR(TEXTURE_ID,detail_mask_texcoord,detail_mask_weight)
			#else
				#define TEXTURE_DETAIL_MASK(TEXTURE_ID) TEXTURE(TEXTURE_ID,detail_mask_texcoord)
			#endif
		#endif
	#endif
	
#endif
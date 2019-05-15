#include <core/shaders/common/common.h>

STRUCT(FRAGMENT_OUT)
	INIT_COLOR(TYPE_RGBA)
END


STRUCT(FRAGMENT_IN)
	INIT_POSITION
	INIT_IN(float3,0)
END

INIT_TEXTURE_CUBE(0,TEX_0)

CBUFFER(parameters)
	UNIFORM float stars_intensity;
	UNIFORM float stars_pow;
	
	UNIFORM float4 sun_color;
	UNIFORM float sun_intensity;
	UNIFORM float sun_pow;
END

MAIN_BEGIN(FRAGMENT_OUT,FRAGMENT_IN)
	
	OUT_COLOR = TEXTURE(TEX_0,IN_DATA(0));
	OUT_COLOR = pow(OUT_COLOR,FLOAT4(stars_pow)) * stars_intensity;
	OUT_COLOR += sun_color * pow(saturate(dot(normalize(IN_DATA(0)),float3(0.0f,0.0f,1.0f))),sun_pow) * sun_intensity;
	OUT_COLOR.a = 1.0f;
	OUT_COLOR.rgb = pow(OUT_COLOR.rgb,float3_isrgb);
	
MAIN_END

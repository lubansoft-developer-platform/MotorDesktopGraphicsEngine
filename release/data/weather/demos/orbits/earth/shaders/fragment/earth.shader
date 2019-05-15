#include <core/shaders/common/fragment.h>

STRUCT(FRAGMENT_IN)
	INIT_POSITION
	INIT_IN(float4,0)
	INIT_IN(float3,1)
	INIT_IN(float3,2)
	INIT_IN(float3,3)
	INIT_IN(float3,12)
	INIT_IN(float3,13)
	INIT_IN(float3,14)
END

#ifndef OPENGL
	STRUCT(FRAGMENT_EART_OUT)
		INIT_COLOR(TYPE_RGBA)
	END
#endif

INIT_TEXTURE(0,TEX_0)
INIT_TEXTURE(1,TEX_1)
INIT_TEXTURE(2,TEX_2)
INIT_TEXTURE(3,TEX_3)
INIT_TEXTURE(4,TEX_4)
INIT_TEXTURE(5,TEX_5)
INIT_TEXTURE(6,TEX_6)
INIT_TEXTURE(7,TEX_7)
INIT_TEXTURE(8,TEX_8)
INIT_TEXTURE(9,TEX_9)

CBUFFER(parameters)
	UNIFORM float4 diffuse_color;
	UNIFORM float4 specular_color;
	UNIFORM float4 emission_color;
	
	UNIFORM float4 cloud_color;
	UNIFORM float normal_cloud_s;
	UNIFORM float shadow;
	UNIFORM float shadow_bias;
	UNIFORM float shadow_int;
	
	
	UNIFORM float atmo_int;
	UNIFORM float fog_mountain;
	UNIFORM float pow_fog_mountain;
	
	UNIFORM float emission_terminator_pow;
	UNIFORM float emission_terminator_bias;
	
	UNIFORM float emission_pow;
	UNIFORM float emission_scale;
	
	UNIFORM float4 water_color;
	
	UNIFORM float4 specular_0;
	UNIFORM float4 specular_1;
	UNIFORM float specular_pow;
	UNIFORM float specular_bias;
	
	UNIFORM float normal_scale;
	UNIFORM float normal_cloud_scale;
	
	UNIFORM float lod;
END

float getSpecularEarth(float gloss,float3 normal,float3 light_direction,float3 camera_direction) {
	float roughness = 1.0f - gloss * 0.98f;
	float alpha = roughness * roughness;
	float alpha_sqr = alpha * alpha;
	float pi = 3.14159f;
	float F0 = 1.0f;
	
	float3 L = normalize(light_direction);
	float3 V = normalize(camera_direction);
	float3 N = normalize(normal + L * 0.15f);
	float3 H = normalize(L + V);
	
	float dotNL = saturate(dot(N,L));
	float dotNV = saturate(dot(N,V));
	float dotNH = saturate(dot(N,H));
	float dotLH = saturate(dot(L,H));
	
	float denom = dotNH * dotNH * (alpha_sqr - 1.0f) + 1.0f;
	float D = alpha_sqr / (pi * denom * denom);
	
	float dotLH5 = pow(1.0f - dotLH, 5.0f);
	float F = F0 + (1.0 - F0) * dotLH5;
	
	float k = alpha / 8.0f;
	
	float vis = 1.0f / ((dotNL * (1.0f - k) + k) * (dotNV * (1.0f - k) + k));
	
	return pow(dotNL,2.0f) * D * F * vis;
}

MAIN_BEGIN(FRAGMENT_EART_OUT,FRAGMENT_IN)
	
	float2 UV = clamp(IN_DATA(0).xy,0.001f,0.999f);
	
	float3 emission = (TEXTURE(TEX_3,UV) * emission_color).rgb * emission_scale;
	
	float3 N = normalize(IN_DATA(13));
	float3 T = normalize(IN_DATA(1));
	float3 B = normalize(IN_DATA(2));
	
	float3 V = normalize(IN_DATA(14));
	float3 L = normalize(IN_DATA(12));
	
	//alpha
	float dotVN = saturate(dot(V,N));
	OUT_COLOR.a = saturate(pow(saturate(pow(dotVN,0.5f) * 3.0f),10.0f));
	
	//normal
	float3 normal = TEXTURE(TEX_1,UV).rgb * normal_scale;
	normal.z = sqrt(saturate(1.0f - dot(normal.xy,normal.xy)));
	normal = normalize(T * normal.x + B * normal.y + N * normal.z);
	
	//normal_cloud
	float3 normal_cloud = TEXTURE(TEX_6,UV).rgb * normal_cloud_scale;
	normal_cloud.z = sqrt(saturate(1.0f - dot(normal_cloud.xy,normal_cloud.xy)));
	normal_cloud = normalize(T * normal_cloud.x + B * normal_cloud.y + N * normal_cloud.z);
	
	//diffuse
	float3 diffuse = (TEXTURE(TEX_0,UV) * diffuse_color).rgb;
	
	//water
	float4 water = water_color;
	water.a *= TEXTURE(TEX_2,UV).r;
	diffuse *= 1.0f - water.a;
	diffuse += water.rgb * water.a;
	
	float dotLN = dot(L,normal);
	diffuse *= TEXTURE(TEX_8,FLOAT2((dotLN + 1.0f) * 0.5f)).rgb;
	
	//Specular
	float4 specular = specular_color * TEXTURE(TEX_2,UV).r;
	float fresnel = saturate(1.0f - abs(dot(V,normal) * rsqrt(dot(V,V))));
	specular.rgb = lerp(specular.rgb ,float3_one,pow(fresnel,5.0f));
	specular.rgb *= getSpecularEarth(specular.a,normal,L,V);
	diffuse += specular.rgb * lerp(specular_0.rgb , specular_1.rgb * 8.0f, pow(saturate(dot(-L,N - L * specular_bias)),specular_pow)) * OUT_COLOR.a * water.a;
	
	//light_atmo
	dotLN = dot(L,normal_cloud);
	float3 light_atmo = TEXTURE(TEX_9,FLOAT2((dotLN + 1.0f) * 0.5f)).rgb;
	
	//shadow_cloud
	float2 uv_shadow = clamp(UV + IN_DATA(3).xy * shadow,0.001f,0.999f);
	diffuse *= saturate(1.0f - TEXTURE_BIAS(TEX_5,uv_shadow,shadow_bias).r * shadow_int * cloud_color.a);
	
	//cloud
	float4 cloud = FLOAT4(TEXTURE(TEX_5,UV).r) * cloud_color;
	cloud.rgb *= light_atmo;
	diffuse *= 1.0f - cloud.a;
	diffuse += cloud.rgb * cloud.a;
	
	float alpha_diffuse = saturate(pow(saturate(pow(dotVN,0.6f) * 3.0f),10.0f));
	diffuse *= alpha_diffuse;
	
	//atmo_ramp
	float height = TEXTURE(TEX_4,UV).x * alpha_diffuse;
	float4 atmo_ramp = TEXTURE(TEX_7,FLOAT2(dotVN));
	atmo_ramp.a *= atmo_int * saturate(fog_mountain - pow(height,pow_fog_mountain));
	atmo_ramp.rgb *= light_atmo;
	atmo_ramp.rgb *= 1.0f + (1.0f - alpha_diffuse) * pow(saturate(dot(-V,L)),20.0f) * 2.0f;
	
	OUT_COLOR.rgb = lerp(diffuse,atmo_ramp.rgb,FLOAT3(atmo_ramp.a)) * s_light_color.rgb;
	
	OUT_COLOR.rgb += pow(emission * (pow(saturate(dot(-L,N + L * emission_terminator_bias)),emission_terminator_pow)),FLOAT3(emission_pow)) * (1.0f - cloud.a);
	
	OUT_COLOR.rgb = pow(OUT_COLOR.rgb,float3_isrgb);
	
MAIN_END

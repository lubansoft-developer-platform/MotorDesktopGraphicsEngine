#include <core/systems/tracker/tracker.h>

using Unigine::Tracker;


Tracker tracker;
TrackerTrack sun_rotation;
TrackerTrack moon_rotation;
TrackerTrack day_cycle_sunny;
TrackerTrack day_cycle_cloudy;
TrackerTrack clouds_control;
TrackerTrack rain_control;
TrackerTrack wet_control;
TrackerTrack wind_control;

float flTime = 0.0f;//0~24
float flCloud = 0.0f; // 0~1
float flRain = 0.0f;
float flWind = 0.0f;


void InitWeather()
{
	tracker = new Tracker();
	sun_rotation = tracker.loadTrack("weather/tracks/sun_rotation.track");
	moon_rotation = tracker.loadTrack("weather/tracks/moon_rotation.track");
	day_cycle_sunny = tracker.loadTrack("weather/tracks/day_cycle_sunny.track");
	day_cycle_cloudy = tracker.loadTrack("weather/tracks/day_cycle_cloudy.track");
	clouds_control = tracker.loadTrack("weather/tracks/clouds_control.track");
	rain_control = tracker.loadTrack("weather/tracks/rain_control.track");
	wet_control = tracker.loadTrack("weather/tracks/wet_control.track");
	wind_control = tracker.loadTrack("weather/tracks/wind_force_control.track");
	

	
	flTime = 12.0f;
	flCloud = 0.35f;
	flRain = 0.0f;
	flWind = 0.0f;
	
	
	SetTimeszw(flTime, flCloud);
	SetCloudszw(flTime, flCloud);
	SetRainszw(flRain);
	SetWindszw(flWind);
}

float GetTimeszw()
{
	return flTime;
}

float GetCloudszw()
{
	return flCloud;
}

float GetRainszw()
{
	return flRain;
}

float GetWindszw()
{
	return flWind;
}

void SetTimeszw(float fTime, float fCloud)
{
	sun_rotation.set(fTime);
	moon_rotation.set(fTime);
	day_cycle_cloudy.blend(fTime,fCloud);
	day_cycle_sunny.blend(fTime,1.0f - fCloud);
	clouds_control.set(fCloud);
	
	flTime = fTime;
	flCloud = fCloud;
}

void SetCloudszw(float fTime, float fCloud)
{
	day_cycle_cloudy.blend(fTime,fCloud);
	day_cycle_sunny.blend(fTime, 1.0f - fCloud);
	clouds_control.set(fCloud);
	
	flTime = fTime;
	flCloud = fCloud;
}

void SetRainszw(float fRain)
{
	rain_control.blend(fRain, max(fRain, EPSILON));
	wet_control.set(fRain);
	
	flRain = fRain;
}

void SetWindszw(float fWind)
{
	wind_control.set(fWind);
	flWind = fWind;
}
#include <core/unigine.h>
#include <weather/scripts/weather.h>
// This file is in UnigineScript language.
// World script, it takes effect only when the world is loaded.

int init() {
	// Write here code to be called on world initialization: initialize resources for your world scene during the world start.
	
	Player player = new PlayerSpectator();
	player.setPosition(Vec3(0.0f,-3.401f,1.5f));
	player.setDirection(Vec3(0.0f,1.0f,-0.4f));
	engine.game.setPlayer(player);
	
	InitWeather();
	return 1;
}

// start of the main loop
int update() {
	// Write here code to be called before updating each render frame: specify all graphics-related functions you want to be called every frame while your application executes.
	
	return 1;
}

int render() {
	// The engine calls this function before rendering each render frame: correct behavior after the state of the node has been updated.
	
	return 1;
}

int flush() {
	// Write here code to be called before updating each physics frame: control physics in your application and put non-rendering calculations.
	// The engine calls flush() with the fixed rate (60 times per second by default) regardless of the FPS value.
	// WARNING: do not create, delete or change transformations of nodes here, because rendering is already in progress.
	
	return 1;
}
// end of the main loop

int shutdown() {
	// Write here code to be called on world shutdown: delete resources that were created during world script execution to avoid memory leaks.
	
	return 1;
}

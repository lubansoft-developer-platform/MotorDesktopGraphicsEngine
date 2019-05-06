var threeviewObj;
var componentObj;
var projectObj;
var systemObj;
var sceneObj;

var sdkChannel = new QWebChannel(qt.webChannelTransport, function(channel) {
    threeviewObj = channel.objects.threeviewObj;
    sceneObj = channel.objects.sceneObj;
    systemObj = channel.objects.systemObj;
    componentObj = channel.objects.componentObj;
    projectObj = channel.objects.projectObj;
});
import QtQuick 2.7

Canvas {
    property bool horizontal: true
	width: parent.width
    height: 1
    onPaint: {
        var ctx = getContext("2d");
        ctx.lineWidth = horizontal?height:width;
        ctx.beginPath();
        var gdn;
        if(horizontal){
            gdn = ctx.createLinearGradient(0,0,width,0);
        }
        else {
            gdn = ctx.createLinearGradient(0,0,0,height);
        }
        gdn.addColorStop(0.0,"#1c1e43");
        gdn.addColorStop(0.5,'gray');
        gdn.addColorStop(1,"#1c1e43");
        ctx.strokeStyle = gdn;
        if(horizontal){
            ctx.moveTo(0,0);
            ctx.lineTo(width,0);
        }
        else {
            ctx.moveTo(0,0);
            ctx.lineTo(0,height);
        }
        ctx.stroke();
    }
}

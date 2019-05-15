import QtQuick 2.10
import BLControls 1.0

Canvas {
    property var scaleList: [{value: 1, color: "#1BC8C7"},{value: 1, color: "#107575"}]
    property real fontSize: 12
    onScaleListChanged: requestPaint()
    contextType: "2d"
    visible: true
    onPaint: {
        context.clearRect(0,0,width,height);
        var sum = 0;
        for(var i = 0; i < scaleList.length; i++)
        {
            sum += scaleList[i].value;
        }
        if(sum == 0) return;

        context.lineWidth=0;
        var xOff = x;
        var lean = 5;
        var calcW = width-lean;
        var drawScale = function(index){
            var scaleW = Math.ceil(calcW*scaleList[index].value/sum);
            if(scaleW < 1 && index < scaleList.length-1) return;
            context.fillStyle = scaleList[i].color;
            context.beginPath();
            var scaleTop = xOff===x?x : (xOff+lean);
            context.moveTo(scaleTop, 0);
            context.lineTo(xOff+calcW+lean, 0);
            context.lineTo(xOff+scaleW, height);
            context.lineTo(xOff, height);
            context.closePath();
            context.fill();
            // 填充文字
            context.fillStyle = "#FFFFFF";
            context.font = fontSize+"px 微软雅黑";
            context.beginPath();
            context.fillText(scaleList[index].value, xOff+scaleW*0.5, (height+fontSize)*0.5);
            context.fill();
            xOff+=scaleW;
        }
        for(i = 0; i < scaleList.length; i++)
        {
            drawScale(i);
        }
    }
}

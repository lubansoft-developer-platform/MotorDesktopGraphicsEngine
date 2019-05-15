import QtQuick 2.7
/*
* chartData: [{name:string, value:real, unit:string, startColor:color, endColor:color},...]
*/
Item {
    property var chartData
    property real ratio: 0.3
    property real gap:Math.PI/36
    property string centerText

    onChartDataChanged: {
        canvas.requestPaint();
    }
    Canvas {
        id: canvas
        anchors.fill: parent
        contextType: "2d"
        property real radius: width<height?width/2 : height/2
        onHeightChanged: {
            requestPaint();
        }
        onWidthChanged: {
            requestPaint();
        }
        onPaint: {
            if (context && root.chartData)
            {
                context.clearRect(0,0,width,height)
                drawRing(context);               //最外面的圆
                drawSmallRect(context);          //内部的小矩形
                drawDonut(context);
            }
        }
        function drawRing(ctx) {
            var gdn = ctx.createConicalGradient(0,0,Math.PI/2);
            gdn.addColorStop(0,chartData[0].startColor);
            gdn.addColorStop(1,chartData[chartData.length-1].endColor);
            ctx.fillStyle = gdn;
            ctx.beginPath();
            ctx.arc(width/2,height/2,radius,-Math.PI/2,Math.PI*3/2,true);
            ctx.arc(width/2,height/2,radius-1,Math.PI*3/2,-Math.PI/2,false);
            ctx.fill();
            ctx.closePath();
        }
        function drawSmallRect(ctx) {
            var gdn = ctx.createConicalGradient(0,0,Math.PI/2);
            gdn.addColorStop(0,chartData[0].startColor);
            gdn.addColorStop(1,chartData[chartData.length-1].endColor);
            ctx.strokeStyle = gdn;
            var donutW = radius*ratio;
            var rectH = radius*0.1;
            ctx.lineWidth = Math.ceil(rectH/4);
            ctx.beginPath();
            for(var i=0;i<36;i++) {
                var radian = -2*Math.PI/36*i-Math.PI/2;
                var startX = width/2+Math.cos(radian)*(radius-donutW-7);
                var startY = height/2+Math.sin(radian)*(radius-donutW-7);
                var endX = width/2+Math.cos(radian)*(radius-donutW-7-rectH);
                var endY = height/2+Math.sin(radian)*(radius-donutW-7-rectH);
                ctx.moveTo(startX,startY);
                ctx.lineTo(endX,endY);
                ctx.stroke();
            }
            if(centerText.length > 0){
                ctx.fillStyle = chartData[0].startColor;
                ctx.font = "bold 16px 微软雅黑";
                ctx.fillText(centerText, 40 + ((6 - centerText.length) * 6.5), 105);
            }
            ctx.closePath();
        }
        function drawDonut(ctx) {
            var totalValue = 0;
            var validItemCount = 0;                     //有效数据的项个数
            for(var i=0; i<chartData.length; ++i){
                totalValue+=chartData[i].value;
                if(chartData[i].value !== 0){
                    validItemCount++
                }
            }
            var cumulativeAngle = -Math.PI/2+gap/2;     //累计角度
            var totalAngle = Math.PI*2 - (validItemCount <= 1 ? 0 : validItemCount*gap);
            for(i=0; i<chartData.length; ++i){
                var segmentAngle = chartData[i].value*totalAngle/totalValue;    //每段的角度
                ctx.beginPath();
                ctx.arc(width/2,height/2,radius-3,cumulativeAngle,cumulativeAngle + segmentAngle,false);
				if(validItemCount <= 1)
					ctx.arc(width/2,height/2,radius-radius*ratio-3,cumulativeAngle + segmentAngle,cumulativeAngle,false);
				else
					ctx.arc(width/2,height/2,radius-radius*ratio-3,cumulativeAngle + segmentAngle,cumulativeAngle,true);
                var gdn = ctx.createConicalGradient(0,0,Math.PI/2);
                gdn.addColorStop(0,chartData[i].startColor);
                gdn.addColorStop(1,chartData[i].endColor);
                ctx.fillStyle = gdn;
                ctx.fill();
                ctx.closePath();
                if(chartData[i].value !==0 && validItemCount > 1){
                    cumulativeAngle += segmentAngle+gap;
                }
            }
        }
    }
}

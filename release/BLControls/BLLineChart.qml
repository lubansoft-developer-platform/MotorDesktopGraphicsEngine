import QtQuick 2.7
import QtCharts 2.2
import BLControls 1.0

/*
* @brief 参数介绍
* axisXData: {min:real, max:real, format:string, color:string, ticks:int}
* axisYData: {min:real, max:real, format:string, ticks:int}
* chartData: [{name:string, color:string, fill:bool, points[{x:real,y:real}]}...]
* limitData: [{name:string, color:string, value:real}...]
*/
ChartView {
    id: chartView
    backgroundColor: "transparent"
    margins {
        top: 0; bottom: 0
        left: 0; right: 0
    }
    antialiasing: true
    legend.visible: false

    property var axisXData
    property var axisYData
    property var chartData
    property var limitData
    property color vertLineColor: "gray"

    onChartDataChanged: {
        refreshChart();
        areaCanvas.requestPaint();
        limitLine.requestPaint();
    }
    onLimitDataChanged: limitLine.requestPaint()

    onPlotAreaChanged: {
        areaCanvas.requestPaint();
        limitLine.requestPaint();
    }

    Component.onCompleted: {
        refreshChart();
        limitLine.requestPaint();
        areaCanvas.requestPaint();
    }

    DateTimeAxis {
        id: dateTimeX
        format: axisXData.format
        tickCount: axisXData.ticks
        color: axisXData.color
        min: new Date(axisXData.min)
        max: new Date(axisXData.max)
        gridVisible: false
        labelsFont.family: BLGlobal.fontFamily
        labelsFont.pixelSize: BLGlobal.fontSize
        labelsColor: BLGlobal.textColor
    }

    ValueAxis {
        id: valueY
        min: axisYData.min; max: axisYData.max
        labelFormat: axisYData.format; visible: false
        tickCount: axisYData.ticks
    }

    function refreshChart(){
        chartView.removeAllSeries();
        var count = chartData?chartData.length : 0;
        for(var i=0; i<count; ++i){
            var data = chartData[i];
            var series = chartView.createSeries(ChartView.SeriesTypeLine, data.name, dateTimeX, valueY);
            series.width = 2;
            series.capStyle = Qt.FlatCap;
            series.pointsVisible = false;
            series.useOpenGL = true;
            series.color = data.color;
            var pointCount = data.points.length;
            for(var j=0; j<pointCount; j++){
                var point = data.points[j];
                series.append(point.x,point.y);
            }
        }
    }

    MouseArea {
        anchors.fill: parent
        hoverEnabled: true
        onContainsMouseChanged: {
            if(!containsMouse) {
                promptRect.visible = false;
            }
        }
        onMouseXChanged: {
            if(chartView.count<=0 || mouseX<chartView.plotArea.x
                    || mouseX>(chartView.plotArea.x+chartView.plotArea.width)){
                promptRect.visible = false;
                return;
            }
            var curValue = mapToValue(Qt.point(mouseX,mouseY),chartView.series(0)).x;
            var xValue;
            var minDistance;
            var showpoints = new Array;
            for(var i=0; i<chartView.count; ++i){
                var lineSeries = chartView.series(i);
                for(var j=0; j<lineSeries.count; ++j){
                    var ptValue = lineSeries.at(j);
                    var xDistance = Math.abs(ptValue.x-curValue);
                    if(!minDistance){
                        minDistance = xDistance;
                        xValue = ptValue.x;                        
                    }
                    if(minDistance>xDistance){
                        minDistance = xDistance;
                        xValue = ptValue.x;
                        showpoints.splice(0,showpoints.length);
                    }
                    if(minDistance===xDistance && xValue===ptValue.x){
                        showpoints.push({name:lineSeries.name,color:lineSeries.color,y:ptValue.y});
                    }
                }
            }
            if(showpoints.length===0){
                promptRect.visible = false;
                return;
            }
            var curDate = new Date(xValue);
            var info=curDate.toLocaleString(Qt.locale(),dateTimeX.format);
            delete curDate;
            var maxWidth = fontMetrics.advanceWidth(info);
            info+="\n";            
            for(var k=0; k<showpoints.length; ++k){
                var showText = showpoints[k].name+": "+showpoints[k].y;
                var curWidth = fontMetrics.advanceWidth(showText);
                if(maxWidth<curWidth){
                    maxWidth=curWidth;
                }
                info+=showText;
                info+="\n";
            }
            promptRect.visible = true;
            detailText.text = info;
            detailText.width=maxWidth;
            detailText.height=fontMetrics.height*(showpoints.length+1);
            promptRect.x=mouseX+15; promptRect.y=mouseY+15;
            var curX = chartView.mapToPosition(Qt.point(xValue,showpoints[0].y),chartView.series(0)).x
            chartView.drawVertLine(vertLine.context,curX);
            delete showpoints;
        }
    }

    FontMetrics {
        id: fontMetrics
        font.pixelSize: 10
        font.family: BLGlobal.fontFamily
        font.bold: true
    }

    Rectangle {
        id: promptRect
        visible: false
        width: detailText.width+10
        height: detailText.height+10
        color: Qt.rgba(107/255,107/255,107/255,0.9)
        radius: 3
        Text {
            id: detailText
            anchors.centerIn: parent
            font.family: BLGlobal.fontFamily
            wrapMode: Text.WordWrap
            font.bold: true; font.pixelSize: 10
            color: BLGlobal.textColor
        }
    }

    Canvas {
        id: vertLine
        anchors.fill: parent
        contextType: "2d"
        visible: promptRect.visible
    }

    function drawVertLine(context, posX){
        context.clearRect(0,0,width,height);
        vertLine.requestPaint();
        for(var i = 0;i<chartView.plotArea.height;i+=4){
            context.beginPath();
            context.strokeStyle = chartView.vertLineColor;
            context.lineWidth = 2;
            var posY = i+chartView.plotArea.y;
            context.moveTo(posX,i+chartView.plotArea.y);
            context.lineTo(posX,posY+1);
            context.stroke();
        }
    }

    Canvas {
        id: limitLine
        anchors.fill: parent
        contextType: "2d"
        onPaint: {
            context.clearRect(0,0,width,height);
            if(chartView.count<=0) return;
            var length = chartView.limitData?chartView.limitData.length : 0;
            var firstLine = chartView.series(0);
            for(var i=0; i<length; ++i){
                var data = chartView.limitData[i];
                var lineH = chartView.mapToPosition(Qt.point(0,data.value),firstLine).y
                context.beginPath();
                context.strokeStyle = data.color;
                for(var j=0;j<chartView.plotArea.width;j+=4){
                    var posX = chartView.plotArea.x+j;
                    context.moveTo(posX,lineH);
                    context.lineTo(posX+1,lineH);
                    context.stroke();
                }
                context.font.size = 4;
                context.fillStyle = data.color;
                context.fillText(data.name,j+5,lineH-5);
            }
        }
    }

    Canvas {
        id: areaCanvas
        anchors.fill: parent
        contextType: "2d"
        onPaint: {
            context.clearRect(0,0,width,height);
            context.strokeStyle = "transparent"
            for(var i=0; i<chartView.count; ++i){
                var lineSeries = chartView.series(i);
                if(lineSeries.count<=0 || !chartData[i].fill) continue;
                context.beginPath();
                context.moveTo(chartView.mapToPosition(lineSeries.at(0),lineSeries).x,chartView.plotArea.y+chartView.plotArea.height);
                for(var j=0; j<lineSeries.count; ++j){
                    var pos = chartView.mapToPosition(lineSeries.at(j),lineSeries);
                    context.lineTo(pos.x,pos.y);
                    context.stroke();
                }
                context.lineTo(chartView.mapToPosition(lineSeries.at(j-1),lineSeries).x,chartView.plotArea.y+chartView.plotArea.height);
                context.closePath();
                var gdn = context.createLinearGradient(chartView.plotArea.x,chartView.plotArea.y,
                                                       chartView.plotArea.x,chartView.plotArea.y+chartView.plotArea.height);
                var color = lineSeries.color;
                gdn.addColorStop(0,Qt.rgba(color.r,color.g,color.b,0.5))
                gdn.addColorStop(1,Qt.rgba(0,0,0,0))
                context.fillStyle = gdn;
                context.fill();
            }
        }
    }
}

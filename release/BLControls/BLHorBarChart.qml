import QtQuick 2.7
import QtQuick.Controls 1.4
import QtQuick.Layouts 1.3
import BLControls 1.0

/*
* axisLabel:[string,...]
* series:[{name:string,format:string,startColor:color,endColor:color,data:[real,...]},...]
* format：@value对应value
*/
Item {
    id: root
    width: parent.width
    property alias axisLabel: listView.model
    property var series
    property real maxValue: 10
    property color themeColor
    property real barH: 15
    property real barSpacing: 0
    property bool spaceDraw: true       //是否动态绘制柱状图
    onSeriesChanged: {
        var off=20;
        for(var i=0; i<series.length; i++){
            for(var j=0; j<series[i].data.length; j++){
                var reg=new RegExp("@value","g");
                var format=series[i].format;
                var val=format.replace(reg,series[i].data[j]);
                off = Math.max(off,fontMetrics.advanceWidth(val));
            }
        }
        listView.textOff=off;
    }

    signal axisClicked(var order)

    FontMetrics{
		id: fontMetrics
		font.family: BLGlobal.fontFamily
		font.pointSize: BLGlobal.fontSize
	}
    ListView{
        id: listView
        anchors.fill: parent
        clip: true; spacing: 0 
        onModelChanged: {
            for(var i = 0; i<model.length;i++) {
                axisOff = Math.max(axisOff,fontMetrics.advanceWidth(model[i]));
            }
            axisOff+=5;
        }
        property real axisOff: 20
        property real textOff: 20
        delegate: Item{
            id: serItem
            width: parent.width; height:listView.height/listView.count
            RowLayout {
                anchors.fill: parent
                spacing: 0
                Text {
                    font.family: BLGlobal.fontFamily
                    font.pixelSize: BLGlobal.fontSize
                    Layout.alignment: Qt.AlignLeft
                    Layout.fillHeight: true
                    Layout.preferredWidth: listView.axisOff
                    verticalAlignment: Text.AlignVCenter
                    color: BLGlobal.textColor; text: modelData
                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.axisClicked(index)
                    }
                }
                Rectangle {
                    Layout.fillHeight: true
                    Layout.preferredWidth: 1
                    color: root.themeColor
                }
                Item {
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    ListView {
                        id: serView
                        anchors.centerIn: parent
                        width: parent.width
						spacing: root.barSpacing
                        height: (root.barH+spacing)*count-spacing                        
                        property int nLabel: index
                        property real maxBarW: parent.width-listView.textOff
                        interactive: false
                        model: !root.series?0 : root.series.length
                        delegate: Item{
                            id: barItem
                            width: parent.width; height: root.barH
                            property real value: root.series[index].data[serView.nLabel]
                            RowLayout {
                                anchors.fill: parent
                                DynRectangle {
                                    Layout.alignment: Qt.AlignLeft
                                    Layout.fillHeight: true
                                    Layout.preferredWidth: width
                                    endVal: value*serView.maxBarW/root.maxValue
                                    startColor: root.series[index].startColor
                                    endColor: root.series[index].endColor
                                    spaceDraw: root.spaceDraw
                                }
                                Text {
                                    Layout.alignment: Qt.AlignRight
                                    Layout.fillHeight: true
                                    verticalAlignment: Text.AlignVCenter
                                    font.family: BLGlobal.fontFamily
                                    font.pixelSize: BLGlobal.fontSize
                                    color: BLGlobal.textColor
                                    text: {
                                        var reg = new RegExp("@value","g");
                                        var format = root.series[index].format;
                                        format.replace(reg,barItem.value);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

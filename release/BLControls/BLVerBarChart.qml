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
    property real barW: 15
    property real barSpacing: 0
    property bool spaceDraw: true   //是否动态绘制柱状图
    signal axisClicked(var order)

    FontMetrics{
        id: fontMetrics
        font.family: BLGlobal.fontFamily
        font.pointSize: BLGlobal.fontSize
    }
    ListView {
        id: listView
        anchors.fill: parent
        orientation: ListView.Horizontal
        clip: true; spacing: 0
        property int fontOff: fontMetrics.height+5
        delegate: Item {
            id: serItem
            width: listView.width/listView.count
            height: listView.height
            ColumnLayout {
                anchors.fill: parent
                spacing: 0
                Item {
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    ListView {
                        id: serView
                        anchors.centerIn: parent
                        height: parent.height
                        spacing: root.barSpacing
                        width: (root.barW+spacing)*count-spacing
                        property int nLabel: index
                        property real maxBarH: parent.height-listView.fontOff
                        interactive: false
                        orientation: ListView.Horizontal
                        model: !root.series?0 : root.series.length
                        delegate: Item {
                            id: barItem
                            width: root.barW; height: parent.height
                            property real value: root.series[index].data[serView.nLabel]
                            DynRectangle {
                                id: dynRect
                                anchors {
                                    bottom: parent.bottom
                                }
                                width: parent.width
                                orientation: Qt.Vertical
                                endVal: value*serView.maxBarH/root.maxValue
                                startColor: root.series[index].startColor
                                endColor: root.series[index].endColor
                                spaceDraw: root.spaceDraw
                            }
                            Text {
                                anchors {
                                    bottom: dynRect.top
                                }
                                height: listView.fontOff
                                width: parent.width
                                horizontalAlignment: Text.AlignHCenter
                                verticalAlignment: Text.AlignTop
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
                Rectangle {
                    Layout.fillWidth: true
                    height: 1
                    color: root.themeColor
                }
                Text {
                    font.family: BLGlobal.fontFamily
                    font.pixelSize: BLGlobal.fontSize
                    Layout.alignment: Qt.AlignBottom
                    Layout.fillWidth: true
                    height: listView.fontOff
                    horizontalAlignment: Text.AlignHCenter
                    color: BLGlobal.textColor; text: modelData
                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.axisClicked(index)
                    }
                }
            }
        }
    }
}

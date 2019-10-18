import QtQuick 2.0
import BLControls 1.0

Rectangle{
    id:bgBar
    property alias startColor: progBar.startColor
    property alias endColor: progBar.endColor
    property real maxValue: 0
    property real startValue: 0
    property alias orientation: progBar.orientation
    property real value:0
    BLDynamicBar {
        id: progBar
        startColor: progBarStartColor
        endColor: progBarEndColor
        endVal: value/maxValue*(orientation===Qt.Horizontal?bgBar.width:bgBar.height)
        orientation: bgBar.orientation
        anchors.left: parent.left
        anchors.bottom: parent.bottom
        Component.onCompleted: {
            if(orientation===Qt.Horizontal)
            {
                anchors.leftMargin = startValue/maxValue*bgBar.width
                height = bgBar.height
            }
            else
            {
                anchors.bottomMargin = startValue/maxValue*bgBar.height
                width = bgBar.width
            }
        }
    }
}



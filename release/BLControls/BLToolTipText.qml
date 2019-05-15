import QtQuick 2.9
import QtQuick.Controls 2.2
import QtQuick.Layouts 1.3
import BLControls 1.0

Text {
    id: root
    elide: Text.ElideRight
    font {
        family: BLGlobal.fontFamily
        pixelSize: BLGlobal.fontSize
    }
    color: BLGlobal.textColor
    property bool alwaysToolTip: false
    property color tooltipBackcolor: Qt.rgba(107/255,107/255,107/255,0.9)
    property color tooltipBordercolor : Qt.rgba(107/255,107/255,107/255,0.9)
    property int  tooltipBorderwidth: 1
    property real tooltipBorderRadius: 0
    property var toolTipVerticalAlignment:Text.AlignVCenter
    property var toolTipHorizontalAlignment:Text.AlignLeft
    property alias toolTipFont : textToolTip.font
    property alias tooltip: toolTip
    property bool above: true   //提示信息显示在文本的上面还是下面

    ToolTip {
        id: toolTip
        width: parent.width
        height: textToolTip.contentHeight
        y: above?root.y-height:root.y+height
        x: root.x
        visible: false
        background: Rectangle {
            width: parent.width
            height: textToolTip.contentHeight
            border.width: tooltipBorderwidth
            border.color: tooltipBordercolor
            radius: tooltipBorderRadius
            color:tooltipBackcolor
            Text {
                id: textToolTip
                width: parent.width
                font.family: BLGlobal.fontFamily
                font.pixelSize: BLGlobal.fontSize
                color: BLGlobal.textColor
                horizontalAlignment: root.toolTipHorizontalAlignment
                verticalAlignment: root.toolTipVerticalAlignment
                //Layout.fillWidth: true
                Layout.fillHeight: true
                text: root.text
                wrapMode: Text.WordWrap
            }
        }
    }
    MouseArea {
        id: mouseArea
        anchors.fill: parent
        hoverEnabled: true

        onEntered: {
            toolTip.visible = false
            if(root.alwaysToolTip){
                toolTip.visible = true
            }
            else{
                fontMetrics.font.pixelSize = root.fontSize
                var textlength = fontMetrics.advanceWidth(root.text)/root.lineCount
                if(root.width < textlength){
                    toolTip.visible = true
                }
            }
        }
        onExited: {
            toolTip.visible = false
        }
    }

    FontMetrics {
        id: fontMetrics
        font.family: BLGlobal.fontFamily
        font.pixelSize: BLGlobal.fontSize
    }
}

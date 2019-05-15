import QtQuick 2.7
import BLControls 1.0

Item {
    id: root
    property alias name: nameText.text
    property alias nColor: nameText.color
    property alias value: valueText.text
    property alias vColor: valueText.color
    property real nsize: 16
    property real vsize: 14
    property bool nbold: true
    BLToolTipText {
        id: nameText
        width: parent.width/2
        height: parent.height
        anchors.left: parent.left
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignLeft
        font.family: BLGlobal.fontFamily
        font.pixelSize: root.nsize
        font.bold: root.nbold
        color: BLGlobal.textColor
    }
    BLToolTipText {
        id: valueText
        width: parent.width/2
        height: parent.height
        anchors.right: parent.right
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignRight
        font.family: BLGlobal.fontFamily
        font.pixelSize: root.vsize
        color: BLGlobal.textColor
    }
    GradientLine {
        anchors {
            bottom: parent.bottom; bottomMargin: 1
            left: parent.left; right: parent.right
        }
        height: 1
    }
}

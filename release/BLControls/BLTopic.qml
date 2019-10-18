import QtQuick 2.7
import QtGraphicalEffects 1.12
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
    property alias lineVisible: linearGradient.visible
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
    BLLinearGradient {
        id: linearGradient
        anchors.bottom: parent.bottom
        width: parent.width
        height: 1
    }
}

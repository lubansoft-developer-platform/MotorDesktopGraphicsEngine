import QtQuick 2.9
import QtQuick.Controls 2.2
Rectangle {
    id: root
    implicitWidth: buttonText.width + 6
    implicitHeight: buttonText.height + 2
    property real textSize: 14
    property alias text: buttonText.text

    property color hoveredColor: "#18192e"
    property color normalColor: "transparent"
    property color hoveredBorderColor: "#678fdc"
    color: buttonArea.containsMouse ? hoveredColor : normalColor
    border.color: buttonArea.containsMouse ? hoveredBorderColor : normalColor
    border.width: 1
    signal clicked()
    signal pressed()
    Text {
        id: buttonText
        font.family: BLGlobal.fontFamily
        font.pixelSize: root.textSize
        color: BLGlobal.textColor
        anchors.centerIn: parent
        verticalAlignment: Text.AlignVCenter
        horizontalAlignment: Text.AlignHCenter
    }
    
    MouseArea {
        id: buttonArea
        anchors.fill: parent
        hoverEnabled: true
        onPressed: root.pressed()
        onClicked: root.clicked()
    }
    
}

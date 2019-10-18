import QtQuick 2.9
import QtQuick.Controls 2.2
import BLControls 1.0
Rectangle {
    property color searchBordColor: "#485a76"
    id: root
    color: "transparent"
    border.color: searchBordColor
    border.width: 1
    property string text
    property alias leftInfoComponent: leftInfoLoader.sourceComponent
    property alias rightInfoComponent: rightInfoLoader.sourceComponent
    property alias cursorVisible: textInput.cursorVisible
    property alias placeholderText: textInput.placeholderText
    Loader {
        id: leftInfoLoader
        anchors.verticalCenter: parent.verticalCenter
        anchors.left: parent.left
        onLoaded: {
            item.z = textInput.z + 1
        }
    }
    Loader {
        id: rightInfoLoader
        anchors.verticalCenter: parent.verticalCenter
        anchors.right: parent.right
        onLoaded: {
            item.z = textInput.z + 1
        }
    }
    TextField {
        id: textInput
        font.pixelSize: BLGlobal.fontSize
        font.family: BLGlobal.fontFamily
        color: BLGlobal.textColor
        selectByMouse: true
        verticalAlignment: Text.AlignVCenter
        height: parent.height
        anchors.left: leftInfoLoader.right
        anchors.right: rightInfoLoader.left
        anchors.leftMargin: 5
        anchors.rightMargin: 5
        onEditingFinished: {
            root.text = text
        }
        background: Rectangle {
            color: "transparent"
        }
    }
}

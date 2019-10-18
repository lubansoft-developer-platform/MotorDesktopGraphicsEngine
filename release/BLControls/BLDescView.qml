import QtQuick 2.7
import QtQuick.Controls 2.3
import BLControls 1.0

/*
  * @brief descData: [{name:string; id:string; value:string; note:string},...]
*/
ScrollView {
    id: root
    property var descData
    property real itemHeight: 70

    signal clicked(var id)

    clip: true
    contentWidth: width; contentHeight: listView.height
    BLLinearGradient {
        anchors.top: parent.top
        width: parent.width; height: 1
    }
    ListView {
        id: listView
        width: parent.width
        height: count*root.itemHeight
        spacing: 0; interactive: false
        clip: true
        model: descData
        delegate: Item {
            width: parent.width; height: root.itemHeight
            Item {
                anchors.centerIn: parent
                width: parent.width
                height: nameText.height+valueText.height
                Text {
                    id: nameText
                    font.family: BLGlobal.fontFamily
                    font.pixelSize: BLGlobal.fontSize
                    color: BLGlobal.textColor
                    text: modelData.name
                    MouseArea {
                        anchors.fill: parent
                        onClicked: root.clicked(modelData.id)
                    }
                }
                Text {
                    id: valueText
                    anchors {
                        top: nameText.bottom; topMargin: 2
                        left: nameText.left
                    }
                    font.family: BLGlobal.fontFamily
                    font.pixelSize: BLGlobal.fontSize
                    color: BLGlobal.textColor
                    text: modelData.value
                }
                Text {
                    anchors {
                        top: valueText.top; right: parent.right
                    }
                    font.family: BLGlobal.fontFamily
                    font.pixelSize: BLGlobal.fontSize
                    color: BLGlobal.textColor
                    text: modelData.note
                }
            }
            BLLinearGradient {
                anchors.bottom: parent.bottom
                width: parent.width; height: 1
            }
        }
    }
}

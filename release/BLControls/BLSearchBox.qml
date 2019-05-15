import QtQuick 2.10
import QtQuick.Layouts 1.3
import QtQuick.Controls.Styles 1.4
import QtQuick.Controls 1.4

Rectangle {
    id: root
    color: "transparent"
    property color borderColor: "blue"
    property alias placeholderText: textField.placeholderText
    property alias text: textField.text
    border.color: borderColor
    border.width: 1
    focus: true

    signal searched()

    RowLayout {
        anchors.fill: parent
        TextField {
            id: textField
            Layout.fillWidth: true
            Layout.fillHeight: true
            selectByMouse: true
            font.family: "微软雅黑"
            font.pixelSize: 12
            style: TextFieldStyle {
                textColor: "#ffffff"
                placeholderTextColor: "gray"
                background: Item {
                }
            }
            Keys.onPressed: {
                if(event.key === Qt.Key_Return) {
                    root.searched();
                }
            }
        }
        Item {
            Layout.alignment: Qt.AlignVCenter|Qt.AlignRight
            Layout.preferredWidth: 20
            Layout.fillHeight: true
            Image {
                anchors.centerIn: parent
                property bool hovered: false
                source: "images/search_"+(hovered?"hover.png" : "normal.png")
                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: parent.hovered = true
                    onExited: parent.hovered = false
                    onClicked: root.searched()
                }
            }
        }
    }
}

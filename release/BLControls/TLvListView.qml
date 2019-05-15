import QtQuick 2.7
import QtQuick.Controls 2.3
import QtQuick.Layouts 1.3
import BLControls 1.0

/*
* model: [name:string, value:QVariant]
* delegate: 根元素需要定义一个itemValue属性
*/
Item {
    id: root
    property alias model: repeater.model
    property real headerHeight: 32
    property Component delegate

    function expandIndex(index) {
        var item=repeater.itemAt(index);
        if(item){
            item.expand=true;
        }
    }
    ScrollView {
        id: control
        anchors.fill: parent
        contentWidth: width
        clip: true
        Column {
            id: column
            width: parent.width
            spacing: 20
            Repeater {
                id: repeater
                width: parent.width
                delegate: itemDelegate
            }
        }
    }
    Component {
        id: itemDelegate
        Item {
            width: parent.width
            height: header.height+10+(expand?loader.height : 0)
            property bool expand: false
            Item {
                id: header
                width: parent.width; height: root.headerHeight
                Image {
                    anchors.fill: parent
                    verticalAlignment: Image.AlignVCenter
                    visible: rowLayout.hover
                    source: "images/tree_hover.png"
                }
                RowLayout {
                    id: rowLayout
                    anchors.fill: parent
                    property bool hover: false
                    Text {
                        Layout.alignment: Qt.AlignLeft | Qt.AlignVCenter
                        font.family: BLGlobal.fontFamily; font.pixelSize: BLGlobal.fontSize
                        text: modelData.name; color: BLGlobal.textColor
                    }
                    Image {
                        Layout.alignment: Qt.AlignRight | Qt.AlignVCenter
                        property bool hover: false
                        source: "images/arrow-"+(expand?"down":"right")+"-"+(hover?"hover":"nor")+".png"
                    }
                    MouseArea {
                        anchors.fill: parent
                        hoverEnabled: true
                        onEntered: parent.hover=true
                        onExited: parent.hover=false
                        onClicked: expand = !expand
                    }
                }
            }
            Loader {
                id: loader
                visible: expand
                anchors.top: header.bottom
                anchors.topMargin: 15
                width: parent.width
                height: item.height
                sourceComponent: root.delegate
                onLoaded: {
                    item.itemValue = modelData.value
                }
            }
        }
    }
}

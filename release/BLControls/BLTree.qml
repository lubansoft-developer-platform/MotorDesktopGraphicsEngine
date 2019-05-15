import QtQuick 2.7
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import BLControls 1.0

Item {
    id: root
    property alias treeModel: treeView.model
    signal doubleClickNode(var rowID)
    signal clickNode(var rowID)

    function expandTreeByIndex(index) {
        //var realIndex = treeView.model.mapFromSource(myIndex);
        treeView.expand(index);
    }

    MouseArea{
        anchors.fill: parent
    }

    TreeView {
        id: treeView
        anchors.fill: parent
        headerVisible: false
        frameVisible: false
        style:TreeViewStyle {
            backgroundColor: "transparent"
            indentation: 10
            branchDelegate: Image {
                visible: false
                width: indentation
                height: indentation
            }
            handle: Rectangle {
                x: 4; y: 4
                implicitWidth: 6
                implicitHeight: 6
                color: "#ffffff"
                radius: 5
                opacity: 0.1
            }
            scrollBarBackground: Item {
                implicitWidth: 13
                implicitHeight: 13
            }
            decrementControl: Item {
                implicitWidth: 13
                implicitHeight: 13
            }
            incrementControl: Item {
                implicitWidth: 13
                implicitHeight: 13
            }
            corner: Item {
                implicitWidth: 13
                implicitHeight: 13
            }
        }

        rowDelegate: Item {
            height: 48
            anchors.leftMargin: 0
            Image {
                verticalAlignment: Image.AlignVCenter
                visible: styleData.selected
                source: "images/tree_hover.png"
            }
        }

        itemDelegate: Item {
            height: 48
            Image {
                id: headerImg
                anchors.left: parent.left
                anchors.leftMargin: 0
                anchors.verticalCenter: parent.verticalCenter
                source:{
                    if(typeof(styleData.value.image) === "undefined" || styleData.value.image.length === 0){
                        return "";
                    }else{
                        return styleData.value.image;
                    }
                }
            }
            Text {
                id: name
                anchors.verticalCenter: parent.verticalCenter
                anchors.left: headerImg.right;
                anchors.leftMargin: 7
                opacity: styleData.selected?0.9 : 0.8
                color: BLGlobal.textColor
                elide: styleData.elideMode
                text: styleData.value.name
                font.family: "微软雅黑"
                font.pixelSize: 14
            }
            Text {
                id: value
                anchors.verticalCenter: parent.verticalCenter
                anchors.right: branchImage.left;
                anchors.rightMargin: 2
                opacity: styleData.selected?0.9 : 0.8
                color: BLGlobal.textColor
                elide: styleData.elideMode
                text: styleData.value.value
                font.family: "微软雅黑"
                font.pixelSize: 14
            }
            Image {
                id: branchImage
                anchors.right: parent.right
                anchors.rightMargin: 5
                anchors.verticalCenter: parent.verticalCenter
                width: 32
                height: 32
                fillMode: Image.Pad
                source: !styleData.hasChildren?"" :  ("images/" + (styleData.isExpanded?"arrow-down" : "arrow-right") + (styleData.selected?"-hover.png" : "-nor.png"))
            }
        }

        onClicked: {
            root.clickNode(model.data(index,0x0101).id);
            treeView.isExpanded(index)?treeView.collapse(index) : treeView.expand(index);
        }
        onDoubleClicked: {
            root.doubleClickNode(model.data(index,0x0101).id);
        }

        TableViewColumn
        {
            role: "title"
            title: ""
        }
    }
}

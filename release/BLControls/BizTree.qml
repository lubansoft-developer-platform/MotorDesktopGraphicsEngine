import QtQuick 2.7
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import BLControls 1.0

Item {
    id: root
    property color searchBordColor: searchInput.searchBordColor
    property var treeModel
    signal doubleClickNode(var styleData)
    signal clickNode(var styleData)
    signal sigWheel()
    BLTextInput {
        anchors.top: parent.top
        id: searchInput
        width: parent.width
        height: 30
        leftInfoComponent: Item {
            width: searchImageId.width+10
            height: parent.height
            Image {
                id: searchImageId
                anchors.left: parent.left
                anchors.leftMargin: 10
                source: searchInput.containsMouse ? "images/search_hover.png" : "images/search_normal.png"
                anchors.verticalCenter: parent.verticalCenter
            }
        }
        onTextChanged: {
            if (text) {
                treeviewId.model = treeModel.search(text)
                treeviewId.model.freshModel()
                treeviewId.model.expandAll()
            }
            else {
                treeviewId.model = treeModel
            }

        }
        onCursorVisibleChanged: {
            if (cursorVisible)
            {
                root.sigWheel()
            }
        }
    }
    TreeView {
        id: treeviewId
        frameVisible: false
        anchors.top: searchInput.bottom
        anchors.topMargin: 5
        width: parent.width
        height: parent.height-searchInput.height
        clip: false
        model: root.treeModel
        headerVisible: false
        Connections {
            target: treeviewId.model
            ignoreUnknownSignals: true
            onExpand: {
                treeviewId.expand(index)
            }
            onCollapse: {
                treeviewId.collapse(index)
            }
        }
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
            height: 44
            anchors.leftMargin: 0
            Image {
                verticalAlignment: Image.AlignVCenter
                visible: styleData.selected
                source: "images/tree_hover.png"
            }
        }

        itemDelegate: Item {
            height: 44
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
            BLToolTipText {
                id: name
                height: parent.height
                anchors.left: headerImg.right;
                anchors.leftMargin: headerImg.width === 0 ? 0 : 7
                anchors.right: branchImage.left
                anchors.rightMargin: 7
                opacity: styleData.selected?0.9 : 0.8
                color: BLGlobal.textColor
                text: styleData.value.name ? styleData.value.name : ""
                font.family: BLGlobal.fontFamily
                font.pixelSize: BLGlobal.fontSize
                horizontalAlignment: Text.AlignLeft
                verticalAlignment: Text.AlignVCenter
            }
            Image {
                id: branchImage
                anchors.right: parent.right
                anchors.rightMargin: 5
                anchors.verticalCenter: parent.verticalCenter
                width: 32
                height: 32
                source: !styleData.hasChildren?"" :  ("images/" + (styleData.isExpanded?"arrow-down" : "arrow-right") + (styleData.selected?"-hover.png" : "-nor.png"))
            }
            MouseArea {
                anchors.fill: parent
                hoverEnabled: false
                onClicked: {
                    root.clickNode(styleData);
                    styleData.isExpanded?treeviewId.collapse(styleData.index) : treeviewId.expand(styleData.index);
                }
                onDoubleClicked: {
                    root.doubleClickNode(styleData);
                }
            }
        }

        TableViewColumn {
            role: "title"
            title: ""
            width: root.width
        }
        Item {
            anchors.fill: parent
            anchors.topMargin: 30
            MouseArea {
                anchors.fill: parent
                hoverEnabled: false
                onClicked: { mouse.accepted = false;}
                onDoubleClicked: { mouse.accepted = false;}
                onPositionChanged: { mouse.accepted = false;}
                onPressAndHold: { mouse.accepted = false;}
                onPressed: { mouse.accepted = false;}
                onReleased: { mouse.accepted = false;}
                onWheel: {
                    root.sigWheel()
                    //wheel.accepted = false;
                }
            }
        }
    }
}



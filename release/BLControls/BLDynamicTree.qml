import QtQuick 2.12
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import QtQuick.Window 2.0
import BLControls 1.0

Item {
    id: root
    property alias model: sourceFilter.source
    property alias filterData: sourceFilter.filterData
    property alias sortFilter: sourceFilter.sortFilter
    property int itemHeight: 48
    property string fontFamily: "微软雅黑"
    property int fontSize: 14

    signal doubleClickNode(var rowID)
    signal clickNode(var rowID)

    function expandTreeByIndex(index) {
        var realIndex = treeView.model.mapFromSource(index);
        treeView.expand(realIndex);
    }
    MouseArea{
        anchors.fill: parent
    }
    TreeView {
        id: treeView
        anchors.fill: parent
        headerVisible: false
        frameVisible: false
        model: SortFilterProxy {
            id: sourceFilter
            recursiveFilteringEnabled: true
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
            id: rowItem
            height: root.itemHeight
            anchors.leftMargin: 0
            Image {
                anchors.verticalCenter: parent.verticalCenter
                visible: styleData.row!==undefined && (styleData.selected || hoverHandler.hovered)
                source: "images/tree_hover.png"
            }
            HoverHandler {
                id: hoverHandler
                target: rowItem
            }
        }

        itemDelegate: Item {
            height: root.itemHeight
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
                id: nameText
                anchors.left: headerImg.right
                anchors.leftMargin: 7
                anchors.right: valueText.left
                anchors.rightMargin: 5
                height: parent.height
                verticalAlignment: Text.AlignVCenter
                opacity: styleData.selected?0.9 : 0.8
                color: BLGlobal.textColor
                //elide: styleData.selected ? Text.ElideNone : styleData.elideMode
                wrapMode: Text.Wrap
                text: styleData.value.name
                font.family: root.fontFamily
                font.pixelSize: root.fontSize
            }
            Text {
                id: valueText
                anchors.right: branchImage.left
                anchors.rightMargin: 2
                height: parent.height
                verticalAlignment: Text.AlignVCenter
                opacity: styleData.selected?0.9 : 0.8
                color: BLGlobal.textColor
                elide: styleData.elideMode
                text: styleData.value.value
                font.family: root.fontFamily
                font.pixelSize: root.fontSize
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

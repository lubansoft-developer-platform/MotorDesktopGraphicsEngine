import QtQuick 2.7
import QtQuick.Controls 1.4
import QtQuick.Controls.Styles 1.4
import BLControls 1.0

Item {
    id: root
    width: 280; height: 424
    property alias treeModel: treeView.model
    function expandTreeByIndex(index) {
        treeView.expand(index);
    }
    signal nodeCheckChanged(var theIndex, var chkState)

    TreeView {
        id:treeView
        anchors.fill: parent
        headerVisible:false
        frameVisible:false
        style:TreeViewStyle {
            backgroundColor: "transparent"
            highlightedTextColor:"#9adbda"
            textColor: BLGlobal.textColor
            indentation:32
            branchDelegate: Image {
                width: indentation
                height: indentation
                source: !styleData.hasChildren?"" :  ("images/" + (styleData.isExpanded?"arrow-down-nor.png" : "arrow-right-nor.png"))
                anchors.centerIn: parent
            }
            rowDelegate: Item{
                height: 48
                anchors.leftMargin: 0
            }
            handle: Rectangle {
                x: 4
                y: 4
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
        itemDelegate: Item {
            height: 48
            Image {
                id: logoImage
                source: {
                    if(typeof(styleData.value.image) === "undefined") {
                        return "";
                    }
                    else {
                        return styleData.value.image;
                    }
                }
                anchors.left: parent.left
                anchors.leftMargin: 0
                anchors.verticalCenter: parent.verticalCenter

            }
            Text {
                x: logoImage.x + logoImage.width + 12
                anchors.verticalCenter: parent.verticalCenter
                opacity: 0.8
                color: styleData.textColor
                elide: styleData.elideMode
                text: styleData.value.name
                font.family: BLGlobal.fontFamily
                font.pixelSize: BLGlobal.fontSize
            }
            CheckBox {
                style: CheckBoxStyle {
                    indicator: Rectangle {
                        implicitWidth: 16
                        implicitHeight: 16
                        color: root.color
                        Image {
                            anchors.fill: parent
                            source:{
                                if(2 === control.checked3States){
                                    return "images/" + "checkboxYes.png";
                                } else if(0 === control.checked3States) {
                                    return "images/" + "checkboxNo.png";
                                } else if(1 === control.checked3States) {
                                    return "images/" + "checkboxPartial.png";
                                }
                            }
                        }
                    }
                }
                property int checked3States: styleData.value.checkStat
                anchors.right: parent.right
                anchors.rightMargin: 12
                anchors.verticalCenter: parent.verticalCenter
                onClicked:{
                    var chkState = 0;
                    if(2 == checked3States){
                        chkState = 0;
                    } else if(0 == checked3States || 1 == checked3States) {
                        chkState = 2;
                    }
                    nodeCheckChanged(styleData.index, chkState);
                }
            }
        }
        TableViewColumn
        {
            role: "title"
            title: ""
        }
    }
}

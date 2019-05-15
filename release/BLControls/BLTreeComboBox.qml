import QtQuick 2.9
import QtQuick.Controls 2.2
import QtQuick.Controls 1.4 as QC14
import QtQuick.Controls.Styles 1.4 as QCS14
ComboBox {
    id: root

    property string colorRole: "color"
    property string cCurrentText: qsTr("全部")
    property string imgSource
    property var bordColor: "#a070c0"
    signal clickNode(var styleData)
    
    background: Rectangle {
        color: "transparent"
        border.color: bordColor
        border.width: 1
    }
    contentItem: Item {
        width: root.width
        height: root.height
        Row {
            anchors.fill: parent
            anchors.leftMargin: 10
            anchors.rightMargin: 4
            spacing: 5
            Image {
                id: contentImageId
                width: 16
                height: width
                anchors.verticalCenter: parent.verticalCenter
                source: imgSource
            }
            Rectangle {
                width: parent.width - contentImageId.width-5
                height: parent.height
                color: "transparent"
                BLToolTipText {
                    anchors.fill: parent
                    text: root.cCurrentText
                    verticalAlignment: Text.AlignVCenter
                    horizontalAlignment: Text.AlignLeft
                }
            }
        }
        MouseArea {
            anchors.fill: parent
            onClicked: {
                if(!root.popup.visible){
                    pop.open()
                }
                else{
                    pop.close()
                }
            }
        }
    }
    indicator: Item {}
    property int popHeight: 200

    popup: Popup {
        id: pop
        y: root.height - 1
        width: root.width
        padding: 1
        onVisibleChanged: {
            if (visible && root.model) {
                root.model.expandAll();
            }
        }
        contentItem: QC14.TreeView {
            id: treeView
            clip: true
            model: root.model
            Connections {
                target: root.model
                ignoreUnknownSignals: true
                onExpand: {
                    treeView.expand(index);
                }
                onCollapse: {
                    treeView.collapse(index);
                }
            }
            frameVisible: false
            headerVisible: false
            rowDelegate: Rectangle {
                width: root.width
                height: root.height
                color: "#0e112d"
            }
            itemDelegate: Rectangle {
                width: root.width
                height: root.height
                color: area.containsMouse ? Qt.lighter("#0e112d") : "#0e112d"
                Row {
                    anchors.fill: parent
                    anchors.leftMargin: 4
                    anchors.rightMargin: 4
                    spacing: 5
                    Image {
                        id: itemImageId
                        anchors.verticalCenter: parent.verticalCenter
                        source: styleData.value.image
                    }
                    Rectangle {
                        width: parent.width - itemImageId.width-5
                        height: parent.height
                        color: "transparent"
                        BLToolTipText {
                            anchors.fill: parent
                            text: String(styleData.value.name)
                            verticalAlignment: Text.AlignVCenter
                            horizontalAlignment: Text.AlignLeft
                        }
                    }
                }
                MouseArea {
                    id: area
                    hoverEnabled: false
                    anchors.fill: parent
                    onClicked: {
                        popup.close();
                        root.cCurrentText = String(styleData.value.name);
                        root.clickNode(styleData);
                    }
                }
            }
            QC14.TableViewColumn {
                role: "title"
                title: "title"
                width: root.width
            }
            style:QCS14.TreeViewStyle {
                backgroundColor: "#0e112d"
                //                indentation: 4
                branchDelegate: Item {
                    //                                    width: indentation
                    //                                    height: indentation
                }
                handle: Item {
                    //                    x: 4; y: 4
                    //                    implicitWidth: 6
                    //                    implicitHeight: 6
                    //                    color: "#ffffff"
                    //                    radius: 5
                    //                    opacity: 0.1
                }
                scrollBarBackground: Item {
                    //                    implicitWidth: 13
                    //                    implicitHeight: 13
                }
                decrementControl: Item {
                    //                    implicitWidth: 13
                    //                    implicitHeight: 13
                }
                incrementControl: Item {
                    //                    implicitWidth: 13
                    //                    implicitHeight: 13
                }
                corner: Item {
                    //                    implicitWidth: 13
                    //                    implicitHeight: 13
                }
            }
        }
        enter: Transition {
            NumberAnimation { target: pop; property: "height"; from: 0; to: popHeight; duration: 300 }
        }
        exit: Transition {
            NumberAnimation { target: pop; property: "height"; to: 0; duration: 300}
        }
    }
}

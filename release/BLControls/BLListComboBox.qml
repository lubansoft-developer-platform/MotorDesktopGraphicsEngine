import QtQuick 2.9
import QtQuick.Controls 2.2
import BLControls 1.0
ComboBox {
    id: root
    property color borderColor: "#a070c0"
    property color themeColor: "#303e44"
    background: Rectangle {
        color: "transparent"
        border.color: borderColor
        border.width: 1
    }
    property string colorRole: "color"
    contentItem: Item {
        width: root.width
        height: root.height
        Row {
            anchors.fill: parent
            anchors.leftMargin: 4
            anchors.rightMargin: 4
            spacing: 5
            Rectangle {
                width: 16
                height: width
                anchors.verticalCenter: parent.verticalCenter
                color: root.model[currentIndex][colorRole]
            }
            Item {
                width: parent.width - 21
                height: parent.height
                anchors.verticalCenter: parent.verticalCenter
                z: 100
                Text {
                    id: textId
                    font: BLGlobal.getFontObject()
                    color: BLGlobal.textColor
                    elide: Text.ElideRight
                    anchors.verticalCenter: parent.verticalCenter
                    verticalAlignment: Text.AlignVCenter
                    horizontalAlignment: Text.AlignLeft
                    text: root.model[currentIndex][textRole]
                    MouseArea {
                        anchors.fill: parent
                        hoverEnabled: true
                        onEntered: {
                            fontMetrics.font.pixelSize = BLGlobal.fontSize
                            var textlength = fontMetrics.advanceWidth(textId.text)
                            if(textlength>width){
                                detailText.text = textId.text
                                fontMetrics.font.pixelSize = BLGlobal.fontSize
                                var hintTextWidth = fontMetrics.advanceWidth(textId.text)
                                detailText.width = hintTextWidth>width?width:hintTextWidth
                                promptRect.anchors.top = parent.bottom
                                promptRect.visible = true
                            }
                        }
                        onExited: {
                            promptRect.visible = false
                        }
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

                Rectangle {
                    id: promptRect
                    visible: false
                    width: detailText.width+10
                    height: detailText.height+10
                    anchors.horizontalCenter: textId.horizontalCenter
                    color: root.themeColor
                    radius: 3
                    Text {
                        id: detailText
                        anchors.centerIn: parent
                        font.family: BLGlobal.fontFamily
                        font.bold: true
                        font.pixelSize: BLGlobal.fontSize
                        color: BLGlobal.textColor
                        wrapMode: Text.WordWrap
                    }
                }

                FontMetrics {
                    id: fontMetrics
                    font.family: BLGlobal.fontFamily
                    font.pixelSize: BLGlobal.fontSize
                }
            }
        }
    }
    indicator: Item {}
    property real popHeight: root.height * root.model.length
    popup: Popup {
        id: pop
        y: root.height - 1
        width: root.width
        padding: 1
        contentItem: ListView {
            //  clip: true
            implicitHeight: contentHeight
            model: root.model
            currentIndex: root.currentIndex
            delegate: Rectangle {
                width: root.width
                height: root.height
                color: area.containsMouse ? Qt.lighter(root.themeColor) : root.themeColor
                Row {
                    anchors.fill: parent
                    anchors.leftMargin: 4
                    anchors.rightMargin: 4
                    spacing: 5
                    Rectangle {
                        width: 16
                        height: width
                        anchors.verticalCenter: parent.verticalCenter
                        color: modelData[colorRole]
                    }
                    BLToolTipText {
                        text: modelData[textRole]
                        width: parent.width - 21
                        height: parent.height
                        above: true
                        anchors.verticalCenter: parent.verticalCenter
                        verticalAlignment: Text.AlignVCenter
                        horizontalAlignment: Text.AlignLeft
                    }
                }
                MouseArea {
                    id: area
                    anchors.fill: parent
                    onClicked: {
                        root.currentIndex = index
                        pop.close()
                    }
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

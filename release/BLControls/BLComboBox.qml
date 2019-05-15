import QtQuick 2.7
import QtQuick.Controls 2.2

ComboBox {
    id: combobox

    property var dropList: []
    property alias outText: textField.text

    property color textColor: "#ffffff"
    property color normalColor: "#414458"
    property color highlightColor: "#313343"
    property color selectColor: "#313343"
	property color disableColor: "gray"
    property string headImage
	property string arrowImage: "images/arrowDown.png"
    property string placeholderText
    property bool readonly: false

    model: dropList

    delegate: ItemDelegate {
        width: combobox.width
        contentItem: Text {
            text: modelData
            color: combobox.textColor
            font: combobox.font
            elide: Text.ElideRight
            verticalAlignment: Text.AlignVCenter
        }
        highlighted: combobox.highlightedIndex === index
        background: Rectangle {
            color: highlighted?combobox.highlightColor : combobox.normalColor
        }
        onHighlightedChanged: {
            background.color = highlighted?combobox.highlightColor : combobox.normalColor
        }
        MouseArea {
            anchors.fill: parent
            hoverEnabled: true
            onClicked: {
                combobox.currentIndex = index;
                combobox.outText = combobox.currentText;
                combobox.activated(index);
                combobox.popup.close();
            }
            onEntered: {
                parent.background.color = combobox.highlightColor;
            }
            onExited: {
                parent.background.color = highlighted?combobox.highlightColor : combobox.normalColor
            }
        }
    }

    indicator: Image {
        x: combobox.width - width - combobox.rightPadding
        y: combobox.topPadding + (combobox.availableHeight - height)/2
        sourceSize.width: 12
        sourceSize.height: 8
		source: combobox.arrowImage
    }

    contentItem: Item {
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.rightMargin: combobox.rightPadding + 15

        Item {
            id: header
            height: combobox.headImage === ""?0 : parent.height
            width:height
            Image {
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.verticalCenter: parent.verticalCenter
                sourceSize.width: 32
                sourceSize.height: 32
                source: combobox.headImage
            }
            MouseArea {
                anchors.fill: parent
            }
        }

        TextField {
            id: textField
            anchors.left: header.right
            anchors.right: parent.right
            anchors.top: parent.top
            anchors.bottom: parent.bottom
            verticalAlignment: Text.AlignVCenter
            font: combobox.font
            color: combobox.textColor
			text: readOnly?combobox.currentText : ""
            placeholderText: combobox.placeholderText
            readOnly: combobox.readonly
            background: Rectangle {
                color: combobox.enabled?combobox.normalColor : combobox.disableColor
            }
            hoverEnabled: true
            selectByMouse: true
            selectionColor: combobox.selectColor

            onTextChanged: {
				if(readOnly)
				{
					return;
				}
                combobox.currentIndex = -1;
                for(var i = 0; i < combobox.dropList.length; ++i)
                {
                    var value = combobox.dropList[i];
                    if(value.indexOf(text) !== -1)
                    {
                        combobox.currentIndex = i;
                        break;
                    }
                }
            }

            Keys.onPressed: {
                if(event.key === Qt.Key_Return)
                {

                }
            }
            onFocusChanged: {
                if(focus)
                {
                    selectAll();
                }
            }
        }
    }

    background: Rectangle {
        implicitWidth: combobox.width
        implicitHeight: combobox.height
        color: enabled?combobox.normalColor : combobox.disableColor
    }

    popup: Popup {
        y: combobox.height - 1
        width: combobox.width
        implicitHeight: contentItem.implicitHeight
        padding: 2
        contentItem: ListView {
            clip: true
            implicitHeight: contentHeight
            model: combobox.popup.visible?combobox.delegateModel : null
            currentIndex: combobox.highlightedIndex
            ScrollIndicator.vertical: ScrollIndicator {}
        }

        background: Rectangle {
            color: combobox.normalColor
        }
    }
}

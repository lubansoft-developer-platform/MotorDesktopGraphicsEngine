import QtQuick 2.10
import QtQuick.Controls 2.3

RadioButton {
    id: control
    checked: false
    property color ncolor: "#21be2b"
    property color hcolor: "#17a81a"
    indicator: Rectangle {
        implicitWidth: control.height
        implicitHeight: control.height
        x: control.leftPadding
        y: 0
        radius: height/2
        color: "transparent"
        border.color: control.down ? control.hcolor : control.ncolor
        Rectangle {
            width: parent.height/2
            height: parent.height/2
            x: height/2
            y: height/2
            radius: height/2
            color: control.down ? control.hcolor : control.ncolor
            visible: control.checked
        }
    }
    contentItem: Text {
        text: control.text
        font: control.font
        opacity: enabled ? 1.0 : 0.3
        color: control.down ? control.hcolor : control.ncolor
        verticalAlignment: Text.AlignVCenter
        leftPadding: control.indicator.width + control.spacing
    }
}

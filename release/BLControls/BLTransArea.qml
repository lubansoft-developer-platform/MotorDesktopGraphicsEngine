import QtQuick 2.9
//鼠标透传
//默认全部透传，使用时仅重写需要的事件
MouseArea {
    hoverEnabled: true
    onClicked: { mouse.accepted = false;}
    onDoubleClicked: { mouse.accepted = false;}
    onPositionChanged: { mouse.accepted = false;}
    onPressAndHold: { mouse.accepted = false;}
    onPressed: { mouse.accepted = false;}
    onReleased: { mouse.accepted = false;}
    onWheel: { wheel.accepted = false; }
}

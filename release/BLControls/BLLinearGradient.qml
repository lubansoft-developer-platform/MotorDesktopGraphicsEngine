import QtQuick 2.7
import QtGraphicalEffects 1.12

LinearGradient {
    id: linearGradient
    property color themeColor: "#ffffff"
    anchors.bottom: parent.bottom
    width: parent.width
    height: 1
    start: Qt.point(0, 0)
    end: Qt.point(0, width)
    gradient: Gradient {
        GradientStop { position: 0.0; color: Qt.rgba(themeColor.r/255, themeColor.g/255, themeColor.b/255, 0.02) }
        GradientStop { position: 0.5; color: Qt.rgba(themeColor.r/255, themeColor.g/255, themeColor.b/255, 0.2) }
        GradientStop { position: 1.0; color: Qt.rgba(themeColor.r/255, themeColor.g/255, themeColor.b/255, 0.02) }
    }
}

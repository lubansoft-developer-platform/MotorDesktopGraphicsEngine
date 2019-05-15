import QtQuick 2.7
import QtQuick.Controls 2.3
import VLCQt 1.1

Rectangle {
    id: root
    width: 400; height: 300
    color: "#000000"
    border.width: 1; border.color: "#2a519d"
    property alias url: player.url
    signal dlbClicked(var url)

    BusyIndicator {
        id: busyIndicator
        anchors {
            centerIn: parent
            margins: 1
        }
        width: 100; height: 100
        running: player.state===Vlc.Idle
        visible: player.state===Vlc.Idle
    }
    Image {
        id: errorImage
        anchors.centerIn: parent
        source: "images/video_error.png"
        visible: player.state===Vlc.Error
    }

    VlcPlayer {
        id: player
        logLevel: Vlc.ErrorLevel
    }
    VlcVideoOutput {
        id: video
        source: player
        aspectRatio: Vlc.Ignore
        fillMode: Vlc.Stretch
        anchors {
            fill: parent
            margins: 1
        }
        MouseArea {
            anchors.fill: parent
            onDoubleClicked: root.dlbClicked(root.url)
        }
    }
}

import QtQuick 2.10

Item {
    property alias image: borderImage.source
    property int nLeft: 0
    property int nRight: 0
    property int nTop: 0
    property int nBottom: 0
    BorderImage {
        id: borderImage
        anchors.fill: parent
        border {
            left: nLeft; right: nRight
            top: nTop; bottom: nBottom
        }
    }
}

import QtQuick 2.10
import BLControls 1.0

Item {
    property var bizModel
    property var dataSource: bizModel.model
    property alias borderImage: borderImage.source
    property int borderLeft: 0
    property int borderRight: 0
    property int borderTop: 0
    property int borderBottom: 0

    BorderImage {
        id: borderImage
        anchors.fill: parent
        border {
            left: borderLeft; right: borderRight
            top: borderTop; bottom: borderBottom
        }
    }

    Component.onDestruction: {
        if(bizModel){
            bizModel.hideView();
        }
    }
}

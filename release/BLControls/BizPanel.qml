import QtQuick 2.10
import BLControls 1.0

BorderPanel {
    property var bizModel
    property var dataSource: bizModel.model

    Component.onDestruction: {
        if(bizModel){
            bizModel.hideView();
        }
    }
}

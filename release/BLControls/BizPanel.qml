import QtQuick 2.10
import BLControls 1.0

BorderPanel {
    property var proxyModel
    property var dataSource: proxyModel.model

    Component.onDestruction: {
        if(proxyModel){
            proxyModel.HideView();
        }
    }
}

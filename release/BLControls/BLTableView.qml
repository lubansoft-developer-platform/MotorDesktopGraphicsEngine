import QtQuick 2.2
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.2
import QtQuick.Controls.Styles 1.4
Item{
    id: root
    /*[{ "title": string, "role": string,"width" :double(占父控件的百分比)},"visible" : bool,...];*/
    property alias headerModel: repeater.model;
    onHeaderModelChanged: tableView.loadHeader();
    /*[{ "role1": value1,"role2": value2,....},{...},...];*/
    property alias dataModel: tableView.model;
    property int headerHeight: 36
    property color bgColor: "#00FF00FF"
    property alias itemDelegate: tableView.itemDelegate
    property bool headVisible: true
    property int itemHeight: 35
    Row{
        id: headRow
        anchors.top: parent.top
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.topMargin: 6
        height: 36
        visible: headVisible
        onVisibleChanged: {
            if(!visible)
            {
                height = 0;
                headerHeight = 0;
            }
        }
        spacing:0
        Repeater{
            id: repeater
            anchors.fill: parent
            model:headerModel
            Rectangle{
                id: rect
                width: modelData.width * root.width
                height: parent.height
                color: bgColor
                visible: (parent.visible ? (typeof(modelData.visible) === "undefined" ? true : modelData.visible) : parent.visible)
                Text{
                    anchors.centerIn: parent
                    text: modelData.title
                    visible: modelData.visible
                    font.family: BLGlobal.fontFamily
                    color: BLGlobal.textColor
                    font.pixelSize: BLGlobal.fontSize
                }
            }
        }
    }

    BLLinearGradient {
        id:line
        visible: headVisible
        anchors {
            bottom: headRow.bottom; bottomMargin:  1
            left: headRow.left; right: headRow.right
        }
        height: 1
    }

    TableView {
        id: tableView
        anchors{
            top: line.top
            topMargin: headVisible ? 6 : 0
            left: parent.left
            right: parent.right
            bottom: parent.bottom
        }
        headerVisible: false
        visible: parent.visible
        frameVisible: false
        alternatingRowColors: false
        backgroundVisible : false
        rowDelegate: rowDelegate
        horizontalScrollBarPolicy: Qt.ScrollBarAlwaysOff
        verticalScrollBarPolicy: Qt.ScrollBarAlwaysOff
        sortIndicatorVisible: false

        style: TableViewStyle{
            backgroundColor: bgColor
            transientScrollBars: true
        }
        Component.onCompleted: loadHeader()
        function loadHeader() {
            //循环清空tavleview
            while (tableView.columnCount > 0) {
                tableView.removeColumn(0)
            }
            for (var i = 0; i < headerModel.length; ++i) {
                var tab = columnComponent.createObject(tableView)
                var name = headerModel[i]["role"]
                var title = headerModel[i]["title"]
                tab.title = title
                tab.role = name
                tab.width = headerModel[i]["width"] * root.width;
                tab.visible = typeof(headerModel[i]["visible"]) === "undefined" ? true : headerModel[i]["visible"];
                tableView.addColumn(tab)
            }
        }
    }

    Component {
        id: rowDelegate
        Item {
            anchors.leftMargin: 3
            width: 100
            height: itemHeight
        }
    }
    //用来动态创建TableView一列的组件
    Component {
        id: columnComponent
        TableViewColumn {
            id:tableColumn
            width: 120
            resizable: false
            movable: false
        }
    }
}

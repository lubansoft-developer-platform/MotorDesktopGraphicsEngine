import QtQuick 2.7

/* @brief Tab控件
 * @property dataSource
 * @format [{instID:string, logo:string, logoH:string, bg:string, bgH:string, url:string},...,{...}]
 */

Item {
    id: root
    property var dataSource
    property alias bgImage: background.source
    property alias itemWidth: gridView.cellWidth
    property alias itemHeight: gridView.cellHeight
    property alias count: gridView.count
    property bool allOn: false

    property int activedIndex: -1
    signal loadChanged(var lastID, var curID)

    function setExtra(instID, val){
        for(var i=0; i<gridView.data[0].data.length; ++i){
            var obj = gridView.data[0].data[i];
            if(obj.objectName=== instID){
                obj.extra=val;
                break;
            }
        }
    }

    Image {
        id: background
        anchors.fill: parent
    }

    FontMetrics {
        id: fontMetrics
        font.pixelSize: BLGlobal.fontSize
        font.family: BLGlobal.fontFamily
    }
    GridView {
        id: gridView
        anchors.fill: parent
        model: dataSource
        interactive: false
        clip: true
        delegate: Item {
            width: root.itemWidth; height: root.itemHeight
            objectName: modelData.instID
            focus: true
            property bool bHover: false
            property var extra
            Image {
                id: bgImage
                anchors.fill: parent
                source: activedIndex === index || bHover?modelData.bgH : modelData.bg
            }
            Image {
                id: logoImage
                anchors.centerIn: parent
                source: activedIndex === index || bHover?modelData.logoH : modelData.logo
            }
            Rectangle {
                id: extraRect
                anchors {
                    right: logoImage.right
                    verticalCenter: logoImage.top
                }
                visible: typeof(extra) === "undefined" ? false : true
                color: "red"
                width: fontMetrics.advanceWidth(extra) > 20 ? fontMetrics.advanceWidth(extra) : 20
                height: width
                radius: width/2
                Text {
                    anchors.fill: parent
                    font.family: BLGlobal.fontFamily
                    font.pixelSize: BLGlobal.fontSize
                    color: BLGlobal.textColor; text: extra
                    verticalAlignment: Text.AlignVCenter
                    horizontalAlignment: Text.AlignHCenter
                }
            }
            MouseArea {
                anchors.fill: parent
                hoverEnabled: true
                onEntered: bHover = true
                onExited: bHover = false
                onClicked: {
                    var nLastID = activedIndex != -1?dataSource[activedIndex].instID : "";
                    if(activedIndex === index && !root.allOn) {
                        activedIndex = -1;
                    }
                    else {
                        activedIndex = index;
                    }
                    root.loadChanged(nLastID, activedIndex!=-1?dataSource[activedIndex].instID : "");
                }
            }
        }
    }
}

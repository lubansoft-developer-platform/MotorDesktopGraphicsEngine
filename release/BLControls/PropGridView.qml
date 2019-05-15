import QtQuick 2.7
import QtQuick.Layouts 1.3
import BLControls 1.0
/*
    [{id:string, image:string, name:string, value:string, unit:string}]
*/
GridView{
    id: gridView
    property int colCount: 3
    height: cellHeight*Math.ceil(count/colCount)
    cellHeight: 110; cellWidth: Math.floor(width/colCount)
    delegate: Item {
        width: gridView.cellWidth; height: gridView.cellHeight
        ColumnLayout {
            anchors.fill: parent
            Image {
                Layout.alignment: Qt.AlignHCenter
                property real dia: Math.min(cellWidth,cellHeight)
                Layout.preferredWidth: {
                    if(sourceSize.width>= dia)
                    {
                        return dia*0.85;
                    }
                    return sourceSize.width;
                }
                Layout.preferredHeight: {
                    if(sourceSize.width>= dia)
                    {
                        return dia*0.85;
                    }
                    return sourceSize.height
                }
                source: modelData.image
                Text {
                    anchors.fill: parent
                    font.family: BLGlobal.fontFamily
                    font.pixelSize: BLGlobal.fontSize
                    color: BLGlobal.textColor
                    wrapMode: Text.WordWrap
                    text: {
                        if(modelData.unit===""){
                            return modelData.value;
                        }
                        else if(modelData.value === "")
                            return modelData.unit
                        return modelData.value+"\n"+modelData.unit;
                    }
                    verticalAlignment: Text.AlignVCenter
                    horizontalAlignment: Text.AlignHCenter
                }
            }
            Text {
                Layout.fillWidth: true
                Layout.fillHeight: true
                verticalAlignment: Text.AlignTop
                horizontalAlignment: Text.AlignHCenter
                font.family: BLGlobal.fontFamily
                font.pixelSize: BLGlobal.fontSize
                color: BLGlobal.textColor
                text: modelData.name
            }
        }
    }
}


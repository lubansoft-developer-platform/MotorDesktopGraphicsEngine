import QtQuick 2.7
import QtQuick.Layouts 1.3
import BLControls 1.0

Item {
    id: root
    property real scale: 0.5
    property alias direction: rowLayout.layoutDirection
    property alias chartData: donutChart.chartData
    property alias centerText: donutChart.centerText
    RowLayout {
        id: rowLayout
        anchors.fill: parent
        spacing: 20
        BLDonutChart {
            id: donutChart
            Layout.fillHeight: true
            Layout.preferredWidth: root.width*root.scale
        }
        ListView {
            id: legend
            Layout.fillHeight: true
            Layout.fillWidth: true
            model: root.chartData
            interactive: true; clip: true
            property real itemHeight: height/count
            delegate: Item {
                width: parent.width
                height: legend.itemHeight
                BLDynamicBar{
                    id: dynRect
                    runAnimate: false
                    anchors.verticalCenter: parent.verticalCenter
                    startColor: modelData.startColor
                    endColor: modelData.endColor
                    height: 10; width: 30
                }
                Text {
                    anchors {
                        left: dynRect.right;
                        leftMargin: 10
                        verticalCenter:parent.verticalCenter
                    }
                    width: (legend.width - 40) * 0.8
                    font.family: BLGlobal.fontFamily
                    font.pixelSize: BLGlobal.fontSize
                    color: BLGlobal.textColor
                    verticalAlignment: Text.AlignVCenter
                    text: modelData.name + modelData.value+modelData.unit
                    wrapMode: Text.WordWrap
                }
            }
        }
    }
}

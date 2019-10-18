import QtQuick 2.12
import QtQuick.Layouts 1.3
import QtQml.Models 2.2
import BLControls 1.0

Item {
    id: root
    property var axisLabel: [] // x轴的标签列表[string,...]
    property alias orientation: listView.orientation
    property var series: []     //柱形数据[{name:string,format:"%.f",startColor:color,endColor:color,data:[real,...]},...], format为%.2f保留后两位
    property real maxValue: 0.0
    property color themeColor   //主题颜色
    property int barSpan: 15
    property int barSpacing: 0
    property int axisSpan: Math.floor((orientation===Qt.Horizontal?width : height)/Math.max(listView.count,1))
    property bool runAnimate: true

    FontMetrics {
        id: fontMetrics
        font: BLGlobal.getFontObject()
    }

    readonly property int maxXLength: {
        var maxLen=0;
        for(var i=0, length=axisLabel.length; i<length; i++) {
            maxLen = Math.max(maxLen,fontMetrics.advanceWidth(axisLabel[i]));
        }
        return maxLen;
    }

    function getValText(format, val) {
        var reg=/%\.\d*f/g;
        var valText="";
        if(reg.test(format)) {
            var decimal=RegExp.lastMatch.substring(2,RegExp.lastMatch.length-1);
            valText=format.replace(reg,BLGlobal.analysisValue(val,parseInt(decimal)));
        }
        return valText;
    }

    readonly property int maxValLength: {
        var maxLen=0;
        for(var i=0; i<series.length; i++) {
            for(var j=0; j<series[i].data.length; j++) {
                var val = series[i].data[j];
                val = getValText(series[i].format,val);
                maxLen = Math.max(maxLen,fontMetrics.advanceWidth(val));
            }
        }
        return maxLen;
    }

    onAxisLabelChanged: {
        if(listView.model.model && listView.model.model.length===axisLabel.length) {
            var bsame = true;
            for(var i=0; i<axisLabel.length; i++) {
                if(listView.model.model[i]!==axisLabel[i]) {
                    bsame = false;
                    continue;
                }
            }
            if(bsame) return;
        }
        listView.model.model = axisLabel;
    }

    DelegateModel {
        id: horBarModel
        Component.onCompleted: model = root.axisLabel
        delegate: Item {
            id: horBarItem
            width: root.axisSpan
            height: root.height
            property int axisIndex: index
            property string axisName: modelData
            ColumnLayout {
                anchors.fill: parent
                spacing: 0
                ListView {
                    Layout.preferredWidth: contentWidth
                    Layout.fillHeight: true
                    Layout.alignment: Qt.AlignHCenter
                    orientation: ListView.Horizontal
                    model: !root.series?0 : root.series.length
                    spacing: root.barSpacing
                    delegate: Item {
                        width: root.barSpan
                        height: parent.height
                        property var curData: root.series[index]
                        BLDynamicBar {
                            id: dynHorBar
                            anchors {
                                bottom: parent.bottom
                            }
                            width: parent.width
                            orientation: Qt.Vertical
                            endVal: curData.data[horBarItem.axisIndex]*(parent.height-(root.maxValLength?(fontMetrics.height+5) : 0))/Math.max(root.maxValue,1)
                            startColor: curData.startColor
                            endColor: curData.endColor
                            runAnimate: root.runAnimate
                        }
                        Text {
                            anchors.bottom: dynHorBar.top
                            anchors.bottomMargin: 5
                            anchors.horizontalCenter: parent.horizontalCenter
                            font: BLGlobal.getFontObject()
                            color: BLGlobal.textColor
                            text: root.getValText(curData.format,curData.data[horBarItem.axisIndex])
                            height: text==""?0 : implicitHeight
                        }
                    }
                }
                Rectangle {
                    Layout.fillWidth: true
                    Layout.preferredHeight: 1
                    Layout.bottomMargin: 5
                    color: root.themeColor
                }
                BLToolTipText {
                    Layout.fillWidth: true
                    Layout.preferredHeight: implicitHeight
                    Layout.alignment: Qt.AlignBottom
                    horizontalAlignment: Text.AlignHCenter
                    text: axisName
                }
            }
        }
    }

    DelegateModel {
        id: verBarModel
        Component.onCompleted: model = root.axisLabel
        delegate: Item {
            id: verBarItem
            width: root.width
            height: root.axisSpan
            property int axisIndex: index
            property string axisName: modelData
            RowLayout {
                anchors.fill: parent
                spacing: 0
                Text {
                    Layout.preferredWidth: root.maxXLength
                    Layout.fillHeight: true
                    verticalAlignment: Text.AlignVCenter
                    font: BLGlobal.getFontObject()
                    color: BLGlobal.textColor
                    text: axisName
                }
                Rectangle {
                    Layout.fillHeight: true
                    Layout.preferredWidth: 1
                    Layout.leftMargin: 5
                    color: root.themeColor
                }
                ListView {
                    Layout.fillWidth: true
                    Layout.preferredHeight: contentHeight
                    Layout.alignment: Qt.AlignVCenter
                    model: !root.series?0 : root.series.length
                    spacing: root.barSpacing
                    delegate: Item {
                        width: parent.width
                        height: root.barSpan
                        property var curData: root.series[index]
                        BLDynamicBar {
                            id: dynVerBar
                            anchors {
                                left: parent.left
                            }
                            height: parent.height
                            orientation: Qt.Horizontal
                            endVal: curData.data[verBarItem.axisIndex]*(parent.width-(root.maxValLength?(root.maxValLength+5) : 0))/Math.max(root.maxValue,1)
                            startColor: curData.startColor
                            endColor: curData.endColor
                            runAnimate: root.runAnimate
                        }
                        Text {
                            anchors.left: dynVerBar.right
                            anchors.leftMargin: 5
                            anchors.verticalCenter: parent.verticalCenter
                            font: BLGlobal.getFontObject()
                            color: BLGlobal.textColor
                            text: root.getValText(curData.format,curData.data[verBarItem.axisIndex])
                            height: text==""?0 : implicitHeight
                        }
                    }
                }
            }
        }
    }

    ListView {
        id: listView
        anchors.fill: parent
        spacing: 0; clip: true
        model: orientation===Qt.Horizontal?horBarModel : verBarModel
    }
}

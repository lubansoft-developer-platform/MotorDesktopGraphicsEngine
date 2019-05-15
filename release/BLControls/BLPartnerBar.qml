import QtQuick 2.7
import QtQuick.Layouts 1.3
import BLControls 1.0

Item {
    id: root
    //左边Text默认使用type字段，可在组件外部设置属性为其它字段
    property string leftText: modelData.type
    //右边Text默认使用name字段，可在组件外部设置属性为其它字段
    property string rightText: modelData.name

    property QtObject leftTextObj: leftTextId
    property QtObject rightTextObj: rightTextId

    //分割块颜色
    property string partnerBlockColor: "#485a76"
    //分割线颜色
    property string partnerLineColor: "#207cbc"
    property int leftTextWidth: 32
    RowLayout {
        anchors {
            left: parent.left; right: parent.right
            top: parent.top;
            bottom: parent.bottom;

            topMargin: 5
            bottomMargin: 5
        }
        spacing: 10
        BLToolTipText {
            id: leftTextId
            Layout.preferredWidth: leftTextWidth
            Layout.fillHeight: true
            horizontalAlignment: Text.AlignLeft
            verticalAlignment: Text.AlignVCenter

            wrapMode: Text.WordWrap
            font {
                family: BLGlobal.fontFamily
                pixelSize: BLGlobal.fontSize
            }
            color: BLGlobal.textColor
            text: root.leftText
        }
        Item {
            Layout.preferredWidth: 3
            Layout.fillHeight: true
            Rectangle{
                anchors.centerIn: parent
                width: 1; height: parent.height
                color: partnerBlockColor
            }
            Rectangle{
                anchors.centerIn: parent
                width: 3; height: parent.height*2/6
                color: partnerLineColor
            }
        }
        BLToolTipText {
            id:rightTextId
            font {
                family: BLGlobal.fontFamily
                pixelSize: BLGlobal.fontSize
            }
            color: BLGlobal.textColor
            text: root.rightText
            Layout.fillWidth: true
            Layout.fillHeight: true
            wrapMode: Text.WordWrap
            horizontalAlignment: Text.AlignRight
            verticalAlignment: Text.AlignVCenter
        }
    }

    GradientLine {
        width: parent.width
        anchors.bottom: parent.bottom
    }
}

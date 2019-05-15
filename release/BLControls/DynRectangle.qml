import QtQuick 2.7
import QtGraphicalEffects 1.0

/*colorset: [{begin:string, end:string}]
*/
Rectangle {
    id: root
    property bool spaceDraw: true               //是否动态绘制柱状图
    property int orientation: Qt.Horizontal
    property color startColor
    property color endColor
    property real curVal: orientation===Qt.Vertical?height : width
    property real endVal: 0
    onEndValChanged: {
        if(spaceDraw){
            numberAnimation.from=curVal;
            numberAnimation.to=endVal;
            numberAnimation.restart();
        }
        else{
            orientation === Qt.Vertical? height = endVal: width = endVal
        }
    }

    LinearGradient {
        anchors.fill: parent
        start: orientation===Qt.Horizontal?Qt.point(0, 0) : Qt.point(0,height)
        end: orientation===Qt.Horizontal?Qt.point(width,0) : Qt.point(0,0)
        gradient: Gradient {
            GradientStop { position: 0.0; color: startColor }
            GradientStop { position: 1.0; color: endColor }
        }
    }
    NumberAnimation {
        id: numberAnimation
        target: root
        property: orientation===Qt.Vertical?"height" : "width"
        from: curVal; to: endVal
        duration: 1000
    }
}

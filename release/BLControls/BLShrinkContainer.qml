import QtQuick 2.9
import QtQuick.Controls 2.3
import BLControls 1.0

//收缩容器
Item {
    id: root

    //固定信息部分的高度，需要单独设置，不设置会导致mainContens的y坐标有偏差
    property int infoItemHeight: 240
    //默认间隔
    property int defaultMargin: 10
    //是否在收缩状态
    readonly property bool entered: enteredIndex >= 0
    //收缩item的索引号。不是收缩状态时，值为-1
    property int enteredIndex: -1

    property alias leftTopContents: leftTopItem.children
    property alias rightTopContents: rightTopItem.children
    property alias backContents: backItem.children
    property alias infoContents: infoItem.children
    property alias mainContents: mainItem.children

    //不需要收缩功能的item索引号。
    //mainContents是一个类似Column的容器，其中的Item有一部分可能不需要提供收缩功能（例如：搜索框），
    //要实现这样的功能，只要将这个Item在Column中占的索引号放入列表
    property var noSkrinkList: []
    function back()
    {
        enteredIndex = -1;
        mainItem.back();
    }
    function enterWidthIndex(index)
    {
        enteredIndex = index;
        mainItem.enterWidthIndex(index);
    }
    Item {
        id: leftTopItem
        anchors.left: parent.left
        anchors.top: parent.top
        implicitWidth: childrenRect.width
        implicitHeight: childrenRect.height
    }
    Item {
        id: rightTopItem
        anchors.right: parent.right
        anchors.top: parent.top
        implicitWidth: childrenRect.width
        implicitHeight: childrenRect.height
        opacity: entered ? 0.0 : 1.0
        visible: opacity > 0
        Behavior on opacity {
            NumberAnimation { duration: 300 }
        }
    }
    Item {
        id: backItem
        anchors.right: parent.right
        anchors.top: parent.top
        implicitWidth: childrenRect.width
        implicitHeight: childrenRect.height
        opacity: entered ? 1.0 : 0.0
        visible: opacity > 0
        onVisibleChanged: {
            z = mainItem.z + 1
        }
        Behavior on opacity {
            NumberAnimation { duration: 300 }
        }
    }
    GradientLine {
        id: splitLine
        y: leftTopItem.height-2 /*+ defaultMargin / 2*/
        width: parent.width
        height: 1
    }

    Item {
        id: infoItem
        width: parent.width
        height: infoItemHeight
        anchors.top: splitLine.bottom
        anchors.topMargin: defaultMargin / 2
        visible: !entered
    }
    Component {
        id: transComponent
        BLTransArea {
            anchors.fill: parent
            enabled: !root.entered
            hoverEnabled: false
            signal sigWheel()
            onWheel: {
                sigWheel()
                //wheel.accepted = false
            }
        }
    }

    BLColumnContainer {
        id: mainItem
        width: parent.width
        clip: true
        y: entered ?
               splitLine.y + splitLine.height + defaultMargin :
               infoItem.y + infoItem.height + defaultMargin
        height: entered ?
                    root.height - (splitLine.y + splitLine.height) - defaultMargin :
                    root.height - (infoItem.y + infoItem.height) - defaultMargin
        onHeightChanged: {
            for (var i = 0; i < children.length; ++i)
            {
                var child = children[i];
                console.log(i);
                child.x = 0;
                child.width = mainItem.width
                child.height = mainItem.height / children.length;
                child.y = i * child.height;
                //需要收缩功能的child item，增加一个TransArea组件。
                if (noSkrinkList.indexOf(i) === -1 )
                {
                    var transArea = transComponent.createObject(child)

                    //in for-loop, connect with 'function() { root.enterWidthIndex(i)}' is wrong, 'i' will be a fixed value
                    transArea.sigWheel.connect(function (index) {
                        return function() { return root.enterWidthIndex(index) };
                    }(i))
                }
            }
        }

        Behavior on y { NumberAnimation { duration: 300 } }
    }
}

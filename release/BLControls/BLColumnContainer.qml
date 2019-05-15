import QtQuick 2.9
import QtQuick.Controls 2.2
Item {
    id: root

    property int currentIndex: -1
    property real eachHeight: height / children.length
    property real wholeHeight: height
    property Item currentItem: currentIndex < 0 ? null : children[currentIndex]

    function enterWidthIndex(index)
    {
        currentIndex = index;
        enteredAnimation.restart();
    }
    function back()
    {
        backAnimation.restart();
        currentIndex = -1;
    }

    SequentialAnimation {
        id: enteredAnimation
        ScriptAction {
            script: {
                for (var i = 0; i < root.children.length; ++i)
                {
                    if (i === root.currentIndex)
                    {
                        continue;
                    }
                    root.children[i].visible = false;
                }
            }
        }
        ParallelAnimation {
            NumberAnimation { target: root.currentItem; property: "height"; from: root.eachHeight; to: root.wholeHeight; duration: 300 }
            NumberAnimation { target: root.currentItem; property: "y"; from: root.currentIndex * root.eachHeight; to: 0; duration: 300}
        }
    }
    SequentialAnimation {
        id: backAnimation
        ParallelAnimation{
            NumberAnimation { target: root.currentItem; property: "height"; from: root.wholeHeight; to: root.eachHeight; duration: 300 }
            NumberAnimation { target: root.currentItem; property: "y"; from: 0; to: root.currentIndex * root.eachHeight; duration: 300}
        }
        ScriptAction {
            script: {
                for (var i = 0; i < root.children.length; ++i)
                {
                    if (i === root.currentIndex)
                    {
                        continue;
                    }
                    root.children[i].visible = true;
                }
            }
        }
    }
}

import QtQuick 2.2

Rectangle {
    id: popup
    border.color: "#303344"
    border.width: 4
    smooth: true

    readonly property string show_state: "visible"
    readonly property string opa_state: "opavisible"
    readonly property string hide_sate: "invisible"


    state: hide_sate

    states: [
        State {
            name: hide_sate
            PropertyChanges { target: popup; opacity: 0 }
        },
        State {
            name: opa_state
            PropertyChanges { target: popup; opacity: 0.5 }
        },
        State {
            name: show_state
            PropertyChanges { target: popup; opacity: 1.0 }
        }
    ]

    transitions: Transition {
        NumberAnimation { properties: "opacity"; duration: 100 }
    }

    function show(){
        state = show_state;
    }
    function showopa(){
        state = opa_state;
    }
    function hide(){
        state = hide_sate;
    }
}

var setting = {
    view: {
        showLine: false,
        showIcon: true,
        selectedMulti: false,

        dblClickExpand: true,
        addDiyDom: addDiyDom
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onDblClick: onTreeDbClick
    }
};

function onTreeDbClick(e, treeId, treeNode) {
    if (!treeNode.isParent && treeNode.compId) {
        sdk.positionToComponent(treeNode.compId);
    }
    return true;
}

var settingSubProj = {
    view: {
        showLine: false,
        showIcon: true,
        selectedMulti: false,
        dblClickExpand: true,
        addDiyDom: addDiyDom
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    callback: {
        onDblClick: onTreeSubDbClick
    }
};

function onTreeSubDbClick(e, treeId, treeNode) {
    if (!treeNode.isParent && treeNode.data) {
        let compLst = [];
        for (let i = 0; i < treeNode.data.length; i++) {
            compLst.push(treeNode.data[i].guid);
        }
        sdk.getCurProjectInfo(function (projInfo) {
            $("#idCompCard").css({ "display": "none" });
            sdk.resetProjStatus(projInfo.projId, function () {
                sdk.setSelType(sdk.ESelectType.selComp);
                sdk.researchComp(compLst, 2.0);
            });
        });
    }
    return true;
}

function addDiyDom(treeId, treeNode) {
    var switchObj = $("#" + treeNode.tId + "_switch"),
        icoObj = $("#" + treeNode.tId + "_ico"),
        spanObj = $("#" + treeNode.tId + "_span");
    switchObj.remove();
    spanObj.after(switchObj);
}
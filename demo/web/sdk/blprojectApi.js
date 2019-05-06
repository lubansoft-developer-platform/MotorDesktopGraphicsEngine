/** 
 * 工程相关API
 * @module ProjectApi
 * */

/** 
 * 构件类型
 * @static
 * @enum {string}
*/
var EProjType = {
    /** 
     * 场景工程
    */
    type_scenemod:"scenemod",
    /** 
     * 子工程
    */
    type_submod:"submod",
    /** 
     * bim工程
    */
    type_bimmod:"staticmod"
}

/**
 * 工程属性key
 * @static
 * @enum {string}
 */
var EProjKey = {
    /** 
     * 位置属性
    */
    pa_position:"Pa_CSPosition",
    /** 
     * 工程对应的企业id
    */
    pa_epid:"Pa_BindProjPID",
    /** 
     * 工程对应的项目部id
    */
    pa_deptid:"Pa_BindOrgId",
    /** 
     * cim工程的工程属性中映射BIM工程的楼层对应JSON
    */
    pa_floormap:"pa_floor_mapping"
};

/**
 * 操作类型
 * @static
 * @enum {number}
 */
var EManipulatorType = {
    /**
     * 平移
     */
    EManipulatorMove: 0,
    /**
     * 旋转
     */
    EManipulatorRotate: 1,
    /**
     * 缩放
     */
    EManipulatorScale: 2,
    /**
     * 无
     */
    EManipulatorNone: 9999
};

/**
 * 工程选择模式
 * @static
 * @enum {number}
 */
var ESelectType = {
    /** 
     * 切层
    */
    selfloor:0, 
    /** 
     * 选择构件
    */
    selComp:1 
};

/**
 * 获取当前工程信息
 * @static
 * @param {getProjectInfoCallback} funcRet
 * @returns {void}
 * @example
 * var jsonObj = {};
 * getCurProjectInfo(function(jsonObj){
 * ...
 * });
 */
var getCurProjectInfo = function (funcRet) {
    return projectObj.GetCurProjectInfo(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getProjectInfo回调函数
 * @callback getProjectInfoCallback
 * @param {JSON} returnValue - 工程信息JSON对象
 * JSON格式
 * {
 *  projId:string,
 *  projType:string, 
 *  projName:string, 
 *  epId:string, //企业id（若有）
 *  deptId:string, //项目部id （若有）
 *  pos:{x:double, y: double, z:double}
 * };
 */

 /**
 * 获取所有已加载的工程信息列表
 * @static
 * @param {getAllProjInfoListCallback} funcRet
 * @returns {void}
 * @example
 * var jsonObj = {};
 * getAllProjInfoList(function(jsonObj){
 * ...
 * });
 */
var getAllProjInfoList = function (funcRet) {
    return projectObj.GetAllProjInfoList(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
 }
 /**
 * getAllProjInfoList回调函数
 * @callback getAllProjInfoListCallback
 * @param {JSON} returnValue - 工程信息JSON数组
 * JSON格式
 * [{
 *  projId:string,
 *  projType:string, 
 *  projName:string, 
 *  epId:string, //企业id（若有）
 *  deptId:string, //项目部id （若有）
 *  pos:{x:double, y: double, z:double}
 * }];
 */

/**
 * 打开工程
 * @static
 * @param {string} projId - 工程id
 * @param {string} compId - 关联构件id，若无传空字符串
 * @param {} funcRet
 */
var openProject = function (projId, compId, funcRet) {
    return projectObj.OpenProject(projId, compId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
 }
 /**
 * openProject回调函数
 * @callback openProjectCallback
 * @param {Boolean} returnValue - 操作结果
 */

 /**
 * 关闭工程
 * @static
 * @param {string} projId - 工程id
 * @param {} funcRet
 */
var closeProject = function (projId, funcRet) {
    return projectObj.CloseProject(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
 }
 /**
 * closeProject回调函数
 * @callback closeProjectCallback
 * @param {Boolean} returnValue - 操作结果
 */

/**
 * 导入FBX模板
 * @static
 * @param {string} tmlPath - FBX文件路径("绝对路径")
 * @param {string} strName - FBX模板名称("绝对路径")
 * @param {importFBXTmlCallback} funcRet
 * @returns {void}
 * @example
 * string tmlId;
 * importFBXTml("G:\\aaa.fbx", function(tmlId){
 * alert(tmlId);
 * });
 */
var importFBXTml = function (tmlPath, strName, funcRet) {
    return projectObj.ImportFBXTml(tmlPath, strName, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * importFBXTml回调函数
 * @callback importFBXTmlCallback
 * @param {string} returnValue - FBX模板ID
 */

/**
 * 获取FBX模板列表
 * @static
 * @param {getAllFBXTmlCallback} funRet
 * @returns {void}
 */
var getAllFBXTml = function (funRet) {
    return projectObj.GetAllFBXTml(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getAllFBXTml回调函数
 * @callback getAllFBXTmlCallback
 * @param {JSON} returnValue - FBX模板列表
 * 格式如下:
 * [
 * {
 * "id": string,
 * "name": string,
 * "picPath": string
 * }
 * ]
 */

/**
 * 部署FBX模型
 * @static
 * @param {string} FBXId - FBX模板Id
 * @returns {void}
 */
var deplayFBX = function (FBXId) {
    return projectObj.DeplayFBX(FBXId);
}

/**
 * 保存工程
 * @static
 * @param {string} projId - 工程Id
 * @param {saveProjectCallback} funcRet
 * @returns {void}
 */
var saveProject = function (projId, funcRet) {
    return projectObj.SaveProject(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * saveProject回调函数
 * @callback saveProjectCallback
 * @param {Boolean} returnValue - 操作结果
 */

/**
 * 设置操作模式
 * @static
 * @param {EManipulatorType} type - 操作模式
 * @returns {void}
 * @example
 * setValidManipulatorType(EManipulatorType.EManipulatorMove);
 */
var setValidManipulatorType = function (type) {
    return projectObj.SetValidManipulatorType(type);
}

/** 
 * 是否含有bim工程
 * @static
 * @param {string} projId - 工程Id
 * @param {isBimProjectCallback} funcRet
 * @returns {void}
 */
var hasBimProject = function (projId, funcRet){
    return projectObj.HasBimProject(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * isBimProject回调函数
 * @callback isBimProjectCallback
 * @param {Boolean} returnValue - 操作结果
 */

 /** 
 * 自否是子工程
 * @static
 * @param {string} projId - 工程Id
 * @param {isChildProjectCallback} funcRet
 * @returns {void}
 */
var isChildProject = function (projId, funcRet){
    return projectObj.IsChildProject(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * isChildProject回调函数
 * @callback isChildProjectCallback
 * @param {Boolean} returnValue - 操作结果
 */

/** 
 * 获取工程的bim信息
 * @static
 * @param {string} projId - 工程Id
 * @param {getBimProjectInfoCallback} funcRet
 * @returns {void}
 */ 
var getBimProjectInfo = function (projId, funcRet){
    return projectObj.GetBimProjectInfo(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getBimProjectInfo回调函数
 * @callback getBimProjectInfoCallback
 * @param {JSON} returnValue
 * 格式如下:
 * [
 * {
 *  nPPid:int, //工程ppid
 *  nProjModel:int //工程类型 1:预算， 2：施工
 *  sProjName: string //工程名称
 *  nProjType：string //工程专业 1:土建，2:钢筋, 3:安装, 4:Revit, 5:造价, 6:Tekla, 7:c3d, 8:Bently, 9:Rhino, 10:IFC, 11:场布
 * }
 * ]
 */

/** 
 * 获取工程的bim工程ppid
 * @static
 * @param {string} projId - 工程Id
 * @param {getBimProjectPPIDsCallback} funcRet
 * @returns {void}
 */
var getBimProjectPPIDs = function (projId, funcRet){
    return projectObj.GetBimProjectPPIDs(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getBimProjectPPIDs回调函数
 * @callback getBimProjectPPIDsCallback
 * @param {string[]} returnValue - bim工程代理id(ppid)列表
 */

/**
 * 创建fbx构件
 * @static
 * @param {string} fbxId - FBX模板Id
 * @param {Number} x - 三维坐标x
 * @param {Number} y - 三维坐标y
 * @param {Number} z - 三维坐标z
 * @param {getBimProjectPPIDsCallback} funcRet
 * @returns {void}
 */
var createFBXComponent = function (fbxId, x, y, z, funcRet){
    projectObj.CreateFBXComponent(fbxId, x, y, z, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * createFBXComponent回调函数
 * @callback createFBXComponentCallback
 * @param {string} returnValue - 创建出来的构件id
 */

/** 
 * 获取工程属性
 * @static
 * @param {string} projId - 工程id
 * @param {EProjKey} attrKey - 属性key
 * @param {getProjectAttrCallback} funcRet
 * @returns {void}
*/
var getProjectAttr = function (projId, attrKey, funcRet){
    projectObj.GetProjectAttr(projId, attrKey, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getProjectAttr回调函数
 * @callback getProjectAttrCallback
 * @param {string} returnValue - 工程属性值
 */

/** 
 * 设置工程属性
 * @static
 * @param {string} projId - 工程id
 * @param {EProjKey} attrKey - 属性key
 * @param {string} attrVal - 属性value
 * @returns {void}
*/
var setProjectAttr = function (projId, attrKey, attrVal){
    projectObj.SetProjectAttr(projId, attrKey, attrVal);
}

/** 
 * 获取工程所有bim构件信息
 * @static
 * @param {string} projId - 工程id
 * @param {getAllBimCompInfoByProjectCallback} funcRet
 * @returns {void}
*/
var getAllBimCompInfoByProject = function (projId, funcRet){
    projectObj.GetAllBimCompInfoByProject(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getAllBimCompInfoByProject回调函数
 * @callback getAllBimCompInfoByProjectCallback
 * @param {JSON} returnValue - 所有bim构件信息
 * 格式如下
 * [
 *  {
 *      guid:string, //构件Guid
 *      cimProjGuid:string//cim工程id
 *      bimGuid:string, //构件的bim句柄
 *      mainCompGuid:string, //主构件bim句柄
 *      projGuid: string, //构件所属工程Guid
 *      bimPPid:string, //构件所属工程的bim工程代理id
 *      zhuanye:string, //构件专业
 *      floor:string, //构件所在的bim楼层
 *      cimFloor:string, //cim对应楼层
 *      dalei:string, //构件大类
 *      xiaolei:string, //构件小类
 *      name:string //构件名称
 *      props:[
 *          {
 *              name:string, //属性名称
 *              value:string, //属性值
 *              unit:string, //属性单位
 *              group:string, //属性分组
 *          }
 *      ]
 *  }
 * ]
 */

/** 
 * 根据cim楼层id获取bim构件信息
 * @static
 * @param {string} projId - 工程id
 * @param {string} floorId- cim楼层id
 * @param {getBimCompInfoByProjectCimFloorCallback} funcRet
 * @returns {void}
*/
var getBimCompInfoByProjectCimFloor = function (projId, floorId, funcRet){
    projectObj.GetBimCompInfoByProjectCimFloor(projId, floorId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getBimCompInfoByProjectCimFloor回调函数
 * @callback getBimCompInfoByProjectCimFloorCallback
 * @param {JSON} returnValue - bim构件信息
 * @see getAllBimCompInfoByProjectCallback
 */

/** 
 * 根据cim楼层id获取bim构件信息
 * @static
 * @param {string} projId - 工程id
 * @param {getProjectCimFloorsCallback} funcRet
 * @returns {void}
*/
var getProjectCimFloors = function (projId, funcRet){
    projectObj.GetProjectCimFloors(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getProjectCimFloors回调函数
 * @callback getProjectCimFloorsCallback
 * @param {string[]} returnValue - 楼层id(从下往上有序排列)
 */

 /** 
  * 获取工程描述
  * @static
  * @param {string} projId - 工程id
  * @param {getProjectPropTempDesCallBack} funcRet
  * @returns {void}
 */
 var getProjectPropTempDes = function (projId, funcRet){
    projectObj.GetProjectPropTempDes(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/** 
 * getProjectPropTempDes回调函数
 * @function
 * @callback getProjectPropTempDesCallBack
 * @param {JSON} returnValue - 工程描述信息
 * 格式如下
 * [
 *  {
 *      name:string, //名称
 *      type:string, //该名称下包含的类型
 *      CTVisible:Boolean, //属性面板是否可见
 *      CardVisible:Boolean, //卡片面板是否可见
 *      child:[this] //自包含子节点
 *  }
 * ]
*/

/** 
 * 设置切层/选择构件模式
 * @static
 * @param {ESelectType} type - 选择模式
 * @return {void}
*/
var setSelType = function (type){
    projectObj.SetSelType(type);
}

/** 
 * 获取当前切层/选择构件模式
 * @static
 * @param {getSelTypeCallBack} funcRet
 * @return {void}
*/
var getSelType = function(funcRet){
    projectObj.GetSelType(function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/** 
 * getSelType回调函数
 * @function
 * @callback getSelTypeCallBack
 * @param {ESelectType} returnValue - 当前切层/选择构件模式
*/

/**
 * 重置工程状态
 * @static
 * @param {string} projId - 工程id
 * @param {resetProjStatusCallBack} funcRet
 * @return {void}
*/
var resetProjStatus = function(projId, funcRet){
    projectObj.ResetProjStatus(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/** 
 * resetProjStatus回调函数
 * @function
 * @callback resetProjStatusCallBack
 * @param {Boolean} returnValue - 当前切层/选择构件模式
*/
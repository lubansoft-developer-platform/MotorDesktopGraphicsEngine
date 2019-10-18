/** 
 * 工程相关API
 * @module ProjectApi
 * */

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
 * 获取打开构件关联工程信息
 * @static
 * @param {getLinkedProjectForOpeningCallback} funcRet
 * @returns {void}
 * @example
 * var jsonObj = {};
 * getLinkedProjectForOpening(function(jsonObj){
 * ...
 * });
 */
var getLinkedProjectForOpening = function (funcRet) {
    return projectObj.GetLinkedProjectForOpening(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getLinkedProjectForOpening回调函数
 * @callback getLinkedProjectForOpeningCallback
 * @param {JSON} returnValue - 工程信息JSON对象列表
 * JSON格式
 * {
 *  projId:string,
 *  projType:string, 
 *  projName:string, 
 *  pos:{x:double, y: double, z:double}
 * };
 */

 /**
 * 根据工程id获取工程信息
 * @static
 * @param {string} projId - 工程id
 * @param {getProjectInfoCallback} funcRet
 * @returns {void}
 * @example
 * var jsonObj = {};
 * getProjectInfo(function(jsonObj){
 * ...
 * });
 */
var getProjectInfo = function (projId, funcRet) {
    return projectObj.GetProjectInfo(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
 }
 /**
 * GetProjectInfo
 * @callback getProjectInfoCallback
 * @param {JSON} returnValue - 工程信息
 * JSON格式
 * {
 *  projId:string,
 *  projType:string, 
 *  projName:string, 
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
 * @param {JSON[]} returnValue - 工程信息JSON数组
 * JSON格式
 * [{
 *  projId:string,
 *  projType:string, 
 *  projName:string, 
 *  pos:{x:double, y: double, z:double}
 * }];
 */

/** 
 * 根据已打开构件子cim工程Id获取关联bim工程Id列表
 * @static
 * @param {string} projId - 工程id
 * @param {getBimProjectListCallback} funcRet
 * @returns {void}
*/
var getBimProjectList = function (projId, funcRet){
    projectObj.GetBimProjectList(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getBimProjectList回调函数
 * @callback getBimProjectListCallback
 * @param {string[]} returnValue - 关联BIM工程Id
 */

 /**
 * 打开构件关联的工程
 * @static
 * @param {string} compId - 构件id
 * @param {openLinkedProjectByCompCallback} funcRet
 */
var openLinkedProjectByComp = function (compId, funcRet) {
    return projectObj.OpenLinkedProjectByComp(compId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
 }
 /**
 * openLinkedProjectByComp回调函数
 * @callback openLinkedProjectByCompCallback
 * @param {Boolean}  - 操作结果
 */

 /**
 * 关闭关联的工程
 * @static
  * @param {closeLinkedProjectCallback} funcRet
 */
var closeLinkedProject = function (funcRet) {
    return projectObj.CloseLinkedProject(function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
 }
 /**
 * closeLinkedProject回调函数
 * @callback closeLinkedProjectCallback
 * @param {Boolean} returnValue - 操作结果
 */

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
 * 恢复当前工程默认状态
 * @static
 * @returns {void}
 */
var resetProjectStatus = function () {
    projectObj.ResetProjectStatus();
}

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
 * @param {string} projId - bim工程id
 * @param {getBimProjectComponentsCallback} funcRet
 * @returns {void}
*/
var getBimProjectComponents = function (projId, funcRet){
    projectObj.GetBimProjectComponents(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getBimProjectComponents回调函数
 * @callback getBimProjectComponentsCallback
 * @param {JSON[]} returnValue - 所有bim构件信息
 * 格式如下
 * [
 *  {
 *      guid:string, //构件Guid
 *      cimProjGuid:string//cim工程id
 *      bimGuid:string, //构件的bim句柄
 *      mainCompGuid:string, //主构件bim句柄
 *      projGuid: string, //构件所属工程Guid
 *      zhuanye:string, //构件专业
 *      floor:string, //构件所在的bim楼层
 *      cimFloor:string, //cim对应楼层
 *      dalei:string, //构件大类
 *      xiaolei:string, //构件小类
 *      name:string //构件名称
 *  }
 * ]
 */

/** 
 * 根据cim楼层id获取bim构件信息
 * @static
 * @param {string} projId - bim工程id
 * @param {string} floorId- cim楼层id
 * @param {getBimProjectComponetsByCimFloorCallback} funcRet
 * @returns {void}
*/
var getBimProjectComponetsByCimFloor = function (projId, floorId, funcRet){
    projectObj.GetBimProjectComponetsByCimFloor(projId, floorId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getBimProjectComponetsByCimFloor
 * @callback getBimProjectComponetsByCimFloorCallback
 * @param {JSON[]} returnValue - bim构件信息
 * 格式如下
 * [
 *  {
 *      guid:string, //构件Guid
 *      cimProjGuid:string//cim工程id
 *      bimGuid:string, //构件的bim句柄
 *      mainCompGuid:string, //主构件bim句柄
 *      projGuid: string, //构件所属工程Guid
 *      zhuanye:string, //构件专业
 *      floor:string, //构件所在的bim楼层
 *      cimFloor:string, //cim对应楼层
 *      dalei:string, //构件大类
 *      xiaolei:string, //构件小类
 *      name:string //构件名称     
 *  }
 * ]
 */

/** 
 * 获取已打开子工程关联bim工程的楼层信息
 * @static
 * @param {string} projId - bim工程id
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
 *      sysName:string, //该名称下包含的类型
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
 * 判断工程是否为Bim工程
 * @static
 * @param {string} projId - 工程id
 * @param {isBimModelProjectCallBack} funcRet
 * @return {void}
*/
var isBimModelProject = function(projId, funcRet){
    return projectObj.IsBimModelProject(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/** 
 * isBimModelProject回调函数
 * @function
 * @callback isBimModelProjectCallBack
 * @param {Boolean} returnValue - 是否为Bim工程
*/

/**
 * 判断工程是否为Cim工程
 * @static
 * @param {string} projId - 工程id
 * @param {isCimProjectCallBack} funcRet
 * @return {void}
*/
var isCimProject = function(projId, funcRet){
    return projectObj.IsCimProject(projId,function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/** 
 * isSubCimProject回调函数
 * @function
 * @callback isCimProjectCallBack
 * @param {Boolean} returnValue - 是否为Cim工程
*/
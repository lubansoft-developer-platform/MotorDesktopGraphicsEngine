/**
 * 三维场景相关API 
 * @module SceneApi 
 * */

/**
* 场景参数类型
* @static
* @enum {number}
*/
var ESceneType = {
    /** 云 */
    ESC_CLOUD: 0,
    /** 雨 */
    ESC_RAIN: 1,
    /** 时间 */
    ESC_TIME: 2,
    /** 风 */
    ESC_WIND: 3,
    /** 相机速度 */
    ESC_VELOCITY: 4,
    /** 重力 */
    ESC_GRAVITY: 5
};

/**
* 漫游模式
* @static
* @enum {number}
*/
var ERoamMode = {
    /** 自由漫游(鼠标) */
    ERM_FREE_MOUSE: 0,
    /** 自由漫游(键盘) */
    ERM_FREE_KEY: 1,
    /** 步行 */
    ERM_WALK: 2,
    /** 驾车 */
    ERM_CAR: 3,
    /** 游艇 */
    ERM_YACHT: 4,
    /** 飞行 */
    ERM_PLANE: 5
};

/**
* 初始化场景工程列表
* @static
* @param {initSceneProjDataCallback} funcRet
* @returns {void}
*/
var initSceneProjData = function (funcRet) {
    return sceneObj.InitSceneProjData(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * initSceneProjData回调函数
 * @function
 * @callback initSceneProjDataCallback
 * @param {JSON} returnValue - 场景工程列表
 * 格式如下:
 * [
 *  {
 *      projId:string, //场景工程id
 *      projName:string //场景工程名称
 *  }
 * ]
 */

/**
* 飞往指定位置
* @static
* @param {number} x - x坐标
* @param {number} y - y坐标
* @param {number} z - z坐标
* @param {number} dPhi - 俯角
* @param {number} dThi - 仰角
* @returns {void}
*/
var positionTo = function (x, y, z, dPhi, dThi) {
    return sceneObj.PositionTo(x, y, z, dPhi, dThi);
}

/**
 * 定位构件
 * @static
 * @param {string} componentId - 构件Id
 * @returns {void}
 */
var positionToComponent = function (componentId) {
    return componentObj.PositionComponent(componentId);
}

/**
 * 定位工程
 * @static
 * @param {string} projId - 工程id
 * @returns {void}
 */
var positionToProject = function (projId) {
    return projectObj.PositionToProj(projId);
}

/**
 * 设置指定场景参数
 * @static
 * @param {ESceneType} typeArg - 参数类型
 * @param {Number} dbArg - 参数值
 */
var setSceneArg = function (typeArg, dbArg) {
    sceneObj.SetSceneArg(typeArg, dbArg);
}

/**
 * 获取指定场景参数
 * @static
 * @param {ESceneType} typeArg - 参数类型
 * @param {getSceneArgCallback} funcRet
 */
var getSceneArg = function (typeArg, funcRet) {
    sceneObj.GetSceneArg(typeArg, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
 /**
 * getSceneArg回调函数
 * @callback getSceneArgCallback
 * @param {Number} returnValue - 参数值
 */

/**
 * 指定漫游模式(默认鼠标模式)
 * @static
 * @param {ERoamMode} nMode - 漫游模式
 */
var setPlayerMode = function (nMode) {
    sceneObj.SetPlayerMode(nMode);
}

/** 
 * 加载场景工程数据
 * @static
 * @param {string} sceneProjId - 场景工程id
 * @param {loadSceneProjDataCallback} funcRet
 * @return {void}
*/
var loadSceneProjData = function(sceneProjId, funcRet){
    sceneObj.LoadSceneProjData(sceneProjId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}

/** 
 * 卸载场景工程数据
 * @static
 * @param {string} sceneProjId - 场景工程id
 * @param {loadSceneProjDataCallback} funcRet
 * @return {void}
*/
var unLoadSceneProjData = function(sceneProjId, funcRet){
    sceneObj.UnLoadSceneProjData(sceneProjId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
 /**
 * loadSceneProjData回调函数
 * @callback loadSceneProjDataCallback
 * @param {Boolean} returnValue - 操作结果
 */
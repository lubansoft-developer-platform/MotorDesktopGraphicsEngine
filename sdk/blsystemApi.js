/** 
 * 系统相关API
 * @module SystemApi
 * */

/**
 * 操作类型
 * @static
 * @enum {number}
 */
var ESystemMode = {
    /**
     * 调试模式
     */
    DebugMode: 0,
    /**
     * 释出模式
     */
    ReleaseMode: 1
};

/**
 * 获取程序根路径
 * @static
 * @param {getLocalRootPathCallback} funcRet
 * @returns {void}
 * @example
 * var sPath = "";
 * getLocalRootPath(function(sPath){
 * alert(sPath === "X:\\rootPath");
 * });
 */
var getLocalRootPath = function (funcRet) {
    return systemObj.GetLocalRootPath(function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getLocalRootPath回调函数
 * @function
 * @callback getLocalRootPathCallback
 * @param {string} returnValue - 应用程序根目录绝对路径
 */

/**
 * 获取文件保存路径,弹出保存对话框
 * @static
 * @param {getSaveFilePathCallback} funcRet
 * @returns {void}
 * @example
 * var sPath = "";
 * getSaveFilePath(function(sPath){
 * alert(sPath === "X:\\path");
 * });
 */
var getSaveFilePath = function (funcRet) {
    return systemObj.GetSaveFilePath(function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getSaveFilePath回调函数
 * @function
 * @callback getSaveFilePathCallback
 * @param {string} returnValue - 用户选择的绝对路径
 */


/**
 * 获取打开文件路径,弹出打开文件对话框
 * @static
 * @param {getOpenFilePathCallback} funcRet
 * @returns {void}
 * @example
 * var sPath = "";
 * getOpenFilePath(function(sPath){
 * alert(sPath === "X:\\path");
 * }); 
 */
var getOpenFilePath = function (funcRet) {
    return systemObj.GetOpenFilePath(function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getOpenFilePath回调函数
 * @function
 * @callback getOpenFilePathCallback
 * @param {string} returnValue - 用户选择的绝对路径
 */

/**
 * 获取文件夹打开路径,弹出打开文件夹对话框
 * @static
 * @param {getFolderPathCallback} funcRet
 * @returns  {void}
 * @example
 * var sPath = "";
 * getFolderPath(function(sPath){
 * alert(sPath === "X:\\path");
 * });
 */
var getFolderPath = function (funcRet) {
    return systemObj.GetFolderPath(function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getFolderPath回调函数
 * @function
 * @callback getFolderPathCallback
 * @param {string} returnValue - 用户选择的绝对路径
 */

/**
 * 设置系统调试模式
 * @static
 * @param {ESystemMode} mode - 调试模式
 * @returns {void}
 * @example
 * setSystemMode(ESystemMode.DebugMode);
 */
var setSystemMode = function (mode) {
    return systemObj.SetSystemMode(mode);
}

/**
 * 应用程序窗口最大化
 * @static
 */
var showMaxSize = function () {
    return systemObj.ShowMaxSize();
}

/**
 * 应用程序窗口正常化
 * @static
 */
var showNomalSize = function () {
    return systemObj.ShowNomalSize();
}

/**
 * 应用程序窗口最小化
 * @static
 */
var showMiniSize = function () {
    return systemObj.ShowMiniSize();
}

/**
 * 判断当前应用程序是否最大化
 * @static
 * @param {isMaxSizedCallback} funcRet
 * @returns {void}
 */
var isMaxSized = function (funcRet) {
    return systemObj.IsMaxSized(function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * isMaxSized回调函数
 * @function
 * @callback isMaxSizedCallback
 * @param {Boolean} returnValue - 当前应用程序是否最大化
 */

/**
 * 设置Cim平台Token
 * @static
 * @param {string} server - cim服务器登录地址
 * @param {string} token  - cim服务器登录成功后的token令牌
 * @return {void}
 */
function setToken (server, token) {
    systemObj.SetToken(server, token);
}

/**
 * 关闭主窗口
 * @static
 */
var closeMainWindow = function () {
    systemObj.CloseMainWindow();
}

/**
 * 设置主窗口大小
 * @static
 * @param {Number} w - 窗口宽度
 * @param {Number} h - 窗口高度
 * @return {void} 
 */
var resizeMainWindow = function (w, h) {
    systemObj.ResizeMainWindow(w, h);
}

/**
 * 移动主窗口至点{x, y}处
 * @static
 * @param {Number} x - 窗口x值
 * @param {Number} y - 窗口y值
 * @return {void}
 */
var moveMainWindow = function (x, y) {
    systemObj.MoveMainWindow(x, y);
}

/**
 * 获取主窗口位置区域
 * @static
 * @param {geometryCallback} funcRet 
 * @return {void}
 */
var geometry = function (funcRet) {
    return systemObj.GetGeometry(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}

/**
 * 获取主窗口标准视图下位置区域
 * @static
 * @param {geometryCallback} funcRet 
 * @return {void}
 */
var normalGeometry = function (funcRet) {
    systemObj.GetNormalGeometry(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * geometry回调函数
 * @function
 * @callback geometryCallback
 * @param {JSON} returnValue - 区域信息的json对象
 * 格式如下:
 * {
 *   x:int, 
 *   y:int, 
 *   w:int, 
 *   h:int
 *  }
 */

/**
 * 设置主窗口区域
 * @static
 * @param {JSON} rect - 区域信息的json对象
 * @return {void}
 */
var setGeometry = function (rect) {
    systemObj.SetGeometry(JSON.stringify(rect));
}

/**
 * 拖拽主窗口
 * @static
 * @param {dragMainWindowCallback} funcRet
 * @returns {void}
 */
var dragMainWindow = function(funcRet) {
    systemObj.DragMainWindow(function(returnValue){
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * dragMainWindow回调函数
 * @function
 * @callback dragMainWindowCallback
 * @param {Boolean} returnValue - 是否窗口最大化
 */


/**
 * 显示进度条
 * @static
 * @returns {void}
 */
var showProcessBar = function(){
    systemObj.ShowProcessBar();
}

/**
 * 关闭进度条
 * @static
 * @returns {void}
 */
var closeProcessBar = function(){
    systemObj.CloseProcessBar();
}

/**
 * WGS84坐标点转换到图形引擎中的三维空间坐标点
 * @static
 * @param {Number} dbB - 大地纬度
 * @param {Number} dbL - 大地经度
 * @param {Number} dbH - 大地高
 * @param {convertWGS84toWorldCoordCallBack} funcRet 
 * @returns {void}
 */
var convertWGS84toWorldCoord = function(dbB, dbL, dbH, funcRet) {
    systemObj.ConvertWGS84toWorldCoord(dbB, dbL, dbH, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * convertWGS84toWorldCoord回调函数
 * @callback convertWGS84toWorldCoordCallBack
 * @param {JSON} returnValue
 * 格式如下:
 * {
 *    x:double, 
 *    y:double, 
 *    z:double
 *  }
 */

/**
 * 三维空间坐标点转换到图形引擎中的WGS84坐标点
 * @static
 * @param {Number} dbX - 空间点X
 * @param {Number} dbY - 空间点Y
 * @param {Number} dbZ - 空间点Z
 * @param {convertWorldCoordtoWGS84CallBack} funcRet 
 * @returns {void}
 */
var convertWorldCoordtoWGS84 = function(dbX, dbY, dbZ, funcRet) {
    systemObj.ConvertWorldCoordtoWGS84(dbX, dbY, dbZ, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * convertWorldCoordtoWGS84
 * @callback convertWorldCoordtoWGS84CallBack
 * @param {JSON} returnValue
 * 格式如下:
 * {
 *    x:double, 
 *    y:double, 
 *    z:double
 *  }
 */

 /** 
  * 获取屏幕信息
  * @static
  * @param {getScreenInfosCallBack} funcRet
  * @return {void}
 */
var getScreenInfos = function (funcRet){
    systemObj.GetScreenInfos(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/** 
 * getScreenInfos回调函数
 * @callback getScreenInfosCallBack
 * @param {JSON} returnValue - 屏幕信息
 * 格式如下:
 * [
 *  {
 *      index:int, //屏幕索引
 *      rect:{x:int, y:int, w:int, h:int} //屏幕区域
 *  }
 * ]
*/

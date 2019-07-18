/**
 * 三维视图相关API 
 * @module ThreeViewApi 
 * */

/**
 * 移除三维视图焦点
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @returns {void}
 */
var BL3D_focusOutEvent = function (element) {};

/**
 * 聚焦三维视图
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @returns {void}
 */
var BL3D_focusInEvent = function (element) {};

/**
 * 鼠标移动事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
var BL3D_mouseMoveEvent = function (element, e) {};

/**
 * 鼠标双击事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
var BL3D_mouseDoubleClickEvent = function (element, e) {};

/**
 * 鼠标按下事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
var BL3D_mousePressEvent = function (element, e) {};

/**
 * 鼠标弹起事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
var BL3D_mouseReleaseEvent = function (element, e) {};

/**
 * 键盘按下事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 键盘事件
 * @returns {void}
 */
var BL3D_keyPressEvent = function (element, e) {};

/**
 * 键盘弹起事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 键盘事件
 * @returns {void}
 */
var BL3D_keyReleaseEvent = function (element, e) {};

/**
 * 鼠标滚轮事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
var BL3D_wheelEvent = function (element, e) {};

/**
 * 页面resize事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Number} x - 左端点坐标
 * @param {Number} y - 上端点坐标
 * @param {Number} width - 宽度
 * @param {Number} height - 高度
 * @returns {void}
 */
var BL3D_resizeEvent = function (element, x, y, width, height) {};

/**
 * 绑定三维视图
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @returns {void}
 */
var bind3DView = function (element) {
    let bindElement = element;

    BL3D_focusOutEvent = function (te) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.focusOutEvent();
    };
    BL3D_focusInEvent = function (te) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.focusInEvent();
    };
    BL3D_mouseMoveEvent = function (te, e) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.mouseMoveEvent(e.layerX, e.layerY, e.ctrlKey, e.altKey, e.shiftKey);
    };
    BL3D_mouseDoubleClickEvent = function (te, e) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.mouseDoubleClickEvent(e.layerX, e.layerY, e.button, e.buttons, e.ctrlKey, e.altKey, e.shiftKey);
    };
    BL3D_mousePressEvent = function (te, e) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.mousePressEvent(e.layerX, e.layerY, e.button, e.buttons, e.ctrlKey, e.altKey, e.shiftKey);
    };
    BL3D_mouseReleaseEvent = function (te, e) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.mouseReleaseEvent(e.layerX, e.layerY, e.button, e.buttons, e.ctrlKey, e.altKey, e.shiftKey);
    };
    BL3D_keyPressEvent = function (te, e) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.keyPressEvent(e.keyCode, e.ctrlKey, e.altKey, e.shiftKey);
    };
    BL3D_keyReleaseEvent = function (te, e) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.keyReleaseEvent(e.keyCode, e.ctrlKey, e.altKey, e.shiftKey);
    };
    BL3D_wheelEvent = function (te, e) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.wheelEvent(e.layerX, e.layerY, e.wheelDelta, e.buttons, e.ctrlKey, e.altKey, e.shiftKey);
    };
    BL3D_resizeEvent = function (te, x, y, width, height) {
        if(bindElement !== te || bindElement === undefined) return;
        return threeviewObj.resizeEvent(x, y, width, height);
    };
};

/**
 * 设置相机投影
 * @static
 * @param {Number} fFove  - 垂直视界(Field Of View) 
 * 默认值 60
 * 取值范围[0,180]
 * 对于给定的纵横比（width/height），可以使用以下公式从垂直方向计算水平视界：
 * FOV_h=2×atan((width/height)×tan(FOV_v/2))
 * @param {Number} fZNear - 设置到相机视锥的近平面的距离。默认值为0.1(地球视图)
 * @param {Number} fZFar - 设置到相机视锥的远平面的距离。默认值为1.00331325e10f(地球视图)
 */
var setCameraPro = function(fFove, fZNear, fZFar) {
    threeviewObj.SetCameraPro(fFove, fZNear, fZFar);
}

/**
 * 获取相机投影
 * @static
 * @param {getCameraProCallBack} funcRet 
 */
var getCameraPro = function(funcRet) {
    threeviewObj.GetCameraPro(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}

/**
 * getCameraPro回调函数
 * @callback getCameraProCallBack
 * @param {JSON} returnValue
 * 格式如下:
 * {
 *    fFove:float, 
 *    fZNear:float, 
 *    fZFar:float
 *  }
 * @see setCameraPro
 */

/**
 * 设置相机朝向
 * @static
 * @param {JSON} cameraDir - 相机朝向
 * 格式如下:
 * {
 *  viewDir:{x:double, y:double, z:double}, //相机指向
 *  cUp:{x:double, y:double, z:double} //相机视口向上方向
 * }
 */
var setCameraDir = function(cameraDir) {
    threeviewObj.SetCameraDir(JSON.stringify(cameraDir));
}

/**
 * 
 * @static
 * @param {getCameraDirCallBack} funcRet 
 */
var getCameraDir = function(funcRet) {
    threeviewObj.GetCameraDir(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}

/**
 * getCameraDir回调函数
 * @callback getCameraDirCallBack
 * @param {JSON} returnValue - 相机朝向
 * 格式如下:
 * {
 *  viewDir:{x:double, y:double, z:double}, //相机指向
 *  cUp:{x:double, y:double, z:double} //相机视口向上方向
 * }
 * @see setCameraDir
 */

/**
 * 设置相机位置
 * @static
 * @param {JSON} pos - 相机位置坐标
 */
var setCameraPos = function(pos) {
    threeviewObj.SetCameraPos(JSON.stringify(pos));
}

/**
 * 获取相机位置
 * @static
 * @param {getCameraPosCallBack} funcRet 
 */
var getCameraPos = function(funcRet) {
    threeviewObj.GetCameraPos(function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}

/**
 * getCameraPos回调函数
 * @callback getCameraPosCallBack
 * @param {JSON} returnValue - 相机位置
 * 格式如下:
 * {
 *    x:double, 
 *    y:double, 
 *    z:double
 *  }
 */

/** 
 * 绕当前中心旋转相机
 * @static
 * @param {Number} dbRadian - 旋转角度的弧度值
 */ 
var rotateCameraAboutCurCenterPt = function(dbRadian){
    threeviewObj.RotateCameraAboutCurCenterPt(dbRadian);
}

/** 
 * 绕当前中心旋转相机
 * @static
 * @param {Number} dbRadian - 旋转角度的弧度值
 * @param {Number} dbLen - 相机距离中心点的距离
 */
var rotateCameraAboutCurCenterPtEx = function(dbRadian, dbLen){
    threeviewObj.RotateCameraAboutCurCenterPt(dbRadian, dbLen);
}

/** 
 * 转动地球
 * @static
 * @param {Number} dbRadian - 旋转角度的弧度值
 */ 
var rotateEarth = function (dbRadian){
    threeviewObj.RotateEarth(dbRadian);
}

/** 
 * 设置光源是否跟随相机
 * @static
 * @param {Boolean} bEnable - 开关参数
 */ 
var setLightFollowCamera = function (bEnable) {
    threeviewObj.SetLightFollowCamera(bEnable);
}
/**
 * 构件相关API 
 * @module ComponentApi 
 * */

/** 
 * 构件类型
 * @static
 * @enum {string}
*/
var ECompType = {
    /** 
     * CLUSTER Mod类型
    */
    type_cluster:"CLUSTER",
    /** 
     * 地形
    */
    type_terrain:"Type_DiXing",
    /** 
     * 倾斜摄影
    */
    type_qxsy:"Type_Qxsy",
    /** 
     * FBX模板类型 
     */
    type_fbx:"pa_fbxType"
}

/**
 * 根据工程Id获取其工程下所有构件列表
 * @static
 * @param {string} projId - 工程Id
 * @param {getCimProjectComponentsCallback} funcRet
 * @returns {void}
 */
var getCimProjectComponents = function(projId, funcRet){
    return componentObj.GetCimProjectComponents(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * GetComponentsByProjId
 * @function
 * @callback getCimProjectComponentsCallback
 * @param {JSON} returnValue - 构件信息的json数组
 * 格式如下:
 * [{
 *    componentId:string, 
 *    componentType:string, 
 *    componentName:string,   
 *  }]
 */

/**
 * 获取构件信息
 * @static
 * @param {string} componentId - 构件Id
 * @param {getComponentInfoCallback} funcRet
 * @returns {void}
 */
var getComponentInfo = function (componentId, funcRet) {
    return componentObj.GetComponentInfo(componentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getComponentInfo回调函数
 * @function
 * @callback getComponentInfoCallback
 * @param {JSON} returnValue - 构件信息的json对象
 * 格式如下:
 * {
 *    componentId:string, 
 *    componentType:string, 
 *    componentName:string, 
 *  }
 */

/**
 * 批量设置构件颜色
 * @static
 * @param {string[]} componentIds - 构件Id列表
 * @param {string} color - 颜色十六进制字符串，如"#ff0000"
 * @param {setComponentForceColorCallback} funcRet
 * @returns {void}
 */
var setComponentForceColor  = function (componentIds, color, funcRet) {
    return componentObj.ForceComponentColor(componentIds, color, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    })
}
/**
 * setComponentForceColor回调函数
 * @function
 * @callback setComponentForceColorCallback
 * @param {Boolean} returnValue - 操作结果
 */

/**
 * 批量清除构件颜色
 * @static
 * @param {string[]} componentIds - 构件Id列表
 * @param {clearComponentForceColorCallback} funcRet
 * @returns {void}
 */
var clearComponentForceColor = function (componentIds, funcRet) {
    return componentObj.ClearComponentForceColor(componentIds, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * clearComponentForceColor
 * @function
 * @callback clearComponentForceColorCallback
 * @param {Boolean} returnValue - 操作结果
 */

/**
 * 设置工程下构件颜色
 * @static
 * @param {string} projId - 工程Id
 * @param {string} color - 颜色十六进制字符串，如"#ff0000"
 * @param {setForceColorForProjCallback} funcRet
 * @returns {void}
 */
var setForceColorForProj  = function (projId, color, funcRet) {
    return componentObj.SetForceColorForProj(projId, color, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    })
}
/**
 * setForceColorForProj
 * @function
 * @callback setForceColorForProjCallback
 * @param {Boolean} returnValue - 操作结果
 */

/**
 * 清除工程下构件颜色
 * @static
 * @param {string} projId - 工程Id
 * @param {clearForceColorForProjCallback} funcRet
 * @returns {void}
 */
var clearForceColorForProj = function (projId, funcRet) {
    return componentObj.ClearForceColorForProj(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * clearForceColorForProj
 * @function
 * @callback clearForceColorForProjCallback
 * @param {Boolean} returnValue - 操作结果
 */ 
 
/**
 * 设置工程下构件是否可见
 * @static
 * @param {string} componentId - 构件Id
 * @param {Boolean} bShow - 是否显示
 * @param {setComponentVisibleCallback} funcRet
 * @returns {void}
 */
var setComponentVisible = function (componentId, bShow, funcRet) {
    return componentObj.SetComponentVisible(componentId, bShow, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * setComponentVisible回调函数
 * @function
 * @callback setComponentVisibleCallback
 * @param {Boolean} returnValue - 操作结果
 */

 /**
 * 设置工程下构件是否可见
 * @static
 * @param {string} projId - 工程Id
 * @param {Boolean} bShow - 是否显示
 * @param {setVisibleForProjCallback} funcRet
 * @returns {void}
 */
var setVisibleForProj = function (projId, bShow, funcRet) {
    return componentObj.SetVisibleForProj(projId, bShow, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * setComponentVisible回调函数
 * @function
 * @callback setVisibleForProjCallback
 * @param {Boolean} returnValue - 操作结果
 */

 
/**
 * 设置选中构件
 * @static
 * @param {string[]} componentIds - 构件Id列表
 * @returns {void}
 */
var setSelectID = function (componentIds) {
    return componentObj.SetSelectID(componentIds);
}

/**
 * 获取构件坐标
 * @static
 * @param {string} componentId - 构件Id
 * @param {getComponentPositionCallback} funcRet
 * @returns {void}
 */
var getComponentPosition = function (componentId, funcRet) {
    return componentObj.GetComponentPosition(componentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getComponentPosition回调函数
 * @function
 * @callback getComponentPositionCallback
 * @param {JSON} returnValue - 构件坐标的json对象
 * 格式如下:
 * {x:double, y: double, z:double}
 */

/**
 * 开启点选模式
 * @static
 * @param {Boolean} bEnable
 * @returns {void}
 */
var enablePointCheckMode = function (bEnable) {
    return componentObj.EnablePointCheckMode(bEnable);
}

/**
 * 创建billboard
 * @static
 * @param {string} relComponentId - 需要关联的构件Id
 * @param {string} sType - billboard类型
 * @param {createBillboardCallback} funcRet
 * @returns {void}
 */
var createBillboard = function (relComponentId, sType, funcRet) {
    return componentObj.CreateBillBoard(relComponentId, sType, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * createBillboard回调函数
 * @function
 * @callback createBillboardCallback
 * @param {string} returnValue - billboardId
 */

/**
 * 获取关联的构件
 * @static
 * @param {string} billboardId - billboardId
 * @param {getRelComponentInBillboardCallback} funcRet
 * @returns {void}
 */
var getRelComponentInBillboard = function (billboardId, funcRet) {
    return componentObj.GetRelComponentInBillBoard(relComponentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getRelComponentInBillboard回调函数
 * @function
 * @callback getRelComponentInBillboardCallback
 * @param {string} returnValue - 构件Id
 */

/**
 * 移除billboard
 * @static
 * @param {string[]} billboardIds - billboardId列表
 * @returns {void}
 */
var removeBillboard = function (billboardIds) {
    return componentObj.RemoveBillBoard(billboardIds);
}

/**
 * 根据类型移除billboard
 * @static
 * @param {string} sType - billboard类型
 * @returns {void}
 */
var removeBillboardByType = function (sType) {
    return componentObj.RemoveBillBoardByType(sType);
}

/**
 * 显示/隐藏billboard
 * @static
 * @param {string[]} billboardIds - billboardId列表
 * @param {Boolean} bShow - 是否显示
 * @returns {void}
 */
var setBillboardVisible = function (billboardIds, bShow) {
    return componentObj.SetBillBoardVisible(billboardIds, bShow);
}

/**
 * 根据类型显示/隐藏billboard
 * @static
 * @param {string} sType - billboard类型
 * @param {Boolean} bShow - 是否显示
 * @returns {void}
 */
var setBillboardVisibleByType = function (sType, bShow) {
    return componentObj.SetBillBoardVisibleByType(sType, bShow);
}

/**
 * 根据url设置billboard展示内容
 * @static
 * @param {string} billboardId- billboardId
 * @param {string} sUrl - 图片路径(网络url)
 * @param {number} scalingPicTimes - 图片缩放比例
 * @param {double} scalingPoint - 标注点缩放比例
 * @param {double} scalingLine - 连线缩放比例
 * @returns {void}
 */
var setBillboardImgByUrl = function (billboardId, sUrl, scalingPicTimes, scalingPoint, scalingLine) {
    return componentObj.SetBillBoardImgByUrl(billboardId, sUrl, scalingPicTimes, scalingPoint, scalingLine);
}

/**
 * 根据路径设置billboard展示内容
 * @static
 * @param {string} billboardId - billboardId
 * @param {string} sPath - 图片路径(应用程序根目录的相对路径)
 * @param {number} scalingPicTimes - 图片缩放比例
 * @param {double} scalingPoint - 标注点缩放比例
 * @param {double} scalingLine - 连线缩放比例
 * @returns {void}
 */
var setBillboardImgByLocal = function (billboardId, sPath, scalingPicTimes, scalingPoint, scalingLine) {
    return componentObj.SetBillBoardImgByLocal(billboardId, sPath, scalingPicTimes, scalingPoint, scalingLine);
}

/**
 * 根据类型获取billboard列表
 * @static
 * @param {string} sType - billboard类型
 * @param {getBillboardByTypeCallback} funcRet
 * @returns {void}
 */
var getBillboardByType = function (sType, funcRet) {
    return componentObj.GetBillBoardByType(sType, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getBillboardByType回调函数
 * @function
 * @callback getBillboardByTypeCallback
 * @param {string[]} returnValue - billboardId列表
 */

/**
 * 获取构件描述
 * @static
 * @param {string} componentId - 构件ID 
 * @param {getCompTempDesInfoCallback} funcRet 
 * @returns {void}
 */
var getCompTempDesInfo = function (componentId, funcRet){
    return componentObj.GetCompTempDesInfo(componentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getCompTempDesInfo回调函数
 * @function
 * @callback getCompTempDesInfoCallback
 * @param {JSON} returnValue - 构件的bim信息
 * 格式如下:
 * {
 *  props:[
 *      {
 *          prop:{key:string, value:string} //属性键值对
 *      }      
 *  ]
 * }
 */

/**
 * 获取构件bim信息
 * @static
 * @param {string} componentId - 构件ID 
 * @param {getCompBimInfoCallback} funcRet 
 * @returns {void}
 */
var getCompBimInfo = function (componentId, funcRet){
    return componentObj.GetCompBimInfo(componentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getCompBimInfo回调函数
 * @function
 * @callback getCompBimInfoCallback
 * @param {JSON} returnValue - 构件的bim信息
 * 格式如下:
 * {
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
 *      props:[
 *          {
 *              name:string, //属性名称
 *              value:string, //属性值
 *              unit:string, //属性单位
 *              group:string, //属性分组
 *          }
 *      ]
 *  }
 */

/**
 * 批量获取构件bim信息
 * @static
 * @param {string[]} componentIds - 构件ID 
 * @param {getCompBimInfoBatchCallback} funcRet 
 * @returns {void}
 */
var getCompBimInfoBatch = function (componentIds, funcRet){
    return componentObj.GetCompBimInfoBatch(componentIds, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getCompBimInfoBatch回调函数
 * @function
 * @callback getCompBimInfoBatchCallback
 * @param {JSON} returnValue - 构件的bim信息
 * 格式如下:
 * [{
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
 *      props:[
 *          {
 *              name:string, //属性名称
 *              value:string, //属性值
 *              unit:string, //属性单位
 *              group:string, //属性分组
 *          }
 *      ]
 *  }]
 */

/**
 * 反查构件
 * @static
 * @param {string[]} componentIds - 构件ID
 * @param {Number} dbScale - 镜头缩放系数, 默认取值2.0
 * @returns {void}
 */
var researchComp = function (componentIds, dbScale){
    componentObj.ResearchComp(componentIds, dbScale);
}

/**
 * 构件高亮
 * @static
 * @param {string[]} componentIds - 构件ID
 * @returns {void}
 */
var highlightComp = function (componentIds){
    componentObj.HighlightComp(componentIds);
}

/**
 * 取消构件高亮
 * @static
 * @param {string[]} componentIds - 构件ID
 * @returns {void}
 */
var cancelHighlightComp = function (componentIds){
    componentObj.CancelHighlightComp(componentIds);
}

/**
 * 获取构件的变换矩阵
 * @static
 * @param {string} componentId - 构件ID
 * @param {getCompTransfCallback} funcRet 
 * @returns {void}
 */
var getCompTransf = function (componentId, funcRet){
    return componentObj.GetCompTransf(componentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getCompTransf回调函数
 * @function
 * @callback getCompTransfCallback
 * @param {JSON} returnValue - 构件的变换矩阵
 * @see setCompTransf
 */

/**
 * 设置构件的变换矩阵
 * @static
 * @param {string} componentId - 构件ID 
 * @param {JSON} transf - 变换矩阵
 * 转换CAD矩阵 4*4，含平移，旋转，镜像，缩放
 * x1	x2	x3	t1
 * y1	y2	y3	t2
 * z1	z2	z3	t3
 * 0	0	0	1
 * 格式如下：
 * {
 *  line1:{col1:double, col2:double, col3:double, col4:double},
 *  line2:{col1:double, col2:double, col3:double, col4:double},
 *  line3:{col1:double, col2:double, col3:double, col4:double},
 *  line4:{col1:double, col2:double, col3:double, col4:double},
 * }
 * @returns {void}
 */
var setCompTransf = function (componentId, transf){
    componentObj.setCompTransf(componentId, JSON.stringfy(transf));
}

/** 
 * 获取构件包围盒(AABB)
 * @static
 * @param {string} componentId - 构件ID 
 * @param {getComponentBoundingBoxCallback} funcRet
 * @returns {void}
*/
var getComponentBoundingBox = function (componentId, funcRet){
    return componentObj.GetComponentBoundingBox(componentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getComponentBoundingBox回调函数
 * @function
 * @callback getComponentBoundingBoxCallback
 * @param {JSON} returnValue - 包围盒的点描述
 * 格式如下:
 * {
 *  lowPt:{x:double, y:double, z:double} //左下角
 *  highPt:{x:double, y:double, z:double} //右上角
 *  midPt:{x:double, y:double, z:double} //中心点
 * }
 */

 /** 
  * 根据类型获取构件
  * @static
  * @param {string} projId - 工程id
  * @param {string} type - 构件类型
  * @param {getProjComponentInfosByTypeCallback} funcRet
  * @return {void}
 */
function getProjComponentInfosByType(projId, type, funcRet) {
    return componentObj.GetProjComponentInfosByType(projId, type, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}

/** 
 * 根据排序后的类型获取构件
 * @static
 * @param {string} projId - 工程id
 * @param {string} type - 构件类型
 * @param {Boolean} bAsc = 是否升序排列
 * @param {getSortedProjComponentInfosByTypeCallback} funcRet
 * @return {void}
*/
function getSortedProjComponentInfosByType(projId, type, bAsc, funcRet){
    return componentObj.GetSortedProjComponentInfosByType(projId, type, bAsc, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * GetSortedProjComponentInfosByType
 * @function
 * @callback getSortedProjComponentInfosByTypeCallback
 * @param {JSON} returnValue - 构件信息的json数组
 * 格式如下:
 * [{
 *    componentId:string, 
 *    componentType:string, 
 *    componentName:string    
 *  }]
 */

 /**
 * 根据关联构件获取billboard列表
 * @static
 * @param {string} componentId - 关联了billboard的构件id
 * @param {getBillBoardByCompIdCallback} funcRet
 * @returns {void}
 */
var getBillboardByCompId = function (componentId, funcRet) {
    return componentObj.GetBillBoardByCompId(componentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getBillboardByCompId回调函数
 * @function
 * @callback getBillboardByCompIdCallback
 * @param {string[]} returnValue - billboardId列表
 */



 /**
 * 获取构件关联的工程列表
 * @static
 * @param {string} componentId - 构件id
 * @param {getLinkedProjIDCallback} funcRet
 * @returns {void}
 */
var getLinkedProjID = function (componentId, funcRet) {
    return componentObj.GetLinkedProjID(componentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getLinkedProjID回调函数
 * @function
 * @callback getLinkedProjIDCallback
 * @param {string[]} returnValue - 工程ID列表
 */

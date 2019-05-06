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
 * 构件属性key
 * @static
 * @enum {string}
 */
var ECompAttrKey = {
    /** 
     * bim构件属性guid
    */
    pa_attrGuid:"Param_AttrGuid",
    /** 
     * bim构件专业
    */
    pa_compDomain:"Param_ZhuanYeName",
    /** 
     * bim构件大类
    */
    pa_dalei:"Param_DaLeiName",
    /** 
     * bim构件小类
    */
    pa_xiaolei:"Param_XiaoLeiName",
    /** 
     * bim构件楼层名
    */
    pa_floorName:"Param_FloorName",
    /** 
     * bim构件系统名
    */
    pa_sysName:"Param_SysName",
    /** 
     * 构件对应的工程id
    */
    pa_compProjID:"pa_subprojID"
};

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
 *    pos:{x:double, y: double, z:double}
 *  }
 */

/**
 * 根据工程Id获取构件信息
 * @static
 * @param {string} projId - 工程Id
 * @param {getComponentInfosByProjIdCallback} funcRet
 * @returns {void}
 */
var getComponentInfosByProjId = function(projId, funcRet){
    return componentObj.GetComponentInfosByProjId(projId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getComponentInfosByProjId回调函数
 * @function
 * @callback getComponentInfosByProjIdCallback
 * @param {JSON} returnValue - 构件信息的json数组
 * 格式如下:
 * [{
 *    componentId:string, 
 *    componentType:string, 
 *    componentName:string, 
 *    pos:{x:double, y: double, z:double}
 *  }]
 */

/**
 * 设置构件属性
 * @static
 * @param {string} componentId - 构件ID
 * @param {string} attrKey - 属性键
 * @param {string} attrVal - 属性值
 * @returns {void}
 */
var setComponentAttr= function(componentId, attrKey, attrVal){
    return componentObj.SetComponentAttr(componentId, attrKey, attrVal);
}

/**
 * 获取构件属性
 * @static
 * @param {string} componentId - 构件ID
 * @param {string} attrKey - 属性键
 * @param {getComponentAttrCallback} funcRet
 * @returns {void}
 */
var getComponentAttr = function(componentId, attrKey, funcRet){
    return componentObj.GetComponentAttr(componentId, attrKey, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * getComponentAttr回调函数
 * @function
 * @callback getComponentAttrCallback
 * @param {string} returnValue - 构件属性
 */

/**
 * 删除构件
 * @static
 * @param {string} projId - 工程Id
 * @param {string} componentId - 构件Id
 * @param {removeComponentCallback} funcRet
 * @returns {void}
 */
var removeComponent = function(projId, componentId, funcRet){
    return componentObj.RemoveComponent(projId, componentId, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    });
}
/**
 * removeComponent回调函数
 * @function
 * @callback removeComponentCallback
 * @param {Boolean} returnValue - 操作结果
 */

/**
 * 批量设置构件颜色
 * @static
 * @param {string[]} componentIds - 构件Id列表
 * @param {string} color - 颜色十六进制字符串，如"#ff0000"
 * @param {setComponentColorCallback} funcRet
 * @returns {void}
 */
var setComponentColor = function (componentIds, color, funcRet) {
    return componentObj.ForceComponentColor(componentIds, color, function (returnValue) {
        if (typeof funcRet === "function") funcRet(returnValue);
    })
}
/**
 * setComponentColor回调函数
 * @function
 * @callback setComponentColorCallback
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
 * 批量设置构件是否可见
 * @static
 * @param {string[]} componentIds - 构件Id列表
 * @param {Boolean} bShow - 是否显示
 * @param {setComponentVisibleCallback} funcRet
 * @returns {void}
 */
var setComponentVisible = function (componentIds, bShow, funcRet) {
    return componentObj.SetComponentVisible(componentIds, bShow, function (returnValue) {
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
 * @param {string} compId - 构件ID 
 * @param {getCompTempDesInfoCallback} funcRet 
 * @returns {void}
 */
var getCompTempDesInfo = function (compId, funcRet){
    return componentObj.GetCompTempDesInfo(compId, function (returnValue) {
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
 *  CTVisible:Boolean, //属性面板是否可见
 *  CardVisible:Boolean, //卡片面板是否可见
 *  props:[
 *      {
 *          CTVisible:Boolean, //属性面板是否可见
 *          CardVisible:Boolean, //卡片面板是否可见
 *          prop:{key:string, value:string} //属性键值对
 *      }      
 *  ]
 * }
 */

/**
 * 获取构件bim信息
 * @static
 * @param {string} compId - 构件ID 
 * @param {getCompBimInfoCallback} funcRet 
 * @returns {void}
 */
var getCompBimInfo = function (compId, funcRet){
    return componentObj.GetCompBimInfo(compId, function (returnValue) {
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
 */

/**
 * 批量获取构件bim信息
 * @static
 * @param {string[]} compIds - 构件ID 
 * @param {getCompBimInfoBatchCallback} funcRet 
 * @returns {void}
 */
var getCompBimInfoBatch = function (compIds, funcRet){
    return componentObj.GetCompBimInfoBatch(compIds, function (returnValue) {
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
 *  }]
 */

/**
 * 反查构件
 * @static
 * @param {string[]} compIds - 构件ID
 * @param {Number} dbScale - 镜头缩放系数, 默认取值2.0
 * @returns {void}
 */
var researchComp = function (compIds, dbScale){
    componentObj.ResearchComp(compIds, dbScale);
}

/**
 * 构件高亮
 * @static
 * @param {string[]} compIds - 构件ID
 * @returns {void}
 */
var highlightComp = function (compIds){
    componentObj.HighlightComp(compIds);
}

/**
 * 取消构件高亮
 * @static
 * @param {string[]} compIds - 构件ID
 * @returns {void}
 */
var cancelHighlightComp = function (compIds){
    componentObj.CancelHighlightComp(compIds);
}

/**
 * 获取构件的变换矩阵
 * @static
 * @param {string} compId - 构件ID
 * @param {getCompTransfCallback} funcRet 
 * @returns {void}
 */
var getCompTransf = function (compId, funcRet){
    return componentObj.GetCompTransf(compId, function (returnValue) {
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
 * @param {string} compId - 构件ID 
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
var setCompTransf = function (compId, transf){
    componentObj.setCompTransf(compId, JSON.stringfy(transf));
}

/** 
 * 获取构件包围盒(AABB)
 * @static
 * @param {string} compId - 构件ID 
 * @param {getComponentBoundingBoxCallback} funcRet
 * @returns {void}
*/
var getComponentBoundingBox = function (compId, funcRet){
    return componentObj.GetComponentBoundingBox(compId, function (returnValue) {
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
 * @param {getProjComponentInfosByTypeCallback} funcRet
 * @return {void}
*/
function getSortedProjComponentInfosByType(projId, type, bAsc, funcRet){
    return componentObj.GetSortedProjComponentInfosByType(projId, type, bAsc, function (returnValue) {
        if (typeof funcRet === "function") funcRet(JSON.parse(returnValue));
    });
}
/**
 * getProjComponentInfosByType回调函数
 * @function
 * @callback getComponentInfosByProjIdCallback
 * @param {JSON} returnValue - 构件信息的json数组
 * 格式如下:
 * [{
 *    componentId:string, 
 *    componentType:string, 
 *    componentName:string, 
 *    pos:{x:double, y: double, z:double}
 *  }]
 */

 /**
 * 根据关联构件获取billboard列表
 * @static
 * @param {string} compId - 关联了billboard的构件id
 * @param {getBillBoardByCompIdCallback} funcRet
 * @returns {void}
 */
var getBillboardByCompId = function (compId, funcRet) {
    return componentObj.GetBillBoardByCompId(compId, function (returnValue) {
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
 * 删除构件
 * @static
 * @param {string} compId - 构件id
 * @param {Boolean} bTempComp - 是否是临时构件
 * @returns {void}
*/
var deleteComp = function (compId, bTempComp){
    componentObj.DeleteComp(compId, bTempComp);
}
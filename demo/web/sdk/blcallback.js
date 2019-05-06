/** 
 * 全局回调函数
 * @module CallBack 
 * */

 /**
 * 设置选择构件回调函数
 * @static
 * @param {onSelectComponentCallBack} callback - 回调函数对象
 * @return {void}
 */   
 var setSelectComponentCallBack = function(callback){
    componentObj.OnSelectComponent.connect(callback);
 };
/**
 * 选择构件回调函数 
 * @callback onSelectComponentCallBack
 * @param {string} componentId - 构件ID
 * @return {void}
 */

 /**
 * 移除选择构件回调函数
 * @static
 * @param {onSelectComponentCallBack} callback - 回调函数对象
 * @return {void}
 */   
var removeSelectComponentCallBack = function (callback) {
   componentObj.OnSelectComponent.disconnect(callback);
}

 /**
 * 设置选择billboard回调函数
 * @static
 * @param {onSelectBillBoardCallBack} callback - 回调函数对象
 * @return {void}
 */   
var setSelectBillBoardCallBack = function(callback){
    componentObj.OnSelectBillBoard.connect(callback);
 };
/**
 * 选择billboard回调函数
 * @callback onSelectBillBoardCallBack
 * @param {string} billboardId - billboardID
 * @returns {void}
 */

 /**
 * 移除选择billboard回调函数
 * @static
 * @param {onSelectBillBoardCallBack} callback - 回调函数对象
 * @return {void}
 */   
var removeSelectBillBoardCallBack = function(callback){
   componentObj.OnSelectBillBoard.disconnect(callback);
};

 /**
 * 设置创建构件回调函数
 * @static
 * @param {onCreateComponentCompleteCallBack} callback - 回调函数对象
 * @return {void}
 */    
var setCreateComponentCompleteCallBack = function(callback){
    projectObj.OnCreateComponentComplete.connect(callback);
 };
/**
 * 创建构件回调函数
 * @callback onCreateComponentCompleteCallBack
 * @param {string} projGuid - 工程ID
 * @param {string} componentId - 构件ID
 * @returns {void}
 */

/**
 * 移除创建构件回调函数
 * @static
 * @param {onCreateComponentCompleteCallBack} callback - 回调函数对象
 * @return {void}
 */    
var removeCreateComponentCompleteCallBack = function(callback){
   projectObj.OnCreateComponentComplete.disconnect(callback);
};
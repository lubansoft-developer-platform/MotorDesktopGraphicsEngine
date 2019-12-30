declare module 'all'{}
declare module 'core'{}
declare module 'component'{}
declare module 'viewer'{}
declare module 'project'{}
declare module 'domSize'{}
declare module 'typeDeclare'{}
declare module 'blcallback'{}
declare module 'blcomponentApi'{}
declare module 'blprojectApi'{}
declare module 'blsceneApi'{}
declare module 'blthreeViewApi'{}
declare module 'blsystemApi'{}


export declare class Config {
    static serverUrl: string;
}
export declare type ComponentType = ProjType;
export declare class Component {
    initiailize(): Promise<void>;
    select(): void;
    invertSelect(): void;
    show(): void;
    hide(): void;
    getProperties(): Promise<BIMProperty> | Promise<CompProperty[]>;
    resetColor(): void;
    isolate(): Promise<boolean>;
    getLinkedProject(): Promise<Project>;
    get guid(): string;
    get name(): string;
    get type(): ComponentType;
    get color(): Color;
    set color(value: Color);
    get position(): Cartesian3;
    get sysName(): string;
    get isSelected(): boolean;
}
export declare class Project {
    open(): Promise<boolean>;
    close(): Promise<boolean>;
    getPropTemplateInfo(): TemplateProps[];
    reset(): void;
    getFloors(): Promise<string[]>;
    queryComponents(option: QueryCIMCompOption): Promise<Component[]>;
    queryComponents(option: QueryBIMCompOption): Promise<Component[]>;
    queryComponents(compGuids: string[]): Promise<Component[]>;
    queryComponents(): Promise<Component[]>;
    getInnerProjects(): Promise<Project[]>;
    selectComponents(components: Component[] | string[]): void;
    selectComponents(): void;
    selectComponentsByOption(option: QueryCIMCompOption | QueryBIMCompOption): Promise<void>;
    setComponentsColor(color: Color, components: Component[] | string[]): void;
    setComponentsColor(color: Color): void;
    setComponentsColorByOption(option: QueryCIMCompOption | QueryBIMCompOption, color: Color): Promise<void>;
    resetComponentsDefaultColor(components: Component[] | string[]): void;
    resetComponentsDefaultColor(): void;
    resetComponentsDefaultColorByOption(option: QueryCIMCompOption | QueryBIMCompOption): void;
    setComponentsVisibility(bVisible: boolean, components: Component[] | string[]): void;
    setComponentsVisibility(bVisible: boolean): void;
    setComponentsVisibilityByOption(option: QueryCIMCompOption | QueryBIMCompOption, bVisible: boolean): void;
    isolate(components: Component[] | string[]): Promise<boolean>;
    isolateByOption(option: QueryCIMCompOption | QueryBIMCompOption): Promise<boolean>;
    get guid(): string;
    get type(): ProjType;
    get name(): string;
    get isOpened(): boolean;
    get position(): Cartesian3;
}
export declare interface ProjInfo {
    projId: string;
    projType: string;
    projName: string;
    pos: Cartesian3;
}
export declare interface CIMCompInfo {
    compId: string;
    compType: string;
    compName: string;
    pos: Cartesian3;
}
export declare enum ProjType {
    TYPE_CIM = 0,
    TYPE_BIM = 1
}
export declare enum NavigationMode {
    NAV_FREE_MOUSE = 0,
    NAV_FREE_KEY = 1,
    NAV_WALK = 2,
    NAV_CAR = 3,
    NAV_YACHT = 4,
    NAV_PLANE = 5
}
export declare enum EnumEnvParam {
    ENV_CLOUD = 0,
    ENV_RAIN = 1,
    ENV_WIND = 3,
    ENV_VELOCITY = 4,
    ENV_GRAVITY = 5
}
export declare enum BIMMajor {
    ARCH = 0,
    STEEL = 1,
    MEP = 2,
    REVIT = 3,
    TEKLA = 4,
    C3D = 5,
    BENTLY = 6,
    RHINO = 7,
    IFC = 8,
    SITE = 9
}
export declare interface VerifyInfo {
    appid: string;
    secret: string;
}
export declare interface ViewerOption {
    container: string | HTMLElement;
    verifyInfo: VerifyInfo | string;
    [key: string]: unknown;
}
export declare interface QueryCIMCompOption {
    sysName: string;
}
export declare interface QueryBIMCompOption {
    floor: string;
    major?: BIMMajor;
    main_type?: string;
    sub_type?: string;
    name?: string;
}
export declare interface TemplateProps {
    name: string;
    sysName: string;
    children: TemplateProps[];
}
export declare interface IsolateOption {
    project: Project;
    components: Component[] | string[];
}
export declare interface CompProperty {
    name: string;
    value: string;
    unit?: string;
    group?: string;
}
export declare interface BIMProperty {
    guid: string;
    projGuid: string;
    bimGuid: string;
    mainCompGuid: string;
    major: string;
    floor: string;
    bimFloor: string;
    main_type: string;
    sub_type: string;
    name: string;
    props: CompProperty[];
}
export declare class Cartesian3 {
    x: number;
    y: number;
    z: number;
}
export declare class FlyOption {
    postion: Cartesian3;
    phi: number;
    thi: number;
}
export declare class Color {
    static fromHexString(hex: string): Color;
    toHexString(): string;
    withAlpha(alpha: number): Color;
    red: number;
    green: number;
    blue: number;
    alpha: number;
}

export declare class Viewer {
    constructor(option: ViewerOption);
    destroyed(): void;
    initialize(): Promise<boolean>;
    getProjectList(): Promise<Project[]>;
    flyTo(param: FlyOption | Project | Component): void;
    setViewerEnv(EnvParam: EnumEnvParam, dbValue: number): void;
    getViewerEnv(EnvParam: EnumEnvParam): Promise<number>;
    queryProject(guid: string): Project | undefined;
    getOpeningProjectList(): Project[];
    isolate(option: IsolateOption): Promise<boolean>;
    set navigationMode(value: NavigationMode);
    get navigationMode(): NavigationMode;
    set envDate(date: Date);
    get envDate(): Date;
}

 /**
 * 设置选择构件回调函数
 * @static
 * @param {onSelectComponentCallBack} callback - 回调函数对象
 * @return {void}
 */   
export declare var setSelectComponentCallBack: (callback: any) => void
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
export declare var removeSelectComponentCallBack: (callback: any) => void;
/**
* 设置选择billboard回调函数
* @static
* @param {onSelectBillBoardCallBack} callback - 回调函数对象
* @return {void}
*/
export declare var setSelectBillBoardCallBack: (callback: any) => void;
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
export declare var removeSelectBillBoardCallBack: (callback: any) => void;
/**
* 设置创建构件回调函数
* @static
* @param {onCreateComponentCompleteCallBack} callback - 回调函数对象
* @return {void}
*/
export declare var setCreateComponentCompleteCallBack: (callback: any) => void;
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
export declare var removeCreateComponentCompleteCallBack: (callback: any) => void;
/**
 * 构件类型
 * @static
 * @enum {string}
*/
export declare var ECompType: {
    /**
     * CLUSTER Mod类型
    */
    type_cluster: string;
    /**
     * 地形
    */
    type_terrain: string;
    /**
     * 倾斜摄影
    */
    type_qxsy: string;
    /**
     * FBX模板类型
     */
    type_fbx: string;
};
/**
 * 根据工程Id获取其工程下所有构件列表
 * @static
 * @param {string} projId - 工程Id
 * @param {getCimProjectComponentsCallback} funcRet
 * @returns {void}
 */
export declare var getCimProjectComponents: (projId: any, funcRet: (arg0: any) => void) => any;
/**
 * GetComponentsByProjId
 * @function
 * @callback getCimProjectComponentsCallback
 * @param {JSON[]} returnValue - 构件信息的json数组
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
export declare var getComponentInfo: (componentId: any, funcRet: (arg0: any) => void) => any;
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
export declare var setComponentForceColor: (componentIds: any, color: any, funcRet: (arg0: any) => void) => any;
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
export declare var clearComponentForceColor: (componentIds: any, funcRet: (arg0: any) => void) => any;
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
export declare var setForceColorForProj: (projId: any, color: any, funcRet: (arg0: any) => void) => any;
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
export declare var clearForceColorForProj: (projId: any, funcRet: (arg0: any) => void) => any;
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
export declare var setComponentVisible: (componentId: any, bShow: any, funcRet: (arg0: any) => void) => any;
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
export declare var setVisibleForProj: (projId: any, bShow: any, funcRet: (arg0: any) => void) => any;
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
export declare var setSelectID: (componentIds: any) => any;
/**
 * 获取构件坐标
 * @static
 * @param {string} componentId - 构件Id
 * @param {getComponentPositionCallback} funcRet
 * @returns {void}
 */
export declare var getComponentPosition: (componentId: any, funcRet: (arg0: any) => void) => any;
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
export declare var enablePointCheckMode: (bEnable: any) => any;
/**
 * 创建billboard
 * @static
 * @param {string} relComponentId - 需要关联的构件Id
 * @param {string} sType - billboard类型
 * @param {createBillboardCallback} funcRet
 * @returns {void}
 */
export declare var createBillboard: (relComponentId: any, sType: any, funcRet: (arg0: any) => void) => any;
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
export declare var getRelComponentInBillboard: (billboardId: any, funcRet: (arg0: any) => void) => any;
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
export declare var removeBillboard: (billboardIds: any) => any;
/**
 * 根据类型移除billboard
 * @static
 * @param {string} sType - billboard类型
 * @returns {void}
 */
export declare var removeBillboardByType: (sType: any) => any;
/**
 * 显示/隐藏billboard
 * @static
 * @param {string[]} billboardIds - billboardId列表
 * @param {Boolean} bShow - 是否显示
 * @returns {void}
 */
export declare var setBillboardVisible: (billboardIds: any, bShow: any) => any;
/**
 * 根据类型显示/隐藏billboard
 * @static
 * @param {string} sType - billboard类型
 * @param {Boolean} bShow - 是否显示
 * @returns {void}
 */
export declare var setBillboardVisibleByType: (sType: any, bShow: any) => any;
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
export declare var setBillboardImgByUrl: (billboardId: any, sUrl: any, scalingPicTimes: any, scalingPoint: any, scalingLine: any) => any;
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
export declare var setBillboardImgByLocal: (billboardId: any, sPath: any, scalingPicTimes: any, scalingPoint: any, scalingLine: any) => any;
/**
 * 根据类型获取billboard列表
 * @static
 * @param {string} sType - billboard类型
 * @param {getBillboardByTypeCallback} funcRet
 * @returns {void}
 */
export declare var getBillboardByType: (sType: any, funcRet: (arg0: any) => void) => any;
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
export declare var getCompTempDesInfo: (componentId: any, funcRet: (arg0: any) => void) => any;
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
export declare var getCompBimInfo: (componentId: any, funcRet: (arg0: any) => void) => any;
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
export declare var getCompBimInfoBatch: (componentIds: any, funcRet: (arg0: any) => void) => any;
/**
 * getCompBimInfoBatch回调函数
 * @function
 * @callback getCompBimInfoBatchCallback
 * @param {JSON[]} returnValue - 构件的bim信息
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
export declare var researchComp: (componentIds: any, dbScale: any) => void;
/**
 * 构件高亮
 * @static
 * @param {string[]} componentIds - 构件ID
 * @returns {void}
 */
export declare var highlightComp: (componentIds: any) => void;
/**
 * 取消构件高亮
 * @static
 * @param {string[]} componentIds - 构件ID
 * @returns {void}
 */
export declare var cancelHighlightComp: (componentIds: any) => void;
/**
 * 获取构件的变换矩阵
 * @static
 * @param {string} componentId - 构件ID
 * @param {getCompTransfCallback} funcRet
 * @returns {void}
 */
export declare var getCompTransf: (componentId: any, funcRet: (arg0: any) => void) => any;
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
export declare var setCompTransf: (componentId: any, transf: any) => void;
/**
 * 获取构件包围盒(AABB)
 * @static
 * @param {string} componentId - 构件ID
 * @param {getComponentBoundingBoxCallback} funcRet
 * @returns {void}
*/
export declare var getComponentBoundingBox: (componentId: any, funcRet: (arg0: any) => void) => any;
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
export declare function getProjComponentInfosByType(projId: any, type: any, funcRet: (arg0: any) => void): any;
/**
 * 根据排序后的类型获取构件
 * @static
 * @param {string} projId - 工程id
 * @param {string} type - 构件类型
 * @param {Boolean} bAsc = 是否升序排列
 * @param {getSortedProjComponentInfosByTypeCallback} funcRet
 * @return {void}
*/
export declare function getSortedProjComponentInfosByType(projId: any, type: any, bAsc: any, funcRet: (arg0: any) => void): any;
/**
 * GetSortedProjComponentInfosByType
 * @function
 * @callback getSortedProjComponentInfosByTypeCallback
 * @param {JSON[]} returnValue - 构件信息的json数组
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
export declare var getBillboardByCompId: (componentId: any, funcRet: (arg0: any) => void) => any;
/**
 * getBillboardByCompId回调函数
 * @function
 * @callback getBillboardByCompIdCallback
 * @param {string[]} returnValue - billboardId列表
 */
/**
* 获取构件关联的子CIM工程
* @static
* @param {string} componentId - 构件id
* @param {getLinkedProjIDCallback} funcRet
* @returns {void}
*/
export declare var getLinkedProjID: (componentId: any, funcRet: (arg0: any) => void) => any;
/**
 * getLinkedProjID回调函数
 * @function
 * @callback getLinkedProjIDCallback
 * @param {string} returnValue - 工程ID
 */
/**
 * 获取构件关联的BIM工程列表
 * @static
 * @param {string} componentId - 构件id
 * @param {getLinkedBimProjListCallback} funcRet
 * @returns {void}
 */
export declare var getLinkedBimProjList: (componentId: any, funcRet: (arg0: any) => void) => any;
/**
 * 工程属性key
 * @static
 * @enum {string}
 */
export declare var EProjKey: {
    /**
     * 位置属性
    */
    pa_position: string;
    /**
     * cim工程的工程属性中映射BIM工程的楼层对应JSON
    */
    pa_floormap: string;
};
/**
 * 操作类型
 * @static
 * @enum {number}
 */
export declare var EManipulatorType: {
    /**
     * 平移
     */
    EManipulatorMove: number;
    /**
     * 旋转
     */
    EManipulatorRotate: number;
    /**
     * 缩放
     */
    EManipulatorScale: number;
    /**
     * 无
     */
    EManipulatorNone: number;
};
/**
 * 工程选择模式
 * @static
 * @enum {number}
 */
export declare var ESelectType: {
    /**
     * 切层
    */
    selfloor: number;
    /**
     * 选择构件
    */
    selComp: number;
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
export declare var getLinkedProjectForOpening: (funcRet: (arg0: any) => void) => any;
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
export declare var getProjectInfo: (projId: any, funcRet: (arg0: any) => void) => any;
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
export declare var getAllProjInfoList: (funcRet: (arg0: any) => void) => any;
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
export declare var getBimProjectList: (projId: any, funcRet: (arg0: any) => void) => void;
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
export declare var openLinkedProjectByComp: (compId: any, funcRet: (arg0: any) => void) => any;
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
export declare var closeLinkedProject: (funcRet: (arg0: any) => void) => any;
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
export declare var saveProject: (projId: any, funcRet: (arg0: any) => void) => any;
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
export declare var setValidManipulatorType: (type: any) => any;
/**
 * 恢复当前工程默认状态
 * @static
 * @returns {void}
 */
export declare var resetProjectStatus: () => void;
/**
 * 获取工程属性
 * @static
 * @param {string} projId - 工程id
 * @param {EProjKey} attrKey - 属性key
 * @param {getProjectAttrCallback} funcRet
 * @returns {void}
*/
export declare var getProjectAttr: (projId: any, attrKey: any, funcRet: (arg0: any) => void) => void;
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
export declare var setProjectAttr: (projId: any, attrKey: any, attrVal: any) => void;
/**
 * 获取工程所有bim构件信息
 * @static
 * @param {string} projId - bim工程id
 * @param {getBimProjectComponentsCallback} funcRet
 * @returns {void}
*/
export declare var getBimProjectComponents: (projId: any, funcRet: (arg0: any) => void) => void;
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
export declare var getBimProjectComponetsByCimFloor: (projId: any, floorId: any, funcRet: (arg0: any) => void) => void;
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
export declare var getProjectCimFloors: (projId: any, funcRet: (arg0: any) => void) => void;
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
export declare var getProjectPropTempDes: (projId: any, funcRet: (arg0: any) => void) => void;
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
export declare var setSelType: (type: any) => void;
/**
 * 获取当前切层/选择构件模式
 * @static
 * @param {getSelTypeCallBack} funcRet
 * @return {void}
*/
export declare var getSelType: (funcRet: (arg0: any) => void) => void;
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
export declare var isBimModelProject: (projId: any, funcRet: (arg0: any) => void) => any;
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
export declare var isCimProject: (projId: any, funcRet: (arg0: any) => void) => any;
/**
* 场景参数类型
* @static
* @enum {number}
*/
export declare var ESceneType: {
    /** 云 */
    ESC_CLOUD: number;
    /** 雨 */
    ESC_RAIN: number;
    /** 时间 */
    ESC_TIME: number;
    /** 风 */
    ESC_WIND: number;
    /** 相机速度 */
    ESC_VELOCITY: number;
    /** 重力 */
    ESC_GRAVITY: number;
};
/**
* 漫游模式
* @static
* @enum {number}
*/
export declare var ERoamMode: {
    /** 自由漫游(鼠标) */
    ERM_FREE_MOUSE: number;
    /** 自由漫游(键盘) */
    ERM_FREE_KEY: number;
    /** 步行 */
    ERM_WALK: number;
    /** 驾车 */
    ERM_CAR: number;
    /** 游艇 */
    ERM_YACHT: number;
    /** 飞行 */
    ERM_PLANE: number;
};
/**
* 初始化场景工程列表
* @static
* @param {initSceneProjDataCallback} funcRet
* @returns {void}
*/
export declare var initSceneProjData: (funcRet: (arg0: any) => void) => any;
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
export declare var positionTo: (x: any, y: any, z: any, dPhi: any, dThi: any) => any;
/**
 * 定位构件
 * @static
 * @param {string} componentId - 构件Id
 * @returns {void}
 */
export var positionToComponent: (componentId: any) => any;
/**
 * 定位工程
 * @static
 * @param {string} projId - 工程id
 * @returns {void}
 */
export declare var positionToProject: (projId: any) => any;
/**
 * 设置指定场景参数
 * @static
 * @param {ESceneType} typeArg - 参数类型
 * @param {Number} dbArg - 参数值
 */
export declare var setSceneArg: (typeArg: any, dbArg: any) => void;
/**
 * 获取指定场景参数
 * @static
 * @param {ESceneType} typeArg - 参数类型
 * @param {getSceneArgCallback} funcRet
 */
export declare var getSceneArg: (typeArg: any, funcRet: (arg0: any) => void) => void;
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
export declare var setPlayerMode: (nMode: any) => void;
/**
 * 加载场景工程数据
 * @static
 * @param {string} sceneProjId - 场景工程id
 * @param {loadSceneProjDataCallback} funcRet
 * @return {void}
*/
export declare var loadSceneProjData: (sceneProjId: any, funcRet: (arg0: any) => void) => void;
/**
 * 卸载场景工程数据
 * @static
 * @param {string} sceneProjId - 场景工程id
 * @param {loadSceneProjDataCallback} funcRet
 * @return {void}
*/
export declare var unLoadSceneProjData: (sceneProjId: any, funcRet: (arg0: any) => void) => void;
/**
* loadSceneProjData回调函数
* @callback loadSceneProjDataCallback
* @param {Boolean} returnValue - 操作结果
*/
/**
 * 打开工程
 * @static
 * @param {string} projId - 工程id
 * @param {} funcRet
 */
export declare var openSceneProject: (projId: any, funcRet: (arg0: any) => void) => any;
/**
* openSceneProject回调函数
* @callback openSceneProjectCallback
* @param {Boolean} returnValue - 操作结果
*/
/**
* 关闭工程
* @static
* @param {string} projId - 工程id
* @param {} funcRet
*/
export declare var closeSceneProject: (projId: any, funcRet: (arg0: any) => void) => any;
/**
 * 操作类型
 * @static
 * @enum {number}
 */
export declare var ESystemMode: {
    /**
     * 调试模式
     */
    DebugMode: number;
    /**
     * 释出模式
     */
    ReleaseMode: number;
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
export declare var getLocalRootPath: (funcRet: (arg0: any) => void) => any;
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
export declare var getSaveFilePath: (funcRet: (arg0: any) => void) => any;
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
export declare var getOpenFilePath: (funcRet: (arg0: any) => void) => any;
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
export declare var getFolderPath: (funcRet: (arg0: any) => void) => any;
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
export declare var setSystemMode: (mode: any) => any;
/**
 * 应用程序窗口最大化
 * @static
 */
export declare var showMaxSize: () => any;
/**
 * 应用程序窗口正常化
 * @static
 */
export declare var showNomalSize: () => any;
/**
 * 应用程序窗口最小化
 * @static
 */
export declare var showMiniSize: () => any;
/**
 * 判断当前应用程序是否最大化
 * @static
 * @param {isMaxSizedCallback} funcRet
 * @returns {void}
 */
export declare var isMaxSized: (funcRet: (arg0: any) => void) => any;
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
export declare function setToken(server: any, token: any): void;
/**
 * 关闭主窗口
 * @static
 */
export declare var closeMainWindow: () => void;
/**
 * 设置主窗口大小
 * @static
 * @param {Number} w - 窗口宽度
 * @param {Number} h - 窗口高度
 * @return {void}
 */
export declare var resizeMainWindow: (w: any, h: any) => void;
/**
 * 移动主窗口至点{x, y}处
 * @static
 * @param {Number} x - 窗口x值
 * @param {Number} y - 窗口y值
 * @return {void}
 */
export declare var moveMainWindow: (x: any, y: any) => void;
/**
 * 获取主窗口位置区域
 * @static
 * @param {geometryCallback} funcRet
 * @return {void}
 */
export declare var geometry: (funcRet: (arg0: any) => void) => any;
/**
 * 获取主窗口标准视图下位置区域
 * @static
 * @param {geometryCallback} funcRet
 * @return {void}
 */
export declare var normalGeometry: (funcRet: (arg0: any) => void) => void;
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
export declare var setGeometry: (rect: any) => void;
/**
 * 拖拽主窗口
 * @static
 * @param {dragMainWindowCallback} funcRet
 * @returns {void}
 */
export declare var dragMainWindow: (funcRet: (arg0: any) => void) => void;
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
export declare var showProcessBar: () => void;
/**
 * 关闭进度条
 * @static
 * @returns {void}
 */
export declare var closeProcessBar: () => void;
/**
 * WGS84坐标点转换到图形引擎中的三维空间坐标点
 * @static
 * @param {Number} dbB - 大地纬度
 * @param {Number} dbL - 大地经度
 * @param {Number} dbH - 大地高
 * @param {convertWGS84toWorldCoordCallBack} funcRet
 * @returns {void}
 */
export declare var convertWGS84toWorldCoord: (dbB: any, dbL: any, dbH: any, funcRet: (arg0: any) => void) => void;
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
export declare var convertWorldCoordtoWGS84: (dbX: any, dbY: any, dbZ: any, funcRet: (arg0: any) => void) => void;
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
export declare var getScreenInfos: (funcRet: (arg0: any) => void) => void;
/**
 * 移除三维视图焦点
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @returns {void}
 */
export declare var BL3D_focusOutEvent: (element: any) => void;
/**
 * 聚焦三维视图
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @returns {void}
 */
export declare var BL3D_focusInEvent: (element: any) => void;
/**
 * 鼠标移动事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
export declare var BL3D_mouseMoveEvent: (element: any, e: any) => void;
/**
 * 鼠标双击事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
export declare var BL3D_mouseDoubleClickEvent: (element: any, e: any) => void;
/**
 * 鼠标按下事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
export declare var BL3D_mousePressEvent: (element: any, e: any) => void;
/**
 * 鼠标弹起事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
export declare var BL3D_mouseReleaseEvent: (element: any, e: any) => void;
/**
 * 键盘按下事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 键盘事件
 * @returns {void}
 */
export declare var BL3D_keyPressEvent: (element: any, e: any) => void;
/**
 * 键盘弹起事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 键盘事件
 * @returns {void}
 */
export declare var BL3D_keyReleaseEvent: (element: any, e: any) => void;
/**
 * 鼠标滚轮事件
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @param {Event} e - 鼠标事件
 * @returns {void}
 */
export declare var BL3D_wheelEvent: (element: any, e: any) => void;
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
export declare var BL3D_resizeEvent: (element: any, x: any, y: any, width: any, height: any) => void;
/**
 * 绑定三维视图
 * @static
 * @param {HTMLElement} element - 与三维图形界面绑定的html元素
 * @returns {void}
 */
export declare var bind3DView: (element: any) => void;
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
export declare var setCameraPro: (fFove: any, fZNear: any, fZFar: any) => void;
/**
 * 获取相机投影
 * @static
 * @param {getCameraProCallBack} funcRet
 */
export declare var getCameraPro: (funcRet: (arg0: any) => void) => void;
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
export declare var setCameraDir: (cameraDir: any) => void;
/**
 *
 * @static
 * @param {getCameraDirCallBack} funcRet
 */
export declare var getCameraDir: (funcRet: (arg0: any) => void) => void;
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
export declare var setCameraPos: (pos: any) => void;
/**
 * 获取相机位置
 * @static
 * @param {getCameraPosCallBack} funcRet
 */
export declare var getCameraPos: (funcRet: (arg0: any) => void) => void;
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
export declare var rotateCameraAboutCurCenterPt: (dbRadian: any) => void;
/**
 * 绕当前中心旋转相机
 * @static
 * @param {Number} dbRadian - 旋转角度的弧度值
 * @param {Number} dbLen - 相机距离中心点的距离
 */
export declare var rotateCameraAboutCurCenterPtEx: (dbRadian: any, dbLen: any) => void;
/**
 * 转动地球
 * @static
 * @param {Number} dbRadian - 旋转角度的弧度值
 */
export declare var rotateEarth: (dbRadian: any) => void;
/**
 * 设置光源是否跟随相机
 * @static
 * @param {Boolean} bEnable - 开关参数
 */
export declare var setLightFollowCamera: (bEnable: any) => void;
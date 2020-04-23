## 更新日志

### Motor Desktop SDK v2.0.2
**bug fix**
- 修复修改构件颜色透明度失败的bug

### Motor Desktop SDK v2.0.1

**bug fix**
- 修复基于JS的事件穿透失败的bug

### Motor Desktop SDK v2.0

**add**
- Project
- Component
- Viewer
- Config

**framework change**

- 修改ES5函数，为ES6风格
- 使用class代替function

**deprecated**

- blprojectApi.js

    1. 使用Project替代

- blcomponentApi.js

    1. 使用Component替代

- blsceneApi.js

    1. 使用Viewer替代

- blthreeViewApi.js

    1. 使用Viewer替代

**feature**

- 支持script方式引入
- 支持ES6语法
- 支持typescript
- 支持amd, commonjs方式引入

### Motor Desktop SDK v1.0

**feature**

- blprojectApi.js

    1. 修改getLinkedProjectForOpening返回值，之前版本返回SubCim和SubBim工程ID,当前版本仅返回SubCim工程ID。
    2. 新增getBimProjectList接口，根据构件上的subCim工程id获取关联Bim工程列表。
    3. 删除getBimProjectInfo。

- blcomponentApi.js
    1. 修改getLinkedProjID返回值，之前版本返回SubCim和 关联Bim工程ID,当前版本仅返回SubCim工程ID。
    2. 新增getLinkedBimProjList，获取构件关联的BIM工程列表。

- blsystemApi.js
    1. 新增setCookie。

**bug fix**

- 修复场景切换引发程序崩溃的bug
- 修复选择构件模式在特定情况下失效的bug
- 修复billboard基准点丢失的bug
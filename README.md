## Motor Desktop Graphics Engine
基于JavaScript的桌面版图形引擎

### 概述
Motor Desktop Graphics Engine(以下简称为sdk)主要针对于网页前端开发人员，基于Motor客户端进行二次开发。本sdk将提供一套完整的基于javascript的解决方案和接口支持。本sdk基于但不限于以下三部分组成:
- 基于三维模型展示的CIM客户端主体。
- 基于chromium的浏览器内核支持。
- 基于js的sdk包。

### SDK的技术支持范围
- 本SDK开发包，基于原生的javascript进行开发，为客户提供基础性接口以及定制性接口需要。
- 本SDK开发包由于包含了与本地Motor客户端的通信桥接，因此无法在浏览器中进行调试，为此，SDK将在Motor客户端中提供一套简易的网页调试工具，便于用户进行开发和调试。
- 本SDK包将配套提供一个简易的demo，去演示sdk的调用事例。
- 本SDK所有demo的测试环境都将基于blink内核的chromium浏览器作为测试环境。

### SDK的使用范围
- 客户使用本SDK开发包，将可以自由的使用html+js进行前端界面开发，原则上无任何限制。

### SDK的提供形式
- 本SDK将提供一个包含js文件的sdk压缩包。

### Motor客户端
- 另行下载

### 目录结构

```
/CIM Client SDK
|
|----/sdk
|    |
|    |----blsdk.js
|    |
|    |---- blcallback.js 
|    |
|    |---- blcomponentApi.js
|    |
|    |---- blprojectApi.js
|    |
|    |---- blsceneApi.js
|    |
|    |---- blsystemApi.js
|    |
|    |---- blthreeViewApi.js
|    |
|    |---- *.js
|    |
|    \
|
|----/doc
|    |
|    |----index.html
|    |
|    \
|
|----/demo
|    |
|    |----/web
|    |    |
|    |    |----*.*
|    |    |
|    |    \
|    |
|    |----config.ini
|    |
|    |----/pic
|    |    |
|    |    |----*.*
|    |    |
|    |    \
|    |
|    \
|
\
```
#### sdk
    sdk文件夹下存放了CIM Client SDK 提供的所有js扩展库

- blsdk.js

```ini
CIM Client SDK主入口文件
```
- blcallback.js

```ini
CIM Client SDK全局回调通知API
```

- blcomponentApi.js

```ini
CIM Client SDK构件模块API
```

- blprojectApi.js

```ini
CIM Client SDK工程模块API
```

- blsceneApi.js

```ini
CIM Client SDK场景模块API
```

- blsystemApi.js

```ini
CIM Client SDK系统模块API
```

- blthreeViewApi.js

```ini
CIM Client SDK三维模块API
```

#### doc
    doc文件夹下存放了CIM Client SDK的离线版接口文档

- index.html

```ini
CIM Client SDK离线版接口文档入口文件
```

#### demo
    demo文件夹中提供了由班联数城提供的基于CIM Client SDK开发的示例demo
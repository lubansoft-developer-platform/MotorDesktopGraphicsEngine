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
- 本SDK下的release包

### 目录结构

```
/MotorDesktopGraphicsEngine
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
|----/release
|    |
|    |----config.ini
|    |
|    |----BLLogin.exe
|    |
|    |----*.*
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
    sdk文件夹下存放了MotorDesktopGraphicsEngine提供的所有js扩展库

- blsdk.js

```ini
MotorDesktopGraphicsEngine主入口文件
```
- blcallback.js

```ini
MotorDesktopGraphicsEngine全局回调通知API
```

- blcomponentApi.js

```ini
MotorDesktopGraphicsEngine构件模块API
```

- blprojectApi.js

```ini
MotorDesktopGraphicsEngine工程模块API
```

- blsceneApi.js

```ini
MotorDesktopGraphicsEngine场景模块API
```

- blsystemApi.js

```ini
MotorDesktopGraphicsEngine系统模块API
```

- blthreeViewApi.js

```ini
MotorDesktopGraphicsEngine三维模块API
```

#### doc
    doc文件夹下存放了MotorDesktopGraphicsEngine的离线版接口文档

- index.html

```ini
MotorDesktopGraphicsEngine离线版接口文档入口文件
```

#### release
    relsase文件夹中提供了Motor客户端

- config.ini

```ini
[Url]
#web项目的入口地址是否为本地文件
local=true

#web项目的入口文件路径，本地文件为相对于release文件夹的相对路径(大小写不敏感); 网络地址需要加上协议前缀，如: http://www.baidu.com
url=你的项目入口文件地址(如:./myproject/index.html)

[Debug]
#是否可调试，当此项为true或1时，可以在平台中弹出右键菜单，选择devtool进行项目调试
debug=false
```

- BLLogin.exe

```ini
CIM Client主进程
```

#### demo
    demo文件夹中提供了由鲁班开发者平台(LDP)提供的基于MotorDesktopGraphicsEngine开发的示例demo
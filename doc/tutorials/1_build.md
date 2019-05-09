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

---
### 环境搭建

```javascript
1. 建立你自己的web project
2. 将sdk中的所有文件移动到你的project中，并确保他们位于相同的路径下
3. 在你的project中使用如下语句<script type='text/javascript' src='blsdk.js'></script>将sdk库引入到你的project中
4. 将你的project文件夹移动到release文件夹下
5. 根据你的实际情况配置config.ini
6. 运行BLLogin.exe，并开启你的开发之旅
```

---
### 官方Demo使用

```javascript
1. 将demo文件夹下的所有内容移动到release文件夹下
2. 运行BLLogin.exe，享受Demo给你带来的开发乐趣
```




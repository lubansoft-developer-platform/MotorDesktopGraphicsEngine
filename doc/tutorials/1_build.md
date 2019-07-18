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
|----/release
|    |
|    |----config.ini
|    |
|    |----LBCityEye.exe
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

#### release
    relsase文件夹中提供了CIM客户端平台

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

- LBCityEye.exe

```ini
CIM Client主进程
```

#### demo
    demo文件夹中提供了由班联数城提供的基于CIM Client SDK开发的示例demo

---
### 环境搭建

```javascript
1. 建立你自己的web project
2. 将sdk中的所有文件移动到你的project中，并确保他们位于相同的路径下
3. 在你的project中使用如下语句<script type='text/javascript' src='blsdk.js'></script>将sdk库引入到你的project中
4. 将你的project文件夹移动到release文件夹下
5. 根据你的实际情况配置config.ini
6. 运行LBCityEye.exe，并开启你的开发之旅
```

---
### 官方Demo使用

```javascript
1. 将demo文件夹下的所有内容移动到release文件夹下
2. 运行LBCityEye.exe，享受Demo给你带来的开发乐趣
```




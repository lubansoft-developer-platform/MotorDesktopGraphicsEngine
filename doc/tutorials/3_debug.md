### 开发调试
- 开发调试同时支持发布状态调试以及开发状态调试
- 发布状态调试
    - 进入Motor开发组件客户端根目录
    - 编辑config.ini
    ```ini
    [Debug]
    #将debug字段设置为true或1，开启调试
    debug=false
    ```
    - 开启调试开关后，在Motor开发组件客户端主界面点击右键(无需重启cim客户端)，在右键菜单中选择devTool,开启进程内调试工具
    - 将debug字段设置为`false`或`0`关闭调试，此时，Motor开发组件客户端主界面将不再弹出右键菜单

- 开发状态调试
    - 在你的web project项目中，调用system模块下的setSystemMode接口
    ```javascript
    <script>
        setSystemMode(ESystemMode.DebugMode);
    </script>
    ```
    - `ESystemMode.DebugMode`参数表示开启调试模式，此时，在Motor开发组件客户端主界面点击右键，在右键菜单中选择devTool,开启进程内调试工具
    - `ESystemMode.ReleaseMode`参数表示关闭调试模式，此时，Motor开发组件客户端主界面将不再弹出右键菜单

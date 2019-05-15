pragma Singleton
import QtQml 2.0

QtObject {
    // 字体颜色
    property string fontFamily: "微软雅黑"
    // 字体大小pixelSize
    property real fontSize: 12
    // 文本颜色
    property color textColor: "#ffffff"
    // 字体对象
    function getFontObject(size) {
        return Qt.font({"family": fontFamily, "pixelSize": (!size?fontSize : size)});
    }
    // 千分位
    function analysisValue(value,decimal) {
        return (value.toFixed(decimal) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }
	// 获取exe所在目录
	function getAppDir() {
		var appDir = Qt.application.arguments[0];
		return appDir.substr(0,appDir.lastIndexOf(Qt.application.name+".exe"));
	}
}

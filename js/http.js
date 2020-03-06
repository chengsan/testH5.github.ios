/**
 * 接口调用通用处理方案
 * @huangkb 2019-7-01 11:23:45
 */
var _path = location.pathname.split("/")[1];

function FN() {
}

FN.prototype = {
    request: function (serviceName, params) {
        var def = $.Deferred();
        var bean = {
            "bean": params
        };
        $.ajax({
            contentType: "application/json",
            type: "post",
            url: "/" + _path + "/restservices/bbapp/" + serviceName + "/query",
            data: JSON.stringify(bean),
            dataType: "json",
            success: function (data) {
                // console.log(data);
                def.resolve(data);
            }
        });
        return def.promise();
    },
    alertBox: function (msg) {
        var html = '<div onclick="alertBoxClose()" id="alertBoxBack" style="display: block;position: fixed;top: 0;right: 0;bottom: 0;left: 0;background: #000;opacity: 0.4;z-index: 101;"></div>';
        html += '<div id="alertBoxClose" style="transform: translate(-50%, -50%) translateY(0) scale(1);top: 50%;position: fixed;left: 50%;z-index: 102;background: #fff;box-shadow: 0px 0px 10px 0px rgba(0, 8, 33, 0.1);border-radius: 6px;min-width: 360px;padding: 15px;box-sizing: border-box;transition: 0.3s;display: block;">';
        html += '<a href="javascript:;" onclick="alertBoxClose()" style="position: absolute;right: 16px;top: 16px;text-decoration: none;color: inherit;transition: 0.3s;cursor: pointer;"><img src="../../img/X.png" alt="" style="width: 14px;height: 14px;color: inherit;cursor: pointer;"></a>';
        html += '<h2 style="font-size: 20px;color: #333;margin: 0;margin-bottom:20px;font-weight:normal;">提示</h2><p style="font-size: 15px;color: #333;margin:20px 0;">' + msg + '</p>';
        html += '<div style="margin-top: 15px;text-align: right;">';
        html += '<a href="javascript:;" onclick="alertBoxClose()" style="margin-left: 10px;background: #5d92ff;border-color: #5d92ff;height: 30px;line-height: 30px;font-size: 14px;padding: 0 2em;display: inline-block;color: #fff;border-radius: 6px;border: 1px solid transparent;overflow: hidden;position: relative;text-align: center;box-sizing: border-box;text-decoration: none;transition: 0.3s;cursor: pointer;">确定</a></div></div>';
        $("body").append(html);
    }
};

//创建全局通用对象
var BB = new FN();

function alertBoxClose() {
    $('#alertBoxBack').remove();
    $('#alertBoxClose').remove();
}
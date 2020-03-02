//var _androidUrl = window.location.origin + "/NVSI/LEAP/Download/default/{areaid}/2020/2/8/99f1f271a0c440c2b7031ece9ca9d377.apk";
var _androidUrl = "http://zwfw.lg.gov.cn/LGFK/LEAP/Download/default/2020/2/20/19db9498e2a64d77b565e1e3f87bc31b/_v3_/%E7%96%AB%E6%83%85%E9%98%B2%E6%8E%A7_andriod_%E6%AD%A3%E5%BC%8F1.0.0.apk";
var _qrcodeurl = "./img/qrcode0220.png";
var _iosPalistUrl = "https://code.aliyun.com/longrise_mobile/yqfkplist/raw/master/yqfk_lg.plist";

var version = "1.0.0";
var updateTime = "2020-02-20";

var type = null;

$(function () {
   deviceCheck();
   $("#Androidversion").text(version);
   /*$("#iPhoneversion").text(version);*/
   $("#appUpdateTime").text(updateTime);
   $("#appDownloadCode").attr("src", _qrcodeurl);
});

(function(){
	var path=location.pathname.split("/")[1];
	
	   var contexts = window.location.pathname.split("/");
	   var _context = "DAQ";
	   if (contexts.length > 0) 
	   {
		   _context = contexts[1];
	   }
	   var urlbase = window.location.origin + "/" + _context;
	   
	   var wl_search = window.location.search
	   var arg_name = "Android_APK";
	   if (wl_search && wl_search.split("=") && wl_search.split("=").length > 1) 
	   {
		   arg_name = wl_search.split("=")[1];
	   }
	   
	   
	   var bean = {"bean": {
		   "codevalue" : "App_download"
       }}
	   
	   /*app下载地址方法*/
	   $.ajax({
	       type: "POST",
	       contentType: "application/json",
	       dataType: "json",
	       url: urlbase + "/restservices/nsyqv6/app_getDownloadadds/query",
	       data: JSON.stringify(bean) ,
	       async: false,
	       success: function (data) {
	    	   if(data && data.data){
	    		   var _data = data.data
	    		   for (var k = 0; k < _data.length; k++) 
	    		   {
	    			   if ("androidUrl" == _data[k].codeid) {
	    				   _androidUrl = _data[k].codevalue && _data[k].codevalue.length > 2 ? _data[k].codevalue : _androidUrl
	    			   }
	    			   /*if ("qrcodeurl" == _data[k].codeid) {
	    				   _qrcodeurl = _data[k].codevalue && _data[k].codevalue.length > 2 ? _data[k].codevalue : _qrcodeurl
	    			   }
	    			   if ("iosPalistUrl" == _data[k].codeid) {
	    				   _iosPalistUrl = _data[k].codevalue && _data[k].codevalue.length > 2 ? _data[k].codevalue : _iosPalistUrl
	    			   }*/
	    			   if ("argname" == _data[k].codeid) {
	    				   arg_name = _data[k].codevalue && _data[k].codevalue.length > 2 ? _data[k].codevalue : arg_name
	    			   }
	    		   }
	    	   }
	       }
	   });
	   /*app下载地址版本更新*/
	   $.ajax({
	       type: "POST",
	       url: urlbase + "/restservices/nsyqv6/studiov2_app_searchLastVersion/query",
	       data:{"name": arg_name},
	       async: false,
	       success: function (data) {
	    	   if(data){
	    		   var resultss=data ?  JSON.parse(data) : {};
	    		   version = resultss.appversion ? resultss.appversion : "v1.0.0";
	    		   updateTime = resultss.updatetime && resultss.updatetime.length > 10 ? resultss.updatetime.substring(0,10) : "2020-02-20";
	    	       	_androidUrl = resultss.downloadurl ? urlbase + "/" + resultss.downloadurl : _androidUrl;
	    	   }
	       }
	   });
	   
})()

// 判断设备
function deviceCheck() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    var micromessenger = false;
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        micromessenger = true;
    }

    if (bIsIpad || bIsIphoneOs) {
        type = 1;
        $("#iphoneboxtips").show();
        $("#mobiledown").html("开始安装");
    }
    if (bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        type = 2;
        $("#mobiledown").html("点击下载");
    }
    if (micromessenger) {
        var html = "";
        html += "<div style='background: #000;opacity: 0.5;filter: Alpha(opacity=50);width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 1001;'>";
        html += "</div>";
        $("body").append(html);

        var tipBox = "";
        tipBox += "<div style='width:80%; padding:10px 0;z-index: 1002; position:absolute; top:0; left:10%; text-align:center; background:#fff; border-radius:0 0 5px 5px;opacity: 0.8;'>";
        tipBox += "<p style='color:#333; font-size:16px; line-height:30px;'>微信内无法下载，请点击<span style='color:#ff0000'>右上角</span>按钮<br />选择<span style='color:#ff0000'>在浏览器中打开</span>，即可正常下载</p>"
        tipBox += "</div>";
        $("body").append(tipBox);
        type = 3;
    } else if (type == 1 && (ua.indexOf('qq') > -1 && ua.indexOf('mqqbrowser') < 0)) {
        //ios qq内置浏览器中不可下载
        var html = "";
        html += "<div style='background: #000;opacity: 0.5;filter: Alpha(opacity=50);width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 1001;'>";
        html += "</div>";
        $("body").append(html);

        var tipBox = "";
        tipBox += "<div style='width:80%; padding:10px 0;z-index: 1002; position:absolute; top:0; left:10%; text-align:center; background:#fff; border-radius:0 0 5px 5px;opacity: 0.8;'>";
        tipBox += "<p style='color:#333; font-size:16px; line-height:30px;'>请点击<span style='color:#ff0000'>右上角</span>按钮<br />选择<span style='color:#ff0000'>在Safari浏览器中打开</span>，即可正常下载</p>"
        tipBox += "</div>";
        $("body").append(tipBox);
        type = 3;
    }
}

/*// ios网页端下载
function iPhone() {
	iphonebox(0);
	window.location.href = "itms-services://?action=download-manifest&url=" + _iosPalistUrl;
}*/

// Android网页端下载
function Android() {
    window.location.href = _androidUrl;
}

// 手机端下载
function mobileAppDownload() {
    if (type === 1) {
        // window.location.href = "itms-services://?action=download-manifest&url=" + _iosPalistUrl;
    	iphonebox(1)
        $("#mobiledown").hide();
        $("#loading").show();
        setTimeout(function () {
            $("#loading").hide();
            $("#iostips").show();
        }, 4000);
    } else if (type === 3) {
        alert("请在浏览器中打开");
    } else {
        window.location.href = _androidUrl;
    }
}

function iphonebox(arg) {
    if (arg == 0) {
        $("#iphonebox").hide();
    } else {
        $("#iphonebox").show();
    }
}
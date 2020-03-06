//android的下载地址，页面加载时自动查询
var _androidDownUrl = "";
//安卓查询地址
var _androidurl = "http://113.57.175.210:5880/LPOM/";
//版本查询接口
var _apiname = "restservices/StudioRest/studiov2_app_rest_searchLastVersion/query";
//下载二维码，当前H5的地址生成的
var _qrcodeurl = "./img/qrcode0211.png";
//苹果的Plist文件地址
var _iosPalistUrl = "https://code.aliyun.com/longrise/OAProject/raw/master/tplist";
//android升级资源名称
var arg_name = "IOSPMPhone";

var version = "1.0.0";
var updateTime = "2020-02-08";

var type = null;

$(function () {
   deviceCheck();
   $("#Androidversion").text(version + "（new）");
   $("#iPhoneversion").text(version);
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
	   var wl_search = window.location.search
	   if (wl_search && wl_search.split("=") && wl_search.split("=").length > 1) 
	   {
		   arg_name = wl_search.split("=")[1];
	   }
	   
	  
	   //查询Android的最新版本地址
	   $.ajax({
	       type: "POST",
	       url: _androidurl + _apiname,
	       data:{"name": arg_name},
	       async: false,
	       success: function (data) {
	    	   if(data){
	    		   var resultss=data ?  JSON.parse(data) : {};
	    		   version = resultss.appversion ? resultss.appversion : "v1.0.0";
	    		   updateTime = resultss.updatetime && resultss.updatetime.length > 10 ? resultss.updatetime.substring(0,10) : "2020-02-12";
	    	       	_androidUrl = resultss.downloadurl ? _androidurl + "/" + resultss.downloadurl : _androidUrl;
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

//开始下载
function mobileAppDownload() {
	//隐藏通用提示框
	noticebox(0)
    if (type === 1) {
		window.location.href = "itms-services://?action=download-manifest&url=" + _iosPalistUrl;
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

//点击下载按钮提示框
function noticebox(arg)
{
	if (arg == 0) {
	    $("#noticebox").hide();
	} else {
	    $("#noticebox").show();
	}
}

//不信任处理方案提示框
function iphonebox(arg) {
    if (arg == 0) {
        $("#iphonebox").hide();
    } else {
        $("#iphonebox").show();
    }
}
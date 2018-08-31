
document.write('<link rel="stylesheet" type="text/css" href="../resource/stats/css/lib.css">');
document.write('<link rel="stylesheet" type="text/css" href="../resource/stats/css/analysis.css">');
document.write('<link rel="stylesheet" type="text/css" href="../resource/stats/font/iconfont.css">');
document.write('<script src="../resource/stats/scripts/analysisScript.js?a=20180509"></script>');
document.write('<script src="../resource/stats/echarts-3.7.2/echarts.min.js"></script>');
document.write('<script type="text/javascript" src="../resource/stats/datePicker-4.8/WdatePicker.js" charset="gb2312"></script>');
document.write('<script src="../resource/stats/scripts/statsCommon.js?a=20180509"></script>');
document.write('<script src="../resource/stats/scripts/statsCommonUtill.js?a=20180509"></script>');
var courseId = "";
var siteCode = "";
var token="";
$(function () {
    token = StatsCommon.getAccessToken();

    var url = window.location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");

        for (var i = 0; i < strs.length; i++) {
            if(strs[i].split("=")[0] =='courseId'){
                courseId = strs[i].split("=")[1];
            }
            // if(strs[i].split("=")[0] =='access_token'){
            //     token =strs[i].split("=")[1];
            // }
        }
    }
});

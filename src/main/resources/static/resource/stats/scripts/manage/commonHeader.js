document.write('<title>学历数据分析</title>');
document.write('<link rel="stylesheet" type="text/css" href="../../resource/stats/css/lib.css">');
document.write('<link rel="stylesheet" type="text/css" href="../../resource/stats/css/analysis.css">');
document.write('<link rel="stylesheet" type="text/css" href="../../resource/stats/font/iconfont.css">');
document.write('<script src="../../resource/stats/scripts/analysisScript.js?a=20180509"></script>');
document.write('<script src="../../resource/stats/echarts-3.8.5/echarts.min.js"></script>');
document.write('<script type="text/javascript" src="../../resource/stats/datePicker-4.8/WdatePicker.js" charset="gb2312"></script>');
document.write('<script src="../../resource/stats/scripts/statsCommon.js"></script>');
var siteCode = "";
var token = "";
$(function () {
    token = StatsCommon.getAccessToken();
});

var url = window.location.search;
if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    var hasToken = false;
    var courseId = "";
    for (var i = 0; i < strs.length; i++) {
        if(strs[i].split("=")[0] =='courseId'){
            courseId = strs[i].split("=")[1];
        }
        if(strs[i].split("=")[0] =='access_token'){
            var _token = strs[i].split("=")[1];
            if(!StatsCommon.isNull(_token)){
                StatsCommon.setCookie("access_token",_token,60*60*12,"/","webtrn.cn");
                hasToken = true;
            }

        }
    }
    if(hasToken){
        window.location.href = window.location.pathname + (courseId != "" ? ("?courseId=" + courseId) : "");
    }
}
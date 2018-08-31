
function getData(index) {
    var id = "anTab-con-"+index;
    $("#"+id).find("[class$='-cur']").removeClass();
    var addCurClass=$("#"+id).find("[class$='-first'] a");
    for(var i = 0 ;i<addCurClass.length;i++ ){
        var ids=addCurClass[i].id;
        $(addCurClass[i]).click();
    }

    if (index == '1') {

        $("#idx_content_frame").attr("src","active_info.html?courseId="+courseId);

    } else if (index == '2') {

        $("#idx_content_frame").attr("src","compTrajectory_info.html?courseId="+courseId);

    } else if (index == '3') {

        $("#idx_content_frame").attr("src","completeStatus_info.html?courseId="+courseId);

    } else if (index == '41') {

        $("#idx_content_frame").attr("src","video_info.html?courseId="+courseId);

    } else if (index == '42') {

        $("#idx_content_frame").attr("src","text_info.html?courseId="+courseId);

    } else if (index == '43') {

        $("#idx_content_frame").attr("src","courseware_info.html?courseId="+courseId);

    } else if (index == '44') {

        $("#idx_content_frame").attr("src","homework_info.html?courseId="+courseId);

    } else if (index == '45') {

        $("#idx_content_frame").attr("src","test_info.html?courseId="+courseId);

    } else if (index == '46') {

        $("#idx_content_frame").attr("src","doc_info.html?courseId="+courseId);

    }else if (index == '47') {

        $("#idx_content_frame").attr("src","forum_info.html?courseId="+courseId);

    } else if (index == '48') {

        $("#idx_content_frame").attr("src","answer_info.html?courseId="+courseId);

    }  else if (index == '49') {

        $("#idx_content_frame").attr("src","note_info.html?courseId="+courseId);

    } else if (index == '5') {
        //是否加载空页面
        isNullPage('',index);

    } else if (index == '6') {

        $("#idx_content_frame").attr("src","terminal_info.html?courseId="+courseId);

    }
}

function isNullPage(resourceType,index){

    if (index == 48 || index == 49) {
        $("[id^='anTab-con-']").hide();
        $("[id^='processTab-con-']").hide();
        if (index > 40 && index < 50) {
            var ids = index.charAt(1);
            id = "#processTab-con-" + ids;
            $("#anTab-con-4").show();
        } else {
            id = "#anTab-con-" + index;
        }
        $(id).show();
        return;
    }

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : resourceType
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            var id;
            if(flag ){
                $("[id^='anTab-con-']").hide();
                $("[id^='processTab-con-']").hide();
                if(index>40 && index <50){
                    var ids = index.charAt(1);
                    id = "#processTab-con-"+ids;
                    $("#anTab-con-4").show();
                }else{
                    id = "#anTab-con-"+index;
                }
                $(id).show();
            }else{
                $("[id^='anTab-con-']").hide();
                $("[id^='processTab-con-']").hide();
                $("#anTab-con-noData").show();
            }
        }

    },token);

}


function getResourceType(){

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/compResouceType', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId
        }
    }), function (data) {
        if (data != null && data.data != null && data.data.length > 0) {
            var items = data.data;

            for(var i=0;i<items.length;i++){
                var type = items[i];
                if(type == StatsCommon.RESOURCETYPE.VIDEO){
                    $("#videoMenuId").show();
                }else if(type == StatsCommon.RESOURCETYPE.TEXT){
                    $("#textMenuId").show();
                }else if(type == StatsCommon.RESOURCETYPE.COURSEWARE){
                    $("#coursewareMenuId").show();
                }else if(type == StatsCommon.RESOURCETYPE.HOMEWORK){
                    $("#homeworkMenuId").show();
                }else if(type == StatsCommon.RESOURCETYPE.TEST){
                    $("#testMenuId").show();
                }else if(type == StatsCommon.RESOURCETYPE.TOPIC){
                    $("#topicMenuId").show();
                }else if(type == StatsCommon.RESOURCETYPE.DOC){
                    $("#docMenuId").show();
                }
            }

        }

    },token);

}
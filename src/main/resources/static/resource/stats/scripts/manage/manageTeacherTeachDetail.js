/**
 * 管理端教师详情
 */

$(function () {


    // getTeacherCourseList();

    initCourseCombobox();

});



function getTeacherCourseList(){

    var params={};
    params.siteCode = siteCode;
    params.loginId = loginId;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() +'/manage/teacher/course',JSON.stringify(paramsData), function (data) {

        $("#teacher_detail_head").empty();
        $("#teacher_detail_body").empty();
        if (data != null && data.data != null) {
            var items = data.data;
            var trueName="";
            for(var i=0;i<items.length;i++){
                var str="";
                var options="";
                options+='<option value="'+items[i].courseId+'" ';
                str+='<li class="ghostTab-tab">';
                str+='<a href="javascrcipt:;" id="course_'+items[i].courseId+'" name="tab_course" ';
                if(items[i].courseId == courseId){
                    str+=' class="ghostTab-cur" ';
                    options+=' selected="selected" ';
                    getTeacherCourseDetail(courseId);
                }
                options+='>';
                str+='>';
                str+=(StatsCommon.cutStr(items[i].courseName,10));
                options+=items[i].courseName;
                options+="("+items[i].code +")";
                str+='</a>';
                str+='</li>';
                options+='</option>';
                $("#teacher_detail_head").append(str);
                $("#teacher_detail_course_list").append(options);
                trueName = items[i].trueName;
            }
            setTab('ghostTab');
            $("#teacher_detail_record").text(trueName+"的授课记录");
            isOutMaxLength('ghostTab');
        }


    },token);
}

// 选项卡切换
function setTab( className){ // 这里的className指样式名相同的部分
    var $tabName = $('.' + className); // 选项卡ID
    var tabname = className; // 样式名相同部分
    var $tabNav = $tabName.find('.' + tabname + '-' + 'tab'); // 选项卡切换按钮
    var tabCurClass = tabname + '-' + 'cur'; // 切换按钮激活状态样式


    $tabNav.each(function(index){ // 遍历切换按钮
        $(this).click(function(){ // 点击时
            var id=$(this).find('a')[0].id;
            $tabNav.find('a').removeClass(tabCurClass); // 清除其它按钮上激活状态样式
            $(this).find('a').addClass(tabCurClass); // 给当前看按钮添加激活状态样式
            if(!StatsCommon.isNull(id)){
                id=id.replace("course_","");
                getTeacherCourseDetail(id);
            }
        });
    });
}

function isOutMaxLength(className){
    var $tabName = $('.' + className); // 选项卡ID
    var tabname = className; // 样式名相同部分
    var $tabNav = $tabName.find('.' + tabname + '-' + 'tab'); // 选项卡切换按钮
    var tabWidth=0;
    $tabNav.each(function(index){ // 遍历切换按钮
        tabWidth+=$tabNav[index].offsetWidth+20;
    });
    var menuWitdh=$("#teacher_detail_head")[0].offsetWidth;
    if(tabWidth>menuWitdh){
        $("#teacher_detail_head").hide();
        $("#teacher_detail_list").show();

        return true;
    }else{
        $("#teacher_detail_head").show();
        $("#teacher_detail_list").hide();
        return false;
    }
}

function getTeacherCourseDetail(c){
    var params={};
    params.siteCode = siteCode;
    params.courseId = c;
    params.loginId = loginId;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() +'/manage/teacher/detail',JSON.stringify(paramsData), function (data) {

        $("#teacher_detail_body").empty();
        if (data != null && data.data != null) {
            var items = data.data;
            for(var i=0;i<items.length;i++){
                var resource = items[i];
                var str="";
                str+='<div class="recordWrap clearfix" style="min-height: 80px;">';
                str+='  <div class="record_flow">';
                str+='     <span class="record_flow_num">'+(items.length-i)+'</span>';
                str+='     <span class="record_flow_link"></span>';
                str+='  </div>';
                str+='  <div class="record_date">';
                str+='     <span class="record_date_txt">'+StatsCommon.formatDate(new Date(resource.recordDate),'yyyy年MM月dd日')+'</span>';
                str+='  </div>';
                str+='  <div class="record_con">';

                if(!StatsCommon.isNull(resource.learnTime) && resource.learnTime>0){
                    str+='     <div class="record_con_row">';
                    str+='        <div class="record_subtit">教学时长</div>';
                    str+='        <div class="record_sub"><span class="com_color">'+(StatsCommon.changeLearnTimeHours(resource.learnTime,"分钟"))+'</span></div>';
                    str+='     </div>';
                }

                if(!StatsCommon.isNull(resource.homeworkCheckNum) && resource.homeworkCheckNum>0){
                    str+='     <div class="record_con_row">';
                    str+='        <div class="record_subtit">批改作业</div>';
                    str+='        <div class="record_sub"><span class="com_color">'+resource.homeworkCheckNum+'</span>份</div>';
                    str+='     </div>';
                }

                if(!StatsCommon.isNull(resource.topicReplyNum ) && resource.topicReplyNum>0){
                    str+='     <div class="record_con_row">';
                    str+='        <div class="record_subtit">帖子回复</div>';
                    str+='        <div class="record_sub"><span class="com_color">'+resource.topicReplyNum+'</span>个</div>';
                    str+='     </div>';
                }

                if(!StatsCommon.isNull(resource.topicGoodNum) && resource.topicGoodNum>0){
                    str+='     <div class="record_con_row">';
                    str+='        <div class="record_subtit">设置精华</div>';
                    str+='        <div class="record_sub"><span class="com_color">'+resource.topicGoodNum+'</span>个</div>';
                    str+='     </div>';
                }

                if(!StatsCommon.isNull(resource.topicBadNum) && resource.topicBadNum>0){
                    str+='     <div class="record_con_row">';
                    str+='        <div class="record_subtit">设置灌水</div>';
                    str+='        <div class="record_sub"><span class="com_color">'+resource.topicBadNum+'</span>个</div>';
                    str+='     </div>';
                }

                if(!StatsCommon.isNull(resource.topicTopNum) && resource.topicTopNum>0){
                    str+='     <div class="record_con_row">';
                    str+='        <div class="record_subtit">设置置顶</div>';
                    str+='        <div class="record_sub"><span class="com_color">'+resource.topicTopNum+'</span>个</div>';
                    str+='     </div>';
                }

                if(!StatsCommon.isNull(resource.noteRecommendNum) && resource.noteRecommendNum>0){
                    str+='     <div class="record_con_row">';
                    str+='        <div class="record_subtit">推荐笔记</div>';
                    str+='        <div class="record_sub"><span class="com_color">'+resource.noteRecommendNum+'</span>个</div>';
                    str+='     </div>';
                }

                if(!StatsCommon.isNull(resource.answerNum) && resource.answerNum>0){
                    str+='     <div class="record_con_row">';
                    str+='        <div class="record_subtit">回复答疑</div>';
                    str+='        <div class="record_sub"><span class="com_color">'+resource.answerNum+'</span>个</div>';
                    str+='     </div>';
                }

                if(!StatsCommon.isNull(resource.questionRecommendNum) && resource.questionRecommendNum>0){
                    str+='     <div class="record_con_row">';
                    str+='        <div class="record_subtit">推荐提问</div>';
                    str+='        <div class="record_sub"><span class="com_color">'+resource.questionRecommendNum+'</span>个</div>';
                    str+='     </div>';
                }



                str+='  </div>';
                str+='</div>';
                $("#teacher_detail_body").append(str);
            }
        }


    },token);

}

function initCourseCombobox() {

    var params={};
    params.siteCode = siteCode;
    params.loginId = loginId;
    var paramsData={};
    paramsData.params=params;

    $("#teacher_detail_course_list").combobox({
        url: StatsCommon.getPlatformPath() +'/manage/teacher/course?access_token='+token+'&siteCode='+siteCode+'&loginId='+loginId ,
        valueField: 'courseId',
        textField: 'courseName',
        width: 259,
        height: 30,
        listHeight:20,
        panelHeight:0,
        formatter: function(row) {
            var tempName =StatsCommon.cutStr(row.courseName,25);
            return (tempName+'<br>('+row.code+')');
        },
        onSelect: function(newValue) {
            courseId = newValue.courseId;
            getTeacherCourseDetail(newValue.courseId);
        },
        onLoadSuccess:function(data){

            $("#teacher_detail_head").empty();
            $("#teacher_detail_body").empty();
            if (data != null && data.data != null) {
                var items = data.data;
                var trueName="";
                var values=[];
                for(var i=0;i<items.length;i++){
                    values.push(data.data[i]);
                    var str="";
                    str+='<li class="ghostTab-tab">';
                    str+='<a href="javascrcipt:;" id="course_'+items[i].courseId+'" name="tab_course" title="'+(items[i].courseName+'('+items[i].code+')')+'" ';
                    if(items[i].courseId == courseId){
                        str+=' class="ghostTab-cur" ';
                    }
                    str+='>';
                    str+=(StatsCommon.cutStr(items[i].courseName,10));
                    str+='</a>';
                    str+='</li>';
                    $("#teacher_detail_head").append(str);
                    trueName = items[i].trueName;
                }

                setTab('ghostTab');
                $("#teacher_detail_record").text(trueName+"的授课记录");
                if(isOutMaxLength('ghostTab')){
                    $('#teacher_detail_course_list').combobox('loadData', values);
                    $('#teacher_detail_course_list').combobox('select', courseId);
                }else{
                    getTeacherCourseDetail(courseId);
                }
            }

        }
    });



}





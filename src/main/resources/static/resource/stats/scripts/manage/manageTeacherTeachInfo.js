/**
 * 管理端授课分析
 */

$(function () {

    $("#teacherTeachSearchDataId").val("");
    getTeacherTeachAnalysis();


    var sort="";
    var order="";

    $("#teacherTeachSearchId").on('click',function(){


        var condition =$("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,condition)
    });

    $("#teacherTeachDate").on('click',function () {
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            var condition =$("#teacherTeachSearchDataId").val();
            getTeacherTeachAnalysis(1,10,curDate, condition);
        },true,function(){
            $("#teacherTeachDate").text("全部");
            var condition =$("#teacherTeachSearchDataId").val();
            getTeacherTeachAnalysis(1,10,"", condition);
        });
    });

    //参与度总积分
    $("[name='teacher_info_teacherScore']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'teacherScore';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //作业批改量
    $("[name='teacher_info_homeworkCheckNum']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'homeworkCheckNum';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //帖子回复数
    $("[name='teacher_info_topicReplyNum']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'topicReplyNum';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //设置精华帖量
    $("[name='teacher_info_topicGoodNum']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'topicGoodNum';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //设置灌水帖量
    $("[name='teacher_info_topicBadNum']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'topicBadNum';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //置顶帖量
    $("[name='teacher_info_topicTopNum']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'topicTopNum';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //笔记推荐数
    $("[name='teacher_info_noteRecommendNum']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'noteRecommendNum';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //答疑回复数
    $("[name='teacher_info_answerNum']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'answerNum';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //答疑推荐数
    $("[name='teacher_info_questionRecommendNum']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'questionRecommendNum';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //授课时长
    $("[name='teacher_info_learnTime']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'learnTime';
        var data = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        getTeacherTeachAnalysis(1,10,dateStr,data,sort, order);
    });
    //排序end


    //导出
    $("#teacher_info_export").on('click',function () {
        var search = $("#teacherTeachSearchDataId").val();
        var dateStr = $("#teacherTeachDate").text();
        if(StatsCommon.isNull(dateStr) || dateStr=='全部'){
            dateStr = "";
        }

        StatsCommon.location(StatsCommon.getPlatformPath() + '/manage/teacher/export',{
            siteCode : siteCode,
            condition : search,
            sort : sort,
            order : order,
            date : dateStr,
            exportColumn : ""//扩展字段
        },token);
    });


    //教师参与度-图
    getTeacherPart(echarts);



});

function getTeacherPart(ec){
    $("#manageTeacherPartId").width('100%');
    $("#manageTeacherPartId").height('400px');


    var myTeacherPartChart = ec.init($("#manageTeacherPartId")[0]);
    var period = StatsCommon.PERIOD.WEEK;
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#teacherPartWeekId").val(selectDate);
    $("#teacherPartWeekId").html(week.MON + '-' + week.SUN);

    //周
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = StatsCommon.PERIOD.WEEK;
        var dateStr = $("#teacherPartWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        reqTeacherPart(myTeacherPartChart, selectDate, period);
    });
    //月
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = StatsCommon.PERIOD.MONTH;
        var dateStr = $("#teacherPartMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date() - 24 * 60 * 60 * 1000), 'yyyy-MM');
            $("#teacherPartMonthId").text(dateStr);
        }
        selectDate = dateStr;
        reqTeacherPart(myTeacherPartChart, selectDate, period);
    });
    //年
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = StatsCommon.PERIOD.YEAR;
        var dateStr = $("#teacherPartYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date() - 24 * 60 * 60 * 1000), 'yyyy');
            $("#teacherPartYearId").text(dateStr);
        }
        selectDate = dateStr;
        reqTeacherPart(myTeacherPartChart, selectDate, period);
    });

    //周日期控件
    $("#teacherPartWeekId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqTeacherPart(myTeacherPartChart, selectDate, period);
        },$(this).val());
    });
    //月日期控件
    $("#teacherPartMonthId").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqTeacherPart(myTeacherPartChart, selectDate, period);
        });
    });
    //年日期控件
    $("#teacherPartYearId").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqTeacherPart(myTeacherPartChart, selectDate, period);
        });
    });

    reqTeacherPart(myTeacherPartChart, selectDate, period);

}

function reqTeacherPart(myChart, date, period) {

    var params = {};
    params.siteCode = siteCode;
    params.period = period;
    params.date = date;
    var paramsData = {};
    paramsData.params = params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/manage/teacher/teacherPart',
        JSON.stringify(paramsData), function (data) {

            myChart.hideLoading();

            var val = [];
            var teacherPartVal = [];
            var homeworkVal = [];
            var topicVal = [];
            var noteVal = [];
            var answerVal = [];
            var teachingVal = [];
            var legendName = ['教师参与总积分','批改作业总积分','处理帖子总积分','推荐笔记总积分','答疑总积分','教学时长总积分'];
            var colorArray = ['#c59788', '#b18c57', '#bdafab', '#a6c2b5', '#8aa192', '#7d9fa4'];
            var yAxis = {
                title: '积分(分)',
                name: ''
            };
            var xAxis = {
                data: StatsCommon.Default_category(period, date),
                title: '时间'
            };

            if (data != null && data.data != null && data.data.length > 0) {
                var items = data.data;

                for (var i = 0; i < items.length; i++) {
                    teacherPartVal.push(items[i].teacherPart);
                    homeworkVal.push(items[i].homework);
                    topicVal.push(items[i].topic);
                    noteVal.push(items[i].answer);
                    answerVal.push(items[i].note);
                    teachingVal.push(items[i].teachingTime);
                }
                val=[teacherPartVal,homeworkVal,topicVal,noteVal,answerVal,teachingVal];
                StatsCommon.setEchartsLine(myChart, legendName, yAxis, xAxis, val, colorArray);
            }
            $(".gridTabLMA-tab a").removeClass("click-disable");
        }, token);
}

function getTeacherTeachAnalysis(curPage ,pageSize,dateStr,condition,sort,order){

    $("#manage_teacher_table_load").hide();
    $("#manage_teacher_table_data").show();

    if(StatsCommon.isNull(curPage)){
        curPage = 1;
    }
    if(StatsCommon.isNull(pageSize)){
        pageSize = 10;
    }

    if(StatsCommon.isNull(dateStr) || dateStr=='全部'){
        dateStr = "";
    }

    if(StatsCommon.isNull(condition)){
        condition = "";
    }

    var params={};
    params.siteCode = siteCode;
    params.date = dateStr;
    params.condition = condition;
    params.sort = sort;
    params.order = order;
    params.curPage = curPage;
    params.pageSize = pageSize;
    var paramsData={};
    paramsData.params=params;
    $("#manage_teacher_page").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath() +'/manage/teacher/analysis?access_token='+token,
        pagerData: JSON.stringify(paramsData),
        isOpenShowPagerBarForOnePage: false,
        curPageNum: curPage,
        pageSizeNum: pageSize,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        curPageMapperKey: 'curPage',	//设置后台参数映射
        pageSizeMapperKey: 'pageSize',
        pageSizeArr: [10, 20, 30, 50, 100],
        isShowPageSizeSelectToolBar: false,
        isShowTotalPageToolBar: false,
        parsePageData: function (resultData) {	// 解析数据成分页插件支持的数据格式
            var pageData = $.extend(resultData.data, {'totalRow': resultData.data.totalCount});	// 因为后台page.java类中总记录数属性为totalCount，插件中使用的是totalRow，故做个转换
            return pageData;
        },
        pagerCallHandel: function (data, pagerParam) {	//pageData:分页对象json数据
            $("#manageTeacherDetail").empty();
            if (data != null && data.data != null && data.data.items != null) {
                var items = data.data.items;
                if(items.length>0){
                    for(var i=0;i<items.length;i++){
                        var str ='';
                        var resource =items[i];
                        if(StatsCommon.isNull(resource.loginId)){
                            resource.loginId="&nbsp;"
                        }
                        if(StatsCommon.isNull(resource.trueName)){
                            resource.trueName="&nbsp;"
                        }
                        if(StatsCommon.isNull(resource.courseName)){
                            resource.courseName="&nbsp;"
                        }
                        if(StatsCommon.isNull(resource.code)){
                            resource.code="&nbsp;"
                        }
                        str+='<li class="tablTab-tab" >';
                        str+='  <div class="resdisTabl ';
                        if(i%2  == 0){
                            str+=' tablTab-cur';
                        }
                        str+='   tableTab">';
                        str+='      <ul class="clearfix">';
                        str+='<li class="resdisTabl-col resdisTabl-col-10 " name="checkLine" title="'+resource.loginId+'"><a href="javaScript:getDetail(\''+resource.loginId+'\',\''+resource.courseId+'\')" >' + (StatsCommon.cutStr(resource.loginId,10)) + '</a></li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine" title="'+resource.trueName+'">' +  (StatsCommon.cutStr(resource.trueName,5))+ '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-13  " name="checkLine" title="'+resource.courseName+'">' +(StatsCommon.cutStr(resource.courseName,8))  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-13  " name="checkLine" title="'+resource.code+'">' + (StatsCommon.cutStr(resource.code,6))  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.teacherScore + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.homeworkCheckNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.topicReplyNum  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.topicGoodNum  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.topicBadNum  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.topicTopNum  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine" >' + resource.noteRecommendNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine" >' + resource.answerNum  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine" >' + resource.questionRecommendNum  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_5_none  " name="checkLine" >' + StatsCommon.changeLearnTimeHours(resource.learnTime,"分钟",".")  + '</li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#manageTeacherDetail").append(str);
                    }

                }else{

                    var str ='';
                    str+='<li class="tablTab-tab" >';
                    str+='  <div class="resdisTabl tablTab-cur tableTab">';
                    str+='      <ul class="clearfix">';
                    str+='<li class="resdisTabl-col resdisTabl-col-99_none " name="checkLine" >暂无数据</li>';
                    str+='      </ul>';
                    str+='  </div>';
                    str+='</li>';
                    $("#manageTeacherDetail").append(str);
                }
                $("#manage_teacher_table_data").show();
                $("#manage_teacher_table_load").hide();

            }

        }
    },token);

}


function getDetail(loginId,courseId){
    $('#content_frame', window.parent.document).attr("src","manage_teacher_teach_detail.html?loginId="+loginId  + "&courseId="+courseId );
}




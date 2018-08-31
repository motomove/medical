/**
 * 管理端自测每日提交量和平均分
 * @param ec
 */

$(function () {

    //查询是否存在主题讨论类型
    var params={};
    params.siteCode = siteCode;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/resourceType',JSON.stringify(paramsData), function (data) {
        var flag = false;
        if (data != null && data.data != null) {
            var items = data.data;
            for (var i = 0; i < items.length; i++) {
                var resourceType = items[i];
                if(StatsCommon.RESOURCETYPE.HOMEWORK==resourceType){

                    $("#anTab-con-noData").hide();
                    $("#anTab-con-1").show();

                    //作业每日提交量，批改量和累计待批改量
                    getManageHomeworkSubmitAndCheckNum(echarts);
                    //作业每日驳回量
                    getManageHomeworkCommentNum(echarts);
                    //作业详情表
                    getManageHomeworkAnalysis();

                    flag = true;

                }
            }

        }
        if(!flag){
            $("#anTab-con-noData").find('.empyt-txt').text('暂无数据');
        }

    },token);


    var sort="";
    var order="";

    //搜索
    $("#homework_search_id").click(function(){
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data);
    });

    //提交量
    $("[name='homework_submitNum']").unbind("click").click(function(){
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
        sort = 'submitNum';
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data, sort, order);
    });
    //批改量
    $("[name='homework_checkNum']").unbind("click").click(function(){
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
        sort = 'checkNum';
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data, sort, order);
    });
    //驳回量
    $("[name='homework_rejectNum']").unbind("click").click(function(){
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
        sort = 'rejectNum';
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data, sort, order);
    });
    //平均分
    $("[name='homework_avgScore']").unbind("click").click(function(){
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
        sort = 'score';
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data, sort, order);
    });
    //0-20分人数比例
    $("[name='homework_point0']").unbind("click").click(function(){
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
        sort = 'point0';
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data, sort, order);
    });
    //20-40分人数比例
    $("[name='homework_point1']").unbind("click").click(function(){
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
        sort = 'point1';
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data, sort, order);
    });
    //40-60分人数比例
    $("[name='homework_point2']").unbind("click").click(function(){
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
        sort = 'point2';
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data, sort, order);
    });
    //60-80分人数比例
    $("[name='homework_point3']").unbind("click").click(function(){
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
        sort = 'point3';
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data, sort, order);
    });
    //80-100分人数比例
    $("[name='homework_point4']").unbind("click").click(function(){
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
        sort = 'point4';
        var data = $("#homework_search_data_id").val();
        getManageHomeworkAnalysis(1,10,data, sort, order);
    });
    //排序end


    //导出
    $("#homework_export").on('click',function () {
        var search = $("#homework_search_data_id").val();

        StatsCommon.location(StatsCommon.getPlatformPath() + '/statistics/manage/homework/export',{
            siteCode : siteCode,
            condition : search,
            sort : sort,
            order : order,
            exportColumn : ""//扩展字段
        },token);
    });




});

function getManageHomeworkSubmitAndCheckNum(ec) {
    $("#manageHomeworkSubmit").width('100%');
    $("#manageHomeworkSubmit").height('304px');
    var manageTestCharts = ec.init($("#manageHomeworkSubmit")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/manage/homework/submitAndCheckByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForHomework(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' ,'check');

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForHomework(manageTestCharts, url, $("#gridTabLMA_month_select_week").val(), 'week','check');
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsForHomework(manageTestCharts, url, curDate, 'week','check');
        }, $("#gridTabLMA_month_select_week").val());

    });
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForHomework(manageTestCharts, url, $("#gridTabLMA_month_select_month").text(), 'month','check');
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsForHomework(manageTestCharts, url, curDate, 'month','check');
        });
    });
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForHomework(manageTestCharts, url, $("#gridTabLMA_month_select_year").text(), 'year','check');
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsForHomework(manageTestCharts, url, curDate, 'year','check');
        });

    });


}

function getManageHomeworkCommentNum(ec) {
    $("#manageHomeworkComment").width('100%');
    $("#manageHomeworkComment").height('304px');
    var manageTestCharts = ec.init($("#manageHomeworkComment")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/manage/homework/commentByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabD_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabD_month_select_year").text(date.getFullYear());
    $("#gridTabD_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabD_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForHomework(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' ,'comment');

    //年、月、周按钮
    $("#gridTabD1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForHomework(manageTestCharts, url, $("#gridTabD_month_select_week").val(), 'week','comment');
    });
    $("#gridTabD_month_select_week").unbind("click").click(function () {
        if($(".gridTabD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsForHomework(manageTestCharts, url, curDate, 'week','comment');
        }, $("#gridTabD_month_select_week").val());

    });
    $("#gridTabD2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForHomework(manageTestCharts, url, $("#gridTabD_month_select_month").text(), 'month','comment');
    });
    $("#gridTabD_month_select_month").unbind("click").click(function () {
        if($(".gridTabD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsForHomework(manageTestCharts, url, curDate, 'month','comment');
        });
    });
    $("#gridTabD3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForHomework(manageTestCharts, url, $("#gridTabD_month_select_year").text(), 'year','comment');
    });
    $("#gridTabD_month_select_year").unbind("click").click(function () {
        if($(".gridTabD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsForHomework(manageTestCharts, url, curDate, 'year','comment');
        });

    });


}

/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 * @param type
 */
function reqEchatsForHomework(myChart, url, date, period, type) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.siteCode = siteCode;
    params.date = date;
    params.period = period;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(url,JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();
        var category = [];
        var val = [];
        var tempVal = [];
        var legendName = [];
        var colorArray = ['#73bdf4', '#86cb83', '#e2b772'];
        if (data != null && data.data != null) {
            legendName=['提交量', '批改量', '待批改量'];
            var tooltips = [];
            var yName = [];
            var tempVal2 = [];
            var tempVal3 = [];
            var items = data.data;
            if(type == 'check'){

                for (var i = 0; i < items.length; i++) {
                    tempVal.push(items[i].submitNum);
                    tempVal2.push(items[i].checkNum);
                    tempVal3.push(items[i].totalSubmitNum);
                    // category.push(items[i].recordDate);
                    if (i == items.length - 1) {
                        val.push(tempVal);
                        val.push(tempVal2);
                        val.push(tempVal3);
                        yName.push('份');
                        tooltips.push({name: '提交量', isUseX: true});
                        tooltips.push({name: '批改量', isUseX: true});
                        tooltips.push({name: '待批改量', isUseX: true});
                    }
                }
                category=StatsCommon.Default_category(period, date);
                StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, 1, colorArray,'','hide',['作业数量(份)'],'时间');

            }else{

                var yAxis = {
                    title: '',
                    name: ''
                };
                var xAxis = {
                    data: [],
                    title: ''
                };
                for (var i = 0; i < items.length; i++) {
                    tempVal.push(items[i].commentNum);
                }
                xAxis.data=StatsCommon.Default_category(period, date);
                val.push(tempVal);
                yAxis.title = '互评数量';
                xAxis.title = '时间';
                yAxis.name = '份';
                category[0]='数量';
                colorArray.push("#73bdf4");

                StatsCommon.setEchartsBar(myChart, category, yAxis, xAxis, val, colorArray);
            }

        }

        if(type == 'check'){
            $(".gridTabLMA-tab a").removeClass("click-disable");
        }else{
            $(".gridTabD-tab a").removeClass("click-disable");
        }
    },token);
}


/**
 * 作业分析表
 * @param ec
 */
function getManageHomeworkAnalysis( curPage,pageSize,search,sort,order) {

    $("#manage_homework_table_data").hide();
    $("#manage_homework_table_load").show();



    if (curPage == "" || curPage == undefined || curPage == null) {
        curPage = 1;
    }
    if (pageSize == "" || pageSize == undefined || pageSize == null) {
        pageSize = 10;
    }
    var params={};
    params.siteCode = siteCode;
    params.curPage = curPage;
    params.pageSize = pageSize;
    params.condition = search;
    params.sort = sort;
    params.order = order;
    var paramsData={};
    paramsData.params=params;
    $("#manage_homework_page").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath() +'/statistics/manage/homework/analysis?access_token='+token,
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
            $("#managehomeworkDetail").empty();

            if (data != null && data.data != null && data.data.items != null) {
                var items = data.data.items;
                if(items.length>0){
                    for(var i=0;i<items.length;i++){
                        var str ='';
                        var resource =items[i];
                        if(StatsCommon.isNull(resource.resourceName)){
                            resource.resourceName="&nbsp;"
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
                        str+='<li class="resdisTabl-col resdisTabl-col-14 " name="checkLine" title="'+resource.resourceName+'">' + (StatsCommon.cutStr(resource.resourceName,8)) + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-14  " name="checkLine" title="'+resource.courseName+'">' +  (StatsCommon.cutStr(resource.courseName,8))+ '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-14  " name="checkLine" title="'+resource.code+'">' +(StatsCommon.cutStr(resource.code,6))  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.submitNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.checkNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.rejectNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.score  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.point0  + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.point1  + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.point2  + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.point3  + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-7_8_none  " name="checkLine">' + resource.point4  + '%</li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#managehomeworkDetail").append(str);
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
                    $("#managehomeworkDetail").append(str);
                }

                $("#manage_homework_table_data").show();
                $("#manage_homework_table_load").hide();

            }

        }
    },token);









}

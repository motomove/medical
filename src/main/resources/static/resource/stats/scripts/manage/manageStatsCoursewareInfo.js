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
                if(StatsCommon.RESOURCETYPE.COURSEWARE==resourceType){

                    $("#anTab-con-noData").hide();
                    $("#anTab-con-1").show();

                    //课件学习人数、点击量与学习时长
                    getManageCoursewareLearnNum(echarts);

                    //近一周点击量排名前10的课件学习情况
                    getManageCoursewareNearTopTen(echarts, 1);

                    //视频统计情况
                    getManageCoursewareAnalysis();

                    flag = true;

                }
            }

        }
        if(!flag){
            $("#anTab-con-noData").find('.empyt-txt').text('暂无数据');
        }

    },token);




    $("#anTab1").on('click',function(){
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#anTab1").removeClass("anTab-cur");
        $("#anTab2").removeClass("anTab-cur");
        $("#anTab1").addClass("anTab-cur");
        $("#anTab2").addClass("click-disable");

        getManageCoursewareNearTopTen(echarts,1);
    });

    $("#anTab2").on('click',function(){
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#anTab1").removeClass("anTab-cur");
        $("#anTab2").removeClass("anTab-cur");
        $("#anTab2").addClass("anTab-cur");
        $("#anTab1").addClass("click-disable");

        getManageCoursewareNearTopTen(echarts,2);
    });


    var sort="";
    var order="";

    //搜索
    $("#courseware_search_id").click(function(){
        var data = $("#courseware_search_data_id").val();
        getManageCoursewareAnalysis(1,10,data);
    });

    //视频时长
    $("[name='courseware_totalTime']").unbind("click").click(function(){
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
        sort = 'videoTime';
        var data = $("#courseware_search_data_id").val();
        getManageCoursewareAnalysis(1,10,data, sort, order);
    });
    //点击量
    $("[name='courseware_clickNum']").unbind("click").click(function(){
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
        sort = 'clickNum';
        var data = $("#courseware_search_data_id").val();
        getManageCoursewareAnalysis(1,10,data, sort, order);
    });
    //观看总时长
    $("[name='courseware_learnTime']").unbind("click").click(function(){
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
        var data = $("#courseware_search_data_id").val();
        getManageCoursewareAnalysis(1,10,data, sort, order);
    });
    //平均单次观看时长
    $("[name='courseware_avgLearnClickTime']").unbind("click").click(function(){
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
        sort = 'avgOnceLearnTime';
        var data = $("#courseware_search_data_id").val();
        getManageCoursewareAnalysis(1,10,data, sort, order);
    });
    //平均观看总时长
    $("[name='courseware_avgLearnUserTime']").unbind("click").click(function(){
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
        sort = 'avgTotalLearnTime';
        var data = $("#courseware_search_data_id").val();
        getManageCoursewareAnalysis(1,10,data, sort, order);
    });
    //平均有效观看时长
    $("[name='courseware_avgLearnRealTime']").unbind("click").click(function(){
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
        sort = 'avgRealLearnTime';
        var data = $("#courseware_search_data_id").val();
        getManageCoursewareAnalysis(1,10,data, sort, order);
    });
    //笔记总数
    $("[name='courseware_noteNum']").unbind("click").click(function(){
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
        sort = 'noteNum';
        var data = $("#courseware_search_data_id").val();
        getManageCoursewareAnalysis(1,10,data, sort, order);
    });
    //排序end


    //导出
    $("#courseware_export").on('click',function () {
        var search = $("#courseware_search_data_id").val();

        StatsCommon.location(StatsCommon.getPlatformPath() + '/statistics/manage/courseware/export',{
            siteCode : siteCode,
            condition : search,
            sort : sort,
            order : order,
            exportColumn : ""//扩展字段
        },token);
    });




});

function getManageCoursewareNearTopTen(ec,type) {
    $("#manageCoursewareTopTen").width('100%');
    $("#manageCoursewareTopTen").height('304px');
    var myChart = ec.init($("#manageCoursewareTopTen")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/manage/courseware/topTen';

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.siteCode = siteCode;
    params.type = type;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(url,JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();
        var category = [];
        var val = [];
        var tempVal = [];
        var tempVal2 = [];
        var legendName = ['点击量', '学习时长'];
        var yName = [];
        var tooltips = [];
        var colorArray = ['#73bdf4', '#e2b772'];

        //悬浮提示扩展信息
        var tooltipsExt = [];

        if (data != null && data.data != null && data.data.length>0) {
            var items = data.data;

            for (var i = 0; i < items.length; i++) {
                tempVal.push(items[i].clickNum);
                tempVal2.push(items[i].learnTime);
                category.push(items[i].name);
                tooltipsExt.push({
                        name : '课件时长',
                        value : StatsCommon.isNull(items[i].videoTime)?0:items[i].videoTime,
                        unit : '秒'
                    });
                if (i == items.length - 1) {
                    val.push(tempVal);
                    val.push(tempVal2);
                    yName.push('次');
                    yName.push('分钟');
                    tooltips.push({name: '点击量', isUseX: false});
                    tooltips.push({name: '学习时长', isUseX: false});
                }
            }
            $("#manageCoursewareTopTen").show();
            $("#anTab-con-noData-topTen").hide();
            StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, 2, colorArray,"","hide",['点击量(次)','学习时长'],"",tooltipsExt);

        }else{
            $("#manageCoursewareTopTen").hide();
            $("#anTab-con-noData-topTen").show();
        }

        $(".anTab-tab a").removeClass("click-disable");
    },token);
}


function getManageCoursewareLearnNum(ec) {
    $("#manageCoursewareLearn").width('100%');
    $("#manageCoursewareLearn").height('304px');
    var manageCharts = ec.init($("#manageCoursewareLearn")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/manage/courseware/learnByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForCourseware(manageCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' );

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForCourseware(manageCharts, url, $("#gridTabLMA_month_select_week").val(), 'week');
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsForCourseware(manageCharts, url, curDate, 'week');
        }, $("#gridTabLMA_month_select_week").val());

    });
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForCourseware(manageCharts, url, $("#gridTabLMA_month_select_month").text(), 'month');
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsForCourseware(manageCharts, url, curDate, 'month');
        });
    });
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForCourseware(manageCharts, url, $("#gridTabLMA_month_select_year").text(), 'year');
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsForCourseware(manageCharts, url, curDate, 'year');
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
function reqEchatsForCourseware(myChart, url, date, period) {
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
        var tempVal2 = [];
        var tempVal3 = [];
        var legendName = ['学习人数', '点击量', '学习时长'];
        var yName = [];
        var tooltips = [];
        var colorArray = ['#73bdf4', '#86cb83', '#e2b772'];
        if (data != null && data.data != null) {
            var items = data.data;

            for (var i = 0; i < items.length; i++) {
                tempVal.push(items[i].total);
                tempVal2.push(items[i].clickNum);
                tempVal3.push(items[i].learnTime);
                if (i == items.length - 1) {
                    val.push(tempVal);
                    val.push(tempVal2);
                    val.push(tempVal3);
                    yName.push('人');
                    yName.push('次');
                    yName.push('分钟');
                    tooltips.push({name: '学习人数', isUseX: false});
                    tooltips.push({name: '点击量', isUseX: false});
                    tooltips.push({name: '学习时长', isUseX: false});
                }
            }
            category=StatsCommon.Default_category(period, date);
            StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, 2, colorArray,"","hide",[{name:'数量(人或次)'},{name:'学习时长'}]);


        }
        $(".gridTabLMA-tab a").removeClass("click-disable");

    },token);
}





/**
 * 视频分析表
 * @param ec
 */
function getManageCoursewareAnalysis( curPage,pageSize,search ,sort ,order) {

    $("#manage_courseware_table_data").hide();
    $("#manage_courseware_table_load").show();



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
    $("#manage_courseware_page").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath() +'/statistics/manage/courseware/analysis?access_token='+token,
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
            $("#manageCoursewareDetail").empty();
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
                        if(StatsCommon.isNull(resource.courseCode)){
                            resource.courseCode="&nbsp;"
                        }
                        str+='<li class="tablTab-tab" >';
                        str+='  <div class="resdisTabl ';
                        if(i%2  == 0){
                            str+=' tablTab-cur';
                        }
                        str+='   tableTab">';
                        str+='      <ul class="clearfix">';
                        str+='<li class="resdisTabl-col resdisTabl-col-16 " name="checkLine" title="'+resource.resourceName+'">' + (StatsCommon.cutStr(resource.resourceName,10)) + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-16  " name="checkLine" title="'+resource.courseName+'">' +  (StatsCommon.cutStr(resource.courseName,10))+ '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-16  " name="checkLine" title="'+resource.courseCode+'">' +(StatsCommon.cutStr(resource.courseCode,9))  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-7_8  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.videoTime,"分钟",".") + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_6  " name="checkLine">' + resource.clickNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-7_8  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.learnTime,"分钟",".") + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-7_8  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.avgOnceLearnTime,"分钟",".")  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-7_8  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.avgTotalLearnTime,"分钟",".")  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-7_8  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.avgRealLearnTime,"分钟",".")  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_5_none  " name="checkLine">' + resource.noteNum  + '</li>';
                        // str+='<li class="resdisTabl-col   " name="checkLine" style="display: none;"><a href="#">播放</a></li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#manageCoursewareDetail").append(str);
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
                    $("#manageCoursewareDetail").append(str);
                }

                $("#manage_courseware_table_data").show();
                $("#manage_courseware_table_load").hide();

            }

        }
    },token);









}

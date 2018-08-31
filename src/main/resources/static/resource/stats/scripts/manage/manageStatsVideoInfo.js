/**
 * 管理端自测每日提交量和平均分
 * @param ec
 */
var site_total_time = StatsCommon.getPlatformPath() + '/statistics/siteTotalLearnTime';
var site_avg_time = StatsCommon.getPlatformPath() + '/statistics/siteAverageLearnTime';
var site_line_rate = StatsCommon.getPlatformPath() + '/statistics/siteOnlineRate';
var site_detial = StatsCommon.getPlatformPath() + '/statistics/siteDateTable';
$(function () {

    $("#anTab-con-noData").hide();
    $("#anTab-con-1").show();
    //学习中心总时长
    querySiteTotalTimeLine(echarts, site_total_time);

    //学习中心人均学习时长
    querySiteAvgTimeLine(echarts, site_avg_time);

    //学习中心上线率
    querySiteLineRate(echarts, site_line_rate);


    if(!device.mobile()){
        //详细数据
        var date = new Date(new Date()-24*60*60*1000);
        var weekDate = StatsCommon.getWeekDays(date);
        var mon = weekDate.MON, sun = weekDate.SUN;
        $('#site_start').text(mon);
        $('#site_end').text(sun);
        querySiteDetial(1, 10, '', '', '', mon, sun);

        //开始日期控件
        $("#site_start").unbind("click").click(function () {
            StatsCommon.DayWdatePicker(this, function (curDate) {
                var selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
                var endDate =  $('#site_end').text();
                if(StatsCommon.isNull(endDate)){
                    return;
                }
                querySiteDetial(1, 10, '', '', '', selectDate, endDate);
            });
        });

        //天日期控件
        $("#site_end").unbind("click").click(function () {
            StatsCommon.DayWdatePicker(this, function (curDate) {
                var selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
                var startDate = $('#site_start').text();
                if(StatsCommon.isNull(startDate)){
                    return;
                }
                querySiteDetial(1, 10, '', '', '', startDate, selectDate);

            });
        });
    } else {
        $('.dashboard').hide();
    }


    // getManageVideoAnalysis();




    $("#anTab1").on('click',function(){
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#anTab1").removeClass("anTab-cur");
        $("#anTab2").removeClass("anTab-cur");
        $("#anTab1").addClass("anTab-cur");
        $("#anTab2").addClass("click-disable");
        getManageVideoNearTopTen(echarts,1);
    });

    $("#anTab2").on('click',function(){
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#anTab1").removeClass("anTab-cur");
        $("#anTab2").removeClass("anTab-cur");
        $("#anTab2").addClass("anTab-cur");
        $("#anTab1").addClass("click-disable");
        getManageVideoNearTopTen(echarts,2);
    });



    var sort="";
    var order="";

    //搜索
    $("#video_search_id").click(function(){
        var data = $("#video_search_data_id").val();
        getManageVideoAnalysis(1,10,data);
    });

    //视频时长
    $("[name='video_totalTime']").unbind("click").click(function(){
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
        var data = $("#video_search_data_id").val();
        getManageVideoAnalysis(1,10,data, sort, order);
    });
    //点击量
    $("[name='video_clickNum']").unbind("click").click(function(){
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
        var data = $("#video_search_data_id").val();
        getManageVideoAnalysis(1,10,data, sort, order);
    });
    //观看总时长
    $("[name='video_learnTime']").unbind("click").click(function(){
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
        var data = $("#video_search_data_id").val();
        getManageVideoAnalysis(1,10,data, sort, order);
    });
    //平均单次观看时长
    $("[name='video_avgLearnClickTime']").unbind("click").click(function(){
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
        var data = $("#video_search_data_id").val();
        getManageVideoAnalysis(1,10,data, sort, order);
    });
    //平均观看总时长
    $("[name='video_avgLearnUserTime']").unbind("click").click(function(){
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
        var data = $("#video_search_data_id").val();
        getManageVideoAnalysis(1,10,data, sort, order);
    });
    //平均有效观看时长
    $("[name='video_avgLearnRealTime']").unbind("click").click(function(){
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
        var data = $("#video_search_data_id").val();
        getManageVideoAnalysis(1,10,data, sort, order);
    });
    //笔记总数
    $("[name='video_noteNum']").unbind("click").click(function(){
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
        var data = $("#video_search_data_id").val();
        getManageVideoAnalysis(1,10,data, sort, order);
    });
    //排序end


    //导出
    $("#video_export").on('click',function () {
        var search = $("#video_search_data_id").val();

        StatsCommon.location(StatsCommon.getPlatformPath() + '/statistics/manage/video/export',{
            siteCode : siteCode,
            condition : search,
            sort : sort,
            order : order,
            exportColumn : ""//扩展字段
        },token);
    });




});

function getManageVideoNearTopTen(ec,type) {
    $("#manageVideoTopTen").width('100%');
    $("#manageVideoTopTen").height('304px');
    var myChart = ec.init($("#manageVideoTopTen")[0]);
    var url = site_avg_time;

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
                        name : '视频时长',
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
            $("#manageVideoTopTen").show();
            $("#anTab-con-noData-topTen").hide();
            StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, 2, colorArray,"","hide",['点击量(次)','学习时长'],"",tooltipsExt);

        }else{
            $("#manageVideoTopTen").hide();
            $("#anTab-con-noData-topTen").show();
        }
        $(".anTab-tab a").removeClass("click-disable");


    },token);
}

/**
 * 学习中心上线率
 * @param ec
 * @param url
 */
function querySiteLineRate(ec, url) {
    $("#site_line_rate").width('100%');
    $("#site_line_rate").height('304px');
    var manageTestCharts = ec.init($("#site_line_rate")[0]);
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMC_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMC_month_select_year").text(date.getFullYear());
    $("#gridTabLMC_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    var weekDate = StatsCommon.getWeekDays(date);
    var mon = weekDate.MON, sun = weekDate.SUN;
    $("#gridTabLMC_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForRate(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week', mon, sun);

    //年、月、周按钮
    $("#gridTabLMC1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        var curDate = $("#gridTabLMC_month_select_week").val();
        var weekDate = StatsCommon.getWeekDays(curDate);
        var mon = weekDate.MON, sun = weekDate.SUN;
        reqEchatsForRate(manageTestCharts, url, curDate, 'week', mon, sun);
    });
    $("#gridTabLMC_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            var weekDate = StatsCommon.getWeekDays(curDate);
            var mon = weekDate.MON, sun = weekDate.SUN;
            reqEchatsForRate(manageTestCharts, url, curDate, 'week', mon, sun);
        }, $("#gridTabLMC_month_select_week").val());

    });
    $("#gridTabLMC2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        var curDate = $("#gridTabLMC_month_select_month").text();
        var first = curDate + '-01', end = curDate + '-31';
        reqEchatsForRate(manageTestCharts, url, curDate, 'month', first, end);
    });
    $("#gridTabLMC_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            var first = curDate + '-01', end = curDate + '-31';
            reqEchatsForRate(manageTestCharts, url, curDate, 'month', first, end);
        });
    });
    $("#gridTabLMC3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        var curDate = $("#gridTabLMC_month_select_year").text();
        var first = curDate + '-01-01', end = curDate + '-12-31';
        reqEchatsForRate(manageTestCharts, url, curDate, 'year', first, end);
    });
    $("#gridTabLMC_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            var first = curDate + '-01-01', end = curDate + '-12-31';
            reqEchatsForRate(manageTestCharts, url, curDate, 'year', first, end);
        });

    });

    $("#gridTabLMC3").trigger('click');
    $(".gridTabLMC-tab a").removeClass("click-disable");

}

/**
 * 学习中心人均学习时长
 * @param ec
 * @param url
 */
function querySiteAvgTimeLine(ec, url) {
    $("#site_avg_learntime").width('100%');
    $("#site_avg_learntime").height('304px');
    var manageTestCharts = ec.init($("#site_avg_learntime")[0]);
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month_avg").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year_avg").text(date.getFullYear());
    $("#gridTabLMA_month_select_week_avg").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    var weekDate = StatsCommon.getWeekDays(date);
    var mon = weekDate.MON, sun = weekDate.SUN;
    $("#gridTabLMA_month_select_week_avg").text(week.MON + '-' + week.SUN);
    reqEchatsForSite(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week', mon, sun );

    //年、月、周按钮
    $("#gridTabLMB1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        var curDate =  $("#gridTabLMA_month_select_week_avg").val();
        var weekDate = StatsCommon.getWeekDays(curDate);
        var mon = weekDate.MON, sun = weekDate.SUN;
        reqEchatsForSite(manageTestCharts, url, curDate, 'week', mon, sun);
    });
    $("#gridTabLMA_month_select_week_avg").unbind("click").click(function () {
        if($(".gridTabLMB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            // var first = curDate + '-01', end = curDate + '-31';
            var weekDate = StatsCommon.getWeekDays(curDate);
            var mon = weekDate.MON, sun = weekDate.SUN;
            reqEchatsForSite(manageTestCharts, url, curDate, 'week', mon, sun);
        }, $("#gridTabLMA_month_select_week_avg").val());

    });
    $("#gridTabLMB2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        var curDate = $("#gridTabLMA_month_select_month_avg").text();
        var first = curDate + '-01', end = curDate + '-31';
        reqEchatsForSite(manageTestCharts, url, curDate, 'month', first, end);
    });
    $("#gridTabLMA_month_select_month_avg").unbind("click").click(function () {
        if($(".gridTabLMB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            var first = curDate + '-01', end = curDate + '-31';
            reqEchatsForSite(manageTestCharts, url, curDate, 'month',  first, end);
        });
    });
    $("#gridTabLMB3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        var curDate = $("#gridTabLMA_month_select_year_avg").text();
        var first = curDate + '-01-01', end = curDate + '-12-31';
        reqEchatsForSite(manageTestCharts, url, curDate, 'year', first, end);
    });
    $("#gridTabLMA_month_select_year_avg").unbind("click").click(function () {
        if($(".gridTabLMB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            var first = curDate + '-01-01', end = curDate + '-12-31';
            reqEchatsForSite(manageTestCharts, url, curDate, 'year', first, end);
        });

    });

    $("#gridTabLMB3").trigger('click');
    $(".gridTabLMB-tab a").removeClass("click-disable");

}


/**
 * 学习中心总学习时长
 * @param ec
 * @param url
 */
function querySiteTotalTimeLine(ec, url) {

    $("#manageVideoLearn").width('100%');
    $("#manageVideoLearn").height('304px');
    var manageTestCharts = ec.init($("#manageVideoLearn")[0]);
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    var weekDate = StatsCommon.getWeekDays(date);
    var mon = weekDate.MON, sun = weekDate.SUN;
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForSite(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay, 'week', mon, sun);

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        var curDate = $("#gridTabLMA_month_select_week").val();
        var weekDate = StatsCommon.getWeekDays(curDate);
        var mon = weekDate.MON, sun = weekDate.SUN;
        reqEchatsForSite(manageTestCharts, url, curDate, 'week', mon, sun);
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            var weekDate = StatsCommon.getWeekDays(curDate);
            var mon = weekDate.MON, sun = weekDate.SUN;
            reqEchatsForSite(manageTestCharts, url, curDate, 'week', mon, sun);
        }, $("#gridTabLMA_month_select_week").val());

    });
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        var month = $("#gridTabLMA_month_select_month").text();
        var first = month + '-01', end = month + '-31';
        reqEchatsForSite(manageTestCharts, url, month, 'month', first, end);
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            var first = curDate + '-01', end = curDate + '-31';
            reqEchatsForSite(manageTestCharts, url, curDate, 'month', first, end);
        });
    });
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        var curDate = $("#gridTabLMA_month_select_year").text();
        var first = curDate + '-01-01', end = curDate + '-12-31';
        reqEchatsForSite(manageTestCharts, url, curDate, 'year', first, end);
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            var first = curDate + '-01-01', end = curDate + '-12-31';
            reqEchatsForSite(manageTestCharts, url, curDate, 'year', first, end);
        });

    });

    $("#gridTabLMA3").trigger('click');

}


/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 * @param type
 * @param start
 * @param end
 */
function reqEchatsForSite(myChart, url, date, period, start, end) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });
    StatsCommon.ajaxReq(url,{
        "year": date,
        "startDate":start,
        "endDate": end,
        "period": period
    }, function (data) {

        myChart.hideLoading();
        var category = ["时长"];
        var val = [];
        var tempVal = [];
        var tempVal2 = [];
        var tempVal3 = [];
        var xName = [];
        var tooltips = [];
        StatsCommon.emptyData(myChart, data.data.list);

        if (data != null && data.data != null && data.data.list != null) {
            var items = data.data.list;

            for (var i = 0; i < items.length; i++) {
                tempVal.push(items[i].learn_time);
                xName.push(items[i].sie_name)
            }
            //todo 暂时使用假数据
            var yAxis = {
                title: '',
                name: ''
            };
            var xAxis = {
                data: xName, //['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                title: ''
            };
            // val = [[120, 200, 150, 80, 70, 110, 130]];
            val = [tempVal];
            StatsCommon.setEchartsBar(myChart, category, yAxis, xAxis, val, "", false, true, "", true);

        }

        $(".gridTabLMA-tab a").removeClass("click-disable");
        $(".gridTabLMB-tab a").removeClass("click-disable");
        $(".gridTabLMC-tab a").removeClass("click-disable");
    },token);
}

/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 * @param type
 */
function reqEchatsForRate(myChart, url, date, period, start, end) {
    myChart.clear();
    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.siteCode = siteCode;
    params.date = date;
    params.period = period;
    params.startDate = start;
    params.endDate = end;

    StatsCommon.ajaxReq(url,params, function (data) {

        myChart.hideLoading();
        var category = [];
        var val = [];
        var tempVal = [];
        var tempVal2 = [];
        var tempVal3 = [];
        var legendName = ['上线人数', '在籍人数', '上线率'];
        var yName = [];
        var tooltips = [];
        var colorArray = ['#73bdf4', '#86cb83', '#e2b772'];

        StatsCommon.emptyData(myChart, data.data.list);

        if (data != null && data.data != null && data.data.list != null) {
            var items = data.data.list;

            for (var i = 0; i < items.length; i++) {
                category.push(items[i].sie_name);
                tempVal.push(items[i].total_number);
                tempVal2.push(items[i].online_number);
                tempVal3.push(items[i].rate);
                if (i == items.length - 1) {
                    val.push(tempVal2);
                    val.push(tempVal);
                    val.push(tempVal3);
                    yName.push('人');
                    yName.push('人');
                    yName.push('%');
                    tooltips.push({name: '上线人数', isUseX: false});
                    tooltips.push({name: '在籍人数', isUseX: false});
                    tooltips.push({name: '上线率', isUseX: false});
                }
            }

            // category=StatsCommon.Default_category(period, date);
            var yAxis = [{name:'人数'},{name:'上线率(%)',max:'100', min:'0'}];
            StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, 2, colorArray,"","show", yAxis,"");
        }
        $(".gridTabLMC-tab a").removeClass("click-disable");

    },token);
}

function watchVideo(id,title){

    parent.layer.open({
        type: 2,
        title: title,
        maxmin: false, //开启最大化最小化按钮
        area: ['893px', '510px'],
        content: '../learn/content_video.html?id=' + id
    });
}


/**
 * 详细数据
 * @param ec
 */
function querySiteDetial( curPage,pageSize,search ,sort ,order, start, end) {

    $("#manage_video_table_data").hide();
    $("#manage_video_table_load").show();



    if (curPage == "" || curPage == undefined || curPage == null) {
        curPage = 1;
    }
    if (pageSize == "" || pageSize == undefined || pageSize == null) {
        pageSize = 10;
    }
    var params={};
    params.siteCode = siteCode;
    params.pageSize = pageSize;
    params.startDate = start;
    params.endDate = end;
    params.sort = sort;
    params.order = order;
    var paramsData = {};
    paramsData.params = params;
    $("#manage_video_page").whatyPager({
        pagerUrl: site_detial,
        pagerData: JSON.stringify(params),
        isOpenShowPagerBarForOnePage: false,
        curPageNum: curPage,
        pageSizeNum: pageSize,
        dataType: "json",
        // contentType:"application/json; charset=utf-8",
        curPageMapperKey: 'curPage',	//设置后台参数映射
        pageSizeMapperKey: 'pageSize',
        pageSizeArr: [10, 20, 30, 50, 100],
        isShowPageSizeSelectToolBar: false,
        isShowTotalPageToolBar: false,
        parsePageData: function (resultData) {	// 解析数据成分页插件支持的数据格式
            var pageData = $.extend(resultData.data, {'totalRow': resultData.data.totalNumber});	// 因为后台page.java类中总记录数属性为totalCount，插件中使用的是totalRow，故做个转换
            return pageData;
        },
        pagerCallHandel: function (data, pagerParam) {	//pageData:分页对象json数据
            $("#manageVideoDetail").empty();
            if (data != null && data.data != null && data.data.list != null) {
                var items = data.data.list;
                if(items.length>0){
                    for(var i=0;i<items.length;i++){
                        var str ='';
                        var resource =items[i];
                        str+='<li class="tablTab-tab" >';
                        str+='  <div class="resdisTabl ';
                        if(i%2  == 0){
                            str+=' tablTab-cur';
                        }
                        str+='   tableTab">';
                        str+='      <ul class="clearfix">';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6  " name="checkLine">' + (i + 1) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-26  " name="checkLine">' +  (resource.sie_name)+ '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-10  " name="checkLine">' +(resource.total_number)  + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-10  " name="checkLine">' + resource.online_number + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-10  " name="checkLine">' + (StatsCommon.isNull(resource.rate) ? '0%' : resource.rate + '%') + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-14  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.learn_time,"分钟",".") + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-14  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.onlinerate,"分钟",".")  + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-9_none  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.totalrate,"分钟",".")  + '</li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#manageVideoDetail").append(str);
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
                    $("#manageVideoDetail").append(str);
                }

                $("#manage_video_table_data").show();
                $("#manage_video_table_load").hide();

            }

        }
    },token);

}

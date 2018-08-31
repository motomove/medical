
$(function () {

    //笔记每日提交量
    getNoteSubmitByDay(echarts);
    //每一讲笔记总数
    reqEchatsNote(echarts);


    $("#pagin").hide();

    $("#pagin_top_next").on("click",function(){
        if(! $(this).hasClass("pagin-disable")){
            var curpage=$("#pagin_curpage").text();
            reqEchatsNote(echarts,parseInt(curpage)-1);
        }
    });

    $("#pagin_bottom_next").on("click",function(){
        if(! $(this).hasClass("pagin-disable")){
            var curpage=$("#pagin_curpage").text();
            reqEchatsNote(echarts,parseInt(curpage)+1);
        }
    });

    $("#pagin_first_page").on("click",function(){
        if(! $(this).hasClass("pagin-disable")) {
            reqEchatsNote(echarts);
        }
    });

    $("#pagin_last_page").on("click",function(){
        if(! $(this).hasClass("pagin-disable")){
            var curpage=$("#pagin_last_page").val();
            reqEchatsNote(echarts,parseInt(curpage));
        }
    });

});


//笔记每天提交数
function getNoteSubmitByDay(ec) {
    $("#note_submit").width('100%');
    $("#note_submit").height('404px');
    var manageTestCharts = ec.init($("#note_submit")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/note/learnByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMD_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMD_month_select_year").text(date.getFullYear());
    $("#gridTabLMD_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMD_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsBarNoteSubmit(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' );

    //年、月、周按钮
    $("#gridTabLMD1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsBarNoteSubmit(manageTestCharts, url, $("#gridTabLMD_month_select_week").val(), 'week');
    });
    $("#gridTabLMD_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsBarNoteSubmit(manageTestCharts, url, curDate, 'week');
        }, $("#gridTabLMD_month_select_week").val());

    });
    $("#gridTabLMD2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsBarNoteSubmit(manageTestCharts, url, $("#gridTabLMD_month_select_month").text(), 'month');
    });
    $("#gridTabLMD_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsBarNoteSubmit(manageTestCharts, url, curDate, 'month');
        });
    });
    $("#gridTabLMD3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsBarNoteSubmit(manageTestCharts, url, $("#gridTabLMD_month_select_year").text(), 'year');
    });
    $("#gridTabLMD_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsBarNoteSubmit(manageTestCharts, url, curDate, 'year');
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
function reqEchatsBarNoteSubmit(myChart, url, date, period) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.date = date;
    params.period = period;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(url,JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();
        var category = [];
        var val = [];
        var tempVal = [];
        var colorArray = [];
        if (data != null && data.data != null) {
            var items = data.data;

            var yAxis = {
                title: '',
                name: ''
            };
            var xAxis = {
                data: [],
                title: ''
            };
            for (var i = 0; i < items.length; i++) {
                tempVal.push(items[i].total);
            }
            xAxis.data=StatsCommon.Default_category(period, date);
            val.push(tempVal);
            yAxis.title = '提交量';
            xAxis.title = '时间';
            yAxis.name = '个';
            category[0]='提交量';
            colorArray.push("#73bdf4");

            StatsCommon.setEchartsBar(myChart, category, yAxis, xAxis, val, colorArray);
        }

        $(".gridTabLMD-tab a").removeClass("click-disable");
    },token);
}


function reqEchatsNote(myCharts, curpage) {

    if(StatsCommon.isNull(curpage)){
        curpage = 1;
    }

    $("#note_sessionCount").width('100%');
    $("#note_sessionCount").height('555px');
    var myChart = myCharts.init($("#note_sessionCount")[0]);
    var url = '/learn/stats/note/count';

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.courseId = courseId;
    params.curPage = curpage;
    params.pageSize = 15;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(url,JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var category = [];
        var val = [];
        var sectionVal = [];
        var legendName = '';
        var name = '';
        var yName = '';
        var xAxisMax = "";
        if (data != null && data.data != null) {
            var items = data.data.items;
            for (var i = 0; i < items.length; i++) {
                category.unshift(items[i].name);
                legendName = '笔记总数';
                val.unshift(items[i].total);
                sectionVal.unshift(items[i].section);
                yName = '个';
            }

            StatsCommon.setHorizontalBarOptions(myChart, legendName, category, val, '讲名称', legendName, yName, xAxisMax,"",sectionVal);
            if(data.data.totalPage>1){
                $("#pagin").show();
                getNotePagin(curpage,data.data.pageSize, data.data.totalPage, data.data.totalCount);
            }
        }


    },token);
}

function getNotePagin(_curPage,_pageSize, _totalPage, _totalCount){
    $("#pagin_totalPage").text(_totalPage);
    $("#pagin_curpage").text(_curPage);
    $("#pagin_totalCount").text(_totalCount);
    $("#pagin_last_page").val(_totalPage);
    if(_curPage <=1){
        $("#pagin_top_next").addClass("pagin-disable");
        $("#pagin_first_page").addClass("pagin-disable");
    }else{
        $("#pagin_top_next").removeClass("pagin-disable");
        $("#pagin_first_page").removeClass("pagin-disable");
    }
    if(_curPage >= _totalPage){
        $("#pagin_bottom_next").addClass("pagin-disable");
        $("#pagin_last_page").addClass("pagin-disable");
    }else{
        $("#pagin_bottom_next").removeClass("pagin-disable");
        $("#pagin_last_page").removeClass("pagin-disable");
    }
}


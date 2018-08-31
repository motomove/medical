/**
 * 管理端主题同阿伦学习情况
 * @param ec
 */

$(function () {

    //笔记每日数量情况
    getManageNoteLearnByDay(echarts);

    //笔记分布情况
    getManageNoteLearn(echarts);

});



function getManageNoteLearn(ec) {
    $("#manageNoteLearnId").width('100%');
    $("#manageNoteLearnId").height('404px');
    var manageNoteCharts = ec.init($("#manageNoteLearnId")[0]);

    reqEchatsForNote(manageNoteCharts);


}


function getManageNoteLearnByDay(ec) {
    $("#manageNoteSubmit").width('100%');
    $("#manageNoteSubmit").height('304px');
    var manageTestCharts = ec.init($("#manageNoteSubmit")[0]);
    var url = StatsCommon.getPlatformPath() + '/manage/note/learnByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForNoteByDay(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' );

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForNoteByDay(manageTestCharts, url, $("#gridTabLMA_month_select_week").val(), 'week');
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsForNoteByDay(manageTestCharts, url, curDate, 'week');
        }, $("#gridTabLMA_month_select_week").val());

    });
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForNoteByDay(manageTestCharts, url, $("#gridTabLMA_month_select_month").text(), 'month');
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsForNoteByDay(manageTestCharts, url, curDate, 'month');
        });
    });
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForNoteByDay(manageTestCharts, url, $("#gridTabLMA_month_select_year").text(), 'year');
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsForNoteByDay(manageTestCharts, url, curDate, 'year');
        });

    });


}


/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 */
function reqEchatsForNote(myChart) {
    var params={};
    params.siteCode = siteCode;
    var paramsData={};
    paramsData.params=params;


    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/manage/note/resourceType/count',JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var val = [];
        var legendName = [];
        var colorArray = [];
        if (data != null && data.data != null && data.data.length>0) {
            var resources = data.data;
            for(var i=0;i<resources.length;i++){
                var resourceType = resources[i].resourceType;
                var num = resources[i].num;
                var name = StatsCommon.getResourceName(resourceType);
                legendName.push(StatsCommon.isNull(name)?'其他':name);
                colorArray.push(StatsCommon.getResourceColor(resourceType));
                val.push(num);
            }

            StatsCommon.setEchartsPie(myChart, legendName, '资源类型', val, colorArray,false,'个');
        }

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
function reqEchatsForNoteByDay(myChart, url, date, period) {
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
            var tempVal0 = [];
            var tempVal1 = [];
            var tempVal2 = [];
            var tempVal3 = [];
            var val = [];

            var category = ['笔记总量','公开笔记数','私密笔记数','推荐笔记数'];
            var colorArray = ['#f2dfa8','#b4cd7a','#86cb83','#69d1ca','#73bdf4'];
            xAxis.data=StatsCommon.Default_category(period,date);
            yAxis.title = '数量';
            xAxis.title = '时间';
            yAxis.name = '个';
            for (var i = 0; i < items.length; i++) {
                tempVal1.push(items[i].publicTotal);
                tempVal0.push(items[i].total);
                tempVal2.push(items[i].privateTotal);
                tempVal3.push(items[i].recommendTotal);
            }
            val.push(tempVal0);
            val.push(tempVal1);
            val.push(tempVal2);
            val.push(tempVal3);

            StatsCommon.setEchartsBar(myChart, category, yAxis, xAxis, val, colorArray);
        }

        $(".gridTabLMA-tab a").removeClass("click-disable");
    },token);
}

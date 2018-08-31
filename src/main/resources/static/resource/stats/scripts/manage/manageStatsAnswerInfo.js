/**
 * 管理端提问情况
 * @param ec
 */

$(function () {

    //提问情况
    getManageAnswerLearnByDay(echarts);

});

function getManageAnswerLearnByDay(ec) {
    $("#manageAnswerSubmit").width('100%');
    $("#manageAnswerSubmit").height('304px');
    var manageTestCharts = ec.init($("#manageAnswerSubmit")[0]);
    var url = StatsCommon.getPlatformPath() + '/manage/answer/learnByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForAnswer(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' );

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForAnswer(manageTestCharts, url, $("#gridTabLMA_month_select_week").val(), 'week');
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsForAnswer(manageTestCharts, url, curDate, 'week');
        },$("#gridTabLMA_month_select_week").val());

    });
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForAnswer(manageTestCharts, url, $("#gridTabLMA_month_select_month").text(), 'month');
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsForAnswer(manageTestCharts, url, curDate, 'month');
        });
    });
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForAnswer(manageTestCharts, url, $("#gridTabLMA_month_select_year").text(), 'year');
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsForAnswer(manageTestCharts, url, curDate, 'year');
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
function reqEchatsForAnswer(myChart, url, date, period) {
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
            var val = [];

            var category = ['提问量','教师回复数','学生回复数'];
            var colorArray = ['#b4cd7a','#f2dfa8','#86cb83','#69d1ca','#73bdf4'];
            xAxis.data=StatsCommon.Default_category(period,date);
            yAxis.title = '数量';
            xAxis.title = '时间';
            yAxis.name = '个';
            for (var i = 0; i < items.length; i++) {
                tempVal1.push(items[i].teacherTotal);
                tempVal0.push(items[i].total);
                tempVal2.push(items[i].studentTotal);
            }
            val.push(tempVal0);
            val.push(tempVal1);
            val.push(tempVal2);

            StatsCommon.setEchartsBar(myChart, category, yAxis, xAxis, val, colorArray);
        }

        $(".gridTabLMA-tab a").removeClass("click-disable");
    },token);
}

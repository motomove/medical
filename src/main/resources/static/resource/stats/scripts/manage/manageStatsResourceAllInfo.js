/**
 * Created by wy on 2017/8/15.
 */
$(function () {
    //初始化

    //组件总时长
    getCompTotalLearnTime(echarts);
    //学习组件点击次数与学习人数
    getClickandNum(echarts);
    //学习组件与学习时长分析
    getCompDayLearnTime(echarts);


});
/**
 * 统计学习组件总用时
 * @param ec
 */
function getCompTotalLearnTime(ec) {
    $("#CompTotalLeanTimeId").width('100%');
    $("#CompTotalLeanTimeId").height('304px');
    var myCompTotalLearnTimeChart = ec.init($("#CompTotalLeanTimeId")[0]);
    var url = StatsCommon.getPlatformPath() + '/manage/resource/totalTime';
    reqEchatsCompTrajectory(myCompTotalLearnTimeChart, url, '', '', '');
}

/**
 * 学习组件点击次数与学习人数
 * @param ec
 */
function getClickandNum(ec) {
    $("#CompClickNumId").width('100%');
    $("#CompClickNumId").height('304px');
    var myClickandNumChart = ec.init($("#CompClickNumId")[0]);
    var url = StatsCommon.getPlatformPath() + '/manage/resource/learnByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabD_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabD_month_select_year").text(date.getFullYear());
    $("#gridTabD_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabD_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsCompTrajectory(myClickandNumChart, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay, 'week', 'click');


    //年、月、周按钮
    $("#gridTabD1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsCompTrajectory(myClickandNumChart, url, $("#gridTabD_month_select_week").val(), 'week', 'click');
    });
    $("#gridTabD_month_select_week").unbind("click").click(function () {
        if($(".gridTabD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsCompTrajectory(myClickandNumChart, url, curDate, 'week', 'click');
        }, $("#gridTabD_month_select_week").val());

    });
    $("#gridTabD2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsCompTrajectory(myClickandNumChart, url, $("#gridTabD_month_select_month").text(), 'month', 'click');
    });
    $("#gridTabD_month_select_month").unbind("click").click(function () {
        if($(".gridTabD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsCompTrajectory(myClickandNumChart, url, curDate, 'month', 'click');
        });
    });
    $("#gridTabD3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsCompTrajectory(myClickandNumChart, url, $("#gridTabD_month_select_year").text(), 'year', 'click');
    });
    $("#gridTabD_month_select_year").unbind("click").click(function () {
        if($(".gridTabD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsCompTrajectory(myClickandNumChart, url, curDate, 'year', 'click');
        });

    });


}

/**
 * 统计学习组件与学习时长分析
 * @param ec
 */
function getCompDayLearnTime(ec) {
    $("#CompDayLearnTimeId").width('100%');
    $("#CompDayLearnTimeId").height('304px');
    var mylearnByDayChart = ec.init($("#CompDayLearnTimeId")[0]);
    var url = StatsCommon.getPlatformPath() + '/manage/resource/learnByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabE_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabE_month_select_year").text(date.getFullYear());
    $("#gridTabE_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabE_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsCompTrajectory(mylearnByDayChart, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay, 'week', 'time');

    //年、月、周按钮
    $("#gridTabE1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsCompTrajectory(mylearnByDayChart, url, $("#gridTabE_month_select_week").val(), 'week', 'time');
    });
    $("#gridTabE_month_select_week").unbind("click").click(function () {
        if($(".gridTabE-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsCompTrajectory(mylearnByDayChart, url, curDate, 'week', 'time');
        }, $("#gridTabE_month_select_week").val());

    });
    $("#gridTabE2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsCompTrajectory(mylearnByDayChart, url, $("#gridTabE_month_select_month").text(), 'month', 'time');
    });
    $("#gridTabE_month_select_month").unbind("click").click(function () {
        if($(".gridTabE-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsCompTrajectory(mylearnByDayChart, url, curDate, 'month', 'time');
        });
    });
    $("#gridTabE3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsCompTrajectory(mylearnByDayChart, url, $("#gridTabE_month_select_year").text(), 'year', 'time');
    });
    $("#gridTabE_month_select_year").unbind("click").click(function () {
        if($(".gridTabE-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsCompTrajectory(mylearnByDayChart, url, curDate, 'year', 'time');
        });
    });

}

/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param percent
 * @param period
 * @param infoType
 */
function reqEchatsCompTrajectory(myChart, url, date, period, infoType) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.siteCode = siteCode;
    params.date = date;
    params.period = period;
    params.infoType = infoType;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(url, JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var category = [];
        var val = [];
        var legendName = [];
        var colorArray = [];
        var yAxis = {
            title: '',
            name: ''
        };
        var xAxis = {
            data: [],
            title: ''
        };
        if (data != null && data.data != null) {
            var items = data.data;
            if (infoType == StatsCommon.INFOTYPE.TIME) {

                var tempVal = [];

                var x = 0;
                for (var i = 0; i < items.length; i++) {
                    tempVal.push(items[i].learnTime);
                    var resourceType = items[i].resourceType;
                    if ((i != items.length - 1 && resourceType != items[i + 1].resourceType) || i == items.length - 1) {
                        var name = StatsCommon.getResourceName(items[i].resourceType);
                        colorArray.push(StatsCommon.getResourceColor(items[i].resourceType));
                        legendName.push(name);
                        val.push(tempVal);
                        tempVal = [];
                    }
                }
                yAxis.name = '分钟';
                yAxis.title = '学习时长';
                xAxis.title = '时间';
                xAxis.data = StatsCommon.Default_category(period, date);
                StatsCommon.setEchartsLine(myChart, legendName, yAxis, xAxis, val, colorArray);
            } else if (infoType == StatsCommon.INFOTYPE.CLICK) {

                var tempVal = [];
                var num = [];
                var learnNums = [];
                for (var i = 0; i < items.length; i++) {
                    tempVal.push(items[i].clickNum);
                    num.push(items[i].learnNum);
                    var resourceType = items[i].resourceType;
                    if ((i != items.length - 1 && resourceType != items[i + 1].resourceType) || i == items.length - 1) {
                        var name = StatsCommon.getResourceName(items[i].resourceType);
                        colorArray.push(StatsCommon.getResourceColor(items[i].resourceType));
                        legendName.push(name);
                        val.push(tempVal);
                        learnNums = num;
                        tempVal = [];
                        num = [];
                    }

                }
                category = StatsCommon.Default_category(period, date);
                xAxis.title = '时间';
                yAxis.title = '点击次数';
                yAxis.name = '次';
                for (var i = 0; i < category.length; i++) {
                    xAxis.data.push(category[i] + "\n(" + (StatsCommon.isNull(learnNums[i])?"0":learnNums[i]) + "人)");
                }
                StatsCommon.setEchartsLine(myChart, legendName, yAxis, xAxis, val, colorArray);
            } else {
                legendName[0] = '学习时长';
                var tempVal = [];
                for (var i = 0; i < items.length; i++) {
                    tempVal.push(items[i].total);
                    xAxis.data.push(StatsCommon.getResourceName(items[i].resourceType));
                    colorArray.push(StatsCommon.getResourceColor(items[i].resourceType));
                    xAxis.title = '资源类型';
                    yAxis.title = '学习时长';
                    yAxis.name = '分钟';
                }
                val.push(tempVal);
                StatsCommon.setEchartsBar(myChart, legendName, yAxis, xAxis, val, colorArray, true);
            }
        }

        if(infoType == StatsCommon.INFOTYPE.TIME){
            $(".gridTabE-tab a").removeClass("click-disable");
        }else{
            $(".gridTabD-tab a").removeClass("click-disable");
        }
    },token);
}






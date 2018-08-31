/**
 * Created by wy on 2017/8/15.
 */
$(function () {
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : ''
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            if(flag ){
                $("#anTab-con-noData").hide();
                $("#anTab-con-2").show();


                //加载上个月的的数据统计
                getLearnInfo2LastMonth();
                //组件总时长
                getCompTotalLearnTime(echarts);
                //学习组件点击次数与学习人数
                getClickandNum(echarts);
                //学习组件与学习时长分析
                getCompDayLearnTime(echarts);

            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);


});
/**
 * 统计学习组件总用时
 * @param ec
 */
function getCompTotalLearnTime(ec) {
    $("#CompTotalLeanTimeId").width('100%');
    $("#CompTotalLeanTimeId").height('404px');
    var myCompTotalLearnTimeChart = ec.init($("#CompTotalLeanTimeId")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/compLearnTime';
    reqEchatsCompTrajectory(myCompTotalLearnTimeChart, url, '', '', '');
}

/**
 * 获取类型：周、月、年
 * @param period
 * @returns {string}
 */
function getPeriod(period) {
    if (period == 2) {
        return StatsCommon.PERIOD.MONTH;
    } else if (period == 3) {
        return StatsCommon.PERIOD.YEAR;
    } else {
        return StatsCommon.PERIOD.WEEK;
    }
}

/**
 * 根据选中获取日期：周、月、年
 * @param period
 * @returns {string}
 */
function getPeriodDate(period, infoType) {
    if (infoType == StatsCommon.INFOTYPE.CLICK) {
        if (period == 2) {
            return $("#gridTabD_month_select_month").text();
        } else if (period == 3) {
            return $("#gridTabD_month_select_year").text();
        } else {
            return $("#gridTabD_month_select_week").val();
        }
    } else if (infoType == StatsCommon.INFOTYPE.TIME) {
        if (period == 2) {
            return $("#gridTabE_month_select_month").text();
        } else if (period == 3) {
            return $("#gridTabE_month_select_year").text();
        } else {
            return $("#gridTabE_month_select_week").val();
        }
    }

}

/**
 * 学习组件点击次数与学习人数
 * @param ec
 */
function getClickandNum(ec) {
    $("#CompClickNumId").width('100%');
    $("#CompClickNumId").height('404px');
    var myClickandNumChart = ec.init($("#CompClickNumId")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/compLearnInfo';
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
    $("#CompDayLearnTimeId").height('404px');
    var mylearnByDayChart = ec.init($("#CompDayLearnTimeId")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/compLearnInfo';
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
 * @param period
 * @param infoType
 */
function reqEchatsCompTrajectory(myChart, url, date, period, infoType) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxBodyReq(url, JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: date,
            period: period,
            infoType: infoType
        }
    }), function (data) {

        myChart.hideLoading();

        var category = [];
        var val = [];
        var legendName = [];
        var series = [];
        var yName = '';
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
        if(infoType == StatsCommon.INFOTYPE.CLICK){
            $(".gridTabD-tab a").removeClass("click-disable");
        }else{
            $(".gridTabE-tab a").removeClass("click-disable");
        }

    },token);
}

/**
 * 获取上个月的数据统计
 */
function getLearnInfo2LastMonth() {
    $("#lastMonthDay2").text(formatDate(new Date()));
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/compLearnInfo2LastMonth', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var items = data.data;
            if (items.avglearnTime != null && items.avglearnTime.length > 0) {
                var describe = '';
                var resource = items.avglearnTime;
                for (var i = 0; i < resource.length; i++) {
                    describe += StatsCommon.getResourceName(resource[i].resourceType) + ":" + StatsCommon.changeLearnTimeHours(resource[i].total,'分钟','.')+" " ;
                }
                $("#avgCompLearnTimeId").text(describe);
            }
            if (items.compTopNum != null && items.compTopNum.length > 0) {
                var val = '';
                var week = '';
                var topNum = items.compTopNum;
                for (var i = 0; i < topNum.length; i++) {
                    week += getWeek(topNum.recordate) + "、";
                    val += StatsCommon.getResourceName(topNum[i].resourceType) + "和";
                }
                val = val.substring(0, val.length - 1);
                week = week.substring(0, week.length - 1);
                $("#CompLearnCountId").text(val);
                $("#CompLearnWeekId").text(week);
            }

        }

    },token);
}

/**
 * 获取传入日期是周几
 * @param dateString
 * @returns {string}
 */
function getWeek(dateString) {
    var date;
    if (dateString == null || dateString == '' || dateString == undefined) {
        date = new Date();
    } else {
        var dateArray = dateString.split("-");
        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    }
    return "星期" + "日一二三四五六".charAt(date.getDay());
};

/**
 * 获取上个月(7月1日 - 7月31日)
 * @param date
 * @returns {string}
 */
function formatDate(date) {
    date.setDate(0)
    var day = date.getDate();
    var month = date.getMonth() + 1;
    return month + "月1日 - " + month + "月" + day + "日";
}



/**
 * Created by whaty on 2017/8/15.
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
                $("#anTab-con-1").show();

                //学习时间段分布图表切换
                statActiveChangeTable(echarts);
                //学习时间段分布热力统计图
                getLearnNumHot(echarts);
                //学习时间段分布折线图
                getLearnPoint(echarts);
                //总学习时长统计图
                getTotalLearnTime(echarts);

                //平均学习时长统计图
                getAvgLearnTime(echarts);

                //学习时长分布统计图（月历图，堆叠条形图）
                getLearnTimeCalendar(echarts);

                //活跃度分析总统计
                getAcviteStatusStats();

            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);




    $("#rankingId").attr("disabled", "disabled");
    $("#an_filter_check").click(function () {
        if ($(this).is(':checked')) {
            $("#rankingId").removeAttr("disabled");
        } else {
            $("#rankingId").attr("disabled", "disabled");
        }
    });

});



//活跃度分析总统计
function getAcviteStatusStats() {
    var date = new Date(new Date()-24*60*60*1000);
    date.setMonth(date.getMonth());
    date.setDate(0);
    var month = date.getMonth() + 1;

    var yearMonth = date.getFullYear() + '-' + (month < 10 ? '0' + month : month);
    var lastDay = date.getDate();

    $("#lateMonthStatsId").html(month + '月1日-' + month + '月' + lastDay + '日');
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/acviteStatus', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: yearMonth
        }
    }), function (data) {
        if (data != null && data.data != null && data.data.info != null) {
            var learnNum = data.data.info.learnNum;
            var learnPeak = data.data.info.learnPeak;
            var periodPeak = data.data.info.periodPeak;
            var learnTimeDay = data.data.info.learnTimeDay;
            var learnTime = data.data.info.learnTime;
            var learnTimeDayPerson = data.data.info.learnTimeDayPerson;


            var learnPoints = ' -- ';
            if (learnPeak && learnPeak.length > 0) {
                learnPoints = '';
                for (var i = 0; i < learnPeak.length; i++) {
                    var point = StatsCommon.LearnPoint(learnPeak[i]).point;
                    learnPoints += point + ', ';
                }
                learnPoints = learnPoints.substring(0, learnPoints.length - 2);
            }
            var learnPeriods = ' -- ';
            if (periodPeak && periodPeak.length > 0) {
                learnPeriods = '';
                for (var i = 0; i < periodPeak.length; i++) {
                    var period = StatsCommon.CalendarItem.getPeriod(periodPeak[i]);
                    learnPeriods += period + ', ';
                }
                learnPeriods = learnPeriods.substring(0, learnPeriods.length - 2);
            }


            $("#learnPointStatsId").html(learnPoints);
            // $("#weekStatsId").html(' -- ');// TODO
            $("#learnNumStatsId").html(learnNum + '人');
            $("#learnTimeDayPersonStatsId").html(learnTimeDayPerson + '分钟');
            $("#learnTimeDayStatsId").html((Math.round(learnTimeDay * 100 / 60) / 100) + '小时');
            $("#learnPeriodStatsId").html(learnPeriods);
        }

    },token);
}


//学习时长分布统计图（月历图，堆叠条形图）
function getLearnTimeCalendar(ec) {
    $('#learnTimeCalendarId').width('100%');
    $('#learnTimeCalendarId').height('500px');
    var myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#learnTimeCalendarWeekId").val(selectDate);
    $("#learnTimeCalendarWeekId").html(week.MON + '-' + week.SUN);

    //周
    $("#gridTabC1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'week';
        var dateStr = $("#learnTimeCalendarWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;

        $("#learnTimeCalendarId").height(500);
        myLearnTimeCalendarChart.dispose();
        myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);

        reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
        $("#calendarDataId").hide();
    });
    //月
    $("#gridTabC2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'month';
        var dateStr = $("#learnTimeCalendarMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#learnTimeCalendarMonthId").text(dateStr);
        }
        selectDate = dateStr;

        var weekLength = StatsCommon.getMonthOfWeekDate(period, selectDate);
        if (weekLength.length > 5) {
            $("#learnTimeCalendarId").height(750);
        } else {
            $("#learnTimeCalendarId").height(680);
        }
        myLearnTimeCalendarChart.dispose();
        myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);

        reqLearnTimeCalendar(myLearnTimeCalendarChart, selectDate, period);
        $("#calendarDataId").show();
    });
    //年
    $("#gridTabC3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'year';
        var dateStr = $("#learnTimeCalendarYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#learnTimeCalendarYearId").text(dateStr);
        }
        selectDate = dateStr;
        $("#learnTimeCalendarId").height(500);
        myLearnTimeCalendarChart.dispose();
        myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);

        reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
        $("#calendarDataId").hide();
    });

    //周日期控件
    $("#learnTimeCalendarWeekId").unbind("click").click(function () {
        if($(".gridTabC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
        },$(this).val());
    });
    //月日期控件
    $("#learnTimeCalendarMonthId").unbind("click").click(function () {
        if($(".gridTabC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');

            var weekLength = StatsCommon.getMonthOfWeekDate(period, selectDate);
            if (weekLength.length > 5) {
                $("#learnTimeCalendarId").height(750);
            } else {
                $("#learnTimeCalendarId").height(680);
            }
            myLearnTimeCalendarChart.dispose();
            myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);

            reqLearnTimeCalendar(myLearnTimeCalendarChart, selectDate, period);
        });
    });
    //年日期控件
    $("#learnTimeCalendarYearId").unbind("click").click(function () {
        if($(".gridTabC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
        });
    });

    reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
    $("#calendarDataId").hide();
}

//学习时间段分布图表切换
function statActiveChangeTable(ec){

    $('#timeDis_switch_line_id').click(function(){
        $('.timeDis_heat').show();
        $('.timeDis_line').hide();
        if($("#gridTabF1").hasClass("gridTabF-cur")){
            var dateStr = $("#learnPointWeekId").val();
            if (!dateStr) {
                dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
            }
            $("#hotWeekId").val(dateStr);
            var week = StatsCommon.getWeekDays(dateStr, 'M月d日');
            $("#hotWeekId").html(week.MON + '-' + week.SUN);
            reqLearnNumHot(dateStr);
            $("#timeDis_switch_line_id").show();
        }else{
            $("#timeDis_switch_line_id").hide();
        }

    });

    $('#timeDis_switch_hot_id').click(function(){
        $('.timeDis_heat').hide();
        $('.timeDis_line').show();
        $("#learnPointId").width('100%');
        $("#learnPointId").height('304px');
        var myLearnPointChart = ec.init($("#learnPointId")[0]);
        var dateStr =$("#hotWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM-dd');
        }
        $("#learnPointWeekId").val(dateStr);
        var week = StatsCommon.getWeekDays(dateStr, 'M月d日');
        $("#learnPointWeekId").html(week.MON + '-' + week.SUN);

        reqLearnPoint(myLearnPointChart, dateStr, "week");

    });

}

//学习时间段分布折线图
function getLearnPoint(ec) {
    $("#learnPointId").width('100%');
    $("#learnPointId").height('304px');
    var myLearnPointChart = ec.init($("#learnPointId")[0]);

    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#learnPointWeekId").val(selectDate);
    $("#learnPointWeekId").html(week.MON + '-' + week.SUN);

    //周
    $("#gridTabF1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#timeDis_switch_line_id").show();
        period = 'week';
        var dateStr = $("#learnPointWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        reqLearnPoint(myLearnPointChart, selectDate, period);
    });
    //月
    $("#gridTabF2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#timeDis_switch_line_id").hide();
        period = 'month';
        var dateStr = $("#learnPointMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#learnPointMonthId").text(dateStr);
        }
        selectDate = dateStr;
        reqLearnPoint(myLearnPointChart, selectDate, period);
    });
    //年
    $("#gridTabF3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#timeDis_switch_line_id").hide();
        period = 'year';
        var dateStr = $("#learnPointYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#learnPointYearId").text(dateStr);
        }
        selectDate = dateStr;
        reqLearnPoint(myLearnPointChart, selectDate, period);
    });

    //周日期控件
    $("#learnPointWeekId").unbind("click").click(function () {
        if($(".gridTabF-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqLearnPoint(myLearnPointChart, selectDate, period);
        },$(this).val());
    });
    //月日期控件
    $("#learnPointMonthId").unbind("click").click(function () {
        if($(".gridTabF-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqLearnPoint(myLearnPointChart, selectDate, period);
        });
    });
    //年日期控件
    $("#learnPointYearId").unbind("click").click(function () {
        if($(".gridTabF-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqLearnPoint(myLearnPointChart, selectDate, period);
        });
    });

    reqLearnPoint(myLearnPointChart, selectDate, period);

}

//总学习时长统计图
function getTotalLearnTime(ec) {
    $("#totalLearnTimeId").width('100%');
    $("#totalLearnTimeId").height('304px');


    var myTotalLearnTimeChart = ec.init($("#totalLearnTimeId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#totalWeekId").val(selectDate);
    $("#totalWeekId").html(week.MON + '-' + week.SUN);

    //周
    $("#gridTab1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'week';
        var dateStr = $("#totalWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
    });
    //月
    $("#gridTab2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'month';
        var dateStr = $("#totalMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#totalMonthId").text(dateStr);
        }
        selectDate = dateStr;
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
    });
    //年
    $("#gridTab3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'year';
        var dateStr = $("#totalYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#totalYearId").text(dateStr);
        }
        selectDate = dateStr;
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
    });

    //周日期控件
    $("#totalWeekId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
        },$(this).val());
    });
    //月日期控件
    $("#totalMonthId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
        });
    });
    //年日期控件
    $("#totalYearId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
        });
    });

    reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');

}

//平均学习时长统计图
function getAvgLearnTime(ec) {
    $("#avgLearnTimeId").width('100%');
    $("#avgLearnTimeId").height('304px');
    var myAvgLearnTimeChart = ec.init($("#avgLearnTimeId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#avgWeekId").val(selectDate);
    $("#avgWeekId").html(week.MON + '-' + week.SUN);


    $("#gridTabB1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'week';
        var dateStr = $("#avgWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
    });
    $("#gridTabB2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'month';
        var dateStr = $("#avgMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#avgMonthId").text(dateStr);
        }
        selectDate = dateStr;
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
    });
    $("#gridTabB3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'year';
        var dateStr = $("#avgYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#avgYearId").text(dateStr);
        }
        selectDate = dateStr;
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
    });


    //周日期控件
    $("#avgWeekId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
        },$(this).val());
    });
    //月日期控件
    $("#avgMonthId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
        });
    });
    //年日期控件
    $("#avgYearId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
        });
    });

    reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');

}

//学习时间段分布热力统计图
function getLearnNumHot(ec) {
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#hotWeekId").val(selectDate);
    $("#hotWeekId").html(week.MON + '-' + week.SUN);

    //周日期控件
    $("#hotWeekId").unbind("click").click(function () {
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqLearnNumHot(selectDate);
        },$(this).val());
    });

    reqLearnNumHot(selectDate);

}

function reqLearnTimeBar(myChart, date, period) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/learnNumByTime', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: date,
            period: period
        }
    }), function (data) {

        myChart.hideLoading();

        var data_period = '';
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        var jsonArrayData = [];
        var categoryWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        var categoryYear = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];
        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {

                var items = data.data.items;

                for (var i = 0; i < items.length; i++) {
                    var timePoint = items[i]["timePoint"];
                    var num = items[i]["num"];
                    var id = items[i]["id"];
                    var timePointType = items[i]["timePointType"];

                    if (timePointType == 0) {
                        data1.push(num);
                    } else if (timePointType == 1) {
                        data2.push(num);
                    } else if (timePointType == 2) {
                        data3.push(num);
                    } else if (timePointType == 3) {
                        data4.push(num);
                    }
                }
            }
        }

        $("#calendarDataId").find("span[name='period']").text(data_period);

        if (period == StatsCommon.PERIOD.WEEK) {
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less1, data: data1, color: '#F6C159'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less10, data: data2, color: '#7FC9FF'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less30, data: data3, color: '#4CB5FF'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.More30, data: data4, color: '#0096FF'});

            var week = StatsCommon.getWeekDays(date);
            categoryWeek = [week.MON, week.TUES, week.WED, week.THUR, week.FRI, week.SAT, week.SUN];
            StatsCommon.setPileUpBarOptions(myChart, jsonArrayData, categoryWeek, 60, '学习人数(人)', '日期', '', '人');
        } else {
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less1OfYear, data: data1, color: '#F6C159'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less10OfYear, data: data2, color: '#7FC9FF'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less30OfYear, data: data3, color: '#4CB5FF'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.More30OfYear, data: data4, color: '#0096FF'});

            StatsCommon.setPileUpBarOptions(myChart, jsonArrayData, categoryYear, 60, '学习人数(人)', '日期', '', '人');
        }
        $(".gridTabC-tab a").removeClass("click-disable");
    },token);
}

function reqLearnTimeCalendar(myChart, date, period) {


    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/learnNumByTime', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: date,
            period: period
        }
    }), function (data) {

        myChart.hideLoading();

        var legendName = '学习时长分布';

        var data_period = '';
        var data_date = ' -- ';
        var data_learnTime = ' -- ';
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        var scatterData = [];

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {

                var items = data.data.items;

                for (var i = 0; i < items.length; i++) {
                    var timePoint = items[i]["timePoint"];
                    var num = items[i]["num"];
                    var type1 = items[i]["0"];
                    var type2 = items[i]["1"];
                    var type3 = items[i]["2"];
                    var type4 = items[i]["3"];
                    scatterData.push([timePoint, num, type1, type2, type3, type4]);
                }
            }

        }

        $("#calendarDataId").find("span[name='period']").text(data_period);

        if (period == StatsCommon.PERIOD.MONTH) {

            StatsCommon.setCalentarOptions(myChart, scatterData, date,'人');
        }

        $(".gridTabC-tab a").removeClass("click-disable");
    },token);
}

function reqLearnPoint(myChart, date, period) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/periodsTime/avgInfo', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: date,
            period: period
        }
    }), function (data) {

        myChart.hideLoading();

        var category = StatsCommon.Default_category(period, date, 'hour');
        var val = StatsCommon.Default_series(period, date, 'hour');

        if (period == StatsCommon.PERIOD.YEAR) {
            category = StatsCommon.Default_category(period, date, 'day');
            val = StatsCommon.Default_series(period, date, 'day');
        }

        var legendName = '平均学习人数';

        var data_period = '';
        var data_date = ' -- ';
        var data_learnTime = ' -- ';
        var rotate = 0;
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                category = [];
                val = [];
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var point = StatsCommon.LearnPoint(items[i].time_type).apm;
                    category.push(point);
                    val.push(items[i].num);
                }
            }

            var maxItems = data.data.maxItems;
            if (maxItems != null && maxItems.length > 0 && maxItems[0].num > 0) {
                data_learnTime = maxItems[0].num;

                data_date = '';
                try {
                    if (maxItems.length == 1) {
                        data_date = StatsCommon.LearnPoint(maxItems[0].time_type).point;
                    } else {
                        for (var i = 0; i < maxItems.length; i++) {
                            data_date += StatsCommon.LearnPoint(maxItems[i].time_type).point + ',';
                        }
                        data_date = data_date.substring(0, data_date.length - 1);
                    }
                } catch (e) {
                }
            }

        }
        $("#learnPointDataId").find("span[name='period']").text(data_period);
        $("#learnPointDataId").find("span[name='date']").text(data_date);
        $("#learnPointDataId").find("span[name='learnNum']").text(data_learnTime + '人');

        StatsCommon.setLineOptions(myChart, legendName, category, val, '人', rotate, period,{xName:'时间点',yName:'学习人数'});

        $(".gridTabF-tab a").removeClass("click-disable");
    },token);
}

function reqLearnTime(myChart, date, period, info) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/learnTime', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: date,
            period: period
        }
    }), function (data) {

        myChart.hideLoading();
        var category = StatsCommon.Default_category(period, date);
        var val = StatsCommon.Default_series(period, date);
        var legendName = '总学习时长';
        if (info == StatsCommon.INFO.AVG) {
            legendName = '平均学习时长';
        }
        var data_period = '';
        var data_date = ' -- ';
        var data_learnTime = ' -- ';
        var rotate = 0;
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
            // rotate = 45;
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                // category = [];
                val = [];
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    // category.push(items[i].timePoint);
                    if (info == StatsCommon.INFO.AVG) {
                        val.push(items[i].avgLearnTime);
                    } else {
                        val.push(items[i].learnTime);
                    }
                }
            }

            var maxItems = data.data.maxItems;
            if (info == StatsCommon.INFO.AVG) {
                maxItems = data.data.avgMaxItems;
            }
            if (maxItems != null && maxItems.length > 0 && maxItems[0].learnTime > 0) {
                data_learnTime = maxItems[0].learnTime;
                if (info == StatsCommon.INFO.AVG) {
                    data_learnTime = maxItems[0].avgLearnTime;
                }


                if (period == StatsCommon.PERIOD.WEEK || period == StatsCommon.PERIOD.MONTH) {
                    try {
                        data_date = '';
                        if (maxItems.length == 1) {
                            var str = maxItems[0].timePoint;
                            var ss = new Date(Date.parse(str.replace(/-/g, "/")));
                            data_date = (ss.getMonth() + 1) + '月' + (ss.getDate()) + '日';
                        } else {
                            for (var i = 0; i < maxItems.length; i++) {
                                var str = maxItems[i].timePoint;
                                var ss = new Date(Date.parse(str.replace(/-/g, "/")));
                                data_date += (ss.getMonth() + 1) + '月' + (ss.getDate()) + '日,';
                            }
                            data_date = data_date.substring(0, data_date.length - 1);
                        }
                    } catch (e) {
                    }

                } else if (period == StatsCommon.PERIOD.YEAR) {
                    data_date = maxItems[0].timePoint + '月';
                }


            }

        }
        if (info == StatsCommon.INFO.ALL) {
            $("#totalDataId").find("span[name='period']").text(data_period);
            $("#totalDataId").find("span[name='date']").text(data_date);
            $("#totalDataId").find("span[name='learnTime']").text(StatsCommon.changeLearnTimeHours(data_learnTime, '分钟','.'));
        } else if (info == StatsCommon.INFO.AVG) {
            $("#avgDataId").find("span[name='period']").text(data_period);
            $("#avgDataId").find("span[name='date']").text(data_date);
            $("#avgDataId").find("span[name='learnTime']").text(StatsCommon.changeLearnTimeHours(data_learnTime, '分钟','.'));
        }

        StatsCommon.setLineOptions(myChart, legendName, category, val, '分钟', rotate, period);
        if(info == StatsCommon.INFO.ALL){
            $(".gridTab-tab a").removeClass("click-disable");
        }else{
            $(".gridTabB-tab a").removeClass("click-disable");
        }
    },token);
}


function reqLearnNumHot(date) {

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/periodsTime/info', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: date
        }
    }), function (data) {
        var $heat_weekUl1 = $('<li class="heat_week"><ul></ul></li>');
        var $head1 = $('<li class="heat_li heat_head">星期一</li>');
        var $heat_weekUl2 = $('<li class="heat_week"><ul></ul></li>');
        var $head2 = $('<li class="heat_li heat_head">星期二</li>');
        var $heat_weekUl3 = $('<li class="heat_week"><ul></ul></li>');
        var $head3 = $('<li class="heat_li heat_head">星期三</li>');
        var $heat_weekUl4 = $('<li class="heat_week"><ul></ul></li>');
        var $head4 = $('<li class="heat_li heat_head">星期四</li>');
        var $heat_weekUl5 = $('<li class="heat_week"><ul></ul></li>');
        var $head5 = $('<li class="heat_li heat_head">星期五</li>');
        var $heat_weekUl6 = $('<li class="heat_week"><ul></ul></li>');
        var $head6 = $('<li class="heat_li heat_head">星期六</li>');
        var $heat_weekUl7 = $('<li class="heat_week"><ul></ul></li>');
        var $head7 = $('<li class="heat_li heat_head">星期日</li>');
        $heat_weekUl1.append($head1);
        $heat_weekUl2.append($head2);
        $heat_weekUl3.append($head3);
        $heat_weekUl4.append($head4);
        $heat_weekUl5.append($head5);
        $heat_weekUl6.append($head6);
        $heat_weekUl7.append($head7);

        if (data != null && data.data != null) {

            if (data.data.items != null && data.data.items.length > 0) {


                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var week = items[i].week;
                    var timeType = items[i].time_type;
                    var num = items[i].num;
                    var lvl = items[i].lvl;
                    var recordDate = items[i].record_date;
                    var title = StatsCommon.formatDate(new Date(recordDate), 'M月d日') + StatsCommon.LearnPoint(timeType).point + ',学习人数' + num + '人';
                    var $temLi = $('<li class="heat_li"><span class="heat_block ' + (lvl == 0 ? '' : 'heat_lvl' + lvl) + '" title="' + title + '"></span></li>');
                    if (week == 1) {
                        $heat_weekUl1.append($temLi);
                    } else if (week == 2) {
                        $heat_weekUl2.append($temLi);
                    } else if (week == 3) {
                        $heat_weekUl3.append($temLi);
                    } else if (week == 4) {
                        $heat_weekUl4.append($temLi);
                    } else if (week == 5) {
                        $heat_weekUl5.append($temLi);
                    } else if (week == 6) {
                        $heat_weekUl6.append($temLi);
                    } else if (week == 7) {
                        $heat_weekUl7.append($temLi);
                    }
                }

            }
        }
        $("#learnNumHotId").children(":first").siblings().remove();
        $("#learnNumHotId").append($heat_weekUl1).append($heat_weekUl2).append($heat_weekUl3)
            .append($heat_weekUl4).append($heat_weekUl5).append($heat_weekUl6).append($heat_weekUl7);

        var week = StatsCommon.getWeekDays(date, 'M月d日');
        $("#learnNumHotId").append('<li class="heat_li">数据时间：' + week.MON + '-' + week.SUN + '</li>');

    },token);
}

/**
 * Created by whaty on 2017/8/15.
 */

$(function () {

    //总学习时长统计图
    getTotalTeachingTime(echarts);

    //平均学习时长统计图
    getAvgTeachingTime(echarts);


});

//总学习时长统计图
function getTotalTeachingTime(ec) {
    $("#totalTeachingTimeId").width('100%');
    $("#totalTeachingTimeId").height('304px');


    var myTotalTeachingTimeChart = ec.init($("#totalTeachingTimeId")[0]);
    var period = StatsCommon.PERIOD.WEEK;
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#totalWeekId").val(selectDate);
    $("#totalWeekId").html(week.MON + '-' + week.SUN);

    //周
    $("#gridTab1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = StatsCommon.PERIOD.WEEK;
        var dateStr = $("#totalWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        reqTeachingTime(myTotalTeachingTimeChart, selectDate, period, StatsCommon.INFO.ALL);
    });
    //月
    $("#gridTab2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = StatsCommon.PERIOD.MONTH;
        var dateStr = $("#totalMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#totalMonthId").text(dateStr);
        }
        selectDate = dateStr;
        reqTeachingTime(myTotalTeachingTimeChart, selectDate, period, StatsCommon.INFO.ALL);
    });
    //年
    $("#gridTab3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = StatsCommon.PERIOD.YEAR;
        var dateStr = $("#totalYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#totalYearId").text(dateStr);
        }
        selectDate = dateStr;
        reqTeachingTime(myTotalTeachingTimeChart, selectDate, period, StatsCommon.INFO.ALL);
    });

    //周日期控件
    $("#totalWeekId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqTeachingTime(myTotalTeachingTimeChart, selectDate, period, StatsCommon.INFO.ALL);
        },$(this).val());
    });
    //月日期控件
    $("#totalMonthId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqTeachingTime(myTotalTeachingTimeChart, selectDate, period, StatsCommon.INFO.ALL);
        });
    });
    //年日期控件
    $("#totalYearId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqTeachingTime(myTotalTeachingTimeChart, selectDate, period, StatsCommon.INFO.ALL);
        });
    });

    reqTeachingTime(myTotalTeachingTimeChart, selectDate, period, StatsCommon.INFO.ALL);

}

//平均学习时长统计图
function getAvgTeachingTime(ec) {
    $("#avgTeachingTimeId").width('100%');
    $("#avgTeachingTimeId").height('304px');
    var myAvgTeachingTimeChart = ec.init($("#avgTeachingTimeId")[0]);
    var period = StatsCommon.PERIOD.WEEK;
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#avgWeekId").val(selectDate);
    $("#avgWeekId").html(week.MON + '-' + week.SUN);


    $("#gridTabB1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = StatsCommon.PERIOD.WEEK;
        var dateStr = $("#avgWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        reqTeachingTime(myAvgTeachingTimeChart, selectDate, period, StatsCommon.INFO.AVG);
    });
    $("#gridTabB2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = StatsCommon.PERIOD.MONTH;
        var dateStr = $("#avgMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#avgMonthId").text(dateStr);
        }
        selectDate = dateStr;
        reqTeachingTime(myAvgTeachingTimeChart, selectDate, period, StatsCommon.INFO.AVG);
    });
    $("#gridTabB3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = StatsCommon.PERIOD.YEAR;
        var dateStr = $("#avgYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#avgYearId").text(dateStr);
        }
        selectDate = dateStr;
        reqTeachingTime(myAvgTeachingTimeChart, selectDate, period, StatsCommon.INFO.AVG);
    });


    //周日期控件
    $("#avgWeekId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqTeachingTime(myAvgTeachingTimeChart, selectDate, period, StatsCommon.INFO.AVG);
        },$(this).val());
    });
    //月日期控件
    $("#avgMonthId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqTeachingTime(myAvgTeachingTimeChart, selectDate, period, StatsCommon.INFO.AVG);
        });
    });
    //年日期控件
    $("#avgYearId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqTeachingTime(myAvgTeachingTimeChart, selectDate, period, StatsCommon.INFO.AVG);
        });
    });

    reqTeachingTime(myAvgTeachingTimeChart, selectDate, period, StatsCommon.INFO.AVG);

}

function reqTeachingTime(myChart, date, period, info) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/manage/teacher/teachingTime', JSON.stringify({
        params: {
            siteCode: siteCode,
            date: date,
            period: period,
            infoType: info
        }
    }), function (data) {

        myChart.hideLoading();

        var category = StatsCommon.Default_category(period, date);
        var val = StatsCommon.Default_series(period, date);
        var legendName = '总教学时长';
        if (info == StatsCommon.INFO.AVG) {
            legendName = '平均教学时长';
        }
        var data_period = '';
        var data_date = ' -- ';
        var data_teachingTime = ' -- ';
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
                    val.push(items[i].teachingTime);
                }
            }

            var maxItems = data.data.maxItems;

            if (maxItems != null && maxItems.length > 0 && maxItems[0].teachingTime > 0) {
                data_teachingTime = maxItems[0].teachingTime;

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
                                if(i%3==2 && (i < maxItems.length-1)){
                                    data_date += '<br>';
                                }
                            }
                            data_date = data_date.substring(0, data_date.length - 1) +'<br>';
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
            $("#totalDataId").find("span[name='date']").html(data_date);
            $("#totalDataId").find("span[name='teachingTime']").text(StatsCommon.changeLearnTimeHours(data_teachingTime, '分钟','.'));
        } else if (info == StatsCommon.INFO.AVG) {
            $("#avgDataId").find("span[name='period']").text(data_period);
            $("#avgDataId").find("span[name='date']").html(data_date);
            $("#avgDataId").find("span[name='teachingTime']").text(StatsCommon.changeLearnTimeHours(data_teachingTime, '分钟','.'));
        }

        StatsCommon.setLineOptions(myChart, legendName, category, val, '分钟', rotate, period);
        if (info == StatsCommon.INFO.ALL) {
            $(".gridTab-tab a").removeClass("click-disable");
        }else{
            $(".gridTabB-tab a").removeClass("click-disable");
        }



    },token);
}



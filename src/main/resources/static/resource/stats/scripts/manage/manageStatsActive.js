/**
 * Created by whaty on 2017/8/15.
 */

$(function () {

    //总学习时长统计图
    getTotalLearnTime(echarts);

    //平均学习时长统计图
    getAvgLearnTime(echarts);

    //学习时长分布统计图（月历图，堆叠条形图）
    getLearnTimeCalendar(echarts);

    //学习时间段分布折线图
    getLearnPoint(echarts);

    //课程学习总用时
    getLearnTimeByCourse(echarts);

});

//地址
var studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/compositeList';
var studentLearn_reqLearnPoint = StatsCommon.getPlatformPath() + '/statistics/periodDistributed';
var studentLearn_reqLearnTimeBar = StatsCommon.getPlatformPath() + '/statistics/compositeList';
var studentLearn_reqLearnTimeCalendar = StatsCommon.getPlatformPath() + '/statistics/compositeList';
var studentLearn_learnTimeByCourse = StatsCommon.getPlatformPath() + '/statistics/courseLearnTime';

function getLearnTimeByCourse(ec) {
    $("#learnTimeByCourseId").width('100%');
    $("#learnTimeByCourseId").height('304px');
    var myChart = ec.init($("#learnTimeByCourseId")[0]);

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    querySemester(myChart, "student_ct_semester");
}

function createCourseTimeBar(myChart, semester) {
    StatsCommon.ajaxReq(studentLearn_learnTimeByCourse, {
        semesterName: semester
    }, function (data) {
        myChart.hideLoading();
        var val = [];
        var legendName = ['课程名称'];

        var yAxis = {
            title: '学习时长',
            name: '分钟'
        };
        var xAxis = {
            data: [],
            title: '课程名称'
        };

        var data_course = ' -- ';
        var data_learnTime = ' -- ';

        StatsCommon.emptyData(myChart, data.data.list);

        if (data != null && data.data != null && data.data.list!=null) {
            var items = data.data.list;
            data_course ='';
            var itemVal = [];
            for (var i = 0; i < items.length; i++) {
                // var courseId = items[i].courseId;
                var courseName = items[i].course_name;
                var learnTime = items[i].learn_time;
                itemVal.push(learnTime);
                xAxis.data.push(courseName);
            }
            val.push(itemVal);
            if(items.length>0){
                data_course += StatsCommon.getSplitStr(items[items.length-1].courseName,15,'<br>');
                var learnTime = items[items.length-1].learnTime;
                data_learnTime = StatsCommon.changeLearnTimeHours(learnTime, '分钟','.');
            }

            $("#learnTimeByCourseDataId").find("span[name='course']").html(data_course);
            $("#learnTimeByCourseDataId").find("span[name='learnTime']").html(data_learnTime);
            StatsCommon.setEchartsBar(myChart, legendName, yAxis, xAxis, val,"",false,true,"",true);
        }

    },token);
}


//学习时长分布统计图（月历图，堆叠条形图）
function getLearnTimeCalendar(ec) {
    $("#learnTimeCalendarId").width('100%');
    $("#learnTimeCalendarId").height(500);
    var myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    var weekDate = StatsCommon.getWeekDays(selectDate);
    var mon = weekDate.MON, sun = weekDate.SUN;
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
        var weekDate = StatsCommon.getWeekDays(selectDate);
        var mon = weekDate.MON, sun = weekDate.SUN;
        $("#learnTimeCalendarId").height(500);
        myLearnTimeCalendarChart.dispose();
        myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);
        reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period, mon, sun);
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

        var first = selectDate + '-01', end = selectDate + '-31';

        reqLearnTimeCalendar(myLearnTimeCalendarChart, selectDate, period, first, end);
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
            var weekDate = StatsCommon.getWeekDays(selectDate);
            var mon = weekDate.MON, sun = weekDate.SUN;
            reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period, mon, sun);
        },$(this).val());
    });
    //月日期控件
    $("#learnTimeCalendarMonthId").unbind("click").click(function () {
        if($(".gridTabC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');

            var weekLength =  StatsCommon.getMonthOfWeekDate(period,selectDate);
            if(weekLength.length > 5){
                $("#learnTimeCalendarId").height(750);
            }else{
                $("#learnTimeCalendarId").height(680);
            }
            myLearnTimeCalendarChart.dispose();
            myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);
            var first = selectDate + '-01', end = selectDate + '-31';
            reqLearnTimeCalendar(myLearnTimeCalendarChart, selectDate, period, first, end);
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

    $("#gridTabC3").trigger('click');
    // reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period, mon, sun);
    $("#calendarDataId").hide();
}



//学习时间段分布折线图
function getLearnPoint(ec) {
    $("#learnPointId").width('100%');
    $("#learnPointId").height('304px');
    var myLearnPointChart = ec.init($("#learnPointId")[0]);

    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    var weekDate = StatsCommon.getWeekDays(selectDate);
    var mon = weekDate.MON, sun = weekDate.SUN;
    $("#learnPointWeekId").val(selectDate);
    $("#learnPointWeekId").html(week.MON + '-' + week.SUN);

    //周
    $("#gridTabF1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return;
        }
        $("#timeDis_switch_line_id").show();
        period = 'week';
        var dateStr = $("#learnPointWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        var weekDate = StatsCommon.getWeekDays(selectDate);
        var mon = weekDate.MON, sun = weekDate.SUN;
        reqLearnPoint(myLearnPointChart, selectDate, period, mon, sun);
    });
    //月
    $("#gridTabF2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return;
        }
        $("#timeDis_switch_line_id").hide();
        period = 'month';
        var dateStr = $("#learnPointMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#learnPointMonthId").text(dateStr);
        }
        selectDate = dateStr;
        var first = selectDate + '-01', end = selectDate + '-31';
        reqLearnPoint(myLearnPointChart, selectDate, period, first, end);
    });
    //年
    $("#gridTabF3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return;
        }
        $("#timeDis_switch_line_id").hide();
        period = 'year';
        var dateStr = $("#learnPointYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#learnPointYearId").text(dateStr);
        }
        selectDate = dateStr;
        var first = selectDate + '-01-01', end = selectDate + '-12-31';
        reqLearnPoint(myLearnPointChart, selectDate, period, first, end);
    });

    //周日期控件
    $("#learnPointWeekId").unbind("click").click(function () {
        if($(".gridTabF-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            var weekDate = StatsCommon.getWeekDays(selectDate);
            var mon = weekDate.MON, sun = weekDate.SUN;
            reqLearnPoint(myLearnPointChart, selectDate, period, mon, sun);
        },$(this).val());
    });
    //月日期控件
    $("#learnPointMonthId").unbind("click").click(function () {
        if($(".gridTabF-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            var first = selectDate + '-01', end = selectDate + '-31';
            reqLearnPoint(myLearnPointChart, selectDate, period, first, end);
        });
    });
    //年日期控件
    $("#learnPointYearId").unbind("click").click(function () {
        if($(".gridTabF-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            var first = selectDate + '-01-01', end = selectDate + '-12-31';
            reqLearnPoint(myLearnPointChart, selectDate, period, first, end);
        });
    });

    $("#gridTabF3").trigger('click');
    // reqLearnPoint(myLearnPointChart, selectDate, period, mon, sun);

}

//总学习时长统计图
function getTotalLearnTime(ec) {
    $("#totalLearnTimeId").width('100%');
    $("#totalLearnTimeId").height('304px');

    var myTotalLearnTimeChart = ec.init($("#totalLearnTimeId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    var weekDate = StatsCommon.getWeekDays(selectDate);
    var mon = weekDate.MON, sun = weekDate.SUN;
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
        var weekDate = StatsCommon.getWeekDays(selectDate);
        var mon = weekDate.MON, sun = weekDate.SUN;
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', mon, sun);
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
        var first = selectDate + '-01', end = selectDate + '-31';
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', first, end);
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
            var weekDate = StatsCommon.getWeekDays(selectDate);
            var mon = weekDate.MON, sun = weekDate.SUN;
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', mon, sun);
        },$(this).val());
    });
    //月日期控件
    $("#totalMonthId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            var first = selectDate + '-01', end = selectDate + '-31';
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', first, end);
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

    $("#gridTab3").trigger('click');
    // reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', mon, sun);

}

//平均学习时长统计图
function getAvgLearnTime(ec) {
    $("#avgLearnTimeId").width('100%');
    $("#avgLearnTimeId").height('304px');
    var myAvgLearnTimeChart = ec.init($("#avgLearnTimeId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    var weekDate = StatsCommon.getWeekDays(selectDate);
    var mon = weekDate.MON, sun = weekDate.SUN;
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
        var weekDate = StatsCommon.getWeekDays(selectDate);
        var mon = weekDate.MON, sun = weekDate.SUN;
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', mon, sun);
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
        var first = selectDate + '-01', end = selectDate + '-31';
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', first, end);
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
            var weekDate = StatsCommon.getWeekDays(selectDate);
            var mon = weekDate.MON, sun = weekDate.SUN;
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', mon, sun);
        },$(this).val());
    });
    //月日期控件
    $("#avgMonthId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            var first = selectDate + '-01', end = selectDate + '-31';
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', first, end);
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

    $("#gridTabB3").trigger('click');
    // reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', mon, sun);

}


function reqLearnTimeBar(myChart, date, period, start, end) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    if('year' == period){
        studentLearn_reqLearnTimeBar = StatsCommon.getPlatformPath() + '/statistics/leranTimeDistributedYear';
    } else {
        studentLearn_reqLearnTimeBar = StatsCommon.getPlatformPath() + '/statistics/leranTimeDistributed';
    }

    StatsCommon.ajaxReq(studentLearn_reqLearnTimeBar, {
        siteCode: siteCode,
        year: date,
        startDate:start,
        endDate : end,
        period: period
    }, function (data) {
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
            StatsCommon.emptyData(myChart, data.data.list);
            if (data.data.list != null && data.data.list.length > 0) {
                var items = data.data.list;
                for (var i = 0; i < items.length; i++) {
                    var timePoint = items[i]["learn_date"];
                    var num = items[i]["student_number"];
                    var timePointType = items[i]["distributed_type"];
                    num = undefined == num ? 0 : num;

                    if (period == StatsCommon.PERIOD.WEEK || period == StatsCommon.PERIOD.MONTH) {
                        if (timePointType == 0) {
                            data1.push(num);
                        } else if (timePointType == 1) {
                            data2.push(num);
                        } else if (timePointType == 2) {
                            data3.push(num);
                        } else if (timePointType == 3) {
                            data4.push(num);
                        }
                    } else if (period == StatsCommon.PERIOD.YEAR) {
                        var index = (Number(timePoint) - 1);
                        if (timePointType == 0) {
                            data1[index] = num;
                        } else if (timePointType == 1) {
                            data2[index] = num;
                        } else if (timePointType == 2) {
                            data3[index] = num;
                        } else if (timePointType == 3) {
                            data4[index] = num;
                        }
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

function reqLearnTimeCalendar(myChart, date, period, start, end) {
    myChart.clear();
    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });
    if('year' == period){
        studentLearn_reqLearnTimeCalendar = StatsCommon.getPlatformPath() + '/statistics/leranTimeDistributedYear';
    } else {
        studentLearn_reqLearnTimeCalendar = StatsCommon.getPlatformPath() + '/statistics/leranTimeDistributed';
    }

    StatsCommon.ajaxReq(studentLearn_reqLearnTimeCalendar, {
        siteCode: siteCode,
        year: date,
        startDate:start,
        endDate : end,
        period: period
    }, function (data) {
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
            StatsCommon.emptyData(myChart, data.data.list);

            if (data.data.list != null && data.data.list.length > 0) {
                var items = data.data.list;
                var dateJson = {}, obJson = {}, totalNum = 0;
                for (var i = 0; i < items.length; i++) {
                    if(undefined == dateJson[items[i]["learn_date"]] || '' == dateJson[items[i]["learn_date"]]){
                        obJson = {}, totalNum = 0;
                    }
                    totalNum = totalNum + Number(items[i]["student_number"]);
                    obJson[items[i]["distributed_type"]] = items[i]["student_number"];
                    obJson[items[i]["learn_date"]] = items[i]["learn_date"];
                    obJson['totalNum'] = totalNum;
                    dateJson[items[i]["learn_date"]] = obJson;
                }
                for(var key in dateJson ){
                    var timePoint = key;
                    var obj = dateJson[key];
                    var num = obj["totalNum"];
                    var type1 = obj["0"];
                    var type2 = obj["1"];
                    var type3 = obj["2"];
                    var type4 = obj["3"];
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

function reqLearnPoint(myChart, date, period, start, end) {
    myChart.clear();
    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    //todo 重写请求地址
    StatsCommon.ajaxReq(studentLearn_reqLearnPoint, {
        siteCode: siteCode,
        startDate:start,
        endDate : end,
        period: period
    }, function (data) {
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
        if(device.mobile()){
            rotate = 90;
        }
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }



        if (data != null && data.data != null) {

            if (data.data != null) {
                category = [];
                val = [];
                var items = data.data;
                var pointArr = []
                for(var key in items){
                    var point = Number(StatsCommon.LearnPointInverse(key).apm);
                    pointArr.push(point);
                    // val.push(StatsCommon.isNull(items[key]) ? 0 : Number(items[key]));

                }

                pointArr.sort(function(a,b){
                    if (a>b) {
                        return 1;
                    }else if(a<b){
                        return -1
                    }else{
                        return 0;
                    }
                });

                for (var i = 0; i < pointArr.length; i++) {
                    var point = StatsCommon.LearnPoint(pointArr[i]).apm;
                    category.push(point);
                    val.push(items[point] == null ? 0 : items[point]);
                }

            }

            var maxItems = null;//data.data.maxItems;
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

        StatsCommon.setLineOptions(myChart, legendName, category, val, '人', rotate, period,{yName:'学习人数'});
        $(".gridTabF-tab a").removeClass("click-disable");
    },token);
}


/**
 * 查询学期
 * @param myChart
 * @param objDomId
 */
function querySemester(myChart, objDomId) {
    $("#" + objDomId).combobox({
        url: StatsCommon.getPlatformPath() + '/statistics/combobox?type=semester' ,
        valueField: 'Id',
        textField: 'name',
        width: 200,
        height: 30,
        listHeight:20,
        panelHeight:0,
        formatter: function(row) {
            return row.name;
        },
        onSelect: function(newValue) {
            var semester = '';
            if(undefined == newValue){
                semester = $("#" + objDomId).combobox('getValue');
            } else {
                semester = newValue.name;
            }
            createCourseTimeBar(myChart, semester);
        },
        onLoadSuccess:function(data){
            var _data = $("#" + objDomId).combobox('getData');
            if(_data != null && _data.meta != null ){
                if (data != null && data.data != null && data.data.list != undefined) {
                    var items = data.data.list;
                    var tempArr = [];
                    var values=[];
                    for(var i=0;i<items.length;i++){
                        if(items[i].flag_active == '1'){
                            values.push({name:items[i].name, Id:""});
                        } else {
                            tempArr.push({name:items[i].name, Id:items[i].name});
                        }
                    }
                    values = values.concat(tempArr);
                    $("#" + objDomId).combobox('loadData', values);
                }
            } else {
                $("#" + objDomId).combobox('select', _data[0].name);
            }
        }
    });
}

function reqLearnTime(myChart, date, period, info, start, end) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    if('all' == info){
        if('year' == period){
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/totalLearnYear';
        } else {
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/totalLearnDay';
        }
    }

    if('avg' == info){
        if('year' == period){
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/averageLearnYear';
        } else {
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/averageLearnDay';
        }
    }

    //todo 需要重写地址
    StatsCommon.ajaxReq(studentLearn_reqLearnTime, {
        siteCode: siteCode,
        year: date,
        startDate: start,
        endDate : end,
        period: period
    }, function (data) {
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

        if(device.mobile()){
            rotate = 45;
        }

        if (data != null && data.data != null) {
            if (data.data.list != null && data.data.list.length > 0) {
                // category = [];
                // val = [];
                var items = data.data.list;
                for (var i = 0; i < items.length; i++) {
                    if('year' == period){
                        var m = Number(items[i].learnDate);
                        if (info == StatsCommon.INFO.AVG) {
                            val[m-1] = items[i].learn_time;
                        } else {
                            val[m-1] = items[i].learn_time;
                        }
                    } else {
                        var m = category.indexOf(items[i].learnDate);
                        if (info == StatsCommon.INFO.AVG) {
                            val[m] = items[i].learn_time;
                        } else {
                            val[m] = items[i].learn_time;
                        }
                    }

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
        if (info == StatsCommon.INFO.ALL) {
            $(".gridTab-tab a").removeClass("click-disable");
        }else{
            $(".gridTabB-tab a").removeClass("click-disable");
        }



    },token);
}



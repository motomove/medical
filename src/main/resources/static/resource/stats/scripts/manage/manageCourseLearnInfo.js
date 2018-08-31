/**
 * 课程学习总用时
 * @param ec
 */
$(function () {

        // //获取课程学习人数
        // getHotCourseLearnNum(echarts);

        //课程学习总用时
        getLearnTimeByCourse(echarts);


});


function getLearnTimeByCourse(ec) {
    $("#learnTimeByCourseId").width('100%');
    $("#learnTimeByCourseId").height('304px');
    var myChart = ec.init($("#learnTimeByCourseId")[0]);

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxReq(StatsCommon.getPlatformPath() + '/statistics/manage/learnTimeByCourse', {
        siteCode: siteCode
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

        if (data != null && data.data != null && data.data.items!=null) {
            var items = data.data.items;
            data_course ='';
            var itemVal = [];
            for (var i = 0; i < items.length; i++) {
                var courseId = items[i].courseId;
                var courseName = items[i].courseName;
                var learnTime = items[i].learnTime;


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

/**
 * 课程学习人数
 * @param ec
 */
function getHotCourseLearnNum(ec) {
    $("#hotCourseLearnNumId").width('100%');
    $("#hotCourseLearnNumId").height('304px');
    var myClickandNumChart = ec.init($("#hotCourseLearnNumId")[0]);
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabD_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabD_month_select_year").text(date.getFullYear());
    $("#gridTabD_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabD_month_select_week").text(week.MON + '-' + week.SUN);
    reqHotCourseLearnNum(myClickandNumChart, date.getFullYear() + '-' + dateMonth + '-' + dateDay, 'week');

    //年、月、周按钮
    $("#gridTabD1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqHotCourseLearnNum(myClickandNumChart, $("#gridTabD_month_select_week").val(), 'week');
    });
    $("#gridTabD_month_select_week").unbind("click").click(function () {
        if($(".gridTabD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqHotCourseLearnNum(myClickandNumChart, curDate, 'week');
        }, $("#gridTabD_month_select_week").val());

    });
    $("#gridTabD2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqHotCourseLearnNum(myClickandNumChart, $("#gridTabD_month_select_month").text(), 'month');
    });
    $("#gridTabD_month_select_month").unbind("click").click(function () {
        if($(".gridTabD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqHotCourseLearnNum(myClickandNumChart, curDate, 'month');
        });
    });
    $("#gridTabD3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqHotCourseLearnNum(myClickandNumChart, $("#gridTabD_month_select_year").text(), 'year');
    });
    $("#gridTabD_month_select_year").unbind("click").click(function () {
        if($(".gridTabD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqHotCourseLearnNum(myClickandNumChart, curDate, 'year');
        });

    });

}


/**
 * 请求课程学习人数
 * @param myChart
 * @param date
 * @param period
 */
function reqHotCourseLearnNum(myChart, date, period) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxReq(StatsCommon.getPlatformPath() + '/statistics/manage/getHotCourseLearnNum', {
        siteCode: siteCode,
        date: date,
        period: period,
        top:5
    }, function (data) {

        myChart.hideLoading();

        var category = [];
        var val = [];
        var legendName = [];
        var colorArray = ['#c59788', '#b18c57', '#bdafab', '#a6c2b5', '#8aa192',
            '#7d9fa4', '#7e7f81', '#6b7479', '#6b8a9f', '#69a3c6',
            '#65b0c1'];
        var yAxis = {
            title: '学习人数',
            name: '人'
        };
        var xAxis = {
            data: [],
            title: '时间'
        };

        var data_period = '';
        var data_course = ' -- ';
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        if (data != null && data.data != null && data.data.items!=null) {
            var items = data.data.items;
            data_course ='';
            for (var i = 0; i < items.length; i++) {
                var courseId = items[i].courseId;
                var courseName = StatsCommon.isNull(items[i].courseName)?'-':items[i].courseName;
                var points = items[i].points;
                var itemVal = [];


                data_course += StatsCommon.getSplitStr(courseName,15,'<br>');

                legendName.push(courseName);

                for(var j=0;j<points.length;j++){
                    var timePoint = points[j].timePoint;
                    var learnNum = points[j].learnNum;
                    itemVal.push(learnNum);
                }
                val.push(itemVal);
            }
            category = StatsCommon.Default_category(period, date);

            for (var i = 0; i < category.length; i++) {
                xAxis.data.push(category[i]);
            }
            legendName=findCourseName(legendName);
            data_course=findCourseName(data_course);
            $("#hotCourseLearnNumDataId").find("span[name='period']").text(data_period);
            $("#hotCourseLearnNumDataId").find("span[name='course']").html(data_course);

            StatsCommon.setEchartsLine(myChart, legendName, yAxis, xAxis, val, colorArray);
        }
        $(".gridTabD-tab a").removeClass("click-disable");
    },token);
}

/**
 * 查询是否存在同名课程
 */
function findCourseName(legendName){

    var hash = {};
    var temp = 1 ;
    var isStr = false;
    if(!StatsCommon.isNull(legendName)  && legendName.indexOf('<br>') > -1){
        isStr = true;
        legendName = legendName.split('<br>');
    }

    for(var i in legendName) {

        if(hash[legendName[i]]){
            legendName[i] = legendName[i]+"("+temp+")";
        }
        hash[legendName[i]] = true;

    }
    if(isStr){
        var newLegendName ="";
        for(var i in legendName) {
            newLegendName += legendName[i] +'<br>';
        }
        return newLegendName;
    }

    return legendName;
}



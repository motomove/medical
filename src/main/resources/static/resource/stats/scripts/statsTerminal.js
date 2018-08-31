/**
 * Created by wy on 2017/9/13.
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
                $("#anTab-con-6").show();


                getLoginModeUserNum(echarts);

                getLoginModeAvgTime(echarts);

                getLoginModeAllTime(echarts);

                getLoginModeLearnNum(echarts);


                getLoginType(echarts);

                getReourceType();


            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);




    //查看按钮
    $("#loginMode_resourceType").change(function () {
        var resourceType = $(this).val();

        $("#loginMode_learnUser").width('100%');
        $("#loginMode_learnUser").height('404px');
        var mycharts = echarts.init($("#loginMode_learnUser")[0]);
        var url = StatsCommon.getPlatformPath() + '/statistics/compLoginModeLearnNum';
        var period = 'week';
        var date = new Date(new Date()-24*60*60*1000);
        if ($("#gridTabLMC1").hasClass("gridTabLMC-cur")) {
            period = 'week';
            date = $("#gridTabLMC_month_select_week").val();
        }
        if ($("#gridTabLMC2").hasClass("gridTabLMC-cur")) {
            period = 'month';
            date = $("#gridTabLMC_month_select_month").text();
        }
        if ($("#gridTabLMC3").hasClass("gridTabLMC-cur")) {
            period = 'year';
            date = $("#gridTabLMC_month_select_year").text();
        }
        reqEchatsGroupBar(mycharts, url, date, period, resourceType);
    });


});



/**
 * 学习人数
 * @param ec
 */
function getLoginModeUserNum(ec) {
    $("#loginMode_learn_user").width('100%');
    $("#loginMode_learn_user").height('304px');
    var userCharts = ec.init($("#loginMode_learn_user")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/loginMode/learnUserByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabG_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabG_month_select_year").text(date.getFullYear());
    $("#gridTabG_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabG_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsLoginModeLine(userCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,'week');


    //年、月、周按钮
    $("#gridTabG1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLoginModeLine(userCharts, url, $("#gridTabG_month_select_week").val(), 'week');
    });
    $("#gridTabG_month_select_week").unbind("click").click(function () {
        if($(".gridTabG-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsLoginModeLine(userCharts, url, curDate, 'week');
        }, $("#gridTabG_month_select_week").val());

    });
    $("#gridTabG2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLoginModeLine(userCharts, url, $("#gridTabG_month_select_month").text(), 'month');
    });
    $("#gridTabG_month_select_month").unbind("click").click(function () {
        if($(".gridTabG-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsLoginModeLine(userCharts, url, curDate, 'month');
        });
    });
    $("#gridTabG3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLoginModeLine(userCharts, url, $("#gridTabG_month_select_year").text(),'year');
    });
    $("#gridTabG_month_select_year").unbind("click").click(function () {
        if($(".gridTabG-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsLoginModeLine(userCharts, url, curDate,'year');
        });

    });


}


function reqEchatsLoginModeLine(myChart, url, date, period) {

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.date = date;
    params.period = period;
    var paramsData={};
    paramsData.params=params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(url,JSON.stringify(paramsData), function (data) {
        myChart.hideLoading();
        var val = [];
        var legendName = [];
        var tempVal = [];
        var tempVal2 = [];
        var colorArray = ['#73bdf4', '#f6c38d'];
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
            legendName[0] = "PC";
            legendName[1] = "移动";
            yAxis.name = '人';
            xAxis.title = '时间';
            xAxis.data = StatsCommon.Default_category(period, date);
            for (var i = 0; i < items.length; i++) {
                yAxis.title = '总人数';
                if (items[i].loginMode == 0) {
                    tempVal.push(items[i].total);
                }
                if (items[i].loginMode == 1) {
                    tempVal2.push(items[i].total);
                }
            }
            val.push(tempVal);
            val.push(tempVal2);
            StatsCommon.setEchartsLine(myChart, legendName, yAxis, xAxis, val, colorArray);
        }

        $(".gridTabG-tab a").removeClass("click-disable");
    },token);
}


//获取资源类型
function getReourceType() {

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/compResouceType', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId
        }
    }), function (data) {
        if (data != null && data.data != null) {
            $("#loginMode_resourceType").empty();
            var items = data.data;
            for (var i = 0; i < items.length; i++) {
                $("#loginMode_resourceType").append('<option value="' + items[i] + '">' + StatsCommon.getResourceName(items[i]) + '</option>');
            }
        }
    },token);
}


/**
 *终端类型使用比例
 * @param ec
 */
function getLoginType(ec) {
    $("#loginMode_learnType").width('100%');
    $("#loginMode_learnType").height('404px');
    var mycharts = ec.init($("#loginMode_learnType")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/loginTypeSituation';
    reqEchatsPie(mycharts, url);
}


/**
 * 平均学习时长
 * @param ec
 */
function getLoginModeAvgTime(ec) {
    $("#loginMode_avgLearnTime").width('100%');
    $("#loginMode_avgLearnTime").height('404px');
    var mycharts = ec.init($("#loginMode_avgLearnTime")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/loginModeLearnTime';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsLine(mycharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay, 'week', 'avg');

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLine(mycharts, url, $("#gridTabLMA_month_select_week").val(), 'week', 'avg');
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsLine(mycharts, url, curDate, 'week', 'avg');
        }, $("#gridTabLMA_month_select_week").val());

    });

    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLine(mycharts, url, $("#gridTabLMA_month_select_month").text(), 'month', 'avg');
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsLine(mycharts, url, curDate, 'month', 'avg');
        });
    });

    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLine(mycharts, url, $("#gridTabLMA_month_select_year").text(), 'year', 'avg');
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsLine(mycharts, url, curDate, 'year', 'avg');
        });
    });
}

/**
 * 总学习时长
 * @param ec
 */
function getLoginModeAllTime(ec) {
    $("#loginMode_allLearnTime").width('100%');
    $("#loginMode_allLearnTime").height('404px');
    var mycharts = ec.init($("#loginMode_allLearnTime")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/loginModeLearnTime';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMB_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMB_month_select_year").text(date.getFullYear());
    $("#gridTabLMB_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMB_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsLine(mycharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay, 'week', 'all');

    //年、月、周按钮
    $("#gridTabLMB1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLine(mycharts, url, $("#gridTabLMB_month_select_week").val(), 'week', 'all');
    });
    $("#gridTabLMB_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsLine(mycharts, url, curDate, 'week', 'all');
        }, $("#gridTabLMB_month_select_week").val());

    });

    $("#gridTabLMB2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLine(mycharts, url, $("#gridTabLMB_month_select_month").text(), 'month', 'all');
    });
    $("#gridTabLMB_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsLine(mycharts, url, curDate, 'month', 'all');
        });
    });

    $("#gridTabLMB3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLine(mycharts, url, $("#gridTabLMB_month_select_year").text(), 'year', 'all');
    });
    $("#gridTabLMB_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsLine(mycharts, url, curDate, 'year', 'all');
        });
    });

}

/**
 * 多终端学习人数分析
 * @param ec
 */
function getLoginModeLearnNum(ec) {


    $("#loginMode_learnUser").width('100%');
    $("#loginMode_learnUser").height('404px');
    var mycharts = ec.init($("#loginMode_learnUser")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/compLoginModeLearnNum';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMC_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMC_month_select_year").text(date.getFullYear());
    $("#gridTabLMC_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMC_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsGroupBar(mycharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay, 'week', $("#loginMode_resourceType").val());

    //年、月、周按钮
    $("#gridTabLMC1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#loginMode_resourceType").attr("disabled","disabled");
        reqEchatsGroupBar(mycharts, url, $("#gridTabLMC_month_select_week").val(), 'week', $("#loginMode_resourceType").val());
    });
    $("#gridTabLMC_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMC-tab a").hasClass("click-disable")){
            return ;
        }
        $("#loginMode_resourceType").attr("disabled","disabled");
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsGroupBar(mycharts, url, curDate, 'week', $("#loginMode_resourceType").val());
        }, $("#gridTabLMC_month_select_week").val());

    });

    $("#gridTabLMC2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#loginMode_resourceType").attr("disabled","disabled");
        reqEchatsGroupBar(mycharts, url, $("#gridTabLMC_month_select_month").text(), 'month', $("#loginMode_resourceType").val());
    });
    $("#gridTabLMC_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMC-tab a").hasClass("click-disable")){
            return ;
        }
        $("#loginMode_resourceType").attr("disabled","disabled");
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsGroupBar(mycharts, url, curDate, 'month', $("#loginMode_resourceType").val());
        });
    });

    $("#gridTabLMC3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        $("#loginMode_resourceType").attr("disabled","disabled");
        reqEchatsGroupBar(mycharts, url, $("#gridTabLMC_month_select_year").text(), 'year', $("#loginMode_resourceType").val());
    });
    $("#gridTabLMC_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMC-tab a").hasClass("click-disable")){
            return ;
        }
        $("#loginMode_resourceType").attr("disabled","disabled");
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsGroupBar(mycharts, url, curDate, 'year', $("#loginMode_resourceType").val());
        });
    });

}

function reqEchatsGroupBar(myChart, url, date, period, resourceType) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });
    StatsCommon.ajaxBodyReq(url, JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: date,
            period: period,
            resourceType: resourceType
        }
    }), function (data) {
        myChart.hideLoading();
        var val = [];
        var legendName = [];
        var tempVal = [];
        var tempVal2 = [];
        var colorArray = [
            '#73bdf4', '#f6c38d'
        ];
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
            for (var i = 0; i < items.length; i++) {
                if (items[i].loginMode == 0) {
                    tempVal.push(items[i].total);
                } else {
                    tempVal2.push(items[i].total);
                }
                var resourceType = items[i].resourceType;
                if ((i != items.length - 1 && resourceType != items[i + 1].resourceType) || i == items.length - 1) {
                    var name = StatsCommon.getResourceName(items[i].resourceType);
                    legendName.push("PC端" + name);
                    legendName.push("移动端" + name);
                    val.push(tempVal);
                    val.push(tempVal2);
                    tempVal = [];
                    tempVal2 = [];
                }
            }
            yAxis.title = '学习人次';
            yAxis.name = '人次';
            xAxis.data = StatsCommon.Default_category(period, date);
            xAxis.title = '时间';
            StatsCommon.setEchartsBar(myChart, legendName, yAxis, xAxis, val, colorArray, false, false, '');

        }
        $(".gridTabLMC-tab a").removeClass("click-disable");
        $("#loginMode_resourceType").removeAttr("disabled");
    },token);
}


function reqEchatsLine(myChart, url, date, period, type) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(url, JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: date,
            period: period,
            info: type
        }
    }), function (data) {
        myChart.hideLoading();
        var val = [];
        var legendName = [];
        var tempVal = [];
        var tempVal2 = [];
        var colorArray = ['#73bdf4', '#f6c38d'];
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
            legendName[0] = "PC";
            legendName[1] = "移动";
            yAxis.name = '分钟';
            xAxis.title = '时间';
            xAxis.data = StatsCommon.Default_category(period, date);
            for (var i = 0; i < items.length; i++) {
                if (StatsCommon.INFO.AVG == type) {
                    yAxis.title = '平均学习时长';
                }
                if (StatsCommon.INFO.ALL == type) {
                    yAxis.title = '总学习时长';
                }
                if (items[i].loginMode == 0) {
                    tempVal.push(items[i].learnTime);
                }
                if (items[i].loginMode == 1) {
                    tempVal2.push(items[i].learnTime);
                }
            }
            val.push(tempVal);
            val.push(tempVal2);
            StatsCommon.setEchartsLine(myChart, legendName, yAxis, xAxis, val, colorArray);
        }

        if(StatsCommon.INFO.AVG == type){
            $(".gridTabLMA-tab a").removeClass("click-disable");
        }else{
            $(".gridTabLMB-tab a").removeClass("click-disable");
        }
    },token);
}

function reqEchatsPie(myChart, url) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(url, JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId
        }
    }), function (data) {
        myChart.hideLoading();
        var val = [];
        var legendName = [];
        var colorArray = ['#73bdf4', '#69d1ca','#86cb83','#b4cd7a','#f2dfa8','#f6c38d'];
        if (data != null && data.data != null) {
            var items = data.data;
            for (var key in items) {
                legendName.push(StatsCommon.getLoginTypeName(key));
                val.push(items[key]);
            }
            StatsCommon.setEchartsPie(myChart, legendName, '终端类型', val, colorArray,true,'人次');
        }

    },token);
}


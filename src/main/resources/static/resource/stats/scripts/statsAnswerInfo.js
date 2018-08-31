/**
 * Created by whaty on 2017/12/04.
 */
$(function () {

    //总答疑
    getAnswerTotal();
    //答疑交互关系
    getAnswerRelative(echarts);
    //每天答疑
    getAnswerSubmitByDay(echarts);


});

//答疑交互关系
function getAnswerRelative(ec) {
    $("#answerRelativeId").width('100%');
    $("#answerRelativeId").height('650px');
    var myChart = ec.init($("#answerRelativeId")[0]);

    reqAnswerRelative(myChart);
}

//答疑交互关系请求
function reqAnswerRelative(myChart) {

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    var paramsData={};
    paramsData.params=params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/answer/interactive',
        JSON.stringify(paramsData), function (data) {

            myChart.hideLoading();

            var nodes = [];
            var links = [];

            if (data != null && data.data != null) {
                if (data.data.links != null && data.data.links.length > 0 && data.data.nodes != null && data.data.nodes.length > 0) {
                    $("#answerRelativeDivId").show();

                    var dataNodes = data.data.nodes;
                    var dataLinks = data.data.links;

                    for (var i = 0; i < dataNodes.length; i++) {
                        var node = dataNodes[i];

                        var value = node.value;
                        var symbolSize = node.symbolSize;
                        var name = node.name;
                        var category = node.category;

                        var node = {
                            value: value,//节点值
                            name: name,//节点名称
                            symbolSize: symbolSize, //关系图节点标记的大小(0~1)
                            category: category,//数据项所在类目的index
                            label: {
                                normal: {
                                    show: symbolSize >= 0.2 //节点大于多少才显示名称
                                    // show: true
                                }
                            }
                        };
                        nodes.push(node);
                    }
                    for (var i = 0; i < dataLinks.length; i++) {
                        var link = dataLinks[i];

                        var source = link.source;
                        var target = link.target;
                        var interactionsRate = link.interactionsRate;
                        var link = {
                            source: source,
                            target: target,
                            lineStyle: {
                                normal: {
                                    width: interactionsRate == 0 ? 0.1 : (interactionsRate * 3)
                                }
                            }
                        };
                        links.push(link);
                    }


                }

            }

            //交互关系图
            StatsCommon.setInterRelationshipOptions(myChart, nodes, links);

        }, token);
}

function getAnswerTotal() {
    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() +'/answer/situation',JSON.stringify(paramsData), function (data) {
        if (data != null && data.data != null) {
            var items = data.data;
            if(!StatsCommon.isNull(items[0])){
                $("#answerNum").text(items[0].total);
                $("#answerTeacherNum").text(items[0].teacherTotal);
                $("#answerStudentNum").text(items[0].studentTotal);
            }
        }
    },token);
}

//答疑每天提问量和回复量
function getAnswerSubmitByDay(ec) {
    $("#answer_submit").width('100%');
    $("#answer_submit").height('504px');
    var manageTestCharts = ec.init($("#answer_submit")[0]);
    var url = StatsCommon.getPlatformPath() + '/answer/learnByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLME_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLME_month_select_year").text(date.getFullYear());
    $("#gridTabLME_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLME_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsPolarizationAnswerSubmit(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' );

    //年、月、周按钮
    $("#gridTabLME1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsPolarizationAnswerSubmit(manageTestCharts, url, $("#gridTabLME_month_select_week").val(), 'week');
    });
    $("#gridTabLME_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsPolarizationAnswerSubmit(manageTestCharts, url, curDate, 'week');
        }, $("#gridTabLME_month_select_week").val());

    });
    $("#gridTabLME2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchartsBarAnswerSubmit(manageTestCharts, url, $("#gridTabLME_month_select_month").text(), 'month');
    });
    $("#gridTabLME_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMD-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchartsBarAnswerSubmit(manageTestCharts, url, curDate, 'month');
        });
    });
    $("#gridTabLME3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsPolarizationAnswerSubmit(manageTestCharts, url, $("#gridTabLME_month_select_year").text(), 'year');
    });
    $("#gridTabLME_month_select_year").unbind("click").click(function () {
        if($(".gridTabLME-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsPolarizationAnswerSubmit(manageTestCharts, url, curDate, 'year');
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
function reqEchatsPolarizationAnswerSubmit(myChart, url, date, period) {
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
        var val = {
            left:[],
            right:[]
        };
        var legendName=['提问量','教师回复数','学生回复数'];
        var tempVal = [];
        var tempVal2 = [];
        var tempVal3 = [];
        var colorArray = {
            left:['#f2dfa8'],
            right:['#b4cd7a','#86cb83','#69d1ca','#73bdf4']
        };
        if (data != null && data.data != null) {
            var items = data.data;

            var xAxis = {
                title: [],
                name: ''
            };
            var yAxis = {
                data: [],
                title: ''
            };
            yAxis.data=StatsCommon.Default_category(period, date);
            yAxis.title = '时间';
            xAxis.title .push('提问量(个)');
            xAxis.title .push('回复量(个)');
            xAxis.name = '个';
            for (var i = 0; i < items.length; i++) {
                tempVal.push(items[i].teacherTotal);
                tempVal2.push(items[i].total);
                tempVal3.push(items[i].studentTotal);
            }
            val.left.push(tempVal2);
            val.right.push(tempVal);
            val.right.push(tempVal3);
            StatsCommon.setEchartsPolarization(myChart,legendName, xAxis, yAxis, val, colorArray);
        }

        $(".gridTabLME-tab a").removeClass("click-disable");
    },token);
}

function reqEchartsBarAnswerSubmit(myChart, url, date, period) {
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

        $(".gridTabLME-tab a").removeClass("click-disable");
    },token);
}

/**
 * Created by wy on 2017/8/30.
 */
$(function () {
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : StatsCommon.RESOURCETYPE.HOMEWORK
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            if(flag ){
                $("#anTab-con-noData").hide();
                $("#anTab-con-4").show();
                $("#processTab-con-4").show();

                getHWCheck(echarts);

                getHWcomments(echarts);

                getHomeworkAvgScore(echarts);

                getHomeworkDistribution(echarts);

            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);


});


function getHWCheck(ec) {
    $("#hw_Auditing").width('100%');
    $("#hw_Auditing").height('404px');
    var myChart = ec.init($("#hw_Auditing")[0]);

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq('/learn/stats/learnHomeWorkCheckByDay', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId
        }
    }), function (data) {

        myChart.hideLoading();
        var category = [];
        var val = [];
        var tempVal = [];
        var tempVal2 = [];
        var tempVal3 = [];
        var legendName = ['当天提交量', '当天批改量', '累计待批改量'];
        var yName = [];
        var tooltips = [];
        var colorArray = ['#73bdf4', '#86cb83', '#e2b772'];
        if (data != null && data.data != null) {
            var items = data.data;

            if (items.length <= 0) {
                $("#hw_auditing_body").hide();
            }

            for (var i = 0; i < items.length; i++) {
                tempVal.push(items[i].submitNum);
                tempVal2.push(items[i].checkNum);
                tempVal3.push(items[i].total);
                category.push(items[i].recordDate);
                if (i == items.length - 1) {
                    val.push(tempVal);
                    val.push(tempVal2);
                    val.push(tempVal3);
                    yName.push('份');
                    tooltips.push({name: '当天提交量', isUseX: true});
                    tooltips.push({name: '当天批改量', isUseX: true});
                    tooltips.push({name: '累计待批改量', isUseX: true});
                }
            }
            var dataZoomStart = 0;
            if (category.length > 30) {
                dataZoomStart = 100 - parseInt(30 / category.length * 100);
            }
            StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, 1, colorArray, dataZoomStart,true,[{name:'作业数量(份)'}],'时间');


        }

    },token);
}

function getHWcomments(ec) {
    $("#hw_comments").width('100%');
    $("#hw_comments").height('304px');
    var mycharts = ec.init($("#hw_comments")[0]);
    var url = '/learn/stats/learnHomeWorkByDay';
    reqEchatsHomework(mycharts, url, 'comments');
}

function getHomeworkAvgScore(ec) {
    $("#hw_avgScore").width('100%');
    $("#hw_avgScore").height('304px');
    var mycharts = ec.init($("#hw_avgScore")[0]);
    var url = '/learn/stats/learnHomeWorkAvg';
    reqEchatsHomework(mycharts, url, 'avg');
}

function getHomeworkDistribution(ec) {
    $("#hw_distribution").width('100%');
    $("#hw_distribution").height('304px');
    var mycharts = ec.init($("#hw_distribution")[0]);
    var url = '/learn/stats/learnHomeWorkAnalysis';
    reqEchatsHomework(mycharts, url, 'analysis');
}

/**
 * 请求
 */
function reqEchatsHomework(myChart, url, type) {
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
        var tempVal4 = [];
        var val = [];
        var sectionVal = [];

        var legendName = [];
        var colorArray = [];
        var category = [];
        if (data != null && data.data != null) {
            var items = data.data;
            if (items.length <= 0) {
                $("#hw_comments_body").hide();
            }
            for (var i = 0; i < items.length; i++) {
                if (type == 'avg') {
                    yAxis.title = '平均分';
                    xAxis.title = '作业标题';
                    yAxis.name = '分';
                    yAxis.max = 100;
                    xAxis.data.push(items[i].title);
                    sectionVal.push(items[i].section);
                    tempVal0.push(items[i].score);
                    legendName[0] = '平均分';
                } else if (type == 'comments') {
                    yAxis.title = '互评数量';
                    xAxis.title = '时间';
                    yAxis.name = '份';
                    xAxis.data.push(items[i].recordDate);
                    tempVal0.push(items[i].total);
                    legendName[0] = '数量';
                } else {
                    yAxis.title = '人数';
                    xAxis.title = '作业标题';
                    yAxis.name = '人';
                    xAxis.data.push(items[i].title);
                    sectionVal.push(items[i].section);
                    tempVal0.push(items[i].point0);
                    tempVal1.push(items[i].point1);
                    tempVal2.push(items[i].point2);
                    tempVal3.push(items[i].point3);
                    tempVal4.push(items[i].point4);
                    legendName[0] = '0-20分数段';
                    legendName[1] = '20-40分数段';
                    legendName[2] = '40-60分数段';
                    legendName[3] = '60-80分数段';
                    legendName[4] = '80-100分数段';
                }
            }
            for (var i = 0; i < legendName.length; i++) {
                category.push(legendName[i]);
            }
            if (type == 'avg' || type == 'comments') {
                val.push(tempVal0);
                colorArray.push("#73bdf4");
            } else {
                val.push(tempVal0);
                val.push(tempVal1);
                val.push(tempVal2);
                val.push(tempVal3);
                val.push(tempVal4);
                colorArray.push("#f2dfa8");
                colorArray.push("#b4cd7a");
                colorArray.push("#86cb83");
                colorArray.push("#69d1ca");
                colorArray.push("#73bdf4");

            }

            if (type == 'comments') {
                var dataZoomStart = 0;
                if (xAxis.data.length > 30) {
                    dataZoomStart = 100 - parseInt(30 / xAxis.data.length * 100);
                }
                StatsCommon.setEchartsBar(myChart, category, yAxis, xAxis, val, colorArray, false, true, dataZoomStart);
            } else {
                StatsCommon.setEchartsBar(myChart, category, yAxis, xAxis, val, colorArray,"","","","",sectionVal);
            }

        }


    },token);
}


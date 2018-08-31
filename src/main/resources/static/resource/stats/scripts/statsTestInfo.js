/**
 * Created by wy on 2017/8/30.
 */
$(function () {
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : StatsCommon.RESOURCETYPE.TEST
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            if(flag ){
                $("#anTab-con-noData").hide();
                $("#anTab-con-4").show();
                $("#processTab-con-5").show();


                getTestByDay(echarts);
                getTestCostTime(echarts);
                getTestCostNum(echarts);
                getTestLookAnswer(echarts);
                getTestAnalysis(echarts);


            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);



});

/**
 * 自测每天提交量和平均分
 */
function getTestByDay(ec) {

    $("#test_submitCount").width('100%');
    $("#test_submitCount").height('404px');
    var myChart = ec.init($("#test_submitCount")[0]);

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq('/learn/stats/learnTestByDay', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId
        }
    }), function (data) {

        myChart.hideLoading();
        var category = [];
        var val = [];
        var val3 = [];
        var val2 = [];
        var legendName = ['提交量', '平均分'];
        var colorArray = ['#73bdf4','#e2b772'];
        var yName = [];
        var tooltips = [];
        if (data != null && data.data != null) {
            var items = data.data;

            if (items.length <= 0) {
                $("#test_submitByDay").hide();
            }


            for (var i = 0; i < items.length; i++) {
                val3.push(items[i].score);
                val2.push(items[i].total);
                category.push(items[i].recordDate);
                if (i == items.length - 1) {
                    val.push(val2);
                    val.push(val3);
                    yName.push('份');
                    tooltips.push({name: '提交量', isUseX: false});
                    yName.push('分');
                    tooltips.push({name: '平均分', isUseX: false});
                }
            }
            var dataZoomStart = 0;
            if (category.length > 30) {
                dataZoomStart = 100 - parseInt(30 / category.length * 100);
            }

            StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, '', colorArray, dataZoomStart,'',[{name:'提交量(份)'},{name:'平均分(分)',max:100}]);


        }

    },token);

}

function getTestCostTime(ec) {
    $("#test_costTime").width('100%');
    $("#test_costTime").height('555px');
    var mycharts = ec.init($("#test_costTime")[0]);
    var url = '/learn/stats/learnTestCostTimeLong';
    reqEchatsTest(mycharts, url, 'time');

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_costTime", function (curPage) {
        reqEchatsTest(mycharts,  url, 'time', curPage);
    });
}

function getTestCostNum(ec) {
    $("#test_costNum").width('100%');
    $("#test_costNum").height('555px');
    var mycharts = ec.init($("#test_costNum")[0]);
    var url = '/learn/stats/learnTestCostNum';
    reqEchatsTest(mycharts, url, 'num');

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_costNum", function (curPage) {
        reqEchatsTest(mycharts, url, 'num', curPage);
    });
}

function getTestLookAnswer(ec) {
    $("#test_lookAnswer").width('100%');
    $("#test_lookAnswer").height('555px');
    var mycharts = ec.init($("#test_lookAnswer")[0]);
    var url = '/learn/stats/learnTestLookAnsower';
    reqEchatsTest(mycharts, url, 'answer');

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_lookAnswer", function (curPage) {
        reqEchatsTest(mycharts,url, 'answer', curPage);
    });
}

function reqEchatsTest(myChart, url, type,curPage) {
    if(StatsCommon.isNull(curPage)){
        curPage=1;
    }
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.curPage = curPage;
    params.pageSize = 15;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(url,  JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var category = [];
        var val = [];
        var sectionVal = [];
        var legendName = '';
        var name = '';
        var countNum = [];
        var yName = '';
        var xAxisMax = "";
        var suffix = "";
        if (data != null && data.data != null  && data.data.items.length>0) {
            var items = data.data.items;
            for (var i = 0; i < items.length; i++) {
                category.unshift(items[i].title);
                sectionVal.unshift(items[i].section);
                if (type == 'time') {
                    name = '平均作答用时';
                    legendName = '平均作答用时';
                    val.unshift(items[i].costTime);
                    yName = '分钟';
                    suffix="_costTime";
                } else if (type == 'num') {
                    name = '平均作答次数';
                    legendName = '平均作答次数';
                    val.unshift(items[i].costNum);
                    yName = '次';
                    suffix="_costNum";
                } else {
                    name = '人数比例';
                    legendName = '查看答案人数比例';
                    var totals = items[i].total;
                    xAxisMax = 100;
                    var answerTotal = items[i].answerTotal;
                    if (answerTotal == 0) {
                        val.unshift(0);
                    } else {
                        val.unshift(parseInt(answerTotal / totals * 100));
                    }
                    yName = '%';
                    countNum.unshift(totals);
                    suffix="_lookAnswer";
                }
            }

            StatsCommon.setHorizontalBarOptions(myChart, legendName, category, val, '自测标题', name, yName, xAxisMax,"",sectionVal);

            StatsCommonUtill.paginStyle(suffix,curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);
        }


    },token);
}

// function getTestAnalysis(ec){
//
//     $("#test_analysis").width('1168px');
//     $("#test_analysis").height('404px');
//     var myChart = ec.init($("#test_analysis")[0]);
//
//     myChart.clear();
//
//     myChart.showLoading({
//         text: '正在努力的读取数据中...',
//     });
//
//     StatsCommon.ajaxReq('/statistics/learnTestAnalysis', {
//         siteCode: siteCode,
//         courseId: courseId
//     }, function (data) {
//
//         myChart.hideLoading();
//         var category = [];
//         var legendName=['平均分\t\t\t\t\t\t\t\t\t\t','0-20分数段','20-40分数段','40-60分数段','60-80分数段','80-100分数段'];
//         var val={
//             avgSocre:[],
//             point20:[],
//             point40:[],
//             point60:[],
//             point80:[],
//             point100:[]
//         };
//         var yName = [];
//         if (data != null && data.data != null ) {
//             var items = data.data;
//             for (var i=0;i< items.length;i++){
//                 val.point20.push(items[i].point0);
//                 val.point40.push(items[i].point1);
//                 val.point60.push(items[i].point2);
//                 val.point80.push(items[i].point3);
//                 val.point100.push(items[i].point4);
//                 val.avgSocre.push(-items[i].score);
//                 yName.push(items[i].title);
//             }
//
//             StatsCommon.setEchartsPolarization(myChart,legendName,yName,val);
//
//
//         }
//
//     });
// }

/**
 * 自测成绩分析
 * @param ec
 */
function getTestAnalysis(ec,curPage) {

    $("#test_analysis").width('100%');
    $("#test_analysis").height('555px');
    var myChart = ec.init($("#test_analysis")[0]);

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    if(StatsCommon.isNull(curPage)){
        curPage=1;
    }

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.curPage = curPage;
    params.pageSize = 15;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq('/learn/stats/learnTestAnalysis',JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();
        var legendName = ['平均分\t\t\t\t\t','0-20分数段', '20-40分数段', '40-60分数段', '60-80分数段', '80-100分数段'];
        var val = {
            left: [],
            right: []
        };
        var left0 = [];
        var right0 = [];
        var right1 = [];
        var right2 = [];
        var right3 = [];
        var right4 = [];
        var yName = [];
        var sectionVal = [];
        var colorArray={
            left:['#bedfef'],
            right:['#f2dfa8','#b4cd7a','#86cb83','#69d1ca','#73bdf4']
        };
        if (data != null && data.data != null && data.data.items.length>0) {
            var items = data.data.items;
            for (var i = 0; i < items.length; i++) {
                right0.push(items[i].point0);
                right1.push(items[i].point1);
                right2.push(items[i].point2);
                right3.push(items[i].point3);
                right4.push(items[i].point4);
                left0.push(items[i].score);
                sectionVal.push(items[i].section);
                yName.push(items[i].title);
            }
            val.left.push(left0);
            val.right.push(right0);
            val.right.push(right1);
            val.right.push(right2);
            val.right.push(right3);
            val.right.push(right4);
            StatsCommon.setEchartsLeftAndRigth(myChart, legendName, yName, val,colorArray,sectionVal);

            StatsCommonUtill.paginStyle("_analysis",curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);
        }

    },token);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_analysis", function (curPage) {
        getTestAnalysis(echarts, curPage);
    });
}

/**
 * Created by whaty on 2017/9/12.
 */
$(function () {
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : StatsCommon.RESOURCETYPE.COURSEWARE
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            if(flag ){
                $("#anTab-con-noData").hide();
                $("#anTab-con-4").show();
                $("#processTab-con-3").show();


                //电子课件完成情况
                getCoursewareCompletion(echarts);

                //电子课件点击量与学习时长
                getCoursewareLearnTimeClickNum(echarts);

                //人均单击次数
                getCoursewareAvgHits(echarts);

                //电子课件观看热区
                getCoursewareLearnHot(echarts);


            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);


});


//电子课件完成情况
function getCoursewareCompletion(ec) {
    $("#coursewareCompletionId").width('100%');
    $("#coursewareCompletionId").height('555px');
    var myVideoCompletionChart = ec.init($("#coursewareCompletionId")[0]);


    reqCoursewareCompletion(myVideoCompletionChart);


    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_coursewareCompletion", function (curPage) {
            reqCoursewareCompletion(myVideoCompletionChart, curPage);
        });

}

//电子课件完成情况请求
function reqCoursewareCompletion(myChart,curPage) {

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.COURSEWARE;
    if(!StatsCommon.isNull(curPage)){
        params.curPage = curPage;
    }
    params.pageSize = 15;
    var paramsData={};
    paramsData.params=params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/video/completeStatus', JSON.stringify(paramsData) , function (data) {

        myChart.hideLoading();

        var jsonArrayData = [];
        var category = [];
        var sectionVal = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];
        var numArray =[];
        var num1 = [];
        var num2 = [];
        var num3 = [];
        var num4 = [];
        var videoId = '';
        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var videoName = items[i]["videoName"];
                    var section = items[i]["section"];
                    var temVideoId = items[i]["videoId"];
                    var rate = items[i]["rate"];
                    var type = items[i]["type"];
                    var num = items[i]["num"];
                    if (type == 0) {
                        data1.push(rate);
                        num1.push(num);
                    } else if (type == 1) {
                        data2.push(rate);
                        num2.push(num);
                    } else if (type == 2) {
                        data3.push(rate);
                        num3.push(num);
                    } else if (type == 3) {
                        data4.push(rate);
                        num4.push(num);
                    }

                    if (temVideoId != videoId) {
                        videoId = temVideoId;
                        category.push(videoName);
                        sectionVal.push(section);
                    }

                }

                // //数据量太大重新设置高度
                // if (category.length > 10) {
                //     var h = category.length * 25 + 100;
                //     $("#coursewareCompletionId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#coursewareCompletionId")[0]);
                // }
            }

        }

        numArray.push(num1);
        numArray.push(num2);
        numArray.push(num3);
        numArray.push(num4);

        jsonArrayData.push({legend: StatsCommon.VideoCompletion.Less10, data: data1, color: '#f2dfa8'});
        jsonArrayData.push({legend: StatsCommon.VideoCompletion.Less50, data: data2, color: '#b4cd7a'});
        jsonArrayData.push({legend: StatsCommon.VideoCompletion.Less80, data: data3, color: '#86cb83'});
        jsonArrayData.push({legend: StatsCommon.VideoCompletion.More80, data: data4, color: '#73bdf4'});


        StatsCommon.setPileUpBarOptions(myChart, jsonArrayData, category, 30, '完成人数分布(%)', '课件名称', 'top', '%',numArray,'',sectionVal);

        StatsCommonUtill.paginStyle('_coursewareCompletion',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

    },token);
}

//电子课件点击量与学习时长
function getCoursewareLearnTimeClickNum(ec) {
    $("#coursewareAvgLearnTimeClickNumId").width('100%');
    $("#coursewareAvgLearnTimeClickNumId").height('400px');
    var myVideoLearnLearnTimeClickNumChart = ec.init($("#coursewareAvgLearnTimeClickNumId")[0]);


    reqCoursewareLearnTimeClickNum(myVideoLearnLearnTimeClickNumChart);
}

//人均单击次数
function getCoursewareAvgHits(ec) {

    $("#coursewareAvgClickNumId").width('100%');
    $("#coursewareAvgClickNumId").height('555px');
    var myVideoAvgClickNumChart = ec.init($("#coursewareAvgClickNumId")[0]);


    reqCoursewareAvgHits(myVideoAvgClickNumChart);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_coursewareAvgHits", function (curPage) {
            reqCoursewareAvgHits(myVideoAvgClickNumChart, curPage);
        });
}

//电子课件点击量与学习时长请求
function reqCoursewareLearnTimeClickNum(myChart) {


    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.COURSEWARE;
    var paramsData={};
    paramsData.params=params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/video/avgLearnTimeHits', JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var category = [];
        var sectionVal = [];
        var clickNumVal = [];
        var avgLearnTimeVal = [];

        //悬浮提示扩展信息
        var tooltipsExt = [];

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var clickNum = items[i].clickNum;
                    var avgLearnTime = items[i].avgLearnTime;
                    var vName = items[i].videoName;
                    var videoTime = items[i].videoTime;
                    var section = items[i].section;

                    category.unshift(vName);
                    sectionVal.unshift(section);
                    clickNumVal.unshift(clickNum);
                    avgLearnTimeVal.unshift(avgLearnTime);
                    tooltipsExt.unshift({
                        name : '课件时长',
                        value : videoTime,
                        unit : '秒'
                    });

                }

            }

        }
        var tooltips = [{name: '点击量', isUseX: false}, {name: '平均单次观看时长', isUseX: false}];

        //点击量与学习时长组合图
        StatsCommon.setEchartsOptions2(myChart, ['点击量', '平均单次观看时长'], ['次', '分钟'], [clickNumVal, avgLearnTimeVal], category, tooltips,'',[],'','',[{name:'点击量(分)'},{name:'平均单次观看时长'}],'',tooltipsExt,sectionVal);

    },token);
}

//电子课件人均点击量请求
function reqCoursewareAvgHits(myChart, curPage) {

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.COURSEWARE;
    if(!StatsCommon.isNull(curPage)){
        params.curPage = curPage;
    }
    params.pageSize = 15;
    var paramsData={};
    paramsData.params=params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/video/avgHits', JSON.stringify(paramsData) , function (data) {

        myChart.hideLoading();

        var myAvgClickNumCategory = [];
        var myAvgClickNumVal = [];
        var myAvgClickNumLegendName = '平均点击次数';
        var sectionVal = [];


        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var avgClickNum = items[i].avgClickNum;
                    var vName = items[i].videoName;
                    var section = items[i].section;

                    //平均点击次数图表数据
                    myAvgClickNumCategory.unshift(vName);
                    myAvgClickNumVal.unshift(avgClickNum);
                    sectionVal.unshift(section);
                }

                // //数据量太大重新设置高度
                // if (myAvgClickNumCategory.length > 10) {
                //     var h = myAvgClickNumCategory.length * 25 + 100;
                //     $("#coursewareAvgClickNumId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#coursewareAvgClickNumId")[0]);
                // }

            }

        }

        //平均点击次数柱状图
        StatsCommon.setHorizontalBarOptions(myChart, myAvgClickNumLegendName, myAvgClickNumCategory, myAvgClickNumVal, '课件名称', myAvgClickNumLegendName, '次','','',sectionVal);

        StatsCommonUtill.paginStyle('_coursewareAvgHits',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

    },token);
}

//电子课件观看热区
function getCoursewareLearnHot(ec) {
    $("#coursewareHotId").width('100%');
    $("#coursewareHotId").height('555px');
    var myVideoLearnHotChart = ec.init($("#coursewareHotId")[0]);


    reqCoursewareLearnHot(myVideoLearnHotChart);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_coursewareHot", function (curPage) {
            reqCoursewareLearnHot(myVideoLearnHotChart, curPage);
        });
}

function reqCoursewareLearnHot(myChart,curPage) {

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.COURSEWARE;
    if(!StatsCommon.isNull(curPage)){
        params.curPage = curPage;
    }
    params.pageSize = 15;
    var paramsData={};
    paramsData.params=params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/video/learnHot', JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var category = [];
        var sectionVal = [];
        var vId = '';
        var val = {};

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                var items = data.data.items;

                for (var i = 0; i < items.length; i++) {
                    var maxLearnNum = items[i].maxLearnNum;
                    var totalTime = items[i].totalTime;
                    var secList = items[i].secList;
                    var vId = items[i].vId;
                    var vName = items[i].videoName;
                    var section = items[i].section;

                    category.push({vId: vId, vName: vName, totalTime: totalTime});
                    sectionVal.push(section);

                    var vals = [];

                    if(secList.length>0){
                        for(var j=0;j<secList.length;j++){
                            var secO = secList[j];
                            var learnNumRange = secO.learnNumRange;
                            var secEnd = secO.secEnd;
                            var secStart = secO.secStart;
                            var round = learnNumRange*0.1;

                            var r = 255;
                            var g = 255 - Math.round(255 * round);
                            var b = 255 - Math.round(255 * round);

                            //最深 238,176,35
                            //最浅 249,233,192
                            // var r = 249-Math.round(11 * round);
                            // var g = 233 - Math.round(57 * round);
                            // var b = 192 - Math.round(157 * round);
                            vals.push({
                                secStart: secStart,
                                secEnd: secEnd,
                                learnNumRange: learnNumRange,
                                maxLearnNum : maxLearnNum,
                                color: 'rgb(' + r + ', ' + g + ', ' + b + ')'
                            });

                        }
                    }else{
                        vals.push({
                                secStart: 0,
                                secEnd: 0,
                                learnNumRange: 0,
                                maxLearnNum : 0,
                                color: 'rgb(' + 255 + ', ' + 255 + ', ' + 255 + ')'
                            });
                    }

                    val[vId] = vals;

                }

                //数据量太大重新设置高度
                // if (category.length > 10) {
                //     var h = category.length * 40;
                //     // if(category.length < 10){
                //     //     h = category.length * 60;
                //     // }
                //     $("#coursewareHotId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#coursewareHotId")[0]);
                // }

                StatsCommon.setAssemblyProfileOptions(myChart, category, val, '课件名称', '课件时长','',sectionVal);

                StatsCommonUtill.paginStyle('_coursewareHot',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);
            }

        }



    },token);
}

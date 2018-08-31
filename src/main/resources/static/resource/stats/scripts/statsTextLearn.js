/**
 * Created by whaty on 2017/9/13.
 */
$(function () {
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : StatsCommon.RESOURCETYPE.TEXT
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            if(flag ){
                $("#anTab-con-noData").hide();
                $("#anTab-con-4").show();
                $("#processTab-con-2").show();

                //图文点击量
                getHits(echarts);

                //图文平均学习时长
                getAvgTime(echarts);

                //图文笔记总数
                getTextNoteTotalNum(echarts);


            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);


});

//图文点击量
function getHits(ec) {
    $("#textHotId").width('100%');
    $("#textHotId").height('555px');
    var myTextHotChart = ec.init($("#textHotId")[0]);

    reqHitsAndAvgTime(myTextHotChart, 'hit' ,1);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_textHit", function (curPage) {
            reqHitsAndAvgTime(myTextHotChart, 'hit' ,curPage);
        });
}

//图文平均学习时长
function getAvgTime(ec) {

    $("#textAvgLearnTimeId").width('100%');
    $("#textAvgLearnTimeId").height('555px');
    var myTextAvgLearnTimeChart = ec.init($("#textAvgLearnTimeId")[0]);

    reqHitsAndAvgTime(myTextAvgLearnTimeChart,'learnTime',1);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_textLearnTime", function (curPage) {
            reqHitsAndAvgTime(myTextAvgLearnTimeChart,'learnTime',curPage);
        });
}

//图文笔记总数
function getTextNoteTotalNum(ec) {
    $("#textNoteId").width('100%');
    $("#textNoteId").height('555px');
    var myChart = ec.init($("#textNoteId")[0]);


    reqTextNoteTotalNum(myChart);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_textNoteCount", function (curPage) {
            reqTextNoteTotalNum(myChart, curPage);
        });
}

//图文点击量与平均学习时长请求
function reqHitsAndAvgTime(mychart, info , curPage) {


    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.TEXT;
    if(!StatsCommon.isNull(curPage)){
        params.curPage = curPage;
    }
    params.pageSize = 15;
    var paramsData={};
    paramsData.params=params;

    mychart.clear();

    mychart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/item/learnByType', JSON.stringify(paramsData) , function (data) {

        mychart.hideLoading();

        var myTextHotCategory = [];
        var myTextHotVal = [];
        var myTextHotLegendName = '点击量';

        var myTextAvgLearnTimeCategory = [];
        var myTextAvgLearnTimeVal = [];
        var myTextAvgLearnTimeLegendName = '平均学习时长';
        var sectionVal = [];


        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var hits = items[i].hits;
                    var avgTime = items[i].avgTime;
                    var name = items[i].name;
                    var section = items[i].section;

                    sectionVal.unshift(section);

                    //点击量图表数据
                    myTextHotCategory.unshift(name);
                    myTextHotVal.unshift(hits);


                    //平均点击次数图表数据
                    myTextAvgLearnTimeCategory.unshift(name);
                    myTextAvgLearnTimeVal.unshift(avgTime);
                }

                if(info == 'hit'){
                    //数据量太大重新设置高度
                    // if (myTextHotCategory.length > 10) {
                    //     var h = myTextHotCategory.length * 25 + 100;
                    //     $("#textHotId").height(h + 'px');
                    //     mychart.dispose();
                    //     mychart = echarts.init($("#textHotId")[0]);
                    // }
                }else if(info =='learnTime'){
                    //数据量太大重新设置高度
                    // if (myTextAvgLearnTimeCategory.length > 10) {
                    //     var h = myTextAvgLearnTimeCategory.length * 25 + 100;
                    //     $("#textAvgLearnTimeId").height(h + 'px');
                    //     mychart.dispose();
                    //     mychart = echarts.init($("#textAvgLearnTimeId")[0]);
                    // }
                }

            }

        }

        if (info == 'hit') {
            //点击量柱状图
            StatsCommon.setHorizontalBarOptions(mychart, myTextHotLegendName, myTextHotCategory, myTextHotVal, '图文名称', myTextHotLegendName, '次','','',sectionVal);

            StatsCommonUtill.paginStyle('_textHit',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

        } else if (info == 'learnTime') {
            //平均学习时长柱状图
            StatsCommon.setHorizontalBarOptions(mychart, myTextAvgLearnTimeLegendName, myTextAvgLearnTimeCategory, myTextAvgLearnTimeVal, '图文名称', myTextAvgLearnTimeLegendName, '分钟','','',sectionVal);

            StatsCommonUtill.paginStyle('_textLearnTime',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

        }



    },token);
}

//图文笔记总数请求
function reqTextNoteTotalNum(myChart, curPage) {

    var params={};
    params.courseId = courseId;
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

    StatsCommon.ajaxBodyReq('/learn/stats/text/noteCount', JSON.stringify(paramsData) , function (data) {

        myChart.hideLoading();

        var myCategory = [];
        var sectionVal = [];
        var myVal = [];
        var myLegendName = '笔记总数';
        $("#textNoteId").parent().hide();
        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                $("#textNoteId").parent().show();
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var totalNum = items[i].totalNum;
                    var name = items[i].name;
                    var section = items[i].section;

                    //点击量图表数据
                    myCategory.unshift(name);
                    myVal.unshift(totalNum);
                    sectionVal.unshift(section);
                }

                //数据量太大重新设置高度
                // if (myCategory.length > 10) {
                //     var h = myCategory.length * 25 + 100;
                //     $("#textNoteId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#textNoteId")[0]);
                // }

            }

        }

        //点击量柱状图
        StatsCommon.setHorizontalBarOptions(myChart, myLegendName, myCategory, myVal, '图文名称', myLegendName, '个','','',sectionVal);

        StatsCommonUtill.paginStyle('_textNoteCount',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

    },token);
}

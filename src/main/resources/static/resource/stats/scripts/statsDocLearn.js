/**
 * Created by whaty on 2018/03/06.
 */
$(function () {
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : StatsCommon.RESOURCETYPE.DOC
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            if(flag ){
                $("#anTab-con-noData").hide();
                $("#anTab-con-4").show();
                $("#processTab-con-2").show();

                //文档点击量
                getHits(echarts);

                //文档平均学习时长
                getAvgTime(echarts);



            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);


});

//图文点击量
function getHits(ec) {
    $("#docHotId").width('100%');
    $("#docHotId").height('555px');
    var myTextHotChart = ec.init($("#docHotId")[0]);

    reqHitsAndAvgTime(myTextHotChart, 'hit' ,1);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_docHit", function (curPage) {
            reqHitsAndAvgTime(myTextHotChart, 'hit' ,curPage);
        });
}

//图文平均学习时长
function getAvgTime(ec) {

    $("#docAvgLearnTimeId").width('100%');
    $("#docAvgLearnTimeId").height('555px');
    var myTextAvgLearnTimeChart = ec.init($("#docAvgLearnTimeId")[0]);

    reqHitsAndAvgTime(myTextAvgLearnTimeChart,'learnTime',1);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_docLearnTime", function (curPage) {
            reqHitsAndAvgTime(myTextAvgLearnTimeChart,'learnTime',curPage);
        });
}


//图文点击量与平均学习时长请求
function reqHitsAndAvgTime(mychart, info , curPage) {


    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.DOC;
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


            }

        }

        if (info == 'hit') {
            //点击量柱状图
            StatsCommon.setHorizontalBarOptions(mychart, myTextHotLegendName, myTextHotCategory, myTextHotVal, '文档名称', myTextHotLegendName, '次','','',sectionVal);

            StatsCommonUtill.paginStyle('_docHit',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

        } else if (info == 'learnTime') {
            //平均学习时长柱状图
            StatsCommon.setHorizontalBarOptions(mychart, myTextAvgLearnTimeLegendName, myTextAvgLearnTimeCategory, myTextAvgLearnTimeVal, '文档名称', myTextAvgLearnTimeLegendName, '分钟','','',sectionVal);

            StatsCommonUtill.paginStyle('_docLearnTime',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

        }



    },token);
}


/**
 * Created by whaty on 2017/9/13.
 */
$(function () {
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : StatsCommon.RESOURCETYPE.TOPIC
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            if(flag ){
                $("#anTab-con-noData").hide();
                $("#anTab-con-4").show();
                $("#processTab-con-6").show();

                //主题讨论参与度
                getForumPartDegree(echarts);

                //主题讨论深度
                getForumDeepDegree(echarts);

                //主题讨论交互关系
                getForumRelative(echarts);

            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);


});


//主题讨论参与度
function getForumPartDegree(ec) {
    $("#forumPartDegreeId").width('100%');
    $("#forumPartDegreeId").height('555px');
    var myChart = ec.init($("#forumPartDegreeId")[0]);


    reqForumPartDegree(myChart);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_forumPartDegree", function (curPage) {
            reqForumPartDegree(myChart,curPage);
        });
}

//主题讨论深度
function getForumDeepDegree(ec) {
    $("#forumDeepDegreeId").width('100%');
    $("#forumDeepDegreeId").height('555px');
    var myChart = ec.init($("#forumDeepDegreeId")[0]);


    reqForumDeepDegree(myChart);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_forumDeepDegree", function (curPage) {
            reqForumDeepDegree(myChart,curPage);
        });
}

//主题讨论交互关系
function getForumRelative(ec) {
    $("#forumRelativeId").width('100%');
    $("#forumRelativeId").height('650px');
    var myChart = ec.init($("#forumRelativeId")[0]);

    reqForumRelative(myChart);
}

//主题讨论参与度请求
function reqForumPartDegree(myChart, curPage) {

    var params={};
    params.siteCode = siteCode;
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

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/forum/partDegree', JSON.stringify(paramsData), function (data) {

        StatsCommon.ajaxBodyReq('/learn/stats/courseElectiveNum', JSON.stringify({
            params: {
                courseId: courseId
            }
        }), function (data2) {

            var courseNum = 0;

            if (data2 != null && data2.data != null && data2.data.electiveNum != null) {
                courseNum = data2.data.electiveNum;
            }


            myChart.hideLoading();

            var myCategory = [];
            var sectionVal = [];
            var myVal = [];
            var myLegendName = '参与度';

            if (data != null && data.data != null) {
                if (data.data.items != null && data.data.items.length > 0) {
                    var items = data.data.items;
                    for (var i = 0; i < items.length; i++) {
                        var num = items[i].num;
                        var title = items[i].title;
                        var section = items[i].section;

                        var part = 0;
                        if (courseNum > 0) {
                            part = Math.round(num * 100 * 100 / courseNum) / 100;
                        }

                        //点击量图表数据
                        myCategory.unshift(title);
                        myVal.unshift(part);
                        sectionVal.unshift(section);
                    }

                    //数据量太大重新设置高度
                    // if (myCategory.length > 10) {
                    //     var h = myCategory.length * 25 + 100;
                    //     $("#forumPartDegreeId").height(h + 'px');
                    //     myChart.dispose();
                    //     myChart = echarts.init($("#forumPartDegreeId")[0]);
                    // }

                }

            }

            //柱状图
            StatsCommon.setHorizontalBarOptions(myChart, myLegendName, myCategory, myVal, '主题帖名称', myLegendName, '%', 100, 10,sectionVal);

            StatsCommonUtill.paginStyle('_forumPartDegree',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

        },token);
    },token);
}

//主题讨论深度请求
function reqForumDeepDegree(myChart, curPage) {

    var params={};
    params.siteCode = siteCode;
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

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/forum/deepDegree', JSON.stringify(paramsData) , function (data) {

        myChart.hideLoading();

        var myCategory = [];
        var sectionVal = [];
        var myVal = [];
        var myLegendName = '讨论深度';

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var quality = items[i].quality;
                    var title = items[i].title;
                    var section = items[i].section;

                    //点击量图表数据
                    myCategory.unshift(title);
                    myVal.unshift(quality);
                    sectionVal.unshift(section);
                }

                //数据量太大重新设置高度
                // if (myCategory.length > 10) {
                //     var h = myCategory.length * 25 + 100;
                //     $("#forumDeepDegreeId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#forumDeepDegreeId")[0]);
                // }

            }

        }

        //柱状图
        StatsCommon.setHorizontalBarOptions(myChart, myLegendName, myCategory, myVal, '主题帖名称', '讨论深度', '', 5, 10,sectionVal);

        StatsCommonUtill.paginStyle('_forumDeepDegree',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

    },token);
}

//主题讨论交互关系请求
function reqForumRelative(myChart) {


    var params={};
    params.courseId = courseId;
    params.siteCode = siteCode;
    params.resourceType = StatsCommon.RESOURCETYPE.TOPIC;
    var paramsData={};
    paramsData.params=params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/item/interactiveByType', JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var categories = [];
        var nodes = [];
        var links = [];

        if (data != null && data.data != null) {
            if (data.data.links != null && data.data.links.length > 0 && data.data.nodes != null && data.data.nodes.length > 0) {
                $("#forumRelativeDivId").show();

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
                                width: interactionsRate==0?0.1:(interactionsRate*3)
                            }
                        }
                    };
                    links.push(link);
                }


            }

        }

        //交互关系图
        StatsCommon.setInterRelationshipOptions(myChart, nodes, links);

    },token);
}

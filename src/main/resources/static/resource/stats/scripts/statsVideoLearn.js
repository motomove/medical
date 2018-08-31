/**
 * Created by whaty on 2017/8/30.
 */
$(function () {
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : StatsCommon.RESOURCETYPE.VIDEO
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            if(flag ){
                $("#anTab-con-noData").hide();
                $("#anTab-con-4").show();
                $("#processTab-con-1").show();


                //视频完成情况
                getVideoCompletion(echarts);

                //视频点击量与学习时长
                getVideoLearnTimeClickNum(echarts);

                //人均单击次数
                getVideoAvgHits(echarts);

                //视频观看热区
                getVideoLearnHot(echarts);

                //节点题目正确率
                getNodeTitleAccuracy(echarts);

                //视频笔记总数
                getVideoNoteTotal(echarts);

            }else{
                $("#anTab-con-noData .empyt-txt").text('暂无数据');
            }
        }

    },token);


});

//视频完成情况
function getVideoCompletion(ec) {
    $("#videoCompletionId").width('100%');
    $("#videoCompletionId").height('555px');
    var myVideoCompletionChart = ec.init($("#videoCompletionId")[0]);


    reqVideoCompletion(myVideoCompletionChart);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_videoCompletion", function (curPage) {
            reqVideoCompletion(myVideoCompletionChart, curPage);
        });
}

//视频完成情况请求
function reqVideoCompletion(myChart,curPage) {

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.VIDEO;
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

                //数据量太大重新设置高度
                // if (category.length > 10) {
                //     var h = category.length * 25 + 100;
                //     $("#videoCompletionId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#videoCompletionId")[0]);
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

        StatsCommon.setPileUpBarOptions(myChart, jsonArrayData, category, 30, '完成人数分布(%)', '视频名称', 'top', '%',numArray,'',sectionVal);

        StatsCommonUtill.paginStyle('_videoCompletion',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

    },token);
}

//人均点击次数
function getVideoAvgHits(ec) {

    $("#videoAvgClickNumId").width('100%');
    $("#videoAvgClickNumId").height('555px');
    var myVideoAvgClickNumChart = ec.init($("#videoAvgClickNumId")[0]);

    reqVideoAvgHits(myVideoAvgClickNumChart);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_videoAvgHits", function (curPage) {
            reqVideoAvgHits(myVideoAvgClickNumChart,curPage);
        });
}

//视频点击量与学习时长
function getVideoLearnTimeClickNum(ec) {
    $("#videoAvgLearnTimeClickNumId").width('100%');
    $("#videoAvgLearnTimeClickNumId").height('404px');
    var myVideoLearnLearnTimeClickNumChart = ec.init($("#videoAvgLearnTimeClickNumId")[0]);


    reqVideoLearnTimeClickNum(myVideoLearnLearnTimeClickNumChart);
}

//视频点击量与学习时长请求
function reqVideoLearnTimeClickNum(myChart) {


    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.VIDEO;
    var paramsData={};
    paramsData.params=params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/video/avgLearnTimeHits', JSON.stringify(paramsData) , function (data) {

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
                        name : '视频时长',
                        value : videoTime,
                        unit : '秒'
                    });

                }

            }

        }
        var tooltips = [{name: '点击量', isUseX: false}, {name: '平均单次观看时长', isUseX: false}];

        //点击量与学习时长组合图
        StatsCommon.setEchartsOptions2(myChart, ['点击量', '平均单次观看时长'], ['次', '分钟'], [clickNumVal, avgLearnTimeVal], category, tooltips,'',[],'','',[{name:'点击量(次)'},{name:'平均单次观看时长'}],'',tooltipsExt,sectionVal);

    },token);
}

//视频人均点击量请求
function reqVideoAvgHits(myChart,curPage) {

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.VIDEO;
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

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/video/avgHits', JSON.stringify(paramsData), function (data) {

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

                //数据量太大重新设置高度
                // if (myAvgClickNumCategory.length > 10) {
                //     var h = myAvgClickNumCategory.length * 25 + 100;
                //     $("#videoAvgClickNumId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#videoAvgClickNumId")[0]);
                // }

            }

        }

        //平均点击次数柱状图
        StatsCommon.setHorizontalBarOptions(myChart, myAvgClickNumLegendName, myAvgClickNumCategory, myAvgClickNumVal, '视频名称', myAvgClickNumLegendName, '次','','',sectionVal);

        StatsCommonUtill.paginStyle('_videoAvgHits',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

    },token);
}

//视频观看热区
function getVideoLearnHot(ec) {
    $("#videoHotId").width('100%');
    $("#videoHotId").height('555px');
    var myVideoLearnHotChart = ec.init($("#videoHotId")[0]);

    reqVideoLearnHot(myVideoLearnHotChart);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_videoHot", function (curPage) {
            reqVideoLearnHot(myVideoLearnHotChart, curPage);
        });


}

function reqVideoLearnHot(myChart,curPage) {

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.resourceType = StatsCommon.RESOURCETYPE.VIDEO;
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

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/video/learnHot', JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var category = [];
        var val = {};
        var sectionVal = [];

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                var items = data.data.items;

                $('#learnHotPercentId').empty();
                for (var i = 0; i < items.length; i++) {
                    var maxLearnNum = items[i].maxLearnNum;
                    var totalTime = items[i].totalTime;
                    var secList = items[i].secList;
                    var vId = items[i].vId;
                    var vName = items[i].videoName;
                    var section = items[i].section;
                    var learnPercent = items[i].learnPercent;
                    var learnValidPercent = items[i].learnValidPercent;

                    category.push({vId: vId, vName: vName, totalTime: totalTime});

                    sectionVal.push(section);

                    var vals = [];

                    if(secList.length>0){
                        for(var j=0;j<secList.length;j++){
                            var secO = secList[j];
                            var learnNumRange = secO.learnNumRange;
                            var secEnd = secO.secEnd;
                            var secStart = secO.secStart;
                            var round = learnNumRange * 0.1;

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
                                totalTime : totalTime,
                                color: 'rgb(' + r + ', ' + g + ', ' + b + ')'
                            });

                        }
                    }else{
                        vals.push({
                                secStart: 0,
                                secEnd: 0,
                                learnNumRange: 0,
                                maxLearnNum : 0,
                                totalTime : 0,
                                color: 'rgb(' + 255 + ', ' + 255 + ', ' + 255 + ')'
                            });
                    }

                    val[vId] = vals;


                    var height = 435/items.length;
                    var li = '<li class="tablTab-tab">\
                                                <div class="resdisTabl tableTab" style="padding: 0;">\
                                                    <ul class="clearfix">\
                                                        <li class="resdisTabl-col resdisTabl-col-14" style="width: 80px;height: '+height+'px; line-height:'+height+'px;border: none;">'+learnPercent+'%</li>\
                                                        <li class="resdisTabl-col resdisTabl-col-14" style="width: 80px;height: '+height+'px; line-height:'+height+'px;border: none;">'+learnValidPercent+'%</li>\
                                                    </ul>\
                                                </div>\
                                            </li>';
                    $('#learnHotPercentId').append($(li));

                }

                //数据量太大重新设置高度
                // if (category.length > 10) {
                //     var h = category.length * 40;
                //     // if(category.length < 10){
                //     //     h = category.length * 60;
                //     // }
                //     $("#videoHotId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#videoHotId")[0]);
                // }


                myChart.on('click', function (params) {
                    var data = params.data;
                    if(data && data.itemId && data.value && data.value.length>0){

                        var id = data.itemId;

                        var initTime = data.value[1];

                        //垂直居中
                        var screenHeight = $(parent.window).height();
                        parent.$('.popup_video').css({
                            top: ((screenHeight - parent.$('.popup_video').height()) / 2)
                        });
                        //隐藏禁用滚动条
                        $(parent.document.body).css("overflow", "hidden");
                        $(parent.document.html).css("overflow", "hidden");
                        parent.$('.popup_video').fadeIn(function () {
                            parent.$(this).find('.popup_video_shut').click(function () {
                                //解禁滚动条
                                $(parent.document.body).css("overflow", "auto");
                                $(parent.document.html).css("overflow", "auto");
                                parent.$('.popup_video').fadeOut();
                                parent.$('.mask').fadeOut();
                                parent.$('.popup_video').find('#video_hot_frame').attr('src','');

                            });
                            //请求视频地址
                            parent.$(this).find('#video_hot_frame').attr('src','learn/content_video.html?id=' + id + "&initTime=" + initTime + "&width=580&height=310");
                            //视频弹框下方热度条
                            parent.$(this).find('.popup_video_hot').html('');
                            var secArr = val[id];
                            if(secArr && secArr.length>0){
                                for(var i=0;i<secArr.length;i++){
                                    var obj = secArr[i];
                                    var secEnd = obj.secEnd;
                                    var secStart = obj.secStart;
                                    var maxLearnNum = obj.maxLearnNum;
                                    var totalTime = obj.totalTime;
                                    var color = obj.color;

                                    var w = ((secEnd-secStart)/totalTime * 600) + 'px';
                                    var h = '14px';
                                    var span = '<span style="width: '+w+';height: '+h+';background-color: '+color+';display: inline-block;"></span>';
                                    parent.$(this).find('.popup_video_hot').append(span);
                                }
                            }
                        });
                        parent.$('.mask').fadeIn();

                    }
                });

                StatsCommon.setAssemblyProfileOptions(myChart, category, val, '视频名称', '视频时长','',sectionVal);

                StatsCommonUtill.paginStyle('_videoHot',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

            }



        }

    },token);
}


//视频笔记总数
function getVideoNoteTotal(ec) {
    $("#videoNoteTotalId").width('100%');
    $("#videoNoteTotalId").height('555px');
    var myVideoNoteTotalChart = ec.init($("#videoNoteTotalId")[0]);

    reqVideoNoteTotal(myVideoNoteTotalChart);

    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_videoNoteCount", function (curPage) {
            reqVideoNoteTotal(myVideoNoteTotalChart, curPage);
        });
}

//视频笔记总数请求
function reqVideoNoteTotal(myChart, curPage) {

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

    StatsCommon.ajaxBodyReq('/learn/stats/video/noteCount', JSON.stringify(paramsData) , function (data) {

        myChart.hideLoading();

        var category = [];
        var sectionVal = [];
        var val = [];
        var legendName = '视频笔记总数';

        var rotate = 0;
        $("#videoNoteTotalId").parent().hide();
        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                $("#videoNoteTotalId").parent().show();
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    category.unshift(items[i].title);
                    sectionVal.unshift(items[i].section);
                    val.unshift(items[i].noteNum);
                }

                //数据量太大重新设置高度
                // if (category.length > 10) {
                //     var h = category.length * 25 + 100;
                //     $("#videoNoteTotalId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#videoNoteTotalId")[0]);
                // }
            }

        }

        StatsCommon.setHorizontalBarOptions(myChart, legendName, category, val, '视频名称', '笔记总数', '个','','',sectionVal);

        StatsCommonUtill.paginStyle('_videoNoteCount',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

    },token);
}


//节点题目正确率
function getNodeTitleAccuracy(ec) {
    $("#nodeTitleAccuracyId").width('100%');
    $("#nodeTitleAccuracyId").height('555px');
    var myNodeTitleAccuracyChart = ec.init($("#nodeTitleAccuracyId")[0]);

    reqNodeTitleAccuracy(myNodeTitleAccuracyChart);



    //绑定分页事件
    StatsCommonUtill.paginTrunCallback("_videoTitleAccuracy", function (curPage) {
            reqNodeTitleAccuracy(myNodeTitleAccuracyChart, curPage);
        });
}

//节点题目正确率请求
function reqNodeTitleAccuracy(myChart, curPage) {

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

    StatsCommon.ajaxBodyReq('/learn/stats/video/titleAccuracy', JSON.stringify(paramsData) , function (data) {

        myChart.hideLoading();

        var category = [];
        var sectionVal = [];
        var val = [];
        var legendName = '节点题目正确率';

        var rotate = 0;
        $("#nodeTitleAccuracyId").parent().hide();
        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                $("#nodeTitleAccuracyId").parent().show();
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    category.unshift(items[i].title + "（" + items[i].qNum + "题）");
                    sectionVal.unshift(items[i].section);
                    val.unshift(items[i].rate);
                }

                //数据量太大重新设置高度
                // if (category.length > 10) {
                //     var h = category.length * 25 + 100;
                //     $("#nodeTitleAccuracyId").height(h + 'px');
                //     myChart.dispose();
                //     myChart = echarts.init($("#nodeTitleAccuracyId")[0]);
                // }
            }

        }

        StatsCommon.setHorizontalBarOptions(myChart, legendName, category, val, '视频名称', '节点题目正确率(%)', '%', 100,'',sectionVal);

        StatsCommonUtill.paginStyle('_videoTitleAccuracy',curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);

    },token);
}


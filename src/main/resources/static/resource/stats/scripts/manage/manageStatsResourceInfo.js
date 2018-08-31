//课程分析-资源情况

$(function () {

    //各类资源情况分布图
    getManageResource(echarts);

    //获取活跃课程数
    // getManageActiveCourse('');
    getManageActiveCourse('month');
    getManageActiveCourse('quarter');
    getManageActiveCourse('year');

    getManageCourseResource();



});

function getManageActiveCourse(period){

    var params={};
    params.siteCode = siteCode;
    if('month' == period){
        params.timePeriod = 30;
    }else if('quarter' == period){
        params.timePeriod = 120;
    }else if('year' == period){
        params.timePeriod = 365 ;
    }
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/activeCourse/count',
        JSON.stringify(paramsData), function (data) {

            if (data != null && data.data != null) {
                var courseNum = data.data.courseNum;

                if ('month' == period) {
                    $("#monthActiveId").html(courseNum + "门");
                } else if ('quarter' == period) {
                    $("#quarterActiveId").html(courseNum + "门");
                } else if ('year' == period) {
                    $("#yearActiveId").html(courseNum + "门");
                }
            }

        }, token);

}

/**
 * 课程内资源分布情况处理
 */
function getManageCourseResource(){
    $('.cardTab-con').show();

    var myCoursePieCharts = echarts.init($("#courseResourcePieId")[0]);

    $("#pagin").hide();

    var peroid = 'month';
    var courseInfo = '';
    var sort = 'elective';
    var order = 'desc';

    //周期切换
    $('.cardTab-tab').each(function(){
		$(this).click(function(){
		    $('.cardTab-tab').find('a').removeClass('cardTab-cur');
			var idx = $(this).index(); // 当前点击的一级TAB的索引值
            if(idx==0){
                $(this).find('a').addClass('cardTab-cur');
                // $("#pieTitleTableId").text('月份');
                // $("#courseResourceSearchDataId").attr("placeholder","月份下搜索");
                $("#courseResourceSearchDataId").val('');
                peroid = 'month';
                courseInfo = '';
                sort = 'elective';
                order = 'desc';
                resetOrder();
                getTableData(peroid,'elective','desc','',1,myCoursePieCharts);
            }else if(idx==1){
                $(this).find('a').addClass('cardTab-cur');
                // $("#pieTitleTableId").text('季度');
                // $("#courseResourceSearchDataId").attr("placeholder","季度下搜索");
                $("#courseResourceSearchDataId").val('');
                peroid = 'quarter';
                courseInfo = '';
                sort = 'elective';
                order = 'desc';
                resetOrder();
                getTableData(peroid,'elective','desc','',1,myCoursePieCharts);
            }else if(idx==2){
                $(this).find('a').addClass('cardTab-cur');
                // $("#pieTitleTableId").text('年份');
                // $("#courseResourceSearchDataId").attr("placeholder","年份下搜索");
                $("#courseResourceSearchDataId").val('');
                peroid = 'year';
                courseInfo = '';
                sort = 'elective';
                order = 'desc';
                resetOrder();
                getTableData(peroid,'elective','desc','',1,myCoursePieCharts);
            }

		});
	});

    //搜索
    $("#courseResourceSearchId").click(function(){
        courseInfo = $("#courseResourceSearchDataId").val();
        getTableData(peroid,sort,order,courseInfo,1,myCoursePieCharts);
    });

    //导出
    $("#resourceExportId").click(function () {
        courseInfo = $("#courseResourceSearchDataId").val();
        var timePeriod = 30;
        if ('month' == peroid) {
            timePeriod = 30;
        } else if ('quarter' == peroid) {
            timePeriod = 120;
        } else if ('year' == peroid) {
            timePeriod = 365;
        }
        StatsCommon.location(StatsCommon.getPlatformPath() + '/statistics/manage/activeCourse/export',{
            siteCode : siteCode,
            timePeriod : timePeriod,
            sort : sort,
            order : order,
            courseInfo : courseInfo
        },token);
    });

    //分页start
    $("#pagin_top_next").on("click",function(){
        if(! $(this).hasClass("pagin-disable")){
            var curpage=$("#pagin_curpage").text();
            getTableData(peroid,sort,order,courseInfo,parseInt(curpage)-1,myCoursePieCharts);
        }
    });
    $("#pagin_bottom_next").on("click",function(){
        if(! $(this).hasClass("pagin-disable")){
            var curpage=$("#pagin_curpage").text();
            getTableData(peroid,sort,order,courseInfo,parseInt(curpage)+1,myCoursePieCharts);
        }
    });
    $("#pagin_first_page").on("click",function(){
        if(! $(this).hasClass("pagin-disable")) {
            getTableData(peroid,sort,order,courseInfo,1,myCoursePieCharts);
        }
    });

    $("#pagin_last_page").on("click",function(){
        if(! $(this).hasClass("pagin-disable")){
            var curpage=$("#pagin_last_page").val();
            getTableData(peroid,sort,order,courseInfo,parseInt(curpage),myCoursePieCharts);
        }
    });
    //分页end

    //表格字段排序start
    $("[name='electiveRankId']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
		$(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'elective';
        getTableData(peroid,sort,order,'',1,myCoursePieCharts);
    });
    $("[name='teacherRankId']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
		$(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'teacher';
        getTableData(peroid,sort,order,'',1,myCoursePieCharts);
    });
    $("[name='questionRankId']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
		$(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'question';
        getTableData(peroid,sort,order,'',1,myCoursePieCharts);
    });
    $("[name='resourceRankId']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
		$(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'resource';
        getTableData(peroid,sort,order,'',1,myCoursePieCharts);
    });
    //表格字段排序end

    //初始化
    getTableData(peroid,sort,order,'',1,myCoursePieCharts);


}

/**
 * 设置分页样式
 * @param _curPage
 * @param _pageSize
 * @param _totalPage
 * @param _totalCount
 */
function getManageCourseResourcePagin(_curPage,_pageSize, _totalPage, _totalCount){
    $("#pagin_totalPage").text(_totalPage);
    $("#pagin_curpage").text(_curPage);
    $("#pagin_totalCount").text(_totalCount);
    $("#pagin_last_page").val(_totalPage);
    if(_curPage <=1){
        $("#pagin_top_next").addClass("pagin-disable");
        $("#pagin_first_page").addClass("pagin-disable");
    }else{
        $("#pagin_top_next").removeClass("pagin-disable");
        $("#pagin_first_page").removeClass("pagin-disable");
    }
    if(_curPage >= _totalPage){
        $("#pagin_bottom_next").addClass("pagin-disable");
        $("#pagin_last_page").addClass("pagin-disable");
    }else{
        $("#pagin_bottom_next").removeClass("pagin-disable");
        $("#pagin_last_page").removeClass("pagin-disable");
    }
}

/**
 * 重置排序样式
 */
function resetOrder(){
    $("#electiveRankId").removeClass("icon-ascending").addClass("icon-descending");
    $("#teacherRankId").removeClass("icon-ascending").addClass("icon-descending");
    $("#questionRankId").removeClass("icon-ascending").addClass("icon-descending");
    $("#resourceRankId").removeClass("icon-ascending").addClass("icon-descending");
}

/**
 * 获取表格数据
 * @param period 周期
 * @param _sort 排序属性
 * @param _order 排序方式
 * @param _courseInfo 搜索条件：课程名称或者课程编号
 * @param curPage 当前页
 * @param myCoursePieCharts
 */
function getTableData(period,_sort,_order,_courseInfo,curPage,myCoursePieCharts){

    $("#pagin").hide();
    $("#courseResourcePieId").hide();
    $('#anTab-con-noData .empyt-txt').text('数据加载中');
    $('#anTab-con-noData').show();
    $("#manageCourseResourceDataId").empty();


    if(StatsCommon.isNull(period)){
        return;
    }

    var params={};
    params.siteCode = siteCode;
    if('month' == period){
        params.timePeriod = 30;
    }else if('quarter' == period){
        params.timePeriod = 120;
    }else if('year' == period){
        params.timePeriod = 365 ;
    }

    if(!StatsCommon.isNull(_sort)){
        params.sort=_sort;
    }
    if(!StatsCommon.isNull(_order)){
        params.order=_order;
    }
    params.pageSize=10;
    if(!StatsCommon.isNull(curPage)){
        params.curPage=curPage;
    }
    if(!StatsCommon.isNull(_courseInfo)){
        params.courseInfo=_courseInfo;
    }

    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/activeCourse/list',
        JSON.stringify(paramsData), function (data) {

            if (data != null && data.data != null && data.data.items != null && data.data.items.length>0) {


                var resMap = {};

                var items = data.data.items;

                var lis = '';
                for(var i=0;i<items.length;i++){
                    var sectionNum = items[i].sectionNum;
                    var resourceNum = items[i].resourceNum;
                    var questionNum = items[i].questionNum;
                    var teacherNum = items[i].teacherNum;
                    var courseId = items[i].courseId;
                    var electiveNum = items[i].electiveNum;
                    var chapterNum = items[i].chapterNum;
                    var courseCode = StatsCommon.isNull(items[i].courseCode)?'-':items[i].courseCode;
                    var courseName = StatsCommon.isNull(items[i].courseName)?'-':items[i].courseName;
                    var resourceList = items[i].resourceList;
                    resMap[courseId] = resourceList;

                    lis += '<li class="tablTab-tab" id="'+courseId+'">\
                                <a href="javascript:;" class="'+(i==0?'tablTab-cur':'')+'">\
                                    <div class="resdisTabl">\
                                        <ul class="clearfix">\
                                            <li class="resdisTabl-col resdisTabl-col1" title="'+courseName+'">' + (StatsCommon.cutStr(courseName,9)) + '</li>\
                                            <li class="resdisTabl-col resdisTabl-col2" title="'+courseCode+'">' + (StatsCommon.cutStr(courseCode,4)) + '</li>\
                                            <li class="resdisTabl-col resdisTabl-col3">'+electiveNum+'</li>\
                                            <li class="resdisTabl-col resdisTabl-col4">'+teacherNum+'</li>\
                                            <li class="resdisTabl-col resdisTabl-col5">'+sectionNum+'章，共'+chapterNum+'节</li>\
                                            <li class="resdisTabl-col resdisTabl-col6">'+questionNum+'</li>\
                                            <li class="resdisTabl-col resdisTabl-col7">'+resourceNum+'</li>\
                                        </ul>\
                                    </div>\
                                </a>\
                            </li>';
                }
                if(items.length<10){
                    for(var i=0;i<(10-items.length);i++){
                        lis += '<li class="tablTab-tab">\
                                <a href="javascript:;">\
                                    <div class="resdisTabl">\
                                        <ul class="clearfix">\
                                            <li class="resdisTabl-col resdisTabl-col1">&nbsp;</li>\
                                            <li class="resdisTabl-col resdisTabl-col2">&nbsp;</li>\
                                            <li class="resdisTabl-col resdisTabl-col3">&nbsp;</li>\
                                            <li class="resdisTabl-col resdisTabl-col4">&nbsp;</li>\
                                            <li class="resdisTabl-col resdisTabl-col5">&nbsp;</li>\
                                            <li class="resdisTabl-col resdisTabl-col6">&nbsp;</li>\
                                            <li class="resdisTabl-col resdisTabl-col7">&nbsp;</li>\
                                        </ul>\
                                    </div>\
                                </a>\
                            </li>';
                    }
                }

                $("#manageCourseResourceDataId").html(lis);

                //表格行事件
                $('.tablTab-tab').click(function () {
                    $(this).find('a').addClass('tablTab-cur');
                    $(this).siblings().find('a').removeClass('tablTab-cur');
                    var id = $(this).attr("id");
                    myCoursePieCharts.dispose();
                    myCoursePieCharts = echarts.init($("#courseResourcePieId")[0]);
                    getManageCoursePie(resMap[id],myCoursePieCharts);


                });
                if(data.data.totalPage>1){
                    $("#pagin").show();
                    getManageCourseResourcePagin(curPage,data.data.pageSize, data.data.totalPage, data.data.totalCount);
                }
                $("#courseResourcePieId").show();
                $('#anTab-con-noData').hide();
                //首条数据加载饼图
                var courseId = items[0].courseId;
                myCoursePieCharts.dispose();
                myCoursePieCharts = echarts.init($("#courseResourcePieId")[0]);
                $('#'+courseId).click();
                getManageCoursePie(resMap[courseId],myCoursePieCharts);
            }else{
                $('#anTab-con-noData .empyt-txt').text('暂无数据');
            }

        }, token);
}

/**
 * 查询饼图
 * @param courseId
 * @param myChart
 */
function getManageCoursePie(resources,myChart){

    if(!myChart.isDisposed()) {
        myChart.clear();
    }
    var val = [];
    var legendName = [];
    var colorArray = [];

    for (var key in resources) {
        var resourceType = key;
        var resourceNum = resources[key];
        if(resourceNum>0){
            legendName.push(StatsCommon.getResourceName(resourceType));
            colorArray.push(StatsCommon.getResourceColor(resourceType));
            val.push(resourceNum);
        }

    }
    if (val.length>0) {
        StatsCommon.setEchartsPie(myChart, legendName, '资源类型', val, colorArray,false,'个',StatsCommon.consts.backgroundColor2);
    }else{
        $("#courseResourcePieId").css("background-color",StatsCommon.consts.backgroundColor2);
        $("#courseResourcePieId").addClass("empyt-txt").css({
            "margin":0,
            "line-height":'400px',
            "text-align":"center"
        }).text("暂无数据");
    }
}

/**
 * 各类资源情况分布
 * @param ec
 */
function getManageResource(ec) {
    $("#manageResourceId").width('100%');
    $("#manageResourceId").height('400px');
    var myResourceChart = ec.init($("#manageResourceId")[0]);
    reqManageResource(myResourceChart);
}


//各类资源情况图
function reqManageResource(myChart) {

    var params={};
    params.siteCode = siteCode;
    var paramsData={};
    paramsData.params=params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });
    StatsCommon.ajaxBodyReq('/learn/stats/resource/details',
        JSON.stringify(paramsData), function (data) {

            myChart.hideLoading();

            var val = [];
            var legendName = ['资源数'];
            var colorArray = [];
            var yAxis = {
                title: '总个数',
                name: '个'
            };
            var xAxis = {
                data: [],
                title: '资源类型'
            };
            if (data != null && data.data != null) {
                var resources = data.data.resource;
                var courseNum = data.data.courseNum;
                var resNum = 0;
                var tempVal = [];
                if(resources!=null && resources.length > 0){
                    for (var i = 0; i < resources.length; i++) {
                        var temResNum = resources[i].resourceNum;
                        resNum += temResNum;
                        tempVal.push(temResNum);
                        xAxis.data.push(StatsCommon.getResourceName(resources[i].resourceType));
                        colorArray.push(StatsCommon.getResourceColor(resources[i].resourceType));
                    }
                    val.push(tempVal);
                    StatsCommon.setEchartsBar(myChart, legendName, yAxis, xAxis, val, colorArray, true);
                }

                $("#courseNum").html(courseNum);
                $("#resourceNum").html(resNum);


            }

        }, token);
}

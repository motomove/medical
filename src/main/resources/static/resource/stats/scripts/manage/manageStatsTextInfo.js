/**
 * 管理端图文学习情况
 * @param ec
 */

$(function () {


    //查询是否存在主题讨论类型
    var params={};
    params.siteCode = siteCode;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/resourceType',JSON.stringify(paramsData), function (data) {
        var flag = false;
        if (data != null && data.data != null) {
            var items = data.data;
            for (var i = 0; i < items.length; i++) {
                var resourceType = items[i];
                if(StatsCommon.RESOURCETYPE.TEXT==resourceType){

                    $("#anTab-con-noData").hide();

                    //图文学习人数、点击量与学习时长
                    getManageTextLearn(echarts);

                    //近一周图文学习情况
                    getManageTextTopLearn(echarts);

                    var order = 'desc';
                    var sort = 'hits';

                    //获取图文详细学习情况表格
                    getManageTextAnalysis();

                    //搜索
                    $("#textSearchId").click(function () {
                        var data = $("#textSearchDataId").val();
                        getManageTextAnalysis(1, 10, data);
                    });

                    //导出
                    $("#textExportId").click(function () {
                        var data = $("#textSearchDataId").val();

                        StatsCommon.location(StatsCommon.getPlatformPath() + '/statistics/manage/text/export', {
                            siteCode: siteCode,
                            sort: sort,
                            order: order,
                            courseInfo: data
                        }, token);
                    });


                    //表格字段排序start
                    //点击量
                    $("[name='textHitsId']").unbind("click").click(function () {
                        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
                        var cls = $(this).parent().children('.pd_rankArr').attr("class");
                        if (cls.indexOf('icon-descending') > -1) {
                            order = 'desc';
                        } else {
                            order = 'asc';
                        }
                        sort = 'hits';
                        var data = $("#textSearchDataId").val();
                        getManageTextAnalysis(1, 10, data, sort, order);
                    });
                    //学习总时长
                    $("[name='textLearnTimeId']").unbind("click").click(function () {
                        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
                        var cls = $(this).parent().children('.pd_rankArr').attr("class");
                        if (cls.indexOf('icon-descending') > -1) {
                            order = 'desc';
                        } else {
                            order = 'asc';
                        }
                        sort = 'learnTime';
                        var data = $("#textSearchDataId").val();
                        getManageTextAnalysis(1, 10, data, sort, order);
                    });
                    //平均学习时长
                    $("[name='textAvgLearnTimeId']").unbind("click").click(function () {
                        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
                        var cls = $(this).parent().children('.pd_rankArr').attr("class");
                        if (cls.indexOf('icon-descending') > -1) {
                            order = 'desc';
                        } else {
                            order = 'asc';
                        }
                        sort = 'avgLearnTime';
                        var data = $("#textSearchDataId").val();
                        getManageTextAnalysis(1, 10, data, sort, order);
                    });
                    //批注总数
                    $("[name='textPostilId']").unbind("click").click(function () {
                        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
                        var cls = $(this).parent().children('.pd_rankArr').attr("class");
                        if (cls.indexOf('icon-descending') > -1) {
                            order = 'desc';
                        } else {
                            order = 'asc';
                        }
                        sort = 'postilNum';
                        var data = $("#textSearchDataId").val();
                        getManageTextAnalysis(1, 10, data, sort, order);
                    });
                    //笔记总数
                    $("[name='textNoteId']").unbind("click").click(function () {
                        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
                        var cls = $(this).parent().children('.pd_rankArr').attr("class");
                        if (cls.indexOf('icon-descending') > -1) {
                            order = 'desc';
                        } else {
                            order = 'asc';
                        }
                        sort = 'noteNum';
                        var data = $("#textSearchDataId").val();
                        getManageTextAnalysis(1, 10, data, sort, order);
                    });
                    //朗读次数
                    $("[name='textReadId']").unbind("click").click(function () {
                        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
                        var cls = $(this).parent().children('.pd_rankArr').attr("class");
                        if (cls.indexOf('icon-descending') > -1) {
                            order = 'desc';
                        } else {
                            order = 'asc';
                        }
                        sort = 'readNum';
                        var data = $("#textSearchDataId").val();
                        getManageTextAnalysis(1, 10, data, sort, order);
                    });
                    //表格字段排序end

                    flag = true;
                    break;

                }
            }

        }
        if(!flag){
            $("#anTab-con-noData").find('.empyt-txt').text('暂无数据');
        }

    },token);






});

function getManageTextLearn(ec) {
    $("#anTab-con-1").show();
    $("#manageTextLearnId").width('100%');
    $("#manageTextLearnId").height('304px');
    var manageTextCharts = ec.init($("#manageTextLearnId")[0]);
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForText(manageTextCharts, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' );

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForText(manageTextCharts, $("#gridTabLMA_month_select_week").val(), 'week');
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsForText(manageTextCharts, curDate, 'week');
        }, $("#gridTabLMA_month_select_week").val());

    });
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForText(manageTextCharts, $("#gridTabLMA_month_select_month").text(), 'month');
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsForText(manageTextCharts, curDate, 'month');
        });
    });
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForText(manageTextCharts, $("#gridTabLMA_month_select_year").text(), 'year');
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsForText(manageTextCharts, curDate, 'year');
        });

    });


}


function getManageTextTopLearn(ec) {
    $("#anTab-con-2").show();
    $("#manageTextTopLearnId").width('100%');
    $("#manageTextTopLearnId").height('304px');
    var manageTextTopLearnCharts = ec.init($("#manageTextTopLearnId")[0]);

    var type = 'click';
    $("#title_text_id").children("li").click(function(){
        if($(".anTab-tab a").hasClass("click-disable")){
            return ;
        }
        $(this).siblings().children("a").removeClass("anTab-cur").addClass("click-disable");
        $(this).children("a").addClass("anTab-cur");
        if(type=='click'){
            type = 'time';
        }else{
            type = 'click';
        }
        reqEchatsForTextTopLearn(manageTextTopLearnCharts, type);
    });

    reqEchatsForTextTopLearn(manageTextTopLearnCharts, type);


}

/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 */
function reqEchatsForText(myChart, date, period) {
    var params={};
    params.siteCode = siteCode;
    params.date = date;
    params.period = period;
    params.resourceType = 'text';
    var paramsData={};
    paramsData.params=params;


    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/learnInfo',JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();
        var category = [];
        var val = [];
        var tempVal = [];
        var legendName = [];
        var colorArray = ['#73bdf4', '#86cb83', '#e2b772'];
        if (data != null && data.data != null) {
            legendName=['学习人数', '点击量', '总学习时长'];
            var tooltips = [];
            var yName = [];
            var tempVal2 = [];
            var tempVal3 = [];
            var items = data.data;
            for (var i = 0; i < items.length; i++) {
                tempVal.push(items[i].learnNum);
                tempVal2.push(items[i].hits);
                tempVal3.push(items[i].learnTime);
                if (i == items.length - 1) {
                    val.push(tempVal);
                    val.push(tempVal2);
                    val.push(tempVal3);
                    yName=['人','次','分钟'];
                    tooltips.push({name: '学习人数', isUseX: false});
                    tooltips.push({name: '图文点击量', isUseX: false});
                    tooltips.push({name: '图文总学习时长', isUseX: false});
                }
            }
            category=StatsCommon.Default_category(period, date);
            StatsCommon.setEchartsOptions2(myChart, legendName,yName , val, category, tooltips, 2, colorArray,'','hide',['数量(人或次)','学习时长']);

        }
        $(".gridTabLMA-tab a").removeClass("click-disable");
    },token);
}

/**
 * 获取图表
 * @param myChart
 * @param type 排序方式（click,time）
 */
function reqEchatsForTextTopLearn(myChart, type) {
    var params={};
    params.siteCode = siteCode;
    params.resourceType = 'text';
    params.sort = type;
    var paramsData={};
    paramsData.params=params;


    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/topResource',JSON.stringify(paramsData), function (data) {
        myChart.hideLoading();
        var category = [];
        var val = [];
        var tempVal = [];
        var legendName = [];
        var colorArray = ['#73bdf4', '#86cb83'];
        var yName = [];
        if (data != null && data.data != null && data.data.length>0) {
            legendName=['点击量', '学习时长'];
            var tooltips = [];
            var tempVal2 = [];
            var items = data.data;
            for (var i = 0; i < items.length; i++) {
                tempVal.push(items[i].hits);
                tempVal2.push(items[i].learnTime);
                category.push(items[i].name);
                if (i == items.length - 1) {
                    val.push(tempVal);
                    val.push(tempVal2);
                    tooltips.push({name: '图文点击量', isUseX: false});
                    tooltips.push({name: '图文学习时长', isUseX: false});
                    yName=['次','分钟'];
                }
            }
            $("#manageTextTopLearnId").show();
            $("#anTab-con-noData-topTen").hide();
            StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, 2, colorArray,'','hide',['点击量(次)','学习时长']);

        }else{
            $("#manageTextTopLearnId").hide();
            $("#anTab-con-noData-topTen").show();
        }
        $(".anTab-tab a").removeClass("click-disable");
    },token);
}

function preViewText(id,title){

    parent.layer.open({
      type: 2,
      title: title,
      maxmin: true, //开启最大化最小化按钮
      area: ['893px', '600px'],
      content: '../learn/content_text.html?id=' + id
    });
}

/**
 * 图文详细学习情况分析表
 * @param ec
 */
function getManageTextAnalysis( curPage,pageSize,courseInfo,sort,order) {

    $("#textTableId").show();

    $("#manage_text_table_data").hide();
    $("#manage_text_table_load").show();


    if (StatsCommon.isNull(curPage)) {
        curPage = 1;
    }
    if (StatsCommon.isNull(pageSize)) {
        pageSize = 10;
    }
    if (StatsCommon.isNull(sort)) {
        sort = 'hits';
    }
    if (StatsCommon.isNull(order)) {
        order = 'desc';
    }
    var params={};
    params.siteCode = siteCode;
    params.sort = sort;
    params.order = order;
    params.curPage = curPage;
    params.pageSize = pageSize;
    if(!StatsCommon.isNull(courseInfo)){
        params.courseInfo = courseInfo;
    }
    var paramsData={};
    paramsData.params=params;
    $("#manage_text_page").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath() +'/statistics/manage/text/details?access_token='+token,
        pagerData: JSON.stringify(paramsData),
        isOpenShowPagerBarForOnePage: false,
        curPageNum: curPage,
        pageSizeNum: pageSize,
        dataType: "json",
        contentType:"application/json; charset=utf-8",
        curPageMapperKey: 'curPage',	//设置后台参数映射
        pageSizeMapperKey: 'pageSize',
        pageSizeArr: [10, 20, 30, 50, 100],
        isShowPageSizeSelectToolBar: false,
        isShowTotalPageToolBar: false,
        parsePageData: function (resultData) {	// 解析数据成分页插件支持的数据格式
            var pageData = $.extend(resultData.data, {'totalRow': resultData.data.totalCount});	// 因为后台page.java类中总记录数属性为totalCount，插件中使用的是totalRow，故做个转换
            return pageData;
        },
        pagerCallHandel: function (data, pagerParam) {	//pageData:分页对象json数据
            $("#manageTextDetail").empty();

            if (data != null && data.data != null && data.data.items != null) {
                var items = data.data.items;
                if(items.length>0){
                    for(var i=0;i<items.length;i++){
                        var str ='';
                        var resource =items[i];
                        var resourceName = StatsCommon.isNull(resource.resourceName)?'&nbsp;':resource.resourceName;
                        var courseName = StatsCommon.isNull(resource.courseName)?'&nbsp;':resource.courseName;
                        var courseCode = StatsCommon.isNull(resource.courseCode)?'&nbsp;':resource.courseCode;

                        str+='<li class="tablTab-tab" >';
                        str+='  <div class="resdisTabl ';
                        if(i%2  == 0){
                            str+=' tablTab-cur';
                        }
                        str+='   tableTab">';
                        str+='      <ul class="clearfix">';
                        str+='<li class="resdisTabl-col resdisTabl-col-16 " name="checkLine" title="'+resourceName+'">' + (StatsCommon.cutStr(resourceName,11)) + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-19  " name="checkLine" title="'+courseName+'">' +  (StatsCommon.cutStr(courseName,12))+ '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-16  " name="checkLine" title="'+courseCode+'">' +(StatsCommon.cutStr(courseCode,9))  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.hits + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.learnTime,'分钟','.') + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.avgLearnTime,'分钟','.') + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.postilNum  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.noteNum  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.readNum  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8_none  " name="checkLine">' + '<a href="javascript:preViewText(\''+resource.id+'\',\''+resourceName+'\')">预览</a>'  + '</li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#manageTextDetail").append(str);
                    }

                }else{

                    var str ='';
                    str+='<li class="tablTab-tab" >';
                    str+='  <div class="resdisTabl tablTab-cur tableTab">';
                    str+='      <ul class="clearfix">';
                    str+='<li class="resdisTabl-col resdisTabl-col-99_none " name="checkLine" >暂无数据</li>';
                    str+='      </ul>';
                    str+='  </div>';
                    str+='</li>';
                    $("#manageTextDetail").append(str);
                }

                $("#manage_text_table_data").show();
                $("#manage_text_table_load").hide();

            }

        }
    },token);

}

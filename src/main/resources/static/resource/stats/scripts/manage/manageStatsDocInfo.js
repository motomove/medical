/**
 * 管理端文档学习情况
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
                if(StatsCommon.RESOURCETYPE.DOC==resourceType){

                    $("#anTab-con-noData").hide();

                    //文档学习人数、点击量与学习时长
                    getManageDocLearn(echarts);

                    //近一周文档学习情况
                    getManageDocTopLearn(echarts);

                    var order = 'desc';
                    var sort = 'hits';

                    //获取文档详细学习情况表格
                    getManageDocAnalysis();

                    //搜索
                    $("#docSearchId").click(function () {
                        var data = $("#docSearchDataId").val();
                        getManageDocAnalysis(1, 10, data);
                    });

                    //导出
                    $("#docExportId").click(function () {
                        var data = $("#docSearchDataId").val();

                        StatsCommon.location(StatsCommon.getPlatformPath() + '/statistics/manage/doc/export', {
                            siteCode: siteCode,
                            sort: sort,
                            order: order,
                            condition: data
                        }, token);
                    });


                    //表格字段排序start
                    //点击量
                    $("[name='docHitsId']").unbind("click").click(function () {
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
                        var data = $("#docSearchDataId").val();
                        getManageDocAnalysis(1, 10, data, sort, order);
                    });
                    //学习总时长
                    $("[name='docLearnTimeId']").unbind("click").click(function () {
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
                        var data = $("#docSearchDataId").val();
                        getManageDocAnalysis(1, 10, data, sort, order);
                    });
                    //平均学习时长
                    $("[name='docAvgLearnTimeId']").unbind("click").click(function () {
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
                        var data = $("#docSearchDataId").val();
                        getManageDocAnalysis(1, 10, data, sort, order);
                    });
                    //学习人数
                    $("[name='docTotalNum']").unbind("click").click(function () {
                        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
                        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
                        var cls = $(this).parent().children('.pd_rankArr').attr("class");
                        if (cls.indexOf('icon-descending') > -1) {
                            order = 'desc';
                        } else {
                            order = 'asc';
                        }
                        sort = 'num';
                        var data = $("#docSearchDataId").val();
                        getManageDocAnalysis(1, 10, data, sort, order);
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

function getManageDocLearn(ec) {
    $("#anTab-con-1").show();
    $("#manageDocLearnId").width('100%');
    $("#manageDocLearnId").height('304px');
    var manageDocCharts = ec.init($("#manageDocLearnId")[0]);
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForDoc(manageDocCharts, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' );

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForDoc(manageDocCharts, $("#gridTabLMA_month_select_week").val(), 'week');
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsForDoc(manageDocCharts, curDate, 'week');
        }, $("#gridTabLMA_month_select_week").val());

    });
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForDoc(manageDocCharts, $("#gridTabLMA_month_select_month").text(), 'month');
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsForDoc(manageDocCharts, curDate, 'month');
        });
    });
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForDoc(manageDocCharts, $("#gridTabLMA_month_select_year").text(), 'year');
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsForDoc(manageDocCharts, curDate, 'year');
        });

    });


}


function getManageDocTopLearn(ec) {
    $("#anTab-con-2").show();
    $("#manageDocTopLearnId").width('100%');
    $("#manageDocTopLearnId").height('304px');
    var manageDocTopLearnCharts = ec.init($("#manageDocTopLearnId")[0]);

    var type = 'click';
    $("#title_doc_id").children("li").click(function(){
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
        reqEchatsForDocTopLearn(manageDocTopLearnCharts, type);
    });

    reqEchatsForDocTopLearn(manageDocTopLearnCharts, type);


}

/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 */
function reqEchatsForDoc(myChart, date, period) {
    var params={};
    params.siteCode = siteCode;
    params.date = date;
    params.period = period;
    params.resourceType = StatsCommon.RESOURCETYPE.DOC;
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
function reqEchatsForDocTopLearn(myChart, type) {
    var params={};
    params.siteCode = siteCode;
    params.resourceType = StatsCommon.RESOURCETYPE.DOC;
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
            $("#manageDocTopLearnId").show();
            $("#anTab-con-noData-topTen").hide();
            StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, 2, colorArray,'','hide',['点击量(次)','学习时长']);

        }else{
            $("#manageDocTopLearnId").hide();
            $("#anTab-con-noData-topTen").show();
        }
        $(".anTab-tab a").removeClass("click-disable");
    },token);
}

function preViewDoc(id,title){

    parent.layer.open({
      type: 2,
      title: title,
      maxmin: false, //开启最大化最小化按钮
      area: ['893px', '600px'],
      content: '../learn/content_doc.html?id=' + id
    });
}

/**
 * 图文详细学习情况分析表
 * @param ec
 */
function getManageDocAnalysis( curPage,pageSize,courseInfo,sort,order) {

    $("#docTableId").show();

    $("#manage_doc_table_data").hide();
    $("#manage_doc_table_load").show();


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
        params.condition = courseInfo;
    }
    var paramsData={};
    paramsData.params=params;
    $("#manage_doc_page").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath() +'/statistics/manage/doc/details?access_token='+token,
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
            $("#manageDocDetail").empty();

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
                        str+='<li class="resdisTabl-col resdisTabl-col-19 " name="checkLine" title="'+resourceName+'">' + (StatsCommon.cutStr(resourceName,11)) + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-19  " name="checkLine" title="'+courseName+'">' +  (StatsCommon.cutStr(courseName,12))+ '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-19  " name="checkLine" title="'+courseCode+'">' +(StatsCommon.cutStr(courseCode,9))  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-8_5  " name="checkLine">' + resource.hits + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-8_5  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.learnTime,'分钟','.') + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-8_5  " name="checkLine">' + resource.num  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-8_5  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.avgLearnTime,'分钟','.') + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-7_8_none  " name="checkLine">' + '<a href="javascript:preViewDoc(\''+resource.id+'\',\''+resourceName+'\')">预览</a>'  + '</li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#manageDocDetail").append(str);
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
                    $("#manageDocDetail").append(str);
                }

                $("#manage_doc_table_data").show();
                $("#manage_doc_table_load").hide();

            }

        }
    },token);

}

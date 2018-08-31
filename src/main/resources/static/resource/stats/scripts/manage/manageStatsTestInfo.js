/**
 * 管理端自测每日提交量和平均分
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
                if(StatsCommon.RESOURCETYPE.TEST==resourceType){

                    $("#anTab-con-noData").hide();
                    $("#anTab-con-1").show();

                    //自测每日提交量和平均分
                    getManageTestClickAndAvgScore(echarts);
                    //自测详情表
                    getManageTestAnalysis();

                    flag = true;

                }
            }

        }
        if(!flag){
            $("#anTab-con-noData").find('.empyt-txt').text('暂无数据');
        }

    },token);


    var sort="";
    var order="";

    //搜索
    $("#test_search_id").click(function(){
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data);
    });

    //作答人数
    $("[name='test_totalUser']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'totalUser';
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data, sort, order);
    });
    //作答总次数
    $("[name='test_totalTestNum']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'totalTestNum';
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data, sort, order);
    });
    //作答总用时
    $("[name='test_costTime']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'costTime';
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data, sort, order);
    });
    //平均分
    $("[name='test_score']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'score';
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data, sort, order);
    });
    //0-20分人数比例
    $("[name='test_point0']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'point0';
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data, sort, order);
    });
    //20-40分人数比例
    $("[name='test_point1']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'point1';
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data, sort, order);
    });
    //40-60分人数比例
    $("[name='test_point2']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'point2';
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data, sort, order);
    });
    //60-80分人数比例
    $("[name='test_point3']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'point3';
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data, sort, order);
    });
    //80-100分人数比例
    $("[name='test_point4']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'point4';
        var data = $("#test_search_data_id").val();
        getManageTestAnalysis(1,10,data, sort, order);
    });
    //排序end


    //导出
    $("#test_export").on('click',function () {
        var search = $("#test_search_data_id").val();

        StatsCommon.location(StatsCommon.getPlatformPath() + '/statistics/manage/test/export',{
            siteCode : siteCode,
            condition : search,
            sort : sort,
            order : order,
            exportColumn : ""//扩展字段
        },token);
    });





});

function getManageTestClickAndAvgScore(ec) {
    $("#manageTestSubmit").width('100%');
    $("#manageTestSubmit").height('304px');
    var manageTestCharts = ec.init($("#manageTestSubmit")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/manage/test/learnByDay';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForTest(manageTestCharts, url, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' );

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForTest(manageTestCharts, url, $("#gridTabLMA_month_select_week").val(), 'week');
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsForTest(manageTestCharts, url, curDate, 'week');
        }, $("#gridTabLMA_month_select_week").val());

    });
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForTest(manageTestCharts, url, $("#gridTabLMA_month_select_month").text(), 'month');
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsForTest(manageTestCharts, url, curDate, 'month');
        });
    });
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForTest(manageTestCharts, url, $("#gridTabLMA_month_select_year").text(), 'year');
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsForTest(manageTestCharts, url, curDate, 'year');
        });

    });


}


/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 */
function reqEchatsForTest(myChart, url, date, period) {
    var params={};
    params.siteCode = siteCode;
    params.date = date;
    params.period = period;
    var paramsData={};
    paramsData.params=JSON.stringify(params);
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxReq(url, {
        siteCode: siteCode,
        date: date,
        period: period
    }, function (data) {

        myChart.hideLoading();

        var category = [];
        var val = [];
        var val3 = [];
        var val2 = [];
        var legendName = ['提交量', '平均分'];
        var colorArray = ['#73bdf4','#e2b772'];
        var yName = [];
        var tooltips = [];
        var yTitle=[];
        if (data != null && data.data != null) {
            var items = data.data;
            for (var i = 0; i < items.length; i++) {
                val3.push(items[i].score);
                val2.push(items[i].total);
                if (i == items.length - 1) {
                    var title1 ={
                        name:'提交量(份)'
                    };
                    var title2 ={
                        name:'平均分(分)',
                        max:100
                    };
                    val.push(val2);
                    val.push(val3);
                    yName.push('份');
                    tooltips.push({name: '提交量', isUseX: false});
                    yName.push('分');
                    tooltips.push({name: '平均分', isUseX: false});
                    yTitle.push(title1);
                    yTitle.push(title2);
                }
            }
            category=StatsCommon.Default_category(period, date);
            StatsCommon.setEchartsOptions2(myChart, legendName, yName, val, category, tooltips, '', colorArray, '','hide',yTitle);


        }
            $(".gridTabLMA-tab a").removeClass("click-disable");
        },token);
}


/**
 * 自测成绩分析表
 * @param ec
 */
function getManageTestAnalysis( curPage,pageSize,data,sort,order) {

    $("#manage_test_table_data").hide();
    $("#manage_test_table_load").show();
    $("#manage_course_page").empty();



    if (curPage == "" || curPage == undefined || curPage == null) {
        curPage = 1;
    }
    if (pageSize == "" || pageSize == undefined || pageSize == null) {
        pageSize = 10;
    }
    var params={};
    params.siteCode = siteCode;
    params.curPage = curPage;
    params.pageSize = pageSize;
    params.condition = data;
    params.sort = sort;
    params.order = order;
    var paramsData={};
    paramsData.params=params;

    $("#manage_test_page").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath() +'/statistics/manage/test/analysis?access_token='+token,
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
            $("#manageTestDetail").empty();

            if (data != null && data.data != null && data.data.items != null) {
                var items = data.data.items;
                if(items.length>0){
                    for(var i=0;i<items.length;i++){
                        var str ='';
                        var resource =items[i];
                        if(StatsCommon.isNull(resource.resourceName)){
                            resource.resourceName="&nbsp;"
                        }
                        if(StatsCommon.isNull(resource.courseName)){
                            resource.courseName="&nbsp;"
                        }
                        if(StatsCommon.isNull(resource.code)){
                            resource.code="&nbsp;"
                        }
                        str+='<li class="tablTab-tab" >';
                        str+='  <div class="resdisTabl ';
                        if(i%2  == 0){
                            str+=' tablTab-cur';
                        }
                        str+='   tableTab">';
                        str+='      <ul class="clearfix">';
                        str+='<li class="resdisTabl-col resdisTabl-col-14 " name="checkLine" title="'+resource.resourceName+'">' + (StatsCommon.cutStr(resource.resourceName,8)) + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-14  " name="checkLine" title="'+resource.courseName+'">' +  (StatsCommon.cutStr(resource.courseName,8))+ '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-14  " name="checkLine" title="'+resource.code+'">' +(StatsCommon.cutStr(resource.code,6))  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.totalUser + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.totalTestNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_5  " name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.costTime,'分钟','.') + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-5_5  " name="checkLine">' + resource.score  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.point0  + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.point1  + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.point2  + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + resource.point3  + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8_none  " name="checkLine">' + resource.point4  + '%</li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#manageTestDetail").append(str);
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
                    $("#manageTestDetail").append(str);
                }

                $("#manage_test_table_data").show();
                $("#manage_test_table_load").hide();

            }

        }
    },token);









}

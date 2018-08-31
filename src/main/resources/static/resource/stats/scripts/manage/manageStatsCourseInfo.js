//视频完成情况

$(function () {

    $("#pagin").hide();
    //加载图
    reqCourseCompletion(echarts);
    //加载表
    getManageCourseAnalysis();

    var sort = "";
    var order ="";


    StatsCommonUtill.paginTrunCallback("",function(curPage){
        reqCourseCompletion(echarts,curPage);
    });

    //搜索
    $("#course_search_id").click(function(){
        var data = $("#course_search_data_id").val();
        getManageCourseAnalysis(1,10,data);
    });
    //排序start
    //选课人数
    $("[name='course_eleNum']").unbind("click").click(function(){
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
        sort = 'electiveNum';
        var data = $("#course_search_data_id").val();
        getManageCourseAnalysis(1,10,data, sort, order);
    });
    //节点总数
    $("[name='course_itemNum']").unbind("click").click(function(){
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
        sort = 'itemNum';
        var data = $("#course_search_data_id").val();
        getManageCourseAnalysis(1,10,data, sort, order);
    });
    //总完成率
    $("[name='course_completeRate']").unbind("click").click(function(){
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
        sort = 'rate';
        var data = $("#course_search_data_id").val();
        getManageCourseAnalysis(1,10,data, sort, order);
    });
    //完成0-10%人数比例
    $("[name='course_point0']").unbind("click").click(function(){
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
        var data = $("#course_search_data_id").val();
        getManageCourseAnalysis(1,10,data, sort, order);
    });
    //完成10-40%人数比例
    $("[name='course_point1']").unbind("click").click(function(){
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
        var data = $("#course_search_data_id").val();
        getManageCourseAnalysis(1,10,data, sort, order);
    });
    //完成40-80%人数比例
    $("[name='course_point2']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        cls = $(this).parent().children('.pd_rankArr').attr("class");
        order ="";
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'point2';
        var data = $("#course_search_data_id").val();
        getManageCourseAnalysis(1,10,data, sort, order);
    });
    //完成80%以上人数比例
    $("[name='course_point3']").unbind("click").click(function(){
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
        var data = $("#course_search_data_id").val();
        getManageCourseAnalysis(1,10,data, sort, order);
    });

    //排序end


    //导出
    $("#course_export").on('click',function () {
        var search = $("#course_search_data_id").val();

        StatsCommon.location(StatsCommon.getPlatformPath() + '/statistics/manage/learnCourse/export',{
            siteCode : siteCode,
            condition : search,
            sort : sort,
            order : order,
            exportColumn : ""//扩展字段
        },token);
    });


});



//课程完成情况图
function reqCourseCompletion(ec,curpage) {

    if(StatsCommon.isNull(curpage)){
        curpage = 1;
    }

    $("#manageCourseCompletionId").width('100%');
    $("#manageCourseCompletionId").height('484px');
    var myChart = ec.init($("#manageCourseCompletionId")[0]);

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.siteCode = siteCode;
    params.curPage = curpage;
    params.pageSize = 15;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/learnCourse',JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var jsonArrayData = [];
        var category = [];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];
        var numArray =[];
        var num1 = [];
        var num2 = [];
        var num3 = [];
        var num4 = [];
        if (data != null && data.data != null && data.data.items.length>0) {
            var items = data.data.items;
            for (var i = 0; i < items.length; i++) {
                category.push(StatsCommon.isNull(items[i].name)?'-':items[i].name);

                data1.push((StatsCommon.isNull(items[i].point0)?0:items[i].point0));
                num1.push((StatsCommon.isNull(items[i].num0)?0:items[i].num0));
                data2.push((StatsCommon.isNull(items[i].point1)?0:items[i].point1));
                num2.push((StatsCommon.isNull(items[i].num1)?0:items[i].num1));
                data3.push((StatsCommon.isNull(items[i].point2)?0:items[i].point2));
                num3.push((StatsCommon.isNull(items[i].num2)?0:items[i].num2));
                data4.push((StatsCommon.isNull(items[i].point3)?0:items[i].point3));
                num4.push((StatsCommon.isNull(items[i].num3)?0:items[i].num3));

            }


        }
        numArray.push(num1);
        numArray.push(num2);
        numArray.push(num3);
        numArray.push(num4);

        jsonArrayData.push({legend: '完成0-10%', data: data1, color: '#f2dfa8'});
        jsonArrayData.push({legend: '完成10-40%', data: data2, color: '#b4cd7a'});
        jsonArrayData.push({legend: '完成40-80%', data: data3, color: '#86cb83'});
        jsonArrayData.push({legend: StatsCommon.VideoCompletion.More80, data: data4, color: '#73bdf4'});

        StatsCommon.setPileUpBarOptions(myChart, jsonArrayData, category, 30, '完成人数分布(%)', '课程名称', 'top', '%',numArray,100);
        StatsCommonUtill.paginStyle("",curpage,data.data.pageSize, data.data.totalPage, data.data.totalCount);
    },token);
}


/**
 * 课程成绩分析表
 * @param ec
 */
function getManageCourseAnalysis( curPage,pageSize,search,sort,order) {

    $("#manage_course_table_data").hide();
    $("#manage_course_table_load").show();
    $("#manage_test_page").empty();



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
    params.condition = search;
    params.sort = sort;
    params.order = order;
    var paramsData={};
    paramsData.params=params;

    $("#manage_course_page").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath() +'/statistics/manage/learnCourseAnalysis?access_token='+token,
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
            $("#manageCourseDetail").empty();
            if (data != null && data.data != null && data.data.items != null) {
                var items = data.data.items;
                if(items.length>0){
                    for(var i=0;i<items.length;i++){
                        var str ='';
                        var resource =items[i];
                        var name = StatsCommon.isNull(resource.courseName)?'&nbsp;':resource.courseName;
                        var code = StatsCommon.isNull(resource.courseCode)?'&nbsp;':resource.courseCode;
                        str+='<li class="tablTab-tab" >';
                        str+='  <div class="resdisTabl ';
                        if(i%2  == 0){
                            str+=' tablTab-cur';
                        }
                        str+='   tableTab">';
                        str+='      <ul class="clearfix">'
                        str+='<li class="resdisTabl-col resdisTabl-col-25 " name="checkLine" title="'+name+'">' + (StatsCommon.cutStr(name, 16)) + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-19 " name="checkLine" title="'+code+'">' + (StatsCommon.cutStr(code, 9)) + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8 " name="checkLine" >' + resource.electiveNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8" name="checkLine">' + resource.itemNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8" name="checkLine">' + resource.rate + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-8_5" name="checkLine">' + (StatsCommon.isNull(resource.point0)?0:resource.point0) + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-8_5" name="checkLine">' + (StatsCommon.isNull(resource.point1)?0:resource.point1) + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-8_5" name="checkLine">' + (StatsCommon.isNull(resource.point2)?0:resource.point2) + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-9_none" name="checkLine">' + (StatsCommon.isNull(resource.point3)?0:resource.point3) + '%</li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#manageCourseDetail").append(str);
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
                    $("#manageCourseDetail").append(str);
                }

                $("#manage_course_table_data").show();
                $("#manage_course_table_load").hide();

            }

        }
    },token);









}

/**
 * Created by whaty on 2017/11/24.
 */

$(function () {

    //课程平均健康度
    getAvgHealthyInfo(echarts);

    //课程平均健康度text显示，及前五后五健康度课程图表显示
    getHealthyData();

    var sort = 'healthy';
    var order = 'desc';

    //健康度表格
    getManagehealthyTable();

    $("#healthySearchId").click(function(){
        var data = $("#healthySearchDataId").val();
        getManagehealthyTable(1,10,data);
    });

    //导出
    $("#healthyExportId").click(function () {
        var data = $("#healthySearchDataId").val();

        StatsCommon.location(StatsCommon.getPlatformPath() + '/manage/healthy/export', {
            siteCode: siteCode,
            sort: sort,
            order: order,
            courseInfo: data
        }, token);
    });

    //表格字段排序start
    //健康度排序
    $("[name='healthyRankId']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
		$(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'healthy';
        var data = $("#healthySearchDataId").val();
        getManagehealthyTable(1,10,data, sort, order);
    });
    //选课规模排序
    $("[name='healthyElectiveRankId']").unbind("click").click(function(){
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
        var data = $("#healthySearchDataId").val();
        getManagehealthyTable(1,10,data, sort, order);
    });
    //教师参与度排序
    $("[name='healthyTeacherPartRankId']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
		$(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'teacherPart';
        var data = $("#healthySearchDataId").val();
        getManagehealthyTable(1,10,data, sort, order);
    });
    //学生参与度排序
    $("[name='healthyStudentPartRankId']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
		$(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'studentPart';
        var data = $("#healthySearchDataId").val();
        getManagehealthyTable(1,10,data, sort, order);
    });
    //人均学习时长排序
    $("[name='healthyLearnTimeRankId']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
		$(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'learnTime';
        var data = $("#healthySearchDataId").val();
        getManagehealthyTable(1,10,data, sort, order);
    });
    //完成率排序
    $("[name='healthyCompleteRankId']").unbind("click").click(function(){
        $(this).parent().siblings().children('.pd_rankArr').removeClass('icon-ascending').addClass('icon-descending');
        $(this).parent().children('.pd_rankArr').toggleClass('icon-descending');
		$(this).parent().children('.pd_rankArr').toggleClass('icon-ascending');
        var cls = $(this).parent().children('.pd_rankArr').attr("class");
        if(cls.indexOf('icon-descending') > -1){
            order = 'desc';
        }else{
            order = 'asc';
        }
        sort = 'completeRate';
        var data = $("#healthySearchDataId").val();
        getManagehealthyTable(1,10,data, sort, order);
    });
    //表格字段排序end

});


//课程平均健康度
function getAvgHealthyInfo(ec) {
    $("#avgHealthyId").width('100%');
    $("#avgHealthyId").height('400px');


    var myAvgHealthyChart = ec.init($("#avgHealthyId")[0]);
    var period = 'month';
    var selectDate = StatsCommon.formatDate(new Date(new Date() - 24 * 60 * 60 * 1000), 'yyyy-MM');
    $("#healthyMonthId").text(selectDate);

    //月
    $("#gridTabG1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'month';
        var dateStr = $("#healthyMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date() - 24 * 60 * 60 * 1000), 'yyyy-MM');
            $("#healthyMonthId").text(dateStr);
        }
        selectDate = dateStr;
        reqAvgHealthy(myAvgHealthyChart, selectDate, period);
    });
    //年
    $("#gridTabG2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'year';
        var dateStr = $("#healthyYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date() - 24 * 60 * 60 * 1000), 'yyyy');
            $("#healthyYearId").text(dateStr);
        }
        selectDate = dateStr;
        reqAvgHealthy(myAvgHealthyChart, selectDate, period);
    });

    //月日期控件
    $("#healthyMonthId").unbind("click").click(function () {
        if($(".gridTabG-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqAvgHealthy(myAvgHealthyChart, selectDate, period);
        });
    });
    //年日期控件
    $("#healthyYearId").unbind("click").click(function () {
        if($(".gridTabG-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqAvgHealthy(myAvgHealthyChart, selectDate, period);
        });
    });

    reqAvgHealthy(myAvgHealthyChart, selectDate, period);

}

function reqAvgHealthy(myChart, date, period) {

    var params = {};
    params.siteCode = siteCode;
    params.period = period;
    params.date = date;
    var paramsData = {};
    paramsData.params = params;

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/manage/healthy/period/avgInfo',
        JSON.stringify(paramsData), function (data) {

            myChart.hideLoading();

            var val = [];
            var avgHealthyVal = [];
            var avgLearnTimeVal = [];
            var avgTeacherPartVal = [];
            var avgStudentPartVal = [];
            var avgElectiveNumVal = [];
            var avgCompleteRateVal = [];
            var legendName = ['平均健康度','平均人均学习时长','平均教师参与度','平均学生参与度','平均选课规模','平均学习完成率'];
            var colorArray = ['#c59788', '#b18c57', '#bdafab', '#a6c2b5', '#8aa192',
                '#7d9fa4', '#7e7f81', '#6b7479', '#6b8a9f', '#69a3c6',
                '#65b0c1'];
            var yAxis = {
                title: '平均健康度',
                name: ''
            };
            var xAxis = {
                data: StatsCommon.Default_category(period, date),
                title: '时间'
            };

            if (data != null && data.data != null && data.data.length > 0) {
                var items = data.data;

                for (var i = 0; i < items.length; i++) {
                    avgHealthyVal.push(items[i].healthy);
                    avgLearnTimeVal.push(items[i].avgLearnTimePercent);
                    avgTeacherPartVal.push(items[i].teacherPartPercent);
                    avgStudentPartVal.push(items[i].studentPartPercent);
                    avgElectiveNumVal.push(items[i].electiveNumPercent);
                    avgCompleteRateVal.push(items[i].completeRatePercent);
                }
                val=[avgHealthyVal,avgLearnTimeVal,avgTeacherPartVal,avgStudentPartVal,avgElectiveNumVal,avgCompleteRateVal];
                StatsCommon.setEchartsLine(myChart, legendName, yAxis, xAxis, val, colorArray);
            }
            $(".gridTabG-tab a").removeClass("click-disable");
        }, token);
}

function getHealthyData(){

    var params = {};
    params.siteCode = siteCode;
    var paramsData = {};
    paramsData.params = params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/manage/healthy/avgInfo',
        JSON.stringify(paramsData), function (data) {

            if (data != null && data.data != null) {
                var item = data.data;

                var avgHealthy = item.avgHealthy;
                var moreNum = item.moreNum;
                var lessNum = item.lessNum;
                var courseNum = item.courseNum;

                var curDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000),'yyyy年MM月dd日');

                $("#curDateId").html(curDate);
                $("#avgHealthyDataId").html(avgHealthy);
                $("#lessHealthyDataId").html(lessNum);
                $("#moreHealthyDataId").html(moreNum);

                if(courseNum>10){
                    $("#moreHealthyId").width('100%');
                    $("#moreHealthyId").height('500px');
                    var myMoreChart = echarts.init($("#moreHealthyId")[0]);
                    getTopHealthy(myMoreChart, 'desc', 0.7,'bottom');

                    $("#lessHealthyId").width('100%');
                    $("#lessHealthyId").height('500px');
                    var myLessChart = echarts.init($("#lessHealthyId")[0]);
                    getTopHealthy(myLessChart, 'asc', 0.7,'bottom');


                }else{

                    $("#ulHealthyId").find(".float_two").hide();
                    $("#ulHealthyId").find(".float_one").show();

                    $("#oneHealthyId").width('100%');
                    $("#oneHealthyId").height('450px');
                    var myMoreChart = echarts.init($("#oneHealthyId")[0]);
                    if($("#oneHealthyId").width()<900){
                        getTopHealthy(myMoreChart, 'desc', 0.8,'bottom');
                    }else{
                        getTopHealthy(myMoreChart, 'desc', 0.8,'right');
                    }
                }

            }
        }, token);
}

/**
 *
 * @param myChart
 * @param order 排序方式 desc/asc
 * @param percent 图形大小占用容器百分比 (0~1)
 */
function getTopHealthy(myChart, order, percent, legendPostion) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.siteCode = siteCode;
    params.pageSize = 5;
    params.sort = 'healthy';
    params.order = order;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/manage/healthy/list',JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        if (data != null && data.data != null && data.data.items != null && data.data.items.length>0) {
            var items=data.data.items;
            var options = [];
            var dataArr=[];
            var colorArray = ['#c59788', '#b18c57', '#bdafab', '#a6c2b5', '#8aa192'];
            var tooltips = ['选课规模指数','教师参与度','学生参与度','学习完成率指数','人均学习时长指数'];
            options.push({name:'选课规模',max:100});
            options.push({name:'教师参与度',max:100});
            options.push({name:'学生参与度',max:100});
            options.push({name:'学习完成率',max:100});
            options.push({name:'人均学习时长',max:100});

            var title = '健康度排名前五课程';
            if('asc'.toLowerCase() == order){
                title = '健康度排名后五课程';
            }

            for(var i=0;i<items.length;i++){
                var courseName = StatsCommon.isNull(items[i].courseName)?'课程'+i:items[i].courseName;
                var courseCode = StatsCommon.isNull(items[i].courseCode)?'课程编号'+i:items[i].courseCode;
                var avgLearnTimePercent = items[i].avgLearnTimePercent;
                var electiveNumPercent = items[i].electiveNumPercent;
                var teacherPartPercent = items[i].teacherPartPercent;
                var completeRatePercent = items[i].completeRatePercent;
                var studentPartPercent = items[i].studentPartPercent;
                var healthy = items[i].healthy;
                dataArr.push({
                    name:courseName + ' 健康度: ' + healthy,
                    value:[electiveNumPercent,teacherPartPercent,studentPartPercent,completeRatePercent,avgLearnTimePercent]
                });

                //如果有任意一门课程名称过长，都将图例置为底部
                if(StatsCommon.getStrLength(courseName) > 17){
                    legendPostion='bottom';
                    $("#oneHealthyId").height('500px');
                    myChart.dispose();
                    myChart = echarts.init($("#oneHealthyId")[0]);
                }
            }

            StatsCommon.setEchartsRadar(myChart,'',true,options,dataArr,colorArray,false,percent,legendPostion,tooltips);


        }


    },token);
}

/**
 * 查看健康度详细信息
 * @param courseId
 */
function healthyDetail(courseId){
    window.open(StatsCommon.getPlatformPath() + '/stats/index.html?courseId='+courseId);
}

/**
 * 健康度详细表
 * @param ec
 */
function getManagehealthyTable(curPage,pageSize,courseInfo,sort,order) {

    $("#manage_healthy_table_data").hide();
    $("#manage_healthy_table_load").show();

    if (StatsCommon.isNull(curPage)) {
        curPage = 1;
    }
    if (StatsCommon.isNull(pageSize)) {
        pageSize = 10;
    }
    if (StatsCommon.isNull(sort)) {
        sort = 'healthy';
    }
    if (StatsCommon.isNull(order)) {
        order = 'desc';
    }
    var params={};
    params.siteCode = siteCode;
    params.sort = sort;
    params.order = order;
    if(!StatsCommon.isNull(courseInfo)){
        params.courseInfo = courseInfo;
    }
    params.curPage = curPage;
    params.pageSize = pageSize;
    var paramsData={};
    paramsData.params=params;
    $("#manage_healthy_page").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath() +'/manage/healthy/list?access_token='+token,
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
            $("#managehealthyDetail").empty();
            if (data != null && data.data != null && data.data.items != null) {
                var items = data.data.items;
                if(items.length>0){
                    for(var i=0;i<items.length;i++){
                        var str ='';
                        var course =items[i];
                        if(StatsCommon.isNull(course.courseName)){
                            course.courseName="&nbsp;"
                        }
                        if(StatsCommon.isNull(course.courseCode)){
                            course.courseCode="&nbsp;"
                        }
                        str+='<li class="tablTab-tab" >';
                        str+='  <div class="resdisTabl ';
                        if(i%2  == 0){
                            str+=' tablTab-cur';
                        }
                        str+='   tableTab">';
                        str+='      <ul class="clearfix">';
                        str+='<li class="resdisTabl-col resdisTabl-col-25 " name="checkLine" title="'+course.courseName+'">' + (StatsCommon.cutStr(course.courseName,16)) + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-19  " name="checkLine" title="'+course.courseCode+'">' +  (StatsCommon.cutStr(course.courseCode,10))+ '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' +course.rank  + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + course.healthy + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + course.electiveNum + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + course.teacherPartPercent + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + course.studentPartPercent + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + StatsCommon.changeLearnTimeHours(course.avgLearnTime,"分钟",".") + '</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8  " name="checkLine">' + course.completeRate  + '%</li>';
                        str+='<li class="resdisTabl-col resdisTabl-col-6_8_none  " name="checkLine" ><a href="javascript:healthyDetail(\''+course.courseId+'\')" >详细</a></li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#managehealthyDetail").append(str);
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
                    $("#managehealthyDetail").append(str);
                }

                $("#manage_healthy_table_data").show();
                $("#manage_healthy_table_load").hide();

            }

        }
    },token);

}


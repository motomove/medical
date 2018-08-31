/**
 * Created by whaty on 2017/8/15.
 */

$(function () {

    //总学习时长统计图
    getTotalLearnTime(echarts);

    //平均学习时长统计图
    getAvgLearnTime(echarts);


    if(!device.mobile()){
        //教师参与详细数据
        queryTeachingDetial();

        //搜索
        $('#video_search_id').on('click', function () {
            var semester = $("#teaching_semester").combobox('getValue');
            var search = $('#video_search_data_id').val();
            queryDetial(StatsCommon.getPlatformPath() + "/statistics/teacherDetailedData", 1, 10, search, "", "",  "site", "teaching_page","", semester)
        });
    } else{
        $('.dashboard').hide();
    }

    
    //排序
    $('#teacher_join_detial').on('click', '.detial_sort', function () {
        $('.pd_rankArr').css('color', '#999');
        var _sort = $(this).find('.pd_rankArr');
        _sort.css('color', '#0096ff');
        var sort = _sort.attr('id'), order = '';
        if(_sort.hasClass('icon-ascending')){
            order = 'asc';
        }

        if(_sort.hasClass('icon-descending')){
            order = 'desc';
        }

        var semester = $("#teaching_semester").combobox('getValue');
        var search = $('#video_search_data_id').val();
        queryDetial(StatsCommon.getPlatformPath() + "/statistics/teacherDetailedData", 1, 10, search, sort, order,  "site", "teaching_page", "", semester)
    });

});

//地址
var studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherTeachingHoursDay';


/**
 * 教师参与详细数据
 */
function queryTeachingDetial() {
    querySemester("", "teaching_semester", "", function (newValue) {
        var semester = '';
        if(undefined == newValue){
            semester = $("#teaching_semester").combobox('getValue');
        } else {
            semester = newValue.name;
        }

        queryDetial(StatsCommon.getPlatformPath() + "/statistics/teacherDetailedData", 1, 10, "", "", "",  "site", "teaching_page", "", semester);
    });

}

/**
 * 详细数据
 * @param ec
 */
function queryDetial(url, curPage,pageSize,search ,sort ,order, callback, pageDom, pageObject, semesterName) {
    $("#manage_video_table_data").hide();
    $("#manage_video_table_load").show();
    pageObject = undefined == pageObject ? '' : pageObject;

    if (curPage == "" || curPage == undefined || curPage == null) {
        curPage = 1;
    }
    if (pageSize == "" || pageSize == undefined || pageSize == null) {
        pageSize = 10;
    }
    var params={};
    params.semesterName = semesterName;
    params.pageSize = pageSize;
    params.search = search;
    params.sort = sort;
    params.order = order;
    params.cur = curPage;
    params.type = callback;
    var paramsData = {};
    paramsData.params = params;

    $("#" + pageDom).whatyPager({
        pagerUrl: url,
        pagerData: JSON.stringify(params),
        isOpenShowPagerBarForOnePage: false,
        curPageNum: curPage,
        pageSizeNum: pageSize,
        // pageObject : pageObject,
        dataType: "json",
        // contentType:"application/json; charset=utf-8",
        curPageMapperKey: 'curPage',	//设置后台参数映射
        pageSizeMapperKey: 'pageSize',
        pageSizeArr: [10, 20, 30, 50, 100],
        isShowPageSizeSelectToolBar: false,
        isShowTotalPageToolBar: false,
        parsePageData: function (resultData) {	// 解析数据成分页插件支持的数据格式
            var pageData = $.extend(resultData.data, {'totalRow': resultData.data.totalNumber});	// 因为后台page.java类中总记录数属性为totalCount，插件中使用的是totalRow，故做个转换
            return pageData;
        },
        pagerCallHandel: function (data, pagerParam) {	//pageData:分页对象json数据
            $("#manageVideoDetail").empty();
            if (data != null && data.data != null && data.data.list != null) {
                var items = data.data.list;
                var cur = $('#teaching_page').find("#pageNum").val();
                cur = StatsCommon.isNull(cur) ? 0 : cur;
                if(items.length>0){
                    for(var i=0;i<items.length;i++){
                        var str ='';
                        var resource =items[i];
                        str+='<li class="tablTab-tab" >';
                        str+='  <div class="resdisTabl ';
                        if(i%2  == 0){
                            str+=' tablTab-cur';
                        }
                        str+='   tableTab">';
                        str+='      <ul class="clearfix">';
                        str+='          <li class="resdisTabl-col resdisTabl-col4" name="checkLine">' + resource.login_id+ '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-10" name="checkLine">' + resource.teacher_name+ '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-10" name="checkLine">' + resource.course_name+ '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-10" name="checkLine">' + resource.course_code+ '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (StatsCommon.isNull(resource.participation_integral) ? '0': resource.participation_integral)+ '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (StatsCommon.isNull(resource.job_correction) ? '0': resource.job_correction)+ '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (StatsCommon.isNull(resource.post_reply) ? '0': resource.post_reply) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (StatsCommon.isNull(resource.set_essence) ? '0': resource.set_essence) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (StatsCommon.isNull(resource.set_lrrigation) ? '0': resource.set_lrrigation) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (StatsCommon.isNull(resource.set_top) ? '0': resource.set_top) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (StatsCommon.isNull(resource.notes_recommended) ? '0': resource.notes_recommended) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (StatsCommon.isNull(resource.answer_reply) ? '0': resource.answer_reply) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (StatsCommon.isNull(resource.answer_recommended) ? '0': resource.answer_recommended) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-6_8_none" name="checkLine">' + StatsCommon.changeLearnTimeHours(resource.teaching_time,"分钟",".") + '</li>';
                        str+='      </ul>';
                        str+='  </div>';
                        str+='</li>';
                        $("#manageVideoDetail").append(str);
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
                    $("#manageVideoDetail").append(str);
                }

                $("#manage_video_table_data").show();
                $("#manage_video_table_load").hide();

            }
        }
    },token);

}

/**
 * 查询学期
 * @param myChart
 * @param objDomId
 */
function querySemester(myChart, objDomId, curpage, callback) {
    $("#" + objDomId).combobox({
        url: StatsCommon.getPlatformPath() + '/statistics/combobox?type=semester' ,
        valueField: 'Id',
        textField: 'name',
        width: 200,
        height: 30,
        listHeight:20,
        panelHeight:0,
        formatter: function(row) {
            return row.name;
        },
        onSelect: callback,
        onLoadSuccess:function(data){
            var _data = $("#" + objDomId).combobox('getData');
            if(_data != null && _data.meta != null ){
                if (data != null && data.data != null && data.data.list != undefined) {
                    var items = data.data.list;
                    var tempArr = [];
                    var values=[];
                    for(var i=0;i<items.length;i++){
                        if(items[i].flag_active == '1'){
                            values.push({name:items[i].name, Id:""});
                        } else {
                            tempArr.push({name:items[i].name, Id:items[i].name});
                        }
                    }
                    values = values.concat(tempArr);
                    $("#" + objDomId).combobox('loadData', values);
                }

            } else {
                $("#" + objDomId).combobox('select', _data[0].name);
            }
        }
    });
}

/*

//学习时长分布统计图（月历图，堆叠条形图）
function getLearnTimeCalendar(ec) {
    $("#learnTimeCalendarId").width('100%');
    $("#learnTimeCalendarId").height(500);
    var myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#learnTimeCalendarWeekId").val(selectDate);
    $("#learnTimeCalendarWeekId").html(week.MON + '-' + week.SUN);

    //周
    $("#gridTabC1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'week';
        var dateStr = $("#learnTimeCalendarWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        $("#learnTimeCalendarId").height(500);
        myLearnTimeCalendarChart.dispose();
        myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);
        reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
        $("#calendarDataId").hide();
    });
    //月
    $("#gridTabC2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'month';
        var dateStr = $("#learnTimeCalendarMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#learnTimeCalendarMonthId").text(dateStr);
        }
        selectDate = dateStr;

        var weekLength = StatsCommon.getMonthOfWeekDate(period, selectDate);
        if (weekLength.length > 5) {
            $("#learnTimeCalendarId").height(750);
        } else {
            $("#learnTimeCalendarId").height(680);
        }
        myLearnTimeCalendarChart.dispose();
        myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);


        reqLearnTimeCalendar(myLearnTimeCalendarChart, selectDate, period);
        $("#calendarDataId").show();
    });
    //年
    $("#gridTabC3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'year';
        var dateStr = $("#learnTimeCalendarYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#learnTimeCalendarYearId").text(dateStr);
        }
        selectDate = dateStr;
        $("#learnTimeCalendarId").height(500);
        myLearnTimeCalendarChart.dispose();
        myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);
        reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
        $("#calendarDataId").hide();
    });

    //周日期控件
    $("#learnTimeCalendarWeekId").unbind("click").click(function () {
        if($(".gridTabC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
        },$(this).val());
    });
    //月日期控件
    $("#learnTimeCalendarMonthId").unbind("click").click(function () {
        if($(".gridTabC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');

            var weekLength =  StatsCommon.getMonthOfWeekDate(period,selectDate);
            if(weekLength.length > 5){
                $("#learnTimeCalendarId").height(750);
            }else{
                $("#learnTimeCalendarId").height(680);
            }
            myLearnTimeCalendarChart.dispose();
            myLearnTimeCalendarChart = ec.init($("#learnTimeCalendarId")[0]);

            reqLearnTimeCalendar(myLearnTimeCalendarChart, selectDate, period);
        });
    });
    //年日期控件
    $("#learnTimeCalendarYearId").unbind("click").click(function () {
        if($(".gridTabC-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
        });
    });

    reqLearnTimeBar(myLearnTimeCalendarChart, selectDate, period);
    $("#calendarDataId").hide();
}



//学习时间段分布折线图
function getLearnPoint(ec) {
    $("#learnPointId").width('100%');
    $("#learnPointId").height('304px');
    var myLearnPointChart = ec.init($("#learnPointId")[0]);

    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    $("#learnPointWeekId").val(selectDate);
    $("#learnPointWeekId").html(week.MON + '-' + week.SUN);

    //周
    $("#gridTabF1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return;
        }
        $("#timeDis_switch_line_id").show();
        period = 'week';
        var dateStr = $("#learnPointWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        reqLearnPoint(myLearnPointChart, selectDate, period);
    });
    //月
    $("#gridTabF2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return;
        }
        $("#timeDis_switch_line_id").hide();
        period = 'month';
        var dateStr = $("#learnPointMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#learnPointMonthId").text(dateStr);
        }
        selectDate = dateStr;
        reqLearnPoint(myLearnPointChart, selectDate, period);
    });
    //年
    $("#gridTabF3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return;
        }
        $("#timeDis_switch_line_id").hide();
        period = 'year';
        var dateStr = $("#learnPointYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#learnPointYearId").text(dateStr);
        }
        selectDate = dateStr;
        reqLearnPoint(myLearnPointChart, selectDate, period);
    });

    //周日期控件
    $("#learnPointWeekId").unbind("click").click(function () {
        if($(".gridTabF-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqLearnPoint(myLearnPointChart, selectDate, period);
        },$(this).val());
    });
    //月日期控件
    $("#learnPointMonthId").unbind("click").click(function () {
        if($(".gridTabF-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqLearnPoint(myLearnPointChart, selectDate, period);
        });
    });
    //年日期控件
    $("#learnPointYearId").unbind("click").click(function () {
        if($(".gridTabF-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqLearnPoint(myLearnPointChart, selectDate, period);
        });
    });

    reqLearnPoint(myLearnPointChart, selectDate, period);

}
*/

//总学习时长统计图
function getTotalLearnTime(ec) {
    $("#totalLearnTimeId").width('100%');
    $("#totalLearnTimeId").height('304px');


    var myTotalLearnTimeChart = ec.init($("#totalLearnTimeId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    var weekDate = StatsCommon.getWeekDays(selectDate);
    var mon = weekDate.MON, sun = weekDate.SUN;
    $("#totalWeekId").val(selectDate);
    $("#totalWeekId").html(week.MON + '-' + week.SUN);

    //周
    $("#gridTab1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'week';
        var dateStr = $("#totalWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        var weekDate = StatsCommon.getWeekDays(selectDate);
        var mon = weekDate.MON, sun = weekDate.SUN;
        studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherTeachingHoursDay';
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', mon, sun);
    });
    //月
    $("#gridTab2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'month';
        var dateStr = $("#totalMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#totalMonthId").text(dateStr);
        }
        selectDate = dateStr;
        var first = selectDate + '-01', end = selectDate + '-31';
        studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherTeachingHoursDay';
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', first, end);
    });
    //年
    $("#gridTab3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'year';
        var dateStr = $("#totalYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#totalYearId").text(dateStr);
        }
        selectDate = dateStr;
        studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherTeachingHoursYear';
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
    });

    //周日期控件
    $("#totalWeekId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            var weekDate = StatsCommon.getWeekDays(selectDate);
            var mon = weekDate.MON, sun = weekDate.SUN;
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherTeachingHoursDay';
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', mon, sun);
        },$(this).val());
    });
    //月日期控件
    $("#totalMonthId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            var first = selectDate + '-01', end = selectDate + '-31';
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherTeachingHoursDay';
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', first, end);
        });
    });
    //年日期控件
    $("#totalYearId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherTeachingHoursYear';
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
        });
    });

    studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherTeachingHoursDay';
    // reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all', mon, sun);
    $("#gridTab3").trigger('click');

}

//平均学习时长统计图
function getAvgLearnTime(ec) {
    $("#avgLearnTimeId").width('100%');
    $("#avgLearnTimeId").height('304px');
    var myAvgLearnTimeChart = ec.init($("#avgLearnTimeId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
    var weekDate = StatsCommon.getWeekDays(selectDate);
    var mon = weekDate.MON, sun = weekDate.SUN;
    $("#avgWeekId").val(selectDate);
    $("#avgWeekId").html(week.MON + '-' + week.SUN);


    $("#gridTabB1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'week';
        var dateStr = $("#avgWeekId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
        }
        selectDate = dateStr;
        var weekDate = StatsCommon.getWeekDays(selectDate);
        var mon = weekDate.MON, sun = weekDate.SUN;
        studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherAverageTeachingHoursDay';
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', mon, sun);
    });
    $("#gridTabB2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'month';
        var dateStr = $("#avgMonthId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy-MM');
            $("#avgMonthId").text(dateStr);
        }
        selectDate = dateStr;
        studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherAverageTeachingHoursDay';
        var first = selectDate + '-01', end = selectDate + '-31';
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', first, end);
    });
    $("#gridTabB3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        period = 'year';
        var dateStr = $("#avgYearId").val();
        if (!dateStr) {
            dateStr = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000), 'yyyy');
            $("#avgYearId").text(dateStr);
        }
        selectDate = dateStr;
        studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherAverageTeachingHoursYear';
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
    });


    //周日期控件
    $("#avgWeekId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            var weekDate = StatsCommon.getWeekDays(selectDate);
            var mon = weekDate.MON, sun = weekDate.SUN;
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherAverageTeachingHoursDay';
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', mon, sun);
        },$(this).val());
    });
    //月日期控件
    $("#avgMonthId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            var first = selectDate + '-01', end = selectDate + '-31';
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherAverageTeachingHoursDay';
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', first, end);
        });
    });
    //年日期控件
    $("#avgYearId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherAverageTeachingHoursYear';
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
        });
    });
    studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/teacherAverageTeachingHoursDay';
    // reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg', mon, sun);
    $("#gridTabB3").trigger('click');

}


function reqLearnTime(myChart, date, period, info, start, end) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    //todo 需要重写地址
    StatsCommon.ajaxReq(studentLearn_reqLearnTime, {
        siteCode: siteCode,
        year: date,
        startDate:start,
        endDate:end,
        period: period
    }, function (data) {
        myChart.hideLoading();
        var category = StatsCommon.Default_category(period, date);
        var val = StatsCommon.Default_series(period, date);
        var legendName = '总学习时长';
        if (info == StatsCommon.INFO.AVG) {
            legendName = '平均学习时长';
        }
        var data_period = '';
        var data_date = ' -- ';
        var data_learnTime = ' -- ';
        var rotate = 0;
        if(device.mobile()){
            rotate = 45;
        }
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
            // rotate = 45;
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        if (data != null && data.data != null && undefined != data.data.list) {
            if (data.data.list != null && data.data.list.length > 0) {
                var items = data.data.list;
                for (var i = 0; i < items.length; i++) {
                    if('year' == period){
                        var m = Number(items[i].teaching_date);
                        if (info == StatsCommon.INFO.AVG) {
                            val[m-1] = items[i].teaching_time;
                        } else {
                            val[m-1] = items[i].teaching_time;
                        }
                    } else {
                        var m = category.indexOf(items[i].teaching_date);
                        if (info == StatsCommon.INFO.AVG) {
                            val[m] = items[i].teaching_time;
                        } else {
                            val[m] = items[i].teaching_time;
                        }
                    }


                   /* if (info == StatsCommon.INFO.AVG) {
                        val.push(items[i].teaching_time);
                    } else {
                        val.push(items[i].teaching_time);
                    }*/
                }
            }

          /*  var maxItems = data.data.maxItems;
            if (info == StatsCommon.INFO.AVG) {
                maxItems = data.data.avgMaxItems;
            }
            if (maxItems != null && maxItems.length > 0 && maxItems[0].teaching_time > 0) {
                data_learnTime = maxItems[0].teaching_time;
                if (info == StatsCommon.INFO.AVG) {
                    data_learnTime = maxItems[0].teaching_time;
                }


                if (period == StatsCommon.PERIOD.WEEK || period == StatsCommon.PERIOD.MONTH) {
                    try {
                        data_date='';
                        if (maxItems.length == 1) {
                            var str = maxItems[0].teaching_date;
                            var ss = new Date(Date.parse(str.replace(/-/g, "/")));
                            data_date = (ss.getMonth() + 1) + '月' + (ss.getDate()) + '日';
                        } else {
                            for (var i = 0; i < maxItems.length; i++) {
                                var str = maxItems[i].teaching_date;
                                var ss = new Date(Date.parse(str.replace(/-/g, "/")));
                                data_date += (ss.getMonth() + 1) + '月' + (ss.getDate()) + '日,';
                            }
                            data_date = data_date.substring(0, data_date.length - 1);
                        }
                    } catch (e) {
                    }

                } else if (period == StatsCommon.PERIOD.YEAR) {
                    data_date = maxItems[0].teaching_date + '月';
                }


            }*/

        }
        if (info == StatsCommon.INFO.ALL) {
            $("#totalDataId").find("span[name='period']").text(data_period);
            $("#totalDataId").find("span[name='date']").text(data_date);
            $("#totalDataId").find("span[name='learnTime']").text(StatsCommon.changeLearnTimeHours(data_learnTime, '分钟','.'));
        } else if (info == StatsCommon.INFO.AVG) {
            $("#avgDataId").find("span[name='period']").text(data_period);
            $("#avgDataId").find("span[name='date']").text(data_date);
            $("#avgDataId").find("span[name='learnTime']").text(StatsCommon.changeLearnTimeHours(data_learnTime, '分钟','.'));
        }

        StatsCommon.setLineOptions(myChart, legendName, category, val, '分钟', rotate, period);
        if (info == StatsCommon.INFO.ALL) {
            $(".gridTab-tab a").removeClass("click-disable");
        }else{
            $(".gridTabB-tab a").removeClass("click-disable");
        }



    },token);
}



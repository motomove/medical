/**
 * 管理端主题同阿伦学习情况
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
                if(StatsCommon.RESOURCETYPE.TOPIC==resourceType){
                    $("#anTab-con-noData").hide();

                    //讨论学习情况
                    getManageForumLearn(echarts);
                    //主题讨论参与度讨论深度
                    getManageForumPartDeepDegree(echarts);


                    flag = true;

                }
            }

        }
        if(!flag){
            $("#anTab-con-noData").find('.empyt-txt').text('暂无数据');
        }

    },token);






});



function getManageForumLearn(ec) {
    $("#manageForumLearnId").width('100%');
    $("#manageForumLearnId").height('304px');
    var manageForumCharts = ec.init($("#manageForumLearnId")[0]);
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    var dateDay = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    $("#gridTabLMA_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMA_month_select_year").text(date.getFullYear());
    $("#gridTabLMA_month_select_week").val(date.getFullYear() + '-' + dateMonth + '-' + dateDay);
    var week = StatsCommon.getWeekDays(date, 'M月d日');
    $("#gridTabLMA_month_select_week").text(week.MON + '-' + week.SUN);
    reqEchatsForForum(manageForumCharts, date.getFullYear() + '-' + dateMonth + '-' + dateDay,  'week' );

    //年、月、周按钮
    $("#gridTabLMA1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForForum(manageForumCharts, $("#gridTabLMA_month_select_week").val(), 'week');
    });
    $("#gridTabLMA_month_select_week").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            reqEchatsForForum(manageForumCharts, curDate, 'week');
        }, $("#gridTabLMA_month_select_week").val());

    });
    $("#gridTabLMA2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForForum(manageForumCharts, $("#gridTabLMA_month_select_month").text(), 'month');
    });
    $("#gridTabLMA_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsForForum(manageForumCharts, curDate, 'month');
        });
    });
    $("#gridTabLMA3").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsForForum(manageForumCharts, $("#gridTabLMA_month_select_year").text(), 'year');
    });
    $("#gridTabLMA_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMA-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsForForum(manageForumCharts, curDate, 'year');
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
function reqEchatsForForum(myChart, date, period) {
    var params={};
    params.siteCode = siteCode;
    params.date = date;
    params.period = period;
    var paramsData={};
    paramsData.params=params;


    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/post',JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var val = [];
        var legendName = ['帖子总量', '精华帖总量', '灌水帖总量', '回帖总量'];
        var groupNames = ['topicAll', 'topicType', 'topicType', 'topicType'];
        var colorArray = ['#f2dfa8', '#b4cd7a', '#86cb83', '#73bdf4'];
        var yAxis = {
            name:'个',
            title:'数量(个)'
        };
        var xAxis = {
            data:StatsCommon.Default_category(period, date),
            title:'时间'
        };

        if (data != null && data.data != null) {
            var items = data.data;
            var waters = [];
            var elikes = [];
            var posts = [];
            var replys = [];
            for (var i = 0; i < items.length; i++) {
                var elike = items[i].elike;
                var water = items[i].water;
                var recordDate = items[i].recordDate;
                var post = items[i].post;
                var reply = items[i].reply;
                waters.push(water);
                elikes.push(elike);
                posts.push(post);
                replys.push(reply);
            }
            val.push(posts);
            val.push(elikes);
            val.push(waters);
            val.push(replys);

            $("#anTab-con-1").show();

            StatsCommon.setEchartsBarGroup(myChart, legendName, yAxis, xAxis, val, groupNames, colorArray);

        }
        $(".gridTabLMA-tab a").removeClass("click-disable");
    },token);
}


/**
 * 主题讨论深度参与度
 * @param ec
 */
function getManageForumPartDeepDegree(ec) {
    $("#manageForumPartDeepDegreeId").width('100%');
    $("#manageForumPartDeepDegreeId").height('500px');
    var manageForumPartDeepDegreeChart = ec.init($("#manageForumPartDeepDegreeId")[0]);

    // $("#selectedCourseId").change(function(){
    //     var courseId = $(this).val();
    //     $(this).attr("disabled","disabled");
    //     reqEchatsForForumPartDeepDegree(manageForumPartDeepDegreeChart,courseId);
    // });
    $("#searchTopicConfirmId").click(function(){
        var courseIds = $(this).val();
        $("#selectedCourseId").find("input[name='courseId']:checked").each(function () {
            var courseId = $(this).val();
            courseIds += courseId + ',';
        });
        if(!StatsCommon.isNull(courseIds)){
            courseIds = courseIds.substring(0,courseIds.length-1);
        }
        reqEchatsForForumPartDeepDegree(manageForumPartDeepDegreeChart,courseIds);
    });
    $("#searchTopicResetId").click(function(){

        $("#selectedCourseId").find("input[name='courseId']:checked").each(function () {
            $(this).removeAttr("checked");
            $(this).parent().removeClass("c_on").addClass(" c_off");
        });
        reqEchatsForForumPartDeepDegree(manageForumPartDeepDegreeChart,'');
    });

    reqEchatsForForumPartDeepDegree(manageForumPartDeepDegreeChart,'');

    //获取课程信息
    getAllCourse(manageForumPartDeepDegreeChart);


}

/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 */
function reqEchatsForForumPartDeepDegree(myChart,courseIds) {
    var params={};
    params.siteCode = siteCode;
    params.courseIds = courseIds;
    var paramsData={};
    paramsData.params=params;


    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/partDeepDegree',JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        var val = [];
        var legendName = '主题讨论';
        var colorArray = ['#c59788'];
        var yAxis = {
            name:'',
            title:'主题讨论参与度',
            min:0,
            max:100
        };
        var xAxis = {
            name:'',
            title:'主题讨论深度',
            min:0,
            max:5
        };

        if (data != null && data.data != null) {
            var items = data.data;
            for (var i = 0; i < items.length; i++) {
                var deepDegree = items[i].deepDegree;
                var partDegree = Math.round(items[i].partDegree*100) > 100 ? 100 : Math.round(items[i].partDegree*100);
                var name = items[i].name;
                var courseName = items[i].courseName;
                var courseCode = items[i].courseCode;
                val.push([deepDegree,partDegree,name,courseName + '('+courseCode+')']);
            }

            $("#anTab-con-2").show();

            StatsCommon.setEchartsScatter(myChart, legendName, yAxis, xAxis, val, colorArray,['讨论深度','参与度','主题名称','所属课程']);

        }
        $("#selectedCourseId").removeAttr("disabled");
    },token);
}


function getAllCourse(mychart,courseInfo) {

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/courseInfo',JSON.stringify({
        params:{
            siteCode : siteCode,
            courseInfo : StatsCommon.isNull(courseInfo)?'':courseInfo,
            resourceType : 'topic'
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var items = data.data;

            for (var i = 0; i < items.length; i++) {
                items[i].id = items[i].courseId;
            }

            new CommonSearch(items, function (searchCont) {
                //课程搜索回调
                getAllCourse(mychart,searchCont);
            }, function (ids) {
                //确定按钮回调
                var _id = '';
                if(!StatsCommon.isNull(ids)){
                    for (var i=0;i<ids.length;i++){
                        _id += ids[i] + ',';
                    }
                }
                reqEchatsForForumPartDeepDegree(mychart,_id);

            });

        }

    },token);
}



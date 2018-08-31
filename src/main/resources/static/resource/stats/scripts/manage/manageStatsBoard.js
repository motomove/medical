/**
 * 管理端数据看板
 * @param ec
 */

$(function () {


    //获取平台概况信息

    boardTotalNum();

    boardActiveCourse();

    boardTotalCourse();

    boardTotalLearnTime();

    //图信息

    boardLearnTime(echarts);

    boardOnlineNum(echarts);

    setInterval(function () {
        boardOnlineNum(echarts);
    }, 1000*60);

    boardLearnTimeRank();


    boardResourceNum(echarts);




});


function boardTotalNum(){

    var params={};
    params.siteCode = siteCode;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq('/learn/stats/userNum',JSON.stringify(paramsData), function (data) {
        if (data != null && data.data != null ) {
            $("#board_student_num").text(data.data.studentNum);
            $("#board_teacher_num").text(data.data.teacherNum);
            $("#board_total_num").text(data.data.total);
        }

    },token);
}

function boardActiveCourse(){
    var params={};
    params.siteCode = siteCode;
    params.timePeriod = 365 ;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/activeCourse/count',
        JSON.stringify(paramsData), function (data) {

            if (data != null && data.data != null) {
                var courseNum = data.data.courseNum;

                $("#board_course_active").text(courseNum);
            }

        }, token);
}

function boardTotalCourse (){
    var params={};
    params.siteCode = siteCode;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq('/learn/stats/resource/details',
        JSON.stringify(paramsData), function (data) {

            if (data != null && data.data != null) {
                var courseNum = data.data.courseNum;
                $("#board_course_num").text(courseNum);
            }

        }, token);
}

function boardTotalLearnTime(){
    var params={};
    params.siteCode = siteCode;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/learnTime/total',
        JSON.stringify(paramsData), function (data) {

            if (data != null && data.data != null) {
                var weekTime=data.data.weekTime;
                var totalTime = data.data.totalTime;
                //正数-增长，负数-减少
                // if(data.data.rate>0){
                //     $("#board_rate").text("环比增长"+data.data.rate+"%");
                // }else if(data.data.rate==0){
                //     $("#board_rate").text("与上周持平");
                // }else{
                //     $("#board_rate").text("环比下降"+(-data.data.rate)+"%");
                // }
                var weeks=changeSec(weekTime);
                $("#board_learn_time_week_hours").text(weeks.h);
                $("#board_learn_time_week_mins").text(weeks.m);
                $("#board_learn_time_week_secs").text(weeks.s);

                var total=changeSec(totalTime);
                $("#board_learn_time_hours").text(total.h);
                $("#board_learn_time_mins").text(total.m);
                $("#board_learn_time_secs").text(total.s);

            }


        }, token);
}

/**
 * 获取时(h)分(m)秒(s)
 * @param weekTime
 */
function changeSec(weekTime){
    var time={
        h:0,
        m:0,
        s:0
    };
    time.h=parseInt(weekTime/3600);
    time.m=parseInt((weekTime-time.h*3600)/60);
    time.s=parseInt((weekTime-time.h*3600)%60);
    return time;
}

function boardLearnTime(ec){
    $("#board_learn_time").height('370px');
    $("#board_learn_time").width('100%');
    var date=StatsCommon.formatDate(new Date(), 'yyyy-MM-dd');
    var period="week";
    var myChart = ec.init($("#board_learn_time")[0]);


    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    StatsCommon.ajaxReq(StatsCommon.getPlatformPath() + '/statistics/manage/learnTime', {
        siteCode: siteCode,
        date:  date,
        period: period
    }, function (data) {

        myChart.hideLoading();

        var category = StatsCommon.Default_category(period, date);
        var val = StatsCommon.Default_series(period, date);
        var legendName = '学习时长';
        var rotate = 0;

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                val = [];
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    val.push(items[i].learnTime);
                }
            }

        }

        StatsCommon.setLineOptions(myChart, legendName, category, val, '分钟', rotate, "month");


    },token);
}

/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 */
function boardOnlineNum(ec,selectDate) {

    $("#board_online_num").width('100%');
    $("#board_online_num").height('370px');
    var myChart = ec.init($("#board_online_num")[0]);

    var title = '';
    var val = [];

    var params={};
    params.token = token;
    var paramsData={};
    paramsData.params=params;
    StatsCommon.ajaxBodyReq('/learn/stats/siteCode', JSON.stringify(paramsData), function (data) {

        StatsCommon.YUNYAN.ajaxReq(StatsCommon.YUNYAN.DOMAIN + StatsCommon.YUNYAN.BASE_URL +'/userstats/onlinenumber/minute_level_data',{
            siteCode : data.data,
            systemCode: StatsCommon.YUNYAN.SYSTEM_CODE,
            recordDate:selectDate
        },function(data){

            var currDate = new Date();
            var dataDateTime = new Date();
            for (var key in data){
                dataDateTime = new Date(StatsCommon.formatDate(currDate) + " " + key +":00");
                val.push({name:dataDateTime.toString(),value:[StatsCommon.formatDate(dataDateTime,'yyyy-MM-dd hh:mm'),data[key]]});

            }

            if(val.length==0){
                var date = new Date(selectDate + " 00:00:00");
                for (var i = 0; i < 60 * 24; i++) {
                    date = new Date(date.getTime() + 60 * 1000);
                    var ss = StatsCommon.formatDate(date, 'yyyy-MM-dd hh:mm');
                    val.push({name: date.toString(), value: [ss, 0]});
                }
            }



            if(val.length>0){
                StatsCommon.setEchartsDynamicData(myChart,title,val,'时间','在线人数');
            }

        });

    },token);




}


//各类资源情况图
function boardResourceNum(ec) {

    $("#board_resource_num").width('100%');
    $("#board_resource_num").height('370px');
    var myChart = ec.init($("#board_resource_num")[0]);

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
            var legendName = [];
            var colorArray = [];
            if (data != null && data.data != null && data.data.resource != null && data.data.resource.length>0) {
                var resources = data.data.resource;
                for(var i=0;i<resources.length;i++){
                    var resourceType = resources[i].resourceType;
                    var resourceNum = resources[i].resourceNum;
                    legendName.push(StatsCommon.getResourceName(resourceType));
                    colorArray.push(StatsCommon.getResourceColor(resourceType));
                    val.push(resourceNum);
                }
                StatsCommon.setEchartsPie(myChart, legendName, '资源类型', val, colorArray,false,'个');

            }

        }, token);
}

function boardLearnTimeRank(){

    var params={};
    params.siteCode = siteCode;
    params.curPage = 1;
    params.pageSize = 10;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/learnTime/detail',
        JSON.stringify(paramsData), function (data) {
            $("#board_learn_time_rank").empty();
            var items ="";
            if (data != null && data.data != null && data.data.items != null) {
                items=data.data.items;
            }

            for(var i=1;i<=10;i++){
                var str ='';
                var resource =StatsCommon.isNull(items[i])?'':items[i];
                var courseName='';
                var code='';
                var learnTime='';
                var num ='';
                if(!StatsCommon.isNull(resource.courseName)){
                    courseName = resource.courseName;
                    num = i;
                }
                if(!StatsCommon.isNull(resource.code)){
                    code = resource.code;
                    num = i;
                }
                if(!StatsCommon.isNull(resource.learnTime)){
                    learnTime = resource.learnTime;
                    num = i;
                }
                str+='<div class="an_rank_row ';
                if(i%2!=0){
                    if(i==1){
                        str+=' an_rank_first ';
                    }else if(i==3){
                        str+=' an_rank_third ';
                    }

                }else{
                    str+=' an_rank_even ';
                    if(i==2){
                        str+=' an_rank_second '
                    }
                }
                str+=' ">';
                str+=' <ul class="clearfix">';
                str+='   <li class="an_rank_cell an_rank_cell1">';
                str+='     <div class="an_rank_cellIn" title="'+courseName+'">'+courseName+'</div>';
                str+='   </li>';
                str+='   <li class="an_rank_cell an_rank_cell2">';
                str+='     <div class="an_rank_cellIn" title="'+code+'">'+code+'</div>';
                str+='   </li>';
                str+='   <li class="an_rank_cell an_rank_cell3">';
                str+='     <div class="an_rank_cellIn">'+(StatsCommon.isNull(learnTime)?learnTime:(StatsCommon.changeLearnTimeHours(learnTime,'分钟')))+'</div>';
                str+='   </li>';
                str+='   <li class="an_rank_cell an_rank_cell4">';
                str+='     <div class="an_rank_cellIn">';
                if(StatsCommon.isNull(num)){
                    str+='            &nbsp; ';
                }else{
                    str+='        <span class="an_rank_num">';
                    str+=            num;
                    str+='        </span>';
                }

                str+='     </div>';
                str+='   </li>';
                str+=' </ul>';
                str+='</div>';
                $("#board_learn_time_rank").append(str);
            }




        }, token);

}

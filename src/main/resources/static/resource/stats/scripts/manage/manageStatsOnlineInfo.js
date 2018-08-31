/**
 * 管理端在线人数情况
 * @param ec
 */

$(function () {

    //在线人数趋势图
    getManageOnlineLearn(echarts);

    var sec = 60;
    $("#onlineDataCurrSecondId").text(sec);
    var secTimer = setInterval(function () {
        if (sec == 0) {
            getManageONlineData();
            sec = 60;
            $("#onlineDataCurrSecondId").text(sec);
            return;
        }
        $("#onlineDataCurrSecondId").text(--sec);
    }, 1000);

    //获取当天最大人数及出现时间
    getManageONlineData();

});

//获取当天在线人数，最大人数及出现时间
function getManageONlineData() {

    var params={};
    params.siteCode = siteCode;

    var paramsData={};
    paramsData.params=params;

    //获取站点学生在线人数
    StatsCommon.ajaxBodyReq('/learn/stats/onlineNum',
        JSON.stringify(paramsData), function (data) {
            var onlineNum = 0;
            var stuNum = 0;
            var teaNum = 0;
            var siteCodes= '';
            var maxNum = 0;
            if (data != null && data.data != null) {
                stuNum = data.data.num;
                siteCodes = data.data.siteCode;
            }



            //获取站点在线人数
            StatsCommon.YUNYAN.ajaxReq(StatsCommon.YUNYAN.DOMAIN + StatsCommon.YUNYAN.BASE_URL + '/userstats/onlinenumber/date_level_data', {
                siteCode: siteCodes,
                systemCode: StatsCommon.YUNYAN.SYSTEM_CODE,
                recordDate: StatsCommon.formatDate(new Date(), 'yyyy-MM-dd')
            }, function (data) {

                var temDate = $("#manageOnlineDateTimeId").text();
                if(temDate != StatsCommon.formatDate(new Date(), 'yyyy-MM-dd')){
                    //当前时间
                    $("#onlineDataTimeId").text(StatsCommon.formatDate(new Date(), 'yyyy-MM-dd hh:mm'));
                }

                //当前在线人数
                if (data.onlineNumber) {
                    onlineNum = data.onlineNumber;
                }
                $("#onlineDataNumId").text(onlineNum);

                //当前在线学生数
                $("#onlineStuNumId").text(stuNum > onlineNum ? onlineNum: stuNum);

                teaNum = onlineNum - stuNum;
                //当前在线教师数
                $("#onlineTeaNumId").text(teaNum<0?0:teaNum);

                //最大在线人数
                if (data.maxOnlineNumber) {
                    maxNum = data.maxOnlineNumber;
                }
                $("#onlineDataMaxNumId").text(maxNum);
                //最大在线人数时间
                if (data.maxTime) {
                    $("#onlineDataMaxNumTimeId").text(StatsCommon.formatDate(new Date(data.maxTime), 'hh:mm'));
                }


            });


        }, token);



}

function getManageOnlineLearn(ec) {

    $("#manageOnlineId").width('100%');
    $("#manageOnlineId").height('404px');
    var manageOnlineCharts = ec.init($("#manageOnlineId")[0]);

    var selectDate = StatsCommon.formatDate(new Date(), 'yyyy-MM-dd');;
    $("#manageOnlineDateTimeId").text(selectDate);
    reqEchatsForOnline(manageOnlineCharts,'');

    var timerTime = 1000*60;
    var timer = setInterval(function(){
        reqEchatsForOnline(manageOnlineCharts,'');
    },timerTime);




    //天日期控件
    $("#manageOnlineDateTimeId").unbind("click").click(function () {
        StatsCommon.DayWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');

            reqEchatsForOnline(manageOnlineCharts,selectDate);
            if(selectDate == StatsCommon.formatDate(new Date(),'yyyy-MM-dd')){
                $("#curDateDivId").html("今日");
                timer = setInterval(function(){
                        reqEchatsForOnline(manageOnlineCharts,'');
                    },timerTime);
            }else{
                $("#curDateDivId").html(selectDate + " ");
                clearInterval(timer);
            }
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
function reqEchatsForOnline(myChart,selectDate) {

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
            var dataDateTime = null;
            for (var key in data){
                dataDateTime = new Date((StatsCommon.isNull(selectDate) ? StatsCommon.formatDate(currDate) : selectDate) + " " + key + ":00");
                val.push({name:dataDateTime.toString(),value:[StatsCommon.formatDate(dataDateTime,'yyyy-MM-dd hh:mm'),data[key]]});

            }
            if(val.length>0){
                if(StatsCommon.formatDate(currDate) == selectDate || StatsCommon.isNull(selectDate)){
                    //当前时间
                    $("#onlineDataTimeId").text(StatsCommon.formatDate(currDate, 'yyyy-MM-dd hh:mm'));
                }
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

/**
 * Created by wy on 2017/9/13.
 */
$(function () {


    getSiteTemplate(echarts);

});



/**
 * 模板使用统计
 * @param ec
 */
function getSiteTemplate(ec) {
    $("#mange_template").width('100%');
    $("#mange_template").height('304px');
    var mycharts = ec.init($("#mange_template")[0]);
    var url = StatsCommon.getPlatformPath() + '/statistics/manage/template/learnByWeek';
    var date = new Date(new Date()-24*60*60*1000);
    var dateMonth = (date.getMonth() + 1) < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1);
    $("#gridTabLMB_month_select_month").text(date.getFullYear() + '-' + dateMonth);
    $("#gridTabLMB_month_select_year").text(date.getFullYear());
    reqEchatsLine(mycharts, url, date.getFullYear() + '-' + dateMonth , 'month');

    //年、月、周按钮
    $("#gridTabLMB1").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLine(mycharts, url, $("#gridTabLMB_month_select_month").text(), 'month');
    });
    $("#gridTabLMB_month_select_month").unbind("click").click(function () {
        if($(".gridTabLMB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            reqEchatsLine(mycharts, url, curDate, 'month');
        });

    });

    $("#gridTabLMB2").unbind("click").click(function () {
        if($(this).hasClass("click-disable")){
            return ;
        }
        reqEchatsLine(mycharts, url, $("#gridTabLMB_month_select_year").text(), 'year');
    });
    $("#gridTabLMB_month_select_year").unbind("click").click(function () {
        if($(".gridTabLMB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            reqEchatsLine(mycharts, url, curDate, 'year' );
        });
    });


}



function reqEchatsLine(myChart, url, date, period) {

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

    StatsCommon.ajaxBodyReq(url,JSON.stringify(paramsData), function (data) {
        myChart.hideLoading();
        var val = [];
        var legendName = [];
        var tempVal = [];
        var tempVal2 = [];
        var tempVal3 = [];
        var tempVal4 = [];
        var tempVal5 = [];
        var tempVal6 = [];
        var tempVal7 = [];
        var colorArray = ['#c59788', '#b18c57', '#bdafab', '#a6c2b5', '#8aa192',
            '#7d9fa4', '#7e7f81', '#6b7479', '#6b8a9f', '#69a3c6',
            '#65b0c1'];
        var yAxis = {
            title: '',
            name: ''
        };
        var xAxis = {
            data: [],
            title: ''
        };

        if (data != null && data.data != null && data.data.length>0) {
            $("#anTab-con-noData").hide();
            $("#mange_template").show();
            var items = data.data;
            yAxis.name = '个';
            xAxis.title = '时间';
            yAxis.title = '课程引用量';
            xAxis.data = StatsCommon.getMonthOfWeekDate(period, date);
            for (var i = 0; i < items.length; i++) {
                if(items[i].type1 != undefined ){
                    tempVal.push(items[i].type1);
                }
                if(items[i].type2 != undefined){
                    tempVal2.push(items[i].type2);
                }
                if(items[i].type3 != undefined){
                    tempVal3.push(items[i].type3);
                }
                if(items[i].type4 != undefined){
                    tempVal4.push(items[i].type4);
                }
                if(items[i].type5 != undefined){
                    tempVal5.push(items[i].type5);
                }
                if(items[i].type6 != undefined){
                    tempVal6.push(items[i].type6);
                }
                if(items[i].type7 != undefined){
                    tempVal7.push(items[i].type7);
                }

            }
            if(tempVal.length>0){
                val.push(tempVal);
                legendName.push("左侧目录式主题");
            }
            if(tempVal2.length>0){
                val.push(tempVal2);
                legendName.push("右侧目录式主题");
            }
            if(tempVal3.length>0){
                val.push(tempVal3);
                legendName.push("课件顺序播放主题");
            }
            if(tempVal4.length>0){
                val.push(tempVal4);
                legendName.push("多种教学活动模式");
            }
            if(tempVal5.length>0){
                val.push(tempVal5);
                legendName.push("按周模板主题");
            }
            if(tempVal6.length>0){
                val.push(tempVal6);
                legendName.push("主题模板主题");
            }
            if(tempVal7.length>0){
                val.push(tempVal7);
                legendName.push("课件混排主题");
            }
            StatsCommon.setEchartsLine(myChart, legendName, yAxis, xAxis, val, colorArray);
        }else{
            $("#anTab-con-noData").show();
            $("#mange_template").hide();
        }
        $(".gridTabLMB-tab a").removeClass("click-disable");
    },token);
}


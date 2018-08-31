$(function () {
    /**
     * 报告内容
     */

    //处理时间

    $('.yin_data_min').each(function (index, obj) {
        var time = StatsCommon.changeLearnTimeHours($(obj).attr('data'), '小时');
        $(obj).text(time);
    });

    /**
     * 历史列表事件监听
     */
    $('#calendar').on('click', function () {
        var $this = $(this);
        var thisTop = $this.offset().top;
        var thisHeight = $this.height();
        //alert(thisTop);
        $('#calendar-drop').css('top', thisTop + thisHeight).slideToggle();
    });

    /**
     * 历史周报事件监听
     */
    $('#calendar-drop').on('click', '.drop-link', function () {
        var path = $(this).attr('id');
        window.location.href = StatsCommon.getPlatformPath() + "/report/details/" + path;
    });



    //每日学习时长
    showLearnTime("online_time", "chat_learnTime");

    //授课时长
    showLearnTime("teaching_time", "chat_teachingTime");

    otherHide('touchstart', '#calendar-drop', 'calendar-drop', 'calendar');
});


// >>>>>>>>>> 点击其它地方隐藏
function otherHide(event, target, idName, triggerIdName){
    $(document).bind(event,function(e){
        var e = e || window.event; //浏览器兼容性
        var elem = e.target || e.srcElement;
        while (elem) { //循环判断至跟节点，防止点击的是div子元素
            if (elem.id && elem.id === idName || elem.id && elem.id === triggerIdName) {
                return;
            }
            elem = elem.parentNode;
        }
        $(target).slideUp(); //点击的不是div或其子元素
    });
}


/**
* 每日学习时长
*/
function showLearnTime(echatDomId, dataDom){

    var dataObj = $('#' + dataDom);
    var period = dataObj.attr('type'), date = dataObj.attr('date');
    var interval = 0;
    if('0' == period){
        period = StatsCommon.PERIOD.WEEK;
        interval = 2;
    } else if ('1' == period){
        period = StatsCommon.PERIOD.MONTH;
        interval = 2;
    } else if('2' == period){
        period = StatsCommon.PERIOD.YEAR;
        interval = 0;
    } else {
        return false;
    }
    var category = StatsCommon.Default_category(period, date);
    var _data  = StatsCommon.Default_series(period, date);
    // var category =[],
    // var _data = [];


    $('#' + echatDomId).css({"width":"100%", "height":"282px"});
    var myChart = echarts.init(document.getElementById(echatDomId));
    var maxNum = 0, maxDate = '';
    $('#' + dataDom).find('li').each(function (index, obj) {
        var _obj = $(obj);
        if(StatsCommon.PERIOD.YEAR == period){
            var m = Number($.trim(_obj.attr('name')));
            _data[m-1] = Number($.trim(_obj.text()));
        } else {
            var m = category.indexOf($.trim(_obj.attr('name')));
            _data[m] = Number($.trim(_obj.text()));
        }
        // _data.push(Number($.trim(_obj.text())));
        // category.push($.trim(_obj.attr('name')));
        var stuNum = $.trim(_obj.attr('stuNum'));
        if(stuNum > maxNum){
            maxNum = Number($.trim(_obj.attr('stuNum')));
            if (period == StatsCommon.PERIOD.YEAR) {
                maxDate = $.trim(_obj.attr('maxDate'));
            } else {
                maxDate = $.trim(_obj.attr('name'));
            }
        }
    });

    if('online_time' == echatDomId){
        $('#max-online-num').text(maxNum + "人(" + maxDate + ")");
    }


    var option = {
        textStyle:{
            color:'#fff'
        },
        title: {
            text: '每日学习时长',
            padding:[20, 0, 0, 0],
            textStyle:{
                color:'#fff',
                fontSize:'14',
                fontWeight:'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var val = StatsCommon.changeLearnTimeHours(params.value, '分钟');
                return params.name + ' : ' + val + '' ;
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisTick:{
                alignWithLabel:true
            },
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            },
            data: category,
            axisLabel: {
                interval: interval,//横轴信息全部显示
                formatter: function (value, index) {
                    if (period != StatsCommon.PERIOD.MONTH) {
                        return value;
                    } else {
                        return StatsCommon.formatter(value, index);
                    }
                }
            }
        },
        yAxis: {
            axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            },
            axisLabel: {
                margin: 2,
                formatter: function (value) {
                    return StatsCommon.changeLearnTime2Hours([value]);
                }
            },
            name:'(小时)',
            nameTextStyle:{
                padding:[0, 0, -10, -25]
            },
            type: 'value'

        },
        series: [{
            label:{
                show:true,
                formatter: function (params) {
                    if(_data.length > 7){
                        var splitNum = params.dataIndex % 5;
                        if(splitNum == 0){
                            var val = StatsCommon.changeLearnTime2Hours([params.value]);
                            return val[0] ;
                        } else {
                            return "";
                        }
                    } else {
                        var val = StatsCommon.changeLearnTime2Hours([params.value]);
                        return val[0] ;
                    }

                },
            },
            color:'#fff',
            data: _data, //[820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    };

    myChart.setOption(option);


    var myDate = new Date(2018,5,19,10,10,10);
    // myDate.setFullYear(2018,6,19);
    // var day = myDate.getFullYear();
    var week = StatsCommon.getWeekDays(myDate);
    return [category, _data, week.MON];

}


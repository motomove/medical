/**
 * Created by whaty on 2017/8/15.
 */

var StatsCommon = {};

/**
 * 统计周期:年/月/周
 * @type {{WEEK: string, MONTH: string, YEAR: string}}
 */
StatsCommon.PERIOD = {
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year'
};

/**
 * 统计数据部分:总数/平均值
 * @type {{ALL: string, AVG: string}}
 */
StatsCommon.INFO = {
    ALL: 'all',
    AVG: 'avg'
};
/**
 * 文档服务信息
 * @type {{DOMAIN: string}}
 */
StatsCommon.DOCSERVICE = {
    DOMAIN: 'http://www.webtrn.cn'
};

StatsCommon.YUNYAN = {
    DOMAIN: 'https://tongji.webtrn.cn',
    BASE_URL: '/api',
    SYSTEM_CODE: 'bytime',
    ajaxReq : function(url,data,success, dataType){

        if(undefined == dataType){
            dataType = 'json';
        }

        //token失效
        if (StatsCommon.YUNYAN.TOKEN_INFO._EXPIRES <= 0) {
            StatsCommon.ajaxReqAccess(StatsCommon.YUNYAN.DOMAIN + StatsCommon.YUNYAN.BASE_URL + '/oauth/token', {
                client_id: 'whatyDashboard',
                client_secret: 'eaaf8f5ce53e2146555299bf701184d1',
                grant_type: 'client_credentials'
            }, function (res) {
                if (res) {
                    StatsCommon.YUNYAN.TOKEN_INFO._TOKEN = res.access_token;
                    StatsCommon.YUNYAN.TOKEN_INFO._EXPIRES = res.expires_in;
                    if (StatsCommon.isNull(data)) {
                        data = {};
                    }
                    data['access_token'] = StatsCommon.YUNYAN.TOKEN_INFO._TOKEN;
                    StatsCommon.ajaxReqAccess(url,data,success,'get',true, dataType);
                }
            }, 'post', true);
        }else{
            if (StatsCommon.isNull(data)) {
                data = {};
            }
            data['access_token'] = StatsCommon.YUNYAN.TOKEN_INFO._TOKEN;
            StatsCommon.ajaxReqAccess(url,data,success,'get',true, dataType);
        }
    },
    TOKEN_INFO: {
        _TOKEN: '',
        _EXPIRES: 0
    },
    access_token : function (callback) {
        StatsCommon.ajaxReqAccess(StatsCommon.YUNYAN.DOMAIN + StatsCommon.YUNYAN.BASE_URL + '/oauth/token', {
            client_id: 'whatyDashboard',
            client_secret: 'eaaf8f5ce53e2146555299bf701184d1',
            grant_type: 'client_credentials'
        }, callback, 'post', true);
    }
}

/**
 * 跨域请求方法
 * @param url
 * @param data
 * @param success
 * @param method 默认为get
 * @param async 默认为异步
 */
StatsCommon.ajaxReqAccess = function (url, data, success, method, async, dataType) {
    if(undefined == dataType){
        dataType = 'json';
    }

    $.ajax({
        url: url,
        data: data,
        success: success,
        error:function (XMLHttpRequest, textStatus, errorThrown) {
        },
        async: async,
        dataType: dataType,
        type: StatsCommon.isNull(method) ? 'get' : method
    });
};

/**
 * 请求方法
 * @param url
 * @param data
 * @param success
 * @param error
 */
StatsCommon.ajaxReq = function (url, data, success, token, error) {
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: data,
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "bearer " + token);
        },
//        cache: false,
//        async: true,
        success: success,
        error: error
    });
};

/**
 * 请求方法
 * @param url
 * @param data
 * @param success
 * @param error
 */
StatsCommon.ajaxBodyReq = function (url, data, success, token, error) {
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: data,
        contentType: "application/json; charset=utf-8",
        // beforeSend: function (request) {
        //     request.setRequestHeader("Authorization", "bearer " + token);
        // },
//        cache: false,
//        async: true,
        success: success,
        error: error
    });
};

/**
 * 请求方法
 * @param url
 * @param data
 * @param success
 * @param error
 */
StatsCommon.location = function (url, data, token) {
    var param = '';
    if (!StatsCommon.isNull(data)) {
        for (var key in data) {
            param += '&' + key + '=' + data[key];
        }
    }
    window.location.href = url + '?access_token=' + token + param;
};

/**
 * 常量
 * @type {{backgroundColor: string}}
 */
StatsCommon.consts = {
    backgroundColor: 'transparent', //图形背景色,默认无背景（transparent）
    backgroundColor2: '#ebf5f8' //课程内资源分布饼图背景色
};

/**
 * 设置图表自适应
 * @param myChart
 * @param option
 */
StatsCommon.setOption = function (myChart, option) {
    myChart.setOption(option);
    myChart.resize();
    $(window).resize(function () {
        if(!myChart.isDisposed()){
            myChart.resize();
        }
    });
};

/**
 * 设置折线图options
 * @param myChart
 * @param legendName 图例
 * @param category x轴数据
 * @param val y轴数据
 * @param unit  y轴单位
 * @param rotate  倾斜角度(-90 ~ 90 )，默认为0不倾斜
 * @param period  'month'格式化时间
 * @param nameObject  xy轴名称对象 nameObject.yName='时间' nameObject.Xname='时间'
 */
StatsCommon.setLineOptions = function (myChart, legendName, category, val, unit, rotate, period, nameObject) {

    var isMax =StatsCommon.isMaxValue(val);
    //是否需要转换成小时
    if (unit == '分钟') {
        if (StatsCommon.isChangeLearnTime2Hours(val)) {
            unit = '小时';
            val = StatsCommon.changeLearnTime2Hours(val);
        }
    }
    if (StatsCommon.isNull(nameObject)) {
        nameObject = {
            xName: '时间',
            yName: '学习时长'
        };
    }

    if (StatsCommon.isNull(nameObject.xName)) {
        nameObject.xName = '时间';
    }

    if (StatsCommon.isNull(nameObject.yName)) {
        nameObject.yName = '学习时长';
    }
    nameObject.yName += (StatsCommon.isNull(unit)?'':('('+unit+')'));

    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].name + "<br/>";
                if (!StatsCommon.isNull(unit)) {
                    for (var i = 0; i < params.length; i++) {
                        result += params[i].marker + params[i].seriesName + ":" + params[i].value + unit;
                        if (i != params.length - 1) {
                            result += "<br/>";
                        }
                    }
                }
                if(StatsCommon.isNull(params[0].value)){
                    return ;
                }
                return result;
            }
        },
        legend: {
            data: [legendName]
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisTick:{
                alignWithLabel:true
            },
            name: nameObject.xName,
            data: category,
            axisLabel: {
                interval: 0,//横轴信息全部显示
                rotate: rotate || 0,//-30度角倾斜显示
                formatter: function (value, index) {
                    if (period != StatsCommon.PERIOD.MONTH) {
                        return value;
                    } else {
                        return StatsCommon.formatter(value, index);
                    }
                }
            }
        }
        ,
        yAxis: [
            {
                type: 'value',
                name: nameObject.yName,
                axisLabel: {
                    formatter: function (value, index) {
                        return value ;
                    }
                },
                max:isMax?null:5
            }
        ],
        series: [
            {
                name: legendName,
                type: 'line',
                data: val,
                connectNulls:true,
                itemStyle: {
                    normal: {
                        color: '#0096FF'
                    }
                },
                lineStyle: {  //线条的样式
                    normal: {
                        color: '#0096FF'
                    }
                },
                markPoint: {
                    data: [
                        {
                            type: 'max',
                            name: '最大值',
                            symbolSize: 1,//设置气泡大小为1，相当于不显示
                            label: {
                                normal: {
                                    color: '#0096FF',
                                    position: 'top',
                                    formatter: function (params) {
                                        return params.value + unit;
                                    }
                                }
                            }
                        },
                        {
                            type: 'min',
                            name: '最小值',
                            symbolSize: 1,//设置气泡大小为1，相当于不显示
                            label: {
                                normal: {
                                    color: '#0096FF',
                                    position: 'top',
                                    formatter: function (params) {
                                        return params.value + unit;
                                    }
                                }
                            }
                        }
                    ],
                    symbolSize: 42

                }

            }
        ]
    };

    StatsCommon.setOption(myChart, option);
};

StatsCommon.CalendarItem = {
    Less1: '0-1分钟',
    Less10: '1-10分钟',
    Less30: '10-30分钟',
    More30: '30分钟以上',
    Less1OfYear: '0-30分钟',
    Less10OfYear: '30-300分钟',
    Less30OfYear: '300-900分钟',
    More30OfYear: '900分钟以上',
    getPeriod: function (period) {
        var val = '';
        switch (period) {
            case 0:
                val = this.Less1;
                break;
            case 1:
                val = this.Less10;
                break;
            case 2:
                val = this.Less30;
                break;
            case 3:
                val = this.More30;
                break;
            default :
                val = '--';
                break;
        }
        return val;
    }
};

/**
 * 设置堆叠条形图options
 * @param myChart
 * @param jsonArrayData[{legend:'',data:'',color:''}]
 * @param category
 * @param barMaxWidth 柱条最大宽度
 * @param xAxisName ｘ轴名称
 * @param yAxisName y轴名称
 * @param legendPos 图例位置（默认为top）:'top','right','bottom','left'
 * @param unit 数据轴单位
 * @param numArray 人数数组(用于 % 显示人数)
 * @param sectionVal 数组 展示标题  例如;['第X章 第N讲 光辉岁月','第X章 第N讲 光辉']
 */
StatsCommon.setPileUpBarOptions = function (myChart, jsonArrayData, category, barMaxWidth, xAxisName, yAxisName, legendPos, unit, numArray, xAxisMax, sectionVal) {

    var category2 = new Array();
    $.each(category, function (i, e) {
        category2.push(category[i]);
        category[i] = StatsCommon.cutStr(e, 10);
    });

    if (!StatsCommon.isNull(sectionVal) && sectionVal.length == category2.length) {
        category2 = sectionVal;
    }

    if (StatsCommon.isNull(xAxisMax)) {
        xAxisMax = null;
    }

    var legendArr = [];
    var seriesArr = [];
    var legend = {data: legendArr};

    if (legendPos == 'right') {
        legend = {
            data: legendArr,
            orient: 'vertical',
            right: 10,
            top: 'middle'
        };
    } else if (legendPos == 'bottom') {
        legend = {
            data: legendArr,
            orient: 'horizontal',
            bottom: 0
        };
    } else if (legendPos == 'left') {
        legend = {
            data: legendArr,
            orient: 'vertical',
            left: 0,
            top: 'middle'
        };
    }

    //计算图形数据最大值
    var maxVal = 0;
    if (!StatsCommon.isNull(unit)) {
        if (unit == '%') {
            maxVal = 100;
        } else {
            if (!StatsCommon.isNull(jsonArrayData) && jsonArrayData[0].data.length > 0) {
                for (var i = 0; i < jsonArrayData[0].data.length; i++) {
                    var count = 0;
                    for (var j = 0; j < jsonArrayData.length; j++) {
                        if (!StatsCommon.isNull(jsonArrayData[j].data[i])) {
                            count += jsonArrayData[j].data[i];
                        }
                    }
                    if (maxVal < count) {
                        maxVal = count;
                    }
                }

            }
        }

    }


    $.each(jsonArrayData, function (index, item) {
        var legendName = item.legend;
        var seriesData = item.data;
        var color = item.color;
        legendArr.push(legendName);

        var series = {
            name: legendName,
            type: 'bar',
            stack: '学习时长',      //每个时间段图形的此属性一样才会显示为堆叠图形
            barMaxWidth: barMaxWidth,        //设置柱条的最大宽度
            label: {
                normal: {
                    show: true,
                    position: 'insideRight',
                    formatter: function (params) {
                        if (StatsCommon.isNull(unit)) {
                            return params.value;
                        } else {
                            if (params.value <= maxVal * 0.05) {
                                return '';
                            }
                            return params.value + unit;
                        }

                    }
                }
            },
            itemStyle: {
                normal: {
                    color: color
                }
            },
            data: seriesData
        };

        seriesArr.push(series);
    });

    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var res = '';
                var num0 = [];
                var num1 = [];
                var num2 = [];
                var num3 = [];
                if (!StatsCommon.isNull(numArray)) {
                    num0 = numArray[0];
                    num1 = numArray[1];
                    num2 = numArray[2];
                    num3 = numArray[3];
                }
                for (var i = 0; i < params.length; i++) {
                    var obj = params[i];
                    if (obj) {
                        if (i == 0) {
                            res = StatsCommon.isNull(category2[obj.dataIndex]) ? '' : (category2[obj.dataIndex] + '<br/>');
                        }
                        var objVal = (obj.value) == undefined ? 0 : (obj.value);
                        if (!StatsCommon.isNull(numArray)) {
                            switch (i) {
                                case 0:
                                    res += obj.marker + obj.seriesName + ': ' + objVal + unit + '(' + num0[obj.dataIndex] + '人)' + '<br/>';
                                    break;
                                case 1:
                                    res += obj.marker + obj.seriesName + ': ' + objVal + unit + '(' + num1[obj.dataIndex] + '人)' + '<br/>';
                                    break;
                                case 2:
                                    res += obj.marker + obj.seriesName + ': ' + objVal + unit + '(' + num2[obj.dataIndex] + '人)' + '<br/>';
                                    break;
                                case 3:
                                    res += obj.marker + obj.seriesName + ': ' + objVal + unit + '(' + num3[obj.dataIndex] + '人)' + '<br/>';
                                    break;

                            }

                        } else {
                            res += obj.marker + obj.seriesName + ': ' + objVal + unit + '<br/>';
                        }
                    }
                }
                return res;
            },
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: legend,
        grid: {
            left: '13%',
            right: legendPos == 'right' ? '15%' : '10%',
            containLabel: false
        },
        xAxis: {
            type: 'value',
            max: xAxisMax,
            name: xAxisName,
            axisLabel: {
                formatter: '{value} '
            }
        },
        yAxis: {
            type: 'category',
            name: yAxisName,
            axisLabel: {
                interval: 0,//横轴信息全部显示
                margin: 12          //刻度标签与轴线之间的距离。
            },
            data: category
        },
        series: seriesArr
    };

    StatsCommon.setOption(myChart, option);

};

/**
 * 设置日历图options
 * @param myChart
 * @param scatterData
 * @param yearMonth yyyy-MM
 * @param unit 数据单位
 */
StatsCommon.setCalentarOptions = function (myChart, scatterData, yearMonth, unit) {
    var cellSize = [100, 100];
    var pieRadius = 40;
    //设置图形默认颜色(0-1,1-10,10-30,30+)
    var colorList = ['#F6C159', '#7FC9FF', '#4CB5FF', '#0096FF'];

    function getPieSeries(scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
            var center = chart.convertToPixel('calendar', item);
            return {
                id: index + 'pie',
                type: 'pie',
                center: center,
                label: {
                    normal: {
                        formatter: '{c}',
                        position: 'inside'
                    }
                },
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colorList[params.dataIndex];
                        }
                    }
                },
                radius: pieRadius,
                data: [
                    {name: StatsCommon.CalendarItem.Less1, value: item[2]},
                    {name: StatsCommon.CalendarItem.Less10, value: item[3]},
                    {name: StatsCommon.CalendarItem.Less30, value: item[4]},
                    {name: StatsCommon.CalendarItem.More30, value: item[5]}
                ]
            };
        });
    };

    function getPieSeriesUpdate(scatterData, chart) {
        return echarts.util.map(scatterData, function (item, index) {
            var center = chart.convertToPixel('calendar', item);
            return {
                id: index + 'pie',
                center: center
            };
        });
    }

    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            formatter: function (params) {
                return params.marker + params.name + "：" + params.value + unit;
            }
        },
        legend: {
            data: [
                StatsCommon.CalendarItem.Less1,
                StatsCommon.CalendarItem.Less10,
                StatsCommon.CalendarItem.Less30,
                StatsCommon.CalendarItem.More30
            ],
            top: -5
            // bottom: 20
        },
        calendar: {
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            cellSize: cellSize,
            yearLabel: {
                show: false,
                textStyle: {
                    fontSize: 30
                }
            },
            dayLabel: {
                margin: 20,
                color: '#666',
                firstDay: 1,
                nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            },
            monthLabel: {
                show: false
            },
            range: [yearMonth]
        },
        series: [{
            id: 'label',
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        return echarts.format.formatTime('dd', params.value[0]);
                    },
                    offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    }
                }
            },
            data: scatterData
        }]
    };

    if (window) {
        var pieInitialized;
        setTimeout(function () {
            pieInitialized = true;
            if(!myChart.isDisposed()){
                myChart.setOption({
                    series: getPieSeries(scatterData, myChart)
                });
            }
        }, 10);

        window.onresize = function () {
            if (pieInitialized) {
                if(!myChart.isDisposed()){
                    myChart.setOption({
                        series: getPieSeriesUpdate(scatterData, myChart)
                    });
                }
            }
        };
    }

    StatsCommon.setOption(myChart, option);

};

/**
 * 获取x坐标轴默认值
 * @param period
 * @param dateStr
 * @param unit 单位(hour:小时，day:天)
 * @returns {Array}
 * @constructor
 */
StatsCommon.Default_category = function (period, dateStr, unit) {

    var category = [];

    if (unit == 'hour') {
        if (period == StatsCommon.PERIOD.WEEK || period == StatsCommon.PERIOD.MONTH) {
            category = ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12a', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '10p', '11p', '12p'];
        }
    } else {
        if (period == StatsCommon.PERIOD.WEEK) {
            var myDate = new Date();
            if(dateStr.indexOf('-') > 0){
                dateStr = dateStr.split(' ')[0];
                dateStr = dateStr.split('-');
                myDate = new Date(dateStr[0], dateStr[1] - 1, dateStr[2], 0, 0, 0);
            } else {
                myDate = new Date(dateStr);
            }



            var week = StatsCommon.getWeekDays(myDate);

            category.push(week.MON);
            category.push(week.TUES);
            category.push(week.WED);
            category.push(week.THUR);
            category.push(week.FRI);
            category.push(week.SAT);
            category.push(week.SUN);
        } else if (period == StatsCommon.PERIOD.MONTH) {
            var date = new Date(dateStr);
            date.setMonth(date.getMonth() + 1);
            date.setDate(0);
            var len = date.getDate();
            for (var i = 1; i <= len; i++) {
                date.setDate(i);
                category.push(StatsCommon.formatDate(date));
            }

        }
    }

    if (period == StatsCommon.PERIOD.YEAR) {
        category = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    }

    return category;

};
/**
 * 获取y坐标轴默认值
 * @param period
 * @param dateStr
 * @param unit 单位(hour:小时，day:天)
 * @returns {Array}
 * @constructor
 */
StatsCommon.Default_series = function (period, dateStr, unit) {
    // var myDate = new Date(dateStr);
    var val = [];

    if (unit == 'hour') {
        if (period == StatsCommon.PERIOD.WEEK || period == StatsCommon.PERIOD.MONTH) {
            for (var i = 1; i <= 24; i++) {
                val.push(0);
            }
        }

    } else {
        if (period == StatsCommon.PERIOD.WEEK) {
            val = [0, 0, 0, 0, 0, 0, 0];
        } else if (period == StatsCommon.PERIOD.MONTH) {
            var date = new Date(dateStr);
            date.setMonth(date.getMonth() + 1);
            date.setDate(0);
            var len = date.getDate();
            for (var i = 1; i <= len; i++) {
                val.push(0);
            }
        }
    }


    if (period == StatsCommon.PERIOD.YEAR) {
        val = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    return val;
};

/**
 * 获取24个时间段格式
 * @param point
 * @returns {{point: string, apm: string}}
 * @constructor
 */
StatsCommon.LearnPoint = function (point) {

    var val = '';
    var val2 = '';
    switch (point) {
        case 0:
            val = '00:00-00:59';
            val2 = '1a';
            break;
        case 1:
            val = '01:00-01:59';
            val2 = '2a';
            break;
        case 2:
            val = '02:00-02:59';
            val2 = '3a';
            break;
        case 3:
            val = '03:00-03:59';
            val2 = '4a';
            break;
        case 4:
            val = '04:00-04:59';
            val2 = '5a';
            break;
        case 5:
            val = '05:00-05:59';
            val2 = '6a';
            break;
        case 6:
            val = '06:00-06:59';
            val2 = '7a';
            break;
        case 7:
            val = '07:00-07:59';
            val2 = '8a';
            break;
        case 8:
            val = '08:00-08:59';
            val2 = '9a';
            break;
        case 9:
            val = '09:00-09:59';
            val2 = '10a';
            break;
        case 10:
            val = '10:00-10:59';
            val2 = '11a';
            break;
        case 11:
            val = '11:00-11:59';
            val2 = '12a';
            break;
        case 12:
            val = '12:00-12:59';
            val2 = '1p';
            break;
        case 13:
            val = '13:00-13:59';
            val2 = '2p';
            break;
        case 14:
            val = '14:00-14:59';
            val2 = '3p';
            break;
        case 15:
            val = '15:00-15:59';
            val2 = '4p';
            break;
        case 16:
            val = '16:00-16:59';
            val2 = '5p';
            break;
        case 17:
            val = '17:00-17:59';
            val2 = '6p';
            break;
        case 18:
            val = '18:00-18:59';
            val2 = '7p';
            break;
        case 19:
            val = '19:00-19:59';
            val2 = '8p';
            break;
        case 20:
            val = '20:00-20:59';
            val2 = '9p';
            break;
        case 21:
            val = '21:00-21:59';
            val2 = '10p';
            break;
        case 22:
            val = '22:00-22:59';
            val2 = '11p';
            break;
        case 23:
            val = '23:00-23:59';
            val2 = '12p';
            break;
        default :
            val = '-- - --';
            val2 = '--';
            break;
    }

    return {'point': val, 'apm': val2};

};

/**
 * 获取24个时间段格式
 * @param point
 * @returns {{point: string, apm: string}}
 * @constructor
 */
StatsCommon.LearnPointInverse = function (point) {

    var val = '';
    var val2 = '';
    switch (point) {
        case '12p':
            val = '00:00-00:59';
            val2 = 0;
            break;
        case '1a':
            val = '01:00-01:59';
            val2 = 1;
            break;
        case '2a':
            val = '02:00-02:59';
            val2 = 2;
            break;
        case '3a':
            val = '03:00-03:59';
            val2 = 3;
            break;
        case '4a':
            val = '04:00-04:59';
            val2 = 4;
            break;
        case '5a':
            val = '05:00-05:59';
            val2 = 5;
            break;
        case '6a':
            val = '06:00-06:59';
            val2 = 6;
            break;
        case '7a':
            val = '07:00-07:59';
            val2 = 7;
            break;
        case '8a':
            val = '08:00-08:59';
            val2 = 8;
            break;
        case '9a':
            val = '09:00-09:59';
            val2 = 9;
            break;
        case '10a':
            val = '10:00-10:59';
            val2 = 10;
            break;
        case '11a':
            val = '11:00-11:59';
            val2 = 11;
            break;
        case '12a':
            val = '12:00-12:59';
            val2 = 12;
            break;
        case '1p':
            val = '13:00-13:59';
            val2 = 13;
            break;
        case '2p':
            val = '14:00-14:59';
            val2 = 14;
            break;
        case '3p':
            val = '15:00-15:59';
            val2 = 15;
            break;
        case '4p':
            val = '16:00-16:59';
            val2 = 16;
            break;
        case '5p':
            val = '17:00-17:59';
            val2 = 17;
            break;
        case '6p':
            val = '18:00-18:59';
            val2 = 18;
            break;
        case '7p':
            val = '19:00-19:59';
            val2 = 19;
            break;
        case '8p':
            val = '20:00-20:59';
            val2 = 20;
            break;
        case '9p':
            val = '21:00-21:59';
            val2 = 21;
            break;
        case '10p':
            val = '22:00-22:59';
            val2 = 22;
            break;
        case '11p':
            val = '23:00-23:59';
            val2 = 23;
            break;
        default :
            val = '-- - --';
            val2 = -1;
            break;
    }

    return {'point': val, 'apm': val2};

};

/**
 * 资源类型
 * @type {{VIDEO: string, HOMEWORK: string, TEST: string, EXAM: string, TOPIC: string, DOC: string, EXPERIMENT: string, TEXT: string, COURSEWARE: string, RESOURCE: string, LINK: string, LIVE: string, NOTE: string, QUESTION: string}}
 */
StatsCommon.RESOURCETYPE = {
    VIDEO: 'video',//视频学习类型
    HOMEWORK: 'homework',//作业学习类型
    TEST: 'test',//测试学习类型
    EXAM: 'exam',//考试学习类型
    TOPIC: 'topic',//讨论学习类型
    DOC: 'doc',//文档学习类型
    EXPERIMENT: 'experiment',//实验学习类型
    TEXT: 'text',//图文学习类型
    COURSEWARE: 'courseware',//电子课件学习类型
    RESOURCE: 'resource',//下载资料学习类型
    LINK: 'link',//链接学习类型
    LIVE: 'live',//直播学习类型
    NOTE: 'note',//笔记学习类型
    QUESTION: 'question'//答疑学习类型
};

/**
 * 学习类型
 * @type {{VIDEO: string, HOMEWORK: string, TEST: string, EXAM: string, TOPIC: string, DOC: string, EXPERIMENT: string, TEXT: string, COURSEWARE: string, RESOURCE: string, LINK: string, LIVE: string, NOTE: string, QUESTION: string, COURSE_DETAIL: string, COURSE_EXAM: string, COURSE_HOMEWORK: string, COURSE_TEST: string, COURSE_TOPIC: string, COURSE_NOTICE: string, COURSE_ANSWER: string, COURSE_NOTE: string, COURSE_STATIS: string, COURSE_COMMENT: string}}
 */
StatsCommon.STUDYTYPE = {
    VIDEO: 'video',//视频学习类型
    HOMEWORK: 'homework',//作业学习类型
    TEST: 'test',//测试学习类型
    EXAM: 'exam',//考试学习类型
    TOPIC: 'topic',//讨论学习类型
    DOC: 'doc',//文档学习类型
    EXPERIMENT: 'experiment',//实验学习类型
    TEXT: 'text',//图文学习类型
    COURSEWARE: 'courseware',//电子课件学习类型
    RESOURCE: 'resource',//下载资料学习类型
    LINK: 'link',//链接学习类型
    LIVE: 'live',//直播学习类型
    NOTE: 'note',//笔记学习类型
    QUESTION: 'answer',//答疑学习类型
    COURSE_DETAIL: 'courseDetail',//组件类型-课程简介
    COURSE_EXAM: 'exam',//组件类型-考试
    COURSE_HOMEWORK: 'homework',//组件类型-作业
    COURSE_TEST: 'test',//组件类型-自测
    COURSE_TOPIC: 'topic',//组件类型-主题讨论
    COURSE_NOTICE: 'courseNotice',//组件类型-课程通知
    COURSE_ANSWER: 'answer',//组件类型-课程答疑
    COURSE_NOTE: 'note',//组件类型-课程笔记
    COURSE_STATIS: 'courseStatis',//组件类型-课程统计
    COURSE_COMMENT: 'courseComment',//组件类型-课程评价
    COURSE_MAIN: 'courseMain'//组件类型-课程主页面离开页面标识
};

/**
 * 获取学习类型名称
 * @param type
 * @returns {*}
 */
StatsCommon.getStudyTypeName = function (type) {
    if (type == StatsCommon.STUDYTYPE.VIDEO) {
        return '视频';
    } else if (type == StatsCommon.STUDYTYPE.HOMEWORK) {
        return '作业';
    } else if (type == StatsCommon.STUDYTYPE.TEST) {
        return '测试';
    } else if (type == StatsCommon.STUDYTYPE.EXAM) {
        return '考试';
    } else if (type == StatsCommon.STUDYTYPE.TOPIC) {
        return '讨论';
    } else if (type == StatsCommon.STUDYTYPE.DOC) {
        return '文档';
    } else if (type == StatsCommon.STUDYTYPE.EXPERIMENT) {
        return '实验';
    } else if (type == StatsCommon.STUDYTYPE.TEXT) {
        return '图文';
    } else if (type == StatsCommon.STUDYTYPE.COURSEWARE) {
        return '电子课件';
    } else if (type == StatsCommon.STUDYTYPE.RESOURCE) {
        return '下载资料';
    } else if (type == StatsCommon.STUDYTYPE.LINK) {
        return '链接';
    } else if (type == StatsCommon.STUDYTYPE.LIVE) {
        return '直播';
    } else if (type == StatsCommon.STUDYTYPE.NOTE) {
        return '笔记';
    } else if (type == StatsCommon.STUDYTYPE.QUESTION) {
        return '答疑';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_DETAIL) {
        return '课程简介';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_EXAM) {
        return '考试';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_HOMEWORK) {
        return '作业';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_TEST) {
        return '自测';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_TOPIC) {
        return '主题讨论';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_NOTICE) {
        return '课程通知';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_ANSWER) {
        return '课程答疑';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_NOTE) {
        return '课程笔记';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_STATIS) {
        return '课程统计';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_COMMENT) {
        return '课程评价';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_MAIN) {
        return '离开平台';
    } else {
        return type;
    }

}
/**
 * 获取学习类型名称
 * @param type
 * @returns {*}
 */
StatsCommon.getStudyTypeColor = function (type) {
    if (type == StatsCommon.STUDYTYPE.VIDEO) {
        return '#c59788';
    } else if (type == StatsCommon.STUDYTYPE.HOMEWORK) {
        return '#b18c57';
    } else if (type == StatsCommon.STUDYTYPE.TEST) {
        return '#bdafab';
    } else if (type == StatsCommon.STUDYTYPE.EXAM) {
        return '#a6c2b5';
    } else if (type == StatsCommon.STUDYTYPE.TOPIC) {
        return '#8aa192';
    } else if (type == StatsCommon.STUDYTYPE.DOC) {
        return '#7d9fa4';
    } else if (type == StatsCommon.STUDYTYPE.EXPERIMENT) {
        return 'red';
    } else if (type == StatsCommon.STUDYTYPE.TEXT) {
        return '#6b7479';
    } else if (type == StatsCommon.STUDYTYPE.COURSEWARE) {
        return '#6b8a9f';
    } else if (type == StatsCommon.STUDYTYPE.RESOURCE) {
        return '#69a3c6';
    } else if (type == StatsCommon.STUDYTYPE.LINK) {
        return '#65b0c1';
    } else if (type == StatsCommon.STUDYTYPE.LIVE) {
        return '#7e7f81';
    } else if (type == StatsCommon.STUDYTYPE.NOTE) {
        return '#73bdf4';
    } else if (type == StatsCommon.STUDYTYPE.QUESTION) {

        return '#F5BAB3';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_DETAIL) {
        return '#EFD8B8';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_EXAM) {
        return '#E4EEB9';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_HOMEWORK) {
        return '#C5EFB9';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_TEST) {
        return '#B9EFCC';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_TOPIC) {
        return '#B9EAEF';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_NOTICE) {
        return '#B9C9EE';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_ANSWER) {
        return '#C6BAED';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_NOTE) {
        return '#DFBBEC';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_STATIS) {
        return '#E9BEDF';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_COMMENT) {
        return '#EFB8B9';
    } else if (type == StatsCommon.STUDYTYPE.COURSE_MAIN) {
        return '#DDDDDD';
    } else {
        return type;
    }

}

/**
 * 统计数据部分:点击次数/学习时长
 * @type {{CLICK: string, TIME: string}}
 */
StatsCommon.INFOTYPE = {
    CLICK: 'click',
    TIME: 'time'
};


/**
 * 返回Echart中Series对象(柱状图自定义颜色)
 * @param legendName
 * @param val
 * @param type
 * @returns {{name: *, type: *, data: *, itemStyle: {normal: {color: color}}, markPoint: {data: [*,*]}}}
 */
StatsCommon.setSeries = function (legendName, val, type, index) {

    function getColor() {
        // build a color map as your need.
        var colorList = [
            '#33aaff', '#89d7ff', '#b09ff0', '#f0b0e9', '#ee9999',
            '#ffb96e', '#ffe775', '#b0d850', '#63d25e', '#1dc95e',
            '#1fd7cc', '#00d2ff'
        ];
        return colorList[index];
    }

    var series = {};
    if (type == 'bar') {
        series = {
            name: legendName,
            type: type,
            data: val,
            itemStyle: {
                normal: {
                    color: function (params) {
                        // build a color map as your need.
                        var colorList = [
                            '#33aaff', '#89d7ff', '#b09ff0', '#f0b0e9', '#ee9999',
                            '#ffb96e', '#ffe775', '#b0d850', '#63d25e', '#1dc95e',
                            '#1fd7cc', '#00d2ff'
                        ];
                        return colorList[(params.dataIndex) % 12];
                    },
                    opacity: 0.85
                }
            },
            barWidth: '50px'

        }
    } else {
        series = {
            name: legendName,
            type: type,
            data: val,
            itemStyle: {  //折线拐点的样式
                normal: {
                    color: getColor()
                }
            },
            lineStyle: {  //线条的样式
                normal: {
                    color: getColor()
                }
            }
        }
    }

    return series;
};


/**
 * 返回Echart中xAxis对象
 * @param category
 * @param period
 * @returns {{}}
 */
StatsCommon.setXAxis = function (category, period) {
    var xAxis = {};
    if (period == StatsCommon.PERIOD.MONTH) {
        xAxis = {
            type: 'category',
            boundaryGap: false,
            data: category,
            axisLabel: {
                interval: 0,//横轴信息全部显示
                formatter: function (value, index) {
                    return StatsCommon.formatter(value, index);
                }

            }
        }
    } else {
        xAxis = {
            type: 'category',
            boundaryGap: false,
            data: category
        }
    }

    return xAxis;
}

/**
 * Echart 模板
 * @param myChart
 * @param legendName
 * @param category
 * @param yName
 * @param series
 * @param xAxis
 */
StatsCommon.setEchartsOptions = function (myChart, legendName, category, yName, series, xAxis) {
    var option = {};
    if (xAxis != "" && xAxis != null && xAxis != undefined) {
        option = {
            backgroundColor: StatsCommon.consts.backgroundColor,
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legendName
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {show: true},
                    dataView: {show: false},
                    magicType: {show: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: xAxis,
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} ' + yName
                    }
                }
            ],
            series: series
        };
    } else {
        option = {
            backgroundColor: StatsCommon.consts.backgroundColor,
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: legendName
            },
            toolbox: {
                show: false,
                feature: {
                    mark: {show: true},
                    dataView: {show: false},
                    magicType: {show: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: category
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} ' + yName
                    }
                }
            ],
            series: series
        };
    }


    StatsCommon.setOption(myChart, option);
}


/**
 * 资源类型转换成中文
 * @param type
 * @returns {*}
 */
StatsCommon.getResourceName = function (type) {
    if (type == StatsCommon.RESOURCETYPE.VIDEO) {
        return '视频';
    } else if (type == StatsCommon.RESOURCETYPE.HOMEWORK) {
        return '作业';
    } else if (type == StatsCommon.RESOURCETYPE.TEST) {
        return '测试';
    } else if (type == StatsCommon.RESOURCETYPE.EXAM) {
        return '考试';
    } else if (type == StatsCommon.RESOURCETYPE.TOPIC) {
        return '讨论';
    } else if (type == StatsCommon.RESOURCETYPE.DOC) {
        return '文档';
    } else if (type == StatsCommon.RESOURCETYPE.EXPERIMENT) {
        return '实验';
    } else if (type == StatsCommon.RESOURCETYPE.TEXT) {
        return '图文';
    } else if (type == StatsCommon.RESOURCETYPE.COURSEWARE) {
        return '电子课件';
    } else if (type == StatsCommon.RESOURCETYPE.RESOURCE) {
        return '下载资料';
    } else if (type == StatsCommon.RESOURCETYPE.LINK) {
        return '链接';
    } else if (type == StatsCommon.RESOURCETYPE.LIVE) {
        return '直播';
    } else if (type == StatsCommon.RESOURCETYPE.NOTE) {
        return '笔记';
    } else if (type == StatsCommon.RESOURCETYPE.QUESTION) {
        return '答疑';
    } else {
        return ''
    }

}


/**
 * 资源类型对应的颜色
 * @param type
 * @returns {*}
 */
StatsCommon.getResourceColor = function (type) {
    if (type == StatsCommon.RESOURCETYPE.VIDEO) {
        return '#c59788';
    } else if (type == StatsCommon.RESOURCETYPE.HOMEWORK) {
        return '#b18c57';
    } else if (type == StatsCommon.RESOURCETYPE.TEST) {
        return '#bdafab';
    } else if (type == StatsCommon.RESOURCETYPE.EXAM) {
        return '#a6c2b5';
    } else if (type == StatsCommon.RESOURCETYPE.TOPIC) {
        return '#8aa192';
    } else if (type == StatsCommon.RESOURCETYPE.DOC) {
        return '#7d9fa4';
    } else if (type == StatsCommon.RESOURCETYPE.TEXT) {
        return '#6b7479';
    } else if (type == StatsCommon.RESOURCETYPE.COURSEWARE) {
        return '#6b8a9f';
    } else if (type == StatsCommon.RESOURCETYPE.RESOURCE) {
        return '#69a3c6';
    } else if (type == StatsCommon.RESOURCETYPE.LINK) {
        return '#65b0c1';
    } else if (type == StatsCommon.RESOURCETYPE.LIVE) {
        return '#7e7f81';
    } else if (type == StatsCommon.RESOURCETYPE.NOTE) {
        return '#73bdf4';
    } else if (type == StatsCommon.RESOURCETYPE.QUESTION) {
        return '#73bdf4';
    } else if (type == StatsCommon.RESOURCETYPE.EXPERIMENT) {
        return '#73bdf4';
    } else {
        return '#73bdf4'
    }

}

/**
 * 根据传入的日期返回格式化后的周一到周日
 * 格式:
 *  MM  eg: 08
 *  dd  eg: 05
 *  M  eg: 8
 *  d  eg: 5
 * @param date
 * @param format 默认为yyyy-MM-dd
 * @returns {{MON: *, TUES: *, WED: *, THUR: *, FRI: *, SAT: *, SUN: *}}
 */
StatsCommon.getWeekDays = function (date, format) {


    var myDate = new Date(date);
    var day = myDate.getDay() || 7;

    var mon = StatsCommon.formatDate(new Date(myDate.getFullYear(), myDate.getMonth(), (myDate.getDate() + 1 - day)), format);
    var tues = StatsCommon.formatDate(new Date(myDate.getFullYear(), myDate.getMonth(), (myDate.getDate() + 1 - day + 1)), format);
    var wed = StatsCommon.formatDate(new Date(myDate.getFullYear(), myDate.getMonth(), (myDate.getDate() + 1 - day + 2)), format);
    var thur = StatsCommon.formatDate(new Date(myDate.getFullYear(), myDate.getMonth(), (myDate.getDate() + 1 - day + 3)), format);
    var fri = StatsCommon.formatDate(new Date(myDate.getFullYear(), myDate.getMonth(), (myDate.getDate() + 1 - day + 4)), format);
    var sat = StatsCommon.formatDate(new Date(myDate.getFullYear(), myDate.getMonth(), (myDate.getDate() + 1 - day + 5)), format);
    var sun = StatsCommon.formatDate(new Date(myDate.getFullYear(), myDate.getMonth(), (myDate.getDate() + 1 - day + 6)), format);

    return {
        MON: mon,
        TUES: tues,
        WED: wed,
        THUR: thur,
        FRI: fri,
        SAT: sat,
        SUN: sun
    };
};

/**
 *  * 格式:
 *  yyyy  (年) eg：2017
 *  MM (月)  eg: 08
 *  dd (日)  eg: 05
 *  M (月)  eg: 8
 *  d (日)  eg: 5
 *  hh (小时) eg：23
 *  mm (分钟) eg：59
 *  ss (秒) eg：59
 *
 * @param date
 * @param format yyyy-MM-dd hh:mm:ss,默认为yyyy-MM-dd
 * @returns {string|XML}
 */
StatsCommon.formatDate = function (date, format) {
    if (!format) {
        format = 'yyyy-MM-dd';
    }
    var month_M = date.getMonth() + 1;
    var month_MM = month_M < 10 ? ('0' + month_M) : month_M;
    var day_d = date.getDate();
    var day_dd = day_d < 10 ? '0' + day_d : day_d;
    var day_hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var day_mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var day_ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    return format.replace('yyyy', date.getFullYear()).replace('MM', month_MM).replace('dd', day_dd).replace('M', month_M).replace('d', day_d)
        .replace('hh', day_hh).replace('mm', day_mm).replace('ss', day_ss);
}

/**
 * 天日历控件
 * @param _this
 * @param callback
 * @constructor
 */
StatsCommon.DayWdatePicker = function (_this, callback) {
    WdatePicker({
        el: _this,
        firstDayOfWeek: 1,//周一显示在第一列，取值（0-6），周日是0
        isShowClear: false,
        isShowToday: false,
        errDealMode: -1,
        skin: 'statis',
        readOnly: true,
        onpicked: function (dp) {
            var curDate = dp.cal.getDateStr();
            var day = StatsCommon.formatDate(new Date(curDate));
            $(_this).val(day);
            $(_this).html(day);

            callback(curDate);
        },
        dateFmt: 'yyyy-MM-dd',
        maxDate: '%y'
    });
};

/**
 * 周日历控件
 * @param _this
 * @param callback
 * @constructor
 */
StatsCommon.WeekWdatePicker = function (_this, callback, value) {
    var specArr = [];
    //高亮当前周
    if (!StatsCommon.isNull(value)) {
        var specWeek = StatsCommon.getWeekDays(value, 'yyyy-MM-dd');
        specArr = [specWeek.MON, specWeek.TUES, specWeek.WED, specWeek.THUR, specWeek.FRI, specWeek.SAT, specWeek.SUN];
    } else {
        value = StatsCommon.formatDate(new Date(), 'yyyy-MM-dd');
    }

    WdatePicker({
        el: _this,
        firstDayOfWeek: 1,//周一显示在第一列，取值（0-6），周日是0
        isShowClear: false,//时候显示清空按钮
        isShowToday: false,//时候显示今天按钮
        errDealMode: -1,//禁用纠错模式
        startDate: value, //回显日期
        alwaysUseStartDate: true,//日期框无论是何值,始终使用 startDate 做为起始日期
        specialDates: specArr,//特殊日期，回显高亮周使用
        skin: 'statis',
        readOnly: true,
        onpicked: function (dp) {
            var curDate = dp.cal.getDateStr();
            var week = StatsCommon.getWeekDays(curDate, 'M月d日');
            $(_this).val(curDate);
            $(_this).html(week.MON + '-' + week.SUN);

            callback(curDate);
        },
        dateFmt: 'yyyy-MM-dd',
        maxDate: '%y'
    });
};

/**
 * 月日历控件
 * @param _this
 * @param callback
 * @constructor
 */
StatsCommon.MonthWdatePicker = function (_this, callback,isShowClear,clearback) {

    WdatePicker({
        firstDayOfWeek: 1,//周一显示在第一列，取值（0-6），周日是0
        isShowClear: (!StatsCommon.isNull(isShowClear) ? true : false),
        isShowToday: false,
        readOnly: true,
        skin: 'statis',
        dateFmt: 'yyyy-MM',
        onpicked: function (dp) {
            var curDate = dp.cal.getDateStr();
            $(_this).val(curDate);

            callback(curDate);
        },
        oncleared:function (dp){
            clearback();
        },
        maxDate: '%y-%M'
    });
};

/**
 * 年日历控件
 * @param _this
 * @param callback
 * @constructor
 */
StatsCommon.YearWdatePicker = function (_this, callback) {

    WdatePicker({
        firstDayOfWeek: 1,//周一显示在第一列，取值（0-6），周日是0
        isShowClear: false,
        isShowToday: false,
        readOnly: true,
        skin: 'statis',
        dateFmt: 'yyyy',
        onpicked: function (dp) {
            var curDate = dp.cal.getDateStr();
            $(_this).val(curDate);

            callback(curDate);
        },
        maxDate: '%y'
    });
};

/**
 * 格式化成每月第一天显示08-01 2017  其余时间显示日
 * @param value
 * @param index
 * @returns {string}
 */
StatsCommon.formatter = function (value, index) {
    // 格式化成日，只在第一个刻度显示年和月
    var dates = value.split("-");
    if (dates.length == 1) {
        return value;
    }
    var texts = [dates[2]];//日
    if (index === 0) {
        texts = [];
        var t = dates[2].split("(");
        if (t.length > 1) {
            texts = ["\n" + "(" + t[1]];//人数
        }
        texts.unshift(dates[0]);//年
        if (t.length <= 1) {
            texts.unshift("\n");//年
        }
        if (t.length > 1) {
            texts.unshift(t[0]);//日
        } else {
            texts.unshift(dates[2]);//日
        }
        texts.unshift(dates[1] + "-");//月
    }
    return texts.join("");
}

/**
 * 阿拉伯数字大小写转换
 * @param num 阿拉伯数字
 * @returns {*}
 */
StatsCommon.numToChineseNum = function (num) {

    if (!/^\d*(\.\d*)?$/.test(num)) {
        alert("Number is wrong!");
        return "Number is wrong!";
    }
    //var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
    //var BB = new Array("", "拾", "佰", "仟", "萬", "億", "点", "");

    var AA = new Array("0", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    var BB = new Array("", "十", "百", "千", "万", "亿", "点", "");

    var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;

        if (a[0].charAt(i) != 0) {
            if (a[0].length == 2 && i == 0 && a[0].charAt(i) == 1) {
                re = BB[k % 4] + re;
            } else {
                re = AA[a[0].charAt(i)] + BB[k % 4] + re;
            }
        }
        ;

        k++;
    }

    if (a.length > 1) { //加上小数部分(如果有小数部分)
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    return re;
}

/**
 * 横向柱状图
 * @param myChart
 * @param legendName 图例
 * @param category
 * @param val
 * @param categoryName category轴名称
 * @param valName val轴名称
 * @param yName x轴每个数据后的单位
 * 非必填字段↓
 * @param xAxisMax x轴最大值
 * @param splitNumber x轴划分为多少个刻度线
 * @param sectionVal 数组 展示标题  例如;['第X章 第N讲 光辉岁月','第X章 第N讲 光辉']
 */
StatsCommon.setHorizontalBarOptions = function (myChart, legendName, category, val, categoryName, valName, yName, xAxisMax, splitNumber, sectionVal) {

    var isMax = StatsCommon.isMaxValue(val);
    if(!StatsCommon.isNull(xAxisMax)){
        isMax = false;
    }
    if (yName == '分钟') {
        if (StatsCommon.isChangeLearnTime2Hours(val)) {
            yName = '小时'
            val = StatsCommon.changeLearnTime2Hours(val);
        }
    }


    var category2 = [];
    $.each(category, function (i, e) {
        category2.push(category[i]);
        category[i] = StatsCommon.cutStr(e, 10);
    });

    if (!StatsCommon.isNull(sectionVal) && sectionVal.length > 0) {
        category2 = sectionVal;
    }


    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'//指示器类型。['line' 直线指示器,'shadow' 阴影指示器]
            },
            formatter: function (params) {
                if (StatsCommon.isNull(yName)) {
                    return (category2[params[0].dataIndex] != null ? (category2[params[0].dataIndex]) : (category[params[0].dataIndex])) + "<br/>" + params[0].marker + params[0].seriesName + "：" + params[0].value;
                } else {
                    return (category2[params[0].dataIndex] != null ? (category2[params[0].dataIndex]) : (category[params[0].dataIndex])) + "<br/>" + params[0].marker +  params[0].seriesName + "：" + params[0].value + yName;


                }
            }
        },
        // legend: {
        //     data: [legendName]
        // },
        grid: {//坐标轴形成的矩形的尺寸和位置
            left: '13%',
            // right: '10%',
            // bottom: '10%',
            containLabel: false
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                name: valName+(StatsCommon.isNull(yName)?'':('('+yName+')')),
                type: 'value',
                max: isMax ? null : (StatsCommon.isNull(xAxisMax)?5:xAxisMax),
                splitNumber: StatsCommon.isNull(splitNumber) ? 5 : splitNumber,
                // axisLabel: {
                //     formatter: function (s) {
                //         return s;
                //     }
                // },
                boundaryGap: false//坐标轴两边留白策略，false为不留白，默认为true
            }
        ],
        yAxis: [
            {
                name: categoryName,
                type: 'category',
                axisLabel: {
                    interval: 0//横轴信息全部显示
                },
                data: category
            }
        ],
        series: [
            {
                name: legendName,
                type: 'bar',
                data: val,
                barMaxWidth: 30,
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: function (params) {
                            if (params.value == 0) {
                                return '';
                            }
                            if (StatsCommon.isNull(yName)) {
                                return params.value;
                            } else {
                                if (yName == '%') {
                                    if (params.value <= 5) {
                                        return '';
                                    }
                                }
                                return params.value + yName;
                            }

                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#73bdf4'
                    }
                }
                // markPoint: {
                //     data: [
                //         {type: 'max', name: '最大值'},
                //         {type: 'min', name: '最小值'}
                //     ]
                // }

            }
        ]
    };

    StatsCommon.setOption(myChart, option);
};

/**
 * 获取14个资源类型样式
 * @param resouceType
 * @returns {string}
 */
StatsCommon.getResouceTypeCSS = function (resouceType) {
    var str = '';
    switch (resouceType) {
        case StatsCommon.RESOURCETYPE.VIDEO:
            str = '<i class="coursespace icon-treevideo"></i>';
            break;
        case StatsCommon.RESOURCETYPE.HOMEWORK:
            str = '<i class="coursespace icon-treework"></i>';
            break;
        case StatsCommon.RESOURCETYPE.TEST:
            str = '<i class="coursespace icon-treetest"></i>';
            break;
        case StatsCommon.RESOURCETYPE.EXAM:
            str = '<i class="coursespace icon-treeexam"></i>';
            break;
        case StatsCommon.RESOURCETYPE.TOPIC:
            str = '<i class="coursespace icon-treediscuss"></i>';
            break;
        case StatsCommon.RESOURCETYPE.DOC:
            str = '<i class="coursespace icon-treefile"></i>';
            break;
        case StatsCommon.RESOURCETYPE.EXPERIMENT:
            str = '<i class="coursespace icon-treeexam"></i>';
            break;
        case StatsCommon.RESOURCETYPE.TEXT:
            str = '<i class="coursespace icon-treetw"></i>';
            break;
        case StatsCommon.RESOURCETYPE.COURSEWARE:
            str = '<i class="coursespace icon-treecourse"></i>';
            break;
        case StatsCommon.RESOURCETYPE.RESOURCE:
            str = '<i class="coursespace icon-treedownload"></i>';
            break;
        case StatsCommon.RESOURCETYPE.LINK:
            str = '<i class="coursespace icon-treelink"></i>';
            break;
        case StatsCommon.RESOURCETYPE.LIVE:
            str = '<i class="coursespace icon-treelive"></i>';
            break;
        case StatsCommon.RESOURCETYPE.NOTE:
            str = '<i class="coursespace icon-treevideo"></i>';
            break;
        case StatsCommon.RESOURCETYPE.QUESTION:
            str = '<i class="coursespace icon-treevideo"></i>';
            break;
        default :
            str = '<i class="coursespace icon-treevideo"></i>';
            break;
    }

    return str;

};

StatsCommon.finishStatus = {
    COMPLETE: 'completed',//完成
    UNCOMPLETE: 'incomplete'//未完成
}

/**
 * 返回多轴图表
 * @param myChart
 * @param legendName 标题数组 ['标题1','标题2']
 * @param yName y轴名称 ['次','个']
 * @param val 值数组（子数据数=yName数组的长度）  ['数组1','数组2']   数组1=['a1','a2']
 * @param xAxis x轴数据  ['x1','x2']
 * 以下非必填属性↓
 * @param tooltips 鼠标悬浮图形上的tip信息  [{name: '点击量', isUseX: false}, {name: '平均单次观看时长', isUseX: false}] isUseX Y轴单位数 如果为true 则为1个单位,false 则为对应单位
 * @param yCount y轴数量 默认2
 * @param colorArray 颜色数组 ['#5C99F0','#5C99F0']
 * @param dataZoomMin 滚动条初始位置 最大100 默认0  70
 * @param showDataZoom 滚动条是否显示 show ,hide 默认 show
 * @param yTitle y轴名称 [{name:'y轴名称1',max:'dataMax'},{name:'y轴名称2',max:'dataMax'}] name y轴名称 , max 刻度最大值 默认 数据最大值
 * @param xTitle x轴名称 '时间'
 * @param tooltipsExt 悬浮提示扩展内容数组，数组长度=xAxis长度 [{name:'名称',val:'值',unit:'单位'},{name:'名称',val:'值',unit:'单位'}]
 * @param sectionVal 数组 展示标题  例如;['第X章 第N讲 光辉岁月','第X章 第N讲 光辉']
 *
 */
StatsCommon.setEchartsOptions2 = function (myChart, legendName, yName, val, xAxis, tooltips, yCount, colorArray, dataZoomMin, showDataZoom, yTitle,xTitle, tooltipsExt, sectionVal) {

    var isMax = StatsCommon.isMaxValue(val);
    var learnTimeName = "";
    for (var i = 0; i < yName.length; i++) {
        if (yName[i] == '分钟') {
            if (StatsCommon.isChangeLearnTime2Hours(val[i])) {
                yName[i] = '小时';
                val[i] = StatsCommon.changeLearnTime2Hours(val[i]);
            }
            learnTimeName = i;
        }
    }
    if (StatsCommon.isNull(yCount)) {
        yCount = 2;
    }


    var category = [];

    var isShowDataZoom = true;
    if (!StatsCommon.isNull(showDataZoom) && showDataZoom == 'hide') {
        isShowDataZoom = false;
    }

    $.each(xAxis, function (i, e) {
        category.push(xAxis[i]);
        xAxis[i] = StatsCommon.getStrForLineBreak(xAxis[i]);
    });

    if (!StatsCommon.isNull(sectionVal) && sectionVal.length == category.length) {
        category = sectionVal;
    }

    if (legendName.length != val.length) {
        return;
    }
    var dataZoomStart = 0;
    var dataZoomEnd = 100;
    if (StatsCommon.isNull(dataZoomMin)) {
        dataZoomStart = 0;
    } else {
        dataZoomStart = dataZoomMin;
    }

    /**
     * 设置x轴数据
     * @param xAxis 数据(数组)
     * @returns {{}}
     */
    function setXAxis1(xAxis) {
        var x = {};
        x = {
            type: 'category',
            name: !StatsCommon.isNull(xTitle)?xTitle:"",
            boundaryGap: true,
            data: xAxis
        };
        return x;
    }

    /**
     * 第一个带辅助线 其余不带
     * @param yName y轴单位(多个传数组,单个传字符串)
     * @returns {*}
     */
    function setYAxis1(yCount) {
        var yArray = [];
        for (var i = 0; i < yCount; i++) {
            var y = {};
            if (i == 0) {
                y = {
                    type: 'value',
                    max: isMax?null:5,
                    axisLabel: {
                        formatter: function (value, index) {
                            if (yName.length > 2) {
                                return value;
                            }
                            return value ;
                        }
                    }
                };
            } else {
                y = {
                    type: 'value',
                    max: isMax?null:5,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: function (value, index) {
                            return value ;
                        }
                    }
                };
            }

            if (StatsCommon.isNull(yTitle)) {
                y.name = StatsCommon.isNull(legendName[i]) ? "" : legendName[i];
            } else {
                y.name = StatsCommon.isNull(yTitle[i].name) ? yTitle[i] : yTitle[i].name;
                if (!StatsCommon.isNull(yTitle[i].max)) {
                    y.max = yTitle[i].max;
                }
            }
            if(learnTimeName !='' ){
                if(learnTimeName == i || (learnTimeName ==yCount && i+1 ==learnTimeName)){
                    y.name += "("+yName[learnTimeName]+")";
                }
            }

            yArray.push(y);
        }

        return yArray;
    };

    /**
     * 返回数据
     * @param val 值 数组
     * @param legendName 标题数组
     * @returns {*}
     */
    function setSeries1(val, legendName, colors) {
        var seriesArray = [];
        for (var i = 0; i < val.length; i++) {
            var series = {};
            var color = '';
            if (StatsCommon.isNull(colors)) {
                if (i != val.length - 1) {
                    color = '#73bdf4';
                } else {
                    color = '#e2b772';
                }
            } else if (colors.length == val.length) {
                color = colors[i];
            } else if (colors.length != val.length) {
                color = colors[i % colors.length];
            }


            if (i != val.length - 1) {
                series = {
                    name: legendName[i],
                    type: 'bar',
                    data: val[i],
                    barMaxWidth: 30,
                    itemStyle: {
                        normal: {
                            color: color,
                            opacity: 0.85,
                            barBorderRadius: [5, 5, 0, 0]//柱状图圆角（顺时针左上，右上，右下，左下）
                        }
                    }

                }
            } else {
                series = {
                    name: legendName[i],
                    type: 'line',
                    yAxisIndex: StatsCommon.isNull(yCount) ? 1 : yCount - 1,
                    connectNulls:true,
                    smooth: true,
                    data: val[i],
                    itemStyle: {  //折线拐点的样式
                        normal: {
                            color: color
                        }
                    },
                    lineStyle: {  //线条的样式
                        normal: {
                            color: color
                        }

                    }
                }

            }
            seriesArray.push(series);
        }

        return seriesArray;
    }


    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {

                var res = StatsCommon.isNull(category[params[0].dataIndex]) ? '' : (category[params[0].dataIndex] + '<br\>');
                for (var i = 0; i < params.length; i++) {
                    var temRes = params[i].name + ':' + params[i].value + '<br\>';
                    if(params[i].componentSubType == 'line' && StatsCommon.isNull(params[i].value)){
                        return ;
                    }
                    if (tooltips && tooltips[i]) {
                        if (tooltips[i].isUseX) {

                            temRes = params[i].marker + params[i].seriesName + '：' + params[i].value + yName[0] + '<br\>';

                        } else {

                            temRes = params[i].marker + params[i].seriesName + '：' + params[i].value + yName[params[i].seriesIndex] + '<br\>';

                        }
                    }
                    res += temRes;
                }
                //扩展悬浮提示内容
                if (tooltipsExt && tooltipsExt.length == category.length) {
                    var extName = tooltipsExt[params[0].dataIndex].name;
                    var extValue = tooltipsExt[params[0].dataIndex].value;
                    var extUnit = tooltipsExt[params[0].dataIndex].unit;
                    if (extValue > 0) {
                        if (extUnit == '秒') {
                            res += extName + '：' + StatsCommon.changeLearnTimeHours(Math.round(extValue * 10 / 60) / 10, '分钟') + '<br\>';
                        } else {
                            res += extName + '：' + extValue + extUnit + '<br\>';
                        }
                    }
                }


                return res;
            }
        },
        legend: {
            data: legendName
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: false},
                saveAsImage: {show: false}
            }
        },
        // dataZoom: {
        //     xAxisIndex:0,
        //     show: true,
        //     realtime: true,
        //     top:370,
        //     height:10,
        //     start: 0,
        //     end: 10
        // },
        //缩放
        dataZoom: [
            //数据缩放轴
            {
                type: 'slider',
                filterMode: 'weakFilter',
                showDataShadow: false,
                show: isShowDataZoom,
                bottom: 15,
                start: dataZoomStart,
                end: dataZoomEnd,
                height: 10,
                borderColor: 'transparent',
                backgroundColor: '#e2e2e2',
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                handleSize: 20,
                handleStyle: {
                    shadowBlur: 6,
                    shadowOffsetX: 1,
                    shadowOffsetY: 2,
                    shadowColor: '#aaa'
                },
                labelFormatter: ''
            }
            //设置内容区域可缩放
            // , {
            //  type: 'inside',
            //  filterMode: 'weakFilter'
            //  }
        ],

        calculable: true,
        xAxis: setXAxis1(xAxis),
        yAxis: setYAxis1(yCount),
        series: setSeries1(val, legendName, colorArray)
    };


    StatsCommon.setOption(myChart, option);
}


/**
 * 组合图（横向渐变图）
 * @param myChart
 * @param category [{vId: vId, vName: vName, totalTime: totalTime}]
 * @param val [{secStart: start, secEnd: end, learnNumRange: learnNumRange, color: 'rgb(255, 255, 255)' }]   learnNumRange 范围[0-10]
 * @param categoryName 名称轴名称
 * @param valName 数据轴名称
 * @param unit 数据单位
 * @param sectionVal 数组 展示标题  例如;['第X章 第N讲 光辉岁月','第X章 第N讲 光辉']
 */
StatsCommon.setAssemblyProfileOptions = function (myChart, category, val, categoryName, valName, unit, sectionVal) {

    $.each(category, function (i, e) {
        category[i].vName = StatsCommon.cutStr(e.vName, 10);
    });

    var data = [];//数据轴
    var categories = [];//name轴

    for (var i = 0; i < category.length; i++) {
        categories.push(category[i].vName);
    }

    var rectHeight = 1;//图形单元高度的百分比
    var dataZoomTop = 96;//缩放轴位置

    if (category.length > 10) {
        rectHeight = 3 / 4;
        // dataZoomTop = 98;
    } else if (category.length > 5) {
        rectHeight = 3 / 4;
    } else if (category.length < 3) {
        rectHeight = 2 / 3;
    }


    // 设置value的data数据
    echarts.util.each(category, function (item, index) {
        var objs = val[item.vId];
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            data.push({
                itemId: item.vId,
                name: obj.secStart + '-' + obj.secEnd,
                value: [
                    index,//第1列
                    obj.secStart,//第2列
                    obj.secEnd,//第3列
                    obj.learnNumRange,
                    obj.maxLearnNum
                ],
                itemStyle: {
                    normal: {
                        color: obj.color
                    }
                }
            });
        }
    });

    //渲染数据单元格式
    function renderItem(params, api) {
        //api.value(...)，意思是取出 dataItem 中的数值。例如 api.value(0) 表示取出当前 dataItem 中第一个列的数值。
        var categoryIndex = api.value(0);
        //api.coord(...)，意思是进行坐标转换计算。表示 dataItem 中的数值转换成坐标系上的点。
        var start = api.coord([api.value(1), categoryIndex]);
        var end = api.coord([api.value(2), categoryIndex]);
        var height = api.size([0, 1])[1] * 0.6;

        return {
            type: 'rect',
            //截取矩形区域
            shape: echarts.graphic.clipRectByRect({
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height * rectHeight
            }, {
                //params.coordSys.x 是grid的x
                //params.coordSys.y 是grid的y
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            }),
            style: api.style()
        };
    }


    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            formatter: function (params) {
                var learnNumRange = params.value[3];
                var maxLearnNum = params.value[4];
                var temStartVal = Math.round(learnNumRange * 0.1 * maxLearnNum);
                var temEndVal = temStartVal + Math.round(maxLearnNum * 0.1) - 1;
                var vName = categories[params.value[0]];
                var name = vName;
                if (sectionVal && sectionVal.length == categories.length) {
                    var section = sectionVal[params.value[0]];
                    name = section == null ? vName : section;
                }
                return name + '<br\>'
                    + '开始: ' + StatsCommon.secondToHms(params.value[1])
                    + '<br\>结束: ' + StatsCommon.secondToHms(params.value[2])
                    // + '<br\>学习人次: ' + params.value[3] ;
                    + '<br\>'+params.marker+ '学习人次: ' + (temStartVal == temEndVal ? temStartVal : (temStartVal + '~' + temEndVal));
            }
        },
        //缩放
        dataZoom: [
            //数据缩放轴
            {
                type: 'slider',
                filterMode: 'weakFilter',
                showDataShadow: false,
                bottom: 15,
                height: 10,
                borderColor: 'transparent',
                backgroundColor: '#e2e2e2',
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                handleSize: 20,
                handleStyle: {
                    shadowBlur: 6,
                    shadowOffsetX: 1,
                    shadowOffsetY: 2,
                    shadowColor: '#aaa'
                },
                labelFormatter: ''
            }
            //设置内容区域可缩放
            // , {
            //  type: 'inside',
            //  filterMode: 'weakFilter'
            //  }
        ],
        //设置图形大小
        grid: {
            // height: 300,
            left: '13%',
            containLabel: false
        },
        xAxis: {
            name: valName,
            min: 0,
            scale: true,
            axisLabel: {
                formatter: function (val) {
                    res = StatsCommon.secondToHms(val);
                    return res;
                }
            }
        },
        yAxis: {
            name: categoryName,
            axisLabel: {
                interval: 0//横轴信息全部显示
            },
            data: categories
        },
        series: [{
            type: 'custom',
            renderItem: renderItem,
            itemStyle: {
                normal: {
                    opacity: 0.8
                }
            },
            //设置数据列为是x轴还是y轴
            encode: {
                x: [1, 2],//第2，3列作为x轴
                y: 0//第1列作为y轴
            },
            data: data
        }]
    };

    StatsCommon.setOption(myChart, option);
};

/**
 * 判断对象是否定义
 * @param obj
 * @returns {boolean}
 */
StatsCommon.isNull = function (obj) {
    return (obj == null || obj == undefined || ( obj == '' && (typeof obj) != 'number'));
};
/**
 * 返回左右图表
 * @param myChart
 * @param legendName 图例数组 ['图例1','图例2']
 * @param yName y轴名称 ['名称1','名称2']
 * @param val 值对象
 * 非必填字段↓
 * @param colorArray  颜色数组 ['#fffff','#f0f0f0f']
 * @param sectionVal 数组 展示标题  例如;['第X章 第N讲 光辉岁月','第X章 第N讲 光辉']
 *
 *val={
 *         left:['左1数组',''左1数组''],
 *         right:['右1数组','右2数组'],
 * }
 *colorArray={
 *         left:['左1数组',''左1数组''],
 *         right:['右1数组','右2数组'],
 * }
 *
 */
StatsCommon.setEchartsLeftAndRigth = function (myChart, legendName, yName, val, colorArray, sectionVal) {

    var title = [];

    $.each(yName, function (i, e) {
        title.push(yName[i]);
        yName[i] = StatsCommon.cutStr(e, 8);
    });

    if (!StatsCommon.isNull(sectionVal) && sectionVal.length > 0) {
        title = sectionVal;
    }

    function setLeftAndRightValue(v, colors) {
        var series = [];
        var leftColors = [];
        var rightColors = [];
        if (StatsCommon.isNull(colors)) {
            leftColors = ['#4572A7'];
            rightColors = ['#F2F2F2', '#FFFF99', '#FFCCCC', '#FF9900', '#FF0000'];
        } else {
            leftColors = colors.left;
            rightColors = colors.right;
        }
        if (StatsCommon.isNull(leftColors)) {
            leftColors = ['#4572A7'];
        }
        if (StatsCommon.isNull(rightColors)) {
            rightColors = ['#F2F2F2', '#FFFF99', '#FFCCCC', '#FF9900', '#FF0000'];
        }
        for (var key in v) {
            //左边数据
            if (key == 'left') {
                for (var i = 0; i < v.left.length; i++) {
                    var values = {};
                    values = {
                        name: legendName[i],
                        type: 'bar',
                        stack: 'left',
                        barMaxWidth: 30,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'left',
                                    formatter: function (params) {
                                        if (params.value <= 0) {
                                            return '';
                                        }
                                        return params.value;
                                    }
                                },
                                color: leftColors[i],
                                opacity: 0.85
                            }
                        },
                        data: v.left[i]
                    };
                    series.push(values);
                }
            }
            //右边数据
            if (key == 'right') {
                for (var i = 0; i < val.right.length; i++) {
                    var values = {};
                    values = {
                        name: legendName[i + 1],
                        type: 'bar',
                        stack: 'right',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        barMaxWidth: 30,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'insideRight',
                                    formatter: function (params) {
                                        if (params.value <= 5) {
                                            return '';
                                        }
                                        return params.value + '%';
                                    }

                                },
                                color: rightColors[i],
                                opacity: 0.85
                            }
                        },
                        data: val.right[i]
                    };
                    series.push(values);
                }

            }

        }
        return series;
    }


    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        legend: {
            data: legendName
        },
        tooltip: {
            show: true,
            trigger: 'axis',
            formatter: function (param) {
                var value = title[param[0].dataIndex] + "</br>";
                for (var i = 0; i < param.length; i++) {
                    if (param[i].axisIndex == 0) {
                        value += param[i].marker +'平均分:' + param[i].value + '分';
                    } else {
                        value += param[i].marker + param[i].seriesName + ':' + param[i].value + '%';
                    }
                    if (i != param.length - 1) {
                        value += '<br\>';
                    }
                }
                return value;
            },
            axisPointer: {
                type: 'shadow'
            }
        },
        toolbox: {
            show:false,
            feature: {
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        grid: [{
            show: false,
            left: '6%',
            top: 60,
            bottom: 60,
            containLabel: false,
            width: '26%'
        }, {
            show: false,
            left: '39%',//33%
            top: 60,
            bottom: 60,
            width: '0%',
            containLabel: false,
            tooltip: {
                show: false
            }
        }, {
            show: false,
            right: '8%',
            top: 60,
            bottom: 60,
            containLabel: false,
            width: '48%' //55%
        }],

        xAxis: [
            {
                type: 'value',
                inverse: true,
                max: 100,
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    }
                },
                splitLine: {
                    show: true
                },
                name: '平均分'
            }, {
                gridIndex: 1,
                show: false
            }, {
                gridIndex: 2,
                type: 'value',
                max: 100,
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    },
                    formatter: '{value} '
                },
                splitLine: {
                    show: true
                },
                name: '人数占比'
            }],
        yAxis: [{
            type: 'category',
            inverse: true,
            position: 'right',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                margin: 8,
                textStyle: {
                    fontSize: 12
                }

            },
            data: yName.map(function (value) {
                return {
                    value: ''
                }
            })
        }, {
            nameLocation: 'start',
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                width: '100%',
                textStyle: {
                    fontSize: 12
                }

            },
            data: yName.map(function (value) {
                return {
                    value: value,
                    textStyle: {
                        align: 'center'
                    }
                }
            })
        }, {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                textStyle: {
                    fontSize: 12
                }

            },
            data: yName
        }],
        series: setLeftAndRightValue(val, colorArray)

    };
    StatsCommon.setOption(myChart, option);

};

/**
 * 返回正负极图表
 * @param myChart
 * @param legendName 图例数组 ['图例1','图例2']
 * @param xAxis x轴内容 {name:'单位个',title:['x轴名称start','x轴名称end']}
 * @param yAxis y轴内容 {data:['a1','a2'],title:'y轴名称'}
 * @param val 值 对象
 * @param colorArray 颜色对象
 * *val={
 *         left:['左1数组',''左1数组''],
 *         right:['右1数组','右2数组'],
 * }
 *colorArray={
 *         left:['左1数组',''左1数组''],
 *         right:['右1数组','右2数组'],
 */
StatsCommon.setEchartsPolarization = function (myChart, legendName, xAxis, yAxis, val, colorArray) {

    var max = 10;
    var valL = val.left[0];
    var valR1 = val.right[0];
    var valR2 = val.right[1];
    for (var j = 0; j < valL.length; j++) {
        if (valL[j] > max) {
            max = valL[j];
        }
    }
    for (var j = 0; j < valR1.length; j++) {
        if (valR1[j] > max) {
            max = valR1[j];
        }
    }
    for (var j = 0; j < valR2.length; j++) {
        if (valR2[j] > max) {
            max = valR2[j];
        }
    }
    max = max + 10 - max % 10;
    while (max % 2 != 0 && max % 3 != 0) {
        max += 10;
    }

    function getPolarizationSeries(v, colors) {
        var series = [];
        var leftColors = [];
        var rightColors = [];
        if (StatsCommon.isNull(colors)) {
            leftColors = ['#4572A7'];
            rightColors = ['#F2F2F2', '#FFFF99', '#FFCCCC', '#FF9900', '#FF0000'];
        } else {
            leftColors = colors.left;
            rightColors = colors.right;
        }
        if (StatsCommon.isNull(leftColors)) {
            leftColors = ['#4572A7'];
        }
        if (StatsCommon.isNull(rightColors)) {
            rightColors = ['#F2F2F2', '#FFFF99', '#FFCCCC', '#FF9900', '#FF0000'];
        }
        for (var key in v) {
            //左边数据
            if (key == 'left') {
                for (var i = 0; i < v.left.length; i++) {
                    var values = {};
                    values = {
                        name: legendName[i],
                        type: 'bar',
                        stack: 'left',
                        barMaxWidth: 20,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'left',
                                    formatter: function (params) {
                                        if (params.value <= 0) {
                                            return '';
                                        }
                                        return params.value + xAxis.name;
                                    }
                                },
                                color: leftColors[i],
                                opacity: 0.85
                            }
                        },
                        data: v.left[i]
                    };
                    series.push(values);
                }
            }
            //右边数据
            if (key == 'right') {
                for (var i = 0; i < val.right.length; i++) {
                    var values = {};
                    values = {
                        name: legendName[i + 1],
                        type: 'bar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        barMaxWidth: 15,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'right',
                                    formatter: function (params) {
                                        if (params.value <= 0) {
                                            return '';
                                        }
                                        return params.value + xAxis.name;
                                    }

                                },
                                color: rightColors[i],
                                opacity: 0.85
                            }
                        },
                        data: val.right[i]
                    };
                    series.push(values);
                }

            }

        }
        return series;
    }


    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        toolbox: {
            show:false,
            feature: {
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        tooltip: {
            show: true,
            trigger: 'axis',

            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) { // 改鼠标悬浮提示值格式
                var relVal = params[0].name + "<br/>";
                for (var i = 0; i < params.length; i++) {
                    relVal +=params[i].marker + params[i].seriesName + ' : ' + params[i].value + (StatsCommon.isNull(xAxis.name) ? '' : xAxis.name) + "<br/>";
                }
                return relVal;
            }
        },
        axisPointer: {
            link: {yAxisIndex: 'all'}
        },
        legend: {
            data: legendName
        },
        grid: [{
            show: false,
            left: '8%',
            top: 60,
            bottom: 60,
            containLabel: false,
            width: '42%'
        }, {
            show: false,
            left: '6%',
            top: 60,
            bottom: 60,
            width: '0%',
            containLabel: false,
            tooltip: {
                show: false
            }
        }, {
            show: false,
            right: '8%',
            top: 60,
            bottom: 60,
            containLabel: false,
            width: '42%'
        }],

        xAxis: [
            {
                type: 'value',
                inverse: true,
                max: max,
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    }
                },
                splitLine: {
                    show: true
                },
                name: StatsCommon.isNull(xAxis.title[0]) ? '' : xAxis.title[0]
            }, {
                gridIndex: 1,
                show: false
            }, {
                gridIndex: 2,
                type: 'value',
                max: max,
                axisLine: {
                    show: true
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    },
                    formatter: '{value}'
                },
                splitLine: {
                    show: true
                },
                name: StatsCommon.isNull(xAxis.title[1]) ? '' : xAxis.title[1]
            }],
        yAxis: [{
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: true,
                margin: 8,
                textStyle: {
                    fontSize: 12
                }

            },
            data: yAxis.data
        }, {
            nameLocation: 'start',
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                width: '100%',
                textStyle: {
                    fontSize: 12
                }

            },
            name: StatsCommon.isNull(yAxis.title) ? '' : yAxis.title,
            data: yAxis.data.map(function (value) {
                return {
                    value: ''
                }
            })
        }, {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false,
                textStyle: {
                    fontSize: 12
                }

            },
            data: yAxis.data
        }],
        series: getPolarizationSeries(val, colorArray)
    };


    StatsCommon.setOption(myChart, option);
};


StatsCommon.VideoCompletion = {
    Less10: '完成0-10%',
    Less50: '完成10-50%',
    Less80: '完成50-80%',
    More80: '完成80-100%'
};

/**
 * 获取字符串长度（一个中文字符长度为1，一个英文字符长度为0.5）
 * @param cont
 * @returns {number}
 */
StatsCommon.getStrLength = function (cont) {
    var str = '' + cont;
    var char_length = 0;
    for (var i = 0; i < str.length; i++) {
        var son_str = str.charAt(i);
        encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
    }
    return char_length;
};

/**
 * 对传入的字符串按固定长度进行换行处理(最多显示两行)
 * @param cont 字符串
 * @param l 需要进行换行的长度(默认为10)
 * @returns {string}
 */
StatsCommon.getStrForLineBreak = function (cont, l) {
    var len = 10;
    if (!StatsCommon.isNull(l)) {
        len = l;
    }
    var str = '' + cont;
    var char_length = 0;
    var result = '';
    var sub_index = 0;
    var strLen = StatsCommon.getStrLength(cont);
    if (strLen > 10) {
        for (var i = 0; i < str.length; i++) {
            var son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length > len) {
                var sub_len = char_length == len ? i + 1 : i;
                result = str.substr(0, sub_len) + "\n";
                sub_index = sub_len;
                if (strLen > 20) {
                    result += str.substr(sub_index, len) + '...';
                } else {
                    result += str.substr(sub_index, len);
                }
                break;
            }
        }
    } else {
        result = str;
    }
    return result;
};


/**
 * 普通柱状图
 * @param myChart
 * @param legendName 图例 数组 ['图例名1','图例名2']
 * @param yAxis y轴内容 {name:'单位个',title:'y轴名称',max:'最大值'}
 * @param xAxis x轴内容 {data:['a1','a2'],title:'x轴名称'}
 * @param val 值 数组 ['数组[]','数组[]']
 * 非必填字段↓
 * @param colorArray 颜色数组 ['#FFFFF','#00000']
 * @param isEveryColor 是否每个柱子一种颜色  true ,false
 * @param isShowDataZoom 是否显示放大滚动条  true , false
 * @param dataZoomMin 设置滚动条位置 70 默认0
 * @param isShowDataZoomY 是否显示Y轴的数据缩放轴
 * @param sectionVal 数组 展示标题  例如;['第X章 第N讲 光辉岁月','第X章 第N讲 光辉']
 */
StatsCommon.setEchartsBar = function (myChart, legendName, yAxis, xAxis, val, colorArray, isEveryColor, isShowDataZoom, dataZoomMin, isShowDataZoomY, sectionVal) {

    var isMax = StatsCommon.isMaxValue(val);
    var titles = [];
    if (xAxis.data.length > 0) {
        $.each(xAxis.data, function (i, e) {
            titles.push(xAxis.data[i]);
            xAxis.data[i] = StatsCommon.cutStr(e, 10);
        });
    }

    if (!StatsCommon.isNull(sectionVal) && sectionVal.length > 0) {
        titles = sectionVal;
    }


    if (yAxis.name == '分钟') {
        if (StatsCommon.isChangeLearnTime2Hours(val)) {
            yAxis.name = '小时';
            isMax=true;
            val = StatsCommon.changeLearnTime2Hours(val);
        }
    }

    var showTitle = true;
    var showDataZoom = false;
    var dataZoomStart = 0;
    var dataZoomEnd = 100;
    if (StatsCommon.isNull(isShowDataZoom)) {
        showDataZoom = false;
    } else {
        if (StatsCommon.isNull(dataZoomMin)) {
            dataZoomStart = 0;
        } else {
            dataZoomStart = dataZoomMin;
        }
        showDataZoom = true;
    }
    if (legendName.length == 1) {
        showTitle = false;
    }

    /**
     * 设置x轴数据
     * @param v {data:['a1','a2'],title:'y轴名称'}
     * @returns {{}}
     */
    function setBarX(v) {
        var x = {};
        if (v.title != null && v.title != '' && v.title != undefined) {
            x = {
                type: 'category',
                name: v.title,
                boundaryGap: true,
                data: v.data
                // axisLabel: {
                //     formatter: function (value, index) {
                //         if (xAxis.data.length > 12) {
                //             return StatsCommon.formatter(value, index);
                //         } else {
                //             return value;
                //         }
                //     }
                //
                // }
            };
        } else {
            x = {
                type: 'category',
                boundaryGap: true,
                data: v.data
            };
        }
        return x;
    }

    /**
     * 设置y轴数据
     * @param v {data:['a1','a2'],title:'y轴名称'}
     * @returns {*}
     */
    function setBarY(v) {
        var y = {};
        if (v.title != null && v.title != '' && v.title != undefined) {
            y = {
                type: 'value',
                name: v.title+(StatsCommon.isNull(v.name)?'':('('+v.name+')')),
                max: isMax?null:5,
                axisLabel: {
                    formatter: function (value, index) {
                        return value ;
                    }
                }
            };
        } else {
            y = {
                type: 'value',
                axisLabel: {
                    formatter: {
                        formatter: function (value, index) {
                            return value + v.name;
                        }
                    }
                }
            };
        }
        if(!StatsCommon.isNull(v.max)){
            y.max=v.max;
        }


        return y;
    }

    /**
     * 返回数据
     * @param val 值 数组
     * @param legendName 标题数组
     * @returns {*}
     */
    function setBarValue(val, legendName, colors) {
        var seriesArray = [];
        if (!isEveryColor) {
            for (var i = 0; i < val.length; i++) {
                var color = '';
                if (StatsCommon.isNull(colors)) {
                    color = '#73bdf4';
                } else if (colors.length == val.length) {
                    color = colors[i];
                } else if (colors.length != val.length) {
                    color = colors[i % colors.length];
                }

                var series = {
                    name: legendName[i],
                    type: 'bar',
                    barGap: 0,
                    data: val[i],
                    barMaxWidth: 30,
                    itemStyle: {
                        normal: {
                            color: color,
                            opacity: 0.85
                        }
                    }

                };
                seriesArray.push(series);
            }
        } else {
            for (var i = 0; i < val.length; i++) {
                var series = {
                    name: legendName[i],
                    type: 'bar',
                    barGap: 0,
                    data: val[i],
                    barMaxWidth: 30,
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                if (colors == null || colors == '' || colors == undefined) {
                                    return '#73bdf4';
                                }
                                return colors[(params.dataIndex) % colors.length];
                            },
                            opacity: 0.85,
                            barBorderRadius: [5, 5, 0, 0]//柱状图圆角（顺时针左上，右上，右下，左下）
                        }
                    }

                };
                seriesArray.push(series);
            }
        }


        return seriesArray;
    }

    //数据缩放轴
    var dataZoom = [
        {
            type: 'slider',
            show: showDataZoom,
            filterMode: 'weakFilter',
            showDataShadow: false,
            bottom: 15,
            height: 10,
            start: dataZoomStart,
            end: dataZoomEnd,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            },
            labelFormatter: ''
        }
    ];

    if (isShowDataZoomY) {
        dataZoom = [
            {
                type: 'slider',
                filterMode: 'filter',
                showDataShadow: false,
                bottom: 15,
                height: 10,
                start: dataZoomStart,
                end: dataZoomEnd,
                xAxisIndex: [0],
                borderColor: 'transparent',
                backgroundColor: '#e2e2e2',
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                handleSize: 20,
                handleStyle: {
                    shadowBlur: 6,
                    shadowOffsetX: 1,
                    shadowOffsetY: 2,
                    shadowColor: '#aaa'
                },
                labelFormatter: ''
            },
            {
                type: 'slider',
                filterMode: 'empty',
                showDataShadow: false,
                width: 10,
                yAxisIndex: [0],
                borderColor: 'transparent',
                backgroundColor: '#e2e2e2',
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                handleSize: 20,
                handleStyle: {
                    shadowBlur: 6,
                    shadowOffsetX: 1,
                    shadowOffsetY: 2,
                    shadowColor: '#aaa'
                },
                labelFormatter: ''
            }
        ]
    }

    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                var result = titles[params[0].dataIndex] + "<br/>";
                if (!StatsCommon.isNull(yAxis)) {
                    for (var i = 0; i < params.length; i++) {
                        result += params[i].marker + params[i].seriesName + ":" + params[i].value + yAxis.name;
                        if (i != params.length - 1) {
                            result += "<br/>";
                        }
                    }
                }
                return result;
            }
        },
        legend: {
            show: showTitle,
            data: legendName
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        dataZoom: dataZoom,

        calculable: true,
        xAxis: setBarX(xAxis),
        yAxis: setBarY(yAxis),
        series: setBarValue(val, legendName, colorArray)
    };

    StatsCommon.setOption(myChart, option);
};

/**
 * 堆积柱状图
 * @param myChart
 * @param legendName 图例 数组 ['图例名1','图例名2']
 * @param yAxis y轴内容 {name:'单位个',title:'y轴名称'}
 * @param xAxis x轴内容 {data:['a1','a2'],title:'x轴名称'}
 * @param val 值 数组 ['数组[]','数组[]']
 * @param groupNames 分组名称（组名一样的显示为堆积） ['组1','组1']
 * @param colorArray 颜色数组 ['#FFFFF','#00000']
 */
StatsCommon.setEchartsBarGroup = function (myChart, legendName, yAxis, xAxis, val, groupNames, colorArray) {

    var isMax = StatsCommon.isMaxValue(val);
    /**
     * 设置x轴
     * @param v {data:['a1','a2'],title:'y轴名称'}
     * @returns {{}}
     */
    function setBarGroupX(v) {
        var x = {};
        if (!StatsCommon.isNull(v.title)) {
            x = {
                type: 'category',
                name: v.title,
                boundaryGap: true,
                data: v.data
            };
        } else {
            x = {
                type: 'category',
                boundaryGap: true,
                data: v.data
            };
        }
        return x;
    }

    /**
     * 设置y轴
     * @param v {name:'单位个',title:'y轴名称'}
     * @returns {*}
     */
    function setBarGroupY(v) {
        var y = {};
        if (!StatsCommon.isNull(v.title)) {
            y = {
                type: 'value',
                name: v.title,
                max:isMax?null:5,
                axisLabel: {
                    formatter: '{value} ' + v.name
                }
            };
        } else {
            y = {
                type: 'value',
                max:isMax?null:5,
                axisLabel: {
                    formatter: '{value} ' + v.name
                }
            };
        }


        return y;
    }

    /**
     * 设置数据组
     * @param val 数据 ['数组[]','数组[]']
     * @param titles 标题数组
     * @param colors 各数据组对应的颜色
     * @param groupNames 各数据所属组
     * @returns {*}
     */
    function setBarGroupValue(val, titles, colors, groupNames) {
        var seriesArray = [];
        for (var i = 0; i < val.length; i++) {
            var color = '';
            if (StatsCommon.isNull(colors)) {
                color = '#33aaff';
            } else if (colors.length == val.length) {
                color = colors[i];
            } else if (colors.length != val.length) {
                color = colors[i % colors.length];
            }
            var series = {
                name: titles[i],
                type: 'bar',
                data: val[i],
                stack: groupNames[i],
                barMaxWidth: 30,
                itemStyle: {
                    normal: {
                        color: color,
                        opacity: 0.85
                    }
                }

            };
            seriesArray.push(series);
        }

        return seriesArray;
    }


    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].axisValue + "<br/>";
                if (!StatsCommon.isNull(yAxis)) {
                    for (var i = 0; i < params.length; i++) {
                        result +=params[i].marker + params[i].seriesName + ":" + params[i].value + yAxis.name;
                        if (i != params.length - 1) {
                            result += "<br/>";
                        }
                    }
                }
                return result;
            }
        },
        legend: {
            data: legendName
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        dataZoom: [
            {
                type: 'slider',
                show: false,
                filterMode: 'weakFilter',
                showDataShadow: false,
                bottom: 15,
                height: 10,
                borderColor: 'transparent',
                backgroundColor: '#e2e2e2',
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
                handleSize: 20,
                handleStyle: {
                    shadowBlur: 6,
                    shadowOffsetX: 1,
                    shadowOffsetY: 2,
                    shadowColor: '#aaa'
                },
                labelFormatter: ''
            }
        ],
        calculable: true,
        xAxis: setBarGroupX(xAxis),
        yAxis: setBarGroupY(yAxis),
        series: setBarGroupValue(val, legendName, colorArray, groupNames)
    };

    StatsCommon.setOption(myChart, option);
};


/**
 * 折线图
 * @param myChart
 * @param legendName 图例 数组 ['图例名1','图例名2']
 * @param yAxis y轴内容 {name:'单位个',title:'y轴名称'}
 * @param xAxis x轴内容 {data:['a1','a2'],title:'x轴名称'}
 * @param val 值 数组 ['数组[]','数组[]']
 * @param colorArray 颜色数组 ['#FFFFF','#00000']
 */
StatsCommon.setEchartsLine = function (myChart, legendName, yAxis, xAxis, val, colorArray) {

    var isMax= StatsCommon.isMaxValue(val);
    if (yAxis.name == '分钟') {
        if (StatsCommon.isChangeLearnTime2Hours(val)) {
            yAxis.name = '小时';
            val = StatsCommon.changeLearnTime2Hours(val);
        }
    }


    /**
     * 设置x轴数据
     * @param v {data:['a1','a2'],title:'y轴名称'}
     * @returns {{}}
     */
    function setLineX(v) {
        var x = {};
        if (v.title != null && v.title != '' && v.title != undefined) {
            x = {
                type: 'category',
                name: v.title,
                boundaryGap: false,
                data: v.data,
                axisLabel: {
                    formatter: function (value, index) {
                        if (xAxis.data.length > 12) {
                            return StatsCommon.formatter(value, index);
                        } else {
                            return value;
                        }
                    }

                }

            };
        } else {
            x = {
                type: 'category',
                boundaryGap: false,
                data: v.data,
                axisLabel: {
                    formatter: function (value, index) {
                        if (xAxis.data.length > 12) {
                            return StatsCommon.formatter(value, index);
                        } else {
                            return value;
                        }
                    }
                }
            };
        }
        return x;
    }

    /**
     * 设置y轴数据
     * @param v {name:'单位个',title:'y轴名称'}
     * @returns {*}
     */
    function setLineY(v) {
        var y = {};
        if (v.title != null && v.title != '' && v.title != undefined) {
            y = {
                type: 'value',
                name: v.title+(StatsCommon.isNull(v.name)?'':('('+v.name+')')),
                max:isMax?null:5,
                axisLabel: {
                    formatter: function (value, index) {
                        return value ;
                    }
                }
            };
        } else {
            y = {
                type: 'value',
                max:isMax?null:5,
                axisLabel: {
                    formatter: function (value, index) {
                        return value + v.name;
                    }
                }
            };
        }


        return y;
    }

    /**
     * 返回数据
     * @param val 值 数组
     * @param legendName 标题数组
     * @returns {*}
     */
    function setLineValue(val, legendName, colors) {
        var seriesArray = [];
        for (var i = 0; i < val.length; i++) {
            var color = '';
            if (StatsCommon.isNull(colors)) {
                color = '#33aaff';
            } else if (colors.length != val.length) {
                color = colors[i % colors.length];
            } else if (colors.length == val.length) {
                color = colors[i];
            }

            var series = {
                name: legendName[i],
                type: 'line',
                data: val[i],
                connectNulls:true,
                itemStyle: {  //折线拐点的样式
                    normal: {
                        color: color
                    }
                },
                lineStyle: {  //线条的样式
                    normal: {
                        color: color
                    }
                }
            };
            seriesArray.push(series);
        }


        return seriesArray;
    }


    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params.sort(function (a, b) {
                    return b.value - a.value;
                });
                var result = params[0].name + "<br/>";
                if (!StatsCommon.isNull(yAxis)) {
                    for (var i = 0; i < params.length; i++) {
                        result += params[i].marker + params[i].seriesName + ":" + params[i].value + yAxis.name;

                        if (i != params.length - 1) {
                            result += "<br/>";
                        }
                    }
                }
                if(StatsCommon.isNull(params[0].value)){
                    return ;
                }
                return result;
            }
        },
        legend: {
            show: true,
            width: 800,
            type: 'scroll',
            data: legendName
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: setLineX(xAxis),
        yAxis: setLineY(yAxis),
        series: setLineValue(val, legendName, colorArray)
    };


    StatsCommon.setOption(myChart, option);
};

/**
 * 秒转时分秒显示
 * @param sec
 * @returns {*}
 */
StatsCommon.secondToHms = function (sec) {
    var hh = parseInt(sec / 3600);
    if (hh < 10) hh = "0" + hh;
    var mm = parseInt((sec - hh * 3600) / 60);
    if (mm < 10) mm = "0" + mm;
    var ss = parseInt((sec - hh * 3600) % 60);
    if (ss < 10) ss = "0" + ss;
    var res = hh + ":" + mm + ":" + ss;
    if (sec > 0) {
        return res;
    } else {
        return "00:00:00";
    }
};

/**
 * 秒转时分显示（xx时xx分）,小于1小时则显示为xx分xx秒
 * @param sec
 * @returns {*}
 */
StatsCommon.secondToHm = function (sec) {
    if(sec <= 0){
        return "00时00分";
    }
    if(sec < 3600){
        var mm = parseInt(sec / 60);
        var ss = parseInt(sec % 60);
        if (mm < 10) mm = "0" + mm;
        if (ss < 10) ss = "0" + ss;
        return mm + "分" + ss + "秒";
    }
    var hh = parseInt(sec / 3600);
    var mm = parseInt((sec - hh * 3600) / 60);
    if (hh < 10 && hh > 0) hh = "0" + hh;
    if (mm < 10 && mm > 0) mm = "0" + mm;
    var res = hh + "时" + mm + "分";
    return res;
};

/**
 * 多终端类型
 */
StatsCommon.OS = {
    ANDROID: 'android',
    IOS: 'ios',
    WINDOWS: 'windows',
    MAC: 'mac',
    LINUX: 'linux',
    UNIX: 'unix',
    OTHER: 'other',
    SYMBIAN: 'symbian',
    WP: 'wp',
    PC: 'pc',
    MOBILE: 'mobile'
};

/**
 * 浏览器类型
 */
StatsCommon.BrowserType = {
    CHROME: 'chrome',
    FIREFOX: 'firefox',
    OPERA: 'opera',
    SAFARI: 'safari',
    IE: 'ie',
    UNKNOW: 'unknow'
};

/**
 * 浏览器类型转换成中文
 * @param type
 * @returns {*}
 */
StatsCommon.getBrowserTypeName = function (type) {
    if (type == StatsCommon.BrowserType.CHROME) {
        return '谷歌';
    } else if (type == StatsCommon.BrowserType.FIREFOX) {
        return '火狐';
    } else if (type == StatsCommon.BrowserType.OPERA) {
        return '欧朋';
    } else if (type == StatsCommon.BrowserType.UNKNOW) {
        return '其他';
    } else {
        return type;
    }

};

/**
 * 多终端类型转换成中文
 * @param type
 * @returns {*}
 */
StatsCommon.getLoginTypeName = function (type) {
    if (type == StatsCommon.OS.ANDROID) {
        return '安卓';
    } else if (type == StatsCommon.OS.IOS) {
        return 'IOS';
    } else if (type == StatsCommon.OS.WINDOWS) {
        return 'Windows';
    } else if (type == StatsCommon.OS.MAC) {
        return 'Mac';
    } else if (type == StatsCommon.OS.LINUX) {
        return 'Linux';
    } else if (type == StatsCommon.OS.UNIX) {
        return 'Unix';
    } else if (type == StatsCommon.OS.OTHER) {
        return '其他';
    } else if (type == StatsCommon.OS.SYMBIAN) {
        return '塞班';
    } else if (type == StatsCommon.OS.WP) {
        return 'Windows Phone';
    } else if (type == StatsCommon.OS.PC) {
        return 'PC';
    } else if (type == StatsCommon.OS.MOBILE) {
        return '移动';
    } else {
        return type;
    }

};

/**
 * 饼图
 * @param myChart
 * @param legendName 图例 数组 ['图例名1','图例名2']
 * @param name 点击显示名称  '图例名1'
 * @param val 值 数组 ['105','104']
 * @param colorArray 颜色数组 ['#FFFFF','#00000']
 * @param showLegend 是否显示图例
 * @param unit 数据单位
 * @param backgroundColor 图形背景色
 */
StatsCommon.setEchartsPie = function (myChart, legendName, names, val, colorArray, showLegend, unit, backgroundColor) {


    /**
     * 返回数据
     * @param val 值 数组
     * @param legendName 标题数组
     * @returns {*}
     */
    function setPieValue(val, legendName, name, colors) {

        function setValueData(val, legendName) {
            var datas = [];
            for (var i = 0; i < val.length; i++) {
                var data = {};
                data = {
                    value: val[i],
                    name: legendName[i]
                };
                datas.push(data);
            }
            return datas;
        }


        var series = {

            name: name,
            type: 'pie',
            radius: '55%',
            center: ['50%', (showLegend != false ? '60%' : '50%')],
            data: setValueData(val, legendName),
            labelLine: {//引导线长度
                normal: {
                    length: 5,//第一段长度
                    length2: 10//第二段长度
                }
            },
            label: {
                normal: {
                    rich: {
                        a: {
                            align: 'center'
                        }
                    },
                    formatter: '{a|{b}}\n({c}' + (StatsCommon.isNull(unit) ? '' : unit) + ',{d}%)'
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal: {
                    color: function (params) {
                        if (colors == null || colors == '' || colors == undefined) {
                            colors = ['#33aaff', '#89d7ff', '#b09ff0', '#f0b0e9', '#ee9999',
                                '#ffb96e', '#ffe775', '#b0d850', '#63d25e', '#1dc95e',
                                '#1fd7cc', '#00d2ff'];
                        }
                        return colors[(params.dataIndex) % colors.length];
                    }
                }
            }
        };
        return series;
    }


    var option = {
        backgroundColor: StatsCommon.isNull(backgroundColor) ? StatsCommon.consts.backgroundColor : backgroundColor,
        legend: {
            show: showLegend != false,
            data: legendName
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}" + (StatsCommon.isNull(unit) ? "" : unit) + " ({d}%)"
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: setPieValue(val, legendName, names, colorArray)
    };


    StatsCommon.setOption(myChart, option);
};

/**
 * 交互关系图
 * @param myChart
 *
 * @param nodes [node] 节点数据集合
 *      node = {
 *           value: value,//节点值
 *           name : name,//节点名称
 *           symbolSize: symbolSize , //关系图节点标记的大小(此属性在0~1之间)
 *           category : category,//数据项所在类目的index
 *           label: {
 *               normal: {
 *                   show: this.symbolSize > 10 //节点大于多少才显示名称
 *               }
 *           }
 *      }
 * @param links [link] 节点关系集合
 *      link = {
 *          source : source, //源节点（可以是节点名称，也可以是目标index）
 *          target : target, //目标节点（可以是节点名称，也可以是目标index）
 *          lineStyle : {
 *              normal : {
 *                  width : 1 //两个节点之间的线条宽度（默认为1）
 *              }
 *          }
 *      }
 */
StatsCommon.setInterRelationshipOptions = function (myChart, nodes, links) {

    /**
     *  categories [category] 类目组，同一类目的节点是同一种颜色，一个类目也是一个图例
     *      category = {
     *          name:name,
     *          itemStyle : {
     *              normal : {
     *                  color : color //自定义颜色，如果不需要自定义颜色可以不要itemStyle属性
     *              }
     *          }
     *      }
     */

    var categories = [];

    var color = ['#c23531', '#d48265', '#ca8622', '#bda29a', '#91c7ae', '#749f83', '#61a0a8', '#6e7074', '#546570', '#2f4554'];

    for (var i = 0; i < 10; i++) {
        categories[i] = {
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            name: '类目' + i
        };
    }

    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].symbolSize *= 100;//设置关系图节点标记的大小，最大为60
        }
    }

    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        // title: {
        //     text: '主题讨论交互关系图',//图表title
        //     top: 'bottom',
        //     left: 'right'
        // },
        tooltip: {
            formatter: function (params) {
                var result = params.name + (StatsCommon.isNull(params.value) ? '' : ("<br/>交互次数:" + params.value + "次"));
                return result;
            }
        },
        //图例
        // legend: [{
        //     data: categories.map(function (a) {
        //         return a.name;
        //     })
        // }],
        animationDurationUpdate: 1500,//加载数据时显示动画的时长
        animationEasingUpdate: 'quinticInOut',//数据更新时动画的缓动效果。
        series: [
            {
                //name: 'Les Miserables',
                type: 'graph',
                //图形布局
                //    'none'：不采用任何布局，使用节点中提供的 x， y 作为节点的位置
                //    'circular'：采用环形布局
                //    'force'：采用力引导布局
                layout: 'circular',
                //环形布局相关配置
                circular: {
                    rotateLabel: true //是否旋转标签，默认不旋转
                },
                height: '60%',
                data: nodes,//节点数据列表
                links: links,//节点间的关系数据
                categories: categories,//节点分类的类目
                roam: true,//是否开启鼠标缩放和平移漫游,如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启,默认为false
                label: {
                    normal: {
                        position: 'left',
                        // formatter: function(params){
                        //     debugger;
                        //     if((nodes.length/2)>=params.dataIndex){
                        //         return params.name;
                        //     }
                        //     var names=params.name.split("(");
                        //     var loginId=names[1].substring(0,names[1].length-1);
                        //     return ("("+loginId+")"+names[0]);
                        // }
                        formatter:'{b}'
                    }
                },
                lineStyle: {
                    normal: {
                        color: 'source',//关系之间线条的颜色(source:使用源节点颜色作为线条颜色，target：使用目标节点颜色作为线条颜色)
                        curveness: 0.3//边的曲度，支持从 0 到 1 的值，值越大曲度越大
                    }
                }
            }
        ]
    };

    StatsCommon.setOption(myChart, option);
};

/**
 * 散点图
 * @param myChart
 * @param legendName 图例
 * @param yAxis y轴内容 {name:'单位个',title:'y轴名称',min:number,max:number}min：y轴最小值，max：y轴最大值
 * @param xAxis x轴内容 {name:'单位个',title:'x轴名称',min:number,max:number} min：x轴最小值，max：x轴最大值
 * @param val 值 数组 ['[x,y,name,group]','[x,y,name,group]','[x,y,name,group]','[x,y,name,group]','[x,y,name,group]'...]
 * @param colorArray 颜色数组 ['#FFFFF','#00000']
 * @param tootips 悬浮提示名称 [xName,yName,name,groupName]
 */
StatsCommon.setEchartsScatter = function (myChart, legendName, yAxis, xAxis, val, colorArray, tootips) {

    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        tooltip: {
            formatter: function (params) {
                if (params.value.length > 1) {
                    var toopit0 = '';
                    var toopit1 = '';
                    var toopit2 = '';
                    var toopit3 = '';
                    if (!StatsCommon.isNull(tootips) && tootips.length > 1) {
                        toopit0 = StatsCommon.isNull(tootips[0]) ? '' : tootips[0] + ": ";
                        toopit1 = StatsCommon.isNull(tootips[1]) ? '' : tootips[1] + ": ";
                        toopit2 = StatsCommon.isNull(tootips[2]) ? '' : tootips[2] + ": ";
                        toopit3 = StatsCommon.isNull(tootips[3]) ? '' : tootips[3] + ": ";
                    }
                    return toopit3 + (StatsCommon.isNull(params.value[3]) ? params.seriesName : params.value[3]) + '<br/>'
                        + toopit2 + (StatsCommon.isNull(params.value[2]) ? params.seriesName : params.value[2]) + '<br/>'
                        + toopit0 + params.value[0] + (StatsCommon.isNull(xAxis.name) ? '' : xAxis.name) + '<br/>'
                        + toopit1 + params.value[1] + (StatsCommon.isNull(yAxis.name) ? '' : yAxis.name);
                } else {
                    var prefName = '';
                    if (params.dataIndex == 0) {
                        prefName = StatsCommon.isNull(xAxis.title) ? '' : xAxis.title;
                    } else {
                        prefName = StatsCommon.isNull(yAxis.title) ? '' : yAxis.title;
                    }

                    return params.seriesName + ' :<br/>'
                        + prefName + params.name + ' : '
                        + params.value + (StatsCommon.isNull(yAxis.name) ? '' : yAxis.name);
                }
            },
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            }
        },
        toolbox: {
            feature: {
                dataZoom: {},
                brush: {
                    type: ['rect', 'polygon', 'clear']
                }
            }
        },
        brush: {//区域选择属性
        },
        legend: {
            show: false,
            data: [legendName],
            left: 'center'
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                name: StatsCommon.isNull(xAxis.title) ? '' : xAxis.title,
                type: 'value',
                scale: true,
                max: StatsCommon.isNull(xAxis.max) ? (val.length == 0 ? 1 : null) : xAxis.max,
                min: StatsCommon.isNull(xAxis.min) ? (val.length == 0 ? 0 : null) : xAxis.min,
                axisLabel: {
                    formatter: '{value} ' + (StatsCommon.isNull(xAxis.name) ? '' : xAxis.name)
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                name: StatsCommon.isNull(yAxis.title) ? '' : yAxis.title,
                type: 'value',
                max: StatsCommon.isNull(yAxis.max) ? (val.length == 0 ? 1 : null) : yAxis.max,
                min: StatsCommon.isNull(yAxis.min) ? (val.length == 0 ? 0 : null) : yAxis.min,
                scale: true,
                axisLabel: {
                    formatter: '{value} ' + (StatsCommon.isNull(yAxis.name) ? '' : yAxis.name)
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: {
            name: legendName,
            type: 'scatter',
            data: val,
            itemStyle: {
                normal: {
                    color: colorArray[0]
                }
            },
            markArea: {
                silent: true,
                itemStyle: {
                    normal: {
                        color: 'transparent',
                        borderWidth: 1,
                        borderType: 'dashed'
                    }
                },
                data: [[{
                    xAxis: 'min',
                    yAxis: 'min'
                }, {
                    xAxis: 'max',
                    yAxis: 'max'
                }]]
            },
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                lineStyle: {
                    normal: {
                        type: 'solid'
                    }
                },
                data: [
                    {type: 'average', valueIndex: 0, name: '平均值'},
                    {type: 'average', valueIndex: 1, name: '平均值'}
                ]
            }
        }
    };

    StatsCommon.setOption(myChart, option);
};


/**
 * 集合去重，返回去重后的集合
 * @param arr
 * @returns {Array}
 */
StatsCommon.uniqueArr = function (arr) {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            res.push(arr[i]);
            json[arr[i]] = 1;
        }
    }
    return res;
};

/**
 * 截取字符串cont，长度超过len限制的部分显示'...'
 * @param cont 字符串
 * @param len 要截取的长度
 * @returns {string}
 */
StatsCommon.cutStr = function (cont, len) {
    var str = '' + cont;
    var char_length = 0;
    var result = '';
    for (var i = 0; i < str.length; i++) {
        var son_str = str.charAt(i);
        encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
        if (char_length > len) {
            var sub_len = char_length == len ? i + 1 : i;
            result = str.substr(0, sub_len);
            break;
        }
    }
    return char_length > len ? (result + "...") : str;
};

/**
 * 按照固定长度len使用type分割字符串
 * @param cont 字符串
 * @param len 需要分割的长度
 * @param type 分割标识，可以是字符串，html，特殊字符等等任意内容。。
 * @return {string}
 */
StatsCommon.getSplitStr = function (cont, len, type) {
    var str = '' + cont;
    var char_length = 0;
    var result = '';
    var sub_len = 0;
    for (var i = 0; i < str.length; i++) {
        var son_str = str.charAt(i);
        encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
        if (char_length % len == 0) {
            result += str.substr(sub_len, len) + type;
            sub_len = i + 1;
        }
    }
    if (sub_len < str.length) {
        result += str.substr(sub_len, str.length) + type;
    }
    return result;
};

/**
 * 判断是否是数组
 * @param obj
 * @returns {boolean}
 */

StatsCommon.isArray = function (arg) {
    if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
};
/**
 * 判断是否需要转换成小时
 * @param learnTime
 * @returns {boolean}
 */
StatsCommon.isChangeLearnTime2Hours = function (learnTime) {
    for (var i = 0; i < learnTime.length; i++) {
        if (StatsCommon.isArray(learnTime[i])) {
            var tempLearnTime = learnTime[i];
            for (var j = 0; j < tempLearnTime.length; j++) {
                if (tempLearnTime[j] >= 60) {
                    return true;
                }
            }
        } else {
            if (learnTime[i] >= 60) {
                return true;
            }
        }

    }
    return false;

};

/**
 * Y轴刻度换算（小于5 Y轴展示5）
 * @param learnTime
 * @returns {*}
 */
StatsCommon.isMaxValue = function (val) {

    for (var i = 0; i < val.length; i++) {

        if (StatsCommon.isArray(val[i])) {
            var tempVal = val[i];
            var tempHours = [];
            for (var j = 0; j < tempVal.length; j++) {
                if(tempVal[j] >5){
                    return true;
                }
            }
        } else if(val[i] >5) {
            return true;
        }
    }

    return false;

};

/**
 * 转换成小时
 * @param learnTime
 * @returns {*}
 */
StatsCommon.changeLearnTime2Hours = function (learnTime) {

    var result = [];
    for (var i = 0; i < learnTime.length; i++) {

        if (StatsCommon.isArray(learnTime[i])) {
            var tempLearnTime = learnTime[i];
            var tempHours = [];
            for (var j = 0; j < tempLearnTime.length; j++) {
                var hours = parseFloat(tempLearnTime[j] / 60).toFixed(1);
                tempHours.push(hours);
            }
            result.push(tempHours);
        } else {
            var hours = parseFloat(learnTime[i] / 60).toFixed(1);
            result.push(hours);
        }
    }

    return result;

};

/**
 * 转换成小时
 * @param learnTime val值
 * @param unit 单位
 * @param f 格式化成小时 eg.6.2小时
 * @returns {*}
 */
StatsCommon.changeLearnTimeHours = function (learnTime, unit, f) {

    if (StatsCommon.isNull(unit)) {
        return;
    }
    if (unit !== '分钟') {
        return learnTime + unit;
    }
    if (StatsCommon.isNull(learnTime)) {
        return learnTime + unit;
    }
    if (learnTime == ' -- ') {
        return learnTime + unit;
    }
    if (learnTime == '--') {
        return learnTime;
    }
    if (learnTime < 60) {
        return learnTime + unit;
    }
    var result = '';

    if (StatsCommon.isNull(f)) {
        var hours = parseInt(learnTime / 60);
        var mins = Math.round(learnTime % 60);
        if (hours != 0) {
            result += hours + '小时';
        }
        if (mins != 0) {
            result += mins + '分钟';
        }
    } else {
        var hours = parseFloat(learnTime / 60).toFixed(1);
        if (hours != 0) {
            result += hours + '小时';
        }
    }

    return result;
};

StatsCommon.getPlatformPath = function () {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath + postPath);
};

/** 雷达图
 *
 * @param myChart
 * @param title  图表标题
 * @param showLegend  是否显示图例（true/false）
 * @param options 子选项数组 [{name:'',max:''},{name:'',max:''}]   name：每项名称,max：每项最大值
 * @param data  数据项数组 [{name:'',value:[]},{name:'',value:[]},{name:'',value:[]}]
 *          数组中几个对象就有几个雷达线，
 *          name：线条名称
 *          value：线条中每一项的值，即value数组的长度等于options的长度,value数组中值的顺序需要与options中对应的选项的顺序保持一直
 * @param colorArray 颜色数组 ['#73bdf4'] 默认蓝色，如果colorArray长度等于data的长度，则一个线条一种颜色
 * @param isFill 是否填充内容区域
 * @param percent 图形大小占用容器大小(0~1)，eg：图形占用容器的75%则percent=0.75
 * @param legendPostion 图例位置(showLegend为true时候生效)，默认在底部，可选值：top/bottom/left/right
 * @param tooltips 鼠标悬浮提示各项值 数组['','','','']，和options长度一致
 */
StatsCommon.setEchartsRadar = function (myChart, title, showLegend, options, data, colorArray, isFill, percent, legendPostion, tooltips) {

    //设置图形相对于容器的大小比例,默认为75
    var radius = StatsCommon.isNull(percent) ? 75 : 75 * percent;
    //设置图形相对于容器的位置(左上为[0,0])，默认为[50,50]，此处图例位置固定显示在图像下方，故此处只设置图像纵坐标
    var centerV = 50;//纵坐标位置
    var centerH = 50;//横坐标位置

    if (legendPostion == 'top') {
        centerV = StatsCommon.isNull(percent) ? 50 : 50 * (1 + 1 - percent);
    } else if (legendPostion == 'bottom') {
        centerV = StatsCommon.isNull(percent) ? 50 : 50 * (percent);
    } else if (legendPostion == 'left') {
        centerH = StatsCommon.isNull(percent) ? 50 : 50 * (1 + 1 - percent);
    } else if (legendPostion == 'right') {
        centerH = StatsCommon.isNull(percent) ? 50 : 50 * (percent);
    } else {
        centerV = StatsCommon.isNull(percent) ? 50 : 50 * (percent);
    }

    function setRadarColorArray(colors) {
        if (!StatsCommon.isNull(colors) && colors.length > 0) {
            return colors;
        } else {
            return ['#73bdf4'];
        }
    }

    var legendArr = [];
    for (var i = 0; i < data.length; i++) {
        legendArr.push(StatsCommon.isNull(data[i].name) ? '' : data[i].name);
    }

    var legend = {
        show: showLegend,
        data: legendArr,
        // bottom: 10, //图例距离底部位置
        orient: 'vertical', //图例排列方式
        formatter: function (name) {
            return name;
        }
    };
    if (legendPostion) {
        legend[legendPostion] = 30;
        if (legendPostion == 'left' || legendPostion == 'right') {
            legend['top'] = 'middle';
        }
    } else {
        legend['bottom'] = 30;//默认图例设为底部位置
    }


    var series = {
        type: 'radar',
        data: data
    };
    if (isFill) {
        series.areaStyle = {normal: {}};
    }

    var tooltip = {};
    if (tooltips && tooltips.length > 0) {
        tooltip = {
            trigger: 'item',
            formatter: function (params) {
                var name = params.name;
                var vals = params.value;
                var res = name + '<br>';
                for (var i = 0; i < vals.length; i++) {
                    res += params.marker + (StatsCommon.isNull(tooltips[i]) ? '' : tooltips[i]) + ": " + vals[i] + '<br>';
                }

                return res;
            }
        }
    }


    var option = {

        title: {
            text: StatsCommon.isNull(title) ? '' : title
        },
        legend: legend,
        tooltip: tooltip,
        radar: {
            indicator: options,
            center: [centerH + '%', centerV + '%'],//图形相对于容器的位置默认为[50%,50%]
            radius: radius + '%' //图形相对于容器的大小,默认为75%
        },
        color: setRadarColorArray(colorArray),
        series: [series]
    };

    StatsCommon.setOption(myChart, option);

};

/**
 * 嵌套饼图
 * @param myChart
 * @param legendName 图例 数组 {'图例名1','图例名2'}
 * @param tooltipNames 点击显示名称 数组  {'名称1','名称2'}
 * @param val 值 数组 {'{name:'android',val:201},{{name:'ios',val:201}}','{name:'ie',val:201},{name:'chrome',val:201}'}
 * @param colorArray 颜色数组 {'#FFFFF','#00000'}
 * @param unit 单位
 */
StatsCommon.setEchartsGroupPie = function (myChart, legendName, tooltipNames, val, colorArray, unit) {


    /**
     * 返回数据
     * @param val 值 数组
     * @param legendName 标题数组
     * @returns {*}
     */
    function setGroupPieValue(val, tooltipNames, colors) {

        function setGroupPieData(val) {
            var datas = [];
            for (var i = 0; i < val.length; i++) {
                var data = {};
                data = {
                    value: val[i].val,
                    name: val[i].name
                };
                datas.push(data);
            }
            return datas;
        }

        function setGroupPieSeries(val, colors, tooltipNames) {
            var series = {
                name: tooltipNames[0],
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: setGroupPieData(val),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        color: function (params) {
                            if (colors == null || colors == '' || colors == undefined) {
                                colors = ['#33aaff', '#89d7ff', '#b09ff0', '#f0b0e9', '#ee9999',
                                    '#ffb96e', '#ffe775', '#b0d850', '#63d25e', '#1dc95e',
                                    '#1fd7cc', '#00d2ff'];
                            }
                            return colors[(params.dataIndex) % colors.length];
                        }
                    }
                }
            };
            return series;
        }

        function setGroupPieSeries2(val, colors, tooltipNames) {
            var series = {
                name: tooltipNames[1],
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                    normal: {

                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data: setGroupPieData(val),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        color: function (params) {
                            if (colors == null || colors == '' || colors == undefined) {
                                colors = ['#33aaff', '#89d7ff', '#b09ff0', '#f0b0e9', '#ee9999',
                                    '#ffb96e', '#ffe775', '#b0d850', '#63d25e', '#1dc95e',
                                    '#1fd7cc', '#00d2ff'];
                            }
                            return colors[(params.dataIndex) % colors.length];
                        }
                    }
                }
            };
            return series;
        }

        var returnSeries = [];

        for (var i = 0; i < val.length; i++) {
            if (i == 0) {
                returnSeries.push(setGroupPieSeries(val[i], colors, tooltipNames));
            } else {
                returnSeries.push(setGroupPieSeries2(val[i], colors, tooltipNames));
            }
        }

        return returnSeries;
    }


    var option = {
        backgroundColor: StatsCommon.consts.backgroundColor,
        legend: {
            show: true,
            data: legendName
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}" + (StatsCommon.isNull(unit) ? "" : unit) + " ({d}%)"
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: setGroupPieValue(val, tooltipNames, colorArray)
    };


    StatsCommon.setOption(myChart, option);
};

/**
 * 动态数据+时间坐标轴时序图
 * 如果需要做动态刷新，在需要在调用地方使用定时刷新
 * @param myChart
 * @param title 图表标题
 * @param data 数据[{name:'',value:['time',number]}]
 */
StatsCommon.setEchartsDynamicData = function (myChart, title, data, xName, yName) {

    var isMax = false;
    for(var i=0;i<data.length;i++){
        if(data[i].value[1]>5){
            isMax = true;
            break;
        }
    }
    var len = data.length;
    var option = {
        title: {
            text: title
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: false},
                magicType: {show: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var vals = params[0].value;
                var name = vals[0];
                var val = vals[1];
                return name + ' : ' + val + '人';
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            name: xName,
            type: 'time',
            // splitNumber: 25,
            // interval:24,
            // maxInterval:24*1000*60*60,
            // minInterval:5,
            axisLabel: {
                formatter: function (value, index) {
                    // 格式化成月/日，只在第一个刻度显示年份
                    var date = new Date(value);
                    var texts = StatsCommon.formatDate(date, 'hh:mm');
                    if (index === 0) {
                        texts = texts + "\n" + [date.getFullYear(), (date.getMonth() + 1), date.getDate()].join('/');
                    }
                    return texts;
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            name: yName+'(人)',
            type: 'value',
            max:isMax?null:5,
            boundaryGap: [0, '100%'],//表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比，在设置 min 和 max 后无效。
            splitLine: {
                show: true
            }
        },
        series: [{
            type: 'line',
            showSymbol: false,//是否显示最大值最小值
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name: '最大值'
                    },
                    {
                        type: 'min',
                        name: '最小值'
                    }
                ],
                symbolSize: 42

            },
            hoverAnimation: false,
            data: data
        }]
    };

    StatsCommon.setOption(myChart, option);

}

/**
 * 轨迹图
 * @param myChart
 * @param title
 * @param nodes
 * @param links
 */
StatsCommon.setEchartsTrajectory = function (myChart, title, nodes, links) {

    var option = {
        title: {
            text: title
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'sankey',
                layout: 'none',
                data: nodes,
                links: links,
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: '#aaa'
                    }
                },
                lineStyle: {
                    normal: {
                        curveness: 0.5
                    }
                },
                tooltip: {
                    formatter: function (params) {
                        try {
                            var data = params.data;
                            if (!data) {
                                return params.name;
                            }
                            var name = data.name;
                            var source = data.source;
                            var target = data.target;
                            var num = data.num;

                            if (StatsCommon.isNull(source)) {
                                var text = name.split("-")[0];
                                if (text == 'none') {
                                    return;
                                }
                                return params.marker + StatsCommon.getStudyTypeName(text);
                            }

                            var text = target.split("-")[0];
                            if (text == 'none') {
                                return;
                            }
                            return params.marker + StatsCommon.getStudyTypeName(source.split("-")[0])
                                + "——" + StatsCommon.getStudyTypeName(text)
                                + "<br>次数：" + num;
                        } catch (e) {
                            return params.name;
                        }
                    }
                },
                label: {
                    normal: {
                        formatter: function (params) {
                            try {
                                var name = params.name;
                                var text = name.split("-")[0];
                                return StatsCommon.getStudyTypeName(text);
                            } catch (e) {
                                return params.name;
                            }
                        }
                    }
                }
            }
        ]
    };

    StatsCommon.setOption(myChart, option);
}

/**
 * 获取一个月 周list
 * @param period
 * @param dateStr 日期
 * @param count 周数
 * @returns {Array}
 * @constructor
 */
StatsCommon.getMonthOfWeekDate = function (period, dateStr) {

    var category = [];


    if (period == StatsCommon.PERIOD.YEAR) {
        category = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    }

    if (period == StatsCommon.PERIOD.MONTH) {
        var date = new Date(dateStr);
        date.setMonth(date.getMonth() + 1);//下个月
        date.setDate(0);// -1天
        var endDay = date;
        var endMonthDay = StatsCommon.formatDate(endDay);
        var allDay = date.getDate();
        date.setDate(1);// 当月第一天
        var startDay = date;
        var startMonthDay = StatsCommon.formatDate(startDay);
        var week = date.getDay();
        if (week == 0) {
            week = 7;
        }
        allDay = allDay + week - 1;
        var count = parseInt(allDay / 7) + (allDay % 7 == 0 ? 0 : 1);
        date.setDate(-week + 2);
        for (var i = 1; i <= count; i++) {
            var startDate = StatsCommon.formatDate(date);
            date.setDate(date.getDate() + 6);
            var endDate = StatsCommon.formatDate(date);
            var endArray = endDate.split("-");
            if (i == 1) {
                category.push(startMonthDay + "至" + endArray[1] + "-" + endArray[2]);
            } else if (i == count) {
                var endDayArray = endMonthDay.split("-");
                category.push(startDate + "至" + endDayArray[1] + "-" + endDayArray[2]);
            } else {
                category.push(startDate + "至" + endArray[1] + "-" + endArray[2]);
            }
            // if(startArray[0] == endArray[0]){
            //     category.push(startDate+"至"+endArray[1]+"-"+endArray[2]);
            // }else{
            //     category.push(startDate+"至"+endDate);
            // }

            date.setDate(date.getDate() + 1);
        }
    }


    return category;

};

/**
 * 设置cookie
 * @param cname
 * @param cvalue
 * @param exdays
 * @param path
 * @param domain
 */
StatsCommon.setCookie = function (cname, cvalue, exdays, path, domain) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + d.toGMTString();
    var cPath = "";
    var cDomain = "";
    if(!StatsCommon.isNull(path)){
        cPath = "; path=" + path;
    }
    if(!StatsCommon.isNull(domain)){
        cDomain = "; domain=" + domain;
    }
    document.cookie = cname + "=" + cvalue + expires + cPath + cDomain;
};

/**
 * 获取cookie
 * @param cname
 * @returns {string}
 */
StatsCommon.getCookie = function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

/**
 * 获取token
 * @returns {string}
 */
StatsCommon.getAccessToken = function(){

    var token = StatsCommon.getCookie("access_token");

    /*if(StatsCommon.isNull(token)){
        alert("用户未登录，没有权限！");
        location.href=StatsCommon.getPlatformPath();
    }*/

    return token;
};

/**
 * 获取参数
 * @param variable
 * @returns {boolean}
 */
StatsCommon.getQueryString = function (variable) {
    var query = window.location.href;
    query = query.split("?");
    if(query.length <= 1){
        return false;
    } else {
        query = query[1];
    }
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return (false);
};

/**
 * 处理空数据
 * @param myChart
 * @param data
 */
StatsCommon.emptyData = function(myChart, data){
    var id = myChart._dom.id;
    var $emptyDom = $("#" + id).find('#' + id + '_empty');
    if(undefined == data|| data.length <=0){
        if($emptyDom.length <= 0)
            $("#" + id).append("<div id='" + id + "_empty' style='position: absolute;top: 50%;left: 50%;'>暂无数据</div>");
    } else {
        $emptyDom.remove();
    }
};
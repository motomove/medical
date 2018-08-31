/**
 * Created by whaty on 2017/8/15.
 */

$(function () {

    //每日招生人数统计
    getRecruitNumber(echarts);

    //学习中心招生实时统计
    getsiteRecruitEealNumber(echarts, StatsCommon.getPlatformPath() + "/statistics/siteRecruitRealStatistics");

    //历年招生数据分析
    querypreviousYearsRecruitinfo(echarts, StatsCommon.getPlatformPath() + "/statistics/previousYearsRecruitInfo");

    // 综合统计
    querySiteRecruitbar();

});
//招生人数按天显示
function getRecruitNumber(ec) {
    $("#totalRecruitId").width('100%');
    $("#totalRecruitId").height('304px');

    var myTotalLearnTimeChart = ec.init($("#totalRecruitId")[0]);
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
        reqRecruitNumber(myTotalLearnTimeChart, selectDate, period, 'all', mon, sun);
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
        reqRecruitNumber(myTotalLearnTimeChart, selectDate, period, 'all', first, end);
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
        reqRecruitNumber(myTotalLearnTimeChart, selectDate, period, 'all');
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
            reqRecruitNumber(myTotalLearnTimeChart, selectDate, period, 'all', mon, sun);
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
            reqRecruitNumber(myTotalLearnTimeChart, selectDate, period, 'all', first, end);
        });
    });
    //年日期控件
    $("#totalYearId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqRecruitNumber(myTotalLearnTimeChart, selectDate, period, 'all');
        });
    });

    $("#gridTab3").trigger("click");
    // reqRecruitNumber(myTotalLearnTimeChart, selectDate, period, 'all', mon, sun);

}


function reqRecruitNumber(myChart, date, period, info, start, end) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    if('all' == info){
        if('year' == period){
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/recruitInfoYear';
        } else {
            studentLearn_reqLearnTime = StatsCommon.getPlatformPath() + '/statistics/recruitInfoDay';
        }
    }

    //todo 需要重写地址
    StatsCommon.ajaxReq(studentLearn_reqLearnTime, {
        siteCode: siteCode,
        year: date,
        startDate: start,
        endDate : end,
        period: period
    }, function (data) {
        myChart.hideLoading();

        var category = StatsCommon.Default_category(period, date);
        var val = StatsCommon.Default_series(period, date);
        var legendName = '报名人数,录取人数,报到人数';
        var data_period = '';
        var data_date = ' -- ';
        var data_learnTime = ' -- ';
        var rotate = 0;
        var signup = StatsCommon.Default_series(period, date);
        var recruit = StatsCommon.Default_series(period, date);
        var check = StatsCommon.Default_series(period, date);
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
            rotate = device.mobile() ? 45 : 0;
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
            rotate = device.mobile() ? 90 : 0;
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        if (data != null && data.data != null) {
            if (data.data.list != null && data.data.list.length > 0) {
                // category = [];
                var items = data.data.list;
                for (var i = 0; i < items.length; i++) {
                    if('year' == period){
                        var m = Number(items[i].recruitDate);
                        val[m-1] = items[i].signup_student_number;
                        signup[m-1]=items[i].signup_student_number;
                        recruit[m-1]=items[i].recruit_student_number;
                        check[m-1]=items[i].check_student_number;
                    } else {
                        var m = category.indexOf(items[i].recruitDate);
                        val[m] = items[i].signup_student_number;
                        signup[m]=items[i].signup_student_number;
                        recruit[m]=items[i].recruit_student_number;
                        check[m]=items[i].check_student_number;
                    }
                }
            }

        }

        $("#totalDataId").find("span[name='period']").text(data_period);
        $("#totalDataId").find("span[name='date']").text(data_date);
        $("#totalDataId").find("span[name='learnTime']").text(data_learnTime);


         setRecruitLineOptions(myChart, legendName, category, val,signup,recruit,check, '人数', rotate, period);
        $(".gridTab-tab a").removeClass("click-disable");



    },token);
}

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
function setRecruitLineOptions(myChart, legendName, category, val, signup, recruit, check, unit, rotate, period, nameObject) {
    nameObject = {
        xName: '时间',
        yName: '招生人数'
    };

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
            data: ['报名人数','录取人数','报到人数']
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
            boundaryGap: false,
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
        },
        yAxis: [
            {
                type: 'value',
                name: nameObject.yName,
                axisLabel: {
                    formatter: function (value, index) {
                        return value ;
                    }
                }
            }
        ],
        series: [
            {
                name: '报名人数',
                type: 'line',
                stack: '总数',
                data: signup
            },
            {
                name: '录取人数',
                type: 'line',
                stack: '总数',
                data: recruit
            },
            {
                name: '报到人数',
                type: 'line',
                stack: '总数',
                data: check
            }
        ]
    };

    StatsCommon.setOption(myChart, option);
}

/**
* 历年招生信息分析
* @param ec
* @param url
*/
function querypreviousYearsRecruitinfo(ec, url) {
    $("#previousYearsRecruitsite").width('50%');
    $("#previousYearsRecruitsite").height('304px');
    var myChart = ec.init($("#previousYearsRecruitsite")[0]);
    myChart.clear();
    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    $("#previousYearsRecruitexam").width('50%');
    $("#previousYearsRecruitexam").height('304px');
    var myChartexam = ec.init($("#previousYearsRecruitexam")[0]);
    myChartexam.clear();

    //加载批次
    queryBantchInfo(myChart,myChartexam, "recruit_bantch_id", url);


}

/**
 * 查询招生批次信息
 * @param myChart
 * @param objDomId
 */
function queryBantchInfo(myChart,myChartexam, objDomId, url) {
    $("#" + objDomId).combobox({
        url:  StatsCommon.getPlatformPath() +'/statistics/combobox?type=recruitBantch' ,
        valueField: 'Id',
        textField: 'name',
        width: 200,
        height: 30,
        listHeight:20,
        panelHeight:0,
        formatter: function(row) {
            var tempName =StatsCommon.cutStr(row.name,10);
            return tempName;
        },
        onSelect: function(newValue) {
            var bantch = '';
            if(undefined == newValue){
                bantch = $("#recruit_bantch_id").combobox('getValue');
            } else {
                bantch = newValue.name;
            }
            StatsCommon.ajaxReq(url, {
                bantchName: bantch
            }, function (data) {
                myChart.hideLoading();
                var _wqeData = [];
                var _nqData = [];
                var _pieData = [];
                if(undefined != data.data && undefined != data.data.list){
                    var _data = data.data.list;
                    for(var i = 0; i < _data.length; i++){
                        _wqeData.push({value:_data[i].zijian_student_number, name:"自建"});
                        _wqeData.push({value:_data[i].aopeng_student_number, name:"奥鹏"});
                        _wqeData.push({value:_data[i].hongcheng_student_number, name:"弘成"});
                        _wqeData.push({value:_data[i].zhijin_student_number, name:"知金"});

                        var total = Number(_data[i].aopeng_student_number) + Number(_data[i].hongcheng_student_number) + Number(_data[i].zhijin_student_number)
                        _nqData.push({value:_data[i].zijian_student_number, name:"自建"});
                        _nqData.push({value:total, name:"公共服务体系"});

                        _pieData.push({value:_data[i].online_exam_number, name:"网上考试"});
                        _pieData.push({value:_data[i].exempt_exam_number, name:"免考"});
                        _pieData.push({value:_data[i].offline_exam_number, name:"线下考试"});
                    }
                }

                var option = pieOptionhx(_wqeData, _nqData, false, false);
                myChart.setOption(option);

                var optionexamn = pieOption( _pieData, false, '75%', false);
                myChartexam.setOption(optionexamn);
                myChartexam.setOption({
                    series:[{
                        label: {
                            normal: {
                                formatter:'{b}({c}人)'
                            }
                        }
                    }]
                });

            },token);
            queryRecruitbar(echarts,"siteRecruitStatisticsId", StatsCommon.getPlatformPath() + "/statistics/siteRecruitStatistics",bantch,"site_name");
            queryRecruitbar(echarts,"majorRecruitStatisticsId", StatsCommon.getPlatformPath() + "/statistics/majorRecruitStatistics",bantch,"major_name");
        },
        onLoadSuccess:function(data){
            var _data = $("#" + objDomId).combobox('getData');
            if(_data != null && _data.meta != null ){
                if (data != null && data.data != null && data.data.list != undefined) {
                    var items = data.data.list;
                    var values=[];
                    for(var i=0;i<items.length;i++){
                        if(i == 0){
                            values.push({name:items[i].name, Id:""});
                        } else {
                            values.push({name:items[i].name, Id:items[i].name});
                        }
                    }
                    $("#" + objDomId).combobox('loadData', values);
                }
            } else {
                $("#" + objDomId).combobox('select', _data[0].name);
            }
        }
    });
}

/**
 * 生成饼图
 * @param title
 * @param seriesData
 * @param visualMap
 * @param radius
 * @param roseType
 * @param legend
 * @returns {{title: *, tooltip: {trigger: string, formatter: string}, legend: *, visualMap: *, series: [null]}}
 */
function pieOption(_pieData, roseType, radius, legend) {
    if(undefined == roseType){
        roseType = false;
    }
    var option = {
        title:{
            text: '考试形式分析',
            textStyle:{
                fontSize : '14'
            },
            x:'lett'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: legend,
        series: [
            {
                name:'人数',
                type:'pie',
                radius: radius,

                roseType:roseType,
                data: _pieData
            }
        ]
    };

    return option;
}

/**
 * 生成环形图
 * @param title
 * @param seriesData
 * @param visualMap
 * @param radius
 * @param roseType
 * @param legend
 * @returns {{title: *, tooltip: {trigger: string, formatter: string}, legend: *, visualMap: *, series: [null]}}
 */
function pieOptionhx( _wqeData, _nqData,roseType, legend) {
    if(undefined == roseType){
        roseType = false;
    }
    var option = {
        title: {
            text: '学习中心类型招生人数分析',
            textStyle:{
                fontSize : '14'
            },
            x:'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: legend,
        series: [
            {
                name:'总人数',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '40%'],
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
                data: _nqData
            },
            {
                name:'总人数',
                type:'pie',
                radius: ['50%', '70%'],
                data:_wqeData
            }
        ]
    };

    return option;
}

/**
 * 统计柱状图
 * @param ec
 * @param url
 */
function queryRecruitbar(ec,objDomId, url, bantch,tjtype) {
    $("#" + objDomId).width('100%');
    $("#" + objDomId).height('304px');
    var myChart = ec.init($("#" + objDomId)[0]);
    var _bmdata =[], _lqdata =[], _bddata =[], _title = [];
    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['报名人数','录取人数','报到人数']
        },
        xAxis: {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value'
        },
        dataZoom:[
            {
                type: 'slider',
                filterMode: 'filter',
                showDataShadow: true,
                bottom: 15,
                height: 10,
                start: 0,
                end: 100,
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
                showDataShadow: true,
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
    };
    myChart.setOption(option);
    StatsCommon.ajaxReq(url,{
        bantchName: bantch
    }, function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            for(var i = 0; i < list.length; i++){
                _bmdata[i] = list[i].signup_student_number;
                _lqdata[i] = list[i].recruit_student_number;
                _bddata[i] = list[i].check_student_number;
                if(tjtype == 'site_name'){
                    _title[i] = list[i].site_name;
                }else if(tjtype == 'major_name'){
                    _title[i] = list[i].major_name;
                }else{
                    _title[i] = list[i].bantch_name;
                }
            }

            myChart.setOption({
                xAxis:{
                    data : _title
                },
                series: [
                    {
                        data: _bmdata,
                        name:"报名人数",
                        type: 'bar'
                    },
                    {
                        data: _lqdata,
                        name:"录取人数",
                        type: 'bar'
                    },
                    {
                        data: _bddata,
                        name:"报到人数",
                        type: 'bar'
                    }
                ]
            });
        }
    },"");

}

/**
* 综合统计
* @param ec
* @param url
*/
function querySiteRecruitbar() {
    queryRecruitbar(echarts,"totalRecruitStatisticsId", StatsCommon.getPlatformPath() + "/statistics/totalBantchInfo","","bantch_name");
}

/**
 * 学习中心招生实时统计
 * @param ec
 * @param url
 */
function getsiteRecruitEealNumber(ec,url) {
    $("#siteRecruitRealId").width('100%');
    $("#siteRecruitRealId").height('434px');
    var myChart = ec.init($("#siteRecruitRealId")[0]);

    var data =[], yData=[],geoCoordMap = new Map();;
    var option = {
        backgroundColor: '#404a59',
        tooltip : {
            trigger: 'item',
            formatter: function(params) {
                var val = params.value;
                if('object' == typeof(val)){
                    val = val[2];
                }
                return params.marker + params.name + '：' + val + '人'
            },
        },
        geo: {
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            },
            left: '10%'
        },
        grid: {
            right: 5,
            top: 15,
            bottom: 25,
            width: '30%'
        },
        xAxis: {
            axisLabel: {
                margin: 2,
                textStyle: {
                    color: '#ffffff'
                }
            }
        },
        yAxis: {
            type: 'category',
            axisLabel: {
                fontSize:9,
                interval: 0,
                textStyle: {
                    color: '#ffffff'
                }
            },
            data: yData
        }
    };

    
    myChart.setOption(option);
    StatsCommon.ajaxReq(url,"", function (_data) {
        if (_data != null && _data.data != null && _data.data.list != undefined ) {
            var list = _data.data.list;
            for(var i = 0; i < list.length; i++){
                if(list[i].checkStudentNumber > 0){
                    yData.push(list[i].city_name);
                    data.push({value:list[i].checkStudentNumber, name:list[i].city_name});
                    var vm = (list[i].coordinate).split(",");
                    geoCoordMap[list[i].city_name] = vm;
                }
            }

            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            myChart.setOption({
                yAxis:{
                    data: yData
                },
                series:[
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertData(data),
                        symbolSize: function (val) {
                            return val[2] / 50;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: convertData(data).slice(8),
                        symbolSize: function (val) {
                            return val[2] / 50;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }, {
                        type: 'bar',
                        roam: false,
                        visualMap: false,
                        zlevel: 2,
                        barMaxWidth: 20,
                        itemStyle: {
                            normal: {
                                color: '#f4e925'
                            },
                            emphasis: {
                                color: "#f4e925"
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'right',
                                offset: [0, 10]
                            },
                            emphasis: {
                                show: true,
                                position: 'right',
                                offset: [10, 0]
                            }
                        },
                        data: data
                    }
                ]
            });

            // console.log(myChart.getOption());
        }
    },"");
}


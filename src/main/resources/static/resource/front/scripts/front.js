$(function () {

    //平台概括
    showInfo();
    //今日在线人数
    showOnlineNum("online_num");

    //每日学习时长
    showLearnTime("online_time");

    //活跃人数地域分布
    showArea("active_area");

    //学习中心新生人数分布
    showNewStudent("new_student");

    //新生专业分布
    showNewStudentMajor();

    //课程更新率
    courseUpdatRate("course_update_rate");

    //综合指数
    showCompositeRadar("composite_index");

    //指数趋势
    showIndexTrend("index_trend");
});

/**
 * 新生专业分布
 */
function showNewStudentMajor() {
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/studentMajorNumber', '', function (json) {
        var list = json.data.list;
        var html = '';
        for(var index = 0; index < list.length; index++){
            var col = list[index];
            html += '<div class="table-row">' +
                '       <ul class="clearfix" >' +
                '           <li class="table-cell">' +
                '               <div class="table-cellIn">' + col.major_name + '</div>' +
                '           </li>' +
                '           <li class="table-cell">' +
                '               <div class="table-cellIn">' + col.student_number + '</div>' +
                '           </li>' +
                '           <li class="table-cell">' +
                '               <div class="table-cellIn">' + col.accounting + '</div>' +
                '           </li>' +
                '           <li class="table-cell">' +
                '               <div class="table-cellIn"><span class="table-num">' + (index + 1)+ '</span></div>' +
                '           </li>' +
                '       </ul>' +
                '   </div>'

        }
        $("#student_new_major").html(html);
    },"");
}

/**
 * 指数趋势
 */
function showIndexTrend(echatDomId) {
    var myChart = echarts.init(document.getElementById(echatDomId));
    var title = [], data = [];
    var option = {
        backgroundColor:"#fff",
        color: ['#3398DB'],
        title: {
            text: '指数趋势',
            textStyle:{
                fontSize:'16',
                fontWeight:'lighter',
                fontFamily:'"PingFang SC", Helvetica, "Helvetica Neue", "Microsoft YaHei", "SimSun", Tahoma, Arial, sans-serif'
            }
        },
        tooltip : {
            trigger: 'axis',
            formatter: "{b} : {c}",
            axisPointer: {
                animation: false
            }
        },
        /*tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                var val = StatsCommon.changeLearnTimeHours(params.value, '分钟');
                return params.name + ' : ' + val + '' ;
            },
            axisPointer: {
                animation: false
            }
        },*/
        xAxis: {
            type: 'category',
            data : title
            // data: ['08.01', '08.02', '08.03', '08.04', '08.05', '08.06', '08.07']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            data : data,
            type: 'line',
            smooth: true
        }]
    };

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/compositeList', '', function (json) {
        var list = json.data.list;
        for(var index = 0; index < list.length; index++){
            var val = Number(list[index].acceptance_rate) + Number(list[index].bachelor_rate) + Number(list[index].line_rate)
                        + Number(list[index].graduation_rate) + Number(list[index].course_pass_rate);
            data[index] = val;
            title[index] = list[index].year;
        }
        myChart.setOption({
            xAxis:{
                data : title
            },
            series: [{
                data: data
            }]
        });
    },"");

    myChart.setOption(option);
}

/**
 * 综合指数
 *
 */
function showCompositeRadar(echatDomId) {
    var myChart = echarts.init(document.getElementById(echatDomId));
    var _data = [];
    var option = {
        tooltip: {
            extraCssText:'text-align:left;'
        },
        radar: {
            center: ['50%','55%'],
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '入学率', max: 100},
                { name: '上线率', max: 100},
                { name: '课程通过率', max: 100},
                { name: '毕业率', max: 100},
                { name: '学位授予率', max: 10}
            ]
        },
        series: [{
            name: '综合指数',
            type: 'radar',
            data : _data
        }]
    };

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/compositeRadar', '', function (data) {
        var list = [data.data.acceptance_rate, data.data.line_rate, data.data.course_pass_rate, data.data.graduation_rate, data.data.bachelor_rate];
        var d = {value: list, name:'综合指数'}
        _data.push(d);

        myChart.setOption({
            series: [{
                data: _data
            }]
        });
    },"");
    myChart.setOption(option);
}

/**
 * 课程年度更新率
 */
function courseUpdatRate(echatDomId) {
    var myChart = echarts.init(document.getElementById(echatDomId));
    var _data = [], _title = [];
    var option = {
        backgroundColor:"#fff",
        title: {
            text: '课程年度更新率',
            padding:[20, 20, 20, 20],
            textStyle:{
                fontSize:'16',
                fontWeight:'bold'
            }
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: {
            type: 'category',

            axisTick: {
                alignWithLabel: true
            },
            data: _title  //['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            min: 0,
            type: 'value'
        },
        series: [{
            data: _data,  //[120, 200, 150, 80, 70, 110, 130],
            name:"更新率(%)",
            barWidth: '60%',
            type: 'bar',
            markLine: {
                data: [{type: 'average', name: '平均值'}]
            }
        }]
    };
    myChart.setOption(option);

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/courseYearUpdateRate', "", function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            var _total = 0;
            for(var i = 0; i < list.length; i++){
                _data[i] = list[i].rate;
                _title[i] = list[i].course_type;
                _total += list[i].rate;
            }

            var avg = (_total/list.length).toFixed(2);
            $('#c_rate').text("(本年更新率" + avg + "%)");
            myChart.setOption({
                xAxis:{
                    data : _title
                },
                series: [{
                    data: _data
                }]
            });
        }

    },"");


}

/**
 * 学习中心新生人数分布
 * @param echatDomId
 */
function showNewStudent(echatDomId) {
    var showLegend = true;
    var alignTxt = ['40%', '50%'];
    if(device.mobile()){
        showLegend = false;
        alignTxt = ['50%', '50%'];
    }
    var myChart = echarts.init(document.getElementById(echatDomId));
    var _data =[], _title = [], _select = {};
    var option = {
        backgroundColor:"#fff",
        title: {
            text: '学习中心新生人数分布',
            padding:[20, 20, 20, 20],
            textStyle:{
                fontSize:'16',
                fontWeight:'bold'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}人 ({d}%)",
            position:function () {
                if(device.mobile()){
                    return ['0%', '90%'];
                }
            }
        },
        legend: {
            show:showLegend,
            type:'scroll',
            left: 'right',
            top: 'middle',
            orient: 'vertical',
            formatter: function (name) {
                return name;
            },
            tooltip: {
                show: true,
                formatter: function (params) {
                }
            }
        },
        series : [
            {
                name: '新生人数',
                type: 'pie',
                radius : '55%',
                center: alignTxt,
                data : _data,
                avoidLabelOverlap:false,
                labelLine:{show:true},
                label:{
                    show:false,
                    emphasis: {
                        show: true,
                        formatter:"{b} \n {c}人({d}%)"

                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    myChart.setOption(option);
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/siteNewStudentDistribution', "", function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            for(var i = 0; i < list.length; i++){
                _data[i] = {value:list[i].new_student_number, name:list[i].activity_site};
                _title[i] = list[i].activity_site;
                _select[list[i].activity_site] = i < 6;
            }

            myChart.setOption({
                series: [{
                    data: _data
                }]
            });
            if(device.mobile()){
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            }
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 0
            });
            myChart.on('mouseover', (v) => {
                if(v.dataIndex != 0){
                    myChart.dispatchAction({
                        type: 'downplay',
                        // 可选，系列 index，可以是一个数组指定多个系列
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                }
            });
        }
    },"");
}

/**
 * 活跃人数地域分布
 */
function showArea(echatDomId) {
    var myChart = echarts.init(document.getElementById(echatDomId));
    var _data = [],  province = {};
    var option = {
        backgroundColor:"#fff",
        title: {
            text: '活跃人数地域分布',
            padding:[20, 20, 20, 20],
            textStyle:{
                fontSize:'16',
                fontWeight:'bold'
            }
        },
        /*tooltip : {
            trigger : 'item'
        },*/

        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                var formatter = '<span style="font-weight: bold">' +params.name + '</span>';

                if(undefined != province[params.name]){
                    formatter += "<br/>";
                }

                var tabWidth = "100%";
                if(device.mobile()){
                    tabWidth = (window.screen.availWidth - 10) + "px;";
                    formatter += '<table  border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;margin: 0 -4px;width:' + tabWidth + '">';
                } else {
                    formatter += '<table  border="0" cellspacing="0" cellpadding="0" style="margin: 0 -4px;">' ;
                }

                // formatter += '<table  border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;margin: 0 -4px;width:' + tabWidth + '">' +
                formatter +='  <thead style="background: rgb(56,57,59); padding: 0 4px;"><tr style="height: 25px;"> ' +
                            '    <td style="width:36%;padding: 0 0 0 8px;">学习中心</td>' +
                            '    <td style="width: 10px;color: #494949;">&nbsp;|&nbsp;</td>' +
                            '    <td class="tooltip_align">人数</td>' +
                            '    <td style="width: 10px;color: #494949;">&nbsp;|&nbsp;</td>' +
                            '    <td class="tooltip_align">活跃人数</td>' +
                            '    <td style="width: 10px;color: #494949;">&nbsp;|&nbsp;</td>' +
                            '    <td class="tooltip_align">活跃率</td>' +
                            '    <td style="width: 10px;color: #494949;">&nbsp;|&nbsp;</td>' +
                            '    <td class="tooltip_align" style="padding: 0 8px 0 0;">排名</td>' +
                            '  </tr></thead>' +
                            '  <tbody>';

                if(undefined != province[params.name]){
                    var siteArr = province[params.name].site;
                    if(siteArr.length <= 0){
                        formatter +='    <tr><td colspan="9" style="text-align: center;">暂无数据</td></tr>';
                    } else {
                        for(var i = 0; i < siteArr.length; i++){
                            formatter +='    <tr>';
                            if(device.mobile()){
                                formatter +='<td class="award-name" style="padding: 0 0 0 8px;">' + siteArr[i].name + '</td>';
                            } else {
                                formatter +='<td style="padding: 0 0 0 8px;">' + siteArr[i].name + '</td>';
                            }

                            formatter +=
                                '      <td >&nbsp;</td>' +
                                '      <td class="tooltip_align">' + siteArr[i].stuNum + '</td>' +
                                '      <td >&nbsp;</td>' +
                                '      <td class="tooltip_align">' + siteArr[i].activeNum + '</td>' +
                                '      <td >&nbsp;</td>' +
                                '      <td class="tooltip_align">' + siteArr[i].activeRate + '%</td>' +
                                '      <td >&nbsp;</td>' +
                                '      <td style="padding: 0 8px 0 0;" class="tooltip_align">' + (i+1) + '</td>' +
                                '    </tr>';
                        }
                    }
                } else {
                    formatter +='    <tr><td colspan="9" style="text-align: center;">暂无数据</td></tr>';
                }


                formatter += '  </tbody>' +
                             '</table>';
                return formatter;
            },
            position:function () {
                if(device.mobile()){
                    return ['0%', '50%'];
                }
            }
        },
        visualMap : {
            min : 0,
            max : 5000,
            left : '20',
            top : 'bottom',
            color: ['#006edd', '#e0ffff'],
            text : [ '高', '低' ], // 文本，默认为数值文本
            calculable : true
        },
        color: ['#F5A623', '#4FA8F9'],
        series : [ {
            type : 'map',
            mapType : 'china',
            label : {
                normal : {
                    formatter: function (params ) {
                        if(isNaN(params.value)){
                            return params.name + " : 0";
                        }
                        return params.name + " : " + params.value;
                    },
                    position: 'right',

                    show : false
                },
                color: '#fff',
                emphasis : {
                    show : true
                }
            },
            data : _data
        } ]
    };// 这里内容可以直接从Echart自带的列子中取
    myChart.setOption(option);
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/activityDistribution', "", function (data) {

        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            var siteArr = [], provinceActive = 0;
            for(var i = 0; i < list.length; i++){
                if(undefined == province[list[i].activity_province] || province[list[i].activity_province] == ''){
                    siteArr = [];
                    provinceActive = 0;
                }
                provinceActive = provinceActive + Number(list[i].activity_number);
                siteArr.push({name : list[i].activity_site, stuNum:list[i].total_student_number, activeNum:list[i].activity_number,activeRate:list[i].rate});
                province[list[i].activity_province] = {site:siteArr, activeNum: provinceActive};
            }

            for(var key in province){
                _data.push({name: key, value: province[key].activeNum});
            }

            // console.log(province);
            myChart.setOption({
                series: [{
                    data: _data
                }]
            });
        }
    },"");
}

/**
 * 每日学习时长
 */
function showLearnTime(echatDomId){

    var _data = [], _title = [];
    var option = {
        backgroundColor:"#fff",
        color: ['#3398DB'],
        title: {
            text: '每日学习时长',
            padding:[20, 20, 20, 20],
            textStyle:{
                fontSize:'16',
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
            data: _title //['08.01', '08.02', '08.03', '08.04', '08.05', '08.06', '08.07']
        },
        yAxis: {
            axisLabel: {
                formatter: function (value) {
                    return StatsCommon.changeLearnTime2Hours([value]);
                }
            },
            name:'(小时)',
            nameTextStyle:{
                padding:[0, 0, -10, -30]
            },
            type: 'value'

        },
        series: [{
            data: _data, //[820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name: '最大值',
                        label: {
                            normal: {
                                formatter: function (params) {
                                    var val = StatsCommon.changeLearnTimeHours(params.value, '分钟', '分钟');
                                    val = val.substring(0, val.indexOf('小时'));
                                    return val;

                                }
                            }
                        }
                    },
                    {
                        type: 'min',
                        name: '最小值',
                        label: {
                            normal: {
                                formatter: function (params) {
                                    var val = StatsCommon.changeLearnTimeHours(params.value, '分钟', '分钟');
                                    val = val.substring(0, val.indexOf('小时'));
                                    return val;
                                }
                            }
                        }
                    }
                ]
            }
        }]
    };

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/learnDay', "", function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            if(list.length > 0){
                for(var i = 0; i < list.length; i++){
                    _data[i] = list[i].learn_time;
                    _title[i] = list[i].learnDate;
                }
                var myChart = echarts.init(document.getElementById(echatDomId));
                myChart.setOption(option);
                myChart.setOption({
                    xAxis:{
                        data : _title
                    },
                    series: [{
                        data: _data
                    }]
                });
            } else {
                $('#' + echatDomId + ' .mod-body').text("暂无数据");
            }

        }
    },"");
}

/**
 * 今日在线人数
 */
function showOnlineNum(echatDomId) {
    var myChart = echarts.init(document.getElementById(echatDomId));
    // 指定图表的配置项和数据
    var data = [], _title = [], firstData = [];

    var option = {
        backgroundColor:"#fff",
        color: ['#3398DB'],
        title: {
            text: '今日在线人数',
            padding:[20, 20, 20, 20],
            textStyle:{
                fontSize:'16',
                fontWeight:'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                params = params[0];
                return params.name + '    ' + params.value[1] + '(人)' ;
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            type: 'category',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            name:'(人数)',
            nameTextStyle:{
                padding:[0, 0, -10, -30]
            },
        },
        series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data,
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
        }]
    };

    var currDate = new Date();
    myChart.setOption(option);
    //获取站点在线人数
    StatsCommon.YUNYAN.ajaxReq(StatsCommon.YUNYAN.DOMAIN + StatsCommon.YUNYAN.BASE_URL + '/userstats/onlinenumber/minute_level_data', {
        siteCode: StatsCommon.YUNYAN.SYSTEM_CODE
    }, function (json) {
        for(var key in json){
            data.push(randomData(key, json[key]));
        }

        myChart.setOption({
            series: [{
                data: data
            }]
        });
    });

    function randomData(key, value) {
        return {
            name: key,
            value: [key,value]
        }
    }

}


/**
 * 平台概况展示
 */
function showInfo() {
    var params={};
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/info',JSON.stringify(paramsData), function (data) {
        if (data != null && data.data != null ) {
            $("#stu_num").text(data.data.student_num);
            $("#t_num").text(data.data.teacher_num);
            $("#c_num").text(data.data.course_num);
            $("#site_num").text(data.data.site_num);
            $("#major_training_num").text(data.data.major_training_num);
            $("#major_degree_num").text(data.data.major_degree_num);
            $("#student_online_num").text();
            $("#teacher_online_num").text();
            var s_time = changeSec(data.data.student_online_time);
            $("#s_h").text(s_time.h);
            $("#s_m").text(s_time.m);
            $("#s_s").text(s_time.s);
            var t_time = changeSec(data.data.teacher_online_time);
            $("#t_h").text(t_time.h);
            $("#t_m").text(t_time.m);
            // $("#t_s").text(t_time.s);

            var week_s_time = changeSec(data.data.student_cur_week_time);
            $("#week_s_h").text(week_s_time.h);
            $("#week_s_m").text(week_s_time.m);
            $("#week_s_s").text(week_s_time.s);
            var week_t_time = changeSec(data.data.teacher_cur_week_time);
            $("#week_t_h").text(week_t_time.h);
            $("#week_t_m").text(week_t_time.m);
            // $("#week_t_s").text(week_t_time.s);

            $("#s_rate").text(data.data.s_rate);
            $("#t_rate").text(data.data.t_rate);

            // 获取站点在线人数
            StatsCommon.YUNYAN.ajaxReq(StatsCommon.YUNYAN.DOMAIN + StatsCommon.YUNYAN.BASE_URL + '/userstats/onlinenumber/date_level_data', {
                siteCode: StatsCommon.YUNYAN.SYSTEM_CODE
            }, function (data) {
                var onlineNumber = Number(data.onlineNumber);
                var stu = Math.floor(onlineNumber * 0.75), teacher = Math.floor(onlineNumber * 0.25);
                $('#student_online_num').text(stu);
                $('#teacher_online_num').text(teacher);
            });

        }

    },"");

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
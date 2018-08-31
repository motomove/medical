/**
 * Created by whaty on 2017/8/15.
 */

$(function () {

    //当前在籍人数年级分布
    queryLearningByGrade(echarts, StatsCommon.getPlatformPath() + "/statistics/gradeLearningStudent");

    //学籍分析
    queryStudentStatus(echarts, StatsCommon.getPlatformPath() + "/statistics/gradeStatusStudent");

    //学生分类统计
    //学习中心统计
    queryStudentBySite(echarts, StatsCommon.getPlatformPath() + "/statistics/siteLearningStudent");

    //专业统计
    queryStudentByMajor(echarts, StatsCommon.getPlatformPath() + "/statistics/majorLearningStudent");

    //层次统计
    queryStudentByEdu(echarts, StatsCommon.getPlatformPath() + "/statistics/eduLearningStudent");

    //性别统计
    queryStudentByGender(echarts, StatsCommon.getPlatformPath() + "/statistics/genderLearningStudent");

    if(!device.mobile()){
        //学生详细数据表格
        queryStudentInfoForGrid(StatsCommon.getPlatformPath() + "/statistics/totalStudentDetailed");

        $('.show_checkbox').on('change', function () {
            // console.log("============");
            // $(this)
            queryStudentInfoForGrid(StatsCommon.getPlatformPath() + "/statistics/totalStudentDetailed");
        });
    } else {
        $('#detial_board').hide();
    }

});

/**
 * 在籍详细数据
 * @param url
 */
function queryStudentInfoForGrid(url) {

    var box_edu = $('#box_edu'), box_major = $('#box_major');
    var box_site = $('#box_site'), box_grade = $('#box_grade');
    var _edu = 1, _major = 1, _site = 1, _grade = 1;
    if(!box_edu.attr('checked')){
        $('#info_edu').hide();
        _edu = 0;
    } else {
        $('#info_edu').show();
        _edu = 1;
    }

    if(!box_major.attr('checked')){
        $('#info_major').hide();
        _major = 0;
    } else{
        $('#info_major').show();
        _major = 1;
    }

    if(!box_site.attr('checked')){
        $('#info_site').hide();
        _site = 0;
    } else {
        $('#info_site').show();
        _site = 1;
    }

    if(!box_grade.attr('checked')){
        $('#info_grade').hide();
        _grade = 0;
    } else {
        $('#info_grade').show();
        _grade = 1;
    }
    queryDetial(url, 1, 10, _site, _grade, _major, _edu, "manage_video_page");
}

/**
 * 详细数据
 * @param ec
 */
function queryDetial(url, curPage,pageSize,siteName ,gradeName ,majorName, eduName, pageDom, pageObject) {
    $("#manage_video_table_data").hide();
    $("#manage_video_table_load").show();

    if (curPage == "" || curPage == undefined || curPage == null) {
        curPage = 1;
    }
    if (pageSize == "" || pageSize == undefined || pageSize == null) {
        pageSize = 10;
    }
    var params={};
    params.siteName = siteName;
    params.gradeName = gradeName;
    params.majorName = majorName;
    params.eduName = eduName;
    params.pageSize = pageSize;
    params.cur = curPage;
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
        curPageMapperKey: 'curPage',	//设置后台参数映射
        pageSizeMapperKey: 'pageSize',
        pageSizeArr: [10, 20, 30, 50, 100],
        isShowPageSizeSelectToolBar: false,
        isShowTotalPageToolBar: false,
        parsePageData: function (resultData) {	// 解析数据成分页插件支持的数据格式
            var pageData = $.extend(resultData.data, {'totalRow': resultData.data.totalNumber});	// 因为后台page.java类中总记录数属性为totalCount，插件中使用的是totalRow，故做个转换
            return pageData;
        },
        pagerCallHandel: function (data, pagerParam) {

            $("#manageVideoDetail").empty();
            if (data != null && data.data != null && data.data.list != null) {
                var items = data.data.list;
                var cur = $('#manage_video_page').find("#pageNum").val();
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
                        str+='          <li class="resdisTabl-col resdisTabl-col-5_6" name="checkLine">' + (i+1) + '</li>';
                        var box_edu = $('#box_edu'), box_major = $('#box_major');
                        var box_site = $('#box_site'), box_grade = $('#box_grade');
                        if(box_edu.attr('checked')){
                            str+='          <li class="resdisTabl-col resdisTabl-col-10" name="checkLine">' + resource.edu_name+ '</li>';
                        }

                        if(box_major.attr('checked')){
                            str+='          <li class="resdisTabl-col resdisTabl-col-19" name="checkLine">' + resource.major_name + '</li>';
                        }

                        if(box_site.attr('checked')) {
                            str += '          <li class="resdisTabl-col resdisTabl-col-24" name="checkLine">' + resource.site_name + '</li>';
                        }

                        if(box_grade.attr('checked')){
                            str+='          <li class="resdisTabl-col resdisTabl-col-10" name="checkLine">' + (resource.grade_name) + '</li>';
                        }

                        str+='          <li class="resdisTabl-col resdisTabl-col-10" name="checkLine">' + (StatsCommon.isNull(resource.admissionNumber) ? '0': resource.admissionNumber) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-10" name="checkLine">' + (StatsCommon.isNull(resource.learningNumber) ? '0': resource.learningNumber) + '</li>';
                        str+='          <li class="resdisTabl-col resdisTabl-col-6_8_none" name="checkLine">' + (StatsCommon.isNull(resource.graduationNumber) ? '0': resource.graduationNumber) + '</li>';
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
 * 层次统计
 * @param ec
 * @param url
 */
function queryStudentByEdu(ec, url) {
    $("#student_count_edu").width('100%');
    $("#student_count_edu").height('304px');
    var myChart = ec.init($("#student_count_edu")[0]);
    myChart.clear();

    querySimplePie(myChart, url);
}

/**
 * 性别统计
 * @param ec
 * @param url
 */
function queryStudentByGender(ec, url) {
    $("#student_count_gender").width('100%');
    $("#student_count_gender").height('304px');
    var myChart = ec.init($("#student_count_gender")[0]);
    myChart.clear();
    querySimplePieGender(myChart, url);
}

function querySimplePieGender(myChart, url){
    var title = {show:false};
    var _data =[], _title = [];
    var data = _data;

    var option = {
        backgroundColor:"#fff",
        title: {
            text: '',
            padding:[20, 20, 20, 20],
            textStyle:{
                fontSize:'16',
                fontWeight:'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
            ,position:function () {
                if(device.mobile()){
                    return ['0%', '90%'];
                }
            }
        },
        series : [
            {
                name: '在籍人数（人）',
                type: 'pie',
                radius : '65%',
                data : _data,
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

    StatsCommon.ajaxReq(url, "", function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            _data[0] = {value:list[0].man_number, name:"男"};
            _data[1] = {value:list[0].woman_number, name:"女"};
            myChart.setOption({
                series: [{
                    data: _data
                }]
            });
        }
    },"");
}

function querySimplePie(myChart, url){
    var title = {show:false};
    var _data =[], _title = [];
    var data = _data;

    var option = {
        backgroundColor:"#fff",
        title: {
            text: '',
            padding:[20, 20, 20, 20],
            textStyle:{
                fontSize:'16',
                fontWeight:'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
            ,position:function () {
                if(device.mobile()){
                    return ['0%', '90%'];
                }
            }
        },
        series : [
            {
                name: '在籍人数（人）',
                type: 'pie',
                radius : '65%',
                data : _data,
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

    StatsCommon.ajaxReq(url, "", function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            for(var i = 0; i < list.length; i++){
                _data[i] = {value:list[i].learningNumber, name:list[i].edu_name};
            }
            myChart.setOption({
                series: [{
                    data: _data
                }]
            });
        }
    },"");
}

/**
 * 专业统计
 * @param ec
 * @param url
 */
function queryStudentByMajor(ec, url) {
    $("#student_count_major").width('100%');
    $("#student_count_major").height('304px');
    var myChart = ec.init($("#student_count_major")[0]);
    var _data =[], _title = [];
    var option = {
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
            data: _title
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: _data,
            name:"在籍人数（人）",
            barWidth: '50%',
            type: 'bar'
        }],
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
    StatsCommon.ajaxReq(url,"", function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            for(var i = 0; i < list.length; i++){
                _data[i] = list[i].learningNumber;
                _title[i] = list[i].major_name;
            }

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
 * 学籍分析
 * @param ec
 * @param url
 */
function queryStudentStatus(ec, url) {
    $("#student_status").width('100%');
    $("#student_status").height('304px');
    var myChart = ec.init($("#student_status")[0]);
    myChart.clear();
    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    //加载年级
    queryGrade(myChart, "student_grade", url);


}

/**
 * 学生分类统计 - 学习中心统计
 * @param ec
 * @param url
 */
function queryStudentBySite(ec, url) {
    $("#student_count_site").width('100%');
    $("#student_count_site").height('304px');
    var myChart = echarts.init($("#student_count_site")[0]);
    myChart.clear();

    var isShow = true, alginTxt = ['40%', '50%'];
    if(device.mobile()){
        isShow = false;
        alginTxt = ['50%', '50%'];
    }
    var _data = [],_title = [], _select = {};
    var option = {
        backgroundColor: "#fff",
        title: {
            text: '',
            padding: [20, 20, 20, 20],
            textStyle: {
                fontSize: '16',
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
            ,position:function () {
                if(device.mobile()){
                    return ['0%', '90%'];
                }
            }
        },
        legend: {
            show:isShow,
            type:'scroll',
            right: 10,
            top: 20,
            bottom: 5,
            orient: 'vertical',
            data: _title,
            formatter: function (name) {
                return name;
            },
            tooltip: {
                show: true,
                formatter: function (params) {

                }
            }
        },
        series: [
            {
                name: '学习中心人数',
                type: 'pie',
                radius: '65%',
                center: alginTxt,
                labelLine:{show:true},
                avoidLabelOverlap:false,
                label:{
                    show:false,
                    emphasis: {
                        show: true,
                        formatter:"{b} \n {c}人({d}%)"

                    }
                },
                data: _data,
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

    StatsCommon.ajaxReq(url,"", function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            for(var i = 0; i < list.length; i++){
                _data[i] = {value:list[i].learningNumber, name:list[i].site_name};
                _title[i] = list[i].site_name;
                _select[list[i].site_name] = i < 6;
            }

            myChart.setOption({
                legend:{
                    data : _title/*,
                    selected: _select*/
                },
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
 * 当前在籍人数年级分布
 * @param ec
 */
function queryLearningByGrade(ec, url) {
    $("#student_learning_grade").width('100%');
    $("#student_learning_grade").height('304px');
    var myChart = ec.init($("#student_learning_grade")[0]);
    myChart.clear();
    var isShow = true, alginTxt = ['50%', '50%'];
    if(device.mobile()){
        isShow = false;
        alginTxt = ['50%', '50%'];
    }

    var _data = [],_title = [],_totalNumber = 0;
    var option = {
        backgroundColor:"#fff",
        title: {
            text:_totalNumber,
            subtext:'在籍总人数',
            right:10
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
            ,position:function () {
                if(device.mobile()){
                    return ['0%', '90%'];
                }
            }
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            x: 'left',
            data: _title,
            show:isShow,
            tooltip: {
                show: true
            }
        },
        series : [
            {
                name: '在籍人数',
                type: 'pie',
                radius : '65%',
                center:alginTxt,
                labelLine:{show:true},
                avoidLabelOverlap:false,
                label:{
                    show:false,
                    emphasis: {
                        show: true,
                        formatter:"{b} \n {c}人({d}%)"

                    }
                },
                data : _data,
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

    StatsCommon.ajaxReq(url, "", function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            var maxData = 0, maxIndex = 0;
            for(var i = 0; i < list.length; i++){
                _data[i] = {value:list[i].learningNumber, name:list[i].grade_name};
                _title[i] = list[i].grade_name;
                // _totalNumber= _totalNumber + list[i].learningNumber;
                if(maxData < list[i].learningNumber){
                    maxData = list[i].learningNumber;
                    maxIndex = i
                }
            }

            _totalNumber = data.data.info.student_num;
            myChart.setOption({
                title: {
                    text:_totalNumber
                },
                legend:{
                    data : _title
                },
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
 * 查询年级
 * @param myChart
 * @param objDomId
 */
function queryGrade(myChart, objDomId, url) {
    $("#" + objDomId).combobox({
        url: StatsCommon.getPlatformPath() + '/statistics/combobox?type=grade' ,
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
            var grade = '';
            if(undefined == newValue){
                grade = $("#student_grade").combobox('getValue');
            } else {
                grade = newValue.name;
            }

            StatsCommon.ajaxReq(url, {
                gradeName: grade
            }, function (data) {
                myChart.hideLoading();
                var _pieData = [];
                if(undefined != data.data && undefined != data.data.list){
                    var _data = data.data.list;
                    for(var i = 0; i < _data.length; i++){
                        _pieData.push({value:_data[i].full_number, name:_data[i].status_name});
                    }
                }

                var title = {show:false};
                var option = pieOption(title, _pieData, false, '65%', false);
                myChart.setOption(option);
                myChart.setOption({
                    series:[{
                        label: {
                            normal: {
                                formatter:'{b}({c}人)'
                            }
                        }
                    }]
                });

            },token);


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
function pieOption(title, seriesData, visualMap, radius,  roseType, legend) {
    if(undefined == roseType){
        roseType = false;
    }
    var option = {
        title:title,
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
            ,position:function () {
                if(device.mobile()){
                    return ['0%', '90%'];
                }
            }
        },
        legend: legend,
        visualMap:visualMap,
        series: [
            {
                name:'人数',
                type:'pie',
                radius: radius,

                roseType:roseType,
                data: seriesData /*[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]*/
            }
        ]
    };

    return option;
}



//地址
var studentLearn_reqLearnTime = '/statistics/compositeList';
var studentLearn_reqLearnPoint = '/statistics/compositeList';
var studentLearn_reqLearnTimeBar = '/statistics/compositeList';
var studentLearn_reqLearnTimeCalendar = '/statistics/compositeList';
var studentLearn_learnTimeByCourse = '/statistics/compositeList';

function getLearnTimeByCourse(ec) {
    $("#learnTimeByCourseId").width('100%');
    $("#learnTimeByCourseId").height('304px');
    var myChart = ec.init($("#learnTimeByCourseId")[0]);

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxReq(studentLearn_learnTimeByCourse, {
        siteCode: siteCode
    }, function (data) {
        var json = '{"meta":{"errCode":0,"errMsg":"ok"},"data":{"items":[{"learnTime":0,"courseName":"油画静物1","courseId":"2412"},{"learnTime":0,"courseName":"古代汉语","courseId":"0045"},{"learnTime":0,"courseName":"教育心理学","courseId":"0111"},{"learnTime":0,"courseName":"网络课件的设计与制作","courseId":"402814a1574c5cb7015754eae81f0076"},{"learnTime":1,"courseName":"探究性学习模式与案例分析","courseId":"402814a1574c5cb7015754ee74c00080"},{"learnTime":1,"courseName":"古文字学基础","courseId":"402814a155e8fd4a0156da5abd190249"},{"learnTime":5,"courseName":"教学领导力的内涵、诊断与提升","courseId":"402814a15723f55d015727ba6d690011"},{"learnTime":685451,"courseName":"民俗学","courseId":"ff8080815553a112015571b298a605b4"},{"learnTime":796964,"courseName":"健康心理学","courseId":"402814a1570e71b701571be121a206ac"},{"learnTime":6581759,"courseName":"普通心理学","courseId":"402814a45a89abfb015a8cdb2e1e00a3"}]}}';
        data = JSON.parse(json);
        myChart.hideLoading();

        var val = [];
        var legendName = ['课程名称'];

        var yAxis = {
            title: '学习时长',
            name: '分钟'
        };
        var xAxis = {
            data: [],
            title: '课程名称'
        };

        var data_course = ' -- ';
        var data_learnTime = ' -- ';

        if (data != null && data.data != null && data.data.items!=null) {
            var items = data.data.items;
            data_course ='';
            var itemVal = [];
            for (var i = 0; i < items.length; i++) {
                var courseId = items[i].courseId;
                var courseName = items[i].courseName;
                var learnTime = items[i].learnTime;


                itemVal.push(learnTime);
                xAxis.data.push(courseName);
            }
            val.push(itemVal);

            if(items.length>0){

                data_course += StatsCommon.getSplitStr(items[items.length-1].courseName,15,'<br>');

                var learnTime = items[items.length-1].learnTime;
                data_learnTime = StatsCommon.changeLearnTimeHours(learnTime, '分钟','.');
            }

            $("#learnTimeByCourseDataId").find("span[name='course']").html(data_course);
            $("#learnTimeByCourseDataId").find("span[name='learnTime']").html(data_learnTime);

            StatsCommon.setEchartsBar(myChart, legendName, yAxis, xAxis, val,"",false,true,"",true);
        }

    },token);


}


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

//总学习时长统计图
function getTotalLearnTime(ec) {
    $("#totalLearnTimeId").width('100%');
    $("#totalLearnTimeId").height('304px');


    var myTotalLearnTimeChart = ec.init($("#totalLearnTimeId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
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
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
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
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
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
        reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
    });

    //周日期控件
    $("#totalWeekId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
        },$(this).val());
    });
    //月日期控件
    $("#totalMonthId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
        });
    });
    //年日期控件
    $("#totalYearId").unbind("click").click(function () {
        if($(".gridTab-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');
        });
    });

    reqLearnTime(myTotalLearnTimeChart, selectDate, period, 'all');

}

//平均学习时长统计图
function getAvgLearnTime(ec) {
    $("#avgLearnTimeId").width('100%');
    $("#avgLearnTimeId").height('304px');
    var myAvgLearnTimeChart = ec.init($("#avgLearnTimeId")[0]);
    var period = 'week';
    var selectDate = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000));
    var week = StatsCommon.getWeekDays(selectDate, 'M月d日');
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
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
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
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
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
        reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
    });


    //周日期控件
    $("#avgWeekId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.WeekWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM-dd');
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
        },$(this).val());
    });
    //月日期控件
    $("#avgMonthId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
        });
    });
    //年日期控件
    $("#avgYearId").unbind("click").click(function () {
        if($(".gridTabB-tab a").hasClass("click-disable")){
            return ;
        }
        StatsCommon.YearWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy');
            reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');
        });
    });

    reqLearnTime(myAvgLearnTimeChart, selectDate, period, 'avg');

}

function reqLearnTimeBar(myChart, date, period) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxReq(studentLearn_reqLearnTimeBar, {
        siteCode: siteCode,
        date: date,
        period: period
    }, function (data) {

        myChart.hideLoading();

        var data_period = '';
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        var jsonArrayData = [];
        var categoryWeek = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        var categoryYear = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        var data1 = [];
        var data2 = [];
        var data3 = [];
        var data4 = [];
        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {

                var items = data.data.items;

                for (var i = 0; i < items.length; i++) {
                    var timePoint = items[i]["timePoint"];
                    var num = items[i]["num"];
                    var id = items[i]["id"];
                    var timePointType = items[i]["timePointType"];

                    if (timePointType == 0) {
                        data1.push(num);
                    } else if (timePointType == 1) {
                        data2.push(num);
                    } else if (timePointType == 2) {
                        data3.push(num);
                    } else if (timePointType == 3) {
                        data4.push(num);
                    }
                }
            }
        }

        $("#calendarDataId").find("span[name='period']").text(data_period);

        if (period == StatsCommon.PERIOD.WEEK) {
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less1, data: data1, color: '#F6C159'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less10, data: data2, color: '#7FC9FF'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less30, data: data3, color: '#4CB5FF'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.More30, data: data4, color: '#0096FF'});

            var week = StatsCommon.getWeekDays(date);
            categoryWeek = [week.MON, week.TUES, week.WED, week.THUR, week.FRI, week.SAT, week.SUN];
            StatsCommon.setPileUpBarOptions(myChart, jsonArrayData, categoryWeek, 60, '学习人数(人)', '日期', '', '人');
        } else {
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less1OfYear, data: data1, color: '#F6C159'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less10OfYear, data: data2, color: '#7FC9FF'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.Less30OfYear, data: data3, color: '#4CB5FF'});
            jsonArrayData.push({legend: StatsCommon.CalendarItem.More30OfYear, data: data4, color: '#0096FF'});

            StatsCommon.setPileUpBarOptions(myChart, jsonArrayData, categoryYear, 60, '学习人数(人)', '日期', '', '人');
        }
        $(".gridTabC-tab a").removeClass("click-disable");

    },token);
}

function reqLearnTimeCalendar(myChart, date, period) {
    myChart.clear();
    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    StatsCommon.ajaxReq(studentLearn_reqLearnTimeCalendar, {
        siteCode: siteCode,
        date: date,
        period: period
    }, function (data) {
        myChart.hideLoading();
        var legendName = '学习时长分布';
        var data_period = '';
        var data_date = ' -- ';
        var data_learnTime = ' -- ';
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        var scatterData = [];
        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var timePoint = items[i]["timePoint"];
                    var num = items[i]["num"];
                    var type1 = items[i]["0"];
                    var type2 = items[i]["1"];
                    var type3 = items[i]["2"];
                    var type4 = items[i]["3"];
                    scatterData.push([timePoint, num, type1, type2, type3, type4]);
                }
            }

        }

        $("#calendarDataId").find("span[name='period']").text(data_period);

        if (period == StatsCommon.PERIOD.MONTH) {

            StatsCommon.setCalentarOptions(myChart, scatterData, date,'人');
        }
        $(".gridTabC-tab a").removeClass("click-disable");

    },token);
}

function reqLearnPoint(myChart, date, period) {


    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    //todo 重写请求地址
    StatsCommon.ajaxReq(studentLearn_reqLearnPoint, {
        siteCode: siteCode,
        date: date,
        period: period
    }, function (data) {

        myChart.hideLoading();

        var category = StatsCommon.Default_category(period, date, 'hour');
        var val = StatsCommon.Default_series(period, date, 'hour');

        if (period == StatsCommon.PERIOD.YEAR) {
            category = StatsCommon.Default_category(period, date, 'day');
            val = StatsCommon.Default_series(period, date, 'day');
        }

        var legendName = '平均学习人数';

        var data_period = '';
        var data_date = ' -- ';
        var data_learnTime = ' -- ';
        var rotate = 0;
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                category = [];
                val = [];
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    var point = StatsCommon.LearnPoint(items[i].time_type).apm;
                    category.push(point);
                    val.push(items[i].num);
                }
            }

            var maxItems = data.data.maxItems;
            if (maxItems != null && maxItems.length > 0 && maxItems[0].num > 0) {
                data_learnTime = maxItems[0].num;

                data_date = '';
                try {
                    if (maxItems.length == 1) {
                        data_date = StatsCommon.LearnPoint(maxItems[0].time_type).point;
                    } else {
                        for (var i = 0; i < maxItems.length; i++) {
                            data_date += StatsCommon.LearnPoint(maxItems[i].time_type).point + ',';
                        }
                        data_date = data_date.substring(0, data_date.length - 1);
                    }
                } catch (e) {
                }
            }

        }
        $("#learnPointDataId").find("span[name='period']").text(data_period);
        $("#learnPointDataId").find("span[name='date']").text(data_date);
        $("#learnPointDataId").find("span[name='learnNum']").text(data_learnTime + '人');

        StatsCommon.setLineOptions(myChart, legendName, category, val, '人', rotate, period,{yName:'学习人数'});
        $(".gridTabF-tab a").removeClass("click-disable");
    },token);
}

function reqLearnTime(myChart, date, period, info) {

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });
    //todo 需要重写地址
    StatsCommon.ajaxReq(studentLearn_reqLearnTime, {
        siteCode: siteCode,
        date: date,
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
        if (period == StatsCommon.PERIOD.WEEK) {
            data_period = '一周';
        } else if (period == StatsCommon.PERIOD.MONTH) {
            data_period = '一月';
            // rotate = 45;
        } else if (period == StatsCommon.PERIOD.YEAR) {
            data_period = '一年';
        }

        if (data != null && data.data != null) {
            if (data.data.items != null && data.data.items.length > 0) {
                // category = [];
                val = [];
                var items = data.data.items;
                for (var i = 0; i < items.length; i++) {
                    // category.push(items[i].timePoint);
                    if (info == StatsCommon.INFO.AVG) {
                        val.push(items[i].avgLearnTime);
                    } else {
                        val.push(items[i].learnTime);
                    }
                }
            }

            var maxItems = data.data.maxItems;
            if (info == StatsCommon.INFO.AVG) {
                maxItems = data.data.avgMaxItems;
            }
            if (maxItems != null && maxItems.length > 0 && maxItems[0].learnTime > 0) {
                data_learnTime = maxItems[0].learnTime;
                if (info == StatsCommon.INFO.AVG) {
                    data_learnTime = maxItems[0].avgLearnTime;
                }


                if (period == StatsCommon.PERIOD.WEEK || period == StatsCommon.PERIOD.MONTH) {
                    try {
                        data_date='';
                        if (maxItems.length == 1) {
                            var str = maxItems[0].timePoint;
                            var ss = new Date(Date.parse(str.replace(/-/g, "/")));
                            data_date = (ss.getMonth() + 1) + '月' + (ss.getDate()) + '日';
                        } else {
                            for (var i = 0; i < maxItems.length; i++) {
                                var str = maxItems[i].timePoint;
                                var ss = new Date(Date.parse(str.replace(/-/g, "/")));
                                data_date += (ss.getMonth() + 1) + '月' + (ss.getDate()) + '日,';
                            }
                            data_date = data_date.substring(0, data_date.length - 1);
                        }
                    } catch (e) {
                    }

                } else if (period == StatsCommon.PERIOD.YEAR) {
                    data_date = maxItems[0].timePoint + '月';
                }


            }

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



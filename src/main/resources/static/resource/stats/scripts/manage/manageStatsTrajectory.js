/**
 * 管理端数据看板
 * @param ec
 */

$(function () {


    //学生行为轨迹
    studentTrajectory(echarts);


});

/**
 * 用户行为轨迹图
 * @param ec
 */
function studentTrajectory(ec) {

    $("#manageTrajectoryId").width('100%');
    $("#manageTrajectoryId").height('570px');
    var selectDate = StatsCommon.formatDate(new Date(), 'yyyy-MM');
    var myChart = ec.init($("#manageTrajectoryId")[0]);
    $("#manageTrajectoryDateTimeId").text(selectDate);

    //月日期控件
    $("#manageTrajectoryDateTimeId").unbind("click").click(function () {
        StatsCommon.MonthWdatePicker(this, function (curDate) {
            selectDate = StatsCommon.formatDate(new Date(curDate), 'yyyy-MM');
            reqStudentTrajectory(myChart, '', selectDate);
        });
    });

    //获取活跃课程
    getActiveCourse(myChart);

    reqStudentTrajectory(myChart, '', selectDate);

}

/**
 * 获取活跃课程
 */
function getActiveCourse(myChart){

// StatsCommon.ajaxBodyReq('/learn/stats/course/active/list', JSON.stringify({
//         params: {
//             siteCode: siteCode
//         }
//     }), function (data) {
//
//         if (data != null && data.data != null && data.data.length > 0) {
//             $.each(data.data,function(i,e){
//                 $("#manageTrajectoryCourseId").append('<option value="'+e.Id+'">'+e.name+'</option>');
//             });
//         }
//
//         $("#manageTrajectoryCourseId").change(function(){
//             var courseId = $(this).val();
//             var selectDate = $("#manageTrajectoryDateTimeId").text();
//             reqStudentTrajectory(myChart, courseId, selectDate);
//         });
//
//     }, token);



    $("#manageTrajectoryCourseId").combobox({
        url: '/learn/stats/course/active/list?access_token='+token ,
        valueField: 'Id',
        textField: 'name',
        width: 200,
        height: 30,
        listHeight:20,
        panelHeight:0,
        formatter: function(row) {
            if(row.name == '全部'){
                return row.name;
            }
            var tempName =StatsCommon.cutStr(row.name,10);
            return (tempName+'<br>('+row.code+')');
        },
        onSelect: function(newValue) {
            var selectDate = $("#manageTrajectoryDateTimeId").text();
            reqStudentTrajectory(myChart, newValue.Id, selectDate);
        },
        onLoadSuccess:function(data){

            if (data != null && data.data != null && data.data.length > 0) {
                var items = data.data;
                var values=[{name:'全部',Id:'',code:''}];
                var j=0;
                for(var i=0;i<items.length;i++){
                    values.push(data.data[i]);
                }
                $('#manageTrajectoryCourseId').combobox('loadData', values);
            }


        }
    });





}

/**
 * 用户行为轨迹图请求
 * @param myChart
 * @param courseId
 * @param dateStr
 */
function reqStudentTrajectory(myChart, courseId, dateStr) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    $("#manageTrajectoryMaxId").text('--');

    var temDate = StatsCommon.formatDate(new Date(dateStr),"yyyy-MM");
    var curDate = StatsCommon.formatDate(new Date(),"yyyy-MM");
    if(temDate == curDate){
        var month = StatsCommon.formatDate(new Date(),"M");
        var day = StatsCommon.formatDate(new Date(new Date()-24*60*60*1000),"d");//昨天
        $("#manageTrajectoryDataId").html('近一个月（' + month + '月1日-' + month + '月' + day + '日' + '），');
    }else{
        temDate = StatsCommon.formatDate(new Date(dateStr),"yyyy年MM月");
        $("#manageTrajectoryDataId").html(temDate);
    }


    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/manage/trajectory', JSON.stringify({
        params: {
            siteCode: siteCode,
            courseId: courseId,
            date: dateStr
        }
    }), function (data) {
        myChart.hideLoading();

        var nodes = [];
        var links = [];

        var flag = false;

        if (data != null && data.data != null) {
            if (data.data.links != null && data.data.links.length > 0 && data.data.nodes != null && data.data.nodes.length > 0) {

                var dataNodes = data.data.nodes;
                var dataLinks = data.data.links;

                for (var i = 0; i < dataNodes.length; i++) {
                    var node = dataNodes[i];

                    var name = node.name;
                    var text = name.split("-")[0];

                    //text=='none'是补出来的数据，隐藏所有的text='none'的节点及线条
                    var node = {
                        name: name,//节点名称
                        itemStyle: {
                            normal: {
                                opacity: (text == 'none'? 0:1),
                                color: StatsCommon.getStudyTypeColor(text)
                            },
                            emphasis : {
                                opacity : (text == 'none'? 0:1)
                            }
                        }
                    };
                    nodes.push(node);
                }
                for (var i = 0; i < dataLinks.length; i++) {
                    var link = dataLinks[i];

                    var source = link.source;
                    var target = link.target;
                    var value = link.value;
                    var num = link.num;
                    var text = target.split("-")[0];

                    var link = {
                        source: source,
                        target: target,
                        value: value,
                        num: num,
                        lineStyle : {
                            normal : {
                                opacity : (text == 'none'? 0:0.2)//默认值为0.2
                            },
                            emphasis : {
                                opacity : (text == 'none'? 0:0.5)
                            }
                        }
                    };
                    links.push(link);
                }

                flag = true;
                //轨迹图
                StatsCommon.setEchartsTrajectory(myChart, '', nodes, links);

            }
            if (data.data.maxPoint != null && data.data.maxPoint.length > 0) {

                var resPoint = '';

                var maxPoints = data.data.maxPoint;

                for (var i = 0; i < maxPoints.length; i++) {
                    var point = maxPoints[i];
                    var name = point.name;
                    if(name.indexOf(',')>-1){
                        var strs = name.split(',');
                        for (var j = 0; j < strs.length; j++){
                            if(j==0){
                                name = StatsCommon.getStudyTypeName(strs[j]);
                            }else{
                                name += ", " + StatsCommon.getStudyTypeName(strs[j]);
                            }
                        }
                    }
                    if(i==0){
                        resPoint += StatsCommon.getStudyTypeName(name);
                    }else{
                        resPoint += '————' + StatsCommon.getStudyTypeName(name);
                    }

                }

                $("#manageTrajectoryMaxId").text(resPoint);
            }
        }
        if(!flag){
            $("#anTab-con-noData").show();
            $("#manageTrajectoryId").hide();
        }else{
            $("#manageTrajectoryId").show();
            $("#anTab-con-noData").hide();
        }

    }, token);
}

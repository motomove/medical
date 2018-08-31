$(function () {

    //健康度
    getCourseHealthy(echarts);

});

function getCourseHealthy(ec) {
    $("#healthy_info").width('100%');
    $("#healthy_info").height('304px');
    var myChart = ec.init($("#healthy_info")[0]);
    var url = StatsCommon.getPlatformPath() + '/healthy/info';

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    var paramsData={};
    paramsData.params=params;

    StatsCommon.ajaxBodyReq(url,JSON.stringify(paramsData), function (data) {

        myChart.hideLoading();

        if (data != null && data.data != null) {
            var items=data.data;

            var options = [];
            var dataArr=[];
            options.push({name:'① 选课规模',max:100});
            options.push({name:'② 教师参与度',max:100});
            options.push({name:'③ 学生参与度',max:100});
            options.push({name:'④ 学习完成率',max:100});
            options.push({name:'⑤ 人均学习时长',max:100});


            dataArr.push({
                    name:'健康度',
                    value:[items.electiveNumPercent,items.teacherPartPercent,items.studentPartPercent,items.completePercent,items.learnTimePercent]
                });

            StatsCommon.setEchartsRadar(myChart,'',false,options,dataArr,'',true);

            //填充右侧数据
            $("#healthy_course").text(items.healthyRate==null?"--":items.healthyRate);
            $("#healthy_healthy").text(items.healthy==null?"--":items.healthy);

            $("#healthy_electiveNum").text(items.electiveNum==null?"--":items.electiveNum);
            $("#healthy_electiveNumRate").text(items.electiveNumRate==null?"--":items.electiveNumRate);

            $("#healthy_teacherPart").text(items.teacherPart==null?"--":items.teacherPart);
            $("#healthy_teacherPartRate").text(items.teacherPartRate==null?"--":items.teacherPartRate);

            $("#healthy_studentPart").text(items.studentPart==null?"--":items.studentPart);
            $("#healthy_studentPartRate").text(items.studentPartRate==null?"--":items.studentPartRate);

            $("#healthy_complete").text(items.complete==null?"--":items.complete);
            $("#healthy_completeRate").text(items.completeRate==null?"--":items.completeRate);

            $("#healthy_avgLearnTime").text(items.learnTime==null?"--":StatsCommon.changeLearnTimeHours(items.learnTime,'分钟'));
            $("#healthy_avgLearnTimeRate").text(items.learnTimeRate==null?"--":items.learnTimeRate);


        }


    },token);
}

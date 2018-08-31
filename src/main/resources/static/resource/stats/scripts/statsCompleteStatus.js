/**
 * Created by whaty on 2017/8/25.
 */
$(function () {

    $('.proDetail').hide();
    $('.dashboard').show();
    $("#anTab-con-3").show();

    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/haveResourceType', JSON.stringify({
        params : {
            siteCode : siteCode,
            courseId : courseId,
            resourceType : ''
        }
    }), function (data) {
        if (data != null && data.data != null) {
            var flag = data.data;
            if(flag ){
                $(".db_slide").show();
                //学习完成情况
                getCompleteStatus();

            }else{
                $("#anTab-con-noData").show();
                $("#completeStatus_loading_id").hide();
            }

        }

    },token);


    // 学习完成情况仪表盘和详情切换
    $('.dashboard .an_link1').click(function(){
        $('.dashboard').hide();
        $('.proDetail').show();
        var params={};
        params.courseId = courseId;
        var paramsData={};
        paramsData.params=params;

        StatsCommon.ajaxBodyReq('/learn/stats/courseUserResourceItems', JSON.stringify(paramsData), function (data) {
            if (data != null && data.data != null && data.data.length>0) {
                learnMaxProgress = data.data;
            }
            curPages();
        },token);
        //加载图表
    });


    /**处理标尺事件 start*/
    var drag = 0;
    //在滑动条上绑定click事件以实现点击任意位置,自动调整滑块和填充块的效果
    $("#wrapper").click(function (e) {
        var left = $(this).offset().left;
        var pagex = e.pageX;
        var posX = pagex - left;
        moveHighLight(posX);
    });

    $("#slider").mousedown(function (e) {
        drag = 1;
    });
    $(document).mouseup(function (e) {
        drag = 0;
    });

    $("#slider").attr("title", "");
    $("#wrapper").mousemove(function (e) {
        var left = $(this).offset().left;
        // console.info(left);
        var pagex = e.pageX;
        var posX = pagex - left;
        if (drag == 1) {
            moveHighLight(posX);


        }
    });


    /**处理标尺事件 end*/

});


//学习完成情况
function getCompleteStatus() {

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    var paramsData={};
    paramsData.params=params;




    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/item/completeStatus', JSON.stringify(paramsData), function (data) {
        $("#completeStatus_loading_id").hide();
        $('#completeStatusId').html('');
        if (data != null && data.data != null) {

            if (data.data.items != null && data.data.items.length > 0) {


                var items = data.data.items;
                var sectionName = '';
                var sectionIndex = 0;
                var type = '';
                for (var i = 0; i < items.length; i++) {
                    var temSectionName = items[i].sectionName;
                    var temType = items[i].type;
                    var title = items[i].title;
                    var finishRate = items[i].finishRate;
                    var totalTime = items[i].totalTime;
                    var avgTime = items[i].avgTime;

                    var spanTitle = title + ':' + finishRate + '%';
                    var sectionFlag = false;
                    var rowFlag = false;

                    var $tr = $('#completeStatusId').children('tr:last');
                    var $ul = $('#completeStatusId').find('ul[section="' + sectionIndex + '"]');
                    if (sectionName != temSectionName) {
                        sectionFlag = true;
                        sectionName = temSectionName;
                        sectionIndex++;
                        $tr = $('<tr></tr>');
                        var thNameDiv = '<p class="db_rowTit">第' + StatsCommon.numToChineseNum(sectionIndex) + '章 ' + sectionName + '</p>';
                        var thInfoDiv = '<div class="db_timeCon">\
                                              <i class="coursespace icon-time db_timeIco"></i>\
                                              <p class="db_time">学习总用时：' + StatsCommon.secondToHm(totalTime) + '<br>学习平均用时：' + StatsCommon.secondToHm(avgTime) + '</p>\
                                        </div>';
                        var $th = $('<th scope="row">' + thNameDiv + thInfoDiv + '</th>');
                        var $td = $('<td class="db_type"></td>');
                        var $div = $('<div class="db_typeIn"></div>');
                        $ul = $('<ul section="' + sectionIndex + '"></ul>');
                        $div.append($ul);
                        $td.append($div);
                        $tr.append($th);
                        $tr.append($td);
                    }
                    var $liRow = $ul.find('li[type="' + temType + '"]');
                    var $ulLine = $liRow.find('ul');
                    if ($liRow.length == 0) {
                        rowFlag = true;
                        type = temType;
                        $liRow = $('<li type="' + type + '" class="db_typeRow clearfix"></li>');
                        var $liType = $('<span class="db_typeName">' + StatsCommon.getResourceName(type) + '</span>');
                        $ulLine = $('<ul></ul>');
                        $liRow.append($liType);
                    }

                    var span = '<span class="db_typeBlock ' + getLelCls(finishRate) + '" title="' + spanTitle + '"></span>';
                    var $li = $('<li class="db_typeLi">' + span + '</li>');

                    $ulLine.append($li);
                    if (rowFlag) {
                        $liRow.append($ulLine);
                    }
                    $ul.append($liRow);
                    $th.css({
                            "padding-top":"10px",
                            "padding-bottom":"10px"
                        });
                    // if (sectionFlag) {
                    //     $tr.append($ul);
                    // }
                    $('#completeStatusId').append($tr);

                }

            }
        }
    },token);
}


/**
 * 通过完成率获取节点class
 * @param finishRate
 * @returns {string}
 */
function getLelCls(finishRate) {
    var cls = 'db_typelvl';
    if (finishRate >= 90) {
        cls += '10';
    } else if (finishRate >= 80) {
        cls += '9';
    } else if (finishRate >= 70) {
        cls += '8';
    } else if (finishRate >= 60) {
        cls += '7';
    } else if (finishRate >= 50) {
        cls += '6';
    } else if (finishRate >= 40) {
        cls += '5';
    } else if (finishRate >= 30) {
        cls += '4';
    } else if (finishRate >= 20) {
        cls += '3';
    } else if (finishRate >= 10) {
        cls += '2';
    } else if (finishRate > 0) {
        cls += '1';
    } else {
        cls = '';
    }
    return cls;
}

/**
 * 移动标尺，高亮对应数据
 * @param posX
 * @return 返回对应的高亮数据的百分比
 */
function moveHighLight(posX) {
    var max = 156;
    if (posX > 140) {
        $("#slider").css({left: 140});
        $("#slider2").css({left:140-25});
    } else if (posX < 0) {
        $("#slider").css({left: 0});
        $("#slider2").css({left:-25});
    } else {
        $("#slider").css({left: posX});
        $("#slider2").css({left:posX-25});
    }
    $(".db_typeBlock").removeAttr("style");
    var cls = ' -webkit-box-shadow: 0 0 8px rgba(0,0,0,1);' +
        ' -moz-box-shadow: 0 0 8px rgba(0,0,0,1); ' +
        '-o-box-shadow: 0 0 8px rgba(0,0,0,1); ' +
        'box-shadow: 0 0 8px rgba(0,0,0,1);';
    var title = '';
    if (posX / max >= 0.9) {
        $(".db_typelvl10").attr("style", cls);
        title =  "90%~100%";
    } else if (posX / max >= 0.8) {
        $(".db_typelvl9").attr("style", cls);
        title =  "80%~89%";
    } else if (posX / max >= 0.7) {
        $(".db_typelvl8").attr("style", cls);
        title =  "70%~79%";
    } else if (posX / max >= 0.6) {
        $(".db_typelvl7").attr("style", cls);
        title =  "60%~69%";
    } else if (posX / max >= 0.5) {
        $(".db_typelvl6").attr("style", cls);
        title =  "50%~59%";
    } else if (posX / max >= 0.4) {
        $(".db_typelvl5").attr("style", cls);
        title =  "40%~49%";
    } else if (posX / max >= 0.3) {
        $(".db_typelvl4").attr("style", cls);
        title =  "30%~39%";
    } else if (posX / max >= 0.2) {
        $(".db_typelvl3").attr("style", cls);
        title =  "20%~29%";
    } else if (posX / max >= 0.1) {
        $(".db_typelvl2").attr("style", cls);
        title =  "10%~19%";
    } else if (posX / max > 0) {
        //设置1~10的样式和10~20的一样
        $(".db_typelvl1").attr("style", cls);
        title =  "1%~9%";
    } else if (posX / max <= 0) {
        title =  "";
    }

    if(posX / max > 0){
        $("#slider").removeClass("db_slide_icon").addClass("db_slide_icon2");
    }else{
        $("#slider").removeClass("db_slide_icon2").addClass("db_slide_icon");
    }

    $("#slider").attr("title", title);
    $("#slider2").text(title);
}
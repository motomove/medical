var url = StatsCommon.getPlatformPath() + '/reportSendInfo/reportListInfo';

$(function () {
    //报表列表
    // showReportListInfo();


    queryDetial(url, "report_list_page");

    if(!device.mobile()){
        $('#report_config').show();
    }

    /**
     * 进入详情
     */
    $('#report_list_info').on('click', '.report-list-yin', function () {
        var id = $(this).attr('id');
        if(window.__wxjs_environment === 'miniprogram'){
            wx.miniProgram.navigateTo({url: '/pages/xlda/index?id=' + id});
        } else {
            window.open(StatsCommon.getPlatformPath() + "/report/details/" + id);
        }
    });

    $('#report_config').on('click', function () {
        window.location.href = StatsCommon.getPlatformPath() + '/pages/report/report_configuration.html';
    });
});

$("#report_name_info").bind('keyup',function(event){
    if(event.keyCode == 13)
    {
        var reportName = $("#report_name_info").val();
        if(reportName == "")
        {
            reportName = null;
        }

        $("#condition_report_name").val(reportName);
        $("#condition_report_type").val("");
        $("#condition_report_dataType").val("");
        // showReportListInfo(reportName,null,null,null)
        queryDetial(url, "report_list_page", 1, 6, reportName);
    }

});



function queryReportDataType(reportDateType){
    $("#report_name_info").val("");
    $("#condition_report_name").val("");
    $("#condition_report_type").val("");
    $("#condition_report_dataType").val(reportDateType);
    // showReportListInfo(null,reportDateType,null,null)
    queryDetial(url, "report_list_page", 1, 6, null, reportDateType);
}

function queryReportType(reportType){
    $("#report_name_info").val("");
    $("#condition_report_name").val("");
    $("#condition_report_type").val(reportType);
    $("#condition_report_dataType").val("");
    // showReportListInfo(null,null,reportType,null)
    queryDetial(url, "report_list_page", 1, 6, null, null, reportType);
}

function queryConditionPage(pageType){
    var reportName =  $("#condition_report_name").val();
    var reportType =  $("#condition_report_type").val();
    var reportDateType =  $("#condition_report_dataType").val();

    var curPage = $("#condition_cur_page").val();
    var totalPage = $("#condition_total_page").val();
    if("homePage" == pageType){
        if(curPage == 1){
            return false;
        }
        curPage = 1;
    }else if("previousPage" == pageType){
        if(curPage == 1){
            return false;
        }
        curPage = Number(curPage) - 1;
    }else if("nextPage" == pageType){
        if(curPage == totalPage){
            return false;
        }
        curPage = Number(curPage) + 1;
    }else{
        if(curPage == totalPage){
            return false;
        }
        curPage = totalPage;
    }
    showReportListInfo(reportName,reportDateType,reportType,curPage)
}

//显示模板信息
function   showReportListInfo(reportName,dataType,reportType,curPage){
    StatsCommon.ajaxReq(StatsCommon.getPlatformPath() + '/reportSendInfo/reportListInfo', {
        reportName: reportName,
        dataType: dataType,
        reportType: reportType,
        curPage: curPage
    }, function (data) {
        var html = '', curtotalpage = '';
        if (data != null && data.data != null && data.data.list != undefined && data.data.list.length > 0) {
            var list = data.data.list;
            for(var i = 0; i < list.length; i++){
                var index = list[i].name.indexOf(")");
                var nameTitle = list[i].name.substring(0,index);
                var nametime = list[i].name.substring(index);
                var bjtp = "report-icon-" + list[i].report_type + list[i].send_type;
                html += ' <li class="report-cell report-list-yin" id="' + list[i].id + '"> ' +
                    '       <div class="report-cell-wrap">  ' +
                    '           <div class="report-icon '+ bjtp +'"></div>  ' +
                    '           <div class="report-detail"> ' +
                    '             <h3 class="report-title">'+ nameTitle +'<span>'+ nametime +'</span></h3> ' +
                    '             <div class="report-info info">发布时间：'+ list[i].createDate +'</div> ' +
                    '             <div class="report-data">' +
                    '               <p>学习时长为<span>'+ list[i].learn_time +'</span>小时，学习人数为<span>'+ list[i].learn_number +'</span>人</p> ' +
                    '               <p>授课时长为<span>'+ list[i].teach_time +'</span>小时，授课人数为<span>'+ list[i].teach_number +'</span>人</p> ' +
                    '            </div> ' +
                    '          </div> ' +
                    '      </div> ' +
                    '    </li>';
            }

            $(".pg-btn").show();
            //总条数
            var totalnumber = data.data.totalNumber;
            if(curPage == null){
                var totalPage = Math.ceil(totalnumber/6);
                if(totalPage == 1){
                    $("#home_page").addClass("pg-btn-disabled");
                    $("#previous_page").addClass("pg-btn-disabled");
                    $("#next_page").addClass("pg-btn-disabled");
                    $("#last_page").addClass("pg-btn-disabled");
                    $("#condition_total_page").val(totalPage);
                    $("#condition_cur_page").val(1);
                }else{
                    $("#home_page").addClass("pg-btn-disabled");
                    $("#previous_page").addClass("pg-btn-disabled");
                    $("#next_page").removeClass("pg-btn-disabled");
                    $("#last_page").removeClass("pg-btn-disabled");
                    $("#condition_total_page").val(totalPage);
                    $("#condition_total_number").val(totalnumber);
                    $("#condition_cur_page").val(1);
                }
                curtotalpage = "当前 1 / "+totalPage+" 页&nbsp;&nbsp;&nbsp;&nbsp;共"+totalnumber+"条";
            }else{
                var totalPage =  $("#condition_total_page").val();
                var totalnumber =  $("#condition_total_number").val();
                if(curPage >=totalPage){
                    $("#home_page").removeClass("pg-btn-disabled");
                    $("#previous_page").removeClass("pg-btn-disabled");
                    $("#next_page").addClass("pg-btn-disabled");
                    $("#last_page").addClass("pg-btn-disabled");
                    $("#condition_cur_page").val(curPage);

                    var curtotalpage="当前 "+curPage+" / "+totalPage+" 页&nbsp;&nbsp;&nbsp;&nbsp;共"+totalnumber+"条";
                    $("#cur_total_page").html(curtotalpage);
                }else{
                    if(curPage == 1){
                        $("#home_page").addClass("pg-btn-disabled");
                        $("#previous_page").addClass("pg-btn-disabled");
                        $("#next_page").removeClass("pg-btn-disabled");
                        $("#last_page").removeClass("pg-btn-disabled");
                    }else{
                        $("#home_page").removeClass("pg-btn-disabled");
                        $("#previous_page").removeClass("pg-btn-disabled");
                        $("#next_page").removeClass("pg-btn-disabled");
                        $("#last_page").removeClass("pg-btn-disabled");
                    }
                    $("#condition_cur_page").val(curPage);
                    curtotalpage = "当前 "+curPage+" / "+totalPage+" 页&nbsp;&nbsp;&nbsp;&nbsp;共"+totalnumber+"条";
                }
            }
        } else {
            html += '<li class="mod-cell col-1">'+
            '    <div class="mod">'+
            '        <div class="mod-wrap">'+
            '            <div class="mod-body" style="line-height: 200px;color: #aaa;">暂无数据</div>'+
            '        </div>'+
            '    </div>'+
            '</li>';
            curtotalpage = '';
            $(".pg-btn").hide();
        }
        $("#report_list_info").html(html);
        $("#cur_total_page").html(curtotalpage);


    },"");
}



/**
 * 分页查询数据
 * @param url
 * @param curPage
 * @param pageSize
 * @param siteName
 * @param gradeName
 * @param majorName
 * @param eduName
 * @param pageDom
 * @param pageObject
 */
function queryDetial(url, pageDom, curPage, pageSize, reportName,dataType,reportType) {
    $("#report_list_info_data").hide();
    $("#report_list_table_load").show();

    if (curPage == "" || curPage == undefined || curPage == null) {
        curPage = 1;
    }
    if (pageSize == "" || pageSize == undefined || pageSize == null) {
        pageSize = 6;
    }
    var params={};
    params.reportName = reportName;
    params.dataType = dataType;
    params.reportType = reportType;
    params.pageSize = pageSize;
    params.cur = curPage;
    $("#" + pageDom).whatyPager({
        pagerUrl: url,
        pagerData: JSON.stringify(params),
        isOpenShowPagerBarForOnePage: false,
        curPageNum: curPage,
        pageSizeNum: pageSize,
        dataType: "json",
        curPageMapperKey: 'curPage',	//设置后台参数映射
        pageSizeMapperKey: 'pageSize',
        pageSizeArr: [10, 20, 30, 50, 100],
        isShowPageSizeSelectToolBar: false,
        isShowTotalPageToolBar: false,
        parsePageData: function (resultData) {	// 解析数据成分页插件支持的数据格式
            var pageData = $.extend(resultData.data, {'totalRow': resultData.data.totalNumber});	// 因为后台page.java类中总记录数属性为totalCount，插件中使用的是totalRow，故做个转换
            if(pageData.totalRow <= 6){
                $('.page-pagin').hide();
            } else {
                $('.page-pagin').show();
            }
            return pageData;
        },
        pagerCallHandel: function (data, pagerParam) {

            var html = "";
            if (data != null && data.data != null && data.data.list != undefined && data.data.list.length > 0) {
                var list = data.data.list;

                for(var i = 0; i < list.length; i++){
                    var index = list[i].name.indexOf(")");
                    var nameTitle = list[i].name.substring(0,index);
                    var nametime = list[i].name.substring(index);
                    var bjtp = "report-icon-" + list[i].report_type + list[i].send_type;
                    html += ' <li class="report-cell report-list-yin" id="' + list[i].id + '"> ' +
                        '       <div class="report-cell-wrap">  ' +
                        '           <div class="report-icon '+ bjtp +'"></div>  ' +
                        '           <div class="report-detail"> ' +
                        '             <h3 class="report-title">'+ nameTitle +'<span>'+ nametime +'</span></h3> ' +
                        '             <div class="report-info info">发布时间：'+ list[i].createDate +'</div> ' +
                        '             <div class="report-data">' +
                        '               <p>学习时长为<span>'+ list[i].learn_time +'</span>小时，学习人数为<span>'+ list[i].learn_number +'</span>人</p> ' +
                        '               <p>授课时长为<span>'+ list[i].teach_time +'</span>小时，授课人数为<span>'+ list[i].teach_number +'</span>人</p> ' +
                        '            </div> ' +
                        '          </div> ' +
                        '      </div> ' +
                        '    </li>';
                }
            } else {
                html += '<li class="mod-cell col-1">'+
                    '    <div class="mod">'+
                    '        <div class="mod-wrap">'+
                    '            <div class="mod-body" style="line-height: 200px;color: #aaa;">暂无数据</div>'+
                    '        </div>'+
                    '    </div>'+
                    '</li>';
            }

            $("#report_list_info").html(html);
            $("#report_list_info_data").show();
            $("#report_list_table_load").hide();

            /*$("#manageVideoDetail").empty();
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

            }*/
        }
    }, "");

}


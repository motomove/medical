$(function () {

    /**
     * 时间控件初始化
     */
    $("#Datepicker1, #Datepicker2").datepicker({
        dateFormat: 'yy-mm-dd',
        onSelect : function (date, inst) {
            var _this = $(this);
            if('Datepicker1' == _this.attr('id')){
                $("#Datepicker2").datepicker('option', 'minDate', date);
            }

            if('Datepicker2' == _this.attr('id')){
                $("#Datepicker1").datepicker('option', 'maxDate', date);
            }
        }
    });

    /**
     * 监听左侧导航事件
     */
    $('#cardTab').on('click', '.cardTab-link', function () {
        var reportType = $(this).attr('type');
        var tabCurClass = 'cardTab-cur';
        var thisIndex = 0; // 储存其index值
        $('.cardTab-link').removeClass(tabCurClass); // 清除其它按钮上激活状态样式
        $(this).addClass(tabCurClass); // 给当前看按钮添加激活状态样式
        $('.cardTab-con').eq(thisIndex).show(); //只显示当前按钮对应的内容块
        showReportSettingInfo(reportType);
    });
    $('.cardTab-link').first().trigger('click');




    //页面设置信息
    // showReportSettingInfo("0");

    //管理员信息
    showMangagerInfo();

    //模板信息
  //  showTemplateInfo();
});

//显示模板信息
function   showTemplateInfo(templateType){
    StatsCommon.ajaxReq(StatsCommon.getPlatformPath() + '/reportSendInfo/getTemplateInfo', {
        templateType: templateType
    }, function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            var html = '';
            for(var i = 0; i < list.length; i++){
                html += ' <label class="form-label"> ' +
                    '        <input type="radio" name="templatecode" id="template'+list[i].code+'" value="'+list[i].id+'" />  ' +
                    '           <div class="form-label-con">  ' +
                    '             <div class="templete-thumb"> ' +
                    '             <div class="templete-btn-wrap"> ' +
                    '             <a href="javascript:;" class="templete-btn"><span class="templete-icon"><i class="xli icon-zoomin"></i></span><span class="templete-txt">查看大图</span></a> </div> ' +
                    '             <img src="../../resource/report/images/template/'+list[i].photo+'" alt=""> ' +
                    '             </div> ' +
                    '             <div class="form-radio-btn"></div>'+list[i].name+
                    '         </div> ' +
                    '    </label> ';
            }
        }
        $("#template_info").html(html);
    },"");
}

//显示管理员信息
function   showMangagerInfo(){
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/reportSendInfo/getManager',  '', function (data) {
        if (data != null && data.data != null && data.data.list != undefined ) {
            var list = data.data.list;
            var html = '';
            for(var i = 0; i < list.length; i++){
                html += ' <li class="tag-menu-li" uid="' + list[i].id + '"> ' +
                    '        <ul class="clearfix"> ' +
                    '           <li class="tag-menu-cell"><span class="tag-menu-txt tag-menu-name">' + list[i].name + '</span></li>  ' +
                    '           <li class="tag-menu-cell"><span class="tag-menu-txt">' + list[i].wechat_id + '</span></li> ' +
                    '           <li class="tag-menu-cell"><span class="tag-menu-txt">' + list[i].email + '</span></li> ';
                if(list[i].binding_wechat == 'Y'){
                    html += '  <li class="tag-menu-cell"><span class="tag-menu-txt green">已绑定微信</span></li> ';
                }else{
                    html += ' <li class="tag-menu-cell"><span class="tag-menu-txt">未绑定微信</span></li> ';
                }
                html += ' </ul>  </li> ';
            }
        }
        $("#manager_info").html(html);
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

/**
 * 获取时(h)分(m)秒(s)
 * @param weekTime
 */
function saveReport() {
    var week = "0";
    var month = "0";
    var year = "0";
    var reportDataType = "";
    var email = "0";
    var wechart = "0";
    var receiveType = "";
    var sendType = "";
    var receivePeople = [], receivePeopleId = [];
    var templateId = "";
    var startDate = "";
    var endDate = "";
    if ($("#report_type_week").is(':checked')) {
        week = "1";
    }
    if ($("#report_type_month").is(':checked')) {
        month = "1";
    }
    if ($("#report_type_year").is(':checked')) {
        year = "1";
    }
    reportDataType = week + month + year;
    if (reportDataType == "000") {
        $('#hintDone').find('.hint-text').text("请选择数据报告类型！");
        $('#hintDone').fadeIn().delay(2000).fadeOut();
        return false;
    }

    if ($("#send_type_email").is(':checked')) {
        email = "1";
    }
    if ($("#send_type_wechart").is(':checked')) {
        wechart = "1";
    }
    receiveType = email + wechart;
    if (receiveType == "00") {
        $('#hintDone').find('.hint-text').text("请选择接收方式！");
        $('#hintDone').fadeIn().delay(2000).fadeOut();
        return false;
    }

    sendType = $('input[name="receive_type"]:checked ').val();
    if (sendType == "1") {
        startDate = $('#Datepicker1').val();
        endDate = $('#Datepicker2').val();
        if (startDate == "") {
            $('#hintDone').find('.hint-text').text("请选择接收的开始时间！");
            $('#hintDone').fadeIn().delay(2000).fadeOut();
            return false;
        }
        if (endDate == "") {
            $('#hintDone').find('.hint-text').text("请选择接收的结束时间！");
            $('#hintDone').fadeIn().delay(2000).fadeOut();
            return false;
        }
    }

    $('.trans').each(function (index, obj) {
        var _people = $(obj);
        receivePeople.push($.trim(_people.find('.tag-name').text()));
        receivePeopleId.push($.trim(_people.attr('id')));
    });
    // receivePeople = $('#receivePeople').text();
    templateId = $('input[name="templatecode"]:checked').val();
    var reportType = $('.cardTab-cur').attr('type');
    StatsCommon.ajaxReq(StatsCommon.getPlatformPath() + '/reportSendInfo/saveReportSetting', {
        reportType: reportType,
        reportDataType: reportDataType,
        receiveType: receiveType,
        sendType: sendType,
        startDate: startDate,
        endDate: endDate,
        receivePeople: receivePeople.join(','),
        peopleIds: receivePeopleId.join(','),
        templateId: templateId
    }, function (data) {
        if (data != null && data.data != null) {
            var msg = data.data.msg;
            $('#hintDone').find('.hint-text').text(msg);
            $('#hintDone').fadeIn().delay(2000).fadeOut();
        }
    }, "");
}


//页面设置信息
function showReportSettingInfo(reportSetType){
    StatsCommon.ajaxReq(StatsCommon.getPlatformPath() + '/reportSendInfo/getReportSettingInfo', {
        reportSetType: reportSetType
    }, function (data) {

        if (data != null && data.data != null && data.data.list != undefined ) {

            var list = data.data.list;
            if(list.length > 0 && list[0].week =='1'){
                $("#report_type_week").prop("checked", true);
                $("#report_type_week").parent().removeClass("c-off").addClass("c-on");
            }else{
                $("#report_type_week").removeAttr("checked");
                $("#report_type_week").parent().removeClass("c-on").addClass(" c-off");
            }
            if(list.length > 0 && list[0].month =='1'){
                $("#report_type_month").prop("checked", true);
                $("#report_type_month").parent().removeClass("c-off").addClass("c-on");
            }else{
                $("#report_type_month").removeAttr("checked");
                $("#report_type_month").parent().removeClass("c-on").addClass(" c-off");
            }
            if(list.length > 0 && list[0].year =='1'){
                $("#report_type_year").prop("checked", true);
                $("#report_type_year").parent().removeClass("c-off").addClass("c-on");
            }else{
                $("#report_type_year").removeAttr("checked");
                $("#report_type_year").parent().removeClass("c-on").addClass(" c-off");
            }

            if(list.length > 0 && list[0].receiveTypeEmail =='1'){
                $("#send_type_email").prop("checked", true);
                $("#send_type_email").parent().removeClass("c-off").addClass("c-on");
            }else{
                $("#send_type_email").removeAttr("checked");
                $("#send_type_email").parent().removeClass("c-on").addClass(" c-off");
            }

            if(list.length > 0 && list[0].wechat =='1'){
                $("#send_type_wechart").prop("checked", true);
                $("#send_type_wechart").parent().removeClass("c-off").addClass("c-on");
            }else{
                $("#send_type_wechart").removeAttr("checked");
                $("#send_type_wechart").parent().removeClass("c-on").addClass(" c-off");
            }

            if(list.length > 0 && list[0].receiveDateType =='1'){
                $("#receive_type_wedk").removeAttr("checked");
                $("#receive_type_time").prop("checked", true);
                $("#receive_type_time").parent().removeClass("r-off").addClass("r-on").siblings().removeClass("r-on").addClass("r-off");
                $("#Datepicker1").datepicker('setDate', list[0].startDate);
                $("#Datepicker2").datepicker('setDate', list[0].endDate);
            } else {
                $("#receive_type_time").removeAttr("checked");
                $("#receive_type_wedk").prop("checked", true);
                $("#receive_type_wedk").parent().removeClass("r-off").addClass("r-on").siblings().removeClass("r-on").addClass("r-off");
                $("#Datepicker1").datepicker('setDate', '');
                $("#Datepicker2").datepicker('setDate', '');
            }


            if(list.length > 0){
                var peopleName = list[0].receivePeople, peopleIds = list[0].receive_manger_id;
                peopleName = peopleName.split(','), peopleIds = peopleIds.split(',');
                var tag = '';
                for(var i = 0; i < peopleName.length; i++){
                    if($('.tag-add').parent().find('#' + peopleIds[i]).length <= 0){
                        tag += '<li class="tag-wrap trans" id="' +peopleIds[i]+ '">' +
                            '   <span>' +
                            '       <span class="tag-name">' + peopleName[i] + '</span>' +
                            '   </span>' +
                            '   <a href="javascript:;" class="xli icon-del tag-del"></a>' +
                            '  </li>';
                    }
                }
                $('.tag-add').before(tag);
                var templatecode= "#template" + list[0].code;
                $('input[name="templatecode"]').removeAttr("checked");
                $(templatecode).prop("checked", true);
                $(templatecode).parent().removeClass("r-off").addClass("r-on").siblings().removeClass("r-on").addClass("r-off");
            } else {
                $('.trans').remove();
                var template = $('input[name="templatecode"]:eq(0)');

                $('input[name="templatecode"]').removeAttr("checked");
                template.prop("checked", true);
                template.parent().removeClass("r-off").addClass("r-on").siblings().removeClass("r-on").addClass("r-off");
            }

        }
    },"");
}


jQuery(function($){
    $.datepicker.regional['zh-CN'] = {
        clearText: '清除',
        clearStatus: '清除已选日期',
        closeText: '关闭',
        closeStatus: '不改变当前选择',
        prevText: '< 上月',
        prevStatus: '显示上月',
        prevBigText: '<<',
        prevBigStatus: '显示上一年',
        nextText: '下月>',
        nextStatus: '显示下月',
        nextBigText: '>>',
        nextBigStatus: '显示下一年',
        currentText: '今天',
        currentStatus: '显示本月',
        monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
        monthNamesShort: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],
        monthStatus: '选择月份',
        yearStatus: '选择年份',
        weekHeader: '周',
        weekStatus: '年内周次',
        dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
        dayNamesMin: ['日','一','二','三','四','五','六'],
        dayStatus: '设置 DD 为一周起始',
        dateStatus: '选择 m月 d日, DD',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        initStatus: '请选择日期',
        isRTL: false};
    $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});
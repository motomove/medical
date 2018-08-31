$(function () {
    'use strict';

    /*****
     * 用户信息管理
     * @author RyanYIN
     */


    /**
     * 用户基本信息
     */
    StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + "/user/info", '', function (data) {
        $("#nick_name").text(data.data);
    },"");

    /**
     * 用户昵称下拉事件
     */
    $(".sitenav-cell").on('click', '.user-link', function () {
        if($('#user-drop').is(":visible")){
            $('#user-drop').slideUp();
        } else {
            $('#user-drop').slideDown();
        }
    });

});
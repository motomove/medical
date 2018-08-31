$(function () {
    /**
     * 导航菜单
     */

    $('#nav').on('click', '.nav-link', function () {
        var type = $(this).attr('type');
        if('index' == type){
            window.location.href = StatsCommon.getPlatformPath() + '/pages/front/index.html';
        }

        if('base' == type){
            window.location.href = StatsCommon.getPlatformPath() + '/pages/front/base.html';
        }

        if('report' == type){
            window.location.href = StatsCommon.getPlatformPath() + '/pages/report/report_list.html';
        }
    });

});
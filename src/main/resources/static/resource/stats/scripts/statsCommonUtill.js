var StatsCommonUtill = {};

/**
 * 插件各项基本信息
 * @type {{ID: string, FIRST_PAGE_ID: string, LAST_PAGE_ID: string, PRE_PAGE_ID: string, NEXT_PAGE_ID: string, CURR_PAGE_ID: string, TOTALPAGE_PAGE_ID: string, TOTALCOUNT_PAGE_ID: string}}
 */
StatsCommonUtill.PAGIN = {
    ID : 'pagin',//插件id
    FIRST_PAGE_ID : 'pagin_first_page',//首页id
    LAST_PAGE_ID : 'pagin_last_page',//尾页id
    PRE_PAGE_ID : 'pagin_top_next',//上一页id
    NEXT_PAGE_ID : 'pagin_bottom_next',//下一页id
    CURR_PAGE_ID : 'pagin_curpage',//当前页id
    TOTALPAGE_PAGE_ID : 'pagin_totalPage',//总页数id
    TOTALCOUNT_PAGE_ID : 'pagin_totalCount'//总记录数id
};

/**
 *  分页样式 上一页，下一页
 * @param suffix 插件id后缀
 * @param _curPage 当前页
 * @param _pageSize 条数
 * @param _totalPage 总页数
 * @param _totalCount 总条数
 */
StatsCommonUtill.paginStyle = function (suffix, _curPage,_pageSize, _totalPage, _totalCount){
    if(StatsCommon.isNull(suffix)){
        suffix = '';
    }
    if(StatsCommon.isNull(_curPage)){
        _curPage = 1;
    }

    $("#" + StatsCommonUtill.PAGIN.TOTALPAGE_PAGE_ID + suffix).text(_totalPage);
    $("#" + StatsCommonUtill.PAGIN.CURR_PAGE_ID + suffix).text(_curPage);
    $("#" + StatsCommonUtill.PAGIN.TOTALCOUNT_PAGE_ID + suffix).text(_totalCount);
    $("#" + StatsCommonUtill.PAGIN.LAST_PAGE_ID + suffix).val(_totalPage);
    if(_curPage <=1){
        $("#" + StatsCommonUtill.PAGIN.PRE_PAGE_ID + suffix).addClass("pagin-disable");
        $("#" + StatsCommonUtill.PAGIN.FIRST_PAGE_ID + suffix).addClass("pagin-disable");
    }else{
        $("#" + StatsCommonUtill.PAGIN.PRE_PAGE_ID + suffix).removeClass("pagin-disable");
        $("#" + StatsCommonUtill.PAGIN.FIRST_PAGE_ID + suffix).removeClass("pagin-disable");
    }
    if(_curPage >= _totalPage){
        $("#" + StatsCommonUtill.PAGIN.NEXT_PAGE_ID + suffix).addClass("pagin-disable");
        $("#" + StatsCommonUtill.PAGIN.LAST_PAGE_ID + suffix).addClass("pagin-disable");
    }else{
        $("#" + StatsCommonUtill.PAGIN.NEXT_PAGE_ID + suffix).removeClass("pagin-disable");
        $("#" + StatsCommonUtill.PAGIN.LAST_PAGE_ID + suffix).removeClass("pagin-disable");
    }
    if(_totalPage>1){
        $("#" + StatsCommonUtill.PAGIN.ID + suffix).show();
    }else{
        $("#" + StatsCommonUtill.PAGIN.ID + suffix).hide();
    }
};

/**
 * 分页插件绑定事件
 * @param suffix id后缀
 * @param myCallback 事件回调
 */
StatsCommonUtill.paginTrunCallback = function (suffix, myCallback) {

    if(StatsCommon.isNull(suffix)){
        suffix = '';
    }

    $("#" + StatsCommonUtill.PAGIN.FIRST_PAGE_ID + suffix).on("click", function () {
        if (!$(this).hasClass("pagin-disable")) {
            myCallback(1);
        }
    });

    $("#" + StatsCommonUtill.PAGIN.PRE_PAGE_ID + suffix).on("click", function () {
        if (!$(this).hasClass("pagin-disable")) {
            var curPage = $("#" + StatsCommonUtill.PAGIN.CURR_PAGE_ID + suffix).text();
            myCallback(parseInt(curPage)-1);
        }
    });

    $("#" + StatsCommonUtill.PAGIN.NEXT_PAGE_ID + suffix).on("click", function () {
        if (!$(this).hasClass("pagin-disable")) {
            var curPage = $("#" + StatsCommonUtill.PAGIN.CURR_PAGE_ID + suffix).text();
            myCallback(parseInt(curPage)+1);
        }
    });

    $("#" + StatsCommonUtill.PAGIN.LAST_PAGE_ID + suffix).on("click", function () {
        if (!$(this).hasClass("pagin-disable")) {
            var curPage = $("#" + StatsCommonUtill.PAGIN.LAST_PAGE_ID + suffix).val();
            myCallback(parseInt(curPage));
        }
    });
};
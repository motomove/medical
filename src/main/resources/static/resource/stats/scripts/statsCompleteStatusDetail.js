/**
 * Created by wy on 2017/8/30.
 */
$(function () {



    $("#userLearnComp_table_data").hide();
    $("#userLearnComp_table_load").show();


    $('.proDetail .an_link1').click(function(){
        $('.proDetail').hide();
        $('.dashboard').show();
    });

    //初始化

    //加载类型

    getReourceType();

    //获取资源类型
    function getReourceType() {

        StatsCommon.ajaxBodyReq(StatsCommon.getPlatformPath() + '/statistics/compResouceType', JSON.stringify({
            params: {
                siteCode: siteCode,
                courseId: courseId
            }
        }), function (data) {
            if (data != null && data.data != null) {
                $("#resourceTypeSelect_user").empty();
                var items = data.data;
                $("#resourceTypeSelect_user").append('<option value="">全部</option>');
                for (var i = 0; i < items.length; i++) {
                    $("#resourceTypeSelect_user").append('<option value="' + items[i] + '">' + StatsCommon.getResourceName(items[i]) + '</option>');
                }
            }
        },token);
    }

    //仅查看按钮
    $("#resourceTypeSelect_user").change(function () {
        var resourceType = $(this).val();
        $("#learn_minPoint").val("");
        $("#learn_maxPoint").val("");
        $("#learn_loginId").val("");
        $("#learn_trueName").val("");
        $("#sortByFinish").removeClass("icon-ascending").addClass("icon-descending");
        $("#sortByScore").removeClass("icon-ascending").addClass("icon-descending");

        var params={};
        params.courseId = courseId;
        params.resourceType = resourceType;
        var paramsData={};
        paramsData.params=params;
        //获取资源列表
        StatsCommon.ajaxBodyReq('/learn/stats/courseUserResourceItems', JSON.stringify(paramsData), function (data) {
            if (data != null && data.data != null && data.data.length>0) {
                learnMaxProgress = data.data;
            }
            curPages("", "", "", "", resourceType, 1, "", 'desc', '');
        },token);

    });
    //搜索条件
    $("#learn_click_user").click(function () {
        var min = $("#learn_minPoint").val();
        var max = $("#learn_maxPoint").val();
        var loginId = $("#learn_loginId").val();
        var trueName = $("#learn_trueName").val();
        var resourceType = $("#resourceTypeSelect_user").val();
        $("#sortByFinish").removeClass("icon-ascending").addClass("icon-descending");
        $("#sortByScore").removeClass("icon-ascending").addClass("icon-descending");
        curPages(trueName, loginId, min, max, resourceType, 1, "", 'desc', '');
    });

    //排序按钮
    $("#sortByFinish1").click(function () {
        var min = $("#learn_minPoint").val();
        var max = $("#learn_maxPoint").val();
        var loginId = $("#learn_loginId").val();
        var trueName = $("#learn_trueName").val();
        var resourceType = $("#resourceTypeSelect_user").val();
        var sortScore = 'desc';
        if ($("#sortByFinish").hasClass("icon-descending")) {
            $("#sortByFinish").removeClass("icon-descending").addClass("icon-ascending");
            curPages(trueName, loginId, min, max, resourceType, 1, "", '', "asc");
        } else {
            $("#sortByFinish").removeClass("icon-ascending").addClass("icon-descending");
            curPages(trueName, loginId, min, max, resourceType, 1, "", '', "desc");
        }
    });
    //排序按钮
    $("#sortByFinish").click(function () {
        if ($(this).hasClass("icon-descending")) {
            $(this).removeClass("icon-descending").addClass("icon-ascending");
        } else {
            $(this).removeClass("icon-ascending").addClass("icon-descending");
        }
    });
    $("#sortByScore1").click(function () {
        var min = $("#learn_minPoint").val();
        var max = $("#learn_maxPoint").val();
        var loginId = $("#learn_loginId").val();
        var trueName = $("#learn_trueName").val();
        var resourceType = $("#resourceTypeSelect_user").val();
        if ($("#sortByScore").hasClass("icon-descending")) {
            $("#sortByScore").removeClass("icon-descending").addClass("icon-ascending");
            curPages(trueName, loginId, min, max, resourceType, 1, "", "asc", '');
        } else {
            $("#sortByScore").removeClass("icon-ascending").addClass("icon-descending");
            curPages(trueName, loginId, min, max, resourceType, 1, "", "desc", '');
        }
    });
    $("#sortByScore").click(function () {
        if ($(this).hasClass("icon-descending")) {
            $(this).removeClass("icon-descending").addClass("icon-ascending");
        } else {
            $(this).removeClass("icon-ascending").addClass("icon-descending");
        }
    });



    //绑定append-横轴
    $("#userLearnCompLeft").on("click", "[name='checkLine']", function () {
        $('.pd_curBarH').remove();
        var barH = $('<div class="pd_curBarH"></div>');
        var table = $('.pd_table');
        var tblTop = table.offset().top;
        var barTop = $(this).offset().top;
        table.append(barH);
        $('.pd_curBarH').css('top', barTop - tblTop - 2);
        $('.pd_curBarV').remove();
    });


    //绑定append-纵轴
    $("#userLearnCompRight").on("click", "[name='checkLine']", function () {
        $('.pd_curBarV').remove();
        var w = $('.pd_tb_li6').outerWidth(); // 每小格宽度
        var n=$('.pd_tb_row').length;
        var barV = $('<div class="pd_curBarV"></div>');
        var table = $('.pd_table_r ul');
        var tblLeft = table.offset().left;
        var barLeft = $(this).offset().left;
        table.append(barV);
        if(barLeft-tblLeft>0){
            $('.pd_curBarV').css('left', barLeft - tblLeft - 2);

        }else{
            $('.pd_curBarV').css('left', 0);
            $('.pd_curBarV').css('width', w-3);
        }
        $('.pd_curBarV').css('height', n*w+37);

        $('.pd_curBarH').remove();
    });


});

//资源列表
var learnMaxProgress = [];

// 学习完成情况滚动表格宽度计算
function getWidth(n) {
    var w = $('.pd_tb_li6').outerWidth(); // 每小格宽度

    $('.pd_table_r').width(parseInt($("#userLearnComp_table_data").width()-431));
    $('.pd_table_r ul').width(n * w);
    var maxWidth = ($("#userLearnComp_table_data").width()-431)/$('.pd_tb_li6').outerWidth();
    if (n != null && n != '' && n != undefined) {
        if (n >=(maxWidth+2)) {
            $("#mCSB_1_container").css("width", n * w);
            $("#mCSB_1_container").css("left", "0px");
            myScroll(); // 再调用滚动条样式
            $(".pd_table_r").mCustomScrollbar("update");
        }else{
            $("#mCSB_1_container").css("left", "0px");
            $(".pd_table_r").mCustomScrollbar("disable",true);
            // $(".pd_table_r").mCustomScrollbar("destroy");
        }

    }
}
function myScroll(){
    $(".pd_table_r").mCustomScrollbar({ //选出需要加滚动条的容器
        axis:"x",
        scrollbarPosition: "inside",
        theme:"my-theme-h"
    });
}


function curPages(trueName, loginId, finishMin, finishMax, resourceType, curPage, pageSize, sortByScore, sortByFinish) {
    if (curPage == "" || curPage == undefined || curPage == null) {
        curPage = 1;
    }
    if (pageSize == "" || pageSize == undefined || pageSize == null) {
        pageSize = 10;
    }
    if (StatsCommon.isNull(sortByScore) && StatsCommon.isNull(sortByFinish)) {
        sortByScore = 'desc';
    }

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.trueName = trueName;
    params.loginId = loginId;
    params.finishMin = finishMin;
    params.finishMax = finishMax;
    params.resourceType = resourceType;
    params.curPage = curPage;
    params.pageSize = pageSize;
    params.sortByScore = sortByScore;
    params.sortByFinish = sortByFinish;
    var paramsData={};
    paramsData.params=params;


    $("#userLearnComp_table_data").hide();
    $("#userLearnComp_table_load").show();
    $("#anTab-con-noTable").hide();
    $("#userLearnPage").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath()+'/item/userCompLearnInfo?access_token='+token,
        pagerData: JSON.stringify(paramsData),
        isOpenShowPagerBarForOnePage: false,
        curPageNum: curPage,
        pageSizeNum: pageSize,
        dataType: "json",
        contentType : 'application/json',
        curPageMapperKey: 'curPage',	//设置后台参数映射
        pageSizeMapperKey: 'pageSize',
        pageSizeArr: [10, 20, 30, 50, 100],
        isShowPageSizeSelectToolBar: false,
        isShowTotalPageToolBar: false,
        parsePageData: function (resultData) {	// 解析数据成分页插件支持的数据格式
            var pageData = $.extend(resultData.data, {'totalRow': resultData.data.totalCount});	// 因为后台page.java类中总记录数属性为totalCount，插件中使用的是totalRow，故做个转换
            return pageData;
        },
        pagerCallHandel: function (data, pagerParam) {	//pageData:分页对象json数据
            $("#userLearnCompHead").empty();
            $("#userLearnCompLeft").empty();
            $("#userLearnCompRight").empty();
            if (data != null && data.data != null && data.data.items != null) {
                var items = data.data.items[0];
                if (items != null) {
                    //返回空页面
                    if(StatsCommon.isNull(learnMaxProgress) ||learnMaxProgress.length<=0 ){
                        $("#anTab-con-noTable").show();
                        $("#userLearnComp_table_data").hide();
                        $("#userLearnComp_table_load").hide();
                        return ;
                    }

                    if(StatsCommon.isNull(items.user) ||items.user.length<=0  ){
                        $("#anTab-con-noTable").show();
                        $("#userLearnComp_table_data").hide();
                        $("#userLearnComp_table_load").hide();
                        return ;
                    }

                    //用户集合--用于查询每个用户节点完成情况
                    var userIdList = "";
                    //表头
                    if (learnMaxProgress != null && learnMaxProgress != "") {
                        var chapter1 = learnMaxProgress[0].title.charAt(1);
                        var chapters = learnMaxProgress[0].title.charAt(2);
                        if(chapters<=9){
                            chapter1= chapter1+chapters;
                        }
                        for (var i = 0; i < learnMaxProgress.length; i++) {
                            var titleHead = learnMaxProgress[i].title;
                            var resourceTypeHead = learnMaxProgress[i].type;
                            var chapter2 = titleHead.charAt(1);
                            var chapters2 = titleHead.charAt(2);
                            if(chapters2<=9){
                                chapter2= chapter2+chapters2;
                            }
                            //扩展-可以添加itemId
                            var content = '<li class="pd_tb_li pd_tb_li6" title="' + titleHead + '">';
                            content += StatsCommon.getResouceTypeCSS(resourceTypeHead);
                            if (i == 0 || chapter1 != chapter2) {
                                chapter1 = chapter2;
                                content += '<span class="pd_bubble">' + chapter2 + '</span>'
                            }
                            content += '</li>';
                            $("#userLearnCompHead").append(content);
                        }
                    }
                    //表内数据
                    //表左侧数据填充
                    if (items.user != null && items.user != "") {
                        var index = 1;
                        var str = "";
                        for(var i=0;i<items.user.length;i++){
                            userIdList+=items.user[i].loginId+",";
                            str += '<li class="pd_tb_row"><ul class="clearfix">' +
                                '<li class="pd_tb_li pd_tb_li1 " name="checkLine">' + (index++) + '</li>' +
                                '<li class="pd_tb_li pd_tb_li2 " name="checkLine" title="' + items.user[i].trueName + '">' + StatsCommon.cutStr(items.user[i].trueName, 5) + '</li>' +
                                '<li class="pd_tb_li pd_tb_li3 " name="checkLine" title="' + items.user[i].loginId + '">' + StatsCommon.cutStr(items.user[i].loginId, 5) + '</li>' +
                                '<li class="pd_tb_li pd_tb_li4 " name="checkLine">' + items.user[i].rate + '%</li>' +
                                '<li class="pd_tb_li pd_tb_li5 " name="checkLine">' + items.user[i].total + '</li>' ;
                        }
                        if(items.user.length<pageSize){
                            for(var i=1;i<=pageSize-items.user.length;i++){
                                str += '<li class="pd_tb_row"><ul class="clearfix">' +
                                    '<li class="pd_tb_li pd_tb_li1 " > </li>' +
                                    '<li class="pd_tb_li pd_tb_li2 " > </li>' +
                                    '<li class="pd_tb_li pd_tb_li3 " > </li>' +
                                    '<li class="pd_tb_li pd_tb_li4 " > </li>' +
                                    '<li class="pd_tb_li pd_tb_li5 " > </li>';
                            }
                        }
                        str+='</ul></li>' ;
                        $("#userLearnCompLeft").append(str);
                    }
                    //表右侧数据初始化
                    if (items.user != null && items.user != "" && learnMaxProgress != null && learnMaxProgress != "") {
                        //用户
                        for(var j=0;j<items.user.length;j++){
                            //节点
                            var loginIds=items.user[j].loginId;
                            if(!StatsCommon.isNull(loginIds)){
                                loginIds = loginIds.replace(/@|\./g,"_");
                            }
                            var str='';
                            for (var i = 0; i < learnMaxProgress.length; i++) {
                                var itemIds=learnMaxProgress[i].itemId;
                                str += '<li class="pd_tb_li pd_tb_li6" name="checkLine"><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                            }
                            if(learnMaxProgress.length<18){
                                for(var i=1;i<=18-learnMaxProgress.length;i++){
                                    var itemIds=i;
                                    if(i== 18-learnMaxProgress.length){
                                        str += '<li class="pd_tb_li_noData pd_tb_li6_noData" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                                    }else{
                                        str += '<li class="pd_tb_li_noData pd_tb_li6_noData" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                                    }
                                }
                            }
                            $("#userLearnCompRight").append(str);
                        }
                        userIdList = userIdList.substring(0,userIdList.length-1);
                        if(items.user.length<pageSize){
                            for(var j=1;j<=pageSize-items.user.length;j++){
                                //节点
                                var loginIds=j;
                                var str='';
                                for (var i = 0; i < learnMaxProgress.length; i++) {
                                    var itemIds=learnMaxProgress[i].itemId;
                                    str += '<li class="pd_tb_li pd_tb_li6" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>'
                                }
                                if(learnMaxProgress.length<18){
                                    for(var i=1;i<=18-learnMaxProgress.length;i++){
                                        var itemIds=i;
                                        if(i== 18-learnMaxProgress.length){
                                            str += '<li class="pd_tb_li_noData pd_tb_li6_noData" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                                        }else{
                                            str += '<li class="pd_tb_li_noData pd_tb_li6_noData" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                                        }
                                    }
                                }
                                $("#userLearnCompRight").append(str);
                            }
                        }

                        var params2 = {};
                        params2.courseId = courseId;
                        params2.loginIdList = userIdList;
                        var paramsData2 = {};
                        paramsData2.params = params2;

                        //新ajax
                        StatsCommon.ajaxBodyReq('/learn/stats/courseUserResourceFinish', JSON.stringify(paramsData2), function (data) {
                            if (data != null && data.data != null && data.data.length>0) {
                                for(var i=0;i<data.data.length ;i++){
                                    var itemIdAndLoginId = data.data[i];
                                    if(!StatsCommon.isNull(itemIdAndLoginId)){
                                        itemIdAndLoginId = itemIdAndLoginId.replace(/@|\./g,"_");
                                    }
                                    $("#"+itemIdAndLoginId).removeClass("pd_block1").addClass("pd_block2");
                                }
                            }
                            $("#userLearnComp_table_data").show();
                            $("#userLearnComp_table_load").hide();
                            $("#anTab-con-noTable").hide();
                            $(window).resize(function () {
                                getWidth(learnMaxProgress.length<18?18:learnMaxProgress.length); // 先给宽度
                            });
                            getWidth(learnMaxProgress.length<18?18:learnMaxProgress.length); // 先给宽度
                        },token);

                    }
                    $("#userLearnComp_table_data").show();
                    $("#userLearnComp_table_load").hide();
                    $("#anTab-con-noTable").hide();
                    $(window).resize(function () {
                        getWidth(learnMaxProgress.length<18?18:learnMaxProgress.length); // 先给宽度
                    });
                    getWidth(learnMaxProgress.length<18?18:learnMaxProgress.length); // 先给宽度
                    // myScroll(); // 再调用滚动条样式
                }

            }

        }
    });

}

/*function curPages(trueName, loginId, finishMin, finishMax, resourceType, curPage, pageSize, sortByScore, sortByFinish) {
    if (curPage == "" || curPage == undefined || curPage == null) {
        curPage = 1;
    }
    if (pageSize == "" || pageSize == undefined || pageSize == null) {
        pageSize = 10;
    }
    if (StatsCommon.isNull(sortByScore) && StatsCommon.isNull(sortByFinish)) {
        sortByScore = 'desc';
    }

    var params={};
    params.siteCode = siteCode;
    params.courseId = courseId;
    params.trueName = trueName;
    params.loginId = loginId;
    params.finishMin = finishMin;
    params.finishMax = finishMax;
    params.resourceType = resourceType;
    params.curPage = curPage;
    params.pageSize = pageSize;
    params.sortByScore = sortByScore;
    params.sortByFinish = sortByFinish;
    var paramsData={};
    paramsData.params=params;


    $("#userLearnComp_table_data").hide();
    $("#userLearnComp_table_load").show();
    $("#anTab-con-noTable").hide();
    $("#userLearnPage").whatyPager({
        pagerUrl: StatsCommon.getPlatformPath()+'/resource/userCompLearnInfo?access_token='+token,
        pagerData: JSON.stringify(paramsData),
        isOpenShowPagerBarForOnePage: false,
        curPageNum: curPage,
        pageSizeNum: pageSize,
        dataType: "json",
        contentType : 'application/json',
        curPageMapperKey: 'curPage',	//设置后台参数映射
        pageSizeMapperKey: 'pageSize',
        pageSizeArr: [10, 20, 30, 50, 100],
        isShowPageSizeSelectToolBar: false,
        isShowTotalPageToolBar: false,
        parsePageData: function (resultData) {	// 解析数据成分页插件支持的数据格式
            var pageData = $.extend(resultData.data, {'totalRow': resultData.data.totalCount});	// 因为后台page.java类中总记录数属性为totalCount，插件中使用的是totalRow，故做个转换
            return pageData;
        },
        pagerCallHandel: function (data, pagerParam) {	//pageData:分页对象json数据
            $("#userLearnCompHead").empty();
            $("#userLearnCompLeft").empty();
            $("#userLearnCompRight").empty();
            if (data != null && data.data != null && data.data.items != null) {
                var items = data.data.items[0];
                if (items != null) {
                    //返回空页面

                    if(StatsCommon.isNull(items.title) ||items.title.length<=0 ){
                        $("#anTab-con-noTable").show();
                        $("#userLearnComp_table_data").hide();
                        $("#userLearnComp_table_load").hide();
                        return ;
                    }

                    if(StatsCommon.isNull(items.user) ||items.user.length<=0  ){
                        $("#anTab-con-noTable").show();
                        $("#userLearnComp_table_data").hide();
                        $("#userLearnComp_table_load").hide();
                        return ;
                    }

                    //用户集合--用于查询每个用户节点完成情况
                    var userIdList = "";
                    //表头
                    if (items.title != null && items.title != "") {
                        var chapter1 = items.title[0].title.charAt(1);
                        var chapters = items.title[0].title.charAt(2);
                        if(chapters<=9){
                            chapter1= chapter1+chapters;
                        }
                        for (var i = 0; i < items.title.length; i++) {
                            var titleHead = items.title[i].title;
                            var resourceTypeHead = items.title[i].type;
                            var chapter2 = titleHead.charAt(1);
                            var chapters2 = titleHead.charAt(2);
                            if(chapters2<=9){
                                chapter2= chapter2+chapters2;
                            }
                            //扩展-可以添加itemId
                            var content = '<li class="pd_tb_li pd_tb_li6" title="' + titleHead + '">';
                            content += StatsCommon.getResouceTypeCSS(resourceTypeHead);
                            if (i == 0 || chapter1 != chapter2) {
                                chapter1 = chapter2;
                                content += '<span class="pd_bubble">' + chapter2 + '</span>'
                            }
                            content += '</li>';
                            $("#userLearnCompHead").append(content);
                        }
                    }
                    //表内数据
                    //表左侧数据填充
                    if (items.user != null && items.user != "") {
                        var index = 1;
                        var str = "";
                        for(var i=0;i<items.user.length;i++){
                            userIdList+=items.user[i].loginId+",";
                            str += '<li class="pd_tb_row"><ul class="clearfix">' +
                                '<li class="pd_tb_li pd_tb_li1 " name="checkLine">' + (index++) + '</li>' +
                                '<li class="pd_tb_li pd_tb_li2 " name="checkLine" title="' + items.user[i].trueName + '">' + StatsCommon.cutStr(items.user[i].trueName, 5) + '</li>' +
                                '<li class="pd_tb_li pd_tb_li3 " name="checkLine" title="' + items.user[i].loginId + '">' + StatsCommon.cutStr(items.user[i].loginId, 5) + '</li>' +
                                '<li class="pd_tb_li pd_tb_li4 " name="checkLine">' + items.user[i].rate + '</li>' +
                                '<li class="pd_tb_li pd_tb_li5 " name="checkLine">' + items.user[i].total + '</li>' ;
                        }
                        if(items.user.length<pageSize){
                            for(var i=1;i<=pageSize-items.user.length;i++){
                                str += '<li class="pd_tb_row"><ul class="clearfix">' +
                                    '<li class="pd_tb_li pd_tb_li1 " > </li>' +
                                    '<li class="pd_tb_li pd_tb_li2 " > </li>' +
                                    '<li class="pd_tb_li pd_tb_li3 " > </li>' +
                                    '<li class="pd_tb_li pd_tb_li4 " > </li>' +
                                    '<li class="pd_tb_li pd_tb_li5 " > </li>';
                            }
                        }
                        str+='</ul></li>' ;
                        $("#userLearnCompLeft").append(str);
                    }
                    //表右侧数据初始化
                    if (items.user != null && items.user != "" && items.title != null && items.title != "") {
                        //用户
                        for(var j=0;j<items.user.length;j++){
                            //节点
                            var loginIds=items.user[j].loginId;
                            if(!StatsCommon.isNull(loginIds)){
                                loginIds = loginIds.replace(/@|\./g,"_");
                            }
                            var str='';
                            for (var i = 0; i < items.title.length; i++) {
                                var itemIds=items.title[i].itemId;
                                str += '<li class="pd_tb_li pd_tb_li6" name="checkLine"><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                            }
                            if(items.title.length<18){
                                for(var i=1;i<=18-items.title.length;i++){
                                    var itemIds=i;
                                    if(i== 18-items.title.length){
                                        str += '<li class="pd_tb_li_noData pd_tb_li6_noData" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                                    }else{
                                        str += '<li class="pd_tb_li_noData pd_tb_li6_noData" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                                    }
                                }
                            }
                            $("#userLearnCompRight").append(str);
                        }
                        userIdList = userIdList.substring(0,userIdList.length-1);
                        if(items.user.length<pageSize){
                            for(var j=1;j<=pageSize-items.user.length;j++){
                                //节点
                                var loginIds=j;
                                var str='';
                                for (var i = 0; i < items.title.length; i++) {
                                    var itemIds=items.title[i].itemId;
                                    str += '<li class="pd_tb_li pd_tb_li6" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>'
                                }
                                if(items.title.length<18){
                                    for(var i=1;i<=18-items.title.length;i++){
                                        var itemIds=i;
                                        if(i== 18-items.title.length){
                                            str += '<li class="pd_tb_li_noData pd_tb_li6_noData" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                                        }else{
                                            str += '<li class="pd_tb_li_noData pd_tb_li6_noData" ><span class="pd_block1" id="'+itemIds+"-"+loginIds+'">&nbsp;</span></li>';
                                        }
                                    }
                                }
                                $("#userLearnCompRight").append(str);
                            }
                        }

                        var params2 = {};
                        params2.courseId = courseId;
                        params2.loginIdList = userIdList;
                        var paramsData2 = {};
                        paramsData2.params = params2;

                        //新ajax
                        StatsCommon.ajaxBodyReq('/learn/stats/courseUserResourceFinish', JSON.stringify(paramsData2), function (data) {
                            if (data != null && data.data != null && data.data.length>0) {
                                for(var i=0;i<data.data.length ;i++){
                                    var itemIdAndLoginId = data.data[i];
                                    if(!StatsCommon.isNull(itemIdAndLoginId)){
                                        itemIdAndLoginId = itemIdAndLoginId.replace(/@|\./g,"_");
                                    }
                                    $("#"+itemIdAndLoginId).removeClass("pd_block1").addClass("pd_block2");
                                }
                            }
                            $("#userLearnComp_table_data").show();
                            $("#userLearnComp_table_load").hide();
                            $("#anTab-con-noTable").hide();
                            $(window).resize(function () {
                                getWidth(items.title.length<18?18:items.title.length); // 先给宽度
                            });
                            getWidth(items.title.length<18?18:items.title.length); // 先给宽度
                        },token);

                    }
                    $("#userLearnComp_table_data").show();
                    $("#userLearnComp_table_load").hide();
                    $("#anTab-con-noTable").hide();
                    $(window).resize(function () {
                        getWidth(items.title.length<18?18:items.title.length); // 先给宽度
                    });
                    getWidth(items.title.length<18?18:items.title.length); // 先给宽度
                    // myScroll(); // 再调用滚动条样式
                }

            }

        }
    });

}*/


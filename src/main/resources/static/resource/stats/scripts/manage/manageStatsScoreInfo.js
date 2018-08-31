/**
 * 管理端自测每日提交量和平均分
 * @param ec
 */

$(function () {

    $("#pagin").hide();
    //课程成绩分析
    getManageScoreSituation(echarts);

    //学习中心平均成绩
    querySiteAvgScore();

    //专业平均成绩
    queryMajorAvgScore();

    //平均成绩趋势
    querySiteTotalTimeLine(echarts, StatsCommon.getPlatformPath() + "/statistics/totalSocreAnalysis");

    StatsCommonUtill.paginTrunCallback("",function(curPage){
        getManageScoreSituation(echarts,curPage);
    });

});

/**
 * 查询专业平均成绩
 */
function queryMajorAvgScore() {
    querySemester("", "student_major_semester", "", function (newValue) {
        var semester = '';
        if(undefined == newValue){
            semester = $("#student_major_semester").combobox('getValue');
        } else {
            semester = newValue.name;
        }
        queryDetial(StatsCommon.getPlatformPath() + "/statistics/majorSocreAnalysis", 1, 10, semester, "", "", "major", "student_major_score_page", '_major');
    });

}

/**
 * 查询学习中心平均成绩
 */
function querySiteAvgScore() {
    querySemester("", "student_site_semester", "", function (newValue) {
        var semester = '';
        if(undefined == newValue){
            semester = $("#student_site_semester").combobox('getValue');
        } else {
            semester = newValue.name;
        }

        queryDetial(StatsCommon.getPlatformPath() + "/statistics/siteSocreAnalysis", 1, 10, semester, "", "",  "site", "student_site_score_page", "_site")
    });

}

var isLoadChart = false;
function getActiveSite(myChart, objDomId) {
    $("#" + objDomId).combobox({
        url: StatsCommon.getPlatformPath() + '/statistics/combobox?type=' + objDomId ,
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
            return tempName;
        },
        onSelect: function(newValue) {
            var url = StatsCommon.getPlatformPath() + '/statistics/totalSocreAnalysis';
            var edu = $("#edu").combobox('getValue'), site = $('#site').combobox('getValue'), major = $('#major').combobox('getValue');
            if(undefined != newValue && newValue.type == 'edu'){
                edu = newValue.name;
                edu = edu.indexOf('全部层次') >= 0 ? "" : edu;
            }
            if(undefined != newValue && newValue.type == 'site'){
                site = newValue.name;
                site = site.indexOf('全部学习中心') >= 0 ? "" : site;
            }
            if(undefined != newValue && newValue.type == 'major'){
                major = newValue.name;
                major = major.indexOf('全部专业') >= 0 ? "" : major;
            }

            reqEchats(myChart, url, site, major, edu);
        },
        onLoadSuccess:function(data){
            var _data = $("#" + objDomId).combobox('getData');
            if(_data != null && _data.meta != null ){
                if (data != null && data.data != null && data.data.list != undefined) {
                    var items = data.data.list;
                    var values= [];
                    if(objDomId == 'site'){
                        values = [{"name":"全部学习中心","Id":"", "type": "site"}];

                    }

                    if(objDomId == 'edu'){
                        values = [{"name":"全部层次","Id":"", "type": "edu"}];
                    }

                    if(objDomId == 'major'){
                        values = [{"name":"全部专业","Id":"", "type": "major"}];
                    }

                    for(var i=0;i<items.length;i++){
                        if(objDomId == 'site'){
                            values.push({name:items[i].name, Id:items[i].name, type:"site"});
                        }

                        if(objDomId == 'edu'){
                            values.push({name:items[i].name, Id:items[i].name, type:"edu"});
                        }

                        if(objDomId == 'major'){
                            values.push({name:items[i].name, Id:items[i].name, type:"major"});
                        }
                    }
                    $("#" + objDomId).combobox('loadData', values);
                }
            }
        }
    });
}

/**
 * 学习中心总学习时长
 * @param ec
 * @param url
 */
function querySiteTotalTimeLine(ec, url) {
    $("#manageVideoLearn").width('100%');
    $("#manageVideoLearn").height('304px');
    var manageTestCharts = ec.init($("#manageVideoLearn")[0]);


    getActiveSite(manageTestCharts, "edu");
    getActiveSite(manageTestCharts, "site");
    getActiveSite(manageTestCharts, "major");

    var edu = $('#edu').val(), site = $('#site').val(), majjor = $('#major').val();
    reqEchats(manageTestCharts, url, site, majjor, edu);

}

/**
 * 获取图表
 * @param myChart
 * @param url
 * @param date
 * @param period
 * @param type
 */
function reqEchats(myChart, url, siteName, majorName, eduName) {
    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...'
    });
//siteName,String majorName,String eduName
    var params={};
    params.siteName = siteName;
    params.majorName = majorName;
    params.eduName = eduName;

    StatsCommon.ajaxReq(url, params, function (data) {
        myChart.hideLoading();
        var category = ["成绩"];
        var val = [];
        var tempVal = [];
        var tempVal2 = [];
        var tempVal3 = [];
        var yName = [];
        var tooltips = [];

        if (data != null && data.data != null && data.data.list != null) {
            var items = data.data.list;

            for (var i = 0; i < items.length; i++) {
                tempVal3.push(items[i].averageScore);
                yName.push(items[i].grade_name)
            }
            //todo 暂时使用假数据
            var yAxis = {
                title: '',
                name: ''
            };
            var xAxis = {
                data: yName,
                title: ''
            };
            val = [tempVal3];
            StatsCommon.setEchartsBar(myChart, category, yAxis, xAxis, val);

        }

        $(".gridTabLMA-tab a").removeClass("click-disable");
    },token);
}




/**
 * 课程成绩分析
 * @param ec
 */
function getManageScoreSituation(ec,curpage) {
    var isInit = false;
    if(StatsCommon.isNull(curpage)){
        isInit = true;
        curpage = 1;
    } else {
        isInit = false;
    }

    $("#manage_socre_situation").width('100%');
    $("#manage_socre_situation").height('484px');
    var myChart = ec.init($("#manage_socre_situation")[0]);

    myChart.clear();

    myChart.showLoading({
        text: '正在努力的读取数据中...',
    });

    if( curpage <= 1 && isInit){

        querySemester(myChart, "student_ct_semester", curpage,function(newValue) {
            var semester = '';
            if(undefined == newValue){
                semester = $("#student_ct_semester").combobox('getValue');
            } else {
                semester = newValue.name;
            }
            echarts.dispose($("#manage_socre_situation")[0]);
            myChart = echarts.init($("#manage_socre_situation")[0]);
            createCourseBar(myChart, semester, curpage);
        });
    } else {
        var semester = $("#student_ct_semester").combobox('getValue');
        createCourseBar(myChart, semester, curpage);
    }


}

/**
 * 创建图表
 * @param myChart
 * @param semester
 */
function createCourseBar(myChart, semester, curpage) {
    var params={};
    params.semesterName = semester;
    params.curPage = curpage;

    StatsCommon.ajaxReq(StatsCommon.getPlatformPath() + '/statistics/socreAnalysis', params, function (data) {
        myChart.hideLoading();
        var legendName = ['平均分\t\t\t\t\t','0-20分数段', '20-40分数段', '40-60分数段', '60-80分数段', '80-100分数段'];
        var val = {
            left: [],
            right: []
        };
        var left0 = [];
        var right0 = [];
        var right1 = [];
        var right2 = [];
        var right3 = [];
        var right4 = [];
        var yName = [];
        var colorArray={
            left:['#bedfef'],
            right:['#f2dfa8','#b4cd7a','#86cb83','#69d1ca','#73bdf4']
        };
        var page = 1, colSzie = 0;
        if (data != null && data.data != null && data.data.list != undefined  && data.data.list.length>0) {
            var items = data.data.list;
            for (var i = 0; i < items.length; i++) {
                right0.push(items[i].score_segment_02);
                right1.push(items[i].score_segment_24);
                right2.push(items[i].score_segment_46);
                right3.push(items[i].score_segment_68);
                right4.push(items[i].score_segment_810);
                left0.push(items[i].average_score);
                yName.push(StatsCommon.isNull(items[i].course_name)?'-':items[i].course_name);
            }
            val.left.push(left0);
            val.right.push(right0);
            val.right.push(right1);
            val.right.push(right2);
            val.right.push(right3);
            val.right.push(right4);
            if(undefined == data.data.totalNumber){
                page = $('#pagin').data("chartpage");
                colSzie = $('#pagin').data("colSzie");
            } else {
                page = Math.floor(data.data.totalNumber/10 + 1);
                colSzie = data.data.totalNumber;
                $('#pagin').data("chartpage", page);
                $('#pagin').data("colSzie", colSzie);
            }


        }
        StatsCommon.setEchartsLeftAndRigth(myChart, legendName, yName, val,colorArray);
        StatsCommonUtill.paginStyle("",curpage,10, page, colSzie);
    },token);
}


/**
 * 详细数据
 * @param ec
 */
function queryDetial(url, curPage,pageSize,search ,sort ,order, callback, pageDom, pageObject) {
    $("#student" + pageObject + "_score_data").hide();
    $("#student" + pageObject + "_score_loading").show();

    if (curPage == "" || curPage == undefined || curPage == null) {
        curPage = 1;
    }
    if (pageSize == "" || pageSize == undefined || pageSize == null) {
        pageSize = 10;
    }
    var params={};
    params.semesterName = search;
    params.pageSize = pageSize;
    params.sort = sort;
    params.order = order;
    params.cur = curPage;
    params.type = callback;
    var paramsData = {};
    paramsData.params = params;

    $("#" + pageDom).whatyPager({
        pagerUrl: url,
        pagerData: JSON.stringify(params),
        isOpenShowPagerBarForOnePage: false,
        curPageNum: curPage,
        pageSizeNum: pageSize,
        pageObject : pageObject,
        dataType: "json",
        pageContainerSelector: '#pager_plugin'  + pageObject,		//分页栏容器
        pagelistSelector: '#pagelist' + pageObject,				//分页div，控制当列表数据不超过1页时，隐藏分页栏
        pageLinkObjs: '#toolBar_pageLink' + pageObject + ' div a',	//显示的所有页码

        pageLinkSelector: '#toolBar_pageLink'+ pageObject,		//页码显示区域
        //pageCurPageSelector: '#toolBar_curPage'+ pageObject,	//页码显示区域
        pageTotalPageSelector: '#toolBar_curPage'  + pageObject +', #toolBar_totalPage' + pageObject,//页码显示区域, 控制（当前页/总页数）显示
        pageRowCountSelector: '#toolBar_rowCount'  + pageObject,	//页码显示区域
        pageSizeToolBarSelector: '#toolBar_pageSizeSelect'  + pageObject,//页码显示区域
        pageJumpPageSelector: '#toolBar_jumpPage'  + pageObject,	//页码显示区域

        showCurPage: '#showCurPage'  + pageObject,				//分页栏显示当前码元素
        currentPageSelector: '#currentPage'  + pageObject,		//当前页隐藏域
        pageSizeSelector: '#pageSize'  + pageObject,				//每页显示条数隐藏域
        totalPageSelector: '#totalPage'  + pageObject,			//分页栏：总页数显示区域
        rowCountSelector: '#rowCount'  + pageObject,				//分页栏：总条数显示区域
        pageNumSelector: '#pageNum'  + pageObject,				//跳页输入栏
        pageSizeSelectSelector: '#pageSize_select'  + pageObject,	//每页显示条数下拉选择框

        //首页、上一页、下一页、尾页、跳页
        firstPage: "#start"  + pageObject,
        prePage: "#previous"  + pageObject,
        nextPage: "#next"  + pageObject,
        lastPage: "#end"  + pageObject,
        jumpPageNum: "#jumpPageNum"  + pageObject,
        curPageMapperKey: 'curPage',	//设置后台参数映射
        pageSizeMapperKey: 'pageSize',
        pageSizeArr: [10, 20, 30, 50, 100],
        isShowPageSizeSelectToolBar: false,
        isShowTotalPageToolBar: false,
        parsePageData: function (resultData) {	// 解析数据成分页插件支持的数据格式
            var pageData = $.extend(resultData.data, {'totalRow': resultData.data.totalNumber});	// 因为后台page.java类中总记录数属性为totalCount，插件中使用的是totalRow，故做个转换
            return pageData;
        },
        pagerCallHandel: function (data, pagerParam) {	//pageData:分页对象json数据
            pagerParam = JSON.parse(pagerParam);
            if('site' == pagerParam.type){
                $("#student_site_score_val").empty();
                if (data != null && data.data != null && data.data.list != null) {
                    var items = data.data.list;

                    var cur = data.data.curPage;
                    cur = StatsCommon.isNull(cur) || cur == 0 ? 0 : (cur - 1);
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
                            str+='          <li class="resdisTabl-col resdisTabl-col-44" name="checkLine">' + resource.site_name+ '</li>';
                            str+='          <li class="resdisTabl-col resdisTabl-col-14" name="checkLine">' +  (StatsCommon.isNull(resource.passing_rate) ? '0': resource.passing_rate) + '</li>';
                            str+='          <li class="resdisTabl-col resdisTabl-col-14" name="checkLine">' + (StatsCommon.isNull(resource.excellent_rate) ? '0': resource.excellent_rate) + '</li>';
                            str+='          <li class="resdisTabl-col resdisTabl-col-14" name="checkLine">' + (resource.average_score) + '</li>';
                            str+='          <li class="resdisTabl-col resdisTabl-col-9_none  " name="checkLine">' + ((i + 1) + (cur) * 10) + '</li>';
                            str+='      </ul>';
                            str+='  </div>';
                            str+='</li>';
                            $("#student_site_score_val").append(str);
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
                        $("#student_site_score_val").append(str);
                    }

                    $("#student_site_score_data").show();
                    $("#student_site_score_loading").hide();

                }
            }

            if('major' == pagerParam.type) {
                $("#student_major_score_val").empty();
                if (data != null && data.data != null && data.data.list != null) {
                    var items = data.data.list;
                    var cur = data.data.curPage;
                    cur = StatsCommon.isNull(cur) || cur == 0 ? 0 : (cur - 1);
                    if (items.length > 0) {
                        for (var i = 0; i < items.length; i++) {
                            var str = '';
                            var resource = items[i];
                            str += '<li class="tablTab-tab" >';
                            str += '  <div class="resdisTabl ';
                            if (i % 2 == 0) {
                                str += ' tablTab-cur';
                            }
                            str += '   tableTab">';
                            str += '      <ul class="clearfix">';
                            str += '          <li class="resdisTabl-col resdisTabl-col-44" name="checkLine">' + resource.major_name + '</li>';
                            str += '          <li class="resdisTabl-col resdisTabl-col-14" name="checkLine">' + (StatsCommon.isNull(resource.passing_rate) ? '0' : resource.passing_rate) + '</li>';
                            str += '          <li class="resdisTabl-col resdisTabl-col-14" name="checkLine">' + (StatsCommon.isNull(resource.excellent_rate) ? '0' : resource.excellent_rate) + '</li>';
                            str += '          <li class="resdisTabl-col resdisTabl-col-14" name="checkLine">' + (resource.average_score) + '</li>';
                            str += '          <li class="resdisTabl-col resdisTabl-col-9_none  " name="checkLine">' + ((i + 1) + (cur) * 10) + '</li>';
                            str += '      </ul>';
                            str += '  </div>';
                            str += '</li>';
                            $("#student_major_score_val").append(str);
                        }

                    } else {

                        var str = '';
                        str += '<li class="tablTab-tab" >';
                        str += '  <div class="resdisTabl tablTab-cur tableTab">';
                        str += '      <ul class="clearfix">';
                        str += '<li class="resdisTabl-col resdisTabl-col-99_none " name="checkLine" >暂无数据</li>';
                        str += '      </ul>';
                        str += '  </div>';
                        str += '</li>';
                        $("#student_major_score_val").append(str);
                    }

                    $("#student_major_score_data").show();
                    $("#student_major_score_loading").hide();

                }
            }
        }
    },token);

}


/**
 * 查询学期
 * @param myChart
 * @param objDomId
 */
function querySemester(myChart, objDomId, curpage, callback) {
    $("#" + objDomId).combobox({
        url: StatsCommon.getPlatformPath() + '/statistics/combobox?type=semester' ,
        valueField: 'Id',
        textField: 'name',
        width: 200,
        height: 30,
        listHeight:20,
        panelHeight:0,
        formatter: function(row) {
            return row.name;
        },
        onSelect: callback,
        onLoadSuccess:function(data){
            var _data = $("#" + objDomId).combobox('getData');
            if(_data != null && _data.meta != null ){
                if (data != null && data.data != null && data.data.list != undefined) {
                    var items = data.data.list;
                    var tempArr = [];
                    var values=[];
                    for(var i=0;i<items.length;i++){
                        if(items[i].flag_active == '1'){
                            values.push({name:items[i].name, Id:""});
                        } else {
                            tempArr.push({name:items[i].name, Id:items[i].name});
                        }
                    }
                    values = values.concat(tempArr);
                    $("#" + objDomId).combobox('loadData', values);
                }
            } else {
                $("#" + objDomId).combobox('select', _data[0].name);
            }
        }
    });
}









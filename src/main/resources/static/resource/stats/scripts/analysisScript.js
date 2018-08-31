$(function(){ 
	'use strict';
	
	//多选
	$("input[type='checkbox']").click(function(){ 
		if($(this).is(':checked')){ 
			$(this).attr("checked","checked"); 
			$(this).parent().removeClass("c_off").addClass("c_on"); 
		}else{ 
			$(this).removeAttr("checked"); 
			$(this).parent().removeClass("c_on").addClass(" c_off"); 
		} 
	}); 
	//单选
	$("input[type='radio']").click(function(){ 
		$("input[type='radio']").removeAttr("checked"); 
		$(this).attr("checked","checked"); 
		$(this).parent().removeClass("r_off").addClass("r_on").siblings().removeClass("r_on").addClass("r_off"); 
	}); 
	
	// 学习时间段分布图表切换
	// $('#timeDis_switch_line_id').click(function(){
	// 	$('.timeDis_heat').show();
	// 	$('.timeDis_line').hide();
	// });
	// // 学习时间段分布图表切换
	// $('#timeDis_switch_hot_id').click(function(){
	// 	$('.timeDis_heat').hide();
	// 	$('.timeDis_line').show();
	// });
	
	// 学习完成情况滚动表格宽度计算
	// function getWidth(){
	// 	var n = $('.pd_table_r .pd_tb_head .pd_tb_li').length; // 小格个数
	// 	var w = $('.pd_tb_li6').outerWidth(); // 每小格宽度
	// 	$('.pd_table_r ul').width(n*w);
	// };

	// 滚动y条样式调用
	// function myScroll(){
	// 	$(".pd_table_r").mCustomScrollbar({ //选出需要加滚动条的容器
	// 		axis:"x",
	// 		scrollbarPosition: "inside",
	// 		theme:"my-theme-h"
	// 	});
	// }

	$('.pd_rankArr').click(function(){
		$(this).toggleClass('icon-descending');
		$(this).toggleClass('icon-ascending');
	});
	


	
	
	// 学习完成详情表格中，点击一格激活整行或整列
	// $('.pd_table_l .pd_tb_row .pd_tb_li').click(function(){
	// 	var barH = $('<div class="pd_curBarH"></div>');
	// 	var table = $('.pd_table');
	// 	var tblTop = table.offset().top;
	// 	var barTop = $(this).offset().top;
	// 	table.append(barH);
	// 	$('.pd_curBarH').css('top', barTop-tblTop-2);
	// 	$('.pd_curBarV').remove();
	// });
	
	// $('.pd_table_r .pd_tb_li').click(function(){
	// 	var barV = $('<div class="pd_curBarV"></div>');
	// 	var table = $('.pd_table_r ul');
	// 	var tblLeft = table.offset().left;
	// 	var barLeft = $(this).offset().left;
	// 	table.append(barV);
	// 	$('.pd_curBarV').css('left', barLeft-tblLeft-2);
	// 	$('.pd_curBarH').remove();
	// });
	$(document).bind("click",function(e){ 
		var target = $(e.target); 
		if(target.closest(".pd_tb_li").length == 0){ 
			$('.pd_curBarH, .pd_curBarV').remove();
		}
	});

	var isStop = false;
	// 选项卡栏目下拉菜单
	$('.anTab-tab:eq(3)').on('mouseover', function(){

	    //防止频率操作过快
	    // if (isStop) {
         //    return;
        // }
        // isStop = true;
        // setTimeout(function () {
         //    isStop = false;
        // }, 800);

		$(this).children().addClass('anTab-cur');
		$('.anTab_sub').show();
	}).on('mouseleave', function(){
		$(this).children().removeClass('anTab-cur');
		$('.anTab_sub').hide();
	});

	// 通用选项卡
	function setTab(idName, className){ // 这里的className指样式名相同的部分
		var $tabName = $('.' + className); // 选项卡ID
		var tabname = className; // 样式名相同部分
		var $tabNav = $tabName.find('.' + tabname + '-' + 'tab'); // 选项卡切换按钮
		var $tabCon= $tabName.find('.' + tabname + '-' + 'con'); // 选项卡内容块
		var tabCurClass = tabname + '-' + 'cur'; // 切换按钮激活状态样式

		$tabCon.first().show();

		$tabNav.each(function(index){ // 遍历切换按钮
			$(this).click(function(){ // 点击时
				var thisIndex = index; // 储存其index值
				$tabNav.find('a').removeClass(tabCurClass); // 清除其它按钮上激活状态样式
				$(this).find('a').addClass(tabCurClass); // 给当前看按钮添加激活状态样式
				$tabCon.hide(); // 隐藏其它内容块
				$tabCon.eq(thisIndex).show(); // 只显示当前按钮对应的内容块
			});
		});
	}
	// setTab('#cardTab', 'cardTab'); // 课程内资源分布选项卡
	// setTab('#tablTab1', 'tablTab');
    setTab('#ghostTab', 'ghostTab');


	// 课程内资源分布相关
	// -----------------------------------------

	// 自动获取二级图表框高度
	function tablTabAutoHeight(){
		$('.tablTab-body').each(function(){
			var h = $(this).prev().height();
			$(this).children().height(h);
		});
	}
	// tablTabAutoHeight();

	// $('.cardTab-tab').each(function(){ // 点击一级TAB切换时
	// 	$(this).click(function(){
	// 		tablTabAutoHeight(); // 调用自动获取图表高度
    //
	// 		// 二级表格TAB需做相应样式调取
	// 		var idx = $(this).index(); // 当前点击的一级TAB的索引值
	// 		var targetSubTab = '#tablTab' + (idx + 1); // 由此得到对应的二级TAB的ID值
	// 		setTab(targetSubTab, 'tablTab'); // 调用二级选项卡函数
	// 		$(targetSubTab).find('.tablTab-tab').first().children().addClass('tablTab-cur'); // 给第一行表格选中样式
	// 		$(targetSubTab).find('.tablTab-con').first().show(); // 给与第一行表格对应的图表显示样式
	// 	});
	// });

    // * 弹出窗口相关
	// -----------------------------------------------------------------------
	function popCenter(popname){
		var popWidth = $(popname).outerWidth();
		var popHeight = $(popname).outerHeight();
		if($(popname).length==0){
		    return ;
        }
		// console.info('-----------------------' +  ((window.screen.availHeight - $(popname).get(0).offsetHeight - 90) / 2) + '----------');
		$(popname).css({
			// 'margin-top': -popHeight/2 + 'px',
			'margin-left': -popWidth/2 + 'px'
		});

	}
	popCenter('.popup_video');
	
}); 

function setTabs(name,cursel,n){
	var ids="#"+name+cursel;
	if($(ids).hasClass("click-disable")){
		return ;
	}
	for(i=1;i<=n;i++){
		var menu=document.getElementById(name+i);
		var con=document.getElementById(name+"-con"+"-"+i);
		var cur = name + "-" + "cur";
		var disable = "click-disable";
		if(name == 'anTab'){
            menu.className=i==cursel?cur:'';
		}else{
            menu.className=i==cursel?cur:disable;
		}

		if(name != 'anTab'){
	        con.style.display=i==cursel?"block":"none";
		}
	}
}

function setTabSubs(name,cursel,n){
    for(var i=1;i<=n;i++){
        var con=document.getElementById(name+"-con"+"-"+i);
        con.style.display=i==cursel?"block":"none";
    }
}

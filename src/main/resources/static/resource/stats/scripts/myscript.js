$(function(){
	'use strict';
	
	// 页面宽度
	// ==================================================
	function adaptWidth(){
		var wWidth = $(window).width();
		if( wWidth < 1200){
			$('.homeNav').css('left', '10px');
			$('.homeMain').css({
				'margin-left': '200px',
				'margin-right': '60px'	
			});
		}
	}
	adaptWidth();
	
	// 左侧吸附导航垂直居中
	// ==================================================
	var navheight = $('.navIn').height();
	$('.navIn').css('margin-top', -(navheight/2) + 'px');
	$('.nav_li').click(function(){
		$('.nav_li').removeClass('nav_cur');
		$(this).addClass('nav_cur');	
	});
	
	
	// 章节目录
	// ==================================================
	
	// 目录收起展开
	var menuTriHeight = $('.menu_trigger').outerHeight();
	$('.menu_trigger').css('margin-top', -(menuTriHeight/2) + 'px');
	
	$('.menu_trigger').click(function(){
		$(this).parent().toggleClass('menu_hide');
		$(this).toggleClass('menu_trigger_off');
		var cls = $(this)[0].className;

		$(this).children('span').html($(this).children('span').html()=='收起'?'展开':'收起');
		$('.pageMain').toggleClass('pageNarrow');
		$('.main').toggleClass('main_wide');
		$(window).resize();

		//设置滚动条样式
		var iframe = document.getElementById("content_frame");
        if(cls && cls.indexOf('menu_trigger_off')>-1){
		    $(iframe.contentWindow).find('html').css('overflow-x','hidden');
        }else{
		    $(iframe.contentWindow).find('html').css('overflow-x','scroll');
        }
	});
	
	// 目录高度
	function mathMenuHeight(){
		var wHeight = $(window).height();
		var headHeight = $('.head').height();
		var menuHeadHeight = $('.menu_head').outerHeight(true);
		var menuListHeight = wHeight - headHeight - menuHeadHeight;
		$('.menu_list').height(menuListHeight);
	}
	mathMenuHeight();
	
	// 章目录折叠
	$('.menu_chpHead').click(function(){
		$(this).siblings('.menu_chpBody').slideToggle(500);
		$(this).toggleClass('menu_unfold');
	});
	
	// 节目录折叠
	$('.menu_pntArr').click(function(){
		$(this).parent().siblings('.menu_pntBody').slideToggle(500);
		$(this).parent().toggleClass('menu_pntUnfold');
	});
	
	// 节目录点击显示当前状态
	$('.menu_pntHead').click(function(){
		$('.menu_pntHead, .menu_resRow').removeClass('menu_cur');
		$(this).addClass('menu_cur');
	});
	$('.menu_resLink').click(function(){
		$('.menu_pntHead, .menu_resRow').removeClass('menu_cur');
		$(this).parent().addClass('menu_cur');
	});
	
	
	$(window).resize(function(){
		adaptWidth();
		mathMenuHeight();
	});
});
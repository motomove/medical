$(function(){
	'use strict';
	
	// Layout
	// --------------------------------------------------------------
	var $header = $('.header');
	var $nav = $('.nav');
	var $main = $('.main');
	var $menu = $('.menu');
	var $footer = $('.footer');
	
	var menuHide = 'menu-hide';
	var mainWide = 'page-main';
	
	var $menuTrigger = $('.menu-trigger');
	var $menuPrimary = $('.menu-primary-head');
	var $menuSecondary = $('.menu-secondary');
	var $menuLink = $('.menu-link');
	
	var menuCur = 'menu-cur';
	var menuOn = 'menu-on';
	var navSticky = 'nav-sticky';
	var footSticky = 'footer-sticky';
	
	// menu
	$menuTrigger.click(function(){
		$menu.toggleClass(menuHide);
		$main.toggleClass(mainWide);
	});
	
	$menuPrimary.each(function(){
		var $this = $(this);
		var $thisSub = $this.next();
		var j = $thisSub.css('display');
		
		$this.click(function(){
			$thisSub.slideToggle();
			
			if(j === 'block'){
				$this.removeClass(menuOn);
			}
		});
	});
	
	$menuLink.each(function(){
		var $this = $(this);
		var $thisParent = $this.closest($menuSecondary).prev();
		var j = $thisParent.attr('class');
		
		$this.click(function(){
			$menuLink.removeClass(menuCur);
			$this.addClass(menuCur);
			
			if(j.indexOf(menuOn) > -1){
				return;
			}else if(j.indexOf(menuOn) === -1){
				$menuPrimary.removeClass(menuOn);
				$thisParent.addClass(menuOn);
			}
		});
	});
	
	// whole page
	function layout(){
		var headerHeight = $header.outerHeight(true);
		var navHeight = $nav.outerHeight(true);
		var pageHeight =  $('html').height();
		var winHeight = $(window).height();
		var footerHeight = $footer.outerHeight(true);
		
		$menu.children().css('height', (winHeight - headerHeight - navHeight));
		
		// footer
		if( pageHeight < (winHeight - footerHeight - 10)){ // 内容高度不够时
			$footer.addClass(footSticky);
		}else{
			$footer.removeClass(footSticky);
		}
	
		// page scroll
		$(window).scroll(function(){

			var top = $(window).scrollTop(); 
			//var a = $header.outerHeight(true);
			if(top > headerHeight)
			{
				$nav.addClass(navSticky);
				$menu.css('padding-top', navHeight);
				$menu.children().css('height', (winHeight - navHeight));
			}
			else
			{
				$nav.removeClass(navSticky);
				$menu.css('padding-top', headerHeight + navHeight);
				$menu.children().css('height', (winHeight - headerHeight - navHeight));
			}
		});	
	}
	layout();
	$(window).resize(function(){
		layout();
	});
});
$(function(){
	'use strict';
	// >>>>>>>>>> 点击其它地方隐藏
	function otherHide(target, idName, triggerIdName, classname){
		$(document).bind('click',function(e){
			var e = e || window.event; //浏览器兼容性
			var elem = e.target || e.srcElement;
			while (elem) { //循环判断至跟节点，防止点击的是div子元素
				if (elem.id && elem.id == idName || elem.id && elem.id == triggerIdName) {
					return;
				}
				elem = elem.parentNode;
			}
			//$(target).hide(); //点击的不是div或其子元素
			$(target).removeClass(classname);
		});
	}
	otherHide('#nav', 'nav', 'nav-trigger', 'nav-show');
	

	// >>>>>>>>>> 点击显示当前为激活状态
	function showCur(target, classname, event){
		$(target).bind(event, function(){
			$(target).removeClass(classname);
			$(this).addClass(classname);
		});
	}
	showCur('.nav-cell', 'nav-cur', 'click');
	
	// >>>>>>>>>> 选项卡
	function setTabs(idName, className, event){ // 这里的className指样式名相同的部分
		var $tabID = $(idName); // 选项卡ID
		var tabname = className; // 样式名相同部分
		var $tabNav = $tabID.find('.' + tabname + '-' + 'tab'); // 选项卡切换按钮
		var $tabCon= $tabID.find('.' + tabname + '-' + 'con'); // 选项卡内容块
		var tabCurClass = tabname + '-' + 'cur'; // 切换按钮激活状态样式
		
		$tabCon.eq(0).show();
		
		$tabNav.each(function(index){ // 遍历切换按钮
			$(this).bind(event, function(){ // 点击时
				var thisIndex = index; // 储存其index值
				$tabNav.find('a').removeClass(tabCurClass); // 清除其它按钮上激活状态样式
				$(this).find('a').addClass(tabCurClass); // 给当前看按钮添加激活状态样式
				$tabCon.hide(); // 隐藏其它内容块
				$tabCon.eq(thisIndex).show(); // 只显示当前按钮对应的内容块
			});
		});
	}
	setTabs('#toastTab1', 'toastTab', 'click');
	setTabs('#toastTab2', 'toastTab', 'click');
	setTabs('#toastTab3', 'toastTab', 'click');
	setTabs('#toastTab4', 'toastTab', 'click');
	setTabs('#cardTab', 'cardTab', 'click');
	
	//多选
	$("input[type='checkbox']").click(function(){ 
		if($(this).is(':checked')){ 
			$(this).attr("checked","checked"); 
			$(this).parent().removeClass("c-off").addClass("c-on"); 
		}else{ 
			$(this).removeAttr("checked"); 
			$(this).parent().removeClass("c-on").addClass(" c-off"); 
		} 
	}); 
	//单选
	$("input[type='radio']").click(function(){ 
		$("input[type='radio']").removeAttr("checked"); 
		$(this).attr("checked","checked"); 
		$(this).parent().removeClass("r-off").addClass("r-on").siblings().removeClass("r-on").addClass("r-off"); 
	}); 
});
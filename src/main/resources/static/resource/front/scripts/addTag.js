$(function(){
	"use strict";
	
	var $tagDrop = $('.tag-add-handler');
	$('.tag-addIco').click(function(){
		$tagDrop.slideToggle();
	});
	var $tagShut = $('.tag-add-handler .btn-shut');
	$tagShut.click(function(){
		$tagDrop.slideUp();
	});
	
	
	function scl(){
		$(".tag-add-menu").mCustomScrollbar({ //选出需要加滚动条的容器
			scrollbarPosition: "outside",
			theme:"my-theme"
		});
	}scl();
	
	// 气泡标签：横排的有背景色的标签
	// 目录标签：下拉菜单中的标签
	
	// 声明一个"添加气泡标签函数"，以备后用
	function addTag(){
		// 创建气泡标签模板变量
		var tag = $(
			'<li class="tag-wrap trans">'+
				'<span>'+
					'<span class="tag-name"></span>'+
				'</span>'+
				'<a href="javascript:;" class="xli icon-del tag-del"></a>'+
			'</li>'
		);
		// 在添加标签按钮`tag-add`之前，追加这个气泡标签
		$('.tag-add').before(tag);
	}
	
	// 声明一个函数：选择标签并添加
	function selectAndAdd(){
		$('.tag-menu-li').each(function() { // 遍历目录标签
			
			$(this).click(function(){ // 点击当前目录条时
			
				// 获取当前目录标签的索引（+1 变成新添加标签的ID，以备后用）
				var n = $(this).index() + 1; 
				
				// 添加新标签
				addTag();

				// 获取最新添加的标签，并赋予相应的ID
				var addedTag = $('.tag-add').prev().attr('id', n);

				// 获取选中的目录标签文字内容
				var val = $(this).find('.tag-menu-name').text();

				// 将选中的目录标签文字内容赋予新加的标签
				addedTag.children().children('.tag-name').text(val);

				// 当前标签的自我删除
				addedTag.children('.tag-del').click(function(){ // 点击当前标签的删除按钮时
					// 自身删除
					$(this).parent().remove();
					// 与之ID对应的目录标签变成未被选中的状态，即“勾”消失
					$('.tag-menu-li').eq(n-1).children('.tag-selected').hide();
				});
			});
			
		});
	}
	selectAndAdd();
});
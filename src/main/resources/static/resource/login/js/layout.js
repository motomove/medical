$(function(){
    'use strict';

    // >>>>>>>>>> 居中
    function loginLayout(){
        var $login = $('.login');
        var loginHeight = $login.height();
        var pageHeight = $(window).height();
        if(loginHeight < pageHeight){
            $login.css({
                'margin-top': (pageHeight - loginHeight)/2
            });
        }
    }

    loginLayout();
    $(window).resize(function(){
        loginLayout();
    });


    // >>>>>>>>>> 选项卡
    function setTabs(idName, className, event){ // 这里的className指样式名相同的部分
        var $tabID = $(idName); // 选项卡ID
        var tabname = className; // 样式名相同部分
        var $tabNav = $tabID.find('.' + tabname + '-' + 'tab'); // 选项卡切换按钮
        var $tabCon= $tabID.find('.' + tabname + '-' + 'con'); // 选项卡内容块
        var $tabCurBar = $tabID.find('.' + tabname + '-' + 'curbar');
        var tabCurClass = tabname + '-' + 'cur'; // 切换按钮激活状态样式

        $tabCon.eq(0).show();

        var tabWrapDefaultLeft = $tabID.offset().left;
        var firstTabDefaultLeft = $tabNav.eq(0).find('span').offset().left;
        $tabCurBar.css('left', (firstTabDefaultLeft - tabWrapDefaultLeft));

        $tabNav.each(function(index){ // 遍历切换按钮
            $(this).bind(event, function(){ // 点击时
                var thisIndex = index; // 储存其index值
                $tabNav.find('a').removeClass(tabCurClass); // 清除其它按钮上激活状态样式
                $(this).find('a').addClass(tabCurClass); // 给当前看按钮添加激活状态样式
                $tabCon.hide(); // 隐藏其它内容块
                $tabCon.eq(thisIndex).show(); // 只显示当前按钮对应的内容块

                var thisTabLeft = $(this).find('span').offset().left;
                $tabCurBar.css('left', (thisTabLeft - tabWrapDefaultLeft));
            });
        });
    }
    setTabs('#loginTab', 'loginTab', 'click');
});
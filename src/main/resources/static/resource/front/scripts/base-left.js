$(function () {

    // 纵向滚动条
    $(".menu-wrap").mCustomScrollbar({
        scrollbarPosition: "outside",
        theme: "my-theme"
    });
    var _height = $(window).height();

    /**
     * 实时监听左侧菜单的显示情况
     */
   /* setInterval(function () {
        var isHide = $('.menu').hasClass('menu-hide');
        if(isHide){
            if(_height <= 650){
                var h = $("#yunyan_content_frame").height();


            }
        }
    }, 200);*/



    /**
     * 左侧导航
     */
    $('.menu-wrap').on('click', '.menu-link', function () {
        var _this = $(this);
        $('.menu-link').removeClass('menu-cur');
        _this.addClass('menu-cur');


        var url = _this.attr('url'), quote = _this.attr('quote'), frameH = _this.attr('frameH');
        if(undefined == quote){
            $("#yunyan_content_frame").hide().parent().hide();
            $("#data_content_frame").show().height(600).attr("src", url).parent().show();

        } else {

            $("#data_content_frame").hide().parent().hide();
            if(!device.mobile()){
                frameH = undefined == frameH ? '660' : frameH;
                if(_height <= 650){
                    frameH = (frameH * (736/_height)).toFixed(1);

                }
                $("#yunyan_content_frame").attr("scrolling", "no").height((Number(frameH) + 2) + '%');
            }
            $("#yunyan_content_frame").show().attr("src", url).parent().show();
        }

        $('.menu').removeClass("menu-hide");

        // setTimeout('reloadSize()', 800);
    });
    $('.menu-link:first').trigger('click');

});

/*iframe高度自适应*/
function resize() {
    var iframe = document.getElementById("data_content_frame");
    try {
        var ifBody = iframe.contentWindow.document.body;
        var height = 0;
        if (ifBody) {
            height = iframe.contentWindow.document.body.offsetHeight;

        } else {
            height = iframe.contentWindow.document.documentElement.scrollHeight;
        }
        iframe.height = height;
        if(height > 600){
            $("#data_content_frame").height(height).parent().height(height);
        }

    } catch (ex) {
        // console.log(ex);
    }
}

/**
 * 重新调整加载高度
 */
function reloadSize() {
    if(device.mobile()){
        $("#data_content_frame_parent").removeClass("main-wrap-data");
    }
}

/*iframe高度时时变化*/
function resizeIframe() {
    var iframe = document.getElementById("data_content_frame");
    try {
        iframe.height = document.screen;
        var ifBody = iframe.contentWindow.document.body;
        if (!ifBody) {
            iframe.height = 2500;
        }
        resize();
        setInterval('resize()', 500);
    } catch (ex) {

    }
}


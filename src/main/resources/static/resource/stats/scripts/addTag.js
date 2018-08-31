/**
 * 搜索组件
 * @param data[{id:'',name:''}] 数据项
 * @param searchCallback 搜索事件回调
 * @param okCallback 确定事件回调
 * @constructor
 */
var CommonSearch = function (data, searchCallback, okCallback) {

    $("#selectedCourseId").before('<ul class="tag_add_menu" id="selectedCourseId"></ul>').remove();
    if (data != null && data.length > 0) {
        var items = data;

        var len = items.length <= 100 ? items.length : 100;

        for (var i = 0; i < len; i++) {
            var courseId = items[i].id;
            var name = items[i].name;
            var code = items[i].code;
            var li = '<li class="tag_menu_li">\
                            <span class="tag">\
                                <span class="tag_label">&bull;</span>\
                                <span class="tag_name" id="' + courseId + '">' + name + '</span>\
                            </span>\
                            <span class="coursespace icon-tick-stroke tag_tick"></span>\
                            <div style="font-size: 10px;line-height: 15px;height: 15px;padding-left: 13px;">'+code+'</div>\
                        </li>';
            $("#selectedCourseId").append($(li));
        }

    }


    var $trigger = $('.tag_add_wrap'); // 筛选按钮

    var $tagMenu = $('.tag_add_handler');
    var $tag = $('.tag_menu_li'); // 课程名称条
    var selectedClass = 'tag_selected'; // 选中状态样式名称
    var $tagName = $('.tag_name'); // 课程名称容器

    var $confirm = $('.snDrop_confirm'); // 确定按钮
    var $reset = $('.snDrop_cancel'); // 重置按钮
    var $cancel = $('.snDrop_bot .an_link1'); // 取消按钮

    var $searchTag = $('.tag_add_input');//搜索内容
    var $searchHiddenTag = $('.tag_add_input_hidden');//搜索内容隐藏域
    var $searchBtn = $('.tag_add_btn');//搜索按钮

    $trigger.unbind('click').click(function () {
        $tagMenu.slideDown();
    });

    $searchBtn.unbind('click').click(function () {
        var searchCont = $searchTag.val();
        $searchHiddenTag.val(searchCont);
        searchCallback(searchCont);
    });


    function scl() {

            $(".tag_add_menu").mCustomScrollbar({ //选出需要加滚动条的容器
                scrollbarPosition: "outside",
                theme: "my-theme"
            });
    }

    scl();

    // 声明一个"添加搜索结果函数"，以备后用
    function addTag(tagName,tagId) {
        // 创建气泡标签模板变量
        // 其中包含变量`tagName`
        var $tagToAdd = $(
            '<li class="tag_wrap trans" tagId="'+tagId+'">' +
            '<span>' +
            '<span class="tag_name">' + tagName + '</span>' +
            '</span>' +
            '</li>'
        );
        // 在添加标签按钮`tag_add`之前，追加这个气泡标签
        $trigger.parent().before($tagToAdd);
        var len = 0;
        $.each($('.tag_wrapper').parent().children(),function(i,e){
            len += $(e).width();
        });
        // console.info(($('.tag_wrapper').parent().width()) + '-----' + len);
        if(len >= $('.tag_wrapper').parent().width()){
            $trigger.parent().parent().children('.tag_wrap').last().remove();
        }
    }

    // 点击课程名称条，切换'选中'状态样式
    $tag.unbind('click').click(function () {
        $(this).toggleClass(selectedClass);
    });

    $cancel.unbind('click').click(function () {
        $tagMenu.slideUp();

        //重置所有已选择的tag
        $tag.removeClass(selectedClass);
        var $tagAdded = $('.tag_wrap'); // 已添加的条件
        $.each($tagAdded,function(i,e){
            var _id = $(e).attr('tagId');
            $('#' + _id).parent().parent().addClass(selectedClass);
        });

        var searchHidVal = $searchHiddenTag.val();
        $searchTag.val(searchHidVal);


    });

    // 点击确定按钮时
    $confirm.unbind('click').click(function () {
        var $tagAdded = $('.tag_wrap'); // 已添加的条件
        if ($tagAdded.length > 0) { // 如果已存在筛选条件
            $tagAdded.remove(); // 先将其删除
        }

        var _ids = [];

        // 将所有选中的课程名称存储在数组中
        var array = $('.' + selectedClass).find($tagName).toArray();
        for (var i = 0; i < array.length; i++) // array.length 为选中的个数
        {
            // 在循环条内逐个获取课程名称
            var targetName = array[i].innerHTML;
            var _id = $(array[i]).attr("id");
            _ids.push(_id);
            // 执行添加搜索结果函数
            addTag(targetName,_id);

        }

        $tagMenu.slideUp();
        okCallback(_ids);
    });

    // 点击重置按钮时
    $reset.unbind('click').click(function () {
        $tag.removeClass(selectedClass);
    });
};

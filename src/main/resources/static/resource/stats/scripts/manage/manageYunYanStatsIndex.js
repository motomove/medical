/**
 * Created by whaty on 2017/11/3.
 */
$(function () {

    getData(1);

});
function getData(index) {


    if (index == '1') {
        //是否加载空页面
        isNullPage(index);

        $("#content_frame").attr("src","manage_active.html");

    } else if (index == '2') {
        //是否加载空页面
        isNullPage(index);

        $("#content_frame").attr("src","manage_course_learn_info.html");

    } else if (index == '3') {
        //是否加载空页面
        isNullPage(index);

        $("#content_frame").attr("src","manage_test_info.html");
    } else if (index == '5') {
        //是否加载空页面
        isNullPage(index);

        $("#content_frame").attr("src","manage_course_info.html");
    }
}

function isNullPage(index){
    $("[id^='anTab-con-']").hide();
    $("#anTab-con-1").show();

}



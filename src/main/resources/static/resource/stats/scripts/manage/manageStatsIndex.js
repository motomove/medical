$(function () {

    getData('manage_board_info');

});
function getData(index) {

    if (index == 'manage_active') {

        $("#content_frame").attr("src","manage_active.html");

    } else if (index == 'manage_course_learn_info') {

        $("#content_frame").attr("src","manage_course_learn_info.html");

    } else if (index == 'manage_test_info') {

        $("#content_frame").attr("src","manage_test_info.html");
    } else if (index == 'manage_course_info') {

        $("#content_frame").attr("src","manage_course_info.html");
    } else if(index == 'manage_homework_info'){

        $("#content_frame").attr("src","manage_homework_info.html");
    } else if (index == 'manage_forum_info') {

        $("#content_frame").attr("src","manage_forum_info.html");
    } else if (index == 'manage_text_info') {

        $("#content_frame").attr("src","manage_text_info.html");
    }else if (index == 'manage_video_info') {

        $("#content_frame").attr("src","manage_video_info.html");
    }else if (index == 'manage_courseware_info') {

        $("#content_frame").attr("src","manage_courseware_info.html");
    }else if (index == 'manage_loginMode') {

        $("#content_frame").attr("src","manage_login_mode_info.html");
    }else if (index == 'manage_resource_info') {

        $("#content_frame").attr("src","manage_resource_info.html");
    }else if (index == 'manage_healthy_info') {

        $("#content_frame").attr("src","manage_healthy_info.html");
    }else if (index == 'manage_score_info') {

        $("#content_frame").attr("src","manage_score_info.html");
    }else if (index == 'manage_template_info') {

        $("#content_frame").attr("src","manage_template_info.html");
    }else if (index == 'manage_resource_all_info') {

        $("#content_frame").attr("src","manage_resource_all_info.html");
    }else if (index == 'manage_note_info') {

        $("#content_frame").attr("src","manage_note_info.html");
    }else if (index == 'manage_question_info') {

        $("#content_frame").attr("src","manage_answer_info.html");
    }else if (index == 'manage_online_info') {

        $("#content_frame").attr("src","manage_online_info.html");
    }else if (index == 'manage_board_info') {

        $("#content_frame").attr("src","manage_board_info.html");
    }else if (index == 'manage_teacher_teach_info') {

        $("#content_frame").attr("src","manage_teacher_teach_info.html");
    }else if (index == 'manage_trajectory_info') {

        $("#content_frame").attr("src","manage_trajectory_info.html");
    }else if (index == 'manage_teacher_TeachingTime_info') {

        $("#content_frame").attr("src","manage_teacher_TeachingTime_info.html");
    }
    else if (index == 'manage_doc_info') {

        $("#content_frame").attr("src","manage_doc_info.html");
    }
}



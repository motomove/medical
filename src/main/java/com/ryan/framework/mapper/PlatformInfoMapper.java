package com.ryan.framework.mapper;

import org.apache.ibatis.annotations.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 平台概况
 *
 * @author RyanYin
 */
@Mapper
public interface PlatformInfoMapper {

    /**
     * 招生分析-招生人数分布(周或者月)
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select id,DATE_FORMAT(recruit_date,'%Y-%m-%d') recruitDate,signup_student_number,recruit_student_number,check_student_number ",
            " from xl_data_recruit_info where recruit_date <=#{endDate} and recruit_date >= #{statrDate} ORDER BY recruit_date"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryRecruitInfoDayList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 招生分析-招生人数分布(年)
     * @param year
     * @return
     */
    @Select({"select DATE_FORMAT(recruit_date,'%m') recruitDate, sum(signup_student_number) signup_student_number," +
            " sum(recruit_student_number) recruit_student_number,sum(check_student_number) check_student_number ",
            "  from xl_data_recruit_info where recruit_date <=CONCAT(#{year},'-12-31') and recruit_date >= CONCAT(#{year},'-01-01') " +
                    " GROUP BY DATE_FORMAT(recruit_date,'%m') ORDER BY DATE_FORMAT(recruit_date,'%m')"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryRecruitInfoYearList(@Param("year") String year);

    /**
     * 招生分析-学习中心招生实时统计
     * @return
     */
    @Select("select city_name,SUM(check_student_number) checkStudentNumber,coordinate " +
            " from xl_data_recruit_site_info GROUP BY city_name ORDER BY checkStudentNumber ")
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySiteRecruitRealStatisticsList();

    /**
     * 招生分析-历年数据查询
     * @param bantchName
     * @return
     */
    @Select({"select bantch_name,zijian_student_number,aopeng_student_number,hongcheng_student_number, " +
            " zhijin_student_number,online_exam_number,exempt_exam_number,offline_exam_number   ",
            "  from xl_data_recruit_bantch_info where bantch_name = #{bantchName} "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryPreviousYearsRecruitInfoList(@Param("bantchName") String bantchName);

    /**
     *  招生分析-学习中心统计
     * @param bantchName
     * @return
     */
    @Select({"select site_name,signup_student_number,recruit_student_number,check_student_number ",
            " from xl_data_recruit_site_info where bantch_name = #{bantchName} ORDER BY check_student_number desc"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySiteRecruitStatisticsList(@Param("bantchName") String bantchName);

    /**
     *  招生分析-专业统计
     * @param bantchName
     * @return
     */
    @Select({"select major_name,signup_student_number,recruit_student_number,check_student_number ",
            " from xl_data_recruit_major_info where bantch_name = #{bantchName}  ORDER BY check_student_number desc"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryMajorRecruitStatisticsList(@Param("bantchName") String bantchName);


    /**
     * 招生分析-总体数据分析
     * @return
     */
    @Select("select bantch_name,signup_student_number,recruit_student_number,check_student_number " +
            " from xl_data_recruit_bantch_info ORDER BY bantch_name desc ")
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTotalBantchInfoList();

    /**
     * 查询每日学习时长
     * @return
     */
    @Select("select id,DATE_FORMAT(learn_date,'%m.%d') learnDate,learn_time from xl_data_learn_day where datediff(now(),learn_date) <= 7 order by learn_date")
    @ResultType(HashMap.class)
    List<Map<String, Object>> learnTimeDay();

    /**
     * 查询今日在线学习时长
     * @return
     */
    @Select("select id,DATE_FORMAT(online_date,'%m-%d %H:%i') onlineDate,online_number from xl_data_online_number")
    @ResultType(HashMap.class)
    List<Map<String, Object>> onlineNumbers();

    /**
     * 活跃人数地域分布
     * @return
     */
    @Select("select id,activity_site,activity_province,total_student_number, " +
            " activity_number, cast((activity_number/total_student_number*100) as decimal(10,1)) rate " +
            " from xl_data_activity_distribution order by activity_province,activity_number desc")
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryActivityDistributionList();

    /**
     * 学习中心新生人数分布
     * @return
     */
    @Select("select id,activity_site,new_student_number from xl_data_activity_distribution " +
            " order by new_student_number desc ")
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryquerySiteNewStudentDistributionList();

    /**
     * 新生专业分布
     * @return
     */
    @Select("select id,major_name,student_number, accounting" +
            " from xl_data_student_major order by student_number desc LIMIT  5")
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryStudentMajorNumberList();


    /**
     * 课程年度更新率
     * @param year
     * @return
     */
    @Select({"select id,course_type,update_number,total_number,update_rate rate,year " ,
            " from xl_data_course_year_update_rate where year=#{year}"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryCourseYearUpdateRateList(@Param("year") String year);


    /**
     * 基础分析-首页学习时长(周或者月)
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select id,DATE_FORMAT(learn_date,'%Y-%m-%d') learnDate,learn_time , student_number ",
            " from xl_data_learn_day where learn_date <=#{endDate} and learn_date >= #{statrDate} ORDER BY learn_date"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTotalLearnDayList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 基础分析-首页学习时长(年)
     * @param year
     * @return
     */
    @Select({"select DATE_FORMAT(learn_date,'%m') learnDate, sum(learn_time) learn_time , max(student_number) student_number, learn_date ",
            "  from xl_data_learn_day where learn_date <=CONCAT(#{year},'-12-31') and learn_date >= CONCAT(#{year},'-01-01') " +
            " GROUP BY DATE_FORMAT(learn_date,'%m') ORDER BY DATE_FORMAT(learn_date,'%m')"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTotalLearnYearList(@Param("year") String year);


    /**
     * 基础分析-人均学习时长(周或者月)
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select id,DATE_FORMAT(learn_date,'%Y-%m-%d') learnDate,ROUND(learn_time/student_number) learn_time ",
            " from xl_data_learn_day where learn_date <=#{endDate} and learn_date >= #{statrDate} ORDER BY learn_date"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryAverageLearnDayList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 基础分析-人均学习时长(年)
     * @param year
     * @return
     */
    @Select({"select DATE_FORMAT(learn_date,'%m') learnDate,  ROUND(sum(learn_time)/sum(student_number)) learn_time ",
            "  from xl_data_learn_day where learn_date <=CONCAT(#{year},'-12-31') and learn_date >= CONCAT(#{year},'-01-01') " +
                    " GROUP BY DATE_FORMAT(learn_date,'%m') ORDER BY DATE_FORMAT(learn_date,'%m')"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryAverageLearnYearList(@Param("year") String year);

    /**
     * 基础分析-学生学习时间分布(周或者月)
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select DATE_FORMAT(learn_date,'%Y-%m-%d') learn_date,distributed_type,student_number  ",
            " from xl_data_leran_time_distributed where learn_date <=#{endDate} and learn_date >= #{statrDate} ORDER BY learn_date"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryLeranTimeDistributedList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 基础分析-学生学习时间分布(年)
     * @param year
     * @return
     */
    @Select({"select DATE_FORMAT(learn_date,'%m') learn_date,distributed_type,sum(student_number) student_number ",
            "  from xl_data_leran_time_distributed where learn_date <=CONCAT(#{year},'-12-31') and learn_date >= CONCAT(#{year},'-01-01') " +
                    " GROUP BY DATE_FORMAT(learn_date,'%m'),distributed_type ORDER BY DATE_FORMAT(learn_date,'%m')"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryLeranTimeDistributedYearList(@Param("year") String year);

    /**
     * 基础分析-学生学习时间段分布
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select SUM(1a) 1a,SUM(2a) 2a,SUM(3a) 3a,SUM(4a) 4a,SUM(5a) 5a,SUM(6a) 6a,SUM(7a) 7a,SUM(8a) 8a,SUM(9a) 9a,SUM(10a) 10a,SUM(11a) 11a,SUM(12a) 12a," +
            "SUM(1p) 1p,SUM(2p) 2p,SUM(3p) 3p,SUM(4p) 4p,SUM(5p) 5p,SUM(6p) 6p,SUM(7p) 7p,SUM(8p) 8p,SUM(9p) 9p,SUM(10p) 10p,SUM(11p) 11p,SUM(12p) 12p  ",
            " from xl_data_period_distributed where learn_date <=#{endDate} and learn_date >= #{statrDate} "})
    @ResultType(HashMap.class)
    Map<String, Object> queryPeriodDistributedMap(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 基础分析-课程学习总用时
     * @param semesterName
     * @return
     */
    @Select({"select learn_semester,course_name,learn_time  ",
            "  from xl_data_course_learn_time where learn_semester = #{semesterName} order by learn_time desc "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryCourseLearnTimeList(@Param("semesterName") String semesterName);

    /**
     * 基础分析-学习中心总学习时长
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select sie_name, SUM(learn_time) learn_time ",
            " from xl_data_site_learn_time where learn_date <=#{endDate} and learn_date >= #{statrDate} " +
            " GROUP BY sie_name ORDER BY learn_time desc"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySiteTotalLearnTimeList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 基础分析-学习中心平均学习时长
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select sie_name, cast((sum(learn_time)/sum(total_number)) as decimal(10,1)) learn_time ",
            " from xl_data_site_learn_time where learn_date <= #{endDate} and learn_date >= #{statrDate} ",
            " group by sie_name order by learn_time desc"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySiteAverageLearnTimeList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 基础分析-学习中心上线率
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select sie_name, cast(avg(total_number) as decimal(10)) total_number,  ",
            " cast(avg(online_number) as decimal(10)) online_number, ",
            " cast((avg(online_number)/avg(total_number)*100) as decimal(10, 1)) rate ",
            " from xl_data_site_learn_time where learn_date <= #{endDate} and learn_date >= #{statrDate} ",
            " group by sie_name order by rate"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySiteOnlineRateList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 基础分析-学习详细数据表格
     * @param statrDate
     * @param endDate
     * @param curPage
     * @return
     */
    @Select({"select sie_name, cast(avg(total_number) as decimal(10)) total_number,",
            " cast(avg(online_number) as decimal(10)) online_number,",
            " cast((avg(online_number)/avg(total_number) * 100) as decimal(10,1)) rate,",
            " sum(learn_time) learn_time,",
            " cast((sum(learn_time)/sum(online_number)) as decimal(10,1)) onlinerate,",
            " cast((sum(learn_time)/sum(total_number)) as decimal(10,1)) totalrate",
            " from xl_data_site_learn_time where learn_date <= #{endDate} and learn_date >= #{statrDate} ",
            " group by sie_name order by learn_time desc limit #{curPage},10"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySiteDateTableList(@Param("statrDate") String statrDate,@Param("endDate") String endDate,@Param("curPage") int curPage);

    /**
     * 基础分析-学习详细数据表格总数
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select count(1) totalNumber from (select id ",
            " from xl_data_site_learn_time where learn_date <= #{endDate} and learn_date >= #{statrDate} ",
            " group by sie_name) a "})
    @ResultType(Integer.class)
    Integer querySiteDateTableTotalNumber(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 学习成绩- 课程成绩分析
     * @param semesterName
     * @param curPage
     * @return
     */
    @Select({"select semester_name,course_name,average_score, " +
            " score_segment_02,score_segment_24,score_segment_46,score_segment_68,score_segment_810 ",
            "  from xl_data_socre_analysis where semester_name = #{semesterName} order by average_score desc LIMIT #{curPage},10"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySocreAnalysisList(@Param("semesterName") String semesterName,@Param("curPage") int curPage);

    /**
     * 学习成绩- 课程成绩分析总数
     * @param semesterName
     * @return
     */
    @Select({"select  count(1) totalNumber ",
            "  from xl_data_socre_analysis where semester_name = #{semesterName} "})
    @ResultType(Integer.class)
    Integer querySocreAnalysisTotalNumber(@Param("semesterName") String semesterName);

    /**
     * 学习成绩- 学习中心平均成绩
     * @param semesterName
     * @param curPage
     * @return
     */
    @Select({"select site_name,passing_rate,excellent_rate,average_score ",
            "  from xl_data_site_socre_analysis where semester_name = #{semesterName} order by average_score desc LIMIT #{curPage},10"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySiteSocreAnalysisList(@Param("semesterName") String semesterName,@Param("curPage") int curPage);

    /**
     * 学习成绩- 学习中心平均成绩总数
     * @param semesterName
     * @return
     */
    @Select({"select  count(1) totalNumber ",
            "  from xl_data_site_socre_analysis where semester_name = #{semesterName}"})
    @ResultType(Integer.class)
    Integer querySiteSocreAnalysisTotalNumber(@Param("semesterName") String semesterName);

    /**
     * 学习成绩- 专业平均成绩
     * @param semesterName
     * @param curPage
     * @return
     */
    @Select({"select major_name,passing_rate,excellent_rate,average_score ",
            " from xl_data_major_socre_analysis where semester_name = #{semesterName} order by average_score desc LIMIT #{curPage},10"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryMajorSocreAnalysisList(@Param("semesterName") String semesterName,@Param("curPage") int curPage);

    /**
     * 学习成绩- 专业平均成绩总数
     * @param semesterName
     * @return
     */
    @Select({"select  count(1) totalNumber ",
            "  from xl_data_major_socre_analysis where semester_name = #{semesterName}"})
    @ResultType(Integer.class)
    Integer queryMajorSocreAnalysisTotalNumber(@Param("semesterName") String semesterName);

    /**
     * 学习成绩- 平均成绩趋势
     * @param siteName
     * @param majorName
     * @param eduName
     * @return
     */
    @Select({"<script>",
            "select grade_name,cast((sum(total_score)/sum(student_number)) as decimal(10,1)) averageScore ",
            " from  xl_data_total_socre_analysis where 1 = 1 ",
            "<if test='null != siteName and \"\" != siteName'> and site_name = #{siteName} </if>",
            "<if test='null != majorName and \"\" != siteName'> and major_name = #{majorName} </if>",
            "<if test='null != eduName and \"\" != siteName'> and edu_name = #{eduName} </if>",
            " group by grade_name",
            "</script>"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTotalSocreAnalysisList(@Param("siteName") String siteName, @Param("majorName") String majorName,
                                                          @Param("eduName") String eduName);

    /**
     * 教师授课分析-总教学时长(周或者月)
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select DATE_FORMAT(teaching_date,'%Y-%m-%d') teaching_date,teaching_time  ",
            "  from xl_data_teacher_teaching_hours where teaching_date <=#{endDate} and teaching_date >= #{statrDate} ORDER BY teaching_date"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTeacherTeachingHoursDayList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 教师授课分析-总教学时长(年)
     * @param year
     * @return
     */
    @Select({"select DATE_FORMAT(teaching_date,'%m') teaching_date,sum(teaching_time) teaching_time ",
            "  from xl_data_teacher_teaching_hours where teaching_date <=CONCAT(#{year},'-12-31') and teaching_date >= CONCAT(#{year},'-01-01')  " +
                    " GROUP BY DATE_FORMAT(teaching_date,'%m') ORDER BY teaching_date "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTeacherTeachingHoursYearList(@Param("year") String year);

    /**
     * 教师授课分析-平均教学时长(周或者月)
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select DATE_FORMAT(teaching_date,'%Y-%m-%d') teaching_date,cast((teaching_time/teacher_number) as decimal(10,1)) teaching_time  ",
            "  from xl_data_teacher_teaching_hours where teaching_date <=#{endDate} and teaching_date >= #{statrDate} ORDER BY teaching_date"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTeacherAverageTeachingHoursDayList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 教师授课分析--平均教学时长(年)
     * @param year
     * @return
     */
    @Select({"select DATE_FORMAT(teaching_date,'%m') teaching_date,cast((sum(teaching_time)/sum(teacher_number)) as decimal(10,1))  teaching_time ",
            "  from xl_data_teacher_teaching_hours where teaching_date <=CONCAT(#{year},'-12-31') and teaching_date >= CONCAT(#{year},'-01-01')  " +
                    " GROUP BY DATE_FORMAT(teaching_date,'%m') ORDER BY teaching_date "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTeacherAverageTeachingHoursYearYearList(@Param("year") String year);

    /**
     * 教师授课分析- 教师详细数据成绩
     * @param semesterName
     * @condition condition
     * @param curPage
     * @return
     */
    @Select({"select semester_name,login_id,teacher_name,course_name,course_code,participation_integral,",
            " job_correction,post_reply,set_essence,set_lrrigation,set_top,notes_recommended,answer_reply, ",
            " answer_recommended,teaching_time  ",
            " from xl_data_teacher_detailed_data where " ,
            " semester_name = #{semesterName}  ${condition} ",
            " ${sort_order} limit #{curPage},10"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTeacherDetailedDataList(@Param("semesterName") String semesterName,
                                                           @Param("condition") String condition,
                                                           @Param("curPage") int curPage,
                                                           @Param("sort_order") String sort_order);

    /**
     * 教师授课分析- 教师详细数据总数
     * @param semesterName
     * @condition condition
     * @return
     */
    @Select({"select  count(1) totalNumber ",
            " from xl_data_teacher_detailed_data where " +
            " semester_name = #{semesterName}  ${condition} "})
    @ResultType(Integer.class)
    Integer queryTeacherDetailedDataTotalNumber(@Param("semesterName") String semesterName,@Param("condition") String condition);

    /**
     * 在籍学生分析-年级分析
     * @return
     */
    /*@Select({"select grade_name, learningNumber from (",
             "select grade_name,SUM(learning_number) learningNumber ",
            " from xl_data_student_status_detailed ",
            " group by grade_name order by grade_name desc ) t",
            " where t.learningNumber >= 100 "})*/
    @Select({"select grade_name,SUM(learning_number) learningNumber ",
            " from xl_data_student_status_detailed ",
            " group by grade_name order by grade_name desc "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryGradeLearningStudentList();

    /**
     *  在籍学生分析-学籍分析
     * @param gradeName
     * @return
     */
    @Select({"select grade_name, full_number, status_name  ",
            "  from xl_data_student_status  where grade_name = #{gradeName}  "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryGradeStatusStudentList(@Param("gradeName") String gradeName);

    /**
     * 在籍学生分析-教学点分析
     * @return
     */
    @Select("select site_name,sum(learning_number) learningNumber " +
            " from xl_data_student_status_detailed group by site_name order by learningNumber desc")
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySiteLearningStudentList();

    /**
     * 在籍学生分析-专业分析
     * @return
     */
    @Select("select major_name, sum(learning_number) learningNumber " +
            " from xl_data_student_status_detailed group by major_name order by learningNumber desc")
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryMajorLearningStudentList();


    /**
     * 在籍学生分析-层次分析
     * @return
     */
    @Select("select edu_name,SUM(learning_number) learningNumber " +
            " from xl_data_student_status_detailed GROUP BY edu_name ORDER BY edu_name")
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryEduLearningStudentStudentList();

    /**
     * 在籍学生分析-性别分析
     * @return
     */
    @Select({"select man_number,woman_number,cast((man_number/total_number*100) as decimal(10,1)) manRate, ",
            " cast((woman_number/total_number*100) as decimal(10,1)) womanRate  ",
            " from xl_data_gender_distributed "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryGenderLearningStudentList();


    /**
     * 查询平台平台概况
     * @return
     */
    @Select("select id, student_num, teacher_num, course_num, student_online_time, " +
            "teacher_online_time, student_cur_week_time, student_pre_week_time, " +
            "teacher_cur_week_time, teacher_pre_week_time, major_degree_num, major_training_num, " +
            "site_num from xl_data_platform_info limit 1")
    @ResultType(HashMap.class)
    Map<String, Object> queryInfo();

    /**
     * 在籍学生分析- 学籍详细数据
     * @param xs
     * @condition condition
     * @param curPage
     * @return
     */
    @Select({"select ${xs},SUM(admission_number) admissionNumber,SUM(learning_number) learningNumber,SUM(graduation_number) graduationNumber" ,
            "  from xl_data_student_status_detailed where 1=1 ${condition} order by admissionNumber desc LIMIT #{curPage},10"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTotalStudentDetailedList(@Param("xs") String xs,@Param("condition") String condition,@Param("curPage") int curPage);

    /**
     * 在籍学生分析- 学籍详细数据总数
     * @param xs
     * @condition condition
     * @return
     */
    @Select({"select  count(1) totalNumber ",
            " from (select ${xs},SUM(graduation_number) graduationNumber " +
                    " from xl_data_student_status_detailed where 1=1 ${condition}) a "})
    @ResultType(Integer.class)
    Integer queryTotalStudentDetailedTotalNumber(@Param("xs") String xs,@Param("condition") String condition);

    /**
     * 查询某年综合指数
     * @param year
     * @return
     */
    @Select({"select id, year, acceptance_rate, line_rate, course_pass_rate, graduation_rate, bachelor_rate",
            " from xl_data_composite_index where year = #{year}"})
    @ResultType(HashMap.class)
    Map<String, Object> queryComposite(@Param("year") String year);

    /**
     * 查询活动学期
     * @return
     */
    @Select({"select id, name from xl_data_semester where flag_active = 1"})
    @ResultType(HashMap.class)
    Map<String, Object> queryActiveSemester();

    /**
     * 查询最新10条指数数据
     * @return
     */
    @Select({"select id, year, acceptance_rate, line_rate, course_pass_rate, graduation_rate, bachelor_rate",
            " from xl_data_composite_index  order by year desc limit 10"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryCompositeList();

    /**
     * 保存更新平台概况
     */
    @Update({"update xl_data_platform_info set student_num = #{student}, teacher_num = #{teacher} ",
             ", course_num = #{course}, major_degree_num = #{degree}, major_training_num = #{training}",
             ", site_num = #{site}, student_online_time = #{stuTime}, teacher_online_time = #{teaTime} where id = 1 "})
    void saveInfo(@Param("student") int student, @Param("teacher") int teacher, @Param("course") int course,
                  @Param("degree") int degree, @Param("training") int training, @Param("site") int site,
                  @Param("stuTime") long stuTime, @Param("teaTime") long teaTime);


    @Insert({" insert into xl_data_composite_index(year, acceptance_rate, line_rate, course_pass_rate, graduation_rate, bachelor_rate)",
             " values(#{year}, #{acceptanceRate}, #{lineRate}, #{cPassRate}, #{gRate}, #{bRate}) ",
             " on duplicate key update acceptance_rate = #{acceptanceRate}, line_rate = #{lineRate}, ",
             " course_pass_rate =  #{cPassRate}, graduation_rate = #{gRate}, bachelor_rate = #{bRate}"})
    void saveComposite(@Param("year") String year, @Param("acceptanceRate") int acceptanceRate, @Param("lineRate") int lineRate,
                       @Param("cPassRate") int cPassRate, @Param("gRate") int gRate, @Param("bRate") int bRate);
}

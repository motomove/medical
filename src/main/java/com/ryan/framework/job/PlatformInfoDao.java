package com.ryan.framework.job;

import org.apache.ibatis.annotations.*;

/**
 * 统计平台概况的任务
 */
@Mapper
public interface PlatformInfoDao {

    /**
     * 统计在籍学生人数
     * @return
     */
    @Select("select count(*) from pe_student stu, enum_const status  where stu.flag_student_status = status.id and status.code = '4'")
    @ResultType(Integer.class)
    int queryStudentNum();

    /**
     * 统计教师人数
     * @return
     */
    @Select("select count(*) from pe_teacher t, enum_const e where t.flag_active = e.id and e.code = '1'")
    @ResultType(Integer.class)
    int queryTeacherNum();

    /**
     * 统计课程数
     * @return
     */
    @Select("select count(*) from pe_tch_course c, enum_const e where c.flag_isvalid = e.id and e.code = '1'")
    @ResultType(Integer.class)
    int queryCourseNum();

    /**
     * 统计专业数
     * @return
     */
    @Select("select sum(t.num)  from (select count(*) num, eduName from ( " +
            "         select count(1) , edu.name eduName, m.name " +
            "         from pe_student stu, enum_const status, pe_edutype edu, pe_major m " +
            "         where stu.flag_student_status = status.id and stu.fk_edutype_id = edu.id " +
            "         and stu.fk_major_id = m.id and status.code = '4' and edu.type = #{type} " +
            "         group by stu.fk_edutype_id , edu.name, m.id,  m.name ) group by eduName) t")
    @ResultType(Integer.class)
    int queryMajorNum(@Param("type") String type);

    /**
     * 统计学习中心数
     * @return
     */
    @Select("select count(*) from pe_site")
    @ResultType(Integer.class)
    int querySiteNum();

    /**
     * 统计学生学习时长
     * @return
     */
    @Select("select sum(lear_time) from pr_tch_stu_elective")
    @ResultType(Long.class)
    long queryStuLearnTime();

    /**
     * 统计教师授课时长
     * @return
     */
    int queryTeaTeachTime();

    /**
     * 统计课程通过的学生数
     * @return
     */
    int queryCoursePassNum();

    /**
     * 统计获取学位的学生数
     * @return
     */
    int queryDegreeNum();

    /**
     * 统计毕业的学生数
     * @return
     */
    int queryGraduationNum();

    /**
     * 统计登录过的学生
     * @return
     */
    int queryLoginNum();

}

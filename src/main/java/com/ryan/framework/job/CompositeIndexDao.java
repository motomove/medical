package com.ryan.framework.job;

import org.apache.ibatis.annotations.*;

/**
 * 综合指数基础数据
 *
 * @author RyanYin
 */
@Mapper
public interface CompositeIndexDao {

    /**
     * 获取某年未取学生数
     * @param year
     * @return
     */
    @Select({"select count(*) from pe_student stu, pe_recruitplan rec ",
             "where stu.fk_recruitplan_id = rec.id and aca_year = #{year} and stu.flag_student_status is null "})
    @ResultType(Integer.class)
    int queryUnaccepted(@Param("year") String year);

    /**
     * 获取某年招生数
     * @return
     */
    @Select({"select count(*) from pe_student stu, pe_recruitplan rec ",
            " where stu.fk_recruitplan_id = rec.id and rec.aca_year =  #{year} "})
    @ResultType(Integer.class)
    int queryTotalNum(@Param("year") String year);

    /**
     * 获取某年学生的上线人数
     * @param year
     * @return
     */
    @Select({"select count(*) from sso_user su,  pe_student stu ",
             "where stu.fk_sso_user_id = su.id and to_char(su.last_login_date, 'yyyy') = #{year}"})
    @ResultType(Integer.class)
    int queryLineNum(@Param("year") String year);

    /**
     * 获取某年选课通过的（>=60）的人数
     * @param year
     * @return
     */
    @Select("select count(*) from pr_stu_elective where to_char(elective_date, 'yyyy') = #{year} and score_total >= 60")
    @ResultType(Integer.class)
    int queryCoursePassNum(@Param("year") String year);

    /**
     * 获取某年选课数
     * @param year
     * @return
     */
    @Select("select count(*) from pr_stu_elective where to_char(elective_date, 'yyyy') = #{year}")
    @ResultType(Integer.class)
    int queryElectiveNum(@Param("year") String year);

    /**
     * 获取某年毕业的人数
     * @param year
     * @return
     */
    @Select("select count(*) from pe_student t where  to_char(t.graduation_date, 'yyyy') = #{year} ")
    @ResultType(Integer.class)
    int queryGraduation(@Param("year") String year);

    /**
     * 获取某年的所有学生数
     * @param year
     * @return
     */
    @Select({"select count(*) from pe_student stu, pe_grade grade",
            " where stu.fk_grade_id = grade.id and grade.serial_number = ( ",
            " select max(g.serial_number) from pe_student t, pe_grade g ",
            " where t.fk_grade_id = g.id and to_char(t.graduation_date, 'yyyy') = #{year})"})
    @ResultType(Integer.class)
    int queryAllStudent(@Param("year") String year);

    /**
     * 获取某年获得学位的学生数
     * @param year
     * @return
     */
    @Select({"select count(*) from system_apply sa, pe_student stu, enum_const ec, enum_const apply_status",
            " where sa.fk_student_id = stu.id and sa.apply_type = ec.id and sa.flag_apply_status = apply_status.id ",
            "  and ec.code = '9' and apply_status.code = '1' and to_char(sa.apply_date, 'yyyy') = #{year}"})
    @ResultType(Integer.class)
    int queryBachelor(@Param("year") String year);

    /**
     * 获取某年申请学位的学生数
     * @param year
     * @return
     */
    @Select({"select count(*) from ( ",
            " select count(*) from system_apply sa, pe_student stu, enum_const ec ",
            " where sa.fk_student_id = stu.id and sa.apply_type = ec.id ",
            " and ec.code = '9' and to_char(sa.apply_date, 'yyyy') = #{year} group by stu.id )"})
    @ResultType(Integer.class)
    int queryBachelorApply(@Param("year") String year);
}

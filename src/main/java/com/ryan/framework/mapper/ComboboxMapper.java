package com.ryan.framework.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Select;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 下拉数据管理
 *
 * @author RyanYin
 */
@Mapper
public interface ComboboxMapper {

    /**
     * 查询年级
     * @return
     */
    @Select({"select id, name from xl_data_grade order by name desc"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryGrade();

    /**
     * 查询学习中心
     * @return
     */
    @Select({"select id, name from xl_data_site"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySite();

    /**
     * 查询专业
     * @return
     */
    @Select({"select id, name from xl_data_major"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryMajor();

    /**
     * 查询层次
     * @return
     */
    @Select({"select id, name from xl_data_edu "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryEdu();

    /**
     * 查询学期
     * @return
     */
    @Select({"select id, name, flag_active from xl_data_semester order by name desc"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> querySemester();



    /**
     * 招生分析-批次信息查询
     * @return
     */
    @Select("select id, bantch_name name from xl_data_recruit_bantch_info ORDER BY bantch_name desc ")
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryRecruitBantchInfoList();
}

package com.ryan.framework.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.ResultType;
import org.apache.ibatis.annotations.Select;

import java.util.HashMap;
import java.util.Map;

@Mapper
public interface SsoUserMapper {

    @Select({"select id, login_id, password from xl_data_manager where login_id = #{loginId} "})
    @ResultType(HashMap.class)
    Map<String, Object> queryUser(@Param("loginId") String loginId);

    @Select({"select id, name from xl_data_manager where login_id = #{loginId} "})
    @ResultType(HashMap.class)
    Map<String, Object> queryNickName(@Param("loginId") String loginId);

    /*int deleteByPrimaryKey(String id);

    int insert(SsoUser record);

    SsoUser selectByPrimaryKey(String id);

    List<SsoUser> selectAll();

    int updateByPrimaryKey(SsoUser record);

    *//**
     * 根据loginId或phone或email查询用户
     *
     * @param account loginId or phone or email
     * @return
     *//*
    SsoUser getByLoginIdOrPhoneOrEmail(@Param("account") String account);*/
}
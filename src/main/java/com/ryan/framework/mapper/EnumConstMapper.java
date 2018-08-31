package com.ryan.framework.mapper;

import com.ryan.framework.domain.EnumConst;

import java.util.List;

public interface EnumConstMapper {
    int deleteByPrimaryKey(String id);

    int insert(EnumConst record);

    EnumConst selectByPrimaryKey(String id);

    List<EnumConst> selectAll();

    int updateByPrimaryKey(EnumConst record);
}
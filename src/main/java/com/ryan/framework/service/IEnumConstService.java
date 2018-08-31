package com.ryan.framework.service;

import com.ryan.framework.domain.EnumConst;

import java.util.List;

/**
 * 常量操作服务类
 * @author: RyanYin
 * @create: 2017/11/14 17:36
 */
public interface IEnumConstService {

    /**
     * 使用命名空间和code获取常量
     * @param namespace
     * @param code
     * @return
     */
    EnumConst getByNamespaceAndCode(String namespace, String code);

    /**
     * 使用命名空间获得常量集合
     * @param namespace
     * @return
     */
    List<EnumConst> getByNamespace(String namespace);

}

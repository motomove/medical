package com.ryan.framework.service;

import com.ryan.framework.service.expection.ServiceException;

import java.util.List;
import java.util.Map;

/**
 * 下拉数据管理
 *
 * @author RyanYin
 */
public interface ComboboxService {

    /**
     * 查询下拉数据
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryCombobox(String type) throws ServiceException;


}

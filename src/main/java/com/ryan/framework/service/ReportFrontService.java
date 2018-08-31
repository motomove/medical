package com.ryan.framework.service;

import com.ryan.framework.service.expection.ServiceException;

import java.util.Map;

/**
 * 报告展示管理
 *
 * @author RyanYin
 */
public interface ReportFrontService {

    /**
     * 查询报告内容
     * @param id
     * @return
     * @throws ServiceException
     */
    Map<String, Object> query(String id) throws ServiceException;

}

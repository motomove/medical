package com.ryan.framework.service;

import com.ryan.framework.service.expection.ServiceException;

import java.util.List;
import java.util.Map;

/**
 * 平台概况
 *
 * @author 郭少飞
 */
public interface ReportInfoService {

    /**
     * 查询管理员用户信息
     *
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryGetManager() throws ServiceException;

    /**
     * 报表—运营数据查询总数(周或者月)
     *
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryOperationsInfoDay(String statrDate, String endDate) throws ServiceException;

    /**
     * 报表—运营数据查询总数(年)
     *
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryOperationsInfoYear(String year) throws ServiceException;

    /**
     * 报表—运营数据查询最大值和日期
     *
     * @return
     * @throws ServiceException
     */
    Map<String, Object> queryOperationsInfoMax(String startDate, String endDate) throws ServiceException;

    /**
     * 报表—服务数据查询
     *
     * @return
     * @throws ServiceException
     */
    Map<String, Object> queryServiceInfoDay(String statrDate, String endDate) throws ServiceException;

    /**
     * 查询对应类型的模板信息
     *
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryGetTemplateInfo(String templateType) throws ServiceException;

    /**
     * 查询对应类型的报表配置是否存在
     *
     * @return
     * @throws ServiceException
     */
    String queryReportType(String reportType) throws ServiceException;

    /**
     * 保存报告设置的信息
     *
     * @return
     * @throws ServiceException
     */
    String saveReportSettingInfo(String reportDataType, String reportType, String receiveType, String sendType,
                                 String startDate, String endDate, String receivePeople, String managerIds, String templateId) throws ServiceException;

    /**
     * 查询对应的配置信息
     *
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryGetReportSettingInfo(String reportSetType) throws ServiceException;

    /**
     * 查询报表列表
     *
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryReportListInfo(String condition, int curPage) throws ServiceException;

    /**
     * 查询报表列表总数
     *
     * @return
     * @throws ServiceException
     */
    Integer queryReportListInfoTotal(String condition) throws ServiceException;

    /**
     * 定时发布数据报告()
     * dataType 报告数据类型 0:周报、1：月报、2：年报
     * reportType 报告类型 0:运营、1：招生、2：财务
     *
     * @param url
     * @return void
     * @throws ServiceException
     */
    void sendReortInformation(String dataType, String reportType, String url) throws ServiceException;
}

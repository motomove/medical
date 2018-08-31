package com.ryan.framework.service;

/**
 * 定时任务管理
 */
public interface TaskManageService {

    /**
     * 保存平台概况信息
     */
    void savePlatformInfo();

    /**
     * 保存平台综合指数基础数据
     */
    void saveComposite();

    /**
     * 发送报告
     *
     * @param dataType   报告数据类型 0:周报、1：月报、2：年报
     * @param reportType 报告类型 0:运营、1：招生、2：财务
     */
    void sendReport(String dataType, String reportType, String url);
}

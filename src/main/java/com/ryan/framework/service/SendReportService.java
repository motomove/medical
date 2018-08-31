package com.ryan.framework.service;

import com.ryan.framework.service.expection.ServiceException;

import java.util.List;

/**
 * 发送报告
 *
 * @author RyanYin
 */
public interface SendReportService {

    /**
     * 微信发送报告
     * @param id
     * @param title
     * @param learnTime
     * @param learnNum
     * @param teaTime
     * @param teaNum
     * @throws ServiceException
     */
    void sendByWechat(String id, String title, double learnTime, int learnNum, double teaTime, int teaNum) throws ServiceException;

    /**
     * 邮件发送报告
     * @param id
     * @param title
     * @param user
     * @param urlPath
     * @throws ServiceException
     */
    void sendByEmail(String id, String title, List<String> user, String urlPath) throws ServiceException;
}

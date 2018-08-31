package com.ryan.framework.web.controller;

import com.github.pagehelper.util.StringUtil;
import com.ryan.framework.util.CommonUtil;
import com.whaty.core.framework.api.domain.ResultDataModel;
import com.whaty.core.framework.api.exception.ApiException;
import com.ryan.framework.service.ReportInfoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/reportSendInfo")
@RestController
public class ReportInfoController {

    @Resource
    ReportInfoService reportInfoService;

    /**
     * 查询管理员用户信息
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/getManager", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel getManager() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = reportInfoService.queryGetManager();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 报表—运营数据查询总数(周或者月)
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/operationsInfoDay", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel operationsInfoDay(String startDate, String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = reportInfoService.queryOperationsInfoDay(startDate, endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 报表—运营数据查询总数(年)
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/operationsInfoYear", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel operationsInfoYear(String year) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = reportInfoService.queryOperationsInfoYear(year);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 报表—运营数据查询最大值和日期
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/operationsInfoMax", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel operationsInfoMax(String startDate, String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        info = reportInfoService.queryOperationsInfoMax(startDate, endDate);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 报表—服务数据查询
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/serviceInfoDay", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel serviceInfoDay(String startDate, String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        info = reportInfoService.queryServiceInfoDay(startDate, endDate);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 查询对应类型的模板信息
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/getTemplateInfo", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel getTemplateInfo(String templateType) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = reportInfoService.queryGetTemplateInfo(templateType);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 保存报告设置的信息
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/saveReportSetting", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel saveReportSetting(String reportDataType, String reportType, String receiveType, String sendType, String startDate,
                                             String endDate, String receivePeople, String templateId, String peopleIds) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        if ("0".equals(sendType)) {
            startDate = null;
            endDate = null;
        }
        String str = reportInfoService.saveReportSettingInfo(reportDataType, reportType, receiveType, sendType,
                startDate, endDate, receivePeople, peopleIds, templateId);
        info.put("msg", str);
//        //System.out.println(info.get("msg"));
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 查询对应的配置信息
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/getReportSettingInfo", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel getReportSettingInfo(String reportSetType) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = reportInfoService.queryGetReportSettingInfo(reportSetType);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 查询报表列表
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/reportListInfo", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel reportListInfo(String reportName, String dataType, String reportType, String curPage) throws ApiException {
        String condition = "";
        if (StringUtil.isNotEmpty(reportName)) {
            condition += " and name like '%" + reportName + "%' ";
        }
        if (StringUtil.isNotEmpty(dataType)) {
            condition += " and send_type = " + dataType;
        }
        if (StringUtil.isNotEmpty(reportType)) {
            condition += " and report_type = " + reportType;
        }

        int cp = Integer.parseInt(StringUtil.isEmpty(curPage) ? "1" : curPage);

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = reportInfoService.queryReportListInfo(condition, cp);
        info.put("list", list);

        //总数
        if (1 == cp) {
            Integer totalNumber = reportInfoService.queryReportListInfoTotal(condition);
            info.put("totalNumber", totalNumber);
        }

        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 定时发布数据报告()
     * dataType 报告数据类型 0:周报、1：月报、2：年报
     * reportType 报告类型 0:运营、1：招生、2：财务
     *
     * @return list
     * @throws ApiException
     */
    @RequestMapping(value = "/sendReortInfo", method = {RequestMethod.GET, RequestMethod.POST})
    public void sendReortInfo(String dataType, String reportType, HttpServletRequest request) throws ApiException {
        String path = CommonUtil.getPath(request);
        reportInfoService.sendReortInformation(dataType, reportType, path);
    }

}

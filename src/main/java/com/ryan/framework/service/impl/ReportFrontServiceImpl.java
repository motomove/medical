package com.ryan.framework.service.impl;

import com.ryan.framework.mapper.PlatformInfoMapper;
import com.ryan.framework.service.ReportFrontService;
import com.ryan.framework.exception.ErrorCode;
import com.ryan.framework.mapper.ReportInfoMapper;
import com.ryan.framework.service.expection.ServiceException;
import com.ryan.framework.util.CommonUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("reportFrontService")
public class ReportFrontServiceImpl implements ReportFrontService {

    @Resource
    ReportInfoMapper reportInfoMapper;

    @Resource
    PlatformInfoMapper platformInfoMapper;

    @Override
    public Map<String, Object> query(String id) throws ServiceException {
        Map<String, Object> details = reportInfoMapper.queryDetails(id);
        String type = CommonUtil.fixNull(details.get("send_type"), null);
        if(StringUtils.isNotBlank(type)){

            if("2".equals(type)){
                String startDate = CommonUtil.objToString(details.get("start_date"));
                if(StringUtils.isNotBlank(startDate)){
                    startDate = startDate.substring(0, 4);
                    List<Map<String, Object>> learnTime = platformInfoMapper.queryTotalLearnYearList(startDate);
                    List<Map<String, Object>> teachingTime = platformInfoMapper.queryTeacherTeachingHoursYearList(startDate);
                    details.put("chat_learnTime", learnTime);
                    details.put("chat_teachingTime", teachingTime);
                } else {
                    throw new ServiceException("报告日期异常", ErrorCode.BAD_REQUEST);
                }
            } else {
                Object startDate = details.get("start_date"), endDate = details.get("end_date");
                String sd = null != startDate ? CommonUtil.objToString(startDate) : "";
                String ed =  null != endDate ? CommonUtil.objToString(endDate) : "";
                sd = sd.split(" ")[0];
                ed = ed.split(" ")[0];
                List<Map<String, Object>> learnTime = platformInfoMapper.queryTotalLearnDayList(sd, ed);
                List<Map<String, Object>> teachingTime = platformInfoMapper.queryTeacherTeachingHoursDayList(sd, ed);
                details.put("chat_learnTime", learnTime);
                details.put("chat_teachingTime", teachingTime);
            }
            String reportType = CommonUtil.fixNull(details.get("report_type"), ""), sendType = CommonUtil.fixNull(details.get("send_type"), "");
            List<Map<String, Object>> top5 = reportInfoMapper.queryTop5(reportType, sendType);
            details.put("top5", top5);
            return details;
        } else {
            throw new ServiceException("报告类型异常", ErrorCode.BAD_REQUEST);
        }

    }


}

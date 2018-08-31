package com.ryan.framework.web.controller;

import com.whaty.core.framework.api.exception.ApiException;
import com.ryan.framework.service.ReportFrontService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 报告展示信息
 *
 * @author RyanYin
 */

@Controller
@RequestMapping("/report")
public class ReportFrontController {

    @Resource
    ReportFrontService reportFrontService;

    /**
     * 查询管理员用户信息
     * @return list
     * @throws ApiException
     * */
    @GetMapping(value = "/details/{id}")
    public ModelAndView details(@PathVariable("id") String id, HttpServletRequest request, ModelAndView modelAndView) throws ApiException {

        if(StringUtils.isNotBlank(id)){
            Map<String, Object> info = reportFrontService.query(id);
            modelAndView.addObject("data", info);
        }
        modelAndView.addObject("path", request.getContextPath());
        modelAndView.setViewName("/report/front/details");
        return modelAndView;
    }


}


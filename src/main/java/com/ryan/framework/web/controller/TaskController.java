package com.ryan.framework.web.controller;

import com.ryan.framework.service.TaskManageService;
import com.ryan.framework.util.CommonUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * 定时任务管理
 */
@Controller
@RequestMapping("/task")
public class TaskController {

    @Resource
    TaskManageService taskManageService;

    @GetMapping("info")
    public String info() {
        taskManageService.savePlatformInfo();
        return "/index";
    }

    @GetMapping("composite")
    public String composite() {
        taskManageService.saveComposite();
        return "/index";
    }

    @GetMapping("ow")
    public String operatingWeekly(HttpServletRequest request) {
        String path = CommonUtil.getPath(request);
        taskManageService.sendReport("0", "0", path);
        return "/index";
    }

}

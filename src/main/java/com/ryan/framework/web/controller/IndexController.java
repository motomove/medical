package com.ryan.framework.web.controller;

import com.ryan.framework.domain.MenuHolder;
import com.ryan.framework.service.ReportFrontService;
import com.ryan.framework.service.SendReportService;
import com.ryan.framework.util.CommonUtil;
import com.ryan.framework.util.email.SimpleMailSender;
import com.ryan.framework.web.base.BaseController;
import freemarker.template.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Map;

/**
 * @author: RyanYin
 * @create: 4/27 0027 15:29
 */
@Controller
@RequestMapping("/")
public class IndexController extends BaseController {

    @Resource
    SendReportService sendReportService;

    @Autowired
    private MenuHolder menuHolder;

    @GetMapping("/login")
    public String login(){
        return "redirect:/pages/login.html";
    }

    @GetMapping("")
    public String index(Model modelMap) {
        modelMap.addAttribute("menus", menuHolder.getMenus());
        return "index";
    }



//    @GetMapping("/wechat")
//    public String wechat(){
//        sendReportService.sendByWechat("4b5fbb25e5a643fd8ce066df26df7140", "运营周报(2018.06.04-06.10)", 3129D, 4068, 46.1D, 1311);
//        return "/index";
//    }

    @Resource
    SimpleMailSender simpleMailSender;

//    @GetMapping("/email")
//    public String email(HttpServletRequest request){
//
//        String path = CommonUtil.getPath(request);
//
//        String[] user = new String[]{"yin2007014060@126.com", "yinxu@whaty.com"};
//        sendReportService.sendByEmail("4b5fbb25e5a643fd8ce066df26df7140", "运营周报(2018.06.04-06.10)", Arrays.asList(user),  path);
//        return "/index";
//
//    }

    @Resource
    Configuration freemarkerConfiguration;

    @Resource
    ReportFrontService reportFrontService;

    public String geFreeMarkerTemplateContent(Map<String, Object> model) throws Exception{
        StringBuffer content = new StringBuffer();
        content.append(FreeMarkerTemplateUtils.processTemplateIntoString(
                freemarkerConfiguration.getTemplate("report/front/details.ftl"), model));
        return content.toString();
    }

}

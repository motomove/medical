package com.ryan.framework.web.controller;

import com.whaty.core.framework.api.domain.ResultDataModel;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


/**
 * 用户信息管理
 *
 * @author RyanYin
 */

@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * 用户基础信息
     * @param session
     * @return
     */
    @RequestMapping(value = "info", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel info(HttpServletRequest request, HttpSession session){
        //System.out.println(" = " + request.getUserPrincipal().getName());
        String user = (String) session.getAttribute(request.getUserPrincipal().getName());
        return ResultDataModel.handleSuccessResult(user);
    }



}

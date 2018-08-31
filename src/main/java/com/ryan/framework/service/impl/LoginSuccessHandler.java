package com.ryan.framework.service.impl;

import com.ryan.framework.mapper.SsoUserMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

@Service("authenticationSuccessHandler")
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Resource
    SsoUserMapper ssoUserMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
                                        Authentication authentication) throws IOException, ServletException {
        Map<String, Object> user = ssoUserMapper.queryNickName(authentication.getName());
        String nickName = (String) user.get("name");
        HttpSession session = httpServletRequest.getSession();
        session.setAttribute(authentication.getName(), nickName);
        String path = httpServletRequest.getContextPath();
        int port = httpServletRequest.getServerPort();
        String serverPort = port == 80 || port == 443 ? "" : ":" + port ;
        path = httpServletRequest.getScheme() + "://" + httpServletRequest.getServerName() + serverPort + path + "/";
//        //System.out.println("path = " + path);
        httpServletResponse.sendRedirect(path);
    }
}

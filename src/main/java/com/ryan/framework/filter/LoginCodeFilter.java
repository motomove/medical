package com.ryan.framework.filter;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginCodeFilter extends GenericFilterBean {


    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//        //System.out.println("=============");
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String path = request.getRequestURI();
//        //System.out.println("=============" + path);
        if(StringUtils.endsWith(path, "/pages/login.html")){
            HttpSession session = request.getSession();
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}

package com.ryan.framework.filter;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        return super.attemptAuthentication(request, response);
//        String code = request.getParameter("code");
//        Object obj = CacheUtil.get(code);
//        if(null == obj){
//            redirect(request, response);
//            return null;
//        }
//
//        JSONObject json = JSONObject.parseObject(obj.toString());
//        boolean sign = json.getBoolean("sign");
//
//        if(sign){
//            CacheUtil.remove(code);
//            return super.attemptAuthentication(request, response);
//        }
//
//        redirect(request, response);
//        return null;
    }

    /**
     * 异常重定向
     * @param request
     * @param response
     */
    private final void redirect(HttpServletRequest request, HttpServletResponse response){
        try {
            response.sendRedirect(request.getContextPath() + "/pages/login.html");
        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus(400);
        }
    }
}

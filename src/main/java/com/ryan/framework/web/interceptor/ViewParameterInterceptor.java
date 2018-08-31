package com.ryan.framework.web.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 给页面设置一些公用的参数
 *
 * @author: RyanYin
 * @create: 2017/11/7 15:18
 */
public class ViewParameterInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        return true;
    }

    /**
     * 执行时机：controller处理完，页面处理前
     *
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        String scheme = request.getScheme();
        String serverName = request.getServerName();
        String serverPort = String.valueOf(request.getServerPort());
        String contextPath = request.getContextPath();
        String basePath = scheme + "://" + serverName + ":" + serverPort + contextPath;
        request.setAttribute("scheme", scheme);
        request.setAttribute("serverName", serverName);
        request.setAttribute("serverPort", serverPort);
        request.setAttribute("contextPath", contextPath);
        request.setAttribute("basePath", basePath);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
    }

}

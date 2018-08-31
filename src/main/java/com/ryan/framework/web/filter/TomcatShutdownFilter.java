package com.ryan.framework.web.filter;

import org.apache.logging.log4j.LogManager;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

/**
 * 解决tomcat关闭时log4j报错问题
 * @see <a href="http://blog.csdn.net/yulsh/article/details/68065512">
 *     tomcat关闭时log4j报错错出现内存泄漏即java.lang.NoClassDefFoundError: org/apache/logging/log4j/message/Parameteriz
 *     </a>
 *
 * @author: RyanYin
 * @create: 2017/10/19 10:53
 */
public class TomcatShutdownFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

    }

    @Override
    public void destroy() {
        LogManager.shutdown();
    }
}

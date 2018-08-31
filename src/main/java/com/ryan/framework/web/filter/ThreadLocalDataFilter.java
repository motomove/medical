package com.ryan.framework.web.filter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

/**
 * 线程绑定数据过滤器
 *
 * @author: RyanYin
 * @create: 2017/10/18 17:25
 */
public class ThreadLocalDataFilter implements Filter {

    // @Autowired
    // private PlatformConfig platformConfig;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        /*if (platformConfig == null) {
            platformConfig = SpringUtil.getBean(PlatformConfig.class);
        }*/

        /*String host = servletRequest.getServerName();
        ThreadLocalData threadLocalData = new ThreadLocalData();
        threadLocalData.setHost(host);
        threadLocalData.setPort(servletRequest.getServerPort());

        ThreadLocalDataContextHolder.set(threadLocalData);

        filterChain.doFilter(servletRequest, servletResponse);*/
    }

    @Override
    public void destroy() {

    }

}

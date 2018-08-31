// package com.ryan.framework.web.filter;
//
// import com.ryan.framework.config.PlatformConfig;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
//
// import javax.servlet.Filter;
// import javax.servlet.FilterChain;
// import javax.servlet.FilterConfig;
// import javax.servlet.ServletException;
// import javax.servlet.ServletRequest;
// import javax.servlet.ServletResponse;
// import javax.servlet.http.HttpServletRequest;
// import java.io.IOException;
//
// /**
//  * 动态数据源切换过滤器
//  *
//  * @author: RyanYin
//  * @create: 2017/10/18 17:19
//  */
// public class DynamicDataSourceFilter implements Filter {
//
//     private static final Logger logger = LoggerFactory.getLogger(DynamicDataSourceFilter.class);
//
//     @Autowired
//     private PlatformConfig platformConfig;
//
//     @Override
//     public void init(FilterConfig filterConfig) throws ServletException {
//         logger.info("DynamicDataSourceFilter initialized.");
//     }
//
//     @Override
//     public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
//         //如果访问checkserver.jsp直接，跳过
//         HttpServletRequest req = (HttpServletRequest) servletRequest;
//         if (req.getRequestURI().endsWith("checkserver.jsp")) {
//             filterChain.doFilter(servletRequest, servletResponse);
//             return;
//         }
//
//         logger.debug("DynamicDataSourceFilter doFilter");
//
//         boolean supportHost = false;
//         String host = servletRequest.getServerName();
//
// //        if (platformConfig == null) {
// //            platformConfig = SpringUtil.getBean(PlatformConfig.class);
// //        }
//
// //         if (platformConfig != null && !CollectionUtils.isEmpty(platformConfig.getWebSiteList())) {
// //             for (UcSite peWebSite : platformConfig.getWebSiteList()) {
// //                 if (host.equals(peWebSite.getDomain())) {
// //                     if (DynamicDataSourceContextHolder.support(peWebSite.getCode())) {
// //                         DynamicDataSourceContextHolder.setType(peWebSite.getCode());
// //                         supportHost = true;
// //                     }
// //                     break;
// //                 }
// //             }
// //         }
// //
// //         if (supportHost) {
// //            filterChain.doFilter(servletRequest, servletResponse);
// //         } else {
// //             logger.debug("域名不被支持: {}", host);
// //
// //             HttpServletResponse response = (HttpServletResponse) servletResponse;
// //             response.setStatus(HttpStatus.FORBIDDEN.value());
// //             response.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
// //             response.getWriter().write("域名不被支持");
// //         }
//     }
//
//     @Override
//     public void destroy() {
//         logger.info("DynamicDataSourceFilter destroyed.");
//     }
//
// }
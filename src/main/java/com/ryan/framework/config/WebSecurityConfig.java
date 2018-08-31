package com.ryan.framework.config;

import com.ryan.framework.filter.LoginAuthenticationFilter;
import com.ryan.framework.filter.LoginCodeFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.annotation.Resource;

/**
 *
 * 支持SpringSecurity安全框架
 * 管理访问安全配置
 *
 * @author RyanYin
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    @Resource
    UserDetailsService userDetailsService;

    @Resource
    PasswordEncoder passwordEncoder;

    @Resource
    LogoutSuccessHandler logoutSuccessHandler;

    @Resource
    AuthenticationSuccessHandler authenticationSuccessHandler;

    LoginAuthenticationFilter loginAuthenticationFilter = new LoginAuthenticationFilter();

    LoginCodeFilter loginCodeFilter = new LoginCodeFilter();

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.addFilterBefore(loginCodeFilter, ChannelProcessingFilter.class);
//
        loginAuthenticationFilter.setAuthenticationManager(authenticationManager());
        loginAuthenticationFilter.setAuthenticationSuccessHandler(authenticationSuccessHandler);
        http.addFilterBefore(loginAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http
            .csrf().disable()
            .headers().frameOptions().disable()
            .and()
                .authorizeRequests()
                .antMatchers(
                        "/**/*.css",
                        "/**/8U6IWbdpmx.txt",
                        "/**/test.html",
                        "/**/*.js",
                        "/**/*.png",
                        "/**/*.jpg",
                        "/**/*.jpeg",
                        "/**/*.gif").permitAll()
                .antMatchers(
                        "/report/details/**",
                        "/code/*.do").permitAll()
                .anyRequest().authenticated()  //所有请求必须登录后访问
            .and()
                .formLogin()
                .loginPage("/login")
                .successHandler(authenticationSuccessHandler)
                .permitAll() //登录界面，错误界面可以直接访问
            .and()
                .logout()
                .logoutSuccessUrl("/pages/login.html")
                .invalidateHttpSession(true)
                .deleteCookies()
                .clearAuthentication(true)
                .permitAll(); //注销请求可以直接访问

//        http.addFilter();

    }
}

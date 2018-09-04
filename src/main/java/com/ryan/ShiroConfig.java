package com.ryan;

import com.ryan.framework.domain.util.PropertiesHelper;
import com.ryan.framework.domain.util.PropertiesLoader;
import com.ryan.framework.domain.web.JspDispatcherFilter;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.context.annotation.Primary;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.web.filter.DelegatingFilterProxy;

import javax.servlet.DispatcherType;
import java.io.IOException;
import java.util.Properties;

@Configuration
public class ShiroConfig {
    @Primary
    @Bean("properties")
    public Properties properties() throws IOException {
        PropertiesLoader loader = new PropertiesLoader();
        loader.setFileEncoding("UTF-8");
        loader.setValue("classpath:conf/conf.properties");
        Properties properties = loader.createProperties();
        return properties;
    }

    @Bean("propertiesHelper")
    public PropertiesHelper propertiesHelper() throws IOException {
        PropertiesHelper propertiesHelper = new PropertiesHelper();
        propertiesHelper.setProperties(properties());
        return propertiesHelper;
    }

    @DependsOn("propertiesHelper")
    public void shiroFilterFactoryBean(BeanFactory beanFactory) throws IOException {
    }


    @Bean
    public FilterRegistrationBean jspDispatcherFilterRegistrationBean() {
        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
        filterRegistration.setFilter(new JspDispatcherFilter());
        filterRegistration.setEnabled(true);
        filterRegistration.addInitParameter("prefix", "/jsp");
        filterRegistration.addUrlPatterns("*.jsp");
        filterRegistration.addUrlPatterns("*.jspx");
        filterRegistration.setDispatcherTypes(DispatcherType.REQUEST);
        return filterRegistration;
    }

    @Bean
    public FilterRegistrationBean openEntityManagerInViewFilterRegistrationBean() {
        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
        filterRegistration.setFilter(new OpenEntityManagerInViewFilter());
        filterRegistration.setEnabled(true);
        filterRegistration.addUrlPatterns("/*");
        return filterRegistration;
    }

//    @Bean
//    public FilterRegistrationBean shiroFilterRegistrationBean() {
//        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
//        filterRegistration.setFilter(new DelegatingFilterProxy("shiroFilter"));
//        filterRegistration.setEnabled(true);
//        filterRegistration.addInitParameter("targetFilterLifecycle", "true");
//        filterRegistration.addUrlPatterns("/*");
//        return filterRegistration;
//    }
}

package com.ryan;

import com.ryan.framework.datasource.DynamicDataSourceRegister;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.context.MessageSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.ImportResource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * 项目启动类
 *
 * @author: RyanYin
 * @create: 2017/10/18 17:14
 */
@SpringBootApplication
// @EnableResourceServer
//启用定时任务支持
// @EnableScheduling
//启用异步方法支持
// @EnableAsync
//事务支持
@EnableTransactionManagement
@EnableAutoConfiguration(exclude = { MessageSourceAutoConfiguration.class})
//mapper扫描范围
@MapperScan({"com.ryan.framework.mapper", "com.ryan.framework.job"})
//导入配置
@Import({DynamicDataSourceRegister.class, MenuConfig.class, ShiroConfig.class})
@ImportResource({ "classpath:conf/**/context*.xml"})
public class SsoServerApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application;
    }

    public static void main(String[] args) {
//        SpringApplication.run(Application.class, args);
    }

}

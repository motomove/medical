package com.ryan.framework.util.phantomJS;

import com.ryan.framework.domain.Platform;
import org.openqa.selenium.phantomjs.PhantomJSDriverService;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class PhantomJSUtil {

    @Resource
    private Platform platform;

    private  DesiredCapabilities dcaps = new DesiredCapabilities();

    public final DesiredCapabilities getInstance(){
        //ssl证书支持
        dcaps.setCapability("acceptSslCerts", false);
        //截屏支持
        dcaps.setCapability("takesScreenshot", true);
        //css搜索支持
        dcaps.setCapability("cssSelectorsEnabled", true);
        //js支持
        dcaps.setJavascriptEnabled(true);
        //驱动支持（第二参数表明的是你的phantomjs引擎所在的路径，which/whereis phantomjs可以查看）
        // fixme 这里写了执行， 可以考虑判断系统是否有安装，并获取对应的路径 or 开放出来指定路径
//        dcaps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY, "/home/whaty/download/phantomjs-2.1.1-linux-x86_64/bin/phantomjs");
        dcaps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY, platform.getPhantomJS());

        return dcaps;
    }

////    private static PhantomJSDriver webDriver = getPhantomJs();
//    private static PhantomJSDriver getPhantomJs() {
//        //设置必要参数
//
//        //创建无界面浏览器对象
//        return new PhantomJSDriver(dcaps);
//    }
}

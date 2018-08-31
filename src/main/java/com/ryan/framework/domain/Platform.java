package com.ryan.framework.domain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "platform")
public class Platform {

    @Value("${platform.domain}")
    private String domain;

    @Value("${platform.img}")
    private String imgPath;

    @Value("${platform.phantomJS}")
    private String phantomJS;

    public Platform() {
    }

    public Platform(String domain) {
        this.domain = domain;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public String getPhantomJS() {
        return phantomJS;
    }

    public void setPhantomJS(String phantomJS) {
        this.phantomJS = phantomJS;
    }
}

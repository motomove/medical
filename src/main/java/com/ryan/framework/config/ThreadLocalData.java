package com.ryan.framework.config;

/**
 * 线程绑定数据
 *
 * @author: RyanYin
 * @create: 2017/10/18 17:25
 */
public class ThreadLocalData {

    private String host;

    private int port;

    private String siteCode;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getSiteCode() {
        return siteCode;
    }

    public void setSiteCode(String siteCode) {
        this.siteCode = siteCode;
    }
}

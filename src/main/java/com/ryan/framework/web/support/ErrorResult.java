package com.ryan.framework.web.support;

/**
 * 错误信息统一返回格式
 *
 * @author: RyanYin
 * @create: 2017/10/18 17:20
 */
public class ErrorResult {

    public boolean success;
    public int code;
    public String message;

    public ErrorResult() {
    }

    public ErrorResult(int code, String message) {
        this.success = false;
        this.code = code;
        this.message = message;
    }

}
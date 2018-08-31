package com.ryan.framework.web.util;

/**
 * 请求返回结果统一格式
 *
 * @author: RyanYin
 * @create: 2017/10/18 17:27
 */
public class ResponseResult {

    public static final String SUCCESS_TRUE_CODE = "0";
    public static final String SUCCESS_FALSE_CODE = "1";

    private Boolean success;
    private String code;
    private String message;
    private Object data;

    public Boolean getSuccess() {
        return success;
    }

    public ResponseResult setSuccess(Boolean success) {
        this.success = success;
        return this;
    }

    public String getCode() {
        return code;
    }

    public ResponseResult setCode(String code) {
        this.code = code;
        return this;
    }

    public String getMessage() {
        return message;
    }

    public ResponseResult setMessage(String message) {
        this.message = message;
        return this;
    }

    public Object getData() {
        return data;
    }

    public ResponseResult setData(Object data) {
        this.data = data;
        return this;
    }
}

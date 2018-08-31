package com.ryan.framework.web.base;

import com.ryan.framework.web.util.ResponseResult;
import com.ryan.framework.web.util.ResponseResultHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * 基础控制器
 *
 * @author cc
 */
public abstract class BaseController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BaseController.class);

    /**
     * 重定向
     */
    protected String redirect(String url) {
        return "redirect:" + url;
    }

    /**
     * 404
     */
    protected String redirect404() {
        return redirect("/error/404.html");
    }

    /**
     * unauthorized
     */
    protected String redirectUnauthorized() {
        return redirect("/unauthorized.html");
    }

    protected ResponseResult successResult() {
        return this.successResult(ResponseResult.SUCCESS_TRUE_CODE, null, null);
    }

    protected ResponseResult successResult(String message) {
        return this.successResult(ResponseResult.SUCCESS_TRUE_CODE, message, null);
    }

    protected ResponseResult successResult(Object data) {
        return this.successResult(ResponseResult.SUCCESS_TRUE_CODE, null, data);
    }

    protected ResponseResult successResult(String code, String message, Object data) {
        return this.result(Boolean.TRUE, code, message, data);
    }

    protected ResponseResult failureResult() {
        return this.failureResult(ResponseResult.SUCCESS_FALSE_CODE, null, null);
    }

    protected ResponseResult failureResult(String message) {
        return this.failureResult(ResponseResult.SUCCESS_FALSE_CODE, message, null);
    }

    protected ResponseResult failureResult(Object data) {
        return this.failureResult(ResponseResult.SUCCESS_FALSE_CODE, null, data);
    }

    protected ResponseResult failureResult(String code, String message, Object data) {
        return this.result(Boolean.FALSE, code, message, data);
    }

    private ResponseResult result(Boolean success, String code, String message, Object data) {
        ResponseResult responseResult = ResponseResultHelper.createResponseResult();
        return responseResult.setSuccess(success)
                .setCode(code)
                .setMessage(message)
                .setData(data);
    }

    /**
     * 获取ServletRequestAttributes对象.
     */
    protected ServletRequestAttributes getServletRequestAttributes() {
        return (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
    }

    /**
     * 获取HttpServletRequest对象.
     */
    protected HttpServletRequest getRequest() {
        return getServletRequestAttributes().getRequest();
    }

}
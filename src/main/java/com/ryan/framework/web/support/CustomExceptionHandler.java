package com.ryan.framework.web.support;

import com.google.common.collect.Maps;
import com.ryan.framework.service.expection.ServiceException;
import com.ryan.framework.util.CommonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springside.modules.utils.mapper.JsonMapper;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * 统一异常处理
 * 异常处理统一返回json格式,方便框架以后前后端分离
 *
 * @author: RyanYin
 * @create: 2017/10/18 17:18
 */
@ControllerAdvice
public class CustomExceptionHandler {

    private Logger logger = LoggerFactory.getLogger(CustomExceptionHandler.class);

    private JsonMapper jsonMapper = new JsonMapper();

    @ExceptionHandler(value = {ServiceException.class})
    public final ResponseEntity<ErrorResult> handleServiceException(ServiceException ex, HttpServletRequest request) {
        // 记录异常日志
        logError(ex, request, false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        ErrorResult result = new ErrorResult(ex.errorCode.code, ex.getMessage());
        return new ResponseEntity<>(result, headers, HttpStatus.valueOf(ex.errorCode.httpStatus));
    }

    @ExceptionHandler(value = {HttpRequestMethodNotSupportedException.class, MissingServletRequestParameterException.class})
    public final ResponseEntity<ErrorResult> handleGeneralException(Exception ex, HttpServletRequest request) {
        // 记录异常日志
        logError(ex, request, false);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        ErrorResult result = new ErrorResult(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
        return new ResponseEntity<>(result, headers, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {Exception.class})
    public final ResponseEntity<ErrorResult> handleException(Exception ex, HttpServletRequest request) {

        // 记录异常日志
        logError(ex, request, true);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        ErrorResult result = new ErrorResult(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase());
        return new ResponseEntity<>(result, headers, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public void logError(Exception ex, HttpServletRequest request, boolean printEx) {
        Map<String, String> map = Maps.newHashMap();
        map.put("message", ex.getMessage());
        map.put("from", CommonUtil.getIpAddr(request));
        String queryString = request.getQueryString();
        map.put("path", queryString != null ? (request.getRequestURI() + "?" + queryString) : request.getRequestURI());

        if (printEx) {
            logger.error(jsonMapper.toJson(map), ex);
        } else {
            logger.error(jsonMapper.toJson(map));
        }
    }

}

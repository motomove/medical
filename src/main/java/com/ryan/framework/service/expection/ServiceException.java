package com.ryan.framework.service.expection;

import com.ryan.framework.exception.ErrorCode;

/**
 * 业务异常类，继承RuntimeException
 *
 * @author: RyanYin
 * @create: 2017/10/18 17:29
 */
public class ServiceException extends RuntimeException {

    private static final long serialVersionUID = 164226678933021435L;

    public ErrorCode errorCode;

    public ServiceException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

}

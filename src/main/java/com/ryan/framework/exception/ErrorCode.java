package com.ryan.framework.exception;

/**
 * 错误信息统一返回码
 *
 * @author: RyanYin
 * @create: 2017/10/18 17:19
 */
public enum ErrorCode {

    /**
     * 400
     */
    BAD_REQUEST(400, 400),
    /**
     * 401,未授权
     */
    UNAUTHORIZED(401, 401),
    /**
     * 403
     */
    FORBIDDEN(403, 403),
    /**
     * 500,服务器内部错误
     */
    INTERNAL_SERVER_ERROR(500, 500),
    /**
     * 平台业务逻辑错误,一般由业务代码主动抛出异常,用于传递信息
     */
    SERVICE_WRONG(1100, 200),
    /**
     * 401, 未认证, no token
     */
    NO_TOKEN(1101, 401);

    public int code;
    public int httpStatus;

    ErrorCode(int code, int httpStatus) {
        this.code = code;
        this.httpStatus = httpStatus;
    }

}

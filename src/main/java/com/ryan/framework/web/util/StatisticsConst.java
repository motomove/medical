package com.ryan.framework.web.util;

/**
 * Created by whaty on 2017/8/31.
 */
public class StatisticsConst {

    public static final String DATASOURCE_DEFAULT = "default";//默认数据源
    public static final String DATASOURCE_PLATFORM = "platform";//业务平台数据源
    public static final String DATASOURCE_LEARNING = "learning";//学习平台数据源

    public static final String SSO_USER_SESSION = "sso_user_session";

    public static final int ERROR_PARAMS_CODE = 4000;  //参数异常

    /**
     * 异常码对应关系
     */
    public enum ErrorCodeEnum{
        CODE_PARAMS_ERROR(4000, "参数异常"),
        CODE_UNEXPIRE(4001, "验证码失效");

        private int code;
        private String info;

        ErrorCodeEnum(int code, String info) {
            this.code = code;
            this.info = info;
        }

        public int getCode() {
            return code;
        }

        public void setCode(int code) {
            this.code = code;
        }

        public String getInfo() {
            return info;
        }

        public void setInfo(String info) {
            this.info = info;
        }
    }
}

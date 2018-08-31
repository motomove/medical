package com.ryan.framework.util;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.DecimalFormat;
import java.util.List;

/**
 * 常用工具方法集合
 *
 * @author: RyanYin
 */
@Component
public class CommonUtil {

    /**
     * 将分钟转为小时
     * @param min
     * @return
     */
    public static String minToHourStr(double min){
        double hours = (min / 60D);
        DecimalFormat df = new DecimalFormat("#.0");
        String h = df.format(hours);
        return h;
    }

    /**
     * object转为string
     * 如果object==null,return null;
     *
     * @param obj
     * @return
     */
    public static String objToString(Object obj) {
        return obj != null ? String.valueOf(obj) : null;
    }

    /**
     * 修复空数据
     * @param obj
     * @param _default
     * @return
     */
    public static final String fixNull(Object obj, String _default){
        if(obj instanceof String || obj instanceof Integer || obj instanceof Double){
            return null != obj ? String.valueOf(obj) : _default;
        }

        if(obj instanceof Float || obj instanceof Long || obj instanceof BigDecimal){
            return null != obj ? String.valueOf(obj) : _default;
        }

        if(obj instanceof BigInteger){
            return null != obj ? String.valueOf(obj) : _default;
        }
        return null;
    }

    /**
     * 两数相除
     * @param x
     * @param y
     * @return
     */
    public static int divideToIntegralValue(int x, int y){
        BigDecimal decimal1 = new BigDecimal(x);
        BigDecimal decimal2 = new BigDecimal(y);
        BigDecimal decimal = decimal1.divideToIntegralValue(decimal2);

        //System.out.println(decimal.intValue());
        return decimal.intValue();
    }

    /**
     * 拼接为sql like 需要的value
     *
     * @param value
     * @return
     */
    public static String allLike(String value) {
        return "%" + value + "%";
    }

    /**
     * 生成sql使用的"id in (...)"语句，如果values个数过多会自动分成多个in字句
     *
     * @param id
     * @param values
     * @return
     */
    public static String madeSqlIn(String id, List<String> values) {
        StringBuilder sql = new StringBuilder();
        if (CollectionUtils.isEmpty(values)) {
            return sql.append(" ").append(id).append(" in ('') ").toString();
        }

        //每个in中值得最大个数
        int singleInMaxSize = 999;

        if (values.size() <= singleInMaxSize) {
            sql.append(" ").append(id).append(" in (");
            for (int i = 0; i < values.size(); i++) {
                if (values.get(i) == null) {
                    continue;
                }
                sql.append("'").append(values.get(i).trim()).append("', ");
            }
            sql.delete(sql.length() - 2, sql.length());
            sql.append(")");
        } else {
            sql.append("(");
            for (int i = 0; i < values.size(); i++) {
                if (i % singleInMaxSize == 0) {
                    sql.append(id).append(" in (");
                }

                sql.append("'").append(values.get(i).trim()).append("'");

                if ((i + 1) % singleInMaxSize == 0 || i == values.size() - 1) {
                    sql.append(")");
                    if (i != values.size() - 1) {
                        sql.append(" or ");
                    }
                } else {
                    sql.append(", ");
                }
            }
            sql.append(")");
        }

        return sql.toString();
    }

    public static String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("X-Real-IP");
        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("x-forwarded-for");
        }

        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }

        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }

        if (StringUtils.isBlank(ip) || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
            if (ip.equals("127.0.0.1")) {
                InetAddress inet = null;

                try {
                    inet = InetAddress.getLocalHost();
                } catch (UnknownHostException var4) {
                    var4.printStackTrace();
                }

                ip = inet.getHostAddress();
            }
        }

        if (ip != null && ip.length() > 15 && ip.indexOf(",") > 0) {
            ip = ip.substring(0, ip.indexOf(","));
        }

        return ip;
    }

    /**
     * 字节编码Base64
     * @param bufferedImage
     * @param imgType
     * @return
     * @throws IOException
     */
    public static String encode(BufferedImage bufferedImage, String imgType) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, imgType, outputStream);
        return encode(outputStream);
    }

    /**
     * 字节编码Base64
     * @param outputStream
     * @return
     */
    public static String encode(ByteArrayOutputStream outputStream) {
        BASE64Encoder encoder = new BASE64Encoder();
        String png_base64 =  encoder.encodeBuffer(outputStream.toByteArray()).trim();//转换成base64串
        png_base64 = png_base64.replaceAll("\n", "").replaceAll("\r", "");//删除 \r\n
        return png_base64;
    }

    /**
     * 获取服务器地址
     * @param request
     * @return
     */
    public static final String getPath(HttpServletRequest request){
        String path = request.getScheme() +  "://" + request.getServerName();
        if(request.getServerPort() != 80 || request.getServerPort() != 443){
            path += ":" + request.getServerPort();
        }
        path += request.getContextPath();
        return path;
    }

    public static HttpServletRequest getRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    }

    public static String getRealPath(String relativePath) {
        return getRequest().getServletContext().getRealPath(relativePath);
    }

}

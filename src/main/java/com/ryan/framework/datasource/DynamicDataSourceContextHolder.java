package com.ryan.framework.datasource;

import com.google.common.collect.Lists;

import java.util.List;

/**
 * 动态数据源切换工具类, 使用ThreadLocal讲数据源和当前线程绑定
 *
 * @author: RyanYin
 */
public class DynamicDataSourceContextHolder {

    /**
     * 数据源总列表
     */
    public static List<Object> dataSourceIds = Lists.newArrayList();

    private static ThreadLocal<String> contextHolder = new ThreadLocal<>();

    public static void setType(String type) {
        contextHolder.set(type);
    }

    public static String getType() {
        return contextHolder.get();
    }

    public static void clear() {
        contextHolder.remove();
    }

    public static boolean support(String type) {
        return dataSourceIds.contains(type);
    }

}

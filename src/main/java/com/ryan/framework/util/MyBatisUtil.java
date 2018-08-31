package com.ryan.framework.util;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import org.apache.commons.collections.CollectionUtils;

import java.util.List;
import java.util.Map;

/**
 * @author: RyanYin
 * @create: 2017/11/7 12:58
 */
public class MyBatisUtil {

    public static Map<String, Object> transformToMap(String sql, Object... parameters) {
        return transformToMap(sql, Lists.newArrayList(parameters));
    }

    public static Map<String, Object> transformToMap(String sql, List parameters) {
        Map<String, Object> map = Maps.newHashMap();
        map.put("sql", sql);
        if (CollectionUtils.isNotEmpty(parameters)) {
            for (int i = 0; i < parameters.size(); i++) {
                map.put(String.valueOf(i), parameters.get(i));
            }
        }
        return map;
    }

    public static String processSql(String sql) {
        StringBuilder newSql = new StringBuilder();
        char[] chars = sql.toCharArray();
        int i = 0;
        for (char aChar : chars) {
            if (aChar == '?') {
                newSql.append("#{").append(i++).append("}");
            } else {
                newSql.append(aChar);
            }
        }
        return newSql.toString();
    }

}

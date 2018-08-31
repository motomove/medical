package com.ryan.framework.datasource;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.util.Assert;

import javax.sql.DataSource;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 动态数据源
 *
 * @author: RyanYin
 */
public class DynamicDataSource extends AbstractRoutingDataSource {

    static ConcurrentHashMap<Object, DataSource> dataSourceMap = new ConcurrentHashMap<>();
    static DataSource defaultDataSource;

    @Override
    protected Object determineCurrentLookupKey() {
        return DynamicDataSourceContextHolder.getType();
    }

    /**
     * 获取数据源, 如果线程绑定的数据源不存在则返回默认数据源
     * @return
     */
    @Override
    protected DataSource determineTargetDataSource() {
        Assert.notNull(dataSourceMap, "DataSource router not initialized");
        Object lookupKey = this.determineCurrentLookupKey();
        if (lookupKey != null) {
            DataSource dataSource = dataSourceMap.get(lookupKey);
            if (dataSource != null) {
                return dataSource;
            }
        }
        return defaultDataSource;
    }

}
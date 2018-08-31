package com.ryan.framework.util;

import com.whaty.framework.cache.core.model.Cache;
import com.whaty.framework.cache.core.service.CacheService;
import com.whaty.framework.cache.core.service.impl.DefaultRedisService;

import java.util.Iterator;
import java.util.Map;

/**
 * 缓存工具类
 *
 * @author: RyanYin
 */
public class CacheUtil {

    /**
     * 缓存前缀，用于缓存分片
     */
    private static final String CACHE_NAME = "demo";

    /**
     * 保存所有缓存key的map的key
     */
    private static final String ALL_KEYS_MAP_KEY = "all_cache_keys";

    private static CacheService cacheService;

    private static Cache cache;

    /**
     * 存入缓存，永不失效
     */
    public static boolean put(String key, Object value) {
        addKeysMap(key, 0);
        return getCache().put(key, value, 0);
    }

    /**
     * 存入缓存，有超时时间
     * @param expireSecond  数据超时的秒数
     */
    public static boolean put(String key, Object value, int expireSecond) {
        addKeysMap(key, expireSecond);
        return getCache().put(key, value, expireSecond);
    }

    /**
     * 从中缓存获取
     */
    public static Object get(String key) {
        return getCache().get(key);
    }

    /**
     * 从缓存中删除
     * @param key
     */
    public static void remove(String key) {
        removeFromKeysMap(key);
        getCache().remove(key);
    }

    /**
     * 向map对象中存入一个key
     */
    public static boolean putIntoMap(String cacheKey, String mapKey, Object value) {
        return getCache().putIntoMap(cacheKey, mapKey, value);
    }

    /**
     * 从map中获取
     */
    public static Object getFromMap(String cacheKey, String mapKey) {
        return getCache().getFromMap(cacheKey, mapKey);
    }

    /**
     * 从map中删除
     */
    public static boolean removeFromMap(String cacheKey, String mapkey) {
        return getCache().removeFromMap(cacheKey, mapkey);
    }

    /**
     * 获取当前缓存中存入的keys
     */
    public static Map<String, Object> keys() {
        Map<String, Object> allKeys = getCache().getMap(ALL_KEYS_MAP_KEY);
        if (allKeys != null && allKeys.size() > 0) {
            long current = System.currentTimeMillis();

            Iterator<String> it = allKeys.keySet().iterator();
            while (it.hasNext()) {
                String key = it.next();

                //删除不存在的
                if (!getCache().exists(key)) {
                    it.remove();
                    removeFromKeysMap(key);
                    break;
                }

                //删除过期的
                String value = String.valueOf(allKeys.get(key));
                String[] values = value.split(":");
                long createTime = Long.parseLong(values[0]);
                int expireSecond = Integer.parseInt(values[1]);
                if (expireSecond != 0 && current - createTime > expireSecond * 1000) {
                    allKeys.remove(key);
                    removeFromKeysMap(key);
                    break;
                }
            }
        }
        return allKeys;
    }

    /**
     * 添加到all_key_map中
     */
    private static boolean addKeysMap(String key, int expireSecond) {
        return getCache().putIntoMap(ALL_KEYS_MAP_KEY, key, System.currentTimeMillis() + ":" + expireSecond);
    }

    /**
     * 从all_key_map中删除
     */
    private static boolean removeFromKeysMap(String key) {
        return getCache().removeFromMap(ALL_KEYS_MAP_KEY, key);
    }

    public static void init() {
        if (cacheService == null) {
            cacheService = new DefaultRedisService();
        }
        if (cache == null) {
            cache = cacheService.getCache(CACHE_NAME);
        }
    }

    public static Cache getCache() {
        if (cache == null) {
            init();
        }
        return cache;
    }

}

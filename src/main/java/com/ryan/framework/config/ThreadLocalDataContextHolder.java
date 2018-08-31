package com.ryan.framework.config;

/**
 * 线程绑定数据
 *
 * @author: RyanYin
 * @create: 2017/10/18 17:25
 */
public class ThreadLocalDataContextHolder {

    private static ThreadLocal<ThreadLocalData> contextHolder = new ThreadLocal<>();

    public static void set(ThreadLocalData threadLocalData) {
        contextHolder.set(threadLocalData);
    }

    public static ThreadLocalData get() {
        return contextHolder.get();
    }

    public static void clear() {
        contextHolder.remove();
    }

}

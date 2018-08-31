package com.ryan.framework.service;

import com.ryan.framework.domain.SsoUser;

/**
 * 用户操作接口
 *
 * @author: RyanYin
 */
public interface SsoUserService {

    /**
     * 根据账户查询
     * 账户可以是：loginId、手机号、邮箱
     * @return
     */
    SsoUser getByAccount(String account);

}

package com.ryan.framework.service.impl;

import com.ryan.framework.mapper.SsoUserMapper;
import com.ryan.framework.domain.SsoUser;
import com.ryan.framework.service.SsoUserService;
import com.ryan.framework.util.CommonUtil;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author: RyanYin
 */
@Service
public class SsoUserServiceImpl implements SsoUserService, UserDetailsService {

    @Autowired
    private SsoUserMapper ssoUserMapper;

    @Override
    public SsoUser getByAccount(String account) {
        return null;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Map<String, Object> user = ssoUserMapper.queryUser(userName);
        if(MapUtils.isEmpty(user)){
            throw new UsernameNotFoundException("UserName " + userName + " not found");
        }
        String loginId = CommonUtil.fixNull(user.get("login_id"), "");
        String pwd = CommonUtil.fixNull(user.get("password"), "");
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        if(StringUtils.isNotBlank(loginId) && StringUtils.isNotBlank(pwd)){
            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(loginId);
            //1：此处将权限信息添加到 GrantedAuthority 对象中，在后面进行全权限验证时会使用GrantedAuthority 对象。
            grantedAuthorities.add(grantedAuthority);
            return new User(loginId, pwd, grantedAuthorities);
        }
        throw new UsernameNotFoundException("用户信息异常");
    }
}

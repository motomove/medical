package com.ryan.framework.service.impl;

import com.ryan.framework.util.EncryptUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class Md5PasswordEncoderImpl implements PasswordEncoder{

    @Override
    public String encode(CharSequence charSequence) {
        return EncryptUtil.md5(charSequence.toString());
    }

    @Override
    public boolean matches(CharSequence charSequence, String s) {
        return s.equals(EncryptUtil.md5(charSequence.toString()));
    }
}

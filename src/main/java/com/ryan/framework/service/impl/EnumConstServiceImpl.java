package com.ryan.framework.service.impl;

import com.ryan.framework.domain.EnumConst;
import com.ryan.framework.service.IEnumConstService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author: RyanYin
 */
@Service
public class EnumConstServiceImpl implements IEnumConstService {

    @Override
    public EnumConst getByNamespaceAndCode(String namespace, String code) {
        //TODO:
        return null;
    }

    @Override
    public List<EnumConst> getByNamespace(String namespace) {
        //TODO:
        return null;
    }

}

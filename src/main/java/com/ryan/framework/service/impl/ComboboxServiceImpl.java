package com.ryan.framework.service.impl;

import com.ryan.framework.mapper.ComboboxMapper;
import com.ryan.framework.exception.ErrorCode;
import com.ryan.framework.service.ComboboxService;
import com.ryan.framework.service.expection.ServiceException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("comboboxService")
public class ComboboxServiceImpl implements ComboboxService{

    @Resource
    ComboboxMapper comboboxMapper;

    @Override
    public List<Map<String, Object>> queryCombobox(String type) throws ServiceException {

        //学习中心
        if("site".equals(type)){
            return comboboxMapper.querySite();
        }

        //专业
        if("major".equals(type)){
            return comboboxMapper.queryMajor();
        }

        //层次
        if("edu".equals(type)){
            return comboboxMapper.queryEdu();
        }

        //年级
        if("grade".equals(type)){
            return comboboxMapper.queryGrade();
        }

        //学期
        if("semester".equals(type)){
            return comboboxMapper.querySemester();
        }

        //招生批次
        if("recruitBantch".equals(type)){
            return comboboxMapper.queryRecruitBantchInfoList();
        }

        throw new ServiceException("数据加载异常", ErrorCode.INTERNAL_SERVER_ERROR);
    }
}

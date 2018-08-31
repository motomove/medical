package com.ryan.framework.web.controller;

import com.ryan.framework.service.ComboboxService;
import com.whaty.core.framework.api.domain.ResultDataModel;
import com.whaty.core.framework.api.exception.ApiException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/statistics")
@RestController
public class ComboboxController {

    @Resource
    ComboboxService comboboxService;

    /**
     *查询今日在线人数
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/combobox", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel queryCombo(String type) throws ApiException {
        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = comboboxService.queryCombobox(type);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }
}

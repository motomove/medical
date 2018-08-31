package com.ryan.framework.web.controller;

import com.alibaba.fastjson.JSONObject;
import com.ryan.framework.util.CacheUtil;
import com.ryan.framework.web.util.StatisticsConst;
import com.whaty.core.framework.api.domain.ResultDataModel;
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 验证码管理
 *
 * @author RyanYin
 */

@RestController
@RequestMapping("/code")
public class VerificationCodeController {

    private static final float CODE_RATE = 0.9F;
    private static final float HEIGHT = 40F;


    /**
     * 生成验证码key
     * @return
     */
    @RequestMapping(value = "qcode", method = {RequestMethod.GET})
    public ResultDataModel qcode(@RequestParam("w") String width){
        if(StringUtils.isBlank(width)){
            return ResultDataModel.handleFailureResoult(StatisticsConst.ErrorCodeEnum.CODE_PARAMS_ERROR.getCode());
        }
        String code = RandomStringUtils.random(15, true, true);
        float w = Float.parseFloat(width);
        float area = (w * CODE_RATE) * HEIGHT;
        JSONObject json = new JSONObject();
        json.put("min", area);
        json.put("max", w * HEIGHT);
        CacheUtil.put(code, json.toString(), 300);
        //System.out.println("CacheUtil.get(code) = " + CacheUtil.get(code));
        return ResultDataModel.handleSuccessResult(code);
    }

    /**
     * 分析验证 验证码
     * @return
     */
    @RequestMapping(value = "analyze", method = {RequestMethod.GET})
    public ResultDataModel analyze(@RequestParam("w") String width, @RequestParam String code){
        if(StringUtils.isBlank(width) || StringUtils.isBlank(code)){
            return ResultDataModel.handleFailureResoult(StatisticsConst.ErrorCodeEnum.CODE_PARAMS_ERROR.getCode());
        }

        Object obj =  CacheUtil.get(code);
        if(null == obj){
            return ResultDataModel.handleFailureResoult(StatisticsConst.ErrorCodeEnum.CODE_UNEXPIRE.getCode());
        }

        JSONObject json = JSONObject.parseObject(obj.toString());
        float w = Float.parseFloat(width);
        float area = w * HEIGHT;
        //System.out.println("area = " + area);
        float min = json.getFloat("min"), max = json.getFloat("max");
        boolean flag = min <= area && area <= max ? true : false;
        if(flag){
            json.put("sign", true);
        } else {
            json.put("sign", false);
        }
        CacheUtil.put(code, json.toString(), 300);
        return ResultDataModel.handleSuccessResult(flag);
    }
}

package com.ryan.framework.web.directive;

import freemarker.core.Environment;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
public class MyTestDirective implements TemplateDirectiveModel {

    public static final String PARAM_ID = "id";

    @Override
    public void execute(Environment env, Map params, TemplateModel[] loopVars,
                        TemplateDirectiveBody body) throws TemplateException, IOException {
        System.out.println("env = " + env);
//        Integer id = DirectiveUtils.getInt(PARAM_ID, params);
//        List<CmsAdvertising> ads = null;
//        CmsAdvertisingSpace adspace;
//        if (id != null) {
//
//            //ad = cmsAdvertisingMng.findById(id);
//            ads= cmsAdvertisingMng.getList(id, true);
//        }
//        Map<String, TemplateModel> paramWrap = new HashMap<String, TemplateModel>(params);
//        if (ads!=null){
//            paramWrap.put(OUT_LIST, DEFAULT_WRAPPER.wrap(ads));
//        }
//
//        Map<String, TemplateModel> origMap = DirectiveUtils
//                .addParamsToVariable(env, paramWrap);
        body.render(env.getOut());
//        DirectiveUtils.removeParamsFromVariable(env, paramWrap, origMap);
    }
}

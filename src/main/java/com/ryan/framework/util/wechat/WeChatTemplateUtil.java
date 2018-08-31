package com.ryan.framework.util.wechat;

import net.sf.json.JSONObject;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

/**
 * 微信消息模版管理
 *
 * @author RyanYin
 */
public class WeChatTemplateUtil {

    /**
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1481187827_i0l21
     * 群发消息模板
     */

    //文本
    public String getMassText(List<String> openIdList, String content) {
        if (CollectionUtils.isNotEmpty(openIdList)) {
            JSONObject jsonParam = new JSONObject();
            String[] openidArr = openIdList.toArray(new String[openIdList.size()]);
            jsonParam.put("touser", openidArr);
            jsonParam.put("msgtype", "text");
            JSONObject text = new JSONObject();
            text.put("content", content);
            jsonParam.put("text", text);
            jsonParam.put("clientmsgid", System.currentTimeMillis());//支持无限制发送
//            //System.out.println(jsonParam.toString());
            return jsonParam.toString();
        } else {
            return null;
        }
    }

    //图文消息（注意图文消息的media_id需要通过上述方法来得到）
    public String getMassMpnews() {

        return "";
    }

    //语音
    public String getMassVoice() {

        return "";
    }

    //图片
    public String getMassImage() {

        return "";
    }

    /**
     * 视频请注意，此处视频的media_id需通过POST请求到下述接口特别地得到： https://api.weixin.qq.com/cgi-bin/media/uploadvideo?access_token=ACCESS_TOKEN
     * POST数据如下（此处media_id需通过基础支持中的上传下载多媒体文件来得到）
     */
    public String getMassMpvideo() {

        return "";
    }

    //卡券
    public String getMassWxcard() {

        return "";
    }


    /**
     * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547
     * 客服单个发消息模板
     * */

    /**
     * Description: 文本消息
     *
     * @param openId
     * @param content
     * @return
     * @author DateTime 2018-1-12 下午12:50:25
     */
    public String getCustomText(String openId, String content) {
        JSONObject jsonParam = new JSONObject();
        jsonParam.put("touser", openId);
        jsonParam.put("msgtype", "text");
        JSONObject text = new JSONObject();
        text.put("content", content);
        jsonParam.put("text", text);
        jsonParam.put("clientmsgid", System.currentTimeMillis());
//        //System.out.println(jsonParam.toString());
        return jsonParam.toString();
    }

    /**
     * Description: 模板消息参数
     *
     * @param openId      必填 接收者openid
     * @param template_id 必填 模板ID
     * @param linkUrl     非必填  模板跳转链接
     * @param data        必填   模板数据
     * @return
     * @author DateTime 2018-1-12 上午11:40:25
     */
    public final String getTemplateMsg(String openId, String template_id, String linkUrl, String data) {
        JSONObject jsonParam = new JSONObject();
        jsonParam.put("touser", openId);
        jsonParam.put("template_id", template_id);
        if (StringUtils.isNotBlank(linkUrl)) {
            jsonParam.put("url", linkUrl);
        }
        jsonParam.put("data", data);
        return jsonParam.toString();
    }

    //图片消息
    public String getCustomImage() {

        return "";
    }

    //语音消息
    public String getCustomVoice() {

        return "";
    }

    //视频消息
    public String getCustomVideo() {

        return "";
    }

    //音乐消息
    public String getCustomMusic() {

        return "";
    }

    //发送图文消息（点击跳转到外链） 图文消息条数限制在8条以内，注意，如果图文数超过8，则将会无响应。
    public String getCustomNews() {

        return "";
    }

    //卡券
    public String getCustomWxcard() {

        return "";
    }
}

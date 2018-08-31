package com.ryan.framework.util.wechat;

import com.alibaba.fastjson.JSONArray;
import com.whaty.core.framework.util.WhatyHttpClient;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.springframework.stereotype.Component;


import java.io.IOException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component("weChatAPIHelper")
public class WeChatAPIHelper {

    /**
     * 开发者ID(AppID)
     */
    private static final String APPID = "wxaa93d2b60b29a393";//网院在线
    /**
     * 开发者密码(AppSecret)
     */
    private static final String APPSECRET = "c08bf2aa910b6f54c062b26ad4d1efef";//网院在线
    /**
     * 获取token接口
     */
    private String getTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}";
    /**
     * 拉微信用户信息接口
     */
    private String getUserInfoUrl = "https://api.weixin.qq.com/cgi-bin/user/info?access_token={0}&openid={1}&lang=zh_CN";
    /**
     * 获取微信用户openID接口
     */
    private String getOpenIDArrUrl = "https://api.weixin.qq.com/cgi-bin/user/get?access_token={0}&next_openid={1}";
    /**
     * 主动推送信息接口,支持群发
     */
    private String sendMsgMassUrl = "https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token={0}";
    /**
     * 主动推送信息接口，客服发送接口
     */
    private String sendMsgOneUrl = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token={0}";
    /**
     * 查询群发消息发送状态
     */
    private String sendMsgStatusUrl = "https://api.weixin.qq.com/cgi-bin/message/mass/get?access_token={0}";

    /**
     * 获取公众号已创建的标签
     */
    private String queryTagsUrl = "https://api.weixin.qq.com/cgi-bin/tags/get?access_token={0}";

    /**
     * 获取标签下粉丝列表 地址
     */
    private String queryUserByTagUrl = "https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token={0}";


    /**
     * 模板发送信息接口
     */
    public final static String sendMsgTemplateUrl = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token={0}";

    private String templateIdShortUrl = "https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token={0}";

    private Log log = LogFactory.getLog(getClass());


    /**
     * Description:获取token
     *
     * @return
     * @author DateTime 2018-1-11 下午8:59:06
     */
    public String getToken() {
        String token = "";
        String url = MessageFormat.format(getTokenUrl, APPID, APPSECRET);
        WhatyHttpClient httpClient = new WhatyHttpClient();
        HttpClient hc = httpClient.initHttpClient();
        GetMethod getMethod = new GetMethod(url);
        try {
            int status = hc.executeMethod(getMethod);
            if (status == 200) {
                String info = getMethod.getResponseBodyAsString();
                net.sf.json.JSONObject json = net.sf.json.JSONObject.fromObject(info);
                token = json.getString("access_token");
            }
        } catch (HttpException e) {
            log.error("get  toekn exception", e);
            e.printStackTrace();
        } catch (IOException e) {
            log.error("get  toekn exception", e);
            e.printStackTrace();
        }
        return token;
    }


    public Map<String, Object> queryUserByTags(String token, String tagId, String nextOpenId){
        Map<String, Object> userTag = new HashMap<String, Object>();
        try {
            JSONObject jsonMessage = new JSONObject();
            jsonMessage.put("tagid", tagId);
            if(StringUtils.isNoneBlank(nextOpenId)){
                jsonMessage.put("next_openid", nextOpenId);
            }
            String respContent = null;
            StringEntity entity = new StringEntity(jsonMessage.toJSONString(), "utf-8");//解决中文乱码问题
            entity.setContentEncoding("UTF-8");
            entity.setContentType("application/json");
            HttpPost httpPost = new HttpPost(MessageFormat.format(queryUserByTagUrl, token));
            DefaultHttpClient client = new DefaultHttpClient();
            httpPost.setEntity(entity);
            HttpResponse resp = client.execute(httpPost);
            if (resp.getStatusLine().getStatusCode() == 200) {
                HttpEntity he = resp.getEntity();
                respContent = EntityUtils.toString(he, "UTF-8");
                JSONObject json = JSONObject.parseObject(respContent);
                JSONObject data = (JSONObject) JSONObject.toJSON(json.get("data"));
                userTag.put("nextOpenId", json.getString("next_openid"));
                JSONArray jsonArray = JSONObject.parseArray(JSONObject.toJSONString(data.get("openid")));
                userTag.put("openId", jsonArray.toArray());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return userTag;
    }

    /**
     * 获取公众号已创建的标签
     *
     * @param token
     * @return List<JSONObject>   jsonobject : {"id":1, "name":"每天一罐可乐星人", "count":0 //此标签下粉丝数 },
     */
    public List<JSONObject> queryTags(String token) {
        List<JSONObject> tags = null;
        String url = MessageFormat.format(queryTagsUrl, token);
        WhatyHttpClient httpClient = new WhatyHttpClient();
        HttpClient hc = httpClient.initHttpClient();
        GetMethod get = new GetMethod(url);
        try {
            int status = hc.executeMethod(get);
            if (status == 200) {
                String info = get.getResponseBodyAsString();
                JSONObject json = JSONObject.parseObject(info);
                JSONArray jsonArray = (JSONArray) json.get("tags");
                tags = JSONObject.parseArray(jsonArray.toJSONString(), JSONObject.class);
            }
        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return tags;
    }


    /**
     * Description:获取已关注用户OpenId
     *
     * @return
     * @author DateTime 2018-1-11 下午8:58:46
     */
    public List<String> getOpenId(String token) {
        List<String> openIdList = null;
        String url = MessageFormat.format(getOpenIDArrUrl, token, "");
        WhatyHttpClient httpClient = new WhatyHttpClient();
        HttpClient hc = httpClient.initHttpClient();
        GetMethod getOpenId = new GetMethod(url);
        net.sf.json.JSONArray openidArr = null;
        try {
            int status = hc.executeMethod(getOpenId);
            if (status == 200) {
                String info = getOpenId.getResponseBodyAsString();
                //System.out.println("token = " + info);
                net.sf.json.JSONObject json = net.sf.json.JSONObject.fromObject(info);
                net.sf.json.JSONObject data = net.sf.json.JSONObject.fromObject(json.get("data"));
                openidArr = data.getJSONArray("openid");
                String openIdStr = JSONObject.toJSONString(openidArr, SerializerFeature.WriteClassName);//将array数组转换成字符串
                openIdList = JSONObject.parseArray(openIdStr, String.class);//把字符串转换成集合
                //System.out.println(openIdList);
            }
        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return openIdList;
    }

    /**
     * Description:获取已关注用户信息
     *
     * @param openIdList
     * @return
     * @author DateTime 2018-1-11 下午8:58:29
     */
    public List getUserInfo(List<String> openIdList, String token) {
        List UseInforList = new ArrayList();
        String url = "";
        WhatyHttpClient httpClient = new WhatyHttpClient();
        HttpClient hc = httpClient.initHttpClient();
        try {
            for (String openId : openIdList) {
                url = MessageFormat.format(getUserInfoUrl, token, openId);
                //System.out.println(url);
                GetMethod userMethod = new GetMethod(url);
                int status = hc.executeMethod(userMethod);
                if (status == 200) {
                    String info = userMethod.getResponseBodyAsString();
                    net.sf.json.JSONObject json = net.sf.json.JSONObject.fromObject(info);
                    UseInforList.add(json);
                    //System.out.println("info = " + info);
                }
            }

        } catch (HttpException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return UseInforList;
    }

    /**
     * Description:根据编号获取模板ID实例
     *
     * @return status：SUCCESS（成功）|FALSE（失败）; template_id : 模板ID
     * @author DateTime 2018-1-11 下午9:52:19
     */
    public Map<String, String> getTemplateId(String token, String templateCode) {
        Map<String, String> msgInf = new HashMap<String, String>();
        try {
            JSONObject jsonMessage = new JSONObject();
            jsonMessage.put("template_id_short", templateCode);
            String respContent = null;
            StringEntity entity = new StringEntity(jsonMessage.toJSONString(), "utf-8");//解决中文乱码问题
            entity.setContentEncoding("UTF-8");
            entity.setContentType("application/json");
            HttpPost httpPost = new HttpPost(MessageFormat.format(templateIdShortUrl, token));
            DefaultHttpClient client = new DefaultHttpClient();
            httpPost.setEntity(entity);
            HttpResponse resp = client.execute(httpPost);
            if (resp.getStatusLine().getStatusCode() == 200) {
                HttpEntity he = resp.getEntity();
                respContent = EntityUtils.toString(he, "UTF-8");
                JSONObject json = JSONObject.parseObject(respContent);
                int errcode = (Integer) json.get("errcode");
                if (errcode == 0) {
                    msgInf.put("status", "SUCCESS");
                    msgInf.put("template_id", json.getString("template_id"));
                } else {
                    msgInf.put("status", "FALSE");
                    msgInf.put("template_id", "");
                }
            }
            //System.out.println("===respContent====" + respContent);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return msgInf;
    }


    /**
     * Description:单个发送消息
     *
     * @param url         支持客服URL，模板消息URL
     * @param jsonMessage 消息体
     * @return status：SUCCESS（成功）|FALSE（失败） ; msg_id：消息id
     * @author DateTime 2018-1-11 下午9:52:19
     */
    public Map<String, String> sendMsgToOne(String url, String jsonMessage, String token) {
        Map<String, String> msgInf = new HashMap<String, String>();
        try {
            String respContent = null;
            StringEntity entity = new StringEntity(jsonMessage, "utf-8");//解决中文乱码问题
            entity.setContentEncoding("UTF-8");
            entity.setContentType("application/json");
            HttpPost httpPost = new HttpPost(url);
            DefaultHttpClient client = new DefaultHttpClient();
            httpPost.setEntity(entity);
            HttpResponse resp = client.execute(httpPost);
            if (resp.getStatusLine().getStatusCode() == 200) {
                HttpEntity he = resp.getEntity();
                respContent = EntityUtils.toString(he, "UTF-8");
                JSONObject json = JSONObject.parseObject(respContent);
                int errcode = (Integer) json.get("errcode");
                if (errcode == 0) {
                    msgInf.put("status", "SUCCESS");
                } else {
                    msgInf.put("status", "FALSE");
                }
                if (json.get("msgid") != null) {
                    long msg_id = (Long) json.get("msgid");
                    msgInf.put("msg_id", msg_id + "");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return msgInf;
    }


    /**
     * Description:根据openID指定一部分人群发消息
     *
     * @param jsonMessage 消息体
     * @return status：SUCCESS（成功）|FALSE（失败） ; msg_id：消息id
     * @author DateTime 2018-1-11 下午8:58:09
     */
    public Map<String, String> sendMsgToMass(String jsonMessage, String token) {
        Map<String, String> msgInf = new HashMap<String, String>();
        try {
            String url = MessageFormat.format(sendMsgMassUrl, token, "");
            //System.out.println(jsonMessage);
            String respContent = null;
            StringEntity entity = new StringEntity(jsonMessage, "utf-8");//解决中文乱码问题
            entity.setContentEncoding("UTF-8");
            entity.setContentType("application/json");
            HttpPost httpPost = new HttpPost(url);
            DefaultHttpClient client = new DefaultHttpClient();
            httpPost.setEntity(entity);
            HttpResponse resp = client.execute(httpPost);
            if (resp.getStatusLine().getStatusCode() == 200) {
                HttpEntity he = resp.getEntity();
                respContent = EntityUtils.toString(he, "UTF-8");
                JSONObject json = JSONObject.parseObject(respContent);
                int errcode = (Integer) json.get("errcode");
                if (errcode == 0) {
                    msgInf.put("status", "SUCCESS");
                } else {
                    msgInf.put("status", "FALSE");
                }
                if (json.get("msg_id") != null) {
                    long msg_id = (Long) json.get("msg_id");
                    msgInf.put("msg_id", msg_id + "");
                }
            }
            //System.out.println("===respContent====" + respContent);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return msgInf;
    }


    /**
     * Description:根据消息id获取发送状态校验
     *
     * @param msgId
     * @return
     * @author DateTime 2018-1-11 下午9:23:06
     */
    public String getMsgStatus(String msgId, String token) {
        String status = "FALSE";
        try {
            String url = MessageFormat.format(sendMsgStatusUrl, token, "");
            //System.out.println(url);
            JSONObject jsonParam = new JSONObject();
            jsonParam.put("msg_id", msgId);
            //System.out.println(jsonParam.toString());
            String msgStatus = null;
            StringEntity entity = new StringEntity(jsonParam.toString(), "utf-8");//解决中文乱码问题
            entity.setContentEncoding("UTF-8");
            entity.setContentType("application/json");
            HttpPost httpPost = new HttpPost(url);
            DefaultHttpClient client = new DefaultHttpClient();
            httpPost.setEntity(entity);
            HttpResponse resp = client.execute(httpPost);
            if (resp.getStatusLine().getStatusCode() == 200) {
                HttpEntity he = resp.getEntity();
                msgStatus = EntityUtils.toString(he, "UTF-8");
                net.sf.json.JSONObject json = net.sf.json.JSONObject.fromObject(msgStatus);
                String msg_status = (String) json.get("msg_status");
                if ("SEND_SUCCESS".equals(msg_status)) {
                    status = "SUCCESS";
                }
            }
            //System.out.println("===msgStatus====" + msgStatus);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return status;
    }
}

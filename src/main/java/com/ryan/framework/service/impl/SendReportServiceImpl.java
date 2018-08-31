package com.ryan.framework.service.impl;

import com.alibaba.fastjson.JSONObject;
import com.ryan.framework.util.wechat.WeChatAPIHelper;
import com.whaty.core.commons.util.CommonUtils;
import com.ryan.framework.domain.Platform;
import com.ryan.framework.service.SendReportService;
import com.ryan.framework.service.expection.ServiceException;
import com.ryan.framework.util.email.MailSenderInfo;
import com.ryan.framework.util.email.SimpleMailSender;
import com.ryan.framework.util.phantomJS.PhantomJSUtil;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.phantomjs.PhantomJSDriver;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service("sendReportService")
public class SendReportServiceImpl implements SendReportService{

    @Resource
    WeChatAPIHelper weChatAPIHelper;

    @Resource
    Platform platform;

    @Resource
    SimpleMailSender simpleMailSender;

    @Resource
    PhantomJSUtil phantomJSUtil;

    @Override
    public void sendByEmail(String id, String title, List<String> user, String urlPath) throws ServiceException {

        StringBuilder content = new StringBuilder();

        String path = urlPath;
        try {

            String url = path + "/report/details/" + id;
            String img = platform.getImgPath() + id + ".png";
            createImg(url, img);
            content.append("<a href='").append(url).append("'>");
            content.append("    <img src='").append(path).append("/report/").append(id).append(".png'").append("/>");
//            content.append("    <img src='data:image/png;base64,").append(img).append("/>");
            content.append("</a>");
//            //System.out.println("content = " + content);
            MailSenderInfo mailInfo = new MailSenderInfo();
            mailInfo.setValidate(true);
            mailInfo.setToAddressList(user);
            mailInfo.setSubject(title);
            mailInfo.setContent(content.toString());
            //这个类主要来发送邮件
            simpleMailSender.sendHtmlMail(mailInfo);//发送文体格式
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 生成图片
     * @param url 访问地址
     * @return
     * @throws InterruptedException
     * @throws IOException
     */
    private final void createImg(String url, String imgUrl) throws InterruptedException, IOException {
        PhantomJSDriver driver = new PhantomJSDriver(phantomJSUtil.getInstance());
        driver.manage().window().maximize();
        driver.manage().window().setSize(new Dimension(1020,768));
        driver.get(url);
        Thread.sleep(1000);
        File file = driver.getScreenshotAs(OutputType.FILE);
        BufferedImage img = ImageIO.read(file);

        ImageIO.write(img, "png", new File(imgUrl));

//        return CommonUtil.encode(img, "png");
    }

    @Override
    public void sendByWechat(String id, String title, double learnTime, int learnNum, double teaTime, int teaNum) throws ServiceException {
        String token = weChatAPIHelper.getToken();

        JSONObject json = new JSONObject();
        json.put("template_id", "H3LHzPgtvJSlrLLGm9X0KwWXzr4_fSf2FORiLfvVnlk");
        json.put("url", platform.getDomain() + "/report/details/" + id);
//        json.put("url", "http://xlda.webtrn.cn/data/report/details/" + id);
        JSONObject data = new JSONObject();
        data.put("first", JSONObject.parse("{'value':'您好，数据报告已发布'}"));
        data.put("keyword1", JSONObject.parse("{'value':'运营周报'}"));
        data.put("keyword2", JSONObject.parse("{'value':'" + CommonUtils.dateToStr(new Date(), "yyyy-MM-dd HH:mm:ss") +"'}"));
        data.put("keyword3", JSONObject.parse("{'value':'本周学习时长为" + learnTime +"小时，学习人数为" + learnNum + "人；本周授课时长为" + teaTime + "小时，授课人数为" + teaNum +"人。'}"));
        data.put("remark", JSONObject.parse("{'value':'请点击详情查看。', 'color':'#173177'}"));
        json.put("data", data);

        Map<String, Object> users = weChatAPIHelper.queryUserByTags(token, "102", "");
        Object[] openId = (Object[]) users.get("openId");

        for(Object user : openId){
            json.put("touser", user);
            weChatAPIHelper.sendMsgToOne(MessageFormat.format(weChatAPIHelper.sendMsgTemplateUrl, token), json.toJSONString(), token);
        }
    }
}

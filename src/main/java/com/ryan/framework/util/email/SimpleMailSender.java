package com.ryan.framework.util.email;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Properties;

import javax.annotation.Resource;
import javax.mail.Address;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

@Component
public class SimpleMailSender {

    @Resource
    MailSenderInfo mailSenderInfo;

    /**
     * 以文本格式发送邮件
     *
     * @param mailInfo 待发送的邮件的信息
     */
    public boolean sendTextMail(MailSenderInfo mailInfo) {
        // 判断是否需要身份认证
        MyAuthenticator authenticator = null;
        Properties pro = mailSenderInfo.getProperties();
        if (mailSenderInfo.isValidate()) {
            // 如果需要身份认证，则创建一个密码验证器
            authenticator = new MyAuthenticator(mailSenderInfo.getUserName(), mailSenderInfo.getPassword());
        }
        // 根据邮件会话属性和密码验证器构造一个发送邮件的session
        Session sendMailSession = Session.getDefaultInstance(pro, authenticator);
        try {
            // 根据session创建一个邮件消息
            Message mailMessage = new MimeMessage(sendMailSession);
            // 创建邮件发送者地址
            Address from = new InternetAddress(mailSenderInfo.getFromAddress());
            // 设置邮件消息的发送者
            mailMessage.setFrom(from);
            // 创建邮件的接收者地址，并设置到邮件消息中
            if(StringUtils.isNotBlank(mailInfo.getToAddress())){
                Address to = new InternetAddress(mailInfo.getToAddress());
                mailMessage.setRecipient(Message.RecipientType.TO, to);
            }
            if(CollectionUtils.isNotEmpty(mailInfo.getToAddressList())){
                for(String addr : mailInfo.getToAddressList()){
                    mailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(addr));
                }
            }

            // 创建邮件的抄送地址，并设置到邮件消息中
            if(StringUtils.isNotBlank(mailInfo.getCcAddress())){
                String ccAddress = mailInfo.getCcAddress();
                mailMessage.setRecipient(Message.RecipientType.CC, new InternetAddress(ccAddress));
            }
            if(CollectionUtils.isNotEmpty(mailInfo.getCcAddressList())){
                for(String ccAddr : mailInfo.getCcAddressList()){
                    mailMessage.addRecipient(Message.RecipientType.CC, new InternetAddress(ccAddr));
                }
            }
            // 设置邮件消息的主题
            mailMessage.setSubject(mailInfo.getSubject());
            // 设置邮件消息发送的时间
            mailMessage.setSentDate(new Date());
            // 设置邮件消息的主要内容
            String mailContent = mailInfo.getContent();
            mailMessage.setText(mailContent);
            // 发送邮件
            Transport.send(mailMessage);
            return true;
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }
        return false;
    }

    /**
     * 以HTML格式发送邮件
     *
     * @param mailInfo 待发送的邮件信息
     */
    public boolean sendHtmlMail(MailSenderInfo mailInfo) {
        // 判断是否需要身份认证
        MyAuthenticator authenticator = null;
        Properties pro = mailSenderInfo.getProperties();
        //如果需要身份认证，则创建一个密码验证器
        if (mailSenderInfo.isValidate()) {
            authenticator = new MyAuthenticator(mailSenderInfo.getUserName(), mailSenderInfo.getPassword());
        }
        // 根据邮件会话属性和密码验证器构造一个发送邮件的session
        Session sendMailSession = Session.getDefaultInstance(pro, authenticator);
        try {
            // 根据session创建一个邮件消息
            Message mailMessage = new MimeMessage(sendMailSession);
            // 创建邮件发送者地址
            Address from = new InternetAddress(mailSenderInfo.getFromAddress());
            // 设置邮件消息的发送者
            mailMessage.setFrom(from);
            // 创建邮件的接收者地址，并设置到邮件消息中
            if(StringUtils.isNotBlank(mailInfo.getToAddress())){
                Address to = new InternetAddress(mailInfo.getToAddress());
                // Message.RecipientType.TO属性表示接收者的类型为TO
                mailMessage.setRecipient(Message.RecipientType.TO, to);
            }
            if(CollectionUtils.isNotEmpty(mailInfo.getToAddressList())){
                for(String addr : mailInfo.getToAddressList()){
                    mailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(addr));
                }
            }

            // 创建邮件的抄送地址，并设置到邮件消息中
            if(StringUtils.isNotBlank(mailInfo.getCcAddress())){
                String ccAddress = mailInfo.getCcAddress();
                mailMessage.setRecipient(Message.RecipientType.CC, new InternetAddress(ccAddress));
            }
            if(CollectionUtils.isNotEmpty(mailInfo.getCcAddressList())){
                for(String ccAddr : mailInfo.getCcAddressList()){
                    mailMessage.addRecipient(Message.RecipientType.CC, new InternetAddress(ccAddr));
                }
            }

            // 设置邮件消息的主题
            mailMessage.setSubject(mailInfo.getSubject());
            // 设置邮件消息发送的时间
            mailMessage.setSentDate(new Date());
            // MiniMultipart类是一个容器类，包含MimeBodyPart类型的对象
            Multipart mainPart = new MimeMultipart();
            // 创建一个包含HTML内容的MimeBodyPart
            BodyPart html = new MimeBodyPart();
            // 设置HTML内容
            html.setContent(mailInfo.getContent(), "text/html; charset=utf-8");
            mainPart.addBodyPart(html);
            // 将MiniMultipart对象设置为邮件内容
            mailMessage.setContent(mainPart);
            // 发送邮件
            Transport.send(mailMessage);
            return true;
        } catch (MessagingException ex) {
            ex.printStackTrace();
        }
        return false;
    }
}

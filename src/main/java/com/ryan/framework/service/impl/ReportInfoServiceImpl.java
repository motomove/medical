package com.ryan.framework.service.impl;


import com.ryan.framework.mapper.ReportInfoMapper;
import com.ryan.framework.service.ReportInfoService;
import com.ryan.framework.service.SendReportService;
import com.ryan.framework.util.CommonUtil;
import com.whaty.core.commons.util.CommonUtils;
import com.ryan.framework.service.expection.ServiceException;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service("reportInfoService")
public class ReportInfoServiceImpl implements ReportInfoService {

    @Resource
    ReportInfoMapper reportInfoMapper;

    @Resource
    SendReportService sendReportService;

    /**
     *  查询管理员用户信息
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryGetManager() throws ServiceException{
        List<Map<String, Object>>  list = reportInfoMapper.queryGetManagerList(null);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 报表—运营数据查询总数(周或者月)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryOperationsInfoDay(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = reportInfoMapper.queryOperationsInfoDayList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 报表—运营数据查询总数(年)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryOperationsInfoYear(String year) throws ServiceException{
        List<Map<String, Object>>  list = reportInfoMapper.queryOperationsInfoYearList(year);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 报表—运营数据查询最大值和日期
     * @return
     * @throws ServiceException
     */
    @Override
    public Map<String, Object> queryOperationsInfoMax(String startDate,String endDate) throws ServiceException {

        Map<String, Object> compositeRadar = reportInfoMapper.queryOperationsInfoMaxMap(startDate,endDate);

        String time = CommonUtils.dateToStr(new Date(), "yyyy-mm-dd");
        if(MapUtils.isEmpty(compositeRadar)){
            if(null == compositeRadar) {
                compositeRadar = new HashMap<>();
            }
            compositeRadar.put("total_bandwidth", "0");
            compositeRadar.put("operations_date",time);
        }
        return compositeRadar;
    }

    /**
     * 报表—服务数据查询
     * @return
     */
    @Override
    public  Map<String, Object>  queryServiceInfoDay(String statrDate,String endDate) throws ServiceException{

        Map<String, Object>  serviceInfo  = reportInfoMapper.queryServiceInfoDayMap(statrDate,endDate);

        return serviceInfo;
    }

    /**
     * 查询对应类型的模板信息
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryGetTemplateInfo(String templateType) throws ServiceException{
        List<Map<String, Object>>  list = reportInfoMapper.queryGetTemplateInfoList(templateType);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 查询对应类型的报表配置是否存在
     * @return
     * @throws ServiceException
     */
    @Override
    public String queryReportType(String reportType) throws ServiceException{

        String id = "";
        Map<String, Object>  map  = reportInfoMapper.queryReportTypeID(reportType);
        if(MapUtils.isNotEmpty(map)){
            id = map.get("id").toString();
        }
        return id;
    }

    /**
     * 保存报告设置的信息
     * @return
     */
    @Override
    public String saveReportSettingInfo(String reportDataType,String reportType,String receiveType,String sendType,
                                        String startDate,String endDate,String receivePeople,
                                        String managerIds,String templateId) throws ServiceException{

        String id = "";
        Map<String, Object>  map  = reportInfoMapper.queryReportTypeID(reportType);
        if(MapUtils.isNotEmpty(map)){
            id = map.get("id").toString();
        }
        int count = 0;
        if(StringUtils.isBlank(id)){
            count = reportInfoMapper.insertReportSettingInfo(Integer.parseInt(reportType),reportDataType,receiveType,Integer.parseInt(sendType),
                    startDate,endDate,receivePeople,managerIds,templateId);
        }else{
            count = reportInfoMapper.saveReportSettingInfo(reportDataType,receiveType,Integer.parseInt(sendType),startDate,endDate,receivePeople,
                    managerIds,templateId,id);
        }
       if(count > 0){
           return "设置成功！";
       }else{
           return "设置失败！请联系管理员！";
       }
    }

    /**
     * 查询对应的配置信息
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryGetReportSettingInfo(String reportSetType) throws ServiceException{
        List<Map<String, Object>>  list = reportInfoMapper.queryGetReportSettingInfoList(reportSetType);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 查询报表列表
     * @return
     */
    @Override
    public List<Map<String, Object>> queryReportListInfo(String condition,int curPage) throws ServiceException{
        List<Map<String, Object>>  list = reportInfoMapper.queryReportListInfoList(condition,(curPage-1)*6);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 查询报表列表总数
     * @return
     */
    @Override
    public Integer queryReportListInfoTotal(String condition) throws ServiceException{

        Integer  totalNumber = reportInfoMapper.queryReportListInfoTotallNumber(condition);
        if(null == totalNumber){
            totalNumber = 0;
        }
        return totalNumber;
    }

    /**
     * 定时发布数据报告()
     * dataType 报告数据类型 0:周报、1：月报、2：年报
     * reportType 报告类型 0:运营、1：招生、2：财务
     * */
    @Override
    public void sendReortInformation(String dataType,String reportType, String url) throws ServiceException{
        String startDate = "";  //开始时间
        String endDate="";      //结束时间

        //给据报告的类型查询开始和结束时间
        if("0".equals(dataType)){
            String[] date = getLastTimeInterval();
            startDate = date[0];
            endDate = date[1];
        }else if("1".equals(dataType)){
            String[] date =  getLastMonthInterval();
            startDate = date[0];
            endDate = date[1];
        }else{
            Calendar c = Calendar.getInstance();
            int year = c.get(Calendar.YEAR) - 1;
            startDate = year + "-01-01";
            endDate = year + "-12-31";
        }

        //查询对应报表类型的配置信息
        List<Map<String, Object>>  list = reportInfoMapper.queryGetReportSettingInfoList(reportType);
        if(null != list && list.size() > 0) {
            Map<String, Object> map = list.get(0);
            String week = map.get("week").toString();                         //是否发周报
            String month = map.get("month").toString();                       //是否发月报
            String year = map.get("year").toString();                         //是否发年报
            String receiveDateType = map.get("receiveDateType").toString();  //发送的时间类型
            String email = CommonUtil.fixNull(map.get("receiveTypeEmail"), "0");
            String wechat = CommonUtil.fixNull(map.get("wechat"), "0");
            String reportEndDate = null;
            String users = CommonUtil.fixNull(map.get("receive_manger_id"), "");
            if("1".equals(receiveDateType)){
               reportEndDate = map.get("endDate").toString();             //发送的截止时间
            }

            //判断是否按设置的时间发送
            if("1".equals(receiveDateType)){
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    Date endDateTime = sdf.parse(endDate);
                    Date reportEndDateTime = sdf.parse(reportEndDate);

                    //结束日期在设置的时间之前
                    if(endDateTime.before(reportEndDateTime)){
                        if("0".equals(dataType) && "1".equals(week)){
                            setReortInformation(dataType,reportType,startDate,endDate,"周报", email, wechat, users, url);
                        }
                        if("1".equals(dataType) && "1".equals(month)){
                            setReortInformation(dataType,reportType,startDate,endDate,"月报", email, wechat, users, url);
                        }
                        if("2".equals(dataType) && "1".equals(year)){
                            setReortInformation(dataType,reportType,startDate,endDate,"年报", email, wechat, users, url);
                        }
                    }
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }else{
                if("0".equals(dataType) && "1".equals(week)){
                    setReortInformation(dataType,reportType,startDate,endDate,"周报", email, wechat, users, url);
                }
                if("1".equals(dataType) && "1".equals(month)){
                    setReortInformation(dataType,reportType,startDate,endDate,"月报", email, wechat, users, url);
                }
                if("2".equals(dataType) && "1".equals(year)){
                    setReortInformation(dataType,reportType,startDate,endDate,"年报", email, wechat, users, url);
                }
            }
        }

    }


    /**
     * 根据当前日期获得上周的日期区间（上周周一和周日日期）
     *
     * @return
     * @author zhaoxuepu
     */
    public String[] getLastTimeInterval() {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar1 = Calendar.getInstance();
        Calendar calendar2 = Calendar.getInstance();
        int dayOfWeek = calendar1.get(Calendar.DAY_OF_WEEK) - 1; //获得当前日期是一个星期的第几天减1
        int offset1 = 1 - dayOfWeek;
        int offset2 = 7 - dayOfWeek;
        calendar1.add(Calendar.DATE, offset1 - 7);
        calendar2.add(Calendar.DATE, offset2 - 7);
        String lastBeginDate = sdf.format(calendar1.getTime());
        String lastEndDate = sdf.format(calendar2.getTime());
        String[] str = new String[2];
        str[0] = lastBeginDate;
        str[1] = lastEndDate;
        return str;
    }

    /**
     * 根据当前日期获得上个月的日期区间
     *
     * @return
     * @author zhaoxuepu
     */
    public String[] getLastMonthInterval() {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c = Calendar.getInstance();
        String[] str = new String[2];

        //昨天的日期
        c.setTime(new Date());
        c.add(Calendar.DATE, - 1);
        Date d = c.getTime();
        String day = sdf.format(d);
        str[1] = day;

        //上个月的第一天
        c.setTime(new Date());
        c.add(Calendar.MONTH, -1);
        Date m = c.getTime();
        String mon = sdf.format(m);
        str[0] = mon;

        return str;
    }

    /**
     * 定时发布数据报告()
     * dataType 报告数据类型 0:周报、1：月报、2：年报
     * reportType 报告类型 0:运营、1：招生、2：财务
     * */
    public void setReortInformation(String dataType,String reportType,String startDate,String endDate,
                                    String dateNameType, String email, String wechat, String users, String url) throws ServiceException{
        String id= "";                                              //id
        String name = "";                                           //报告名称
        String code = "";                                          //报告编号
        int report_type = Integer.parseInt(reportType);            //报告类型
        int send_type =  Integer.parseInt(dataType);              //报告发送类型
        int reportNo = 1;                                         //每个类型的报告序号
        double learn_time = 0;                       //学习时间
        double learn_time_rate = 0;                  //学习时间增长率
        int learn_number = 0;                         //学习人数
        double learn_number_rate = 0;                //学习人数增长率
        double teach_time = 0;                        //授课时长
        double teach_time_rate = 0;                   //授课时长增长率
        int teach_number = 0;                         //授课人数
        double teach_number_rate = 0;                  //授课人数增长率
        double total_bandwidth = 0;                    //带宽总量
        double total_bandwidth_rate = 0;               //带宽总量增长率
        double max_bandwidth = 0;                      //最大带宽
        String max_bandwidth_date = null;               //最大带宽日期
        int attack_number = 0;                         //遭受的攻击次数
        int interception_number = 0;                  //成功拦截的次数
        double minute_interception_number = 0;       //平均每分钟拦截的次数
        int remind_manager_number = 0;               //提醒管理员的次数
        int remind_student_number = 0;               //提醒学生的次数
        int remind_teacher_number = 0;               //提醒教师的次数
        int early_warning_number = 0;               //预警次数


        //查询总学习时长信息
        Map<String, Object> learnMap = reportInfoMapper.queryTotalLearnTime(startDate,endDate);
        if(learnMap != null && learnMap.get("learnTime") != null){
            learn_time = Double.parseDouble(learnMap.get("learnTime").toString());
            learn_number = Integer.parseInt(learnMap.get("studentNumber").toString());
        }

        //查询总教学时长
        Map<String, Object> teachMap = reportInfoMapper.queryTeachLearnTime(startDate,endDate);
        if(teachMap != null && teachMap.get("teachingTime") != null){
            teach_time = Double.parseDouble(teachMap.get("teachingTime").toString());
            teach_number = Integer.parseInt(teachMap.get("studentNumber").toString());
        }

        //查询运营总数
        List<Map<String, Object>>  operationsList = reportInfoMapper.queryOperationsInfoDayList(startDate,endDate);
        if(operationsList != null && operationsList.size() > 0 && operationsList.get(0).get("totalBandwidth") != null){
            Map<String, Object> map = operationsList.get(0);
            total_bandwidth = Double.parseDouble(map.get("totalBandwidth").toString());
            attack_number = Integer.parseInt(map.get("attackNumber").toString());
            interception_number = (int)Double.parseDouble(map.get("interceptionNumber").toString());
            minute_interception_number = Double.parseDouble(map.get("minuteInterceptionNumber").toString());
        }

        //查询运营最大值和日期
        Map<String, Object> operationsMap = reportInfoMapper.queryOperationsInfoMaxMap(startDate,endDate);
        if(operationsMap != null  && operationsMap.get("total_bandwidth") != null){
            max_bandwidth = Double.parseDouble(operationsMap.get("total_bandwidth").toString());
            max_bandwidth_date = operationsMap.get("operations_date").toString();
        }

        //查询服务总数
        Map<String, Object> serviceMap = reportInfoMapper.queryServiceInfoDayMap(startDate,endDate);
        if(serviceMap != null  && serviceMap.get("remindManagerNumber") != null){
            remind_manager_number = Integer.parseInt(serviceMap.get("remindManagerNumber").toString());
            remind_student_number = Integer.parseInt(serviceMap.get("remindStudentNumber").toString());
            remind_teacher_number = Integer.parseInt(serviceMap.get("remindTeacherNumber").toString());
            early_warning_number = Integer.parseInt(serviceMap.get("earlyWarningNumber").toString());
        }

        //查询对应类型上次添加的数据
        Map<String, Object> reportMap = reportInfoMapper.queryReportCotentInfo(dataType,reportType);
        if(reportMap != null && reportMap.get("reportNo") != null){
            int report_no = Integer.parseInt(reportMap.get("reportNo").toString());
            double learnTime = Double.parseDouble(reportMap.get("learn_time").toString());
            int learnNumber = Integer.parseInt(reportMap.get("learn_number").toString());
            double teachTime = Double.parseDouble(reportMap.get("teach_time").toString());
            int teachNumber = Integer.parseInt(reportMap.get("teach_number").toString());
            double totalBandwidth = Double.parseDouble(reportMap.get("teach_number").toString());

            reportNo = report_no + 1;    //序号加1

            DecimalFormat df = new DecimalFormat("#.0");
            learn_time_rate = Double.parseDouble(df.format(learn_time/learnTime)) - 1;                     //学习时长增长数
            learn_number_rate = Double.parseDouble(df.format(learn_number/learnNumber)) - 1;               //学生人数增长数
            teach_time_rate  = Double.parseDouble(df.format(teach_time/teachTime)) - 1;                    //教学时长增长数
            teach_number_rate  = Double.parseDouble(df.format(teach_number/teachNumber))  - 1;              //教学人数增长数
            total_bandwidth_rate  = Double.parseDouble(df.format(total_bandwidth/totalBandwidth)) - 1;     //带宽增长数

        }

        //格式换当前时间，和类型组合作为编号
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        String dateCode = sdf.format(new Date());
        code = dateCode + reportType + dataType;
        String nameTime = "(" + startDate.substring(0,4) + "."+ startDate.substring(5,7) + "."+ startDate.substring(8,10)+"-"+
                endDate.substring(5,7) + "."+ endDate.substring(8,10)+")";
        if("0".equals(reportType)){
            name = "运营" + dateNameType + nameTime;
        }else if("1".equals(reportType)){
            name = "招生" + dateNameType + nameTime;
        }else{
            name = "财务" + dateNameType + nameTime;
        }

        id = getUUID();

        //保存报表信息
        int count = reportInfoMapper.insertReportcontentInfo(id,name,code,report_type,send_type,reportNo,startDate,endDate,
                learn_time,learn_time_rate,learn_number,learn_number_rate,teach_time,teach_time_rate,teach_number,teach_number_rate,
                total_bandwidth,total_bandwidth_rate,max_bandwidth,max_bandwidth_date,attack_number,interception_number,
                minute_interception_number,remind_manager_number,remind_student_number,remind_teacher_number,early_warning_number);

        if(count >0 ){
            //微信推送
            if(StringUtils.equals("1", wechat)){
                sendReportService.sendByWechat(id, name, learn_time, learn_number, teach_time, teach_number);
            }

            //发送邮件
            if(StringUtils.equals("1", email)){
                users = "'" + users.replaceAll(",", "', '") + "'";
                List<Map<String, Object>> userList = reportInfoMapper.queryGetManagerList(users);
                List<String> uList = new ArrayList<>();
                if(CollectionUtils.isNotEmpty(userList)){
                    for(Map<String, Object> user : userList){
                        uList.add(CommonUtil.fixNull(user.get("email"), ""));
                    }
                }


                sendReportService.sendByEmail(id, name, uList, url);
            }
        }else{
            System.err.println("报告添加失败！");
        }

    }

    public String getUUID(){
        UUID uuid=UUID.randomUUID();
        String str = uuid.toString();
        String uuidStr=str.replace("-", "");
        return uuidStr;
    }
}

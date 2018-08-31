package com.ryan.framework.mapper;

import org.apache.ibatis.annotations.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 平台概况
 *
 * @author 郭少飞
 */
@Mapper
public interface ReportInfoMapper {

    /**
     * 报表—学习时长的综合
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select ROUND(SUM(learn_time)/60,1) learnTime, SUM(student_number) studentNumber ",
            " from xl_data_learn_day where learn_date <=#{endDate} and learn_date >= #{statrDate} "})
    @ResultType(HashMap.class)
    Map<String, Object> queryTotalLearnTime(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 报表—教师授课时长的综合
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select ROUND(SUM(teaching_time)/60,1) teachingTime, SUM(teacher_number) studentNumber ",
            " from xl_data_teacher_teaching_hours where teaching_date <=#{endDate} and teaching_date >= #{statrDate} "})
    @ResultType(HashMap.class)
    Map<String, Object> queryTeachLearnTime(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 报表—查询对应类型的报告上次存贮的值
     * @param dataType
     * @param reportType
     * @return
     */
    @Select({"select id,MAX(reportNo) reportNo,learn_time,learn_number,teach_time,teach_number,total_bandwidth ",
            " from xl_data_report_content where report_type = #{reportType} and send_type = #{dataType} "})
    @ResultType(HashMap.class)
    Map<String, Object> queryReportCotentInfo(@Param("dataType") String dataType,@Param("reportType") String reportType);

    /**
     * 插入报表详细表
     * @param id
     * @param name
     * @param code
     * @param reportType
     * @param sendType
     * @param reportNo
     * @param startDate
     * @param endDate
     * @param learnTime
     * @param learnTimeRate
     * @param learnNumber
     * @param learnNumberRate
     * @param teachTime
     * @param teachTimeRate
     * @param teachNumber
     * @param teachNumberRate
     * @param totalBandwidth
     * @param totalBandwidthRate
     * @param maxBandwidth
     * @param maxBandwidthDate
     * @param attackNumber
     * @param interceptionNumber
     * @param minuteInterceptionNumber
     * @param remindManagerNumber
     * @param remindStudentNumber
     * @param remindTeacherNumber
     * @param earlyWarningNumber
     *
     */
    @Insert({" INSERT INTO xl_data_report_content (id, name, code, report_type, send_type, reportNo, start_date, end_date," +
            " learn_time, learn_time_rate, learn_number, learn_number_rate, teach_time, teach_time_rate, teach_number, teach_number_rate," +
            " total_bandwidth, total_bandwidth_rate, max_bandwidth, max_bandwidth_date, attack_number, interception_number, " +
            "minute_interception_number, remind_manager_number, remind_student_number, remind_teacher_number, early_warning_number) ",
            "  VALUES (#{id}, #{name},  #{code},  #{reportType}, #{sendType},  #{reportNo},#{startDate},#{endDate},#{learnTime}, " +
                    " #{learnTimeRate},  #{learnNumber}, #{learnNumberRate}, #{teachTime}, #{teachTimeRate}, #{teachNumber}, #{teachNumberRate}" +
                    ", #{totalBandwidth}, #{totalBandwidthRate}, #{maxBandwidth}, #{maxBandwidthDate}, #{attackNumber}, #{interceptionNumber}" +
                    ", #{minuteInterceptionNumber}, #{remindManagerNumber}, #{remindStudentNumber}, #{remindTeacherNumber}, #{earlyWarningNumber}) "})
    int insertReportcontentInfo( @Param("id")  String id,@Param("name")  String name,@Param("code")  String code,@Param("reportType") int reportType,@Param("sendType") int sendType,
                                 @Param("reportNo") int reportNo, @Param("startDate")  String startDate, @Param("endDate") String endDate, @Param("learnTime") double learnTime,
                                 @Param("learnTimeRate") double learnTimeRate, @Param("learnNumber") int learnNumber, @Param("learnNumberRate") double learnNumberRate,
                                 @Param("teachTime") double teachTime, @Param("teachTimeRate") double teachTimeRate, @Param("teachNumber") int teachNumber,
                                 @Param("teachNumberRate") double teachNumberRate,@Param("totalBandwidth") double totalBandwidth, @Param("totalBandwidthRate") double totalBandwidthRate,
                                 @Param("maxBandwidth") double maxBandwidth,@Param("maxBandwidthDate") String maxBandwidthDate, @Param("attackNumber") int attackNumber,
                                 @Param("interceptionNumber") int interceptionNumber, @Param("minuteInterceptionNumber") double minuteInterceptionNumber,
                                 @Param("remindManagerNumber") int remindManagerNumber, @Param("remindStudentNumber") int remindStudentNumber,
                                 @Param("remindTeacherNumber") int remindTeacherNumber, @Param("earlyWarningNumber") int earlyWarningNumber);

    /**
     * 查询管理员用户信息
     * @return
     */
//    @Select({"<script>",
//            " select id, login_id,name,wechat_id,email,binding_wechat from  xl_data_manager",
//            "<if test='null != ids and \"\" != ids'>",
//            " where id in ",
//            "   <foreach collection='ids' index='index' item='item' open='(' separator=',', close=')'>",
//            "   #{item}",
//            "   </foreach>",
//            "</if>",
//            "</script>"})
    @Select({"<script>",
            " select id, login_id,name,wechat_id,email,binding_wechat from  xl_data_manager",
            "<if test='null != ids and \"\" != ids'>",
            " where id in (${ids}) ",
            "</if>",
            "</script>"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryGetManagerList(@Param("ids") String ids);

    /*@Select({"<script>",
            "select grade_name,cast((sum(total_score)/sum(student_number)) as decimal(10,1)) averageScore ",
            " from  xl_data_total_socre_analysis where 1 = 1 ",
            "<if test='null != siteName and \"\" != siteName'> and site_name = #{siteName} </if>",
            "<if test='null != majorName and \"\" != siteName'> and major_name = #{majorName} </if>",
            "<if test='null != eduName and \"\" != siteName'> and edu_name = #{eduName} </if>",
            " group by grade_name",
            "</script>"})*/


    /**
     * 报表—运营数据查询总数(周或者月)
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select SUM(total_bandwidth) totalBandwidth, SUM(attack_number) attackNumber,SUM(interception_number) interceptionNumber, " +
            " ROUND(SUM(minute_interception_number)/count(1),1) minuteInterceptionNumber  ",
            " from xl_data_operations_info where operations_date <=#{endDate} and operations_date >= #{statrDate} "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryOperationsInfoDayList(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 报表—运营数据查询总数(年)
     * @param year
     * @return
     */
    @Select({"select DATE_FORMAT(operations_date,'%m') operationsDate,SUM(total_bandwidth) totalBandwidth, SUM(attack_number) attackNumber," +
            "SUM(interception_number) interceptionNumber,ROUND(SUM(minute_interception_number)/count(1),1) minuteInterceptionNumber ",
            "  FROM xl_data_operations_info where operations_date <=CONCAT(#{year},'-12-31') and operations_date >= CONCAT(#{year},'-01-01') " +
                    " GROUP BY DATE_FORMAT(operations_date,'%m') ORDER BY operationsDate "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryOperationsInfoYearList(@Param("year") String year);


    /**
     * 报表—运营数据查询最大值和日期
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select DATE_FORMAT(operations_date,'%Y-%m-%d') operations_date,MAX(total_bandwidth) total_bandwidth   ",
            " from xl_data_operations_info where operations_date <=#{endDate} and operations_date >= #{statrDate} "})
    @ResultType(HashMap.class)
    Map<String, Object> queryOperationsInfoMaxMap(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 报表—服务数据查询
     * @param statrDate
     * @param endDate
     * @return
     */
    @Select({"select SUM(remind_manager_number) remindManagerNumber,SUM(remind_student_number) remindStudentNumber, " +
            "SUM(remind_teacher_number) remindTeacherNumber,SUM(early_warning_number) earlyWarningNumber ",
            " from xl_data_service_info where service_date <=#{endDate} and service_date >= #{statrDate} "})
    @ResultType(HashMap.class)
    Map<String, Object> queryServiceInfoDayMap(@Param("statrDate") String statrDate,@Param("endDate") String endDate);

    /**
     * 查询对应类型的模板信息
     * @param templateType
     * @return
     */
    @Select({"select id, name,code,photo ",
            "  from  xl_data_report_template where template_type = #{templateType} order by template_order  "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryGetTemplateInfoList(@Param("templateType") String templateType);

    /**
     * 查询对应类型的模板信息
     * @param reportType
     * @return
     */
    @Select({"select id,report_type  ",
            "  from xl_data_report_configuration where report_type = #{reportType} LIMIT 0,1  "})
    @ResultType(HashMap.class)
    Map<String, Object> queryReportTypeID(@Param("reportType") String reportType);

    /**
     * 更新报表配置信息
     * @param reportDataType
     * @param receiveType
     * @param sendType
     * @param startDate
     * @param endDate
     * @param receivePeople
     * @param managerIds
     * @param templateId
     * @param id
     */
    @Update({"update xl_data_report_configuration set report_date_type = #{reportDataType},receive_type=#{receiveType}, " +
            "receive_date_type=#{sendType},receive_startdate = #{startDate},receive_enddate=#{endDate}, " +
            "receive_people =#{receivePeople},fk_report_template_id = #{templateId}, receive_manger_id = #{managerIds} where id = #{id} "})
    int saveReportSettingInfo(@Param("reportDataType") String reportDataType, @Param("receiveType") String receiveType, @Param("sendType") int sendType,
                  @Param("startDate")  String startDate, @Param("endDate") String endDate, @Param("receivePeople") String receivePeople,
                  @Param("managerIds") String managerIds, @Param("templateId") String templateId, @Param("id") String id);


    /**
     * 插入报表配置信息
     * @param reportType
     * @param reportDataType
     * @param receiveType
     * @param sendType
     * @param startDate
     * @param endDate
     * @param receivePeople
     * @param templateId
     */
    @Insert({" INSERT INTO xl_data_report_configuration (id, report_type, report_date_type, receive_type, receive_date_type, " +
            " receive_startdate, receive_enddate, receive_people,receive_manger_id, fk_report_template_id)",
            "  VALUES (UUID(), #{reportType},  #{reportDataType},  #{receiveType}, #{sendType},  #{startDate}, " +
            " #{endDate},  #{receivePeople}, #{managerIds}, #{templateId}) "})
    int insertReportSettingInfo( @Param("reportType") int reportType,@Param("reportDataType") String reportDataType, @Param("receiveType") String receiveType, @Param("sendType") int sendType,
                                 @Param("startDate")  String startDate, @Param("endDate") String endDate, @Param("receivePeople") String receivePeople,
                                 @Param("managerIds") String managerIds, @Param("templateId") String templateId);

    /**
     * 查询对应类型的模板信息
     * @param reportSetType
     * @return
     */
    @Select({"select rc.id id,rc.report_type reportType,left(rc.report_date_type,1) week,substring(rc.report_date_type,2,1) month, " +
            " right(rc.report_date_type,1) year,left(rc.receive_type,1) receiveTypeEmail,right(rc.receive_type,1) wechat, " +
            " receive_date_type receiveDateType,DATE_FORMAT(rc.receive_startdate,'%Y-%m-%d') startDate,DATE_FORMAT(rc.receive_enddate,'%Y-%m-%d') endDate, " +
            " rc.receive_people receivePeople,rt.code code, receive_manger_id  ",
            " from xl_data_report_configuration rc,xl_data_report_template rt where rc.fk_report_template_id = rt.id and rc.report_type = #{reportSetType} "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryGetReportSettingInfoList(@Param("reportSetType") String reportSetType);

    /**
     * 查询报表列表
     * @param condition
     * @param curPage
     * @return
     */
    @Select({"select id,name,code,report_type,send_type,reportNo,learn_time,learn_number,teach_time, " +
            " teach_number,DATE_FORMAT(create_date,'%Y.%m.%d %H:%i') createDate   ",
            " from xl_data_report_content  where 1=1 ${condition} order by create_date desc LIMIT #{curPage},6"})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryReportListInfoList(@Param("condition") String condition,@Param("curPage") int curPage);

    /**
     * 查询报表列表总数
     * @condition condition
     * @return
     */
    @Select({"select  count(1) totalNumber ",
            " from xl_data_report_content  where 1=1 ${condition} "})
    @ResultType(Integer.class)
    Integer queryReportListInfoTotallNumber(@Param("condition") String condition);

    /**
     * 查询内容
     * @param id
     * @return
     */
    @Select({"select id, name, code, start_date, end_date, send_type, report_type ",
            " , learn_time, learn_time_rate, learn_number, learn_number_rate",
            " , teach_time, teach_time_rate, teach_number, teach_number_rate",
            " ,total_bandwidth, total_bandwidth_rate, max_bandwidth, max_bandwidth_date",
            " , attack_number, interception_number, minute_interception_number, remind_manager_number",
            " , remind_student_number, remind_teacher_number, early_warning_number ",
            " from xl_data_report_content where id = #{id} "})
    @ResultType(HashMap.class)
    Map<String, Object> queryDetails(@Param("id") String id);

    @Select({"select id, name from xl_data_report_content ",
            " where report_type = #{report_type} and send_type = #{send_type}",
            " order by create_date desc limit 5 "})
    @ResultType(HashMap.class)
    List<Map<String, Object>> queryTop5(@Param("report_type") String report_type, @Param("send_type") String send_type);

    /**
     * 根据日期获取需要推送的报告
     * @param date
     * @return
     */
    @ResultType(HashMap.class)
    Map<String, Object> queryDetailsByDate(@Param("date") String date);

}

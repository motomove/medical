package com.ryan.framework.service.impl;


import com.ryan.framework.mapper.PlatformInfoMapper;
import com.ryan.framework.service.PlatformInfoService;
import com.ryan.framework.service.expection.ServiceException;
import com.ryan.framework.util.CommonUtil;
import org.apache.commons.collections.MapUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.*;

@Service("platformInfoService")
public class PlatformInfoServiceImpl implements PlatformInfoService {

    @Resource
    PlatformInfoMapper platformInfoMapper;

    /**
     * 招生分析-招生人数分布(周或者月)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryRecruitInfoDay(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryRecruitInfoDayList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 招生分析-招生人数分布(年)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryRecruitInfoYear(String year) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryRecruitInfoYearList(year);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 招生分析-学习中心招生实时统计
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySiteRecruitRealStatistics() throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.querySiteRecruitRealStatisticsList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 招生分析-历年数据查询
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryPreviousYearsRecruitInfo(String bantchName) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryPreviousYearsRecruitInfoList(bantchName);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 招生分析-学习中心统计
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySiteRecruitStatistics(String bantchName) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.querySiteRecruitStatisticsList(bantchName);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 招生分析-专业统计
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryMajorRecruitStatistics(String bantchName) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryMajorRecruitStatisticsList(bantchName);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 招生分析-总体数据分析
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTotalBantchInfo() throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryTotalBantchInfoList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 查询每日学习时长
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryLearnDay() throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.learnTimeDay();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 查询每日学习时长
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryOnlineNumber() throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.onlineNumbers();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 活跃人数地域分布
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryActivityDistribution() throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryActivityDistributionList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 学习中心新生人数分布
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySiteNewStudentDistribution() throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryquerySiteNewStudentDistributionList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 新生专业分布
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryStudentMajorNumber() throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryStudentMajorNumberList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 课程年度更新率
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryCourseYearUpdateRate(String year) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryCourseYearUpdateRateList(year);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-首页学习时长(周或者月)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTotalLearnDay(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryTotalLearnDayList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-首页学习时长(年)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTotalLearnYear(String year) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryTotalLearnYearList(year);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-人均学习时长(周或者月)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryAverageLearnDay(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryAverageLearnDayList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-人均学习时长(年)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryAverageLearnYear(String year) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryAverageLearnYearList(year);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-学生学习时间分布(周或者月)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryLeranTimeDistributed(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryLeranTimeDistributedList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-学生学习时间分布(年)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryLeranTimeDistributedYear(String year) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryLeranTimeDistributedYearList(year);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-学生学习时间段分布
     * @return
     * @throws ServiceException
     */
    @Override
    public Map<String, Object> queryPeriodDistributed(String statrDate,String endDate) throws ServiceException {

        Map<String, Object> periodDistributed = platformInfoMapper.queryPeriodDistributedMap(statrDate,endDate);
        if(MapUtils.isEmpty(periodDistributed)){
            if(null == periodDistributed) {
                periodDistributed = new HashMap<>();
            }
            periodDistributed.put("1a", "0");
            periodDistributed.put("2a", "0");
            periodDistributed.put("3a", "0");
            periodDistributed.put("4a", "0");
            periodDistributed.put("5a", "0");
            periodDistributed.put("6a", "0");
            periodDistributed.put("7a", "0");
            periodDistributed.put("8a", "0");
            periodDistributed.put("9a", "0");
            periodDistributed.put("10a", "0");
            periodDistributed.put("11a", "0");
            periodDistributed.put("12a", "0");
            periodDistributed.put("1p", "0");
            periodDistributed.put("2p", "0");
            periodDistributed.put("3p", "0");
            periodDistributed.put("4p", "0");
            periodDistributed.put("5p", "0");
            periodDistributed.put("6p", "0");
            periodDistributed.put("7p", "0");
            periodDistributed.put("8p", "0");
            periodDistributed.put("9p", "0");
            periodDistributed.put("10p", "0");
            periodDistributed.put("11p", "0");
            periodDistributed.put("12p", "0");
        }
        return periodDistributed;
    }

    /**
     * 基础分析-课程学习总用时
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryCourseLearnTime(String semesterName) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryCourseLearnTimeList(semesterName);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-学习中心总学习时长
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySiteTotalLearnTime(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.querySiteTotalLearnTimeList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-学习中心平均学习时长
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySiteAverageLearnTime(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.querySiteAverageLearnTimeList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-学习中心上线率
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySiteOnlineRate(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.querySiteOnlineRateList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-学习详细数据表格
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySiteDateTable(String statrDate,String endDate,int curPage) throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.querySiteDateTableList(statrDate,endDate,(curPage-1)*10);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 基础分析-学习详细数据表格总数
     * @return
     */
    @Override
    public Integer querySiteDateTableTotal(String statrDate,String endDate) throws ServiceException{

        Integer  totalNumber = platformInfoMapper.querySiteDateTableTotalNumber(statrDate,endDate);
        if(null == totalNumber){
            totalNumber = 0;
        }
        return totalNumber;
    }

    /**
     * 学习成绩- 课程成绩分析
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySocreAnalysis(String semesterName,int curPage) throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.querySocreAnalysisList(semesterName,(curPage-1)*10);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 学习成绩- 课程成绩分析总数
     * @return
     */
    @Override
    public Integer querySocreAnalysisTotal(String semesterName) throws ServiceException{

        Integer  totalNumber = platformInfoMapper.querySocreAnalysisTotalNumber(semesterName);
        if(null == totalNumber){
            totalNumber = 0;
        }
        return totalNumber;
    }

    /**
     * 学习成绩- 学习中心平均成绩
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySiteSocreAnalysis(String semesterName,int curPage) throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.querySiteSocreAnalysisList(semesterName,(curPage-1)*10);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 学习成绩- 学习中心平均成绩总数
     * @return
     */
    @Override
    public Integer querySiteSocreAnalysisTotal(String semesterName) throws ServiceException{

        Integer  totalNumber = platformInfoMapper.querySiteSocreAnalysisTotalNumber(semesterName);
        if(null == totalNumber){
            totalNumber = 0;
        }
        return totalNumber;
    }

    /**
     * 学习成绩- 专业平均成绩
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryMajorSocreAnalysis(String semesterName,int curPage) throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.queryMajorSocreAnalysisList(semesterName,(curPage-1)*10);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 学习成绩- 专业平均成绩总数
     * @return
     */
    @Override
    public Integer queryMajorSocreAnalysisTotal(String semesterName) throws ServiceException{

        Integer  totalNumber = platformInfoMapper.queryMajorSocreAnalysisTotalNumber(semesterName);
        if(null == totalNumber){
            totalNumber = 0;
        }
        return totalNumber;
    }

    /**
     * 学习成绩- 平均成绩趋势
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTotalSocreAnalysis(String siteName, String majorName, String eduName) throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.queryTotalSocreAnalysisList(siteName, majorName, eduName);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 教师授课分析-总教学时长(周或者月)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTeacherTeachingHoursDay(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryTeacherTeachingHoursDayList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 教师授课分析-总教学时长(年)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTeacherTeachingHoursYear(String year) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryTeacherTeachingHoursYearList(year);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 教师授课分析-平均教学时长(周或者月)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTeacherAverageTeachingHoursDay(String statrDate,String endDate) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryTeacherAverageTeachingHoursDayList(statrDate,endDate);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 教师授课分析-平均教学时长(年)
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTeacherAverageTeachingHoursYear(String year) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryTeacherAverageTeachingHoursYearYearList(year);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 教师授课分析- 教师详细数据数据
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTeacherDetailedData(String semesterName,String condition,int curPage, String sort_order) throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.queryTeacherDetailedDataList(semesterName,condition, (curPage - 1) * 10, sort_order);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 教师授课分析- 教师详细数据总数
     * @return
     */
    @Override
    public Integer queryTeacherDetailedDataTotal(String semesterName,String condition) throws ServiceException{

        Integer  totalNumber = platformInfoMapper.queryTeacherDetailedDataTotalNumber(semesterName,condition);
        if(null == totalNumber){
            totalNumber = 0;
        }
        return totalNumber;
    }

    /**
     * 在籍学生分析-年级分析
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryGradeLearningStudent() throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.queryGradeLearningStudentList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 在籍学生分析-学籍分析
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryGradeStatusStudent(String gradeName) throws ServiceException{
        List<Map<String, Object>>  list = platformInfoMapper.queryGradeStatusStudentList(gradeName);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 在籍学生分析-教学点分析
     * @return
     */
    @Override
    public List<Map<String, Object>>  querySiteLearningStudent() throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.querySiteLearningStudentList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 在籍学生分析-专业分析
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryMajorLearningStudent() throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.queryMajorLearningStudentList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 在籍学生分析-层次分析
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryEduLearningStudent() throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.queryEduLearningStudentStudentList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 在籍学生分析-性别分析
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryGenderLearningStudent() throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.queryGenderLearningStudentList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 在籍学生分析- 学籍详细数据
     * @return
     */
    @Override
    public List<Map<String, Object>>  queryTotalStudentDetailed(String xs,String condition,int curPage) throws ServiceException{

        List<Map<String, Object>>  list = platformInfoMapper.queryTotalStudentDetailedList(xs,condition,(curPage-1)*10);
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    /**
     * 在籍学生分析- 学籍详细数据总数
     * @return
     */
    @Override
    public Integer queryTotalStudentDetailedTotal(String xs,String condition) throws ServiceException{

        Integer  totalNumber = platformInfoMapper.queryTotalStudentDetailedTotalNumber(xs,condition);
        if(null == totalNumber){
            totalNumber = 0;
        }
        return totalNumber;
    }


    @Override
    public List<Map<String, Object>> queryCompositeList() throws ServiceException {
        List<Map<String, Object>> list = platformInfoMapper.queryCompositeList();
        if(null == list){
            list = new ArrayList<>();
        }
        return list;
    }

    @Override
    public Map<String, Object> queryCompositeRadar() throws ServiceException {
//        String year = CommonUtils.dateToStr(new Date(), "yyyy");
        //开方临时写死
//        year = "17秋";
        Map<String, Object> semester = platformInfoMapper.queryActiveSemester();
        Map<String, Object> compositeRadar = null;
        String year = "";
        if(MapUtils.isNotEmpty(semester)){
            year = (String) semester.get("name");
            compositeRadar = platformInfoMapper.queryComposite(year);
        }

        if(MapUtils.isEmpty(compositeRadar)){
            if(null == compositeRadar) {
                compositeRadar = new HashMap<>();
            }
            compositeRadar.put("year", year);
            compositeRadar.put("acceptance_rate", "0");
            compositeRadar.put("line_rate", "0");
            compositeRadar.put("course_pass_rate", "0");
            compositeRadar.put("graduation_rate", "0");
            compositeRadar.put("bachelor_rate", "0");
        }
        return compositeRadar;
    }

    @Override
    public Map<String, Object> queryInfo() throws ServiceException {

        Map<String, Object> map = platformInfoMapper.queryInfo();
        if(MapUtils.isNotEmpty(map)){
            try {
                int t_cur = Integer.parseInt(CommonUtil.fixNull(map.get("teacher_cur_week_time"), "0"));
                int t_pre = Integer.parseInt(CommonUtil.fixNull(map.get("teacher_pre_week_time"), "0"));
                double rate = t_pre > 0 ? ((t_pre - t_cur)/t_pre) : t_cur;
                map.put("t_rate", rate);

                int s_cur = Integer.parseInt(CommonUtil.fixNull(map.get("student_cur_week_time"), "0"));
                int s_pre = Integer.parseInt(CommonUtil.fixNull( map.get("student_pre_week_time"), "0"));
                double s_rate = s_pre > 0 ? ((s_pre - s_cur)/s_pre) : s_cur;
                map.put("s_rate", s_rate);
            } catch (Exception e) {
                e.printStackTrace();
                map.put("t_rate", 0);
                map.put("s_rate", 0);
            }

            return map;
        } else {
            map = new HashMap<>();
            map.put("id", "0");
            map.put("student_num", "0");
            map.put("teacher_num", "0");
            map.put("course_num", "0");
            map.put("student_online_time", "0");
            map.put("teacher_online_time", "0");
            map.put("student_cur_week_time", "0");
            map.put("student_pre_week_time", "0");
            map.put("teacher_cur_week_time", "0");
            map.put("teacher_pre_week_time", "0");
            map.put("major_degree_num", "0");
            map.put("major_training_num", "0");
            map.put("site_num", "0");
            map.put("t_rate", 0);
            map.put("s_rate", 0);
            return map;
        }
    }
}

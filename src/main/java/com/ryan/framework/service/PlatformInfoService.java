package com.ryan.framework.service;

import com.ryan.framework.service.expection.ServiceException;

import java.util.List;
import java.util.Map;

/**
 * 平台概况
 *
 * @author RyanYin
 */
public interface PlatformInfoService {

    /**
     * 招生分析-招生人数分布(周或者月)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryRecruitInfoDay(String statrDate,String endDate) throws ServiceException;

    /**
     * 招生分析-招生人数分布(年)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryRecruitInfoYear(String year) throws ServiceException;

    /**
     *  招生分析-学习中心招生实时统计
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySiteRecruitRealStatistics() throws ServiceException;

    /**
     * 招生分析-历年数据查询
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryPreviousYearsRecruitInfo(String bantchName) throws ServiceException;

    /**
     *  招生分析-学习中心统计
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySiteRecruitStatistics(String bantchName) throws ServiceException;

    /**
     *  招生分析-专业统计
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryMajorRecruitStatistics(String bantchName) throws ServiceException;

    /**
     * 招生分析-总体数据分析
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTotalBantchInfo() throws ServiceException;

    /**
     * 查询每日学习时长
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryLearnDay() throws ServiceException;

    /**
     * 查询今日在线人数
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryOnlineNumber() throws ServiceException;

    /**
     * 活跃人数地域分布
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryActivityDistribution() throws ServiceException;

    /**
     * 学习中心新生人数分布
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySiteNewStudentDistribution() throws ServiceException;

    /**
     * 新生专业分布
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryStudentMajorNumber() throws ServiceException;

    /**
     * 课程年度更新率
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryCourseYearUpdateRate(String year) throws ServiceException;

    /**
     * 基础分析-首页学习时长(周或者月)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTotalLearnDay(String statrDate,String endDate) throws ServiceException;

    /**
     * 基础分析-首页学习时长(年)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTotalLearnYear(String year) throws ServiceException;

    /**
     * 基础分析-人均学习时长(周或者月)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryAverageLearnDay(String statrDate,String endDate) throws ServiceException;

    /**
     * 基础分析-人均学习时长(年)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryAverageLearnYear(String year) throws ServiceException;

    /**
     * 基础分析-学生学习时间分布(周或者月)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryLeranTimeDistributed(String statrDate,String endDate) throws ServiceException;

    /**
     * 基础分析-学生学习时间分布(年)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryLeranTimeDistributedYear(String year) throws ServiceException;

    /**
     * 基础分析-学生学习时间段分布
     * @return
     * @throws ServiceException
     */
    Map<String, Object> queryPeriodDistributed(String statrDate,String endDate) throws ServiceException;

    /**
     * 基础分析-课程学习总用时
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryCourseLearnTime(String semesterName) throws ServiceException;

    /**
     * 基础分析-学习中心总学习时长
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySiteTotalLearnTime(String statrDate,String endDate) throws ServiceException;

    /**
     * 基础分析-学习中心平均学习时长
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySiteAverageLearnTime(String statrDate,String endDate) throws ServiceException;

    /**
     * 基础分析-学习中心上线率
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySiteOnlineRate(String statrDate,String endDate) throws ServiceException;

    /**
     * 基础分析-学习详细数据表格
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySiteDateTable(String statrDate,String endDate,int curPage) throws ServiceException;

    /**
     * 基础分析-学习详细数据表格总数总数
     * @return
     * @throws ServiceException
     */
    Integer querySiteDateTableTotal(String statrDate,String endDate) throws ServiceException;

    /**
     * 学习成绩- 课程成绩分析
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySocreAnalysis(String semesterName,int curPage) throws ServiceException;

    /**
     * 学习成绩- 课程成绩分析总数
     * @return
     * @throws ServiceException
     */
    Integer querySocreAnalysisTotal(String semesterName) throws ServiceException;

    /**
     * 学习成绩- 学习中心平均成绩
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySiteSocreAnalysis(String semesterName,int curPage) throws ServiceException;

    /**
     * 学习成绩- 学习中心平均成绩总数
     * @return
     * @throws ServiceException
     */
    Integer querySiteSocreAnalysisTotal(String semesterName) throws ServiceException;

    /**
     * 学习成绩- 专业平均成绩
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryMajorSocreAnalysis(String semesterName,int curPage) throws ServiceException;

    /**
     * 学习成绩- 专业平均成绩总数
     * @return
     * @throws ServiceException
     */
    Integer queryMajorSocreAnalysisTotal(String semesterName) throws ServiceException;

    /**
     * 学习成绩- 平均成绩趋势
     * @param siteName
     * @param majorName
     * @param eduName
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTotalSocreAnalysis(String siteName, String majorName, String eduName) throws ServiceException;

    /**
     * 教师授课分析-总教学时长(周或者月)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTeacherTeachingHoursDay(String statrDate,String endDate) throws ServiceException;

    /**
     * 教师授课分析-总教学时长(年)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTeacherTeachingHoursYear(String year) throws ServiceException;

    /**
     * 教师授课分析-平均教学时长(周或者月)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTeacherAverageTeachingHoursDay(String statrDate,String endDate) throws ServiceException;

    /**
     * 教师授课分析-平均教学时长(年)
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTeacherAverageTeachingHoursYear(String year) throws ServiceException;

    /**
     * 教师授课分析- 教师详细数据
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTeacherDetailedData(String semesterName,String condition,int curPage, String sort_order) throws ServiceException;

    /**
     * 教师授课分析- 教师详细数据总数
     * @return
     * @throws ServiceException
     */
    Integer queryTeacherDetailedDataTotal(String semesterName,String condition) throws ServiceException;

    /**
     * 在籍学生分析-年级分析
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryGradeLearningStudent() throws ServiceException;

    /**
     * 在籍学生分析-学籍分析
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryGradeStatusStudent(String gradeName) throws ServiceException;

    /**
     * 在籍学生分析-教学点分析
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> querySiteLearningStudent() throws ServiceException;

    /**
     * 在籍学生分析-专业分析
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryMajorLearningStudent() throws ServiceException;

    /**
     * 在籍学生分析-层次分析
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryEduLearningStudent() throws ServiceException;

    /**
     * 在籍学生分析-性别分析
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryGenderLearningStudent() throws ServiceException;

    /**
     * 在籍学生分析- 学籍详细数据表格
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryTotalStudentDetailed(String xs,String condition,int curPage) throws ServiceException;

    /**
     * 在籍学生分析- 学籍详细数据总数
     * @return
     * @throws ServiceException
     */
    Integer queryTotalStudentDetailedTotal(String xs,String condition) throws ServiceException;

    /**
     * 查询平台平台概况
     *
     * @return
     * @throws ServiceException
     */
    Map<String, Object> queryInfo() throws ServiceException;

    /**
     * 查询综合指数(雷达图)
     * @return
     * @throws ServiceException
     */
    Map<String, Object> queryCompositeRadar() throws ServiceException;

    /**
     * 查询综合指数 列表
     * @return
     * @throws ServiceException
     */
    List<Map<String, Object>> queryCompositeList() throws ServiceException;

}

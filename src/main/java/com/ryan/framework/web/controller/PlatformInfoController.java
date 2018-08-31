package com.ryan.framework.web.controller;

import com.github.pagehelper.util.StringUtil;
import com.ryan.framework.service.PlatformInfoService;
import com.whaty.core.commons.util.CommonUtils;
import com.whaty.core.framework.api.domain.ResultDataModel;
import com.whaty.core.framework.api.exception.ApiException;
import com.ryan.framework.service.expection.ServiceException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/statistics")
@RestController
public class PlatformInfoController {

    @Resource
    PlatformInfoService platformInfoService;


    /**
     * 招生分析-招生人数分布(周或者月)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/recruitInfoDay", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel recruitInfoDay(String startDate,String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryRecruitInfoDay(startDate,endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 招生分析-招生人数分布(年)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/recruitInfoYear", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel recruitInfoYear(String year) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryRecruitInfoYear(year);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 招生分析-学习中心招生实时统计
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/siteRecruitRealStatistics", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel siteRecruitRealStatistics() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySiteRecruitRealStatistics();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 招生分析-历年数据查询
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/previousYearsRecruitInfo", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel previousYearsRecruitInfo(String bantchName) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryPreviousYearsRecruitInfo(bantchName);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 招生分析-学习中心统计
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/siteRecruitStatistics", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel siteRecruitStatistics(String bantchName) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySiteRecruitStatistics(bantchName);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 招生分析-专业统计
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/majorRecruitStatistics", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel majorRecruitStatistics(String bantchName) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryMajorRecruitStatistics(bantchName);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 招生分析-总体数据分析
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/totalBantchInfo", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel totalBantchInfo() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTotalBantchInfo();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);
    }
        /**
         * 查询每日学习时长
         * @return list
         * @throws ApiException
         * */
    @RequestMapping(value = "/learnDay", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel learnDay() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryLearnDay();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     *查询今日在线人数
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/onlineNumber", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel onlineNumber() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryOnlineNumber();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 活跃人数地域分布
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/activityDistribution", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel activityDistribution() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryActivityDistribution();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 学习中心新生人数分布
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/siteNewStudentDistribution", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel siteNewStudentDistribution() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySiteNewStudentDistribution();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 新生专业分布
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/studentMajorNumber", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel studentMajorNumber() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryStudentMajorNumber();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 课程年度更新率
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/courseYearUpdateRate", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel courseYearUpdateRate(String year) throws ApiException {
        if(StringUtils.isBlank(year)){
            year = CommonUtils.dateToStr(new Date(), "yyyy");
        }
        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryCourseYearUpdateRate(year);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析-首页学习时长(周或者月)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/totalLearnDay", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel totalLearnDay(String startDate,String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTotalLearnDay(startDate,endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析-首页学习时长(年)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/totalLearnYear", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel totalLearnYear(String year) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTotalLearnYear(year);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析-人均学习时长(周或者月)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/averageLearnDay", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel averageLearnDay(String startDate,String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryAverageLearnDay(startDate,endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析-人均学习时长(年)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/averageLearnYear", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel averageLearnYear(String year) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryAverageLearnYear(year);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析-学生学习时间分布(周或者月)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/leranTimeDistributed", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel leranTimeDistributed(String startDate,String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryLeranTimeDistributed(startDate,endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析-学生学习时间分布(年)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/leranTimeDistributedYear", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel leranTimeDistributedYear(String year) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryLeranTimeDistributedYear(year);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析-学生学习时间段分布
     * @return
     * @throws ApiException
     */
    @RequestMapping(value = "/periodDistributed", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel periodDistributed(String startDate,String endDate) throws ServiceException {

        Map<String, Object> info = platformInfoService.queryPeriodDistributed(startDate,endDate);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析-课程学习总用时
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/courseLearnTime", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel courseLearnTime(String semesterName) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryCourseLearnTime(semesterName);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析- 学习中心总学习时长
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/siteTotalLearnTime", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel siteTotalLearnTime(String startDate,String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySiteTotalLearnTime(startDate,endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析- 学习中心平均学习时长
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/siteAverageLearnTime", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel siteAverageLearnTime(String startDate,String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySiteAverageLearnTime(startDate,endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析- 学习中心上线率
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/siteOnlineRate", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel siteOnlineRate(String startDate,String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySiteOnlineRate(startDate,endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 基础分析- 学习详细数据表格
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/siteDateTable", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel siteDateTable(String startDate,String endDate,String curPage) throws ApiException {

        int cp = Integer.parseInt(StringUtil.isEmpty(curPage)? "1": curPage);
        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySiteDateTable(startDate,endDate,cp);
        info.put("list", list);

        //总数
        if(1 == cp ){
            Integer totalNumber = platformInfoService.querySiteDateTableTotal(startDate,endDate);
            info.put("totalNumber", totalNumber);
        }
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 学习成绩- 课程成绩分析
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/socreAnalysis", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel socreAnalysis(String semesterName,String curPage) throws ApiException {

        int cp = Integer.parseInt(StringUtil.isEmpty(curPage)? "1": curPage);

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySocreAnalysis(semesterName,cp);
        info.put("list", list);
        //总数
        if(1 == cp ){
            Integer totalNumber = platformInfoService.querySocreAnalysisTotal(semesterName);
            info.put("totalNumber", totalNumber);
        }
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 学习成绩- 学习中心平均成绩
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/siteSocreAnalysis", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel siteSocreAnalysis(String semesterName,String curPage) throws ApiException {

        int cp = Integer.parseInt(StringUtil.isEmpty(curPage)? "1": curPage);

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySiteSocreAnalysis(semesterName,cp);
        info.put("list", list);
        info.put("curPage", cp);
        //总数
        if(1 == cp ){
            Integer totalNumber = platformInfoService.querySiteSocreAnalysisTotal(semesterName);
            info.put("totalNumber", totalNumber);
        }

        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 学习成绩- 专业平均成绩
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/majorSocreAnalysis", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel majorSocreAnalysis(String semesterName,String curPage) throws ApiException {

        int cp = Integer.parseInt(StringUtil.isEmpty(curPage)? "1": curPage);

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryMajorSocreAnalysis(semesterName,cp);
        info.put("list", list);
        info.put("curPage", cp);
        //总数
        if(1 == cp ){
            Integer totalNumber = platformInfoService.queryMajorSocreAnalysisTotal(semesterName);
            info.put("totalNumber", totalNumber);
        }
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 学习成绩- 平均成绩趋势
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/totalSocreAnalysis", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel totalSocreAnalysis(String siteName,String majorName,String eduName) throws ApiException {

        siteName = StringUtils.isNoneBlank(siteName) ? siteName : null;
        majorName = StringUtils.isNoneBlank(majorName) ? majorName : null;
        eduName = StringUtils.isNoneBlank(eduName) ? eduName : null;
        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTotalSocreAnalysis(siteName, majorName, eduName);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 教师授课分析-总教学时长(周或者月)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/teacherTeachingHoursDay", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel teacherTeachingHoursDay(String startDate,String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTeacherTeachingHoursDay(startDate,endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 教师授课分析-总教学时长(年)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/teacherTeachingHoursYear", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel teacherTeachingHoursYear(String year) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTeacherTeachingHoursYear(year);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 教师授课分析-平均教学时长(周或者月)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/teacherAverageTeachingHoursDay", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel teacherAverageTeachingHoursDay(String startDate,String endDate) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTeacherAverageTeachingHoursDay(startDate,endDate);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 教师授课分析-平均教学时长(年)
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/teacherAverageTeachingHoursYear", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel teacherAverageTeachingHoursYear(String year) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTeacherAverageTeachingHoursYear(year);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 教师授课分析- 教师详细数据
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/teacherDetailedData", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel teacherDetailedData(String semesterName,String search,String curPage, String sort, String order) throws ApiException {
        String  condition = " ";
        if(StringUtil.isNotEmpty(search.trim())){
            condition += " and CONCAT(login_id,teacher_name,course_name,course_code) like '%"+search+"%' ";
        }

        int cp = Integer.parseInt(StringUtil.isEmpty(curPage) ? "1" : curPage);

        String sort_order = " order by participation_integral desc ";
        if(StringUtils.isNoneBlank(sort) && StringUtils.isNoneBlank(order)){
            sort_order = " order by " + sort + " " + order;
        }

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTeacherDetailedData(semesterName,condition,cp, sort_order);
        info.put("list", list);

        //总数
        if(1 == cp ){
            Integer totalNumber = platformInfoService.queryTeacherDetailedDataTotal(semesterName,condition);
            info.put("totalNumber", totalNumber);
        }

        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 在籍学生分析-年级分析
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/gradeLearningStudent", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel gradeLearningStudent() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryGradeLearningStudent();
        Map<String, Object> platform = platformInfoService.queryInfo();
        info.put("list", list);
        info.put("info", platform);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     *  在籍学生分析-学籍分析
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/gradeStatusStudent", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel gradeStatusStudent(String gradeName) throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryGradeStatusStudent(gradeName);
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 在籍学生分析-教学点分析
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/siteLearningStudent", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel siteLearningStudent() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.querySiteLearningStudent();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 在籍学生分析-专业分析
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/majorLearningStudent", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel majorLearningStudent() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryMajorLearningStudent();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 在籍学生分析-层次分析
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/eduLearningStudent", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel eduLearningStudent() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryEduLearningStudent();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 在籍学生分析-性别分析
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/genderLearningStudent", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel genderLearningStudent() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryGenderLearningStudent();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 在籍学生分析- 学籍详细数据表格
     * @return list
     * @throws ApiException
     * */
    @RequestMapping(value = "/totalStudentDetailed", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel totalStudentDetailed(String siteName,String gradeName,String majorName,String eduName,String curPage) throws ApiException {
        String  condition = " group by "; //分组条件
        String  xs = "";                   //查询条件
        if("1".equals(eduName.trim())){
            xs += "edu_name,";
            condition += " edu_name, ";
        }

        if("1".equals(majorName.trim())){
            xs += "major_name,";
            condition += " major_name, ";
        }

        if("1".equals(siteName.trim())){
            xs += "site_name,";
            condition += "site_name, ";
        }

        if("1".equals(gradeName.trim())){
            xs += "grade_name,";
            condition += "grade_name, ";
        }

        if("".equals(xs.trim())){
            xs += "edu_name,major_name,site_name,grade_name,";
            condition += " edu_name,major_name,site_name,grade_name, ";
        }

        condition = condition.substring(0,condition.lastIndexOf(','));
        xs = xs.substring(0, xs.lastIndexOf(','));
        int cp = Integer.parseInt(StringUtil.isEmpty(curPage)? "1": curPage);

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryTotalStudentDetailed(xs,condition,cp);
        info.put("list", list);

        //总数
        if(1 == cp ){
            Integer totalNumber = platformInfoService.queryTotalStudentDetailedTotal(xs,condition);
            info.put("totalNumber", totalNumber);
        }

        return ResultDataModel.handleSuccessResult(info);

    }

    /**
     * 组件人数，点击次数，学习时长
     * @return
     * @throws ApiException
     */
    @RequestMapping(value = "/info", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel queryInfo() throws ServiceException {

        Map<String, Object> info = platformInfoService.queryInfo();
        return ResultDataModel.handleSuccessResult(info);

    }

    @RequestMapping(value = "/compositeRadar", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel compositeRadar() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        info = platformInfoService.queryCompositeRadar();
        return ResultDataModel.handleSuccessResult(info);
    }

    @RequestMapping(value = "/compositeList", method = {RequestMethod.GET, RequestMethod.POST})
    public ResultDataModel compositeList() throws ApiException {

        Map<String, Object> info = new HashMap<>();
        List<Map<String, Object>> list = platformInfoService.queryCompositeList();
        info.put("list", list);
        return ResultDataModel.handleSuccessResult(info);
    }


}

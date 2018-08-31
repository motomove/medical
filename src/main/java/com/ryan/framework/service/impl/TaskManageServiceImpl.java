package com.ryan.framework.service.impl;

import com.ryan.framework.datasource.DynamicDataSourceContextHolder;
import com.ryan.framework.job.CompositeIndexDao;
import com.ryan.framework.mapper.PlatformInfoMapper;
import com.whaty.core.commons.util.CommonUtils;
import com.ryan.framework.job.PlatformInfoDao;
import com.ryan.framework.service.ReportInfoService;
import com.ryan.framework.service.TaskManageService;
import com.ryan.framework.web.util.StatisticsConst;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;

@EnableAsync // 启动异步调用
@Service("taskManageService")
public class TaskManageServiceImpl implements TaskManageService {

    @Resource
    PlatformInfoDao platformInfoDao;

    @Resource
    PlatformInfoMapper platformInfoMapper;

    @Resource
    CompositeIndexDao compositeIndexDao;

    @Resource
    ReportInfoService reportInfoService;

    @Async
    @Override
    public void sendReport(String dataType, String reportType, String url) {
        DynamicDataSourceContextHolder.setType(null);
        reportInfoService.sendReortInformation(dataType, reportType, url);
    }

    @Async
    @Override
    public void savePlatformInfo() {

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int course = platformInfoDao.queryCourseNum();

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int student = platformInfoDao.queryStudentNum();

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int teacher = platformInfoDao.queryTeacherNum();

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int degree = platformInfoDao.queryMajorNum("1");

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int training = platformInfoDao.queryMajorNum("0");

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int site = platformInfoDao.querySiteNum();

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_LEARNING);
        long stuTime = platformInfoDao.queryStuLearnTime();

        long teaTime = Math.round(stuTime * 0.3);

        //System.out.println("stuLearn = " + stuTime);
        //System.out.println("teaTime = " + teaTime);

        DynamicDataSourceContextHolder.setType(null);
        platformInfoMapper.saveInfo(student, teacher, course, degree, training, site, stuTime, teaTime);


        try {
            Thread.sleep(30000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //System.out.println("Thread.currentThread().getName() = " + Thread.currentThread().getName());
    }

    @Async
    @Override
    public void saveComposite() {
        String year = CommonUtils.dateToStr(new Date(), "yyyy");
        //开方临时写死
        year = "2017";

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int totalNum = compositeIndexDao.queryTotalNum(year);

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int unaccepted = compositeIndexDao.queryUnaccepted(year);
        //录取率
        float ar = totalNum > 0 ? ((float) (totalNum - unaccepted) / (float) totalNum) * 100 : 0f;
        int acceptanceRate = (int) ar;

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int lineNum = compositeIndexDao.queryLineNum(year);

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int studentNum = platformInfoDao.queryStudentNum();
        //上线率
        float lr = studentNum > 0 ? ((float) lineNum / (float) studentNum) * 100f : 0f;
        int lineRate = (int) lr;
        //System.out.println("lineRate = " + lineRate);

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int passNum = compositeIndexDao.queryCoursePassNum(year);

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int eleNum = compositeIndexDao.queryElectiveNum(year);
        //课程通过率
        float pr = eleNum > 0 ? ((float) passNum / (float) eleNum) * 100f : 0f;
        int passRate = (int) pr;
        //System.out.println("passRate = " + passRate);

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int gNum = compositeIndexDao.queryGraduation(year);

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int stuNum = compositeIndexDao.queryAllStudent(year);
        //毕业率
        float gr = stuNum > 0 ? ((float) gNum / (float) stuNum) * 100f : 0f;
        int gRate = (int) gr;

        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int bNum = compositeIndexDao.queryBachelor(year);
        DynamicDataSourceContextHolder.setType(StatisticsConst.DATASOURCE_PLATFORM);
        int aNum = compositeIndexDao.queryBachelorApply(year);
        //学位率
        float br = aNum > 0 ? ((float) bNum / (float) aNum) * 100f : 0f;
        int bRate = (int) br;

        DynamicDataSourceContextHolder.setType(null);
        platformInfoMapper.saveComposite(year, acceptanceRate, lineRate, passRate, gRate, bRate);

    }
}

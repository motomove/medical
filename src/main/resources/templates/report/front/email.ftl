<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
    <title>学历数据分析</title>
    <!--[if lt IE 9]>
    <script type="text/javascript" src="${path}/resource/report/scripts/html5shiv.js"></script>
    <![endif]-->
    <link rel="stylesheet" href="${path}/resource/report/font/iconfont.css">
    <link rel="stylesheet" href="${path}/resource/report/css/main.css">

    <!--[if (gte IE 6)&(lte IE 8)]>
    <script type="text/javascript" src="${path}/resource/report/scripts/selectivizr-min.js"></script>
    <![endif]-->

    <script src="${path}/resource/report/scripts/jquery-1.12.4.min.js"></script>
    <script src="${path}/resource/stats/scripts/statsCommon.js"></script>
    <script src="${path}/resource/stats/echarts-3.8.5/echarts.min.js"></script>
    <script src="${path}/resource/report/scripts/details.js">
        
    </script>
</head>

<body>
<!--------------------------------------------------
// report head
-------------------------------------------------->
<div class="report-head">
    <div class="report-head-wrap webWidth">
        <div class="report-head-title">${data.name}</div>
        <#--<span class="info report-head-info">(2018.5.17-5.21)</span>-->
        <a href="javascript:;" class="report-calendar"><i class="xli icon-calendar-stroke"></i></a>
    </div>
</div>
<!--------------------------------------------------
// report head end
-------------------------------------------------->

<!--------------------------------------------------
// main
-------------------------------------------------->
<div class="report-main">
    <div class="webWidth main-wrap">
        <ul class="clearfix report-ul">

            <!---------- mod ---------->
            <li class="mod-cell col-2">
                <div class="mod">
                    <div class="mod-wrap">
                        <div class="mod-title">
                            <span class="mod-title-bar"></span>
                            <div class="mod-title-text">学习</div>
                        </div>
                        <div class="mod-body">
                            <div class="report-graph" >
                                <div class="report-graph-wrap report-graph-blue" style="padding: 0 16px;">
                                    <div class="report-graph-title clearfix" id="online_time">
                                        <span class="pull-left">每日学习时长</span>
                                        <span class="pull-right">154.3h</span>
                                    </div>
                                    <div id="chat_learnTime" style="display: none;">
                                        <ul>
                                        <#list data.chat_learnTime as learnTime>
                                            <li name="${learnTime.learnDate}" stuNum="${(learnTime.student_number)?c}">${(learnTime.learn_time)?c}</li>
                                        </#list>
                                        </ul>
                                    </div>
                                    <!--<div class="report-graph-box"><img src="${path}/static/resource/report/images/lines1.png" alt=""></div>-->
                                </div>
                            </div>
                            <div class="report-stat">
                                <ul>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i class="xli icon-duration-stroke"></i></span>
                                                <span class="report-stat-text">周学习时长</span>
                                            </div>
                                            <div class="report-stat-con"><span class="yin_data_min" data="${(data.learn_time)!0}">0</span>
                                                <span class="red">
                                                <#if (data.learn_time_rate)?? && data.learn_time_rate gt 0>
                                                    (+${data.learn_number_rate}%)
                                                <#else>
                                                    (${data.learn_number_rate}%)
                                                </#if>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i class="xli icon-number-stroke"></i></span>
                                                <span class="report-stat-text">周学习人数</span>
                                            </div>
                                            <div class="report-stat-con">${(data.learn_number)!'0'}人
                                                <span class="red">
                                                <#if (data.learn_number_rate)?? && data.learn_number_rate gt 0>
                                                    (+${data.learn_number_rate}%)
                                                <#else>
                                                    (${data.learn_number_rate}%)
                                                </#if>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i class="xli icon-activeman-stroke"></i></span>
                                                <span class="report-stat-text">最大同时在线人数</span>
                                            </div>
                                            <div class="report-stat-con" id="max-online-num">230人(5月22日)</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <!---------- mod end ---------->

            <!---------- mod ---------->
            <li class="mod-cell col-2">
                <div class="mod">
                    <div class="mod-wrap">
                        <div class="mod-title">
                            <span class="mod-title-bar"></span>
                            <div class="mod-title-text">授课</div>
                        </div>
                        <div class="mod-body">
                            <div class="report-graph">
                                <div class="report-graph-wrap report-graph-red" style="padding: 0 16px;">
                                    <div class="report-graph-title clearfix" id="teaching_time">
                                        <span class="pull-left">每日学习时长</span>
                                        <span class="pull-right">154.3h</span>
                                    </div>
                                    <div id="chat_teachingTime" style="display: none;">
                                        <ul>
                                        <#list data.chat_teachingTime as tt>
                                            <li name="${tt.teaching_date}">${(tt.teaching_time)?c}</li>
                                        </#list>
                                        </ul>
                                    </div>
                                    <#--<div class="report-graph-box"><img src="${path}/static/resource/report/images/lines2.png" alt=""></div>-->
                                </div>
                            </div>
                            <div class="report-stat">
                                <ul>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i class="xli icon-duration-stroke"></i></span><span
                                                    class="report-stat-text">周授课时长</span>
                                            </div>
                                            <div class="report-stat-con"><span class="yin_data_min" data="${(data.teach_time)!0}">0</span>
                                                <span class="red">
                                                <#if (data.teach_time_rate)?? && data.teach_time_rate gt 0>
                                                    (+${data.teach_time_rate}%)
                                                <#else>
                                                    (${data.teach_time_rate}%)
                                                </#if>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i class="xli icon-number-stroke"></i></span>
                                                <span class="report-stat-text">周授课人数</span>
                                            </div>
                                            <div class="report-stat-con">${(data.teach_number)!'0'}人
                                                <span class="red">
                                                <#if (data.teach_number_rate)?? && data.teach_number_rate gt 0>
                                                    (+${data.teach_number_rate}%)
                                                <#else>
                                                    (${data.teach_number_rate}%)
                                                </#if>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <!---------- mod end ---------->

        </ul>
        <ul class="clearfix report-ul">

            <!---------- mod ---------->
            <li class="mod-cell col-2">
                <div class="mod">
                    <div class="mod-wrap">
                        <div class="mod-title">
                            <span class="mod-title-bar"></span>
                            <div class="mod-title-text">运营</div>
                        </div>
                        <div class="mod-body">
                            <div class="report-stat">
                                <div class="report-stat-head">
                                    <span class="report-stat-head-text">宽带使用</span>
                                </div>
                                <ul>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i
                                                        class="xli icon-pie-stroke"></i></span><span
                                                    class="report-stat-text">总使用量</span>
                                            </div>
                                            <div class="report-stat-con">${(data.total_bandwidth)!'0'}MB
                                                <span class="red">
                                                <#if (data.total_bandwidth_rate)?? && data.total_bandwidth_rate gt 0>
                                                    (+${data.total_bandwidth_rate}%)
                                                <#else>
                                                    (${data.total_bandwidth_rate}%)
                                                </#if>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i
                                                        class="xli icon-boardbrand-stroke"></i></span><span
                                                    class="report-stat-text">最大带宽</span>
                                            </div>
                                            <div class="report-stat-con">${(data.max_bandwidth)!'0'}MB
                                                (${(data.max_bandwidth_date)?string("yyyy-MM-dd")})
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <br>
                            <div class="report-stat">
                                <div class="report-stat-head">
                                    <span class="report-stat-head-text">安全拦截</span>
                                </div>
                                <ul>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i
                                                        class="xli icon-attack-stroke"></i></span><span
                                                    class="report-stat-text">遭受攻击</span>
                                            </div>
                                            <div class="report-stat-con">${(data.attack_number)!'0'}次</div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i class="xli icon-intercept-stroke"></i></span><span
                                                    class="report-stat-text">成功拦截</span>
                                            </div>
                                            <div class="report-stat-con">${(data.interception_number)!'0'}次</div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i class="xli icon-frequent-stroke"></i></span><span
                                                    class="report-stat-text">每分钟成功拦截</span>
                                            </div>
                                            <div class="report-stat-con">${(data.minute_interception_number)!'0'}次</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <!---------- mod end ---------->

            <!---------- mod ---------->
            <li class="mod-cell col-2">
                <div class="mod">
                    <div class="mod-wrap">
                        <div class="mod-title">
                            <span class="mod-title-bar"></span>
                            <div class="mod-title-text">服务</div>
                        </div>
                        <div class="mod-body">
                            <div class="report-stat">
                                <div class="report-stat-head">
                                    <span class="report-stat-head-text">消息服务</span>
                                </div>
                                <ul>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i
                                                        class="xli icon-admin-stroke"></i></span><span
                                                    class="report-stat-text">提醒管理员次数</span>
                                            </div>
                                            <div class="report-stat-con">${(data.remind_manager_number)!'0'}次</div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i
                                                        class="xli icon-student-stroke"></i></span><span
                                                    class="report-stat-text">提醒学生次数</span>
                                            </div>
                                            <div class="report-stat-con">${(data.remind_student_number)!'0'}次</div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i
                                                        class="xli icon-teacher-stroke"></i></span><span
                                                    class="report-stat-text">提醒教师次数</span>
                                            </div>
                                            <div class="report-stat-con">${(data.remind_teacher_number)!'0'}次</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <br>
                            <div class="report-stat">
                                <div class="report-stat-head">
                                    <span class="report-stat-head-text">预警服务</span>
                                </div>
                                <ul>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i
                                                        class="xli icon-alert-stroke"></i></span><span
                                                    class="report-stat-text">预警次数</span>
                                            </div>
                                            <div class="report-stat-con">${(data.early_warning_number)!'0'}次</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <!---------- mod end ---------->

        </ul>
    </div>
</div>
<!--------------------------------------------------
// main end
-------------------------------------------------->
<!--------------------------------------------------
// report main end
-------------------------------------------------->

<!--------------------------------------------------
// footer
-------------------------------------------------->
<div class="footer">
    <div class="webWidth footer-wrap">
        <p class="footer-text">Copyright © 1998-2018 Whaty. All Rights Reserved.<br>网梯科技发展有限公司 版权所有</p>
    </div>
</div>
<!--------------------------------------------------
// footer end
-------------------------------------------------->
</body>

<script>
    $(function () {
        // 模块等高
        var $mod = $('.mod');
        var $mod1 = $mod.eq(0);
        var $mod2 = $mod.eq(1);
        var $mod3 = $mod.eq(2);
        var $mod4 = $mod.eq(3);

        function fixHeight(a, b) {
            var aHeight = a.height();
            var bHeight = b.height();
            if (aHeight > bHeight) {
                b.height(aHeight);
            } else {
                a.height(bHeight);
            }
        }

        function browserRedirect() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            //document.writeln("您的浏览设备为：");
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                //document.writeln("phone");
                return;
            } else {
                //document.writeln("pc");
                fixHeight($mod1, $mod2);
                fixHeight($mod3, $mod4);
            }
        }

        browserRedirect();

        $(window).resize(function () {
            browserRedirect();
        });
    });
</script>
</html>

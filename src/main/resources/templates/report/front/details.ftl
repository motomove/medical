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

</head>

<body>
<!--------------------------------------------------
// report head
-------------------------------------------------->
<div class="report-head">
    <div class="report-head-wrap webWidth">
        <div class="report-head-title" id="detial_id" detial="${data.id}">${data.name}</div>
        <#--<span class="info report-head-info">(2018.5.17-5.21)</span>-->
        <a href="javascript:;" class="report-calendar" id="calendar"><i class="xli icon-calendar-stroke"></i></a>
    </div>
</div>
<!--------------------------------------------------
// report head end
-------------------------------------------------->

<div class="drop" id="calendar-drop">
    <div class="drop-wrap">
        <ul>
        <#list data.top5 as top5>
            <li class="drop-list">
                <a href="javascript:;" class="drop-link" id="${top5.id}"><span class="drop-txt">${top5.name}</span></a>
            </li>
        </#list>

            <#--<li class="drop-list">
                <a href="javascript:;" class="drop-link"><span class="drop-txt">2018.5.21-5.27</span></a>
            </li>
            <li class="drop-list">
                <a href="javascript:;" class="drop-link"><span class="drop-txt">2018.5.21-5.27</span></a>
            </li>-->
        </ul>
    </div>
</div>

<!--------------------------------------------------
// main
-------------------------------------------------->
<div class="report-main">
    <div class="webWidth main-wrap">
        <ul class="clearfix report-ul">

            <!---------- mod ---------->
            <li class="mod-cell col-2" id="student_learn_time">
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
                                    <div id="chat_learnTime" style="display: none;" date="${data.start_date}" type="${data.send_type}">
                                        <ul>
                                        <#if (data.send_type)?? && (data.send_type) == 2>
                                            <#list data.chat_learnTime as learnTime>
                                                <li name="${learnTime.learnDate}" stuNum="${(learnTime.student_number)?c}" maxDate="${(learnTime.learn_date)?string("yyyy-MM-dd")}">${(learnTime.learn_time)?c}</li>
                                            </#list>
                                        <#else>
                                            <#list data.chat_learnTime as learnTime>
                                                <li name="${learnTime.learnDate}" stuNum="${(learnTime.student_number)?c}">${(learnTime.learn_time)?c}</li>
                                            </#list>
                                        </#if>

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
                                                <span class="report-stat-text">学习时长</span>
                                            </div>
                                            <div class="report-stat-con"><span class="yin_data_min" data="${(data.learn_time)!0}">0</span>

                                                <#if (data.learn_time_rate)?? && data.learn_time_rate gt 0>
                                                    <span class="red">(+${data.learn_number_rate}%)</span>
                                                <#else>
                                                    <span class="green">(${data.learn_number_rate}%)</span>
                                                </#if>

                                            </div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i class="xli icon-number-stroke"></i></span>
                                                <span class="report-stat-text">学习人数</span>
                                            </div>
                                            <div class="report-stat-con">${(data.learn_number)!'0'}人
                                                <#if (data.learn_number_rate)?? && data.learn_number_rate gt 0>
                                                <span class="red">(+${data.learn_number_rate}%)</span>
                                                <#else>
                                                <span class="green">(${data.learn_number_rate}%)</span>
                                                </#if>

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
                                    <div id="chat_teachingTime" style="display: none;" date="${data.start_date}" type="${data.send_type}">
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
                                                <span class="report-stat-icon"><i class="xli icon-duration-stroke"></i></span>
                                                <span class="report-stat-text">授课时长</span>
                                            </div>
                                            <div class="report-stat-con"><span class="yin_data_min" data="${(data.teach_time)!0}">0</span>

                                                <#if (data.teach_time_rate)?? && data.teach_time_rate gt 0>
                                                <span class="red">(+${data.teach_time_rate}%)</span>
                                                <#else>
                                                <span class="green">(${data.teach_time_rate}%)</span>
                                                </#if>

                                            </div>
                                        </div>
                                    </li>
                                    <li class="report-stat-cell">
                                        <div class="report-stat-cell-wrap  clearfix">
                                            <div class="report-stat-title">
                                                <span class="report-stat-icon"><i class="xli icon-number-stroke"></i></span>
                                                <span class="report-stat-text">授课人数</span>
                                            </div>
                                            <div class="report-stat-con">${(data.teach_number)!'0'}人

                                                <#if (data.teach_number_rate)?? && data.teach_number_rate gt 0>
                                                <span class="red">(+${data.teach_number_rate}%)</span>
                                                <#else>
                                                <span class="green">(${data.teach_number_rate}%)</span>
                                                </#if>

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

                                                <#if (data.total_bandwidth_rate)?? && data.total_bandwidth_rate gt 0>
                                                <span class="red">(+${data.total_bandwidth_rate}%) </span>
                                                <#else>
                                                <span class="green">(${data.total_bandwidth_rate}%) </span>
                                                </#if>

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
        <p class="footer-text">技术支持：北京网梯科技发展有限公司 经营许可证编号：京ICP备08101962号-51<br></p>
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802023942" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <img src="../../resource/front/images/record_logo.png" style="float:left;">
            <p class="footer-text" style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; ">
                京公网安备 11010802023942号
            </p>
        </a>
    </div>
</div>
<!--------------------------------------------------
// footer end
-------------------------------------------------->
</body>
<script src="${path}/resource/report/scripts/details.js"></script>
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

function LandingBannerLog(no) {
    jQuery.ajax({
        url: "/Include/Banner/Landing_Banner_Click.asp",
        data: "no=" + no,
        contentType: "application/x-www-form-urlencoded;charset=EUC-KR",
        type: "POST",
        dataType: "html",
        error: function (e) {
            //alert(e.responseText);
        },
        success: function (data) {
            //alert(data);
        }
    });
}

function TopBannerLog(no) {
    jQuery.ajax({
        url: "/Include/Banner/Top_Banner_Click.asp",
        data: "no=" + no,
        contentType: "application/x-www-form-urlencoded;charset=EUC-KR",
        type: "POST",
        dataType: "html",
        error: function (e) {
            //alert(e.responseText);
        },
        success: function (data) {
            //alert(data);
        }
    });
}

function Close_7DayBanner(DivName, CookieName) {
    document.getElementById(DivName).style.display = "none";

    (function ($) {
        $("#" + DivName).slideUp("slow");
        Set_TermDayCookie(CookieName, 10080);
    })(jQuery)
}

function Close_1DayBanner(DivName, CookieName) {
    document.getElementById(DivName).style.display = "none";

    (function ($) {
        $("#" + DivName).slideUp("slow");
        Set_TermDayCookie(CookieName, 1440);
    })(jQuery)
}

function Close_3DayBanner(DivName, CookieName) {
    document.getElementById(DivName).style.display = "none";

    (function ($) {
        $("#" + DivName).slideUp("slow");
        Set_TermDayCookie(CookieName, 4320);
    })(jQuery)
}

function Close_EndDateBanner(DivName, CookieName, Days)
{
    document.getElementById(DivName).style.display = "none";

    var times = 60 * 24 * parseInt(Days,10);

    (function ($) {
        $("#" + DivName).slideUp("slow");
        Set_TermDayCookie(CookieName, times);
    })(jQuery)
}

function Set_TermDayCookie(CookieName, cookie_time) {
    var nowDate = new Date();
    var nowHours = nowDate.getHours();
    var nowMinutes = nowDate.getMinutes();

    setCookie(CookieName, 'yes', cookie_time, '/', 'jobkorea.co.kr');	// 24*60*1분 (1일간 유효) => 자정까지 유효로 변경됨, 쿠키이름과 유효기간만 수정!!
}

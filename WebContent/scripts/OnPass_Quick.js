// 레이어 닫기
var lay_Quick_Cls = function () {
    jQuery("div.lyOnPassApply").remove();
}

// 레이어 닫기 유형 2(alert)
var lay_Quick_Cls2 = function (_str) {
    alert(_str);
    jQuery("div.lyOnPassApply", parent).remove();
}

// 레이어 도움말 쿠키 지정
var lay_Quick_Help_Set_Ck = function () {

    var nowDate = new Date();

    nowDate.setDate(nowDate.getDate() + 3);
    document.cookie = "GI_OnPass_Quick=" + escape("yes") + "; path=/; expires=" + nowDate.toGMTString() + ";domain=jobkorea.co.kr";

    jQuery("dd.quickExplan").hide();
}

// 레이어 로그인 IP 보안
var lay_Quick_Ip_Chk_Set = function () {
    var jQueryobj = jQuery("button.btnSecurity");

    var today = new Date();
    var expire = new Date(today.getTime() + 60 * 60 * 24 * 30 * 1000);

    var IPSecCookie = "Secure_IPonOFF="

    if (jQueryobj.hasClass("setOn")) {
        jQueryobj.toggleClass("setOn setOff").text("OFF");
        jQueryobj.next().removeClass("devHide");
        IPSecCookie += escape("N");
    } else {
        jQueryobj.toggleClass("setOff setOn").text("ON");
        jQueryobj.next().addClass("devHide");
        IPSecCookie += escape("Y");
    }

    IPSecCookie += "; expires=" + expire.toGMTString() + "; path=/; domain=jobkorea.co.kr;";
    document.cookie = IPSecCookie;
}

// 퀵 온라인 지원 프레임 사이즈 - Ajax 호출시
var lay_Quick_Frm_Size = function () {
    var jQueryheight = 0;
    var jQueryobj = jQuery("#onPassApply_Frame");

    if (jQueryobj.length) {
        if (jQueryobj.attr("src").toLowerCase().indexOf("onpass_quick_login.asp") > -1 || jQueryobj.attr("src").toLowerCase().indexOf("onpass_select_login.asp") > -1 ||
            jQueryobj.attr("src").toLowerCase().indexOf("m_login_layer") > -1) {
            jQueryheight = jQueryobj.height();
            lay_Quick_Size_Chg(jQueryheight);
        }
    }
}

//  퀵 온라인 지원 프레임 사이즈 - (onload, onunload)
var lay_Quick_Frm_Size2 = function (_height) {
    var jQueryheight = 0;
    var jQueryobj = jQuery("#onPassApply_Frame");

    if (_height == undefined) {
        jQueryheight = jQueryobj.contents().find("body").height();

    } else {
        jQueryheight = _height;//jQueryobj.attr("src").toLowerCase().indexOf("onpass_quick_login.asp")  > -1 ? _height :  jQueryobj.contents().find("div.iframeQuick").height();
    }

    lay_Quick_Size_Chg(jQueryheight, 430);
}

//	퀵 온라인 지원 프레임 리사이즈
var lay_Quick_Size_Chg = function (_height, _width) {
    var jQuerydiv = jQuery("body").find("div.lyOnPassApply");
    var jQueryobj = jQuery("#onPassApply_Frame");
    if (typeof _width === "undefined") {
        _width = jQueryobj.width();
    }

    jQueryobj.css("width", _width);
    jQueryobj.css("height", _height);

    // IE 구버전 처리
    var isIE = navigator.userAgent.toLowerCase().indexOf("msie") !== -1;

    if (isIE) {
        var $width = window.innerWidth ? window.innerWidth : jQuery(window).width();
        var $height = window.innerHeight ? window.innerHeight : jQuery(window).height();

        var jQueryleft = jQuery(window).scrollLeft() + ($width - _width) / 2;
        var jQuerytop = jQuery(window).scrollTop() + ($height - jQuerydiv.height()) / 2;
    } else { // 모바일 사파리에서 window 사이즈 틀리게 나와서 window.top으로 수정
        var topWindow = window.top;
        var $width = topWindow.innerWidth ? topWindow.innerWidth : jQuery(topWindow).width();
        var $height = topWindow.innerHeight ? topWindow.innerHeight : jQuery(topWindow).height();

        var scrollTop = jQuery(window).scrollTop();
        var scrollLeft = jQuery(window).scrollLeft();

        if (scrollTop === 0) {
            scrollTop = jQuery(topWindow).scrollTop();
        }
        if (scrollLeft === 0) {
            scrollLeft = jQuery(topWindow).scrollLeft();
        }

        var jQueryleft = scrollLeft + ($width - _width) / 2;
        var jQuerytop = scrollTop + ($height - jQuerydiv.height()) / 2;
    }

    //console.log(jQuerydiv);
    //console.log(jQuery(window).scrollLeft(), window.innerWidth, $width, jQuerydiv.width(), jQueryleft);

    jQuerydiv.css({
        "position": "absolute",
        "z-index": "999999",
        "left": jQueryleft,
        "top": jQuerytop
    });
}

// 도움말 레이어 오픈
var lay_Quick_Help_Open = function () {
    jQuery("div.quickTooltip").show();
}

// 도움말 레이어 닫기
var lay_Quick_Help_Cls = function () {
    jQuery("div.quickTooltip").hide();
}

// 로그인 레이어 focus 이벤트
var lay_Quick_Login_Fcs = function (_this) {
    var jQueryobj = jQuery("p.loginInput").find("input.inpTxt");
    var jQuerythis = jQuery(_this);

    jQuerythis.addClass("on");

    if (jQuerythis.hasClass("inpTxt inpID")) {
        jQueryobj.eq(1).removeClass("on").addClass("off");
    } else {
        jQueryobj.eq(0).removeClass("on").addClass("off");
    }

    jQuerythis.one("blur", function () {
        if (jQuery.trim(jQuerythis.val()) != "") {
            jQuerythis.removeClass("off").addClass("end");
        } else {
            jQuerythis.val("");
            jQuerythis.removeClass("end").addClass("off");
        }
    });
}

// 로그인 처리
var login_Send = function () {

    if (jQuery.trim(jQuery("#M_ID").val()) == "") {
        alert("아이디를 입력하세요.");
        jQuery("#M_ID").val("").focus();
        return false;
    }

    if (jQuery.trim(jQuery("#M_PWD").val()) == "") {
        alert("비밀번호를 입력하세요.");
        jQuery("#M_PWD").val("").focus();
        return false;
    }
}

// 지원분야 보기
var lay_Quick_Gi_Part_View = function () {
    var jQueryobj = jQuery("div.selectQ.selectOn");
    var jQueryobj2 = jQueryobj.children("ul");

    if (jQueryobj2.css("display") == "block") {
        jQueryobj2.hide();
        return false;
    }

    jQueryobj2.show();


    if (jQuery.trim(jQuery("#gipart_text").val()) != "") {
        jQuery.each(jQueryobj2.children("li"), function () {

            if (jQuery(this).text() == jQuery("#gipart_text").val()) {
                //jQuery(this).position().top;
                jQuery("#gipart").val(jQuery(this).attr("val"));
                jQueryobj2.scrollTop(jQuery(this).height() * jQuery(this).index());
                return false;
            }
        });
    }
    jQueryobj2.children("li").on("click", function (e) {
        jQuery("#gipart_text").val(jQuery(this).text());
        jQuery("#gipart").val(jQuery(this).attr("val"));
        jQueryobj.children("a").text(jQuery(this).text());
        jQueryobj2.hide();
        jQueryobj2.children("li").off("click");
    });
}


// 상세 지원 창
// _gipart : 모집분야, _opt : 회원여부(1: 온라인 지원 창, 2: 비회원 지원창 이동)
var go_Detail_Apply = function (_gipart, _opt, _pageStat, _Pass_Match) {
    go_Apply_Win(_gipart, _opt, _pageStat, _Pass_Match);
    lay_Quick_Cls();
}

var go_Apply_Win = function (_gipart, _opt, _pageStat, _Pass_Match) {

    if (_gipart == "" || typeof _gipart === "undefined") {
        _gipart = "";
    } else {
        _gipart = escape(_gipart);
    }

    var _go_url = ""

    var _gino = $("input[name=Gi_No]").length == 0 ? gino : $("input[name=Gi_No]").val();

    if (_opt != "1") {
        _go_url = (location.href.indexOf("test") > -1) ? "http://jts.jobkorea.co.kr" : "http://" + location.host;
    }
    _go_url += "/List_GI/GIB_Read_Frame.asp?GI_No=" + _gino + "&Pass_Match=1&pass_chk=1&GiPart=" + escape(_gipart) + "&ifrm_height=" + go_Apply_Win_Height()[1];
    _go_url += (_opt != "1") ? "&quick_non=Y" : "";
    _go_url += "&Oem_Code=" + Site_Oem_Code;

    var _win = window.open(_go_url, 'PassWinView', 'width=' + go_Apply_Win_Height()[2] + ',height=' + go_Apply_Win_Height()[0] + ',toolbar=0,scrollbars=0,resizable=no,left=235,top=0');
    _win.focus();

    return false;
}

// 상세 지원 창 height
var go_Apply_Win_Height = function () {
    var _scroll = 0;
    var _hval = 690;
    var _wval = 770;

    var _ifrm_height = _hval - 76;
    var agent = navigator.userAgent.toLowerCase();

    if (agent.indexOf("msie") != -1) {
        if (screen.availHeight < 670) {
            _hval = screen.availHeight;
            _ifrm_height = _hval - 160;
        }
    } else if (agent.indexOf("safari") != -1 || agent.indexOf("mozilla") != -1 || agent.indexOf("opera") != -1) {
        _hval = 690
    } else if (agent.indexOf("chrome") != -1) {
        _hval = 692
        if (screen.availHeight < 670) {
            _hval = screen.availHeight - 64;
            _ifrm_height = _hval - 76;
        }
    }

    var _array = new Array();

    _array.push(_hval);
    _array.push(_ifrm_height);
    _array.push(_wval);

    return _array;
}


// 비회원 지원창 이동(로그인 창의 크로스도메인 문제로 인한 처리)
var go_Apply_Non_Win = function (_gino, _gipart, _passmatch, _pageStat) {
    gino = _gino;
    go_Apply_Win(_gipart, 2, _pageStat, _passmatch);

    var _url = ""

    if (location.href.indexOf("jts.jobkorea.co.kr") > -1) {
        _url = "http://jts.jobkorea.co.kr";
    } else {
        _url = "http://" + location.host;
    }

    //		_url += "/List_GI/OnPass_Quick_Login_Cls.asp?GI_No=" + _gino + "&GiPart=" + _gipart + "&Pass_Match=" + _passmatch + "&pageStat=" + _pageStat;
    _url += "/List_GI/OnPass_Quick_Login_Cls.asp";
    location.href = _url;
    return;

    var jQueryobj = jQuery("<iframe id=\"ifr_login_cls\"/>");
    jQueryobj.attr("src", _url);
    jQuery("body").append(jQueryobj).find("#ifr_login_cls");
}

// 지원 체크
var lay_Quick_Apply = function () {
    if (jQuery("div.selectQ.selectOn").length > 0) {
        if (jQuery("#gipart").val() == 0) {
            alert('지원분야를 선택하세요.');
            lay_Quick_Gi_Part_View();
            return;
        }
    }

    var _M_Career_Val;

    if (jQuery("#Resume_Cnt").val() == 1) {
        _M_Career_Val = jQuery("#M_Career_Level").val();
    } else {

        jQuery.each(jQuery("input[name=R_No]"), function (_index) {

            if (jQuery(this).is(":checked")) _M_Career_Val = jQuery("input[name=M_Career_Level]").eq(_index).val();
        });
    }

    _M_Career_Val = parseInt(_M_Career_Val);
    var _GI_Career = parseInt(jQuery("input[name=GI_Career]").val());

    if (_GI_Career > 0 && _GI_Career != 220 && _GI_Career != 200) {
        if (_GI_Career - 1 > _M_Career_Val) {
            alert("현재 선택한 이력서의 경력 미달로 지원할 수 없습니다.");
            return;
        }
    } else if (_GI_Career == 220) {
        if (_M_Career_Val == 0) {
            alert("현재 선택한 이력서의 경력 미달로 지원할 수 없습니다.");
            return;
        }
    }

    if (jQuery("div.registerPool").length > 0) {
        if ($("#lb_regist_poll").is(":checked") == false) {
            if (confirm("이 회사 인재풀에 등록하지 않고 입사지원하시겠습니까?\n인재풀에 등록 시 상시채용 검토 대상이 됩니다.")) {
                jQuery("form").submit();
            }
            else {
                return;
            }
        }
        else {
            if (confirm("해당 내용으로 최종 지원 하시겠습니까?")) {
                jQuery("form").submit();
            }
        }
    }
    else {
        if (confirm("해당 내용으로 최종 지원 하시겠습니까?")) {
            jQuery("form").submit();
        }
    }
}

// 지원 완료 후 닫기
var lay_Quick_Result_Cls = function () {
    var _href = location.href;

    if (_href.toLowerCase().indexOf("/recruit/booth_gi_read") > -1 || _href.toLowerCase().indexOf("/recruit/gi_read") > -1) {
        if (window.gino) { //동일 공고일때만 실행
            var onPassSrc = $("#onPassApply_Frame").attr('src');

            if (onPassSrc.indexOf(gino) > -1) {
                _href = _href.replace(/&pass_Stat=1/g, "");
                _href = _href.replace(/#abox/g, "");

                var pass_stat = "pass_Stat=1";
                pass_stat = _href.indexOf("?") > -1 ? "&" + pass_stat : "?" + pass_stat;

                location.href = _href + pass_stat + "#abox";
            }
        }
    }

    jQuery("div.lyOnPassApply").remove();
}

//완료단에서 버튼 바꾸기
var lay_Quick_Btn_Chg = function () {

    $("button.imgQ").removeAttr("onclick").click(function () {
        lay_Quick_Result_Cls();
    });
}

//완료단에서 버튼 바꾸기(인재풀 미등록 시 사용)
var lay_Quick_Btn_Chg_PoolRegister = function () {

    $("button.imgQ").removeAttr("onclick").click(function () {
        document.getElementById('onPassApply_Frame').contentWindow.fnClose();
    });
}

// 로그인 레이어 닫기 공통
var lay_MLoign_Cls = function () {
    jQuery("div.lyMLogin").remove();
}


///------------------------------ 2016-10-21 JK & EMail 통합 입사지원 -----------------------------------
// 온라인 입사지원
var lay_OnPass_Open = function (gbn, giNo) {
    var stat = false;
    jQuery.ajax({
        type: "post",
        async: false,
        url: "/Recruit/OnPass_Apply?funType=" + gbn + "&giNo=" + giNo,
        success: function (data) {

            if (jQuery.trim(data) != "") {
                lay_Quick_Cls();

                // 레이어 위치 조절 전 hide 대신 좌측으로 넘겼다가 가져옴.
                // hide 실행시 해당 div의 height 조절 못함

                jQuery("body").append(data).find("div.lyOnPassApply").css("left", "-9999px");

                lay_Quick_Frm_Size();

            } else {
                stat = true;
            }
        }
    });

    return stat;
}



var JkHostHttps = "https://" + window.location.hostname;

//신규입사지원 오픈 (공고 리스트용)
var go_OnPass_2 = function (giNo, login_st, sc) {
    if (!login_st) {
        login_st = lay_OnPass_Open(4, giNo, "");
    }

    if (login_st) {

        var brw = whichBrs();
        var scroll = 0;

        wval = 550;
        hval = 690;

        switch (brw) {
            case 'Internet Explorer':
                if (screen.availHeight < 670) {
                    hval = screen.availHeight;
                }
                break;
            case 'Chrome':
                hval = 692;
                if (screen.availHeight < 670) {
                    hval = screen.availHeight - 64;
                    ifrm_height = hval - 76;
                }
                break;
            default:
        }

        var go_url = JkHostHttps + "/Recruit/OnPass?giNo=" + giNo + "&Pass_Match=1&pass_chk=1&JobField=";
        if (sc != null) {
            go_url = go_url + "&sc=" + sc;
        }

        var PassWinView = window.open(go_url, 'PassWinView', 'width=' + wval + ',height=' + hval + ',toolbar=0,scrollbars=0,resizable=no,left=235,top=0');

        PassWinView.focus();
    }
    return false;

}


//신규입사지원 선택 (다중) 입사 지원 
var go_OnPass_3 = function (giNo, login_st) {
    if (!login_st) {
        login_st = lay_OnPass_Open(5, giNo,"");
    }

    if (login_st) {

        var brw = whichBrs();
        var scroll = 0;

        wval = 550;
        hval = 690;

        switch (brw) {
            case 'Internet Explorer':
                if (screen.availHeight < 670) {
                    hval = screen.availHeight;
                }
                break;
            case 'Chrome':
                hval = 692;
                if (screen.availHeight < 670) {
                    hval = screen.availHeight - 64;
                    ifrm_height = hval - 76;
                }
                break;
            default:
        }

        var go_url = JkHostHttps + "/Recruit/OnPass/SelectApply?GI_No=" + giNo;

        var PassWinView = window.open(go_url, 'PassWinView', 'width=' + wval + ',height=' + hval + ',toolbar=0,scrollbars=1,resizable=no,left=235,top=0');

        PassWinView.focus();
    }
    return false;

}


// 신규 입사 지원 open (공고 리스트용) : 마감 등의 상태를 먼저 체크
var lay_Quick_Open2 = function (giNo, sc) {
    jQuery.ajax({
        type: "GET",
        url: "/List_GI/Online_Pass_Check.asp",
        data: "GI_No=" + giNo + "&S_Type=OPC&Pass_Match=255",
        dataType: "html",
        success: function (data) {
            if (data == "0" || data == "6") {
                go_OnPass_2(giNo, null, sc);

            } else {
                pass_alert(data);
            }
        }
    });
}


// 선택 공고 입사지원 공고 리스트용 
var lay_Quick_Open3 = function (giNo) {
    go_OnPass_3(giNo);
}

var pass_alert = function (num) {
    switch (num) {
        case '1': alert('공고가 마감되어 지원이 불가능합니다.'); break;
        case '2': alert('공고가 삭제되어 지원이 불가능합니다.'); break;
        case '3': alert('이미 입사지원한 채용공고입니다.'); break;
        case '4': alert('기업회원이 회원님의 이력서를 열람하고 스크랩하여 검토중입니다.'); break;
        case '5': alert('이력서가 완성되지 않았습니다.'); break;
        case '6': alert('열람기업 제한 서비스에 등록된 기업이므로  입사지원을 할 수 없습니다.'); break;
        case '7': alert('이미 입사지원을 3회 하신 채용공고 이므로\n\n더 이상 입사지원이 불가합니다.\n\n동일 공고에 입사지원은 최대 3회까지 가능합니다.'); break;
        case '8': alert("본 공고는 <모의입사지원 경진대회> 참가자만 지원가능합니다.\n\n해당 학생은 <경진대회 사이트>에 접속하여 지원하시기 바랍니다.\n\n(취창업지원센터 홈페이지 참조)"); break;
        case '9': alert('입사지원방법은 상세요강을 참고해주시기 바랍니다.'); break;
    }
}

// 헤드헌팅 입사지원 
var go_HH_OnPass = function (gno) {

    var brw = whichBrs();
    var scroll = 0;

    wval = 550;
    hval = 690;

    switch (brw) {
        case 'Internet Explorer':
            if (screen.availHeight < 670) {
                hval = screen.availHeight;
            }
            break;
        case 'Chrome':
            hval = 692;
            if (screen.availHeight < 670) {
                hval = screen.availHeight - 64;
                ifrm_height = hval - 76;
            }
            break;
        default:
    }

    var go_url = '/recruit/hhonpass/?gNo=' + gno;

    var PassWinView = window.open(go_url, 'PassWinView', 'width=' + wval + ',height=' + hval + ',toolbar=0,scrollbars=0,resizable=no,left=235,top=0');

    PassWinView.focus();
}
// 인재관등록 레이어 열기
var lay_Pool_Open = function (c_id, c_name, oem_no, path_code, c_mem_type_code, gno, Reg_Path_Code) {    
    jQuery.ajax({
        type: "GET",
        url: "/List_GI/OnPass_PoolRegister_Check.asp",
        data: "C_Id=" + escape(c_id) + "&C_MEM_TYPE_CODE=" + c_mem_type_code,
        dataType: "html",
        cache: false,
        success: function (data) {
            if (data == "0" || data == "6") {
                var _data = {
                    C_Id: escape(c_id),
                    C_Name: escape(c_name),
                    Oem_No: oem_no,
                    Path_Code: path_code,
                    C_MEM_TYPE_CODE: c_mem_type_code,
                    gno: gno,
                    Reg_Path_Code: Reg_Path_Code
                }

                jQuery.ajax({
                    type: "post",
                    url: "/List_GI/OnPass_PoolRegister_Frame.asp",
                    data: _data,
                    cache: false,
                    success: function (data2) {
                        lay_Pool_Cls();

                        // 레이어 위치 조절 전 hide 대신 좌측으로 넘겼다가 가져옴.
                        // hide 실행시 해당 div의 height 조절 못함
                        jQuery("body").append(data2).find("div.lyPoolRegister").css("left", "-9999px");

                        lay_Pool_Frm_Size();
                    },
                    error: function (xhr) {
                        alert(xhr.message);
                    }
                });
            } else {
                pool_pass_alert(data);
            }
        }
    });
}

// 인재관 등록 레이어 닫기
var lay_Pool_Cls = function () {
    jQuery("div.lyPoolRegister").remove();
    
}

// 인재관 등록 후 레이어 닫기
var lay_Pool_Result_Cls = function () {
    location.reload();
}

// 레이어 도움말 쿠키 지정
var lay_Pool_Help_Set_Ck = function () {

    var nowDate = new Date();

    nowDate.setDate(nowDate.getDate() + 3);
    document.cookie = "GI_OnPass_Quick=" + escape("yes") + "; path=/; expires=" + nowDate.toGMTString() + ";domain=jobkorea.co.kr";

    jQuery("dd.quickExplan").hide();
}

// 레이어 로그인 IP 보안
var lay_Pool_Ip_Chk_Set = function () {
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

// 인재관 등록 프레임 사이즈 - Ajax 호출시
var lay_Pool_Frm_Size = function () {
    var jQueryheight = 0;
    var jQueryobj = jQuery("#poolRegister_Frame");

    if (jQueryobj.length > 0  && (jQueryobj.attr("src").toLowerCase().indexOf("onpass_poolregister_login.asp") > -1 || jQueryobj.attr("src").toLowerCase().indexOf("m_login_layer") > -1)) {
        jQueryheight = jQueryobj.height();
        lay_Pool_Size_Chg(jQueryheight);
    }
}

//  퀵 온라인 입사지원 프레임 사이즈 - (onload, onunload)
var lay_Pool_Frm_Size2 = function (_height) {;
    var jQueryheight = 0;
    var jQueryobj = jQuery("#poolRegister_Frame");

    if (_height == undefined) {
        jQueryheight = jQueryobj.contents().find("body").height();

    } else {
        jQueryheight = _height;//jQueryobj.attr("src").toLowerCase().indexOf("onpass_quick_login.asp")  > -1 ? _height :  jQueryobj.contents().find("div.iframeQuick").height();
    }

    lay_Pool_Size_Chg(jQueryheight);
}

//	퀵 온라인 입사지원 프레임 리사이즈
var lay_Pool_Size_Chg = function (_height) {

    var jQuerydiv = jQuery("body").find("div.lyPoolRegister");
    var jQueryobj = jQuery("#poolRegister_Frame");

    jQueryobj.css("height", _height);

    // IE 구버전 처리
    var isIE = navigator.userAgent.toLowerCase().indexOf("msie") !== -1;

    if (isIE) {
        var $width = window.innerWidth ? window.innerWidth : $(window).width();
        var $height = window.innerHeight ? window.innerHeight : $(window).height();

        var jQueryleft = jQuery(window).scrollLeft() + ($width - jQuerydiv.width()) / 2;
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

        var jQueryleft = scrollLeft + ($width - jQuerydiv.width()) / 2;
        var jQuerytop = scrollTop + ($height - jQuerydiv.height()) / 2;
    }

    jQuerydiv.css({
        //"position" : "absolute",
        //"z-index" : "999999",
        "display": "block",
        "left": jQueryleft,
        "top": jQuerytop
    });
}

// 로그인 레이어 focus 이벤트
var lay_Pool_Login_Fcs = function (_this) {
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

function pool_pass_alert(num) {
    switch (num) {
        case '1': alert('이 회사 인재풀에 등록된 상태입니다.'); break;
        case '2': alert('이력서가 완성되지 않았습니다.'); break;
        case '3': alert('열람기업 제한 서비스에 등록된 기업이므로 인재풀에 등록할 수 없습니다.'); break;
        case '4': alert('해당 ID는 서비스 이용이 제한되었습니다.자세한 내용은 고객센터(1588-9350)로 문의 주세요.'); break;
    }
}

//관심기업 추가후 인재풀 등록 
var register_in_pool_after_favor = function (c_id, gno, reg_path_code) {    
    jQuery.ajax({
        type: "GET",
        url: "/List_GI/OnPass_PoolRegister_Ok.asp",
        data: {
            C_Id: escape(c_id)
            , C_MEM_TYPE_CODE: 'C'
            , gno: gno
            , Reg_Path_Code: reg_path_code
        },
        dataType: "html",
        cache: false,
        success: function (data) {
            if (data == "0") {
                alert("인재풀에 등록되었습니다. 추후 인사담당자가 직접 연락할 예정입니다.");
                //$("#dev_CoFavorCnt").html(result.Favor_Cnt).addClass("odd");
                window.location.reload();
            }
            else if (data == "1") {
                //로그인이후에 실행되므로 여기로 올 확률은 거의 없음
                top.location.href = "/Login/Login_Tot.asp?rDBName=GG&re_url=" + escape(re_url);
            }
            else if (data == "2") { 
                alert("잘못된 경로로 접속하셨습니다.");
            }
            else if (data == "3") {
                alert("이력서를 수정하셔야 인재풀에 등록할 수 있습니다.");
            }
            else if (data == "4") {
                if (typeof lay_Pool_Open == 'function') {
                    lay_Pool_Open(escape(c_id), '', '', 1, 'C', gno, reg_path_code);
                } else {
                    alert("이력서가 아직 등록되지 않았습니다. 이력서 등록 완료 후 인재풀에 등록 해주시기 바랍니다.");
                }
            }
            else if (data == "5") {
                if (typeof lay_Pool_Open == 'function') {
                    lay_Pool_Open(escape(c_id), '', '', 1, 'C', gno, reg_path_code);
                } else {
                    alert("이력서가 미완성 상태입니다. 이력서 등록 완료 후 인재풀에 등록 해주시기 바랍니다.");
                }
            }
            else if (data == "6") {
                alert("인재풀은 최대 3,000개까지 등록 가능합니다. 자세한 문의는 고객센터(1588-9350)로 연락주세요.");
            }
        }
    });
}
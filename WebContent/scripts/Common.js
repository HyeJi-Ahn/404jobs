
function WinOpen(url) {
    window.open(url, 'starterCalendar', 'toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no,width=1080,height=800');
    event.preventDefault();
}

function toggleBtn() {
    if ($("#devJobInfo ul li.devShow1").css("display") == "none") {
        $("#devJobInfo ul li.devShow1").show();
        $("#devJobInfo ul li.devShow2").hide();

    } else {
        $("#devJobInfo ul li.devShow1").hide();
        $("#devJobInfo ul li.devShow2").show();
    }
}

// 컨텐츠 배너 클릭 체크
function goBnnrClick(BnnrType, BnnrNo, LinkStat, LinkUrl) {
    jQuery.ajax({
        type: "GET",
        url: "/Include/MainInc/Cntnt_Bnnr_Click_Update.asp",
        data: "Bnnr_Type=" + BnnrType + "&Bnnr_No=" + BnnrNo
    });

    if (LinkStat == "1") {
        window.open(LinkUrl, "", "")
    } else {
        top.location.href = LinkUrl;
    }
}

// 컨텐츠 배너 클릭 체크
function goTimeBoardCntntClick(BnnrType, BnnrNo, LinkStat, LinkUrl, Bnnr_View_Type_Code) {
    jQuery.ajax({
        type: "GET",
        url: "/Include/MainInc/TimeBoard_Cntnt_Click_Update.asp",
        data: "Bnnr_Type=" + BnnrType + "&Bnnr_No=" + BnnrNo + "&Bnnr_View_Type_Code=" + Bnnr_View_Type_Code
    });

    if (LinkStat == "1") {
        window.open(LinkUrl, "", "")
    } else {
        top.location.href = LinkUrl;
    }
}

//-- NSM Conversion Check
function NsmConversionClick(Nsm_Code) {
    var nsmX = new Image();
    //alert(Nsm_Code);
    nsmX.src = "http://ntracker.nsm-corp.com/c/rcv.php?code=" + Nsm_Code;
}

// 크리테오, 타게팅게이츠
var Criteo = function (Gi_No) {
    jQuery.ajax({
        type: "POST",
        url: "/Include/Criteo/Criteo_Scrap_UTF.asp?Gi_No=" + Gi_No,
        dataType: "html",
        success: function (html) {
            var obj = $(html);
            $('#widerplanet_tagging').html(obj.html());
            obj.filter('script').each(function () {
                $.globalEval(this.text || this.textContent || this.innerHTML || '');
            });
        }
    });
}

// 스크랩
var doScrap = function (gino) {
    switch (Mem_Chk) {
        case "0":
            if (confirm("'스크랩'은 개인회원 로그인 후 사용가능 합니다.\n\n지금 로그인 하시겠습니까?")) {
                var re_url = "/List_GI/GIB_Read.asp?GI_No=" + gino;
                top.location.href = "/Login/Login_Tot.asp?rDBName=GG&re_url=/?Scrap_Stat=1";
            }
            break;

        case "1":

            var ScrapStat;

            if ($(".devScrap" + gino).hasClass("btnScrap_on") || $(".devScrapClass" + gino).hasClass("btnScrap_1_on")) {
                ScrapStat = "0";
            } else {
                ScrapStat = "1";
            }
            if (ScrapStat == "1") {
                $(".devScrap" + gino).removeClass("btnScrap").addClass("btnScrap_on");
                $(".devScrapClass" + gino).removeClass("btnScrap_1").addClass("btnScrap_1_on");

                $.ajax({
                    type: "GET",
                    url: "/Include/MainInc/Prdt_GI_Scrap_Ins.asp",
                    data: "GI_No=" + gino,
                    cache: false,
                    success: function (result) {
                        NsmConversionClick('170'); //Nsm 스크립트 추가
                        if (result == "1") {
                            //alert("스크랩 되었습니다.");
                            Criteo(gino); //크리테오, 타게팅게이츠
                        }
                        else if (result == "2") {
                            alert("채용공고 스크랩은 1일 1,000건까지 가능합니다.");
                        }
                        else if (result == "3") {
                            alert("채용공고 스크랩은 최대 6,000건까지 가능합니다.");
                        }
                        else {
                            alert("이미 스크랩 되었습니다.");
                        }
                    }
                });
            } else {
                $(".devScrap" + gino).removeClass("btnScrap_on").addClass("btnScrap");
                $(".devScrapClass" + gino).removeClass("btnScrap_1_on").addClass("btnScrap_1");
                jQuery.ajax({
                    type: "GET",
                    url: "/List_GI/GI_Scrap_Ajax.asp",
                    data: "rGINo=" + gino + "&rScrapStat=0",
                    success: function (result) {
                        NsmConversionClick('170'); //Nsm 스크립트 추가
                        if (result == "1") {
                            //
                            Criteo(gino); //크리테오, 타게팅게이츠
                        }
                    }
                });
            }
            break;

        default:
            alert("'스크랩'은 개인회원 로그인 후 사용가능 합니다.");
    }
}

// 관심기업
var doFavor = function (cid) {
    switch (Mem_Chk) {
        case "0":
            if (confirm("'관심기업 설정'은 개인회원 로그인 후 사용가능 합니다.\n\n지금 로그인 하시겠습니까?")) {
                top.location.href = "/Login/Login_Tot.asp?rDBName=GG&re_url=/?Scrap_Stat=1";
            }
            break;

        case "1":
            var FavorStat;

            if ($(".devFavor" + cid).hasClass("btnFavor_on") || $(".devFavorClass" + cid).hasClass("btnReg_1_on")) {
                FavorStat = "0";
            } else {
                FavorStat = "1";
            }

            jQuery.ajax({
                type: "get",
                url: "/Recruit/FavorCo_ID",
                data: "rCID=" + cid + "&rFavorStat=" + FavorStat,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (result) {
                    if (FavorStat == "1") {
                        $(".devFavor" + cid).removeClass("btnFavor").addClass("btnFavor_on");
                        $(".devFavorClass" + cid).removeClass("btnReg_1").addClass("btnReg_1_on");

                        if (result.Favor_Result == "0" || result.Favor_Result == "4") {
                            alert("관심기업으로 등록되었습니다.");
                            //$("#dev_GiFavor_Cnt").html(result.Favor_Cnt); //관심기업 카운트 노출
                        } else if (result.Favor_Result == "2") {
                            alert("이미 관심기업으로 등록된 기업입니다.");
                        } else if (result.Favor_Result == "3") {
                            alert("관심기업이 이미 6,000개 등록되었습니다.");
                        }
                    } else {
                        $(".devFavor" + cid).removeClass("btnFavor_on").addClass("btnFavor");
                        $(".devFavorClass" + cid).removeClass("btnReg_1_on").addClass("btnReg_1");
                    }
                }
            });
            break;

        default:
            alert("'관심기업 설정'은 개인회원 로그인 후 사용가능 합니다.");
    }
}


//메인 통합검색 -[좋은일이 생긴다] 이미지 검색
function GoMainTotalSearch() {
    var jkSearchForm = $("#AKCFrm").attr("action");

    if (jkSearchForm.indexOf("/search") > -1) {
        location.href = "/Search/?stext=" + encodeURIComponent($("#stext").val());
        return false;

    } else {
        return true;
    }
}

// 특수문자 체크
function go_chr_chk(str) {
    var err_cnt = 0;
    var nonchar = " :-()[]&,.㈜㈔'`·+#"; //허용된 특수문자( 허용되는 특수문자는 여기에 추가), 21(space), 39('), 47(/)

    for (var i = 0; i < str.length; i++) {
        var val = str.charAt(i);
        if (!((val >= "0" && val <= "9") || (val >= "a" && val <= "z") || (val >= "A" && val <= "Z") || (val >= "ㄱ" && val <= "힣"))) {
            if ((nonchar.indexOf(val) > 0) || (str.charCodeAt(i) == 32) || (str.charCodeAt(i) == 39) || (str.charCodeAt(i) == 47)) {
            } else {
                err_cnt++;
            }
        }

        // 허용문자 C#, C+, C++, M&A, R&D

        if (val == '#') {
            if (i == 0) {
                err_cnt++;
            } else if (str.charAt(i - 1).toLowerCase() != 'c') {
                err_cnt++;
            }
        }

        if (val == '+') {
            if (i == 0) {
                err_cnt++;
            } else if (str.charAt(i - 1).toLowerCase() != 'c') {
                if (str.charAt(i - 1) == '+') {
                    if (str.charAt(i - 2).toLowerCase() != 'c') {
                        err_cnt++;
                    }
                } else {
                    if (str.substring(0, 4).toLowerCase() != "line" && str.substring(0, 2).toLowerCase() != "라인") {
                        //console.log("6");
                        err_cnt++;
                    }
                }
            }
        }

        if (val == '&') {
            if (i == 0) {
                err_cnt++;
            } else {
                var beforeString = "";
                var nextString = "";

                if (str.charAt(i - 1).length != 0) {
                    beforeString = str.charAt(i - 1);

                    if (!((beforeString >= "0" && beforeString <= "9") || (beforeString >= "a" && beforeString <= "z") || (beforeString >= "A" && beforeString <= "Z") || (beforeString >= "ㄱ" && beforeString <= "힣"))) {
                        if ((beforeString.charCodeAt(i) == 32) || (beforeString.charCodeAt(i) == 39) || (beforeString.charCodeAt(i) == 47)) {

                        } else {
                            err_cnt++;
                        }
                    }
                }


                if (str.charAt(i + 1).length != 0) {
                    nextString = str.charAt(i + 1);

                    if (!((nextString >= "0" && nextString <= "9") || (nextString >= "a" && nextString <= "z") || (nextString >= "A" && nextString <= "Z") || (nextString >= "ㄱ" && nextString <= "힣"))) {
                        if ((nextString.charCodeAt(i) == 32) || (nextString.charCodeAt(i) == 39) || (nextString.charCodeAt(i) == 47)) {

                        } else {
                            err_cnt++;
                        }
                }
            }
        }
    }
}

if (err_cnt == 0) {
    return true;
} else {
    return false;
}
}

// IE 6 이하 Flicker Bug
try {
    document.execCommand('BackgroundImageCache', false, true);
} catch (e) { }

//Main_Navigation.asp
//알바몬링크
function go_albamonurl(url) {
    window.open(url, "abamon");
}

//서비스 자세히 보기 팝업
function go_option_guide(serv_div, opt_div, PosGuide) {
    if (typeof (PosGuide) == 'undefined')
        var strUrl = "/Service_JK/Guin_Fee/Fee_Guide_Pop.asp?Serv_Div=" + serv_div + "&Opt_Div=" + opt_div
    else
        var strUrl = "/Service_JK/Guin_Fee/Fee_Guide_Pop.asp?Serv_Div=" + serv_div + "&Opt_Div=" + opt_div + "&PosGuide=" + PosGuide

    window.open(strUrl, "FeeGuide", "width=790,height=900,toolbar=no,location=no,directories=no,status=no,scrollbars=yes,menubar=no");
}

//상품안내
function go_div_chk(arg) { $("#" + arg).toggle(); }

//배너형 채용정보 URL Link 보기 //main.js
function bannerWin(url, gubun, gino, booth_no) {
    if (url.indexOf("Booth_Frame.asp") == -1) {
        window.open("/Booth/Booth_Win.asp?url=" + escape(url) + "&gubun=" + gubun + "&gino=" + gino + "&booth_no=" + booth_no, "bannerWin01");
    } else {
        today = new Date()
        var win_name = "popDialog" + today.getTime();
        OpenWin = window.open("/Booth/Booth_Win.asp?url=" + escape(url) + "&gubun=" + gubun + "&gino=" + gino + "&booth_no=" + booth_no, "main_booth_pop", 'top=0,left=' + window.screen.availWidth / 5 + ',toolbar=no,location=yes,directories=no,status=no,scrollbars=yes,menubar=no,width=800,height=550');
    }
}

//전용관 상품 팝업
function PrivateLink(no,url) {
    window.open(url, "PrivateBooth" + no);
}

//전용관 상품 카운트
function PrivateClick(no, spacecd) {
    $.ajax({
        url: window.mJKDomainSSL + "/Link/default_JSON.asp",
        data: {
            No: no,
            Space_Code: spacecd
        },
        method: "post",
        dataType: "jsonp",
        async: false
    });
}


//채용정보,기업정보 새창보기
function Job_DB_window(a, b, c) {
    if (a.toLowerCase().indexOf("/recruit/booth_gi_read") > -1) {
        c = window.screen.availHeight;
    }
    today = new Date()
    var win_name = "popDialog" + today.getTime();
    OpenWin = window.open(a, win_name, 'top=0,left=' + window.screen.availWidth / 5 + ',toolbar=no,location=yes,directories=no,status=no,scrollbars=yes,menubar=no,width=' + b + ',height=' + c);
}

function new_popup(a, b, c) {
    today = new Date()
    var win_name = "popDialog" + today.getTime()
    OpenWin = window.open(a, win_name, 'toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,menubar=no,width=' + b + ',height=' + c);
}

// 메인 타임보드 배너 클릭
function goTimeBoardClick(arg) {
    $(arg).parent().parent().find("li.on").removeClass("on");
    $(arg).parent().addClass("on");
}

// 메인 우측 배너 번호 배너 클릭
function goNewTimeBoardClick(arg) {
    var indexNum = 0;
    var showLayer;
    $(arg).closest("div.btnGroup").find("button.on").removeClass("on");
    $(arg).closest("div.btnGroup").next().find("li.on").removeClass("on");

    $(arg).addClass("on");

    indexNum = $("div.btnGroup").find(".on").index();
    showLayer = $("div.btnGroup").next().find("li")[indexNum];
    $(showLayer).addClass("on");
}

// 타임보드 기본 순방향 실행
function goTimeBoardN() {
    var current = ($(".sideTopNorm > div.btnGroup > button.on") ? $(".sideTopNorm > div.btnGroup > button.on") : $(".sideTopNorm > div.btnGroup > button:first"));
    var currentLi = ($(".sideTopNorm > ul > li.on") ? $(".sideTopNorm > ul > li.on") : $(".sideTopNorm > ul > li:first"));
    var next = ((current.next().length) ? ((current.next().hasClass("on")) ? $(".sideTopNorm > div.btnGroup > button:first") : current.next()) : $(".sideTopNorm > div.btnGroup > button:first"));
    var nextLi = ((currentLi.next().length) ? ((currentLi.next().hasClass("on")) ? $(".sideTopNorm > ul > li:first") : currentLi.next()) : $(".sideTopNorm > ul > li:first"));
    next.addClass("on");
    nextLi.addClass("on");
    current.removeClass("on");
    currentLi.removeClass("on");
};

// 타임보드 순방향 실행
function goTimeBoard() {
    var current = ($("#devSideTopBnnr ul li.on") ? $("#devSideTopBnnr ul li.on") : $("#devSideTopBnnr ul li:first"));
    var next = ((current.next().length) ? ((current.next().hasClass("on")) ? $("#devSideTopBnnr ul li:first") : current.next()) : $("#devSideTopBnnr ul li:first"));
    next.addClass("on");
    current.removeClass("on");
};


// 타임보드 역방향 실행
function goTimeBoardReverse() {
    var current = ($("#devSideMidBnnr ul li.on") ? $("#devSideMidBnnr ul li.on") : $("#devSideMidBnnr ul li:last"));
    var prev = ((current.prev().length) ? ((current.prev().hasClass("on")) ? $("#devSideMidBnnr ul li:last") : current.prev()) : $("#devSideMidBnnr ul li:last"));
    prev.addClass("on");
    current.removeClass("on");
};


//온라인입사지원 New -- List_common.js 동기화!
var whichBrs = function () {
    var agt = navigator.userAgent.toLowerCase();

    if (agt.indexOf("msie") != -1) return 'Internet Explorer';
    if (agt.indexOf("opera") != -1) return 'Opera';
    if (agt.indexOf("chrome") != -1) return 'Chrome';
    if (agt.indexOf("netscape") != -1) return 'Netscape';
    if (agt.indexOf("safari") != -1) return 'Safari';
    if (agt.indexOf("mozilla/5.0") != -1) return 'Firefox';
}

function onlinePassNew(gino, login_st) {

    //타 회원 로그인이 되어 있는 경우
    /*if (Mem_Chk != "0" && Mem_Chk != "1") {
        if (confirm("'온라인 입사지원'은 개인회원 로그인 후 가능합니다. 로그인 하시겠습니까?")) {

        } else {
            return;
        }
    }*/

    if (!login_st) {
        login_st = lay_Apply_Open("1", gino);
    }

    if (login_st) {
        jQuery.ajax({
            type: "GET",
            url: "/List_GI/Online_Pass_Check.asp",
            data: "GI_No=" + gino + "&S_Type=OPC&Pass_Match=255",
            dataType: "html",
            success: function (data) {

                var brw = whichBrs();
                var scroll = 0;

                var hval = 610;
                var wval = 770;

                var ifrm_height = hval - 76;

                switch (brw) {
                    case 'Internet Explorer':
                        if (screen.availHeight < 670) {
                            hval = screen.availHeight;
                            ifrm_height = hval - 160;
                        }
                        break;
                    case 'Safari':
                        hval = 610; break;
                    case 'Firefox':
                        hval = 610; break;
                    case 'Chrome':
                        hval = 612;
                        if (screen.availHeight < 670) {
                            hval = screen.availHeight - 64;
                            ifrm_height = hval - 76;
                        }
                        break;
                    case 'Opera':
                        hval = 610; break;
                    default:

                }

                switch (data) {
                    case '0':
                        var go_url = "/List_GI/GIB_Read_Frame.asp?GI_No=" + gino + "&Pass_Match=255&ifrm_height=" + ifrm_height;
                        OpenWin = window.open(go_url, 'onlinePass', 'width=' + wval + ',height=' + hval + ',toolbar=0,scrollbars=0,resizable=no,left=235,top=0');
                        break;
                    case "6":
                        if (confirm('회원님께서 열람제한 서비스에 등록한 기업입니다. 입사지원 하시겠습니까?')) { } else { return; }
                        var go_url = "/List_GI/GIB_Read_Frame.asp?GI_No=" + gino + "&Pass_Match=255&pass_chk=1&ifrm_height=" + ifrm_height;
                        OpenWin = window.open(go_url, 'onlinePass', 'width=' + wval + ',height=' + hval + ',toolbar=0,scrollbars=0,resizable=no,left=235,top=0');
                        break;
                    default: pass_alert(data); break;
                }
            }
        });
    }
}

// e-메일 입사지원 New -- List_common.js 동기화!
function onlinePassEmailNew(gino, login_st) {

    //타 회원 로그인이 되어 있는 경우
    /*if (Mem_Chk != "0" && Mem_Chk != "1") {
        if (confirm("'e-메일 입사지원'은 개인회원 로그인 후 가능합니다. 로그인 하시겠습니까?")) {

        } else {
            return;
        }
    }*/

    if (!login_st) {
        login_st = lay_Apply_Open("2", gino);
    }

    if (login_st) {
        jQuery.ajax({
            type: "GET",
            url: "/List_GI/Online_Pass_Check.asp",
            data: "GI_No=" + gino + "&S_Type=EPC&Pass_Match=255",
            dataType: "html",
            success: function (data) {
                var brw = whichBrs();
                var scroll = 0;

                var hval = 610;
                var wval = 770;

                var ifrm_height = hval - 76;

                switch (brw) {
                    case 'Internet Explorer':
                        if (screen.availHeight < 670) {
                            hval = screen.availHeight;
                            ifrm_height = hval - 160;
                        }
                        break;
                    case 'Safari':
                        hval = 610; break;
                    case 'Firefox':
                        hval = 610; break;
                    case 'Chrome':
                        hval = 612;
                        if (screen.availHeight < 670) {
                            hval = screen.availHeight - 64;
                            ifrm_height = hval - 76;
                        }
                        break;
                    case 'Opera':
                        hval = 610; break;
                    default:

                }

                switch (data) {
                    case '0':
                        var go_url = "/List_GI/GIB_Read_Email_Frame.asp?GI_No=" + gino + "&Pass_Match=255&ifrm_height=" + ifrm_height;
                        OpenWin = window.open(go_url, 'onlinePass', 'width=' + wval + ',height=' + hval + ',toolbar=0,scrollbars=0,resizable=no,left=235,top=0');

                        break;

                    case "6":
                        if (confirm('회원님께서 열람제한 서비스에 등록한 기업입니다. 입사지원 하시겠습니까?')) { } else { return; }

                        var go_url = "/List_GI/GIB_Read_Email_Frame.asp??GI_No=" + gino + "&Pass_Match=255&pass_chk=1&ifrm_height=" + ifrm_height;
                        OpenWin = window.open(go_url, 'onlinePass', 'width=' + wval + ',height=' + hval + ',toolbar=0,scrollbars=0,resizable=no,left=235,top=0');

                        break;


                    default: pass_alert(data); break;
                }
            }
        });
    }
}

// 입사지원 얼랏 -- List_common.js 동기화!
function pass_alert(num) {
    switch (num) {
        case '1': alert('공고가 마감되어 지원이 불가능합니다.'); break;
        case '2': alert('공고가 삭제되어 지원이 불가능합니다.'); break;
        case '3': alert('이미 입사지원한 채용공고입니다.'); break;
        case '4': alert('기업회원이 회원님의 이력서를 열람하고 스크랩하여 검토중입니다.'); break;
        case '5': alert('이력서가 완성되지 않았습니다.'); break;
        case '6': alert('열람기업 제한 서비스에 등록된 기업이므로  입사지원을 할 수 없습니다.'); break;
        case '7': alert('이미 입사지원을 3회 하신 채용공고 이므로\n\n더 이상 입사지원이 불가합니다.\n\n동일 공고에 입사지원은 최대 3회까지 가능합니다.'); break;
    }
}



// 원형 롤링배너 클릭 체크
function goBeltPointBnnrClick(GITypeCode, UseHistNo, Gno, OrderNo) {
    jQuery.ajax({
        type: "GET",
        url: "/Include/MainInc/BeltPoint_Bnnr_Click_Update.asp",
        data: "GI_Type_Code=" + GITypeCode + "&Use_Hist_No=" + UseHistNo + "&Gno=" + Gno + "&Order_No=" + OrderNo,
        cache: false
    });
}

// 숫자 체크
function isDigit(str) {
    var i;
    for (i = 0; i < str.length; i++) {
        var ch = str.substr(i, 1).toUpperCase();
        if ((ch < "0") || (ch > "9")) {
            return true;
        }
    }
    return false;
}

function Number_Only(form, name) {
    var tmp = form[name];
    if (isDigit(tmp.value)) {
        alert("숫자로만 입력해 주십시오.");
        tmp.value = "";
    }
}

function SendSms() {
    var f = SmsForm;
    var Mobile1 = f.Mobile1.value;
    var Mobile2 = f.Mobile2.value;
    var Mobile3 = f.Mobile3.value;

    if ((Mobile2 == "") || (Mobile3 == "")) {
        alert("휴대폰 번호를 입력해주세요.");
        return false;
    }

    var $agree = $("#lb_agree");
    if (!$agree.prop("checked")) {
        alert("개인정보이용에 동의해 주세요.");
        $agree.focus();
        return false;
    }
    var Mobile = f.Mobile1.value + f.Mobile2.value + f.Mobile3.value;

    jQuery.ajax({
        type: "GET",
        url: "/Include/Menu/Gnb_SMS_Send.asp",
        data: "Mobile=" + Mobile + "&Cate_No=1&Gi_No=0",
        cache: false,
        success: function (data) {
            if (data == "0") {
                alert("문자메시지를 발송하였습니다.");
            } else {
                alert("1일 동일한 번호로 3번까지 발송할 수 있습니다.\n내일 이용해주세요.");
            }
        }
    });
}

function OpenWindow_Photoup(a, b, c, d) {
    var a = a + "?re_url=" + escape(location.href);
    OpenWin = window.open(a, 'popDialog01', 'toolbar=no,location=no,directories=no,status=no,scrollbars=no,menubar=no,width=' + b + ',height=' + c);
}


// 인기키워드 클릭
function go_sm_search(idx, keyword) {
    jQuery.ajax({
        type: "GET",
        url: "/Main/Best_Keyword_Click",
        data: "Idx=" + idx,
        cache: false,
        async: false
    });

    top.location.href = "/Search/?stext=" + escape(keyword);
}

// 공고상세 이동
var go_gi_read = function (mem_type, gno) {
    window.open("/Recruit/GI_Read/" + gno + "?Oem_Code=" + mem_type + "1", "", "");
}

// 온라인 입사지원
var lay_Apply_Open = function (funType, gino) {
    var stat = false;
    jQuery.ajax({
        type: "post",
        async: false,
        url: "/Recruit/OnPass_Apply?funType=" + funType + "&gino=" + gino,
        success: function (data) {

            if (jQuery.trim(data) != "") {
                lay_Apply_Cls();

                // 레이어 위치 조절 전 hide 대신 좌측으로 넘겼다가 가져옴.
                // hide 실행시 해당 div의 height 조절 못함

                jQuery("body").append(data).find("div.lyOnPassApply").css("left", "-9999px");

                lay_Apply_Frm_Size();

            } else {
                stat = true;
            }
        }
    });

    return stat;
}

/* 온라인/이메일 입사지원 로그인 레이어 */
// 레이어 닫기
var lay_Apply_Cls = function () {
    jQuery("div.lyOnPassApply").remove();
}

// 프레임 사이즈 - Ajax 호출시
var lay_Apply_Frm_Size = function () {
    var jQueryheight = 0;
    var jQueryobj = jQuery("#onPassApply_Frame");

    if (jQueryobj.length) {
        if (jQueryobj.attr("src").toLowerCase().indexOf("m_login_layer") > -1) {
            jQueryheight = jQueryobj.height();
            lay_Apply_Size_Chg(jQueryheight);
        }
    }
}

// 프레임 리사이즈
var lay_Apply_Size_Chg = function (_height) {
    var jQuerydiv = jQuery("body").find("div.lyOnPassApply");
    var jQueryobj = jQuery("#onPassApply_Frame");

    jQueryobj.css("height", _height);

    var isIE = navigator.userAgent.toLowerCase().indexOf("msie") !== -1;

    if (isIE) {
        var $width = window.innerWidth ? window.innerWidth : $(window).width();
        var $height = window.innerHeight ? window.innerHeight : $(window).height();

        var jQueryleft = jQuery(window).scrollLeft() + ($width - jQueryobj.width()) / 2;
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

        var jQueryleft = scrollLeft + ($width - jQueryobj.width()) / 2;
        var jQuerytop = scrollTop + ($height - jQuerydiv.height()) / 2;
    }

    jQuerydiv.css({
        "position": "absolute",
        "z-index": "999999",
        "left": jQueryleft,
        "top": jQuerytop
    });
}

//진행중인 채용공고 열기
function OpenNoticeInNewTab(url) {
    var tab = window.open(url, "_blank");
    //tab.focus();
}
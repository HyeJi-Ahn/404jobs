var SpaceClick = function (Gno, Space_Code) {
    if (Gno != '' && Gno != '0') {
        jQuery.ajax({
            type: "GET",
            url: "/Recruit/GI/SpaceClick",
            data: "Gno=" + Gno + "&Space_Code=" + Space_Code,
            async: false
        });
    }
}

var SpaceClick_Summary = function (Gno, Space_Code, ifrno) {
    if (Gno != '' && Gno != '0') {
        if (jQuery("#jobframe" + ifrno).is(":visible")) {
            jQuery.ajax({
                type: "GET",
                url: "/Recruit/GI/SpaceClick",
                data: "Gno=" + Gno + "&Space_Code=" + Space_Code,
                cache: false,
                async: false
            });
        }
    }
}

var OptClick = function (Page_Code, Position, Gi_No, Guin_Type) {
    if (Gi_No != '' && Gi_No != '0') {
        jQuery.ajax({
            type: "GET",
            url: "/List_GI/Opt_Click_Cnt.asp",
            data: "GI_No=" + Gi_No + "&Page_Code=" + Page_Code + "&Position=" + Position + "&Guin_Type=" + Guin_Type,
            async: false
        });
    }
}

var OptClick_Summary = function (Page_Code, Position, Gi_No, ifrno) {
    if (jQuery("#jobframe" + ifrno).is(":visible")) {
        jQuery.ajax({
            type: "GET",
            url: "/List_GI/Opt_Click_Cnt.asp",
            data: "GI_No=" + Gi_No + "&Page_Code=" + Page_Code + "&Position=" + Position,
            async: false
        });
    }
}


var adobeDtmOptClick = function (pageCode, optCode) {
    var code = "";

    switch (pageCode) {
        case "JH":
            switch (optCode) {
                case "VVIP":
                    code = "홈|VVIP";
                    break;
                case "GrandPlusPrime":
                    code = "홈|Prime";
                    break;
                case "GrandPlusGold":
                    code = "홈|플러스Gold";
                    break;
                case "GrandPlus":
                    code = "홈|GrandPlus";
                    break;
                case "Grand":
                    code = "홈|Grand";
                    break;
                case "Gold":
                    code = "홈|Gold";
                    break;
                case "Silver":
                    code = "홈|Silver";
                    break;
                case "HotHeadline":
                    code = "홈|HOT헤드라인";
                    break;
                case "HotPoint":
                    code = "홈|HOT포인트";
                    break;
            }
            break;
        case "GM":
            switch (optCode) {
                case "GrandPrime":
                    code = "채용|Prime";
                    break;
                case "GrandGold":
                    code = "채용|플러스Gold";
                    break;
                case "Gold":
                    code = "채용|Gold";
                    break;
                case "Silver":
                    code = "채용|Silver";
                    break;
                case "SpecialHeadline":
                    code = "채용|Specia헤드라인";
                    break;
                case "SpecialPoint":
                    code = "채용|Specia포인트";
                    break;
                case "Special":
                    code = "채용|Specia채용";
                    break;
            }
            break;
    }

    //if (code && window.dtmHelper && window._satellite) {
    //    window.dtmHelper.set("evar32", code);
    //    _satellite.track("event15_call");
    //}
}

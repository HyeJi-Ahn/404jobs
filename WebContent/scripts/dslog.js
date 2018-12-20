var DataStoryLogger = function () {
    window.dsValDic = (window.dsValDic == undefined) ? {} : window.dsValDic;
    window.dsTypeDic = (window.dsTypeDic == undefined) ? {} : window.dsTypeDic;

    for (var i = 0; i < this.Context.config._n_click_logging_max; i++) {
        this.Context.dispatcherImages._n_click_images[i] = new Image();
    }

    this.Util.root = this.Core.root = this;
    this.Util.Context = this.Core.Context = this.Context;

};


DataStoryLogger.prototype.Context = {
    config:
        {
            _n_sid: "jobkorea"		/* custid */
            , _n_ls: ((location.protocol == "https:") ? "https" : "http") + "://ds.jobkorea.kr/wlo/Logging"		/* logging server */
            , _n_uls: ((location.protocol == "https:") ? "https" : "http") + "://ds.jobkorea.kr/wlo/UserLogging"	/* user logging server */
            , _n_uid: ""			/* uid */
            , _n_first_pcid: false
            , _n_click_logging_max: 30
            , _n_click_logging_num: 0
            , _n_ptype_param: "_wl_ptype"
            , _n_src_param: "_wl_src"
            , _n_keyword_param: "_wl_keyword"
            , _n_mid_param: "_wl_mid"
            , _n_convday_param: "_wl_convday"
            , _n_acqmoney_param: "_wl_convvalue"
            , _n_src_cookie: "NCHANNELSRC"
            , _n_keyword_cookie: "NCHANNELKWD"
            , _n_mid_cookie: "NCHANNELMID"
            , _n_date_cookie: "NCHANNELDATE"
            , _n_max_conv_day: 7
            , _n_cookie_convtype: "NCONVTYPE"
            , _n_cookie_convkwd: "NCONVKWD"
            , _n_delay_cookie: "DSIF"
            , _n_use_subcookie: false	/* use sub cookie */
            , _n_use_channel: false		/* use inflow channel */
            , _n_use_cpc: false		/* use CPC */
            , _n_bank_uid: ""		// bank uid (non cookie uid)
            , _n_bank_uid_name: "WLUID"	// bank uid key name (for log's cookie name)
            , _n_uid_cookie: "" //dynamic
            , _n_f_uid_decode: "" //dynamic
            , _n_uid_subcookie: "" //dynamic
            , _n_uid_name: ""
            , _n_uid_value: ""
            , _n_uid_sub: "" //dynamic
            , _n_uid_attr1: "" //dynamic - collection - sequence
            , _n_uid_attr2: ""
            , _n_uid_attr3: ""
            , _n_uid_attr4: ""
            , _n_uid_attr5: ""
            , _n_uid_attr6: ""
            , _n_uid_attr7: ""
            , _n_p_uid: "" //dynamic
            , _n_show_title: false //dynamic
            , _n_f_buyconv: false //dynamic - case state 
            , _n_f_subscriptionconv: false //dynamic - case state 
            , _n_f_conv1: false //dynamic - case state 
            , _n_f_conv2: false //dynamic - case state 
            , _n_f_conv3: false //dynamic - case state 
        },
    dispatcherImages:
        {
            _n_logging_image: new Image(),
            _n_user_image: new Image(),
            _n_click_images: {}
        }
}

DataStoryLogger.prototype.Core = {
    root: undefined,
    Context: undefined,
    n_getBI: function () {
        var str = "";
        var dt = document;
        var strScreenSize = "";
        var ws = window.screen;
        if (ws != null && ws != "undefined") {
            strScreenSize = screen.width + "x" + screen.height;
        }
        str += "n_ss=" + strScreenSize + "; ";
        var cs = "-";
        var nv = navigator;
        if (nv.language) {
            cs = nv.language.toLowerCase();
        } else if (nv.userLanguage) {
            cs = nv.userLanguage.toLowerCase();
        }
        str += "n_cs=" + cs + "; ";
        return str;
    },//n_getBI
    n_getSubCV: function (cv, offset, escapeFlag, delim) {
        var endstr = cv.indexOf(delim, offset);
        if (endstr == -1) endstr = cv.length;
        if (escapeFlag)
            return unescape(cv.substring(offset, endstr));
        else
            return cv.substring(offset, endstr);
    },//n_getSubCV
    n_getCV: function (dc, offset, escapeFlag) {
        var endstr = dc.indexOf(";", offset);
        if (endstr == -1) endstr = dc.length;
        if (escapeFlag)
            return unescape(dc.substring(offset, endstr));
        else
            return dc.substring(offset, endstr);
    }, //n_getCV
    n_GetSubCookie: function (name, cv) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = cv.length;
        var i = 0;

        while (i < clen) {
            var j = i + alen;
            if (cv.substring(i, j) == arg) {
                return this.n_getSubCV(cv, j, false, "&");
            }
            i = cv.indexOf("&", i) + 1;
            if (i == 0) break;
        }
        return null;
    },//n_GetSubCookie
    n_GetCookie: function (name, escapeFlag) {
        var cfg = this.Context.config;
        var dc = document.cookie;
        var arg = name + "=";
        var alen = arg.length;
        var clen = dc.length;
        var i = 0;

        while (i < clen) {
            var j = i + alen;
            if (dc.substring(i, j) == arg) {
                if (cfg._n_use_subcookie) {
                    return this.n_getSubCV(dc, j, escapeFlag, ";");
                } else {
                    return this.n_getCV(dc, j, escapeFlag);
                }
            }
            i = dc.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
    },//n_GetCookie
    n_SetCookie: function (name, value) {
        var argv = this.n_SetCookie.arguments;
        var argc = this.n_SetCookie.arguments.length;
        var expires = (2 < argc) ? argv[2] : null;
        var path = (3 < argc) ? argv[3] : null;
        var domain = (4 < argc) ? argv[4] : null;
        var secure = (5 < argc) ? argv[5] : false;

        document.cookie =
            name + "=" + escape(value)
            + ((expires == null) ? "" : ("; expires=" + expires.toGMTString()))
            + ((path == null) ? "" : ("; path=" + path))
            + ((domain == null) ? "" : ("; domain=" + domain))
            + ((secure == true) ? "; secure" : "");
    },//n_SetCookie
    n_DeleteCookie: function (name, path, domain) {
        if (this.n_GetCookie(name, false)) {
            document.cookie = name + "=" +
                ((path) ? ";path=" + path : "") +
                ((domain) ? ";domain=" + domain : "") +
                ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    },//n_DeleteCookie
    n_makePersistentCookie: function (name, length, path, domain) {
        var today = new Date();
        var expiredDate = new Date(2100, 1, 1);
        var cookie;
        var value;
        var cfg = this.Context.config;

        cookie = this.n_GetCookie(name, true);

        if (cookie) {
            cfg._n_first_pcid = false;
            return cookie;
        }
        cfg._n_first_pcid = true;

        var values = new Array();

        for (i = 0; i < length; i++) {
            values[i] = "" + Math.random();
        }

        value = today.getTime();

        for (i = 0; i < length; i++) {
            value += values[i].charAt(2);
        }

        this.n_SetCookie(name, value, expiredDate, path, domain);
        return value;
    },//n_makePersistentCookie
    n_encodeStr: function (s) {
        if (typeof (encodeURI) == 'function') {
            s = encodeURI(s);
            s = s.split("#").join("%23");
            return s;
        }
        else {
            return escape(s);
        }
    },//n_encodeStr
    n_paramEncodeStr: function (s) {
        s = s.split("&").join("|");
        s = s.split("?").join(" ");
        s = s.split("/").join("|");
        return this.n_encodeStr(s);
    },//n_paramEncodeStr
    n_getDomain: function () {
        var _host = document.domain;
        var so = _host.split('.');

        if (this.n_isIpType(so)) return (so[0] + '.' + so[1] + '.' + so[2] + '.' + so[3]);
        if (so.length != 4 && so.length != 3) return _host;

        var dm = so[so.length - 2] + '.' + so[so.length - 1];
        return (so[so.length - 1].length == 2) ? so[so.length - 3] + '.' + dm : dm;
    },//n_getDomain
    n_getReferrer: function () {
        var my_ref = self.document.referrer;
        var parent_href = "";
        var parent_ref = "";

        try {
            parent_href = top.document.location.href;
            parent_ref = top.document.referrer;
        }
        catch (e) {
            return my_ref;
        }

        if (my_ref == parent_href)
            return parent_ref;

        return my_ref;
    },//n_getReferrer
    n_getCookieStr: function () {
        var pcid = ""; /* PCID */
        var ncf = ""; /* Cookie Field */
        var binfo = this.n_getBI(); /* Browser Info */
        var domain = ""; /* Domain */
        var cfg = this.Context.config;

        domain = this.root.Util.getDomain();

        pcid = this.n_makePersistentCookie("PCID", 10, "/", domain);


        if (pcid != null && pcid != "") {
            var cookies = "";

            if (cfg._n_first_pcid == false)
                cookies += "PCID" + "=" + pcid + "; ";

            if ((typeof cfg._n_uid_cookie) != "undefined" && cfg._n_uid_cookie != "") {

                if ((typeof cfg._n_f_uid_decode) == "undefined" || cfg._n_f_uid_decode == true) {
                    cfg._n_uid = this.n_GetCookie(cfg._n_uid_cookie, true);
                } else {
                    cfg._n_uid = this.n_GetCookie(cfg._n_uid_cookie, false);
                }
                if (cfg._n_uid != null && cfg._n_uid != "") {
                    if (cfg._n_use_subcookie && (typeof cfg._n_uid_subcookie) != "undefined" && cfg._n_uid_subcookie != "") {
                        cfg._n_uid_sub = this.n_GetSubCookie(cfg._n_uid_subcookie, _n_uid);
                        if (cfg._n_uid_sub != null && cfg._n_uid_sub != "") {
                            cookies += cfg._n_uid_subcookie + "=" + cfg._n_uid_sub + "; ";
                        }
                    } else
                        cookies += cfg._n_uid_cookie + "=" + cfg._n_uid + "; ";
                }
            } else if (cfg._n_uid_name != "" && cfg._n_uid_value != "") {
                cookies += cfg._n_uid_name + "=" + cfg._n_uid_value + "; ";
            }



            if ((typeof cfg._n_bank_uid) != "undefined" && cfg._n_bank_uid != "") {
                cookies += cfg._n_bank_uid_name + "=" + cfg._n_bank_uid + "; ";
            }

            return cookies + binfo;
        }
        else {
            return document.cookie + binfo;
        }
    },//n_getCookieStr
    n_userattr_logging: function () /* User Attr Logging */ {
        //TODO : Rename Function : dispatch userAttr
        var uid_attr1 = "";
        var uid_attr2 = "";
        var uid_attr3 = "";
        var uid_attr4 = "";
        var uid_attr5 = "";
        var uid_attr6 = "";
        var uid_attr7 = "";
        var uid_url = "";

        var cfg = this.Context.config;


        if (cfg._n_uid == null || cfg._n_uid == "") {
            if (cfg._n_bank_uid != null && cfg._n_bank_uid != "")
                cfg._n_uid = cfg._n_bank_uid;
            else
                return;
        }

        if ((typeof cfg._n_uid_attr1) != "undefined" && cfg._n_uid_attr1 != "") uid_attr1 = cfg._n_uid_attr1;
        if ((typeof cfg._n_uid_attr2) != "undefined" && cfg._n_uid_attr2 != "") uid_attr2 = cfg._n_uid_attr2;
        if ((typeof cfg._n_uid_attr3) != "undefined" && cfg._n_uid_attr3 != "") uid_attr3 = cfg._n_uid_attr3;
        if ((typeof cfg._n_uid_attr4) != "undefined" && cfg._n_uid_attr4 != "") uid_attr4 = cfg._n_uid_attr4;
        if ((typeof cfg._n_uid_attr5) != "undefined" && cfg._n_uid_attr5 != "") uid_attr5 = cfg._n_uid_attr5;
        if ((typeof cfg._n_uid_attr6) != "undefined" && cfg._n_uid_attr6 != "") uid_attr6 = cfg._n_uid_attr6;
        if ((typeof cfg._n_uid_attr7) != "undefined" && cfg._n_uid_attr7 != "") uid_attr7 = cfg._n_uid_attr7;

        if (uid_attr1 != "" || uid_attr2 != "" || uid_attr3 != "" || uid_attr4 != "" || uid_attr5 != "" || uid_attr6 != "" || uid_attr7 != "") {

            uid_url = cfg._n_uls +
                "?" +
                "dv=" + Math.random() +
                "|ver=1.0.0" +
                "|sid=" + this.n_encodeStr(cfg._n_sid) +
                "|u=" + this.n_encodeStr(cfg._n_uid) +
                "|a1=" + this.n_encodeStr(uid_attr1) +
                "|a2=" + this.n_encodeStr(uid_attr2) +
                "|a3=" + this.n_encodeStr(uid_attr3) +
                "|a4=" + this.n_encodeStr(uid_attr4) +
                "|a5=" + this.n_encodeStr(uid_attr5) +
                "|a6=" + this.n_encodeStr(uid_attr6) +
                "|a7=" + this.n_encodeStr(uid_attr7);
            this.Context.dispatcherImages._n_user_image.src = uid_url;
        }
    }, //n_userattr_logging
    n_Logging_P_UID: function () {
        var cfg = this.Context.config;
        if ((typeof cfg._n_p_uid) != "undefined" && cfg._n_p_uid != "") return true;
        return false;
    }, // n_Logging_P_UID
    n_click_logging: function (url) /* Click Logging */ {
        var cfg = this.Context.config;

        var argc = this.n_click_logging.arguments.length;
        var argv = this.n_click_logging.arguments;

        var _n_request = url;

        var _nr = this.n_getReferrer();
        var _n_referrer = (1 < argc) ? argv[1] : _nr;
        var c1 = (2 < argc) ? argv[2] : null;
        var _n_cookie = this.n_getCookieStr();
        var _n_agent = navigator.userAgent;

        var _n_target_url = cfg._n_ls +
            "?" +
            "dv=" + Math.random() +
            "|ver=1.0.0" +
            "|sid=" + this.n_encodeStr(_n_sid) +
            "|r=" + this.n_encodeStr(_n_request) +
            "|rf=" + this.n_encodeStr(_n_referrer) +
            "|c=" + this.n_encodeStr(_n_cookie) +
            "|a=" + this.n_encodeStr(_n_agent);

        if (c1 != null) {
            _n_target_url += "|_n_p1=" + c1;
        }

        cfg._n_click_logging_num++;
        this.Context.dispatcherImages._n_click_images[cfg._n_click_logging_num % cfg._n_click_logging_max].src = _n_target_url;
    },//n_click_logging
    n_get_channel_cookieparam: function () {
        var src;
        var keyword;
        var convdate;
        var convday;
        var mid;
        var retStr = "";
        var cfg = this.Context.config;

        src = this.n_GetCookie(cfg._n_src_cookie);
        keyword = this.n_GetCookie(cfg._n_keyword_cookie);
        convdate = this.n_GetCookie(cfg._n_date_cookie, true);
        mid = this.n_GetCookie(cfg._n_mid_cookie);

        var current = new Date();
        if (convdate == null) {
            convday = 0;
        } else {
            convdate = new Date(convdate);
            convday = Math.floor((current.getTime() + 32400000) / 1000 / 60 / 60 / 24) - Math.floor((convdate.getTime() + 32400000) / 1000 / 60 / 60 / 24);
        }

        if (convday <= 0) convday = 0;
        if (mid == null) mid = "0";
        if (src == null) src = "1";


        retStr += "|" + cfg._n_mid_param + "=" + mid;
        retStr += "|" + cfg._n_src_param + "=" + src;
        if (keyword != null) retStr += "|" + cfg._n_keyword_param + "=" + keyword;
        retStr += "|" + cfg._n_convday_param + "=" + convday;

        return retStr;
    },//n_get_channel_cookieparam
    n_common_logging: function (_req, _ref, _title) {

        var _n_request = _req;
        var _n_referrer = _ref;
        var _n_cookie = this.n_getCookieStr();
        var _n_agent = navigator.userAgent;
        var _n_title = _title;
        var cfg = this.Context.config;

        /* CPC */
        if (typeof (cfg._n_use_cpc) != "undefined" && cfg._n_use_cpc) {
            var convType = "";
            var convKwd = "";
            var requestTemp = "";

            /* Domain */
            var domain = this.root.Util.getDomain();

            convType = this.n_GetCookie(cfg._n_cookie_convtype, false);

            if (convType != "" && convType != null) {
                requestTemp += cfg._n_cookie_convtype + "=" + this.n_encodeStr(convType);
                this.n_DeleteCookie(cfg._n_cookie_convtype, "/", domain);
            }

            convKwd = this.n_GetCookie(cfg._n_cookie_convkwd, true);

            if (convKwd != "" && convKwd != null) {
                requestTemp += "&" + cfg._n_cookie_convkwd + "=" + convKwd;
                this.n_DeleteCookie(cfg._n_cookie_convkwd, "/", domain);
            }

            if (requestTemp != "") {
                if (_n_request.indexOf("?") != -1) {
                    _n_request += "&" + requestTemp;
                } else {
                    _n_request += "?" + requestTemp;
                }
            }
        }

        /* Make URL Parameter */
        var _n_target_url = cfg._n_ls +
            "?" +
            "dv=" + Math.round(Math.random() * 1999083012) +
            "|ver=1.0.0" +
            "|sid=" + this.n_encodeStr(cfg._n_sid) +
            "|r=" + this.n_encodeStr(_n_request) +
            "|rf=" + this.n_encodeStr(_n_referrer) +
            "|c=" + this.n_encodeStr(_n_cookie) +
            "|a=" + this.n_encodeStr(_n_agent);



        cfg._n_title = this.root.getVal("pagename") ? this.root.getVal("pagename") : cfg._n_title;
        if ((typeof cfg._n_show_title) != "undefined" && cfg._n_show_title)
            _n_target_url += "|t=" + this.n_paramEncodeStr(_n_title);


        if (this.n_Logging_P_UID()) {
            _n_target_url += "|_n_p_uid=" + this.n_paramEncodeStr(cfg._n_p_uid);
        }

        //report variable 
        for (var prob in window.dsTypeDic) {
            if (this.root.Util.isNullOrEmpty(window.dsTypeDic[prob]) == false) {
                _n_target_url += "|" + prob + "=" + this.n_paramEncodeStr(window.dsTypeDic[prob]);
            }
        }

        //report event type
        for (var prob in window.dsValDic) {
            if (this.root.Util.isNullOrEmpty(window.dsValDic[prob]) == false) {
                _n_target_url += "|" + prob + "=" + this.n_paramEncodeStr(window.dsValDic[prob]);
            }
        }

        /* Inflow Channel */
        if ((typeof cfg._n_use_channel) != "undefined" && cfg._n_use_channel == true) {

            var channelparam = "";
            var channelflag = false;

            if ((typeof cfg._n_f_buyconv) != "undefined" && cfg._n_f_buyconv == true) {
                channelparam = this.n_get_channel_cookieparam()
                _n_target_url += "|" + cfg._n_ptype_param + "=2";
                channelflag = true;
            } else if ((typeof cfg._n_f_subscriptionconv) != "undefined" && cfg._n_f_subscriptionconv == true) {
                channelparam = this.n_get_channel_cookieparam()
                _n_target_url += "|" + cfg._n_ptype_param + "=3";
                channelflag = true;
            } else if ((typeof cfg._n_f_conv1) != "undefined" && cfg._n_f_conv1 == true) {
                channelparam = this.n_get_channel_cookieparam()
                _n_target_url += "|" + cfg._n_ptype_param + "=4";
                channelflag = true;
            } else if ((typeof cfg._n_f_conv2) != "undefined" && cfg._n_f_conv2 == true) {
                channelparam = this.n_get_channel_cookieparam()
                _n_target_url += "|" + cfg._n_ptype_param + "=5";
                channelflag = true;
            } else if ((typeof cfg._n_f_conv3) != "undefined" && cfg._n_f_conv3 == true) {
                channelparam = this.n_get_channel_cookieparam()
                _n_target_url += "|" + cfg._n_ptype_param + "=6";
                channelflag = true;
            }

            if (channelflag) {
                var domain = this.root.Util.getDomain();
                _n_target_url += "|" + cfg._n_acqmoney_param + "=" + this.n_getParam(cfg._n_acqmoney_param);
                _n_target_url += channelparam;
            }

            this.n_channel_search();
        }

        if (typeof (cfg._n_use_cpc) != "undefined" && cfg._n_use_cpc) {
            this.n_cpc_search();
        }

        var inflow_value = this.n_inflow_cookie();
        if (inflow_value != null && inflow_value != "") {
            _n_target_url += "|" + cfg._n_delay_cookie + "=" + this.n_encodeStr(inflow_value);

        }

        this.Context.dispatcherImages._n_logging_image.src = _n_target_url;

        /* Call User Logging Function */
        this.n_userattr_logging();
    }//n_common_logging
    /*
    , n_logging: function () // Logging Function 
	    var cfg = this.Context.config;
	    this.n_common_logging(document.location.href, this.n_getReferrer(), document.title.toString());
	}, //n_logging
    */
    , n_logging: function (currentHref, refferHref, title) /* Logging Function */ {
        currentHref = (currentHref == undefined) ? document.location.href : currentHref;
        refferHref = (refferHref == undefined) ? this.n_getReferrer() : refferHref;
        title = (title == undefined) ? document.title.toString() : title;

        var cfg = this.Context.config;
        this.n_common_logging(currentHref, refferHref, title);
    }, //n_logging
    n_parent_logging: function () {
        var cfg = this.Context.config;
        if (cfg._n_sid == "07010100000")
            return;

        var parent_href = "";
        var parent_ref = "";
        var parent_title = "";

        try {
            parent_href = top.document.location.href;
            parent_ref = top.document.referrer;
            parent_title = top.document.title.toString();
            this.n_common_logging(parent_href, parent_ref, parent_title);
        }
        catch (e) {
            /* Nothing */
        }
    },//n_parent_logging
    n_getParam: function (name) {
        var param = name + "=";
        var url = "" + self.document.location.search;
        var turl = "";

        try {
            turl = top.document.location.search;
        } catch (_e) {
            //nothing
        };

        url = url + "&" + turl;

        if (url.indexOf(param) != -1) {
            var x = url.indexOf(param) + param.length;
            var y = url.substr(x).indexOf("&");
            if (y != -1) return url.substring(x, x + y);
            else return url.substr(x);
        }
        return "";

    },//n_getParam
    n_inflow_cookie: function () {
        var cfg = this.Context.config;
        var cmpid = this.n_getParam("cmpid");
        var gclid = this.n_getParam("gclid");
        var DMSKW = this.n_getParam("DMSKW");
        var n_query = this.n_getParam("n_query");
        var monds = this.n_getParam("monds");
        var domain = "";
        var expiredDate = new Date();
        var inflow_cookie = "";

        inflow_cookie = this.n_GetCookie(cfg._n_delay_cookie, true);
        if (inflow_cookie != null && inflow_cookie != "") {
            return inflow_cookie;
        } else {
            if ((typeof this.Context.config._n_domain) != "undefined" && this.Context.config._n_domain != "") {
                domain = this.Context.config._n_domain;
            }
            else {
                domain = this.n_getDomain();
            }

            expiredDate.setTime(Math.floor((expiredDate.getTime() + 32400000) / 86400000) * 86400000 - 32400000 + 1000 * 60 * 60 * 24 * 7 - 1);
            if (cmpid != "" && cmpid != null) {
                this.n_SetCookie(cfg._n_delay_cookie, cmpid, expiredDate, "/", domain);
            } else if (gclid != "" && gclid != null) {
                this.n_SetCookie(cfg._n_delay_cookie, "google", expiredDate, "/", domain);
            } else if (DMSKW != "" && DMSKW != null) {
                this.n_SetCookie(cfg._n_delay_cookie, "daum", expiredDate, "/", domain);
            } else if (n_query != "" && n_query != null) {
                this.n_SetCookie(cfg._n_delay_cookie, "naver", expiredDate, "/", domain);
            } else if (monds != "" && monds != null) {
                this.n_SetCookie(cfg._n_delay_cookie, monds, expiredDate, "/", domain);
            }
            return this.n_GetCookie(cfg._n_delay_cookie, true);
        }
        return;
    },//n_inflow_cookie
    n_channel_search: function () {
        var cfg = this.Context.config;
        var ptype = this.n_getParam(cfg._n_ptype_param);

        var keyword = "";

        if (ptype == "1") {
            var currentDate = new Date();
            var mid = this.n_getParam(cfg._n_mid_param);
            var src = this.n_getParam(cfg._n_src_param);

            if (src == "2") {
                keyword = this.n_getParam("OVKEY");
            } else if (src == "3") {
                keyword = this.n_getParam("NVKWD");
            } else {
                keyword = this.n_getParam(_n_keyword_param);
            }

            this.n_create_channel_cookie(mid, src, currentDate, keyword);
        }
    }, //n_channel_search
    n_create_channel_cookie: function (mid, src, date, keyword) {
        var cfg = this.Context.config;
        var domain = this.root.Util.getDomain();
        var expiredDate = new Date();

        if (mid == "") mid = "0";
        if (src == "") src = "1";

        expiredDate.setTime(Math.floor((date.getTime() + 32400000) / 86400000) * 86400000 - 32400000 + 1000 * 60 * 60 * 24 * (_n_max_conv_day + 1) - 1);

        this.n_SetCookie(cfg._n_date_cookie, date, expiredDate, "/", domain);
        this.n_SetCookie(cfg._n_mid_cookie, mid, expiredDate, "/", domain);
        this.n_SetCookie(cfg._n_src_cookie, src, expiredDate, "/", domain);

        if (keyword != "") {
            this.n_SetCookie(cfg._n_keyword_cookie, keyword, expiredDate, "/", domain);
        } else {
            this.n_DeleteCookie(cfg._n_keyword_cookie, "/", domain);
        }
    }, //n_create_channel_cookie
    n_set_conversion: function (convtype) {
        var cfg = this.Context.config;
        _n_f_conv = true;//Error 위험
        if (convtype == "BUYCONV") {
            cfg._n_f_buyconv = true;
        } else if (convtype == "SUBSCRIPTIONCONV") {
            cfg._n_f_subscriptionconv = true;
        } else if (convtype == "USERDEF1CONV") {
            cfg._n_f_conv1 = true;
        } else if (convtype == "USERDEF2CONV") {
            cfg._n_f_conv2 = true;
        } else if (convtype == "USERDEF3CONV") {
            cfg._n_f_conv3 = true;
        }

    }, //n_set_conversion
    n_cpc_search: function () {
        var cfg = this.Context.config;
        var ref = this.n_getReferrer();
        var tref = "";

        try {
            tref = top.document.referrer;
        } catch (_e) {
            //nothing
        };

        var bFormat = false;

        if (ref == tref) {
            ref = tref;
            bFormat = true;
        }

        if (ref == 'undefined') ref = "";

        var buykeyword = "";
        var nv_ar = "";
        var cpc_src = "";

        /* Domain */
        var domain = this.root.Util.getDomain();

        if (bFormat) {
            var expiredDate = new Date();

            expiredDate.setTime(expiredDate.getTime() + 1000 * 60 * 60 * 24 * _n_max_conv_day);

            buykeyword = this.n_getParam("OVKEY");

            if (buykeyword != "") {
                // ADD COOKIE (OVERTURE)
                this.n_SetCookie(cfg._n_cookie_convtype, "OVERTURE", expiredDate, "/", domain);
                this.n_SetCookie(cfg._n_cookie_convkwd, buykeyword, expiredDate, "/", domain);
            }

            buykeyword = this.n_getParam("NVADKWD");

            if (buykeyword != "") {
                nv_ar = this.n_getParam("NVAR");

                this.n_SetCookie(cfg._n_cookie_convtype, "NAVER_" + nv_ar, expiredDate, "/", domain);
                this.n_SetCookie(cfg._n_cookie_convkwd, buykeyword, expiredDate, "/", domain);
            }

            buykeyword = this.n_getParam("nkwd");

            if (buykeyword != "") {
                cpc_src = this.n_getParam("nsrc");

                if (cpc_src == "daum") {
                    // ADD COOKIE ( DAUM );		
                    this.n_SetCookie(cfg._n_cookie_convtype, "DAUM", expiredDate, "/", domain);
                    this.n_SetCookie(cfg._n_cookie_convkwd, buykeyword, expiredDate, "/", domain);
                } else if (cpc_src == "google") {
                    // ADD COOKIE ( GOOGLE );
                    this.n_SetCookie(cfg._n_cookie_convtype, "GOOGLE", expiredDate, "/", domain);
                    this.n_SetCookie(cfg._n_cookie_convkwd, buykeyword, expiredDate, "/", domain);
                } else if (cpc_src == "nate") {
                    // ADD COOKIE ( NATE );
                    this.n_SetCookie(cfg._n_cookie_convtype, "NATE", expiredDate, "/", domain);
                    this.n_SetCookie(cfg._n_cookie_convkwd, buykeyword, expiredDate, "/", domain);
                }
            }
        }
    }, //n_cpc_search
    n_isIpType: function (val) {
        if (val.length != 4) return false;

        for (var i = 0; i < 4; i++) {
            if (!this.n_isInteger(val[i])) {
                return false;
            }
        }


        return true;
    }, //n_isIpType
    n_isInteger: function (val) {
        if (this.n_isBlank(val)) {
            return false;
        }

        for (var i = 0; i < val.length; i++) {
            if (!this.n_isDigit(val.charAt(i))) {
                return false;
            }
        }
        return true;
    }, //n_isInteger
    n_isDigit: function (num) {
        if (num.length > 1) {
            return false;
        }

        var string = "1234567890";
        if (string.indexOf(num) != -1) {
            return true;
        }

        return false;
    }, //n_isDigit
    n_isBlank: function (val) {
        if (val == null) {
            return true;
        }
        for (var i = 0; i < val.length; i++) {
            if ((val.charAt(i) != ' ') && (val.charAt(i) != "\t") && (val.charAt(i) != "\n") && (val.charAt(i) != "\r")) {
                return false;
            }
        }

        return true;
    }//n_isBlank
}

DataStoryLogger.prototype.Util =
    {
        root: null,
        Context: null,
        isNullOrEmpty: function (val) {
            return (val == null || val == "" || val == undefined || val == "undefined" || val == "null");
        },
        getDomain: function () {
            var result = "";

            if ((typeof this.Context.config._n_domain) != "undefined" && this.Context.config._n_domain != "") {
                result = this.Context.config._n_domain;
            }
            else {
                result = this.root.Core.n_getDomain();
            }

            return result;
        }
    }

DataStoryLogger.prototype.setUID = function (uid) {
    this.Context.config._n_uid_name = "UID";
    this.Context.config._n_uid_value = uid;
}

DataStoryLogger.prototype.setDSID = function (uid) {
    this.Context.config._n_uid_name = "DSID";
    this.Context.config._n_uid_value = uid;
}

DataStoryLogger.prototype.setSID = function (sid) {
    this.Context.config._n_sid = sid;
}

DataStoryLogger.prototype.setUIDCookie = function (uidcookiename) {
    this.Context.config._n_uid_cookie = uidcookiename;
}

DataStoryLogger.prototype.registVal = function (key, value) {
    window.dsValDic[key] = value;
};

DataStoryLogger.prototype.getVal = function (key) {
    return window.dsValDic[key];
};

DataStoryLogger.prototype.removeVal = function (key) {
    delete (window.dsValDic[key]);
};

DataStoryLogger.prototype.clearVal = function () {
    window.dsValDic = {}
}

DataStoryLogger.prototype.registType = function (type) {
    window.dsTypeDic[type] = type;
};

DataStoryLogger.prototype.removeType = function (type) {
    delete (window.dsTypeDic[type]);
};

DataStoryLogger.prototype.existType = function (type) {
    return (window.dsTypeDic[type] != undefined);
}

DataStoryLogger.prototype.clearType = function () {
    window.dsTypeDic = {};
}

/*
DataStoryLogger.prototype.dispatch = function () {
    this.Core.n_logging();
};

DataStoryLogger.prototype.dispatchByType = function (type) {
    this.clearType();
    this.registType(type);
    this.Core.n_logging();
};
*/

DataStoryLogger.prototype.dispatch = function (currentHref, refferHref, title) {
    this.Core.n_logging(currentHref, refferHref, title);
};

DataStoryLogger.prototype.dispatchByType = function (type, currentHref, refferHref, title) {
    this.clearType();
    this.registType(type);
    this.Core.n_logging(currentHref, refferHref, title);
};

DataStoryLogger.prototype.setShowTitle = function (val) {
    val = (val == undefined) ? false : true;
    this.Context.config._n_show_title = val;
}

window._dslog = new DataStoryLogger();


//쿠키 삭제
function deleteCookie(cookieName) {
    var expireDate = new Date();
    //어제 날짜를 쿠키 소멸 날짜로 설정한다.
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString() + ";path=/;domain=albamon.com;";
}

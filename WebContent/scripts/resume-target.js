// 자바스크립트 주석 템플릿 ie8에서 오류나서 replace로 변경
String.prototype.getTemplate = function () {
    var rtnStr = this;
    var word;
    var version = "N/A";
    var agent = navigator.userAgent.toLowerCase();
    var name = navigator.appName;
    // IE old version ( IE 10 or Lower ) 
    if (name == "Microsoft Internet Explorer") word = "msie ";
    else {
        // IE 11 
        if (agent.search("trident") > -1) word = "trident/.*rv:";
        // Microsoft Edge  
        else if (agent.search("edge/") > -1) word = "edge/";
    }
    var reg = new RegExp(word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})");

    if (reg.exec(agent) != null) version = RegExp.$1 + RegExp.$2;

    if (version === 'N/A' || version > 8) {
        rtnStr = rtnStr.replace("function () {/*", "").replace("*/}", "");
    } else {
        rtnStr = rtnStr.replace("(function () {/*", "").replace("*/})", "");
    }
    return rtnStr;
};

(function (factory) {
    var root = (typeof self === 'object' && self.self == self && self) ||
        (typeof global === 'object' && global.global == global && global);
    root.resume_target = factory(root, {}, (root.jQuery || root.$))
})(function (root, t, $) {
    
    t.init = function(type) {
        t.urls = {
            limit: '/User/ResumeMng/GetLimitCheck',
            change: '/User/ResumeMng/SetResumeTarget',
            gi3view: '/User/ResumeMng/GetGI3ReadStat',
            write: '/User/Resume/Write'
        };
        t.s = {
            undefined: 'undefined',
            localstorage: 'resume-target'
        }
        t.getResumeSummary(type);        
    }

    t.insertToFrame = function (html) {
        if (t.getDomain !== 'www') {
            $('body').append('<iframe id="frmError" src="" width="100%;" height="500px;" style="display:none;"></iframe>');
            var $frame = $('#frmError');
            if ($frame.length > 0) {
                $frame.show();
                var doc = $frame[0].contentWindow.document;
                var $body = $('body', doc);
                $body.html(html);
            }
        }
    }

    t.getDomain = function () {
        // 개발모드
        var host = window.location.hostname;
        var urls = host.split(".");
        var domain = '';
        if (urls.length > 0) {
            domain = urls[0];
        }

        if (domain === 'dev') {
            domain = 'dev.jts';
        }
        return domain;
    },

    t.getResumeSummary = function (type) {
        var url = t.urls.limit;        
        $.ajax({
            url: url,
            data: {  },
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            type: 'POST',
            dataType: 'JSON',
            cache: false,
            error: function (e) {
                if (typeof e !== t.s.undefined && e.status === 500) {
                    t.insertToFrame(e.responseText);
                }
            },
            success: function (result) {
                if (typeof result !== 'undefined') {
                    if(result.code != 3){
                        switch (type) {
                            case 1: t.mainManager.init(result); break;       // 메인페이지
                            case 2: t.myManager.init(result); break;         // 마이페이지
                            case 3: t.resumeManager.init(result); break;     // 이력서
                            case 4: 
                                t.giManager.init(result);
                                $('div.tplPagination a').click(function(e){
                                    t.giManager.init(result);
                                });
                                break;         // 공고뷰
                            case 5: t.completionManager.init(result); break; // 입사지원
                            case 6: t.peopleManager.init(result); break;     // 인재검색
                        }
                    }
                }
            }
        });
    };  

    t.ajax = function (type, message, reload) {
        $.ajax({
            url: t.urls.change,
            data: {
                type: type
            },
            contentType: 'application/x-www-form-urlencoded;charset=utf-8',
            type: 'POST',
            dataType: 'JSON',
            cache: false,
            error: function (e) {
                if (typeof e !== t.s.undefined && e.status === 500) {
                    t.insertToFrame(e.responseText);
                }
                alert('오류가 발생했습니다. 관리자에게 문의 부탁 드립니다.');
            },
            success: function (result) {
                if (typeof result !== 'undefined') {
                    if (result.code != '0') {
                        if(result.code == 3){

                        }else{
                            alert('오류가 발생했습니다. 관리자에게 문의 부탁 드립니다.')  
                        }
                    } else {
                        if(message !== undefined && message !== ''){
                            alert(message); 
                        }
                        if(reload){
                            window.location.reload();   
                        }
                        
                    }
                }
            }
        });
    }

    // 메인페이지 이력서 유도
    t.mainManager = {
        layer_templete: (function () {/*
            <div class="popup popup-job-offer">
                {0}
                <a href="#" class="button button-job-offer dev-resume-target" data-type="{2}">{1}</a>
                <button type="button" class="button button-close-today dev-resume-close-today">오늘 하루 보지 않기</button>
                <button type="button" class="button button-close dev-resume-close">닫기</button>
            </div>
        */}).toString().getTemplate(),
        init: function(result){
            var that = t.mainManager;
            var c    = t.common;
            var type = 0;

            if(c.loc_is){
                var data = c.loc_get_item('resume-target');
                if(data !== null && data.todayStat == '1' && data.expire > Date.now()){
                    return false;
                }
            }else{
                var data = c._getCookie('resume-target');
                if(data == 1){
                    return false;
                }
            }
            
            if (result.code === 0 || result.code === 2) {
                type = result.code === 2 ? 1 : type;
                if (result.open === 0) {
                    // 1 이력서O+인재정보 비공개+신입
                    // 2 이력서O+인재정보 비공개+경력
                    type = result.career === 0 ? 1 : 2;
                    switch (result.career) {
                        case 0: type = 1; break;
                        case 1: type = 2; break;
                        case 2: type = 0; break;
                    }
                } else {
                    // 3 이력서O+인재정보 공개+이력서업데이트 4주이상(업데이트한지 29일째 되는 날부터 노출)
                    type = result.upd_stat === 1 ? 3 : 0;
                }

                if (type > 0) {
                    that.pc(type, result.code);
                }
            }
        },
        pc: function(type, code){
            var that = t.mainManager;
            var c    = t.common;
            var buttonText = type === 3 ? '오늘 날짜로 업데이트' : '입사제안 받기';

            var msgList = new Array();
            msgList[0] = '<div class="header">취업 가능성을 높이고 싶으신가요?</div><div class="description">인재정보에 이력서를 등록하고 인사담당자에게 먼저 제안 받아보세요.</div>';
            msgList[1] = '<div class="header">이직을 생각 중이신가요?</div><div class="description">인재정보에 이력서를 등록하고, 인사담당자에게 제안받아보세요.</div>';
            msgList[2] = '<div class="header">포지션 제안을 더 받고 싶으신가요?</div><div class="description">기업은 <strong>최근에 작성∙수정된 이력서를 선호</strong>합니다.</div>';

            var html = t.common.format(that.layer_templete, msgList[type - 1], buttonText, type);
            $('div.quickMenuWrap').before(html);
            $('button.dev-resume-close').click(function(e){
                that.close();
            });
            $('button.dev-resume-close-today').click(function(e){
                if(c.loc_is){
                    c.loc_set_item({todayStat : 1}, 'resume-target', 1);    
                }else{
                    c._setCookie('resume-target', 1, 1);
                }
                that.close();
            });
            $('a.dev-resume-target').click(function (e) {
                c._preventDefault(e);
                if(code === 2){
                    window.location.href = t.urls.write;
                    return false;
                }
                // type
                // 1,2 : 인재검색등록
                // 3   : 이력서 수정일 최신 업데이트
                var type = $(this).attr('data-type');
                var msg = '';
                if(!isNaN(type) && type > 0){
                    if (type < 3) {
                        type = 1;
                        msg = '인사담당자가 먼저 발견할 수 있도록 인재검색에 등록되었습니다.';
                    } else if (type == 3) {
                        type = 2;
                        msg = '이력서 수정일이 오늘 날짜로 업데이트 되었습니다.';
                    }
                    that.close();
                    t.ajax(type, msg);
                }
            });
        },
        close: function(){
            var $div = $('div.popup-job-offer');
            if($div.length > 0){
                $div.hide();
            }
        },
    }

    // 마이페이지 이력서 유도
    t.myManager = {
        layer_templete: (function () {/*
            <div class="job-offer dev-job-offer">
                <div class="message-container">
                    <div class="message">‘<em>{0}</em>’ 동문들은 많은 기업으로부터 <strong>입사제안을 받고 있어요.</strong></div>
                </div>
                <a href="#" class="button button-job-offer dev-resume-target">입사제안 받기</a>
            </div>      
        */}).toString().getTemplate(),      
        init: function(result){
            var that = t.myManager;         
            var c    = t.common;
            // 이력서가 있고 비공개 일 때만
            if(result.code === 0 && result.open === 0 && result.edu_level > 20){
                if(result.school !== ''){
                    var html = t.common.format(that.layer_templete, result.school);
                    $('div.mtuTool').before(html);
                    $('a.dev-resume-target').click(function (e) {
                        c._preventDefault(e);
                        $('.dev-job-offer').hide();
                        t.ajax(1, '인사담당자가 먼저 발견할 수 있도록 인재검색에 등록되었습니다.');
                    });
                }               
            }
        }
    }


    t.resumeManager = {
        layer_templete: (function () {/*
            <div class="job-offer">
                <input type="checkbox" name="ResumeTargetOpen" id="lbl-resume-disclosure" class="skip" {0} />
                <label for="lbl-resume-disclosure">입사제안 받기</label>
                <div class="description">작성한 이력서를 기반으로 기업의 <strong>인사담당자나 헤드헌터로부터 먼저 입사제안</strong>을 받을 수 있습니다.</div>
                <div class="description">재직 중인 경우, 해당 기업에는 이력서가 비공개 됩니다.</div>
                <div class="description">본 이력서가 ‘기본 이력서’로 자동 설정됩니다.</div>
                <div class="description">상세 설정은 MY홈 ‘이력서 관리’에서 변경 가능합니다.</div>
            </div>
        */}).toString().getTemplate(),
        init: function(result){
            var that = t.resumeManager;
            var c    = t.common;
            var checked = '';
            var defaultStat = $('#UserResume_R_Default_Stat').val() == 'True';
            var inputStat = $('#IsEditPage').val() == 'True' ? 3 : 1;
            
            //가 (이력서 비공개 케이스)
            //1. 기본이력서> '비공개'이므로 디폴트 언체크 되어있어야 합니다.
            //2. 기본이외 이력서> 신규등록시 '입사제안받기' 디폴트 체크되야 합니다. (공개된 이력서가 없으므로 유도하기 위함)
            //3. 기본이외 이력서> 수정페이지에선 '입사제안받기' 디폴트 언체크되야 합니다. (비공개 의사가 반영되어있으므로)

            //나 (이력서 공개 케이스)
            //1. 기본이력서> 공개된 이력서이므로 디폴트 체크되야 합니다.
            //2. 기본이외 이력서> 신규등록시 '입사제안받기' 디폴트 언체크되야 합니다. (기본이력서가 이미 공개되어있으므로)
            //3. 기본이외 이력서> 수정페이지에선 '입사제안받기' 디폴트 언체크되야 합니다. (기본이력서가 이미 공개되어있으므로)

            // 가-2, 나-1
            openStat = (defaultStat == 1 && result.open == 1) || (result.open == 0 && (inputStat == 0 || inputStat == 1));
            if(openStat){
                checked = 'checked="checked"';
            }
            var html = c.format(that.layer_templete, checked);
            $('#FixedMenuView').before(html);
        },
        complete: function(rNo){
            $.ajax({
                url: t.urls.change,
                data: {
                    type : 1,
                    rNo : rNo,
                    openStat : $('#lbl-resume-disclosure').is(':checked') ? 1 : 0
                },
                contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                type: 'POST',
                dataType: 'JSON',
                async: false,
                cache: false,
                error: function (e) {
                    if (typeof e !== t.s.undefined && e.status === 500) {
                        t.insertToFrame(e.responseText);
                    }
                    alert('오류가 발생했습니다. 관리자에게 문의 부탁 드립니다.');
                },
                success: function (stat) {
                    // 성공
                    if (typeof stat !== 'undefined') {
                    }
                }
            }); 
        }
    }

    t.giManager = {
        layer_templete: (function () {/*
            <div class="job-offer">
                <div class="message"><strong>지원할 만한 공고가 안보이시나요?</strong> 인사담당자로부터 <strong class="offer">좋은 자리를 먼저 제안받아 보세요!</strong></div>
                <a href="#" class="button button-job-offer dev-gi-view-ok">입사제안 받기</a>
                <button type="button" class="button button-close-today dev-gi-close-today">오늘 하루 보지 않기</button>
                <button type="button" class="button button-close dev-gi-view-cancel">닫기</button>
            </div>          
            */}).toString().getTemplate(),
        init: function (result) {
            var that = t.giManager;
            var c    = t.common;

            if($('div.job-offer').length === 1){
                return false;
            }

            if(c.loc_is){
                var data = c.loc_get_item('resume-target-gi');
                if(data !== null && data.todayStat == '1' && data.expire > Date.now()){
                    return false;
                }
            }else{
                var data = c._getCookie('resume-target-gi');
                if(data == 1){
                    return false;
                }
            }

            if(result.open == 0 && result.code !== 1){
                that.pcAjax(result);
            }
        },
        pcAjax: function (result) {
            var that = t.giManager;            
            var c    = t.common;
            $.ajax({
                url: t.urls.gi3view,
                data: {},
                contentType: 'application/x-www-form-urlencoded;charset=utf-8',
                type: 'POST',
                dataType: 'JSON',
                cache: false,
                error: function (e) {
                    if (typeof e !== t.s.undefined && e.status === 500) {
                        t.insertToFrame(e.responseText);
                    }
                    alert('오류가 발생했습니다. 관리자에게 문의 부탁 드립니다.');
                },
                success: function (stat) {
                    if (typeof stat !== 'undefined') {
                        if(stat.stat == 1){
                            $('#dev-gi-list').after(that.layer_templete);
                            $('button.dev-gi-view-cancel').click(function (e) {
                                that.close();
                            });
                            $('button.dev-gi-close-today').click(function(e){
                                if(c.loc_is){
                                    c.loc_set_item({todayStat : 1}, 'resume-target-gi', 1); 
                                } else{
                                    c._setCookie('resume-target-gi', 1, 1);
                                }

                                that.close();
                            });
                            $('a.dev-gi-view-ok').click(function (e) {
                                c._preventDefault(e);
                                if(result.code === 2){
                                    window.location.href = t.urls.write;
                                }else{
                                    that.close();
                                    t.ajax(1, '인사담당자가 먼저 발견할 수 있도록 인재검색에 등록되었습니다.');    
                                }
                            });
                        }
                    }
                }
            }); 
        },
        close: function(){
            var $div = $('div.job-offer');
            if($div.length > 0){
                $div.hide();
            }
        },
    }

    t.completionManager = {
        layer_templete: (function () {/*
            <div class="job-offer dev-job-offer">
                <div class="job-offer-container">
                    <div class="message">이력서를 기반으로 기업의 인사담당자나<br>헤드헌터로부터 <strong>먼저 입사제안을 받아 보세요!</strong></div>
                    <a href="#" class="button button-job-offer dev-resume-target">입사제안 받기</a>
                </div>
            </div>
        */}).toString().getTemplate(),
        init: function(result){
            var that = t.completionManager;         
            var c    = t.common;
            // 이력서가 있고 비공개 일 때만
            if(result.code === 0 && result.open === 0){
                $('div.descListItem').before(that.layer_templete);
                $('a.dev-resume-target').click(function (e) {
                    c._preventDefault(e);
                    $('.dev-job-offer').hide();
                    t.ajax(1, '인사담당자가 먼저 발견할 수 있도록 인재검색에 등록되었습니다.', true);
                });

                var strWidth;
                var strHeight;
                //innerWidth / innerHeight / outerWidth / outerHeight 지원 브라우저
                if (window.innerWidth && window.innerHeight && window.outerWidth && window.outerHeight) {
                    strWidth = $('#onPassWrap').outerWidth() + (window.outerWidth - window.innerWidth);
                    strHeight = $('#onPassWrap').outerHeight() + (window.outerHeight - window.innerHeight);
                }
                else {
                    var strDocumentWidth = $(document).outerWidth();
                    var strDocumentHeight = $(document).outerHeight();
                    window.resizeTo ( strDocumentWidth, strDocumentHeight );
                    var strMenuWidth = strDocumentWidth - $(window).width();
                    var strMenuHeight = strDocumentHeight - $(window).height();
                    strWidth = $('#onPassWrap').outerWidth() + strMenuWidth;
                    strHeight = $('#onPassWrap').outerHeight() + strMenuHeight;
                }
                //resize
                window.resizeTo( strWidth, strHeight );
            }
        }
    }

    t.peopleManager = {
        layer_templete: (function () {/*
            <div class="popup popup-job-offer">
                <div class="popup-job-offer-container">
                    <div class="message"><em>취업 가능성을 높이고 싶으신가요?</em><br>인재정보에 이력서를 등록하고 <strong>인사담당자에게 먼저 제안 받아보세요.</strong></div>
                    <a href="#" class="button button-job-offer dev-resume-target" data-type="{0}">입사제안 받기</a>
                    <button type="button" class="button button-close-today dev-people-close-today">오늘 하루 보지 않기</button>
                    <button type="button" class="button button-close dev-people-close">닫기</button>
                </div>
                
            </div>      
        */}).toString().getTemplate(),
        init: function(result){
            var that = t.peopleManager;
            var c    = t.common;            

            if(c.loc_is){
                var data = c.loc_get_item('resume-target-people');
                if(data !== null && data.todayStat == '1' && data.expire > Date.now()){
                    console.log('하루닫기');
                    return false;
                }
            }else{
                var data = c._getCookie('resume-target-people');
                if(data == 1){
                    return false;
                }
            }

            // 이력서가 있거나 없을 때
            if (result.open === 0 && (result.code === 0 || result.code === 2)) {
                var html = c.format(that.layer_templete, result.code);
                $('body').append(html);

                $('button.dev-people-close').click(function(e){
                    that.close();
                });
                $('button.dev-people-close-today').click(function(e){
                    if(c.loc_is){
                        c.loc_set_item({todayStat : 1}, 'resume-target-people', 1); 
                    } else{
                        c._setCookie('resume-target-people', 1, 1);
                    }
                    that.close();
                });
                $('a.dev-resume-target').click(function (e) {
                    c._preventDefault(e);
                    if(result.code === 2){
                        window.location.href = t.urls.write;
                        return false;
                    }else{
                        that.close();
                        t.ajax(1, '인사담당자가 먼저 발견할 수 있도록 인재검색에 등록되었습니다.');
                    }
                });
            }           
        },
        close: function(){
            var $div = $('div.popup-job-offer');
            if($div.length > 0){
                $div.hide();
            }
        },
    }    

    t.common = {
        format: function () {
            var vString = arguments[0];
            for (var i = 1; i < arguments.length; i++) {

                var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                vString = vString.replace(regEx, arguments[i]);
            }
            return vString;
        },
        _preventDefault: function (e) {
            if (e.preventDefault) {
                e.preventDefault()
            } else {
                e.stop()
            };
            e.returnValue = false;
            e.stopPropagation();

            if (e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            } else {
                e.isImmediatePropagationEnabled = false;
            }
        },
        _setCookie: function(cookie_name, value, days, path) {
            path = typeof path === 'undefined' ? '/' : path;
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + days);
            // 설정 일수만큼 현재시간에 만료값으로 지정
            var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString()) + ';path=' + path;
            document.cookie = cookie_name + '=' + cookie_value;
        },
        _getCookie: function (name) {
            var x, y;
            var val = document.cookie.split(';');

            for (var i = 0; i < val.length; i++) {
                x = val[i].substr(0, val[i].indexOf('='));
                y = val[i].substr(val[i].indexOf('=') + 1);
                x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
                if (x == name) {
                    return unescape(y); // unescape로 디코딩 후 값 리턴
                }
            }
        },
        _delCookie: function(name){
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() - 1);
            document.cookie = name + '=' + '; expires=' + expireDate.toGMTString() + '; path=/';
        },
        loc_is: typeof (Storage) !== "undefined",
        loc_get_item: function (itemName) {
            itemName = typeof (itemName) === 'undefined' ? t.s.localstorage : itemName;
            var stringData = localStorage.getItem(itemName);
            var data = null;
            if (stringData !== null) {
                data = this._stringToJson(stringData);
            }
            return data;
        },
        loc_set_item: function (obj, itemName, expireDays) {
            itemName = typeof (itemName) === 'undefined' ? t.s.localstorage : itemName;

            var expire = 0;
            if (typeof (expireDays) !== 'undefined' && !isNaN(expireDays)) {
                expire = Date.now() + ((24 * 60 * 60 * 1000) * Number(expireDays));
            }

            if (typeof obj === 'object') {
                if (expire > 0) {
                    obj.expire = expire;
                }
                localStorage.setItem(itemName, JSON.stringify(obj));
            }
        },
        loc_upd_item: function (updObj, itemName, expireDays) {
            if (typeof updObj === 'object') {
                itemName = typeof (itemName) ? t.s.localstorage : itemName;
                var origin = this.loc_get_item(itemName);
                var data = $.extend(origin, updObj);
                this.loc_set_item(data, itemName, expireDays);
            }
        },
        loc_rdm_item: function (itemName) {
            itemName = typeof (itemName) ? t.s.localstorage : itemName;
            localStorage.removeItem(itemName);
        },
        _stringToJson: function (data, limit) {
            data = typeof data === 'undefined' ? '' : data;
            limit = typeof limit === 'undefined' ? 2 : limit;
            for (var i = 0; i < limit; i++) {
                if (typeof JSON !== 'undefined') {
                    data = JSON.parse(decodeURIComponent(data));
                } else {
                    data = '';
                }
                if (typeof data === 'object') {
                    break;
                }
            }
            return data;
        },
        _stringToDate: function (strDate, splitChar) {
            if (R.isNil(strDate)) {
                return strDate;
            }
            splitChar = splitChar ? splitChar : '|';
            var arr = jQuery.map(strDate.split(splitChar), function (x) {
                return isNaN(x) ? 1 : Number(x);
            })
            return new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
        },
        _dateToString: function (date, splitChar) {
            var arrDate = jQuery.map([date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()], function (i) {
                return r.addZero(i);
            });
            return arrDate.join('|');
        },        
    }

    return t;
})


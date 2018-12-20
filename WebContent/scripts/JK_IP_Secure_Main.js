function ipCheckSetting() {    
    try {
        if (document.getElementById('IP_ONOFF').value == 'Y') {
            ipSecureOff();
            setIPSecure('N');
            ipNotice_show(0);
        } else {            
            ipSecureOn();
            setIPSecure('Y');
            ipNotice_show(1);
        }
    } catch (e) {
    }
}

function ipSecureOff() {
    try {
        document.getElementById('IP_ONOFF').value = 'N';
        jQuery(".devSecurity").removeClass("on");
        jQuery("#ipNotice").removeClass("devHide");
    } catch (e) {
    }
}

function ipSecureOn() {
    try {
        document.getElementById('IP_ONOFF').value = 'Y';
        jQuery(".devSecurity").addClass("on");
        jQuery("#ipNotice").addClass("devHide");
    } catch (e) {
    }
}

function setIPSecure(Sec_Flag) {
    var today = new Date();
    var expire = new Date(today.getTime() + 60 * 60 * 24 * 30 * 1000);
    var IPSecCookie = "Secure_IPonOFF=" + escape(Sec_Flag) + "; expires=" + expire.toGMTString() + "; path=/; domain=jobkorea.co.kr;";
    document.cookie = IPSecCookie;
}

function getIPCheck() {
    try {
        return document.getElementById('IP_ONOFF').value;
    } catch (e) {
    }
}

function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            var end = document.cookie.indexOf(";", j);
            if (end == -1)
                end = document.cookie.length;
            return unescape(document.cookie.substring(j, end));
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

function ipNotice_show(a) {
    if (document.getElementById("ipNotice")) {
        if (a == 0) {
            document.getElementById("ipNotice").style.display = "block";
        }
        else {
            document.getElementById("ipNotice").style.display = "none";
        }
    }
}
var is_ipsechk = getCookie("Secure_IPonOFF") ? getCookie("Secure_IPonOFF") : 'Y';
window.onload = function () {
    if (is_ipsechk == 'Y') {
        ipSecureOn();
        ipNotice_show(1);
    }
    else {
        ipSecureOff();
        ipNotice_show(0);
    }
}
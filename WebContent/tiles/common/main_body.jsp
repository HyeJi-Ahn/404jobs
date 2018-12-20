<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>

	<script src="/NET/bundles/jquery?v=FVs3ACwOLIVInrAl5sdzR2jrCDmVOWFbZMY6g6Q0ulE1"></script>

	<script src="/NET/bundles/backbone?v=v0-3Qm9SB2AUlk_aeK9GniBVmVTE9yxsGpDYtXZWlYU1"></script>

	<script src="/NET/bundles/Gnb?v=9AXDosY8_SXffdloJQYHn_nLhysMx83CJ0woeZJwBck1"></script>

	<script type="text/javascript" src="https://i.jobkorea.kr/content/js/uit.carousel.js"></script>
	<script>
		$(document).ready(function () {

			$(".devNeedLogin").click(function (e) {
				var $me = $(this);
				var targetUrl = $me.attr('data-url');
				var msg = $me.attr('data-msg');
				msg += "\n지금 로그인 하시겠습니까?"

				if ("" == "") {
					if (confirm(msg)) {
						var moveUrl = "/Login/Login_Tot.asp?rDBName=GG&re_url=" + encodeURIComponent(escape(targetUrl));
						location.href = moveUrl;
					} else {
						return false;
					}
				} else {
					location.href = targetUrl;
				}
			});

			// 신입공채 더보기 외에 클릭시에 서브 메뉴 닫기
			$(document).click(function (e) {
				if (e && e.target && e.target.parentElement) {
					if (e.target.parentElement.id != "devStarterMenuMore") {
						if ($("#devStarterMenuMore").hasClass("click")) {
							$("#devStarterMenuMore").removeClass("click");

							$('#devStartLyMenu').hide();
						}
					}
				}
			});

			// 신입공채 더보기 메뉴 클릭
			$("#devStarterMenuMore").click(function (e) {
				var $lyMenu = $('#devStartLyMenu');
				$lyMenu.toggle();
				if ($lyMenu.is(':visible')) {
					$lyMenu.parent().addClass('click');
				}
				else {
					$lyMenu.parent().removeClass('click');
				}
			});

			// 신입공채 더보기 메뉴내 서브 메뉴 클릭
			$("ul.submenu-starter li.menuMore li").click(function (e) {
				$this = $(this);

				var menuName = (t = $this.data("name")) ? t : "";

				if (menuName) {
					var expire = 60 * 24 * 300; // 300 일
					// 쿠키에 저장
					setCookie("JKStarter_Recent_Menu", menuName, expire, "/", "jobkorea.co.kr");
				}
			});

			// 신입공채 Active 메뉴 인 경우 점 아이콘 제거
			$("div.header-sub.start-sub ul.submenu-starter li.active span.icnUpdate").remove();
		});
	</script>

	<div id="point">
		<div class="pointWrap">
			<div class="pointSide">

				<!-- 로그인 영역 시작-->
				<h2 class="blind">로그인 영역</h2>
				<!-- // 비로그인 또는 기업회원 로그인 -->
				<div class="loginWrap">
					<h3 class="blind">회원 로그인</h3>
					<ul class="memberType clear">
						<li>
							<button type="button" class="tab devToggleLayer devHref devClick" data-click-value="53" data-target="#divLoginForm" title="개인회원 로그인">
								<span class="mainBtn mainBtnPer"></span>
								<span class="tx">개인회원 로그인</span>
							</button>
							<!--// 로그인 레이어 -->
							<div class="lyLoginForm" id="divLoginForm">
								<!--[개발] 개인회원 버튼 클릭 시 .on 추가 -->
								<h4>개인회원 로그인</h4>
								<form id="loginForm" name="loginForm" action="https://www.jobkorea.co.kr/Login/Login.asp" method="post">
									<input type="hidden" id="DB_Name" name="DB_Name" value="GG">
									<input type="hidden" id="IP_ONOFF" name="IP_ONOFF" value="Y">
									<input type="hidden" id="re_url" name="re_url">
									<fieldset>
										<legend class="blind">로그인 및 관련 정보</legend>
										<div class="loginIptWrap clear">
											<div class="loginIpt">
												<label type="text" for="lb_id" class="ph id blind">잡코리아 ID 또는 알바몬 ID</label>
												<input type="text" name="M_ID" id="lb_id" class="iptTx" title="아이디 입력" maxlength="20" style="ime-mode:inactive;" value="fandori89">
												<label for="lb_pw" class="ph pw">비밀번호</label>
												<input type="password" name="M_PWD" id="lb_pw" class="iptTx" title="비밀번호 입력">
											</div>
											<button type="button" onclick="go_login_send(); return false;" class="btnLogin"><span>로그인</span></button>
										</div>
										<div class="loginSetWrap">
											<span class="setBx"><input type="checkbox" name="lb_idSave" id="lb_idSave" value="Y" checked=""><label for="lb_idSave" class="devBox bxIpt chk">아이디저장</label></span>
											<!--[개발] 선택 시 .chk 추가 -->
											<span class="setBx">
												<button type="button" onclick="window.open('http://www.jobkorea.co.kr/popup/popup_ipsecret01.asp','popName','width=500,height=460'); return false;"><span>IP
														보안</span></button>
												<button type="button" class="mainBtnA mainBtnSec devSecurity on" onclick="ipCheckSetting();"><span class="blind">ON</span></button>
												<!--[개발] 선택 시 .on 추가 -->
												<span class="lyTooltip devHide" id="ipNotice" style="display:none;">개인정보 보호를 위해 IP보안을 <em>ON</em> 으로
													변경해주세요.<span class="mainIcn mainIcnArrUp"></span></span>
											</span>
											<span class="links">
												<span class="idBx"><a href="https://www.jobkorea.co.kr/Login/Search/Search_Id.asp" class="devHref devClick" data-click-value="56">ID</a></span><span class="pwBx"><a href="https://www.jobkorea.co.kr/Login/Search/Search_Pwd.asp" class="devHref devClick" data-click-value="56">PW 찾기</a></span>
											</span>
										</div>

										<ul class="btnSocial clear">
											<li><button type="button" class="mainBtnB mainBtnNv devNvLogin devHref devClick" data-click-value="57"><span class="icn icnNa"></span>네이버 로그인</button></li>
											<li><button type="button" class="mainBtnB mainBtnFb devFbLogin devHref devClick" data-click-value="58" onclick="facebookLogin()"><span class="icn icnFb"></span>페이스북 로그인</button></li>
											<li><button type="button" class="mainBtnB mainBtnKo devKaLogin devHref devClick" data-click-value="59"><span class="icn icnKo"></span>카카오 로그인</button></li>
											<li><button type="button" class="mainBtnB mainBtnGg devGlLogin devHref devClick" data-click-value="60"><span class="icn icnGl"></span>구글 로그인</button></li>
										</ul>

										<p class="btnJoin"><a href="https://www.jobkorea.co.kr/Join/M_Regist" class="devHref devClick" data-click-value="55">아직 회원이 아니세요? <strong>회원가입</strong></a></p>

									</fieldset>
								</form>
								<button type="button" class="mainBtnA mainBtnClose_1 devToggleLayer" data-target="#divLoginForm"><span class="blind">개인회원
										로그인 레이어 닫기</span></button>
							</div>
							<!-- 로그인 레이어 //-->
						</li>
						<li>
							<a href="/Corp/Main" class="tab devHref devClick " data-click-value="54" target="_blank" title="기업회원 로그인">
								<!--[개발] 기업 로그인 시 .on 추가 -->
								<span class="mainBtn mainBtnCorp"></span>
								<span class="tx">기업회원 로그인</span>
							</a>
						</li>
					</ul>
					<div class="mbrLinks clear">
						<span class="mbr dotum">
							<a href="https://www.jobkorea.co.kr/Join/M_Regist" class="devHref devClick" data-click-value="55"><strong>회원가입</strong></a><span class="idBx"><a href="https://www.jobkorea.co.kr/Login/Search/Search_Id.asp" class="devHref devClick" data-click-value="56">ID</a></span><span class="pwBx"><a href="https://www.jobkorea.co.kr/Login/Search/Search_Pwd.asp" class="devHref devClick" data-click-value="56">PW 찾기</a></span>
						</span>

					</div>

					<script type="text/javascript">
						(function ($) {
							$("document").ready(function () {
								Social.naver(".devNvLogin", "/Naver/Callback");
								Social.google(".devGlLogin");
								Social.kakao(".devKaLogin");

								if ($("#lb_id").val() != "") {
									$("#lb_id").prev().addClass("blind");
								}
								if ($("#lb_pw").val() != "") {
									$("#lb_pw").prev().removeClass("blind");
								}

								$("#lb_id,#lb_pw").on("keyup", function () {
									var $this = $(this);
									if ($this.val() != "") {
										$this.prev().addClass("blind");
									} else {
										$this.prev().removeClass("blind");
									}
								});

								$("#lb_pw:password").keydown(function (e) {
									if (e.keyCode == 13) {
										go_login_send();
									}
								});

								$("#lb_idSave").on("click", function () {
									if ($(this).is(":checked") == true) {
										$(".devBox").addClass("chk");
										$("#lb_idSave").val("Y");
									} else {
										$(".devBox").removeClass("chk");
										$("#lb_idSave").val("N");
									}
								});

								$(".devToggleLayer").on("click", function () {
									var $target = $($(this).data("target"));
									$target.toggle();
									if ($target.is(":visible")) {
										$target.find("input:visible:first").focus();
									}
								});
							});
						})(jQuery);

						var go_login_send = function () {
							if ($("#DB_Name").val() != "GG") {
								if ($('[name=CoMem]:checked').length == 0) {
									alert("회원을 선택하세요."); $("#lb_gi").focus(); return false;
								} else {
									$("#DB_Name").val($('[name=CoMem]:checked').val());
								}
							}
							if ($("#lb_id").val() == "") { alert("아이디를 입력하세요."); $("#lb_id").focus(); return false; }
							if ($("#lb_pw").val() == "") { alert("비밀번호를 입력하세요."); $("#lb_pw").focus(); return false; }


							if ($("#DB_Name").val() == "GG") {
								$("#re_url").val("/");
							}
							document.loginForm.submit();
						}
					</script>		
					<script>
							(function ($) {
								$.ajax({
									type: "GET",
									url: "/Main/GetGiCnt",
									cache: false,
									async: false,
									success: function (data) {
										if (data.ScrapGiCnt > 0) {
											$("#scrapGiCnt").text(data.ScrapGiCnt).parent().removeClass("noData");
										}
										if (data.RecentGiCnt > 0) {
											$("#recentGiCnt").text(data.RecentGiCnt).parent().removeClass("noData");
										}

										if (data.ScrapGiCnt > 0 || data.RecentGiCnt > 0) {
											var sideBarUrl = "/Scripts/SideBar/sidebar.js?date=20170915";
											$.getScript(sideBarUrl, function (data, textStatus, jqxhr) { });

											$(".recentLayer").on("click", function (e) {
												$.ajax({
													type: 'post',
													url: '/SideBar/RightBanRecentAjax',
													dataType: 'html',
													cache: false,
													success: function (data) {
														$("#recentList").html(data);
														jkUitSideBar.dataComplete();
													}, error: function (e) {

													}
												});
											});

											$(".scrapLayer").on("click", function (e) {
												$.ajax({
													type: 'post',
													url: '/SideBar/RightBanScrapAjax',
													dataType: 'html',
													cache: false,
													success: function (data) {
														$("#scrapList").html(data);
														jkUitSideBar.dataComplete();
													}, error: function (e) {

													}
												});
											});
										}
									}
								});
							})(jQuery);
					</script>
				</div>
				<!-- 로그인 전 // -->

				<div class="quickMenuWrap">
					<h3 class="blind" id="devQuickBlind">신입 퀵 메뉴</h3>
					<ul class="clear devQuickCareer" style="display:none;">
						<li class="item_1"><a href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty" class="mainBtnB mainBtnPart devHref devClick" data-click-value="70"><span>직무별</span></a></li>
						<li class="item_2"><a href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;localorder=1" class="mainBtnB mainBtnArea devHref devClick" data-click-value="71"><span>지역별</span></a></li>
						<li class="item_3"><a href="http://www.jobkorea.co.kr/recruit/joblist?menucode=search" class="mainBtnB mainBtnSch devHref devClick" data-click-value="72"><span>상세검색</span></a></li>
						<li class="item_4"><a href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype1&amp;cotype=1,2,3" class="mainBtnB mainBtnMajor devHref devClick" data-click-value="73"><span>대기업</span></a></li>
						<li class="item_5"><a href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype4&amp;cotype=8" class="mainBtnB mainBtnPublic devHref devClick" data-click-value="74"><span>공기업·공사</span></a></li>
						<li class="item_6"><a href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype3&amp;cotype=6" class="mainBtnB mainBtnForeign devHref devClick" data-click-value="75"><span>외국계기업</span></a></li>
						<li class="item_7"><a href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry" class="mainBtnB mainBtnIndustry devHref devClick" data-click-value="76"><span>산업별</span></a></li>
						<li class="item_8"><a href="http://www.jobkorea.co.kr/Super/Main" class="mainBtnB mainBtnSuper devHref devClick" data-click-value="77"><span>슈퍼기업관</span></a></li>
						<li class="item_9"><a href="http://www.jobkorea.co.kr/top100/?Main_Career_Type=2&amp;Search_Type=1" class="mainBtnB mainBtnTop100 devHref devClick" data-click-value="94"><span>TOP100</span><span class="mainIcn mainIcnNew" title="NEW"><span class="blind">NEW</span></span></a></li>
					</ul>
					<ul class="clear devQuickStater" style="display:block;">
						<li class="item_1"><a href="http://www.jobkorea.co.kr/starter/" class="mainBtnB mainBtnMajor devHref devClick" data-click-value="61"><span>1000대기업</span></a></li>
						<li class="item_2"><a href="http://www.jobkorea.co.kr/starter/calendar/" class="mainBtnB mainBtnCalendar devHref devClick" data-click-value="62"><span>공채달력<span class="mainIcn mainIcnUpdate" title="update"><span class="blind">update</span></span></span></a></li>
						<li class="item_3"><a href="http://www.jobkorea.co.kr/top100/?Main_Career_Type=1&amp;Search_Type=1" class="mainBtnB mainBtnTop100 devHref devClick" data-click-value="93"><span>TOP100</span><span class="mainIcn mainIcnNew" title="NEW"><span class="blind">NEW</span></span></a></li>
						<li class="item_4"><a href="http://www.jobkorea.co.kr/starter/?schWork=2" class="mainBtnB mainBtnIntern devHref devClick" data-click-value="64"><span>인턴채용</span></a></li>
						<li class="item_5"><a href="http://www.jobkorea.co.kr/starter/passassay/" class="mainBtnB mainBtnPass devHref devClick" data-click-value="65"><span>합격자소서<span class="mainIcn mainIcnUpdate" title="update"><span class="blind">update</span></span></span></a></li>
						<li class="item_6"><a href="http://www.jobkorea.co.kr/starter/review/" class="mainBtnB mainBtnReview devHref devClick" data-click-value="66"><span>취업후기<span class="mainIcn mainIcnUpdate" title="update"><span class="blind">update</span></span></span></a></li>
						<li class="item_7"><a href="http://www.jobkorea.co.kr/starter/spec/" class="mainBtnB mainBtnSpec devHref devClick" data-click-value="67"><span>합격스펙</span><span class="mainIcn mainIcnNew" title="NEW"><span class="blind">NEW</span></span></a></li>
						<li class="item_8"><a href="http://www.jobkorea.co.kr/starter/interview" class="mainBtnB mainBtnIterview devHref devClick" data-click-value="68"><span>직무인터뷰</span></a></li>
						<li class="item_9"><a href="http://www.jobkorea.co.kr/starter/jobfair/" class="mainBtnB mainBtnJobfair devHref devClick" data-click-value="69"><span>채용설명회</span></a></li>
					</ul>
				</div>

				<div class="noticeEvtWarp">
					<h3 class="blind">공지사항</h3>
					<dl>
						<dt><a href="http://www.jobkorea.co.kr/help/notice?tab=2" class="devHref devClick" data-click-value="82">공지</a></dt>
						<dd><a href="http://www.jobkorea.co.kr/help/notice/view?no=14048" class="devHref devClick" data-click-value="83">잡코리아
								2018 웹·스마트앱어워드 3관왕 달성</a></dd>
					</dl>
				</div>
			</div>

			<div class="pointMain">
				<div class="matchingContWrap">
					<h2 class="blind">컨텐츠 영역</h2>
					<h3 class="blind">신입/경력 맞춤 컨텐츠</h3>
					<div class="menuColumn clear devMenuArea">
						<div class="lySltMn">
							<!--[개발] 버튼 클릭 시 .on 추가, 추가시 lySltList 레이어 영역 display:block 적용됩니다. -->
							<button type="button" class="mainBtnA mainBtnArr_6 devContsSelectBtn" data-select-value="0">
								<span>신입</span>
								<span style="display:none">경력</span>
							</button>
						</div>
						<div class="menuWrap devStarterMenu" style="display:block;">
							<h4 class="blind">신입 맞춤 컨텐츠 메뉴</h4>
							<ul class="menuList" style="width: 790px;">
								<li class="on"><button type="button" class="devClick devActive devCont" data-url="OrtBNews" data-click-value="1"><span>공채속보</span></button></li>
								<!--[개발] 선택 시 .on 추가 -->
								<li><button type="button" class="devClick devActive devCont" data-url="OrtJobNews" data-click-value="5"><span>기업분석</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="OrtJobItv" data-click-value="9"><span>직무분석</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="OrtJobFair" data-click-value="13"><span>채용설명회</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="OrtSpec" data-click-value="17"><span>합격스펙</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="OrtPassAssay" data-click-value="20"><span>합격자소서</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="OrtReview" data-click-value="23"><span>인적성·면접후기</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="OrtOnAir" data-click-value="26"><span>잡코리아
											TV</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="Learning_Starter" data-click-value="87"><span>잡코리아
											러닝</span></button></li>
							</ul>
							<span class="bgMn bgLeft" style="display: none;"></span>
							<span class="bgMn bgRight" style="display: block;"></span>
						</div>
						<div class="menuWrap devCareerMenu" style="display:none;">
							<h4 class="blind">경력 맞춤 컨텐츠 메뉴</h4>
							<ul class="menuList">
								<li><button type="button" class="devClick devActive devCont" data-url="SmartMatch" data-click-value="33"><span>추천채용</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="OrtBNews_Career" data-click-value="30"><span>채용속보</span></button></li>
								<!--[개발] 선택 시 .on 추가 -->
								<li><button type="button" class="devClick devActive devCont" data-url="HeadHunting" data-click-value="36"><span>헤드헌팅</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="Sch" data-click-value="90"><span>슈퍼기업관</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="OrtJobNews" data-click-value="39"><span>기업분석</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="OrtJobItv" data-click-value="43"><span>직무분석</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="JobNews" data-click-value="47"><span>취업뉴스</span></button></li>
								<li><button type="button" class="devClick devActive devCont" data-url="Learning_Career" data-click-value="50"><span>잡코리아
											러닝</span></button></li>
							</ul>
							<span class="bgMn bgLeft" style="display: none;"></span>
							<span class="bgMn bgRight" style="display: block;"></span>
						</div>
						<p class="btnPage">
							<button class="mainBtnA mainBtnPrev_1 devMoveTabBtn" type="button"><span class="blind">이전 탭 보기</span></button>
							<button class="mainBtnA mainBtnNext_1 devMoveTabBtn" type="button"><span class="blind">다음 탭 보기</span></button>
						</p>
					</div>
					<div id="contentsArea">
						<!--// 공채속보 -->


						<div class="matchingColumn starterColumn case" data-contents-value="1" id="devConts_1">
							<div class="column">
								<h4 class="blind">공채속보</h4>
								<ul class="contList clear">
									<li>
										<a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27146175?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-cntnt-no="3243" data-click-value="2" target="_blank">
											<span class="thBx thLogo">
												<span>
													<img alt="LS엠트론㈜" src="//i.jobkorea.kr/content/images/noneimg/none_115x46.png" onerror="javascript:this.src='//i.jobkorea.kr/content/images/noneimg/none_115x46.png'">
												</span>
											</span>
											<span class="titBx">2019년 LS엠트론 신입사원 채용</span>
										</a>
									</li>
									<li>
										<a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27055061?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-cntnt-no="3223" data-click-value="2" target="_blank">
											<span class="thBx thLogo">
												<span>
													<img alt="신협중앙회" src="//i.jobkorea.kr/content/images/noneimg/none_115x46.png" onerror="javascript:this.src='//i.jobkorea.kr/content/images/noneimg/none_115x46.png'">
												</span>
											</span>
											<span class="titBx">2019년 신협중앙회 신입직원 채용</span>
										</a>
									</li>
									<li>
										<a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27123252?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-cntnt-no="3245" data-click-value="2" target="_blank">
											<span class="thBx thLogo">
												<span>
													<img alt="㈜지에스아이티엠(GSITM)" src="//i.jobkorea.kr/content/images/noneimg/none_115x46.png" onerror="javascript:this.src='//i.jobkorea.kr/content/images/noneimg/none_115x46.png'">
												</span>
											</span>
											<span class="titBx">GS ITM 2019년 인턴사원 채용</span>
										</a>
									</li>
									<li>
										<a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27033274?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-cntnt-no="3240" data-click-value="2" target="_blank">
											<span class="thBx thLogo">
												<span>
													<img alt="전문건설공제조합" src="//i.jobkorea.kr/content/images/noneimg/none_115x46.png" onerror="javascript:this.src='//i.jobkorea.kr/content/images/noneimg/none_115x46.png'">
												</span>
											</span>
											<span class="titBx">전문건설공제조합 직원 채용</span>
										</a>
									</li>
									<li>
										<a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27075284?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-cntnt-no="3244" data-click-value="2" target="_blank">
											<span class="thBx thLogo">
												<span>
													<img alt="유코카캐리어스㈜" src="//i.jobkorea.kr/content/images/noneimg/none_115x46.png" onerror="javascript:this.src='//i.jobkorea.kr/content/images/noneimg/none_115x46.png'">
												</span>
											</span>
											<span class="titBx">유코카캐리어스 정규 신입사원 공채</span>
										</a>
									</li>
									<li>
										<a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27120546?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-cntnt-no="3246" data-click-value="2" target="_blank">
											<span class="thBx thLogo">
												<span>
													<img alt="대방건설" src="//i.jobkorea.kr/content/images/noneimg/none_115x46.png" onerror="javascript:this.src='//i.jobkorea.kr/content/images/noneimg/none_115x46.png'">
												</span>
											</span>
											<span class="titBx">대방건설 신입공채 10기 및 경력직원 채용</span>
										</a>
									</li>
									<li>
										<a href="http://www.jobkorea.co.kr/Super/incheonairport" class="devClick devHref" data-cntnt-no="3248" data-click-value="2" target="_blank">
											<span class="thBx ">
												<span>
													<img alt="" src="//i.jobkorea.kr/content/images/noneimg/none_132x82.png" onerror="javascript:this.src='//i.jobkorea.kr/content/images/noneimg/none_132x82.png'">
												</span>
											</span>
											<span class="titBx">2018 입사하고 싶은 공공기관 1위 기업!</span>
										</a>
									</li>
									<li>
										<a href="http://www.jobkorea.co.kr/starter/interview/View/21093?Page=2&amp;IsFavorOn=0" class="devClick devHref" data-cntnt-no="3249" data-click-value="2" target="_blank">
											<span class="thBx ">
												<span>
													<img alt="" src="//i.jobkorea.kr/content/images/noneimg/none_132x82.png" onerror="javascript:this.src='//i.jobkorea.kr/content/images/noneimg/none_132x82.png'">
												</span>
											</span>
											<span class="titBx">물리학 전공자가 기술영업을 선택한 이유</span>
										</a>
									</li>
								</ul>

								<div class="links">
									<a class="devClick devHref" data-click-value="4" href="http://www.jobkorea.co.kr/starter/" target="_blank"><span>1000대기업
											공채</span></a>
									<a class="devClick devHref" data-click-value="4" href="http://www.jobkorea.co.kr/starter?schWork=2" target="_blank"><span>인턴채용</span></a>
									<a class="devClick devHref" data-click-value="4" href="http://www.jobkorea.co.kr/starter/calendar/" target="_blank"><span>공채달력</span></a>
									<a class="devClick devHref" data-click-value="4" href="http://www.jobkorea.co.kr/starter/live" target="_blank"><span>Live공채소식</span></a>
									<a class="devClick devHref" data-click-value="4" href="http://www.jobkorea.co.kr/starter/?LinkGubun=3" target="_blank"><span>공채예상일정</span></a>
									<a class="devClick devHref" data-click-value="4" href="http://www.jobkorea.co.kr/top100/?Main_Career_Type=1&amp;Search_Type=1" target="_blank"><span>TOP100</span></a>
								</div>
							</div>



							<div class="column devOrtCal">
								<h4 class="hd_4 blind">공채달력</h4>
								<ul class="listTab clear">
									<li class="on"><button type="button" class="devClick devHref devCalMenu" data-cal-value="top100" data-click-value="3"><span>TOP</span></button></li>
									<li><button type="button" class="devClick devHref devCalMenu" data-cal-value="expect" data-click-value="3"><span>예상</span></button></li>
									<li><button type="button" class="devClick devHref devCalMenu" data-cal-value="start" data-click-value="3"><span>시작</span></button></li>
									<li><button type="button" class="devClick devHref devCalMenu" data-cal-value="close" data-click-value="3"><span>마감</span></button></li>
								</ul>


								<!--// TOP100 -->
								<ol class="infoList rankList case">
									<li>
										<span class="rank"><em>1</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27123252?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">㈜지에스아이티엠(GSITM)</a></span>
										<span class="txBx"><span class="icnNew"><span class="blind">NEW</span>NEW</span></span>
									</li>
									<li>
										<span class="rank"><em>2</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27171599?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">㈜BGF리테일</a></span>
										<span class="txBx"><span class="icnNew"><span class="blind">NEW</span>NEW</span></span>
									</li>
									<li>
										<span class="rank"><em>3</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27075284?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">유코카캐리어스㈜</a></span>
										<span class="txBx"><span class="mainIcnB mainIcnBDw"><span class="blind">하락</span>2</span></span>
									</li>
									<li>
										<span class="rank"><em>4</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27146175?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">LS엠트론㈜</a></span>
										<span class="txBx"><span class="mainIcnB mainIcnBDw"><span class="blind">하락</span>1</span></span>
									</li>
									<li>
										<span class="rank"><em>5</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27147106?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">(유)나이키코리아</a></span>
										<span class="txBx"><span class="mainIcnB mainIcnBUp"><span class="blind">상승</span>5</span></span>
									</li>
									<li>
										<span class="rank"><em>6</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27056035?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">㈜노브랜드</a></span>
										<span class="txBx"><span class="mainIcnB mainIcnBDw"><span class="blind">하락</span>2</span></span>
									</li>
									<li>
										<span class="rank"><em>7</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27120546?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">대방건설</a></span>
										<span class="txBx"><span class="mainIcnB mainIcnBDw"><span class="blind">하락</span>1</span></span>
									</li>
									<li>
										<span class="rank"><em>8</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27117535?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">이스타항공㈜</a></span>
										<span class="txBx"><span class="mainIcnB mainIcnBDw"><span class="blind">하락</span>3</span></span>
									</li>
									<li>
										<span class="rank"><em>9</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27160707?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">SK하이닉스</a></span>
										<span class="txBx"><span class="mainIcnB mainIcnBUp"><span class="blind">상승</span>9</span></span>
									</li>
									<li>
										<span class="rank"><em>10</em></span>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27108558?PageGbn=ST" class="devClick devHref" data-click-value="3" target="_blank">LS빌드윈㈜</a></span>
										<span class="txBx"><span class="mainIcnB mainIcnBDw"><span class="blind">하락</span>3</span></span>
									</li>
								</ol>
								<p class="btnMore"><a class="mainBtnA mainBtnArr_2 devClick devHref" data-click-value="3" href="http://www.jobkorea.co.kr/top100/?Main_Career_Type=1&amp;Search_Type=1" target="_blank"><span>TOP100 더보기</span></a></p>

								<!--// 예상일정 -->
								<ul class="infoList add" style="display:none;">
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=%ed%95%9c%ea%b5%ad%ed%8a%b9%ed%97%88%ec%a0%95%eb%b3%b4%ec%9b%90 " class="devClick devHref" data-click-value="3" target="_blank">한국특허정보원</a></span>
										<span class="txBx tahoma">12.20~</span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=%ec%98%a4%ec%8a%a4%ed%85%9c%ec%9e%84%ed%94%8c%eb%9e%80%ed%8a%b8%e3%88%9c " class="devClick devHref" data-click-value="3" target="_blank">오스템임플란트㈜</a></span>
										<span class="txBx tahoma">12.21~</span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=%ed%95%9c%ea%b5%ad%ec%9b%90%ec%9e%90%eb%a0%a5%ec%95%88%ec%a0%84%ea%b8%b0%ec%88%a0%ec%9b%90 " class="devClick devHref" data-click-value="3" target="_blank">한국원자력안전기술원</a></span>
										<span class="txBx tahoma">12.21~</span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=KBS " class="devClick devHref" data-click-value="3" target="_blank">KBS</a></span>
										<span class="txBx tahoma">12.26~</span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=%e3%88%9c%ec%a0%95%ec%8b%9d%ed%92%88 " class="devClick devHref" data-click-value="3" target="_blank">㈜정식품</a></span>
										<span class="txBx tahoma">12.26~</span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=%e3%88%9c%eb%b6%88%ec%8a%a4%ec%9b%90 " class="devClick devHref" data-click-value="3" target="_blank">㈜불스원</a></span>
										<span class="txBx tahoma">12.26~</span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=%ea%b5%ad%eb%b0%a9%ea%b3%bc%ed%95%99%ec%97%b0%ea%b5%ac%ec%86%8c " class="devClick devHref" data-click-value="3" target="_blank">국방과학연구소</a></span>
										<span class="txBx tahoma">12.26~</span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=%ed%95%9c%ec%a0%84%ec%bc%80%ec%9d%b4%eb%94%94%ec%97%94%e3%88%9c " class="devClick devHref" data-click-value="3" target="_blank">한전케이디엔㈜</a></span>
										<span class="txBx tahoma">12.27~</span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=SK%eb%b0%94%ec%9d%b4%ec%98%a4%ed%8c%9c%e3%88%9c " class="devClick devHref" data-click-value="3" target="_blank">SK바이오팜㈜</a></span>
										<span class="txBx tahoma">12.27~</span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/starter/?LinkGubun=3&amp;schTxt=%e3%88%9c%ed%95%98%eb%82%98%ed%88%ac%ec%96%b4 " class="devClick devHref" data-click-value="3" target="_blank">㈜하나투어</a></span>
										<span class="txBx tahoma">12.28~</span>
									</li>
								</ul>
								<p class="btnMore" style="display:none;"><a class="mainBtnA mainBtnArr_2 devClick devHref" data-click-value="3" href="/starter/?LinkGubun=3" target="_blank"><span>예상일정 더보기</span></a></p>

								<!--// 오늘시작, 내일마감 -->
								<ul class="infoList add case" style="display:none;">
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27168748?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">㈜네오플</a></span>
										<span class="txBx tahoma">~12.26</span> </li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27173642?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">(재)환경재단</a></span>
										<span class="txBx tahoma">~12.31</span> </li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27172736?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">건국대학교</a></span>
										<span class="txBx tahoma">~12.28</span> </li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27176411?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">버거킹 (㈜비케이알)</a></span>
										<span class="txBx tahoma">~01.06</span> </li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27178722?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">㈜서영엔지니어링</a></span>
										<span class="txBx tahoma">~12.26</span> </li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27180685?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">㈜에이제이케이</a></span>
										<span class="txBx tahoma">~12.31</span> </li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27180881?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">㈜윈스</a></span>
										<span class="txBx tahoma">~01.02</span> </li>
								</ul>
								<p class="btnMore" style="display:none;"><a class="mainBtnA mainBtnArr_2 devClick devHref" data-click-value="3" href="http://www.jobkorea.co.kr/starter/calendar/" target="_blank"><span>오늘시작 더보기</span></a></p>
								<ul class="infoList add " style="display:none;">
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27073453?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">한국전력공사</a></span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27170987?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">에스케이가스㈜</a></span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27131820?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">농심그룹 메가마트</a></span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27068632?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">㈜신원</a></span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/26601860?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">㈜세정</a></span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/26906729?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">엠케이전자㈜</a></span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27095715?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">청호나이스㈜</a></span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27066238?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">금천씨스템㈜</a></span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27126321?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">대한방직㈜</a></span>
									</li>
									<li>
										<span class="titBx"><a href="http://www.jobkorea.co.kr/Recruit/GI_Read/27076007?Oem_Code=C1&amp;PageGbn=ST " class="devClick devHref" data-click-value="3" target="_blank">더블유씨피㈜</a></span>
									</li>
								</ul>
								<p class="btnMore" style="display:none;"><a class="mainBtnA mainBtnArr_2 devClick devHref" data-click-value="3" href="http://www.jobkorea.co.kr/starter/calendar/" target="_blank"><span>내일마감 더보기</span></a></p>
							</div>

						</div> <!-- 공채속보 //-->
						<div id="devSmartMatchLoding" class="contLoading" style="display:none">
							<p>회원님의 활동을 분석 중입니다.<br>공고조회, 스크랩, 입사지원 활동을 할수록 더욱 정확히 추천해드립니다.</p>
						</div>
					</div>
				</div>
			</div>
			<script>
				(function () {
					// carousel 배너
					var banner_1 = new uit.carousel('#carousel_1', { animation: false, hoverAnimationBtn: true, random: true });
					var banner_2 = new uit.carousel('#carousel_2', { random: false });
				})()
			</script>
		</div>
	</div>
	<hr>

	<div class="grand_banner_wrap">
		<h3 class="header">채용 공고 현황</h3>

		<ul class="list list_banner_3xn">
			<li class="itemTopBg">
				<div class="company">
					<span class="name">
						<a href="http://www.jobkorea.co.kr/Recruit/Booth_GI_Read/27154832?Oem_Code=C1" onclick="Job_DB_window(this.href,1000,500);SpaceClick(27154832,6);adobeDtmOptClick('JH', 'Gold');return false;" target="_blank"><span class="logo"><img src="//img.jobkorea.co.kr/Images/Logo/86/l/o/logo_none_86.gif" width="86" height="34" alt="㈜플러스씨스" onerror="this.src='//img.jobkorea.co.kr/Images/Logo/86/l/o/logo_none_86.gif';"></span>㈜플러스씨스</a>
					</span>
					<button type="button" class="btn devFavorClasshmc01 btnReg_1" onclick="doFavor('hmc01');SpaceClick(27154832,6);;" title="관심기업 등록">관심기업 등록</button>
				</div>
				<div class="description"><a href="http://www.jobkorea.co.kr/Recruit/Booth_GI_Read/27154832?Oem_Code=C1" onclick="Job_DB_window(this.href,1000,500);SpaceClick(27154832,6);adobeDtmOptClick('JH', 'Gold');return false;" target="_blank">LF FOOD - 마키노차야 각 부문(홀/조리/인포) <div class="dday">~12/31</div></a></div>
				<div class="extra"><button type="button" class="btn devScrap31317608 btnScrap_1" onclick="doScrap(31317608);SpaceClick(27154832,6);" title="채용정보 스크랩"><span>채용정보 스크랩</span></button></div>
		</ul>
	</div>

	
	<!-- Qna 용 스와이프 js -->
	<script src="https://i.jobkorea.kr/content/javascript/pc/dist/main/ui.main.min.js?20181101"></script>
	<script type="text/javascript" src="/include/JS/resume-target.js?v=9"></script>
	<script type="text/javascript">
		$(document).ready(function () {
			if (resume_target !== undefined) {
				resume_target.init(1);
			}
		});
	</script>

	<div id="footer">
		<h2 class="skip">잡코리아 기타 정보</h2>

		<div class="btmNtc">
			<h3 class="blind">공지사항</h3>
			<dl class="clear">
				<dt><a href="http://www.jobkorea.co.kr/help/notice">공지사항</a></dt>
				<dd class="dotum"><a href="http://www.jobkorea.co.kr/help/notice/view?no=14049">합격자기소개서&amp;취업후기 등록 이벤트 (2018년 12월)
						당첨자 발표 <em class="tahoma">18.12.14</em></a></dd>
			</dl>
			<span class="tplBtn btnAll"><a href="http://www.jobkorea.co.kr/Service_JK/Site_Map.asp">서비스 전체보기</a></span>
		</div>

		<div class="btmSvc">
			<h3 class="blind">잡코리아 서비스 링크</h3>
			<ul>
				<li><a href="http://company.jobkorea.co.kr/" target="_blank">회사소개</a></li>
				<li><a href="http://www.jobkorea.co.kr/Service_JK/GI/AD">광고문의</a></li>
				<li><a href="http://company.jobkorea.co.kr/Network/default.asp#Partners" target="_blank">제휴문의</a></li>
				<li><a href="http://company.jobkorea.co.kr/Recruit/default.asp#recruitAra" target="_blank">인재채용</a></li>
				<li><a href="http://www.jobkorea.co.kr/Service_JK/Provision/Provision_GG.asp">이용약관</a></li>
				<li><a href="http://www.jobkorea.co.kr/Service_JK/privacy.asp"><strong>개인정보처리방침</strong></a></li>
				<li><a href="http://company.jobkorea.co.kr/Service/default.asp" target="_blank">운영사이트</a></li>
				<li><a href="http://globalemployer.jobkorea.co.kr" target="_blank">Global Employer</a></li>
				<li><a href="http://www.jobkorea.co.kr/help/faq/user" target="_blank">고객센터</a></li>
			</ul>
		</div>

		<div class="btmHelp">
			<h3 class="blind">고객센터</h3>
			<dl class="first">
				<dt>고객센터</dt>
				<dd class="tahoma">1588-9350</dd>
				<dd class="dotum">(평일 <span class="tahoma">09:00 ~ 19:00</span> 토요일 <span class="tahoma">09:00 ~ 15:00</span>)</dd>
			</dl>
			<dl class="tahoma">
				<dt>FAX</dt>
				<dd>02-565-9351</dd>
			</dl>
			<dl class="tahoma">
				<dt>Email</dt>
				<dd><a href="mailto:helpdesk@jobkorea.co.kr">helpdesk@jobkorea.co.kr</a></dd>
			</dl>
			<dl class="talktalkBtn">
				<a href="https://talk.naver.com/ct/wcb8l5" target="_blank" title="새창">
					<span class="tplIcnTy tplIcnTalk"></span>
					<span class="dotum">톡톡상담</span>
				</a>
			</dl>
			<ul class="jkOutLinkList">
				<li><a href="https://blog.naver.com/jobkorea1" target="_blank" title="블로그" class="tplIcnTy jkBlog"><span class="skip">블로그</span></a></li>
				<li><a href="https://m.post.naver.com/my.nhn?memberNo=9028903" target="_blank" title="포스트" class="tplIcnTy jkPost"><span class="skip">포스트</span></a></li>
				<li><a href="https://www.facebook.com/jobkorea" target="_blank" title="페이스북" class="tplIcnTy jkFacebook"><span class="skip">페이스북</span></a></li>
				<li><a href="https://www.instagram.com/jobkorea_/" target="_blank" title="인스타그램" class="tplIcnTy jkInstagram"><span class="skip">인스타그램</span></a></li>
				<li><a href="https://www.youtube.com/channel/UCOrdY3p46GJh_CYacfwYieg" target="_blank" title="유튜브" class="tplIcnTy jkYoutube"><span class="skip">유튜브</span></a></li>
			</ul>
		</div>
		<div class="btmCompany">
			<div class="item itemFirst">서울시 서초구 서초대로 301 동익성봉빌딩 16~18층 잡코리아</div>
			<div class="item itemSecond">대표 : 윤병준</div>
			<div class="item itemThird">사업자등록번호 : <span>110-81-34859</span></div>
			<div class="item itemFourth">통신판매업 신고번호 : 2016-서울서초-0287호</div>
			<div class="item itemFifth">직업정보제공사업 신고번호 : 서울청 제2016-11호</div>
		</div>
		<!--// 2018.1.10 : 수상로고 추가, 순서 변경 -->
		<div class="btmAward">
			<ul class="clear">
				<li class="award_bes"><a href="http://company.jobkorea.co.kr/cyber_pr/default.asp?move=1&amp;mo_year=2018#award" target="_blank">고용서비스 우수기관 선정<br>(2018.01~2020.12)</a></li>
				<li class="award_social"><a href="http://company.jobkorea.co.kr/cyber_pr/default.asp?move=1&amp;mo_year=2017#award" target="_blank">사회보험 가입활동 <br>실천 우수기업 선정</a></li>
				<li class="award_wa"><a href="http://www.jobkorea.co.kr/help/notice/view?no=14048&amp;url=%2fhelp%2fnotice" target="_blank">웹·스마트앱어워드
						<br>대상 수상</a></li>
				<li class="award_kict"><a href="http://www.jobkorea.co.kr/help/notice/view?no=13874" target="_blank">업계최초! K-ICT<br>정보보호대상
						우수상 수상</a></li>
				<li class="award_kbpi"><a href="http://www.jobkorea.co.kr/help/notice/view?no=13744" target="_blank">브랜드파워(K-BPI)
						1위<br>(11년 연속 수상)</a></li>
			</ul>
			<a href="http://company.jobkorea.co.kr/cyber_pr/default.asp#award" target="_blank" class="awardMore">더보기</a>
		</div>
		<!--// 2018.1.10 : 수상로고 추가, 순서 변경 -->
		<div class="btmExtraLinks">
			<a href="http://mobile.jobkorea.co.kr/" class="item">
				<img src="https://i.jobkorea.kr/content/images/main/footer_mobile_info.png" alt="모바일 서비스 안내">
			</a>
			<a href="http://m.jobkorea.co.kr" class="item" onclick="window.open(this.href,'popName', 'width=442,height=840,toolbar=no,location=no,scrollbars=yes'); return false;" target="_blank">
				<img src="https://i.jobkorea.kr/content//images/main/footer_mobile_link.png" alt="모바일 버전보기">
			</a>
		</div>
		<p class="copyright tahoma">Copyright ⓒ <strong><a href="http://company.jobkorea.co.kr/" target="_blank">JOBKOREA</a></strong>
			Corp. All Right Reserved.</p>
	</div>

	<script type="text/javascript" src="/NET/Scripts/GI/OnPass_Quick.js?v201611011500"></script>
	<script type="text/javascript" src="/NET/Scripts/GI/OnPass_Pool.js?201808301500"></script>
	<script type="text/javascript" src="/NET/Scripts/GI/Opt_Trace.js?v20170921"></script>
	<script type="text/javascript" src="/NET/Scripts/JK_IP_Secure_Main.js?v20170915"></script>
	<script type="text/javascript" src="/NET/Scripts/Member/naverLogin_implicit-1.0.2.js" charset="utf-8"></script>
	<script src="https://apis.google.com/js/client:platform.js" gapi_processed="true"></script>
	<script type="text/javascript" src="/NET/Scripts/Member/kakao.min.js"></script>
	<script type="text/javascript" src="/NET/Scripts/Member/SNS.js?ver=1.4"></script>

	<div style="position:absolute; left:-5000px; overflow:hidden; display:none;">

		<!-- End Adobe Marketing Cloud Tag Management code -->
	</div>
	<div style="position:absolute; left:-5000px; overflow:hidden; display:none;">


		<script type="text/javascript">
			//-- NSM Conversion Check Start
			var Nsm_Code = "0";
			if (Nsm_Code != "0") {
				var nsmX = new Image();
				nsmX.src = "https://ntracker.nsm-corp.com/c/rcv.php?code=" + Nsm_Code;
			}
			function NsmConversionClick(Nsm_Code) {
				var nsmX = new Image();
				//alert(Nsm_Code);
				nsmX.src = "https://ntracker.nsm-corp.com/c/rcv.php?code=" + Nsm_Code;
			}
                    //-- NSM Conversion Check End
		</script>

		<script>
			/* usage */
			(function ($) {
				$(window).load(function () {
					(function (i, s, o, g, r, a, m) {
						i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
							(i[r].q = i[r].q || []).push(arguments)
						}, i[r].l = 1 * new Date(); a = s.createElement(o),
							m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
					})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

					ga('create', 'UA-75522609-1', 'jobkorea.co.kr', { 'allowLinker': true, 'name': 'trackerOne2' });
					ga('require', 'linker');
					ga('linker:autoLink', ['jobbusan.co.kr']);
					ga('trackerOne2.send', 'pageview');

				});
			})(jQuery);
		</script>
		<script type="text/javascript">
    < !--
				function loadScriptFn(url, callback) {
					var scriptEle = document.createElement('script');
					scriptEle.type = 'text/javascript';
					var loaded = false;
					scriptEle.onreadystatechange = function () {
						// 서버에서 읽어올 경우 loaded, 캐쉬에서 가져올 경우 complete 이기에 둘 모두 처리
						if (this.readyState == 'loaded' || this.readyState == 'complete') {
							if (loaded) return;
							loaded = true;
							callback();
						}
					}
					scriptEle.onload = function () {
						callback();
					};
					scriptEle.src = url;
					document.getElementsByTagName('head')[0].appendChild(scriptEle);
				}

    //-->
		</script>
	</div>

	<script type="text/javascript">
		var DS_UID_Value = ''
		var DSID_Value = ''
		if (window._dslog) {
			if (DS_UID_Value != "" && DSID_Value != "") { window._dslog.setDSID(DSID_Value); }
			else { window._dslog.setUID(DS_UID_Value); }
			window._dslog.dispatch();
		} else {
			var dslog_tag = document.getElementById('dslog_tag');
			if (dslog_tag != null && dslog_tag != undefined) {
				dslog_tag.onload = dslog_tag.onreadystatechange = function () {
					dslog_tag.onload = dslog_tag.onreadystatechange = null;
					window._dslog.setUIDCookie('');
					window._dslog.dispatch()
				}
			}
		} 
	</script>


	<!-- Facebook Pixel Code -->
	<script>
		(function ($) {
			$(window).load(function () {
				!function (f, b, e, v, n, t, s) {
					if (f.fbq) return; n = f.fbq = function () {
						n.callMethod ?
							n.callMethod.apply(n, arguments) : n.queue.push(arguments)
					}; if (!f._fbq) f._fbq = n;
					n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
					t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
				}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
				fbq('set', 'autoConfig', 'false', '1166416616740867');
				fbq('init', '1166416616740867'); // Insert your pixel ID here.
				fbq('track', 'PageView');

			});
		})(jQuery);
	</script>
	<noscript>
		<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1166416616740867&ev=PageView&noscript=1" />
	</noscript>
	<!-- DO NOT MODIFY -->
	<!-- End Facebook Pixel Code -->

	<script type="text/javascript">
		/* usage */
		(function ($) {
			$(window).load(function () {
				loadScriptFn("//static.criteo.net/js/ld/ld.js", function () {
					// callback
				});
			});
		})(jQuery);

		window.criteo_q = window.criteo_q || [];
		window.criteo_q.push(
			{ event: "setAccount", account: 24849 },
			{ event: "setSiteType", type: "d" },
			{ event: "viewHome" }
		);
	</script>

	<div id="wp_tg_cts" style="display:none;">
		<script id="wp_id_script_1545180516335" src="//altg.widerplanet.com/delivery/wp.js"></script>
		<script id="wp_tag_script_1545180516582" src="//astg.widerplanet.com/delivery/wpc.php?v=1&amp;ver=4.0&amp;r=1&amp;md=bs&amp;ga=1drqjhi-96ck6n-3-1&amp;eid=4-87bbe3627df516cea029260485628f4add42eb9ae9ee2c099879f5beabcad4440c537dc578e2d31088a0f21a4413feaa4aa0a7f936d72b27675eb42117b842e874522e5320c26bec317cc1e02a76fad2&amp;ty=Home&amp;ti=21649&amp;device=web&amp;charset=UTF-8&amp;tc=1545180516582&amp;loc=https%3A%2F%2Fwww.jobkorea.co.kr%2F"></script>
		<script id="wp_tag_script_1545180516663" src="//astg.widerplanet.com/delivery/wpc.php?v=1&amp;ver=4.0&amp;r=1&amp;md=bs&amp;ga=1drqjhi-96ck6n-3-1&amp;eid=4-87bbe3627df516cea029260485628f4add42eb9ae9ee2c099879f5beabcad4440c537dc578e2d31088a0f21a4413feaa4aa0a7f936d72b27675eb42117b842e874522e5320c26bec317cc1e02a76fad2&amp;ty=Home&amp;ti=26747&amp;device=web&amp;charset=UTF-8&amp;tc=1545180516663&amp;loc=https%3A%2F%2Fwww.jobkorea.co.kr%2F"></script>
		<script id="wp_tag_script_1545180516710" src="//astg.widerplanet.com/delivery/wpc.php?v=1&amp;ver=4.0&amp;r=1&amp;md=bs&amp;ga=1drqjhi-96ck6n-3-1&amp;eid=4-87bbe3627df516cea029260485628f4add42eb9ae9ee2c099879f5beabcad4440c537dc578e2d31088a0f21a4413feaa4aa0a7f936d72b27675eb42117b842e874522e5320c26bec317cc1e02a76fad2&amp;ty=Home&amp;ti=26741&amp;device=web&amp;charset=UTF-8&amp;tc=1545180516710&amp;loc=https%3A%2F%2Fwww.jobkorea.co.kr%2F"></script>
		<script id="wp_tag_script_1545180516713" src="//astg.widerplanet.com/delivery/wpc.php?v=1&amp;ver=4.0&amp;r=1&amp;md=bs&amp;ga=1drqjhi-96ck6n-3-1&amp;eid=4-87bbe3627df516cea029260485628f4add42eb9ae9ee2c099879f5beabcad4440c537dc578e2d31088a0f21a4413feaa4aa0a7f936d72b27675eb42117b842e874522e5320c26bec317cc1e02a76fad2&amp;ty=Home&amp;ti=26738&amp;device=web&amp;charset=UTF-8&amp;tc=1545180516712&amp;loc=https%3A%2F%2Fwww.jobkorea.co.kr%2F"></script>
	</div>
	<script type="text/javascript">
		var wptg_tagscript_vars = wptg_tagscript_vars || [];
		wptg_tagscript_vars.push(
			(function () {
				return {
					wp_hcuid: "",
					ti: "21649",
					ty: "Home",
					device: "web"

				};
			}));
		wptg_tagscript_vars.push(
			(function () {
				return {
					wp_hcuid: "",
					ti: "26747",
					ty: "Home",
					device: "web"

				};
			}));
		wptg_tagscript_vars.push(
			(function () {
				return {
					wp_hcuid: "",
					ti: "26741",
					ty: "Home",
					device: "web"

				};
			}));
		wptg_tagscript_vars.push(
			(function () {
				return {
					wp_hcuid: "",
					ti: "26738",
					ty: "Home",
					device: "web"

				};
			}));

		/* usage */
		(function ($) {
			$(window).load(function () {
				loadScriptFn("//cdn-aitg.widerplanet.com/js/wp_astg_4.0.js", function () { });
			});
		})(jQuery);

	</script>

	<script type="text/javascript">
		var parser = new UAParser(),
			result = parser.getResult(),
			browserName = result.browser.name,
			browserVersion = Math.floor(result.browser.version),
			deviceName = result.device.type;

		if ((browserName == 'IE' && browserVersion <= 9) || deviceName == 'mobile') {
			$('.ftrMsrv').remove();
		}

	</script>
	<script src="/NET/bundles/JK5cript?v=kt6fvRQVnlFhtrZQRB60lIBi5ru4auyenJ3cQsNF3hg1"></script>

	<script type="text/javascript" charset="utf-8">
		window.onpageshow = function (event) {
			if (event.persisted) {
				document.location.reload();
			}
		}

		var app = app || {};
		//호출 영역
		$(document).ready(function () {
			var options = {
			};

			var mainView = new app.MainView(options);
		});
	</script>

	<!-- sidebar scroll plugin -->
	<script type="text/javascript" src="https://i.jobkorea.kr/content/js/starter/jquery.nanoscroller.js"></script>

	<!-- sidebar uit js -->
	<script type="text/javascript" src="https://i.jobkorea.kr/content/js/pc/main_sidebar.min.js?201808231500"></script>

	<!-- carouFredSel plugin -->
	<script type="text/javascript" src="https://i.jobkorea.kr/content/js/plugin/jquery.caroufredsel-6.2.1-packed.js?20180308"></script>

	<script>
		$(function () {
			// sidebar ui 실행함수
			jkUitSideBar.init();

			// 2018-05-31 베너 GNB(_Header_Main.cshtml)로 이동 LMJ
			// carousel 배너
			//var banner_1 = new uit.carousel('#carousel_1', { animation: false, hoverAnimationBtn: true, random: true });
			//var banner_2 = new uit.carousel('#carousel_2', { random: false });

			// 주요공고
			var mainGiLink = $("#starter_banner ul").carouFredSel({
				align: "left",
				width: 955, // 가로길이
				height: 68, // 세로길이
				items: {
					visible: 10 // 보여지는 갯수 (9개가 보여진다면 +1을 하여 버블링 효과를 막는다.)
				},
				scroll: {
					items: 1, // 롤링넘어가는 갯수
					duration: 500, //롤링 속도
					pauseOnHover: true // 마우스 오버시 롤링멈춤 true, 롤링작동 false
				},
				next: {
					button: "#banner_right", // 오른쪽으로 이동 버튼
					duration: 0, //롤링 속도
				},
				prev: {
					button: "#banner_left", // 왼쪽으로 이동 버튼
					duration: 0, //롤링 속도
				},
				direction: "left" // 롤링 방향
			});
		});
	</script>
	<!-- 201709 개편 //-->
	<script src="/NET/bundles/Main?v=tJwIr0oO2dafyepZA-1TBWdh6E1J-bf_GAqj2LPT_Wk1"></script>


	<div id="criteo-tags-div" style="display: none;"></div>


</body>

</html>
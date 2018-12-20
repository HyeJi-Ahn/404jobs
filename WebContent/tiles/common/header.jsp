<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<body class="byWd byNm" >
	<p id="accessibility">
		<a href="#point">메뉴 건너뛰기</a>
	</p>
	<script type="text/javascript" src="/scripts/Landing_Banner.js?ver=35"></script>
	<script type="text/javascript">
		(function ($) {
			//$("document").ready(function () {
			$(window).load(function () {

				var bnnrCnt = $('div[name="DivBanner"]').length;
				var nextSeq = GetNextBnnrSeq();

				for (i = 0; i <= bnnrCnt - 1; i++) {
					if (ShowNextBnnr(nextSeq)) {
						break;
					}
					else {
						nextSeq = GetNextBnnrSeq();
					}
				}
			}); //ready
		})(jQuery)

		function GetNextBnnrSeq() {
			var seq = getCookie("Main_Top_Banner_Seq");

			if (seq == "") {
				seq = 1;
			}
			else {
				if ($('div[name="DivBanner"]').length > Number(seq)) {
					seq = Number(seq) + 1;
				}
				else {
					seq = 1;
				}
			}

			return seq;
		}

		function ShowNextBnnr(seq) {
			setCookie("Main_Top_Banner_Seq", seq, 60, '/', 'jobkorea.co.kr');

			if (document.getElementById("Banner" + seq)) {
				var bnnrNo = $("#hidBnnrNo" + seq).val();
				var cookieName = "Event3Day_Banner" + (bnnrNo === "AD" ? "AD" : "");

				if (getCookie(cookieName) == null) {
					//$("#Banner" + seq).slideDown("slow");
					$("#Banner" + seq).animate({
						"height": "show",
						"marginTop": "show",
						"marginBottom": "show",
						"paddingTop": "show",
						"paddingBottom": "show"
					}, "fast");
					return true;
				}
			}
			return false;
		}
	</script>
	<div id="headerWrap" class="gnbTheme1080 devGnbContainer">
		<div id="header">
			<div class="headInner">
				<!-- 로고 -->
				<h1 class="jkLogo">
					<a href="https://www.jobkorea.co.kr">취업 준비의 시작! 404Job</a>
				</h1>

				<!-- // search -->
				<div class="search">
					<h2 class="skip">검색</h2>
					<form name="global_seek" id="AKCFrm" autocomplete="off"
						action="/Search/" onsubmit="return GoMainTotalSearch();"
						target="_self">
						<fieldset>
							<legend>Smart Match 통합검색</legend>
							<div class="smKey">
								<input type="text" id="stext" title="검색어 입력" name="stext"
									maxlength="50">
								<!-- // 기존 자동완성 들어갈 영역 -->
								<div id="AKCDiv" class="autoSearch">
									<!-- // 기능 끈 상황 -->
									<div id="SearchStop" class="autoSearchStop">
										<p class="btnArrow" id="btnArrow_C">
											<button type="button" title="열림"
												class="devAcDisabledInfoOpen">
												<span class="blind">열림</span>
											</button>
										</p>
										<div class="searchStopDesc" id="StopDesc">
											<p class="description">
												키워드를 입력하시면<br> 검색어와 채용정보를 추천해드립니다.
											</p>
											<p class="btnOdd">
												<button type="button" id="devAcOn">기능켜기</button>
												<span>|</span>
												<button type="button" id="devAcInfoClose" class="odd">닫기</button>
											</p>
										</div>
										<p class="btnArrow btnArrowClose" id="btnArrow_O">
											<button type="button" title="닫힘"
												class="devAcDisabledInfoClose">
												<span class="blind">닫힘</span>
											</button>
										</p>
										<div class="bg"></div>
									</div>

									<!-- // 기능 켠 상황 -->
									<div id="SearchStart" class="autoSearchStart">
										<div class="iframeHolder"
											data-url="//www.jobkorea.co.kr/Main/_OneShotSearch"
											data-id="AKCIfrm" data-name="AKCIfrm" data-title="자동검색"
											data-allowtransparency="true">
											<iframe src="//www.jobkorea.co.kr/Main/_OneShotSearch"
												scrolling="no" frameborder="0" marginheight="0"
												marginwidth="0" id="AKCIfrm" name="AKCIfrm" title="자동검색"
												allowtransparency="true"></iframe>
										</div>
										<p class="btnOdd">
											<button type="button" id="devAcOff" class="odd">기능끄기</button>
										</p>
										<div class="bg"></div>
									</div>
								</div>
								<!-- 기존 자동완성 들어갈 영역 // -->
								<input type="submit" value="검색" class="submit spGnb"
									id="common_search_btn">
							</div>
						</fieldset>
					</form>
				</div>
			</div>
			<!-- headInner // -->
			<div id="headNavBar" class="headNavBar">
				<div class="navInner">
					<!-- 전체보기 버튼 클릭시 active 클래스 추가 -->
					<div class="allArea">
						<h2 class="skip">전체서비스</h2>
						<button type="button" class="btnAllService">
							<span class="spGnb"><span class="txIr">전체서비스 열기</span></span>
						</button>
						<!-- // 전체보기 레이어 -->
						<div class="lyNavArea" id="devGnbAllServiceMenu">
							<div class="lyNavWrap">
								<div class="lyNavInner side">
									<div class="lyRow row01">
										<div class="lyCol col4">
											<div class="colItem">
												<strong class="titArea"><a
													href="http://www.jobkorea.co.kr/recruit/home" class="tit">채용정보<span
														class="spGnb"></span></a></strong>
												<div class="listBx">
													<ul>
														<li><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=search">상세검색</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;localorder=1">지역별</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty">직무별</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry">산업별</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype1&amp;cotype=1,2,3">기업별</a></li>
														<li><a href="http://www.jobkorea.co.kr/Super/Main">슈퍼기업관</a></li>
														<li><a href="http://www.jobkorea.co.kr/Theme/Main">전문채용관</a></li>
													</ul>
												</div>
											</div>
										</div>
										<div class="lyCol col4">
											<div class="colItem">
												<strong class="titArea"><a
													href="http://www.jobkorea.co.kr/starter" class="tit">신입공채<span
														class="spGnb"></span></a></strong>

												<div class="listBx">
													<ul>
														<li><a href="http://www.jobkorea.co.kr/starter/">1000대기업
																공채</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/starter/calendar/">공채달력</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/starter/company/">기업공채전략</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/starter/interview">직무인터뷰</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/starter/jobfair/">채용설명회</a></li>
														<li><a href="http://www.jobkorea.co.kr/starter/spec/">합격스펙</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/starter/passassay/">합격자소서</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/starter/review/">인적성·면접후기</a></li>
													</ul>
												</div>
											</div>
										</div>
										<div class="lyCol col4">
											<div class="colItem">
												<strong class="titArea"><a
													href="http://www.jobkorea.co.kr/headhunting/home"
													class="tit">헤드헌팅<span class="spGnb"></span></a></strong>

												<div class="listBx">
													<ul>
														<li><a
															href="http://www.jobkorea.co.kr/headhunting/home">헤드헌팅
																채용정보</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/headhunting/headhunter/">헤드헌터
																찾기</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/User/consulting">헤드헌팅
																채용상담</a></li>
													</ul>
												</div>
											</div>
										</div>
										<div class="lyCol col4">
											<div class="colItem">
												<strong class="titArea"><a
													href="http://www.jobkorea.co.kr/hr/" class="tit">파견·대행<span
														class="spGnb"></span></a></strong>

												<div class="listBx">
													<ul>
														<li><a
															href="http://www.jobkorea.co.kr/hr/?schstat=#JobForm">상세검색</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/List_HR/HR_Area.asp">지역별</a></li>
														<li><a href="http://www.jobkorea.co.kr/hr/part/main">직무·산업별</a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>


									<div class="lyRow row02">
										<div class="lyCol col4">
											<div class="colItem">
												<strong class="titArea"><a
													href="http://www.jobkorea.co.kr/Salary/" class="tit">연봉<span
														class="spGnb"></span></a></strong>
												<div class="listBx">
													<ul>
														<li><a href="http://www.jobkorea.co.kr/Salary/">연봉통계</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/Salary/?act=s&amp;el=salarySearchCompany">기업검색</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/Salary/?act=s&amp;el=salaryNew">연봉뉴스</a></li>
														<li><a href="http://www.jobkorea.co.kr/Salary/MyList">내
																연봉관리</a></li>
													</ul>
												</div>
											</div>
										</div>
										<div class="lyCol col4">
											<div class="colItem">
												<strong class="titArea"><a
													href="http://www.jobkorea.co.kr/GoodJob/news" class="tit">뉴스·자료<span
														class="spGnb"></span></a></strong>

												<div class="listBx">
													<ul>
														<li><a href="http://www.jobkorea.co.kr/GoodJob/news">취업뉴스</a></li>
														<li><a href="http://www.jobkorea.co.kr/Starter/Tip"
															target="_blank" title="새창 열림">취업꿀팁<span
																class="icnNavBlank spGnb"></span></a></li>
														<li><a
															href="http://www.jobkorea.co.kr/GoodJob/Docs/form">자료실</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/service/user/tool/spellcheck">취업
																성공 툴</a></li>
													</ul>
												</div>
											</div>
										</div>
										<div class="lyCol col4">
											<div class="colItem">
												<strong class="titArea"><a
													href="http://www.jobkorea.co.kr/service/user/tool/spellcheck"
													class="tit">취업 성공 툴<span class="spGnb"></span></a></strong>

												<div class="listBx">
													<ul>
														<li><a
															href="http://www.jobkorea.co.kr/SelfIntroduction/PassAssayIndex"
															target="_blank" title="새창 열림">자소서 작성<span
																class="icnNavBlank spGnb"></span></a></li>
														<li><a
															href="http://www.jobkorea.co.kr/service/user/tool/spellcheck">맞춤법
																검사</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/service/user/tool/textcount">글자수
																세기</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/service/user/tool/univpoint">학점변환</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/service/user/tool/engpoint">어학점수
																변환</a></li>
													</ul>
												</div>
											</div>
										</div>
										<div class="lyCol col4">
											<div class="colItem">
												<strong class="titArea"><a
													href="http://www.jobkorea.co.kr/List_Edu/Edu_Main.asp"
													class="tit">교육<span class="spGnb"></span></a></strong>

												<div class="listBx">
													<ul>
														<li><a
															href="http://www.jobkorea.co.kr/List_Edu/Edu_Search.asp">상세검색</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/List_Edu/Edu_Area.asp">지역별</a></li>
														<li><a href="http://www.jobkorea.co.kr/edu/part/main">직무·산업별</a></li>
														<li><a
															href="http://www.jobkorea.co.kr/List_Edu/Edu_GM_Support.asp">교육비지원별</a></li>
														<li><a href="https://www.jobkorea.co.kr/learning/"
															target="_blank" title="새창 열림">잡코리아 러닝<span
																class="icnNavBlank spGnb"></span></a></li>
													</ul>
												</div>
											</div>
										</div>
									</div>

									<div class="sideCol">
										<div class="sideInner">
											<div class="row01">
												<div class="sideList">
													<ul>
														<li class="qna"><a
															href="http://www.jobkorea.co.kr/user/qstn/move"
															target="_blank"><span class="spGnb icnList"></span>선배에게
																질문하기</a></li>
														<li class="spec"><a
															href="http://www.jobkorea.co.kr/starter/spec/"><span
																class="spGnb icnList"></span>합격스펙</a></li>
														<li class="onair"><a
															href="http://www.jobkorea.co.kr/starter/onair"><span
																class="spGnb icnList"></span>잡코리아 TV</a></li>
														<!-- <li class="career"><a href="#"><span class="spGnb icnList"></span>커리어패스</a></li> -->
														<li class="inside"><a
															href="http://www.jobkorea.co.kr/starter/companyreport/"><span
																class="spGnb icnList"></span>기업분석보고서</a></li>
														<li class="jku"><a
															href="https://www.jobkorea.co.kr/learning/"
															target="_blank"><span class="spGnb icnList"></span>잡코리아러닝</a></li>
														<!--<li class="option"><a href="http://www.jobkorea.co.kr/service/user/serviceguide"><span class="spGnb icnList"></span>서비스안내</a></li>-->
														<li class="help"><a
															href="http://www.jobkorea.co.kr/help/faq/user"><span
																class="spGnb icnList"></span>고객센터</a></li>
													</ul>
												</div>
											</div>

											<div class="row02">
												<div class="sideBtmBx">
													<div class="corpBx">
														<p class="tit">인재를 찾으시나요?</p>
														<p class="tx">채용공고를 등록하세요.</p>
														<div class="link">
															<a href="http://www.jobkorea.co.kr/Corp/Main">기업서비스<span
																class="spGnb"></span></a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- 전체보기 레이어 // -->
					</div>

					<div class="jkNavArea">
						<h2 class="skip">주요서비스</h2>
						<ul class="serviceNav">

							<!-- 메뉴 활성화 클래스 navFixed 마우스 오버시 active 클래스 추가 -->
							<li id="gnbGi" class="navItem gi"><a
								href="http://www.jobkorea.co.kr/recruit/home" class="linkItem"><span
									class="spNav"><span class="txIr">채용정보</span></span></a> <!-- // 채용정보 레이어 -->
								<div class="lyNavArea">
									<h3 class="skip">채용정보 세부메뉴</h3>
									<div class="lyNavWrap">
										<div class="lyNavInner side">
											<div class="lyRow row01">
												<div class="lyCol col4">
													<div class="colItem">
														<strong class="titArea"><a
															href="http://www.jobkorea.co.kr/recruit/home" class="tit">채용정보홈<span
																class="spGnb"></span></a></strong> <strong class="titArea"><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;localorder=1"
															class="tit">지역별<span class="spGnb"></span></a></strong>

														<div class="listBx">
															<ul class="colList joblistArea">
																<li class="begin"><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=I000">서울</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=B000">경기</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=K000">인천</a></li>
																<li class="begin"><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=G000">대전</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=1000">세종</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=O000">충남</a></li>
																<li class="begin"><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=P000">충북</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=E000">광주</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=L000">전남</a></li>
																<li class="begin"><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=M000">전북</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=F000">대구</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=D000">경북</a></li>
																<li class="begin"><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=H000">부산</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=J000">울산</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=C000">경남</a></li>
																<li class="begin"><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=A000">강원</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=N000">제주</a></li>
																<li class=""><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=local&amp;local=Q000">전국</a></li>

															</ul>
														</div>
													</div>
												</div>
												<div class="lyCol col4_2">
													<div class="colItem">
														<strong class="titArea"><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty"
															class="tit">직무별<span class="spGnb"></span></a></strong>

														<div class="listBx">

															<ul class="halfLists">
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10012">경영·사무</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10013">마케팅·광고·홍보</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10016">IT·인터넷</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10019">디자인</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10014">무역·유통</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10015">영업·고객상담</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10022">서비스</a></li>
															</ul>
															<ul class="halfLists evenList">
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10018">연구개발·설계</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10017">생산·제조</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10023">교육</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10021">건설</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10024">의료</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10020">미디어</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=duty&amp;dutyCtgr=10025">전문·특수직</a></li>
															</ul>
														</div>
													</div>
												</div>
												<div class="lyCol col4">
													<div class="colItem">
														<strong class="titArea"><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry"
															class="tit">산업별<span class="spGnb"></span></a></strong>

														<div class="listBx">
															<ul>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10001">서비스업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10002">금융·은행업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10007">IT·정보통신업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10010">판매·유통업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10009">제조·생산·화학업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10011">교육업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10003">건설업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10004">의료·제약업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10005">미디어·광고업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10006">문화·예술·디자인업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=industry&amp;industryCtgr=10008">기관·협회</a></li>
															</ul>
														</div>
													</div>
												</div>
											</div>


											<div class="lyRow row02">
												<div class="lyCol col4">
													<div class="colItem">
														<strong class="titArea"><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype1&amp;cotype=1,2,3"
															class="tit">기업별<span class="spGnb"></span></a></strong>
														<div class="listBx">
															<ul>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype1&amp;cotype=1,2,3">대기업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype2&amp;cotype=4,5">중견·강소기업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype3&amp;cotype=6">외국계기업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype4&amp;cotype=8">공기업·공사</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=cotype5&amp;cotype=11,12,13,14">상장기업</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/list_gi/csc/list.asp">공무원·공직</a></li>
															</ul>
														</div>
													</div>
												</div>
												<div class="lyCol col4">
													<div class="colItem">
														<strong class="titArea"><span class="tit">학력별</span></strong>

														<div class="listBx">
															<ul>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=edu1&amp;edu=3">고졸채용</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=edu2&amp;edu=4">대학(2,3년제)
																		채용</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=edu3&amp;edu=5">대학교(4년제)
																		채용</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=edu4&amp;edu=6,7">석박사
																		우대</a></li>
															</ul>
														</div>
													</div>
												</div>
												<div class="lyCol col4">
													<div class="colItem">
														<strong class="titArea"><span class="tit">상세조건별</span></strong>

														<div class="listBx">
															<ul>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=detail1&amp;localorder=2">해외지역</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=detail2">직급/직책별</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=detail3">전공계열별</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=detail4">우대조건별</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=detail5">자격증별</a></li>
																<li><a
																	href="http://www.jobkorea.co.kr/recruit/joblist?menucode=detail6">복리후생별</a></li>
															</ul>
														</div>
													</div>
												</div>
												<div class="lyCol col4">
													<div class="colItem">
														<strong class="titArea"><a
															href="http://www.jobkorea.co.kr/recruit/joblist?menucode=search"
															class="tit">상세검색<span class="spGnb"></span></a></strong>

													</div>
												</div>
											</div>

											<div class="sideCol">
												<div class="sideInner">
													<div class="row01">
														<strong class="titArea"><a
															href="http://www.jobkorea.co.kr/starter/" class="tit">신입공채</a></strong>
														<div class="sideList">
															<ul>
																<li class="best1000"><a
																	href="http://www.jobkorea.co.kr/starter/"><span
																		class="spGnb icnList"></span>1000대기업 공채</a></li>
																<li class="ort"><a
																	href="http://www.jobkorea.co.kr/starter/?schLocal=&amp;schPart=&amp;schMajor=&amp;schEduLevel=&amp;schWork=&amp;schCType=&amp;isSaved=0&amp;LinkGubun=3&amp;LinkNo=0&amp;Page=1&amp;schType=0&amp;schGid=0&amp;schOrderBy=0&amp;schTxt="><span
																		class="spGnb icnList"></span>공채예상일정</a></li>
																<li class="intern"><a
																	href="http://www.jobkorea.co.kr/starter/?schLocal=&amp;schPart=&amp;schMajor=&amp;schEduLevel=&amp;schWork=2&amp;schCType=&amp;isSaved=1&amp;LinkGubun=0&amp;LinkNo=0&amp;Page=1&amp;schType=0&amp;schGid=0&amp;schOrderBy=0&amp;schTxt="><span
																		class="spGnb icnList"></span>인턴채용</a></li>
																<li class="cal"><a
																	href="http://www.jobkorea.co.kr/starter/calendar/"><span
																		class="spGnb icnList"></span>공채달력</a></li>
															</ul>
														</div>

														<div class="sideBtmBx">
															<div class="sideLinkType01">
																<a href="http://www.jobkorea.co.kr/Super/Main"> <strong>슈퍼기업관</strong>
																	<span>직원에게 사랑받는 알짜기업</span>
																</a> <a href="http://www.jobkorea.co.kr/Theme/Main"> <strong>전문채용관</strong>
																	<span>채용정보 테마별 전문채용관</span>
																</a>
															</div>
														</div>
													</div>

													<div class="row02"></div>
												</div>
											</div>

											<button type="button" class="btnCloseNav spGnb">채용정보
												메뉴 닫기</button>
										</div>
									</div>
								</div> <!-- 채용정보 레이어 // --></li>

							<!--TOP100-->
							<li id="gnbTop100" class="navItem top100 lyNull"><a
								href="http://www.jobkorea.co.kr/top100/" class="linkItem"> <span
									class="spNav"><span class="txIr">TOP100 </span></span> <span
									class="spGnb icnGnbTop100">놓치면 후회하는 인기공고</span>
							</a></li>

							<!--Notice-->
							<li id="gnbNotice" class="navItem top100 lyNull"><a
								href="http://www.jobkorea.co.kr/Notice/" class="linkItem"> <span
									class="spNav"><span class="txIr"> 공지사항 </span></span>
							</a></li>

							<!--Notice-->
							<li id="gnbNotice" class="navItem top100 lyNull"><a
								href="http://www.jobkorea.co.kr//" class="linkItem"> <span
									class="spNav"><span class="txIr"> 공지사항 </span></span>
							</a></li>
						</ul>
						<!-- my 홈일경우 클래스 myPage -->
						<ul id="devMyPage" class="userNav">
							<script type="text/javascript">

								$(document).ready(function () {
									$('#js-bell').on("click", function () {
										$('.notification').find('.popup-notification').toggleClass("attached");

										if ($("#js-notiLayer").children().size() == 0)
											$("#js-notiLayer").load("/User/Alarm/AlarmLayerDetail?Page_Num=1");

										if ($('.notification').find('.popup-notification').hasClass("attached")) {
											var idxNo = 88518; // 레이어 호출 수(로그인 상태)
											var loginFlag = 'True';

											if (loginFlag == 'True')
												idxNo = 88517;


											$.ajax({
												url: '//m.jobkorea.co.kr/Link/default_JSON.asp?No=' + idxNo,
												method: "post",
												dataType: "jsonp",
												success: function () { }
											});

											if ($('#js-alarmCnt').hasClass("badge"))
												$('#js-alarmCnt').removeClass("badge");

										}
									});
								});
							</script>
							<li class="my">
								<h2 class="skip">MY 홈</h2> <a
								href="https://www.jobkorea.co.kr/Login/Login_Tot.asp?rDBName=GG&amp;ignoreSession=1&amp;re_url=http%3a%2f%2fwww.jobkorea.co.kr%2fuser%2fmypage"
								class="btnMyOpen"><span class="spGnb"></span>MY홈</a> <!-- // 나의메뉴 레이어 -->
								<div class="lyMyArea">
									<!-- // 나의메뉴 로그인전 -->
									<div class="myInner">
										<div class="lyRow">
											<p class="txLogin">취업을 원하시나요?</p>

											<div class="btnRowWrap">
												<div class="rowCenter">
													<button type="button" class="btnLogin"
														onclick="document.location.href = 'https://www.jobkorea.co.kr/Login/Login_Tot.asp?rDBName=GG&amp;ignoreSession=1&amp;re_url=https%3a%2f%2fwww.jobkorea.co.kr%2fMain%2fIndex'">로그인</button>
													<a href="https://www.jobkorea.co.kr/Join/M_Regist"
														class="btnReg">회원가입</a>
												</div>
											</div>
										</div>

										<div class="myLists">
											<ul>
												<li><a
													href="https://www.jobkorea.co.kr/Login/Login_Tot.asp?rDBName=GG&amp;ignoreSession=1&amp;re_url=http://www.jobkorea.co.kr/User/Mypage"><span
														class="tx">개인회원홈</span></a></li>
												<li><a
													href="https://www.jobkorea.co.kr/Login/Login_Tot.asp?rDBName=GG&amp;ignoreSession=1&amp;re_url=http://www.jobkorea.co.kr/User/ResumeMng"><span
														class="tx">이력서 관리</span></a></li>
												<li><a
													href="https://www.jobkorea.co.kr/Login/Login_Tot.asp?rDBName=GG&amp;ignoreSession=1&amp;re_url=http://www.jobkorea.co.kr/User/ApplyMng"><span
														class="tx">입사지원 현황</span></a></li>
												<li><a
													href="https://www.jobkorea.co.kr/Login/Login_Tot.asp?rDBName=GG&amp;ignoreSession=1&amp;re_url=http://www.jobkorea.co.kr/User/ResumeRead"><span
														class="tx">이력서 열람기업</span></a></li>
												<li><a
													href="https://www.jobkorea.co.kr/Login/Login_Tot.asp?rDBName=GG&amp;ignoreSession=1&amp;re_url=http://www.jobkorea.co.kr/User/Smartmatch"><span
														class="tx">스마트매치</span></a></li>
												<li><a
													href="https://www.jobkorea.co.kr/Login/Login_Tot.asp?rDBName=GG&amp;ignoreSession=1&amp;re_url=http://www.jobkorea.co.kr/User/Scrap"><span
														class="tx">스크랩</span></a></li>
											</ul>
										</div>
									</div>
									<!-- 나의메뉴 로그인전 // -->

									<button type="button" class="btnMyClose">
										<span class="spGnb"></span><span class="skip">나의메뉴 닫기</span>
									</button>
									<span class="icnArr spGnb"></span>
								</div> <!-- 나의메뉴 레이어 // -->

							</li>
							<li class="corp">
								<h2 class="skip">기업서비스</h2> <a
								href="http://www.jobkorea.co.kr/Corp/Main" target="_blank">기업서비스<span
									class="spGnb"></span></a> <!-- // 기업서비스 레이어 -->
								<div class="lyMyArea">

									<div class="myInner">
										<div class="lyRow">
											<p class="txLogin">인재를 찾으시나요?</p>

											<div class="btnRowWrap">
												<div class="rowCenter">
													<button class="btnLogin"
														onclick="document.location.href = 'https://www.jobkorea.co.kr/Login/Login_Tot.asp?rDBName=GG&amp;ignoreSession=1&amp;re_url=https%3a%2f%2fwww.jobkorea.co.kr%2fnet%2fMain%2fIndex'"
														type="button">로그인</button>
													<a class="btnReg"
														href="https://www.jobkorea.co.kr/Join/GI_Regist?OEM_No=1&amp;Org_OEM_No=1">회원가입</a>
												</div>
											</div>
										</div>

										<div class="myLists">
											<ul>
												<li><a href="http://www.jobkorea.co.kr/Corp/Main"><span
														class="tx">기업회원홈</span></a></li>
												<li><a
													href="http://www.jobkorea.co.kr/Yocruit/Mng/GI_Reg"><span
														class="tx">채용공고 등록</span></a></li>
												<li><a href="http://www.jobkorea.co.kr/Corp/GiMng/List"><span
														class="tx">공고·지원자 관리</span></a></li>
												<li><a
													href="http://www.jobkorea.co.kr/Corp/Person/Find"><span
														class="tx">인재검색·관리</span></a></li>
												<li><a
													href="http://www.jobkorea.co.kr/Service/Company/Option"><span
														class="tx">기업회원 서비스안내</span></a></li>
												<li class="case hr"><a
													href="http://www.jobkorea.co.kr/Service/Outsourcing/Posting"><span
														class="tx">파견·대행</span></a></li>
												<li class="case hh"><a
													href="http://www.jobkorea.co.kr/Service/Headhunting/Platinum"><span
														class="tx">서치펌</span></a></li>
												<li class="case ed"><a
													href="http://www.jobkorea.co.kr/Service/Edu/Option"><span
														class="tx">교육기관</span></a></li>
											</ul>
										</div>
									</div>
									<button class="btnMyClose" type="button">
										<span class="spGnb"></span><span class="skip">기업회원 메뉴
											닫기</span>
									</button>
									<span class="icnArr spGnb"></span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>

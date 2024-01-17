<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<script type="text/javascript"
	src="//dapi.kakao.com/v2/maps/sdk.js?appkey=5ee26fcadc83c7e574db5ef67f895de8&libraries=services"></script>
<head>
<title>Trip detail</title>
</head>
<link rel="stylesheet" href="/resources/css/main.css">
<body>
	<style>
.logo-images {
	width: 354px;
	height: 150px;
}

.search-images {
	width: 500px;
	height: 150px;
}
/* 기본 스타일 */
.content_area {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
}

/* 각 섹션의 공통 스타일 */
.image_section, .title_section, .address_section, .overview_section,
	.map_section {
	margin-bottom: 30px;
}

/* 레이블 스타일 */
label {
	font-weight: bold;
	display: block;
	margin-bottom: 5px;
}

/* 이미지 스타일 */
.trip-images {
	width: 800px; /* 이미지 너비를 100%로 설정하여 부모 요소에 맞게 조절합니다. */
	height: auto; /* 높이는 자동으로 조절되어 비율을 유지합니다. */
	border-radius: 5px;
	max-width: 100%; /* 이미지의 최대 너비를 100%로 설정하여 화면을 넘어가지 않도록 합니다. */
	max-height: 500px; /* 이미지의 최대 높이를 지정합니다. */
}

/* 제목 스타일 */
.detail_title {
	font-size: 24px;
	font-weight: bold;
	color: #333;
}

/* 주소, 소개 스타일 */
.detail_addr {
	font-size: 16px;
	line-height: 1.6;
	color: #666;
	font-weight: bold;
}

.detail_overview {
	font-size: 16px;
	line-height: 1.6;
	color: #666;
}

/* 지도 스타일 */
#map {
	width: 100%;
	height: 300px;
	border: 1px solid #ccc;
	border-radius: 5px;
}
</style>
	<div class="wrapper">
		<div class="wrap">
			<div class="top_gnb_area">
				<ul class="list">
					<c:if test="${member == null}">
						<li><a href="/member/login">로그인</a></li>
						<li><a href="/member/join">회원가입</a></li>
					</c:if>
					<c:if test="${member != null }">
						<c:if test="${member.adminCk == 1 }">
							<li><a href="/admin/main">관리자 페이지</a></li>
						</c:if>
						<li><a href="/member/logout">로그아웃</a></li>
					</c:if>
					<li><a href="/post/list">게시판</a></li>
				</ul>
			</div>
			<div class="top_area" style="display: flex; align-items: center;">
				<img class="logo-images" src="/resources/images/logo2.jpg"
					style="margin-right: 10px;"> <img class="search-images"
					src="/resources/images/naverSearch.JPG" style="margin-right: 10px;">
				<div class="login_area">
					<!-- 로그인 하지 않은 상태 -->
					<c:if test="${member == null}">
						<div class="login_button">
							<a href="/member/login">로그인</a>
						</div>
						<span><a href="/member/join">회원가입</a></span>
					</c:if>
					<!-- 로그인한 상태 -->
					<c:if test="${ member != null}">
						<div class="login_success_area">
							<span>이름 : ${member.memberName}</span> <span>아이디 :
								${member.memberId}</span> <a href="/member/logout">로그아웃</a>
						</div>
					</c:if>
				</div>
			</div>

			<div class="clearfix"></div>
			<div class="navi_bar_area">
				<div class="dropdown">
					<button class="dropbtn">자 연</button>
					<div class="dropdown-content" id="natureDropdown">
						<a href="/trip/trips">서 울</a> <a href="#">인 천</a> <a href="#">대
							전</a> <a href="#">대 구</a> <a href="#">광 주</a> <a href="#">부 산</a> <a
							href="#">울 산</a> <a href="#">세 종</a> <a href="#">경 기</a> <a
							href="#">강 원</a>
					</div>
				</div>
				<div class="dropdown">
					<button class="dropbtn">인 문</button>
					<div class="dropdown-content" id="humanitiesDropdown">
						<a href="#">공사중</a>
					</div>
				</div>

				<div class="dropdown">
					<button class="dropbtn">음 식</button>
					<div class="dropdown-content" id="foodDropdown">
						<a href="#">공사중</a>
					</div>
				</div>
				<div class="dropdown">
					<button class="dropbtn">레포츠</button>
					<div class="dropdown-content" id="">
						<a href="#">공사중</a>
					</div>
				</div>
				<div class="dropdown">
					<button class="dropbtn">쇼 핑</button>
					<div class="dropdown-content" id="natureDropdown">
						<a href="#">공사중</a>
					</div>
				</div>
				<div class="dropdown">
					<button class="dropbtn">숙 박</button>
					<div class="dropdown-content" id="natureDropdown">
						<a href="#">공사중</a>
					</div>
				</div>
				<div class="dropdown">
					<button class="dropbtn">추천코스</button>
					<div class="dropdown-content" id="natureDropdown">
						<a href="#">공사중</a>
					</div>
				</div>
			</div>
			<div class="content_area">
				<!-- 이미지만 있는 공간 -->
				<div class="image_section">
					<div class="image_section">
						<c:choose>
							<c:when test="${empty details.trip_images}">
								<!-- details.trip_images 값이 비어있는 경우 다른 이미지 URL 사용 -->
								<img class="trip-images"
									src="https://lh3.googleusercontent.com/oucDcDAOVG1fLnm_XdisT0Sp3c72sI8JuR_PWKWmeXBn5_rNadTd7pW3FXuGQrOz8zHwhlhX2OYCPGBzfHNR_X8LWg=s800-w800-h500"
									alt="${details.trip_title}" />
							</c:when>
							<c:otherwise>
								<!-- details.trip_images 값이 있는 경우 해당 이미지 URL 사용 -->
								<img class="trip-images" src="${details.trip_images}"
									alt="${details.trip_title}" />
							</c:otherwise>
						</c:choose>
					</div>

				</div>

				<!-- 제목만 있는 공간 -->
				<div class="title_section">
					<label>장소명</label>
					<div class="detail_title">${details.trip_title}</div>
				</div>

				<!-- 주소만 있는 공간 -->
				<div class="address_section">
					<label>주소</label>
					<div class="detail_addr">${details.trip_addr}</div>
				</div>

				<!-- 소개만 있는 공간 -->
				<div class="overview_section">
					<label>장소 소개</label>
					<div class="detail_overview">${details.trip_overview}</div>
				</div>

				<!-- 지도가 있는 공간 -->
				<div class="map_section">
					<label>찾아가는 길</label>
					<div id="map" style="width: 500px; height: 350px;"></div>
				</div>
			</div>

		</div>
	</div>
</body>
<script>
	var tripAddr = "${details.trip_addr}";
	var tripTitle = "${details.trip_title}";
	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	mapOption = {
		center : new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level : 3
	// 지도의 확대 레벨
	};

	// 지도를 생성합니다    
	var map = new kakao.maps.Map(mapContainer, mapOption);

	// 주소-좌표 변환 객체를 생성합니다
	var geocoder = new kakao.maps.services.Geocoder();

	// 주소로 좌표를 검색합니다
	geocoder
			.addressSearch(
					tripAddr,
					function(result, status) {

						// 정상적으로 검색이 완료됐으면 
						if (status === kakao.maps.services.Status.OK) {

							var coords = new kakao.maps.LatLng(result[0].y,
									result[0].x);

							// 결과값으로 받은 위치를 마커로 표시합니다
							var marker = new kakao.maps.Marker({
								map : map,
								position : coords
							});

							// 인포윈도우로 장소에 대한 설명을 표시합니다
							var infowindow = new kakao.maps.InfoWindow(
									{
										content : '<div style="width:150px;text-align:center;padding:6px 0;">'
												+ tripTitle + '</div>'
									});
							infowindow.open(map, marker);

							// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
							map.setCenter(coords);
						}
					});
</script>

</html>
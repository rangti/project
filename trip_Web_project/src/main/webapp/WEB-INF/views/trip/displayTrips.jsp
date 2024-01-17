<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Welcome Tourist</title>
<link rel="stylesheet" href="/resources/css/main.css">
</head>

<style>
.trip_title {
	text-align: center;
	font-weight: bold;
}

.trip_addr {
	text-align: center;
}

.trip-info {
	width: 300px;
	height: 300px;
	font-weight: bold;
	text-align: center;
}

.trip-images {
	width: 80%;
	height: 80%;
	object-fit: cover;
}

.logo-images {
	width: 354px;
	height: 150px;
}

.search-images {
	width: 500px;
	height: 150px;
}
</style>
<body>
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
				<c:forEach var="trip" items="${trips}">
    <div class="trip-info">
        <p><a href="/trip/detail?trip_contentId=${trip.trip_contentId}">${trip.trip_title}</a></p>
        <c:choose>
            <c:when test="${empty trip.trip_images}">
                <!-- trip_images 값이 비어있는 경우 다른 이미지 URL 사용 -->
                <img class="trip-images" src="https://lh3.googleusercontent.com/oucDcDAOVG1fLnm_XdisT0Sp3c72sI8JuR_PWKWmeXBn5_rNadTd7pW3FXuGQrOz8zHwhlhX2OYCPGBzfHNR_X8LWg=s1280-w1280-h800" alt="${trip.trip_title}"/>
            </c:when>
            <c:otherwise>
                <!-- trip_images 값이 있는 경우 해당 이미지 URL 사용 -->
                <img class="trip-images" src="${trip.trip_images}" alt="${trip.trip_title}"/>
            </c:otherwise>
        </c:choose>
        <p>${trip.trip_addr}</p>
    </div>
</c:forEach>
			</div>
		</div>
	</div>

</body>
</html>
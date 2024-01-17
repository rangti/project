<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html lang="ko" xmlns="http://www.w3.org/1999/xhtml"
	xmlns:th="http://www.thymeleaf.org">
<head>
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<title>Simple Sidebar - Start Bootstrap Template</title>
<!-- Favicon-->
<link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
<!-- Core theme CSS (includes Bootstrap)-->
<link href="/resources/css/write.css" rel="stylesheet" />
<link rel="stylesheet" href="/resources/css/main.css">
<script src="https://code.jquery.com/jquery-3.4.1.js"
	integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
	crossorigin="anonymous"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/dayjs.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<style>
body {
	font-family: Arial, sans-serif;
	background-color: #f4f4f4;
	margin: 0;
	padding: 0;
}
/* Add your custom styles here */
/* ... */
.container {
	width: 80%;
	margin: 0 auto;
	padding: 20px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input_wrap {
	margin-bottom: 15px;
}

label {
	font-weight: bold;
}

textarea, input {
	width: 100%;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
}

.btn_wrap {
	margin-top: 20px;
	text-align: center; /* 버튼을 가운데 정렬 */
}

.btn {
	display: inline-block;
	padding: 8px 16px; /* 버튼 크기 작게 수정 */
	text-decoration: none;
	background-color: #007bff;
	color: #fff;
	border-radius: 4px;
	cursor: pointer;
}

.btn:not(:last-child) {
	margin-right: 10px;
}

.btn:hover {
	background-color: #0056b3;
}
</style>
<body>

	<div class="d-flex" id="wrapper">
		<!-- Page content wrapper-->
		<div id="page-content-wrapper">
			<!-- Top navigation-->
			<div class="top_gnb_area">
				<ul class="list">
					<c:if test="${member == null}">
						<li><a href="/trip/main">홈</a></li>
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
			<div class="container">
				<!-- Page content-->
				<div class="container-fluid">
					<h1 class="mt-4">Simple Sidebar</h1>
					<div class="content">
						<section>
							<table class="tb tb_row">
								<form id="updateForm" action="/post/update" method="post">
									<div>
										 <input name="board_id"
											value="${pageInfo.board_id}" readonly type="hidden"/>
									</div>
									<div class="input_wrap">
										<label>등록일</label> <input name="board_created_date"
											readonly="readonly"
											value='<c:out value="${pageInfo.board_created_date}"/>'>
									</div>
									<div class="input_wrap">
										<label>수정일</label> <input name="board_modified_date"
											readonly="readonly"
											value='<c:out value="${pageInfo.board_modified_date}"/>'>
									</div>
									<div class="input_wrap">
										<label>제목</label> <input name="board_title"
											value='<c:out value="${pageInfo.board_title}"/>'>
									</div>
									<div class="input_wrap">
										<label>작성자</label> <input name="board_writer"
											readonly="readonly"
											value='<c:out value="${pageInfo.board_writer}"/>'>
									</div>
									<div class="input_wrap">
										<label>내용</label>
										<textarea rows="3" name="board_content"><c:out
												value="${pageInfo.board_content}" /></textarea>
									</div>
								</form>
							</table>
						</section>
						<div class="btn_wrap">
							<a class="btn" id="list_btn">목록 페이지</a> 
							<a class="btn" id="update_btn">수정 완료</a> 
							<a class="btn" id="delete_btn">삭제</a>
							<a class="btn" id="cancel_btn">수정 취소</a>
						</div>
						<form id="infoForm" action="/post/update" method="get">
							<input type="hidden" id="board_id" name="board_id" value='<c:out value="${pageInfo.board_id}"/>'>
						</form>
						<script>
							let form = $("#infoForm"); // 페이지 이동 form(리스트 페이지 이동, 조회 페이지 이동)
							let mForm = $("#updateForm"); // 페이지 데이터 수정 from

							/* 목록 페이지 이동 버튼 */
							$("#list_btn").on("click", function(e) {
								if (confirm("목록으로 이동하곘습니다")) {
									form.attr("action", "/post/list");
									form.submit();
								}
							});

							$("#update_btn").on("click", function(e) {
								if (confirm("수정되었습니다")) {
									mForm.submit();
								}
							});

							/* 취소 버튼 */
							$("#cancel_btn").on("click", function(e) {
								if (confirm("수정을 취소하겠습니다")) {
									form.attr("action", "/post/view");
									form.submit();
								}
							});
							/* 삭제 버튼 */
							$("#delete_btn").on("click", function(e) {
								if (confirm("삭제되었습니다")) {
									form.attr("action", "/post/delete");
									form.attr("method", "post");
									form.submit();
								}
							});
						</script>
					</div>
					<!--/* .content */-->
				</div>
			</div>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</body>
</html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
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
					<c:if test="${member != null }">
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
								<div class="input_wrap">
									<label>등록일</label> <input name="board_created_date"
										readonly="readonly" value="${pageInfo.board_created_date}">
								</div>
								<div class="input_wrap">
									<label>수정일</label> <input name="board_modified_date"
										readonly="readonly" value="${pageInfo.board_modified_date}">
								</div>
								<div class="input_wrap">
									<label>제목</label> <input name="board_title" readonly="readonly"
										value="${pageInfo.board_title}">
								</div>
								<div class="input_wrap">
									<label for="board_writer">작성자</label> <input id="board_writer"
										name="board_writer" readonly="readonly"
										value="${pageInfo.board_writer}">
								</div>
								<div class="input_wrap">
									<label>내용</label>
									<textarea rows="3" name="board_content" readonly="readonly">${pageInfo.board_content}</textarea>
								</div>
							</table>
						</section>

						<div class="btn_wrap">
							<a class="btn" id="list_btn">목록 페이지</a> <a class="btn"
								id="modify_btn">수정하기</a>
						</div>
						<form id="infoForm" action="/post/update" method="get">
							<input type="hidden" id="board_id" name="board_id"
								value="${pageInfo.board_id}">
						</form>
					</div>
					<!--/* .content */-->
				</div>
			</div>
		</div>
	</div>
	<script>
		let form = $("#infoForm");

		$("#list_btn").on("click", function(e) {
			form.find("#board_id").remove();
			form.attr("action", "/post/list");
			form.submit();
		});

		$("#modify_btn").on("click", function(e) {
			form.attr("action", "/post/update");
			form.submit();
		});
	</script>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


</html>
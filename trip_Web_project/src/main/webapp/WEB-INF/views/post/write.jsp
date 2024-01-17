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
<script	src="https://cdnjs.cloudflare.com/ajax/libs/dayjs/1.10.7/dayjs.min.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
	<div class="d-flex" id="wrapper">
		<!-- Page content wrapper-->
		<div id="page-content-wrapper">
			<!-- Top navigation-->
			<div class="top_gnb_area">
				<ul class="list">
					<c:if test="${member != null }">
						<li><a href="/trip/main">홈</a></li>
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
								<colgroup>
									<col style="width: 15%;" />
									<col style="width: 35%;" />
									<col style="width: 15%;" />
									<col style="width: 35%;" />
								</colgroup>
								<form id="btn_12" action="/post/save" method="post">
									<tbody>
										<tr>
											<th scope="row">등록일</th>
											<td colspan="3"><input type="text" id="createdDate"
												name="board_created_date" readonly
												value="<%=new java.text.SimpleDateFormat("yyyy-MM-dd").format(new java.util.Date())%>" /></td>
										</tr>
										<tr>
											<th>제목 <span class="es">필수 입력</span></th>
											<td colspan="3"><input type="text" id="title" name="board_title" maxlength="50" placeholder="제목을 입력해 주세요." /></td>
										</tr>
										<tr>
											<th>이름 <span class="es">필수 입력</span></th>
											<td colspan="3"><input type="text" id="writer" name="board_writer" maxlength="10"
												placeholder="이름을 입력해 주세요." /></td>
										</tr>
										<tr>
											<th>내용 <span class="es">필수 입력</span></th>
											<td colspan="3">
												<textarea id="content" name="board_content" cols="150" rows="10" placeholder="내용을 입력해 주세요.">
												</textarea>
											</td>
										</tr>
									</tbody>
								</form>
							</table>
						</section>
						<p class="btn_set">
    <button type="submit" form="btn_12" class="btns btn_st3 btn_mid" id="saveBtn">저장</button>
    <button class="btns btn_bdr3 btn_mid" id="backBtn">뒤로</button>
</p>
					</div>
					<!--/* .content */-->
				</div>
			</div>
		</div>
	</div>
	</div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
		$(document).ready(function () {
		        // 저장 버튼 클릭 시
		       $("#saveBtn").on("click", function () {
		    var title = $("#title").val().trim();
		    var writer = $("#writer").val().trim();
		    var content = $("#content").val().trim();
		
		    // 필드가 비어 있는지 확인
		    if (title === '' || writer === '' || content === '') {
		        alert('제목, 이름, 내용은 필수 입력 항목입니다.');
		        return false; // 저장을 막기 위해 false 반환
		    } else {
		        // 모든 필드가 채워져 있으면 저장을 수행
		        var confirmed = confirm("저장되었습니다");
		        if (confirmed) {
		            $("#btn_12").submit();
		        }
		    }
		});


        // 뒤로 버튼 클릭 시
        $("#backBtn").on("click", function () {
            var confirmed = confirm("이 페이지를 나가시겠습니까?");
            if (confirmed) {
                window.location.href = "/post/list";
            }
        });
    });
</script>

</html>
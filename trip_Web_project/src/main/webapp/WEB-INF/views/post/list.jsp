<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<title>리스트 페이지</title>
<link href="/resources/css/list.css" rel="stylesheet" />
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
</head>
<link rel="stylesheet" href="/resources/css/main.css">
<link rel="stylesheet" href="/resources/css/write.css">
<style>
/* 가운데 정렬 스타일 */
.pageInfo_1 {
    text-align: center;
}

.pageInfo_1 li {
    display: inline-block;
    margin: 0 5px; /* 버튼 간격 조정을 위한 마진 값 설정 */
}

</style>
<body>
	<div class="d-flex" id="wrapper">
		<!-- Sidebar-->
		<div class="border-end bg-white" id="sidebar-wrapper">
			<div class="sidebar-heading border-bottom bg-light">여행 게시판</div>
			<div class="list-group list-group-flush">
				<a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="#!">Dashboard</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="#!">Shortcuts</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="#!">Overview</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="#!">Events</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="#!">Profile</a> <a
					class="list-group-item list-group-item-action list-group-item-light p-3"
					href="#!">Status</a>
			</div>
		</div>
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
				<div class="content">
					<section>
						<!-- 검색 -->
						<div class="search_box">
							<form id="searchForm" onsubmit="return false;" autocomplete="off">
								<div class="sch_group fl">
									<select title="검색 유형 선택">
										<option value="">전체 검색</option>
										<option value="">제목</option>
										<option value="">내용</option>
									</select> <input type="text" placeholder="키워드를 입력해 주세요." title="키워드 입력" />
									<button type="button" class="bt_search">
										<i class="fas fa-search"></i><span class="skip_info">검색</span>
									</button>
								</div>
							</form>
						</div>
						<!-- 리스트 -->
						<table class="tb tb_col">
							<colgroup>
								<col style="width: 50px" />
								<col style="width: 7.5%" />
								<col style="width: auto" />
								<col style="width: 10%" />
								<col style="width: 15%" />
								<col style="width: 7.5%" />
							</colgroup>
							<thead>
								<tr>
									<th scope="col" style="text-align: center;">번 호</th>
									<th scope="col" style="text-align: center;">작성자</th>
									<th scope="col" style="text-align: center;">제 목</th>
									<th scope="col" style="text-align: center;">등록일</th>
									<th scope="col" style="text-align: center;">수정일</th>
								</tr>
							</thead>
							<c:forEach items="${posts}" var="post" varStatus="loop">
								<tr>
									<td><c:out value="${post.board_id}" /></td>
									<td><c:out value="${post.board_writer}" /></td>
									<td><a class="move"	href='/post/view?board_id=<c:out value="${post.board_id}"/>'>
											<c:out value="${post.board_title}" />
									</a></td>
									<td><fmt:formatDate pattern="yyyy-MM-dd"
											value="${post.board_created_date}" /></td>
									<td><fmt:formatDate pattern="yyyy-MM-dd"
											value="${post.board_modified_date}" /></td>
								</tr>
							</c:forEach>
						</table>
						<div class="pageInfo_wrap">
							<div class="pageInfo_area">
						    <ul id="pageInfo_1" class="pageInfo_1">
						        <!-- 이전페이지 버튼 -->
						        <c:if test="${pageMake.prev}">
						            <li class="pageInfo_btn previous"><a href="/post/list?pageNum=${pageMake.startPage-1}&amount=10">Previous</a></li>
						        </c:if>
						        
						        <!-- 각 번호 페이지 버튼 -->
						        <c:forEach var="num" begin="${pageMake.startPage}" end="${pageMake.endPage}">
						            <li class="pageInfo_btn ${pageMake.cri.pageNum == num ? 'active':''}">
						                <a href="/post/list?pageNum=${num}&amount=10">${num}</a>
						            </li>
						        </c:forEach>
						
						        <!-- 다음페이지 버튼 -->
						        <c:if test="${pageMake.next}">
						            <li class="pageInfo_btn next"><a href="/post/list?pageNum=${pageMake.endPage+1}&amount=10">Next</a></li>
						        </c:if>
						    </ul>
						</div>

						</div>
						<input type="hidden" name="pageNum" value="${pageMake.cri.pageNum }"> 
						<input type="hidden" name="amount" value="${pageMake.cri.amount }">
						<p class="btn_set tr">
							<a href="/post/write" class="btns btn_st3 btn_mid">글쓰기</a>
						</p>
					</section>
				</div>
				<!-- .content -->
			</div>
		</div>
	</div>
	<!-- Bootstrap core JS-->
	<script
		src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
	<script>
	$(".pageInfo_1 a").on("click", function(e){
		e.preventDefault();
		moveForm.find("input[name='pageNum']").val($(this).attr("href"));
		moveForm.attr("action", "/board/list");
		moveForm.submit();
		
	});
	</script>
</body>
</html>

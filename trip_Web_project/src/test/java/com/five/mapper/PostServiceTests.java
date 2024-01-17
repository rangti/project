package com.five.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.five.model.Criteria;
import com.five.model.PostVO;
import com.five.service.PostService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class PostServiceTests {

	@Autowired
	PostService postService;

	//@Test
	public void save() throws Exception {
		try {
			PostVO params = new PostVO();
			params.setBoard_title("1번 게시글 제목");
			params.setBoard_content("1번 게시글 내용");
			params.setBoard_writer("테스터");
			Long id = postService.savePost(params);
			System.out.println("생성된 게시글 ID : " + id);
		} catch (Exception e) {
			throw new Exception("테스트에서 예외 발생: " + e.getMessage());
		}
	}
	@Test
	public void test() {
		Criteria cri = new Criteria();
		        
		        List list = postService.findAllPageing(cri);
		        
		        list.forEach(board -> System.out.println(""+board));
	}

}

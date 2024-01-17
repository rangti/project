package com.five.mapper;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.five.model.Criteria;
import com.five.model.PostVO;

import lombok.Data;

import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
@Data
public class PostMapperTests {

    @Autowired
    private PostMapper postMapper;

//    @Test
    public void save() {
        // Given
        PostVO vo = new PostVO();
        vo.setBoard_title("1번 게시글 제목");
        vo.setBoard_content("1번 게시글 내용");
        vo.setBoard_writer("랑이");

        // When
        postMapper.save(vo);
        List<PostVO> posts = postMapper.findAll();
        System.out.println("전체 게시글 개수는 : " + posts.size() + "개입니다.");
    }
//    @Test
    public void findById() {
        System.out.println(""+postMapper.findById(5l));
    }
//    @Test
    public void update() {
        // 1. 게시글 수정
    	PostVO vo = new PostVO();
    	vo.setBoard_id(1l);
    	vo.setBoard_title("2번 게시글 제목 수정합니다.");
    	vo.setBoard_content("2번 게시글 내용 수정합니다.");
    	vo.setBoard_writer("랑ㅇ");
        postMapper.update(vo);

        // 2. 게시글 상세정보 조회
        PostVO vo1 = postMapper.findById(4L);
        System.out.println(vo1.getBoard_writer());
    }
   // @Test
    public void delete() {
        System.out.println("삭제 이전의 전체 게시글 개수는 : " + postMapper.findAll().size() + "개입니다.");
        postMapper.deleteById(1l);
        System.out.println("삭제 이후의 전체 게시글 개수는 : " + postMapper.findAll().size() + "개입니다.");
    }
//    @Test
    public void findAll() {
    	List list = postMapper.findAll();
    	list.forEach(posts -> System.out.println(""+posts));
    }
    @Test
    public void testPaging() {
        Criteria cri = new Criteria();
        cri.setPageNum(1);
        List<PostVO> list = postMapper.findAllPageing(cri);
        list.forEach(board -> System.out.println(board));
        }

     
}

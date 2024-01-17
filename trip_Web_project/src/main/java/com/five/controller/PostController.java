package com.five.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.five.model.Criteria;
import com.five.model.PageMakerDTO;
import com.five.model.PostVO;
import com.five.service.PostService;

@Controller
@RequestMapping(value = "/post")
public class PostController {

	@Autowired
	private PostService postService;

	@GetMapping("write")
	public String openPostWrite(Long id, Model model) {
		if (id != null) {
			PostVO post = postService.findPostById(id);
			model.addAttribute("post", post);
		}
		return "/post/write";
	}

	// 게시판 새글 작성
	@PostMapping("save")
	public String savePost(PostVO vo) {
		postService.savePost(vo);
//		System.out.println("save 정상적으로 실행");
		return "redirect:/post/list";
	}

	// 게시판 리스트목록출력
	@GetMapping("list")
	public void openPostList(Model model, Criteria cri) {
		List<PostVO> posts = postService.findAllPageing(cri);
		model.addAttribute("posts", posts);
//		System.out.println(posts);
		int total = postService.getTotal();
		PageMakerDTO pageMake = new PageMakerDTO(cri, total);
		model.addAttribute("pageMake", pageMake);
//		System.out.println(pageMake);

	}

	// 게시판 상세페이지 이동
	@GetMapping("view")
	public String findPostById(Long board_id, Model model) {
		PostVO pageInfo = postService.findPostById(board_id);
		model.addAttribute("pageInfo", pageInfo);
		return "/post/view";
	}

	@GetMapping("update")
	public String updatePostGET(Long board_id, Model model) {
		PostVO pageInfo = postService.findPostById(board_id);
		model.addAttribute("pageInfo", pageInfo);
		return "/post/update";
	}

	@PostMapping("update")
	public String updatePost(PostVO vo) {
		postService.updatePost(vo);
		return "redirect:/post/list";

	}

	@PostMapping("delete")
	public String deleteById(Long board_id) {
		postService.deletePost(board_id);

		return "redirect:/post/list";
	}

}

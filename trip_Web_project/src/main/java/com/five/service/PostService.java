package com.five.service;

import java.util.List;

import com.five.model.Criteria;
import com.five.model.PostVO;

public interface PostService {
	
	public Long savePost(PostVO vo);
	
	public Long updatePost(PostVO vo) ;
	
	public Long deletePost(Long id);
	
	public List<PostVO> findAllPost();
	
	public PostVO findPostById(Long id);
	
	public List<PostVO> findAllPageing(Criteria cri);
	
    public int getTotal();

}

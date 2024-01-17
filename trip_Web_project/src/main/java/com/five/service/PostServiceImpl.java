package com.five.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.five.mapper.PostMapper;
import com.five.model.Criteria;
import com.five.model.PostVO;

@Service
public class PostServiceImpl implements PostService{
	@Autowired
	PostMapper postMapper;

	@Override
	public Long savePost(PostVO vo) {
		postMapper.save(vo);
		return vo.getBoard_id();
	}

	

	@Override
	public Long updatePost(PostVO vo){
		postMapper.update(vo);
		return vo.getBoard_id();
	}

	@Override
	public Long deletePost(Long id) {
		postMapper.deleteById(id);
		return id;
	}

	@Override
	public List<PostVO> findAllPost(){
		return postMapper.findAll();
	}
	
	@Override
	public PostVO findPostById(Long id) {
		return postMapper.findById(id);
	}

	@Override
	public List<PostVO> findAllPageing(Criteria cri) {

		return postMapper.findAllPageing(cri);
	}
	 @Override
	    public int getTotal() {
	        
	        return postMapper.getTotal();
	    }    

}

package com.five.mapper;

import java.util.List;

import com.five.model.Criteria;
import com.five.model.PostVO;

public interface PostMapper {
	
	public void save(PostVO vo);
	
	PostVO findById(Long id);
	
	public int update(PostVO vo);
	
	public void deleteById(Long id);
	
	List<PostVO> findAll();
	
	List<PostVO> findAllPageing(Criteria cri);
	
	public int count();
	
    public int getTotal();
}

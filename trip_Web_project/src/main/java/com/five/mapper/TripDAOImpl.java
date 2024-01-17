package com.five.mapper;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.five.model.TripVO;

@Repository
public class TripDAOImpl implements TripMapper {
    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public List<TripVO> getAllTrips() {
        return sqlSessionTemplate.selectList("com.five.mapper.TripMapper.getAllTrips");
    }

	@Override
	public List<TripVO> getFindTrips() {
		return sqlSessionTemplate.selectList("com.five.mapper.TripMapper.getFindTrips");
	}

	@Override
	public TripVO Findbydetail(String contentId) {
	    return sqlSessionTemplate.selectOne("com.five.mapper.TripMapper.Findbydetail", contentId);
	}

}
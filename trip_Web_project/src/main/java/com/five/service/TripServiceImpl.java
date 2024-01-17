package com.five.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.five.mapper.TripMapper;
import com.five.model.TripVO;

@Service
public class TripServiceImpl implements TripService{
	@Autowired
	TripMapper tripMapper;

	@Override
	public List<TripVO> getAllTrips() {
		
		return tripMapper.getAllTrips();
	}

	@Override
	public List<TripVO> getFindTrips() {
		
		return tripMapper.getFindTrips();
	}

	@Override
	public TripVO Findbydetail(String contentId) {
		
		return tripMapper.Findbydetail(contentId);
	}

}

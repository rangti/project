package com.five.mapper;

import java.util.List;

import com.five.model.TripVO;

public interface TripMapper {
	List<TripVO> getAllTrips();
	
	List<TripVO> getFindTrips();
	
	TripVO Findbydetail(String contentId);
	}

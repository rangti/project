package com.five.service;

import java.util.List;

import com.five.mapper.TripMapper;
import com.five.model.TripVO;

public interface TripService {
    
    public List<TripVO> getAllTrips();
    
    public List<TripVO> getFindTrips();
    
    public TripVO Findbydetail(String contentId);

}

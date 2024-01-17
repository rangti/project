package com.five.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.five.model.TripVO;
import com.five.service.TripService;

@Controller
@RequestMapping("/trip")
public class TripController {
	
	@Autowired
	TripService tripService;
	
	@GetMapping("/main")
	public String mainPage(Model model) {
	    List<TripVO> allTrips = tripService.getAllTrips();

	    // 데이터가 6개 미만인 경우, 전체 데이터를 전송
	    if (allTrips.size() <= 6) {
	        model.addAttribute("trips", allTrips);
	    } else {
	        // 데이터가 6개 이상인 경우, 랜덤으로 6개만 선택하여 전송
	        List<TripVO> randomTrips = new ArrayList<>();
	        Random random = new Random();
	        Set<Integer> selectedIndexes = new HashSet<>();

	        while (selectedIndexes.size() < 6) {
	            int randomIndex = random.nextInt(allTrips.size());
	            if (!selectedIndexes.contains(randomIndex)) {
	                selectedIndexes.add(randomIndex);
//	                System.out.println(selectedIndexes);
	                randomTrips.add(allTrips.get(randomIndex));
	            }
	        }

	        model.addAttribute("trips", randomTrips);
	    }

	    return "/trip/main";
	}

	
	@GetMapping("trips")
	public String getAllTrips(Model model) {
		List<TripVO> trips = tripService.getAllTrips();
		model.addAttribute("trips",trips);
//		System.out.println(trips);
		return "/trip/displayTrips";
	}
	@GetMapping("detail")
	public String getFindTrips(String trip_contentId,Model model) {
		TripVO detail = tripService.Findbydetail(trip_contentId);
		model.addAttribute("details",detail);
//		System.out.println(detail);
		return "/trip/displaydetail";
	}
	

}

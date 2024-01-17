package com.five.mapper;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class TripMapperTests {
	
	@Autowired
	TripMapper tripMapper;
	
	@Test
    public void findById() {
        System.out.println(""+tripMapper.Findbydetail("814237"));
    }
        
//    @Test
    public void getFindTrips() {
    	List list = tripMapper.getFindTrips();
    	list.forEach(detail -> System.out.println(""+detail));
    }

}


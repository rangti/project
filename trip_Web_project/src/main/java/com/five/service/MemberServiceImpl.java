package com.five.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.five.mapper.MemberMapper;
import com.five.model.MemberVO;

@Service
public class MemberServiceImpl implements MemberService { // MemberService 인터페이스에서 상속받음
	@Autowired
	MemberMapper membermapper;

	@Override
	public void memberJoin(MemberVO member) throws Exception {

		membermapper.memberJoin(member);
	}

	@Override
	public int idCheck(String memberId) throws Exception {
		
		return membermapper.idCheck(memberId);
	}

	@Override
	public MemberVO memberLogin(MemberVO member) throws Exception {
		
		return membermapper.memberLogin(member);
	}

}

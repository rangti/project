package com.five.controller;

import java.util.Random;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.five.model.MemberVO;
import com.five.service.MemberService;

import oracle.jdbc.proxy.annotation.Post;

@Controller
@RequestMapping(value = "/member")
public class MemberController {
	
	@Autowired
	private MemberService memberservice;
	
	@Autowired
	private JavaMailSender mailSender;
	
	
	//회원가입 페이지 이동
	@GetMapping("join")
	public void joinGET() {
		
//		System.out.println("회원가입 페이지 진입");
				
	}
	
	//로그인 페이지 이동
	@GetMapping("login")
	public void loginGET() {
		
//		System.out.println("로그인 페이지 진입");
		
	}
	
	//회원가입
	@PostMapping("join")
	public String joinPOST(MemberVO member) throws Exception{
		
		memberservice.memberJoin(member);
		
		return "redirect:/trip/main"; //반환형식을 String으로 하여 회원가입을 실행하고 메인페이지로 이동
		
	}
	// 아이디 중복 검사
	@PostMapping("memberIdChk")
	@ResponseBody
	public String memberIdChkPOST(String memberId) throws Exception{
		
		int result = memberservice.idCheck(memberId);
				
//				System.out.println("결과값 = " + result);
				
				if(result != 0) {
					
					return "fail";	// 중복 아이디가 존재
					
				} else {
					
					return "success";	// 중복 아이디 x
					
				}
	
		
	} // memberIdChkPOST() 종료
	
	/* 이메일 인증 */
    @GetMapping("mailCheck")
    @ResponseBody
    public String mailCheckGET(String email) throws Exception{
        
        /* 뷰(View)로부터 넘어온 데이터 확인 */
        System.out.println("이메일 데이터 전송 확인");
        System.out.println("인증번호 : " + email);
        
        /* 인증번호(난수) 생성 */
        Random random = new Random();
        int checkNum = random.nextInt(888888) + 111111;
        System.out.println("인증번호 " + checkNum);
        
        /* 이메일 보내기 */
        String setFrom = "ha_ru_1@naver.com";
        String toMail = email;
        String title = "회원가입 인증 이메일 입니다.";
        String content = 
                "홈페이지를 방문해주셔서 감사합니다." +
                "<br><br>" + 
                "인증 번호는 " + checkNum + "입니다." + 
                "<br>" + 
                "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
        try {
            
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom(setFrom);
            helper.setTo(toMail);
            helper.setSubject(title);
            helper.setText(content,true);
            mailSender.send(message);
            
        }catch(Exception e) {
            e.printStackTrace();
        }
        
        String num = Integer.toString(checkNum);
        
        return num;
                
        
    }
    
    /* 로그인 */
    @PostMapping("login")
    public String loginPOST(HttpServletRequest request, MemberVO member, RedirectAttributes rttr) throws Exception{
        
//        System.out.println("login 메서드 진입");
//        System.out.println("전달된 데이터 : " + member);
    	HttpSession session = request.getSession();
    	MemberVO lvo = memberservice.memberLogin(member);
    	
    	if(lvo == null) {                                // 일치하지 않는 아이디, 비밀번호 입력 경우
            
            int result = 0;
            rttr.addFlashAttribute("result", result);
            return "redirect:/member/login";
            
        }
        
        session.setAttribute("member", lvo);             // 일치하는 아이디, 비밀번호 경우 (로그인 성공)
        
        return "redirect:/trip/main";
        
    }
    
    /* 메인페이지 로그아웃 */
    @GetMapping("logout")
    public String logoutMainGET(HttpServletRequest request) throws Exception{
    	
    	HttpSession session = request.getSession();
    	
    	session.invalidate();
    	
    	return "redirect:/trip/main";
        
    }
	
}
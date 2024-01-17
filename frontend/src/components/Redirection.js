import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Redirection = () => {
  const [userData, setUserData] = useState({});

  const code = new URL(window.location.href).searchParams.get("code"); // 인가코드 추출
  console.log(code);
  const REACT_APP_URL = "http://localhost:3000/";

  useEffect(() => {
    console.log(REACT_APP_URL);
    fetch(`${REACT_APP_URL}kakao/callback/${code}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: code })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === '로그인 성공') {
          localStorage.setItem('userId',data.snsNickName);
          alert(data.message)
          window.location.href = 'http://localhost:3000/main'; // 로그인 성공 시 리다이렉트
        } else {
          alert('회원가입 성공');
          window.location.href = 'http://localhost:3000/login';
        }
      })
      .catch(error => {
        console.error('오류 발생:', error);
        alert('이미 사용 중인 닉네임입니다.'); // 에러 발생 시 알림
        window.location.href = 'http://localhost:3000/login'; // 리다이렉트
      });
  }, [code]);

  return <Spinner/>;
};

export default Redirection;

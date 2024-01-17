import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const Redirection2 = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // 서버로 'code'를 전송합니다.
      fetch('http://localhost:5000/google/callback', {  // 서버 주소를 적절히 변경하세요.
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code }) // 'code'를 JSON 형식으로 전송합니다.
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // 여기서 반환된 데이터를 확인하고 작업을 수행합니다.
        console.log('받은 데이터:', data);
        // 예시: 특정 조건에 따라 다른 동작을 수행하도록 추가 로직을 작성할 수 있습니다.
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
    }
  }, []);

  return <Spinner/>;
};

export default Redirection2;

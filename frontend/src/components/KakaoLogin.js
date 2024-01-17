import React, { useState, useEffect } from 'react';

function KakaoLogin() {
  const REST_API_KEY = 'c2939714c142db58382b1c1e02bd9efe';
  const REDIRECT_URI = 'http://localhost:3000/kakao/callback';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <img src='../kakao.png' onClick={loginHandler} style={{width:30}}>
    </img>
  );
  
}

export default KakaoLogin;
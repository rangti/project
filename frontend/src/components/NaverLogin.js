import React, { useState, useEffect } from 'react';

function NaverLogin() {
  const REST_API_KEY = 'T_LsuaICNEnJMPuWT2fW';
  const REDIRECT_URI = 'http://localhost:3000/naver/callback';
  const STATE = 'false'
  const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REST_API_KEY}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <img src='../naver.png' onClick={loginHandler} style={{width:30}}>
    </img>
  );
  
}

export default NaverLogin;
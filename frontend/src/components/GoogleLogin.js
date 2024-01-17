import React, { useState, useEffect } from 'react';

function GoogleLogin() {
    const REST_API_KEY = '195627799059-r8mnagk7o9d5tudve0qjjntd1a6s44sd.apps.googleusercontent.com';
    const REDIRECT_URI = 'http://localhost:3000/google/callback';
    const link = `https://accounts.google.com/o/oauth2/auth?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;
    

const loginHandler = () => {
    window.location.href = link;
};

return (
    <img src='../google.png' onClick={loginHandler} style={{width:42}}>
    </img>
);

}

export default GoogleLogin;
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { cloneUniformsGroups } from 'three';

const FaceRecognition = () => {
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();


  const recognition = async () => {
    console.log('얼굴인식버튼이 눌렸어요')
    const response = await fetch('http://localhost:5000/facelogin');
    
    try {
      setLoading(true);
      const result = await response.json();
            
      // console.log(result.user_id);
      setShowImage(true);
      setUserId(result.userId)
      console.log(result)
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('token', result.token);
      console.log("token:",result.token,"userId",result.userId)
      navigate('/main')
    } catch (error) {
      console.error('웹캠불러오기 에러', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    // <div style={{
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   height: '50vh',
    //   marginBottom: '280px',
    // }}>
      // {loading && !showImage && <div className="spinner" style={{ marginBottom: '20px' }} />} {/* 로딩 스피너 표시 */}

      // {showImage && (<div style={{ marginTop: showImage ? '270px' : '0' }}>
      // </div>
      // )}
      <button onClick={recognition} variant="dark"
        style={{
          borderRadius: 30,
          width: 200,
          color: '#FFA700',
          opacity: '87%',
          boxShadow: 'inset 0px 1px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)'
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginTop: 5 }} width="30" height="30" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 20 20">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
        </svg> <p5>얼굴인식 로그인</p5>
      </button>
      // {/* <p>로그인한 사용자 ID: {userId}</p> */}
    // </div>

  );
}

export default FaceRecognition
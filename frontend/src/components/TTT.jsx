import {React, useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import NaverLogin from "./NaverLogin";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import './Test.css'
import FaceRecognition from "./FaceRecognition";


<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"></link>




const T = ({handleLogin}) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        userId: '',
        userName: '',
        userPw: '',
        re_userPw: '',
        userMail: '',
        userAddr1: '',
        userAddr2: '',
        userAddr3: '',
        userImage: null
    });

    useEffect(() => {
        const signUpBtn = document.getElementById("signUpButton");
        const signInBtn = document.getElementById("signInButton");
        const container = document.querySelector(".container");
    
        if (signUpBtn && signInBtn && container) {//signUpBtn , signInBtn,container
            // console.log('signUpBtn',signUpBtn)
            signUpBtn.addEventListener("click", () => {//3개의 요소를다 찾으면 그때 이벤트 등록 
                console.log('이벤트 발생 1) ')
              container.classList.add("right-panel-active");
            });
            signInBtn.addEventListener("click", () => {
              container.classList.remove("right-panel-active");
              console.log('이벤트 발생 2) ')
            });
          }
        }, []);
  
    //다음 주소찾기 부분
    const [popup,setPopup] = useState(false);
    const handleComplete = (data) => {
        let addr = '';
        let extraAddr = '';
    
        if (data.userSelectedType === 'R') {
          addr = data.roadAddress || '';
        } else {
          addr = data.jibunAddress || '';
        }
    
        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }
          addr += extraAddr;
        }   
        setFormData({
          ...formData,
          userAddr1: data.zonecode || '',
          userAddr2: addr || '',
          userAddr3: '' // 상세 주소는 여기에 추가
        });
        handleClose()
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.userId || !formData.userPw) {
        alert('아이디와 비밀번호를 입력해주세요.');
        return;
        }
        try {
        const response = await fetch('http://127.0.0.1:5000/signin', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        console.log(data);
        alert(data.message);

        const handleLogin = (userData, flag) => {
            setUserData(userData);
            
            const { token, userId } = userData;
            
            if (flag) {
              localStorage.setItem('token', token);
              localStorage.setItem('userId', userId);
            } else {
              localStorage.removeItem('token');
              localStorage.removeItem('userId');
            }
            navigate('/main');
          };
        
        // 로그인 성공 시 토큰을 받음
        const token = data.token; // 받아온 토큰
        const userId = formData.userId;

        // userId가 비어 있지 않은 경우에만 로그인 처리
        if (userId) {
        // 토큰을 세션 스토리지에 저장
            sessionStorage.setItem('token', token);

        // 토큰과 로그인 여부를 전달하여 handleLogin 함수 호출
            handleLogin({ token, userId }, true);
        }} catch (error) {
            console.error('에러', error);
            alert('아이디와 비밀번호를 확인해주세요.');
        }
    }; 
    
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData(); // FormData 생성
        for (const key in formData) {
          if (key === 'userImage' && !formData[key]) {
            continue; // 이미지가 선택되지 않았으면 formDataToSend에 추가하지 않음
          }
          formDataToSend.append(key, formData[key]); // FormData에 필드 추가
        }
        try {
          const response = await fetch('http://127.0.0.1:5000/signup', {
            method: 'POST',
            body: formDataToSend,
          });
    
          const data = await response.json();
          if (!response.ok) {
            // 서버로부터 오류 응답을 받은 경우
            if (data && data.message) {
              alert(data.message);
            } else {
              alert('서버 오류가 발생했습니다.');
            }
            return;
          }
          console.log('Signup successful:', data);
          alert(data.message)
          window.location.reload();
          // 회원가입 성공 후 리다이렉트 등 추가 작업 수행
        } catch (error) {
          console.error('Error signing up:', error);
          alert('네트워크 오류가 발생했습니다.');
        }
      };

      const recognition = async (e) => {
        e.preventDefault();
        console.log('얼굴인식버튼이 눌렸어요');
        
        try {
          setLoading(true);
          const response = await fetch('http://localhost:5000/facelogin');
          const result = await response.json();
            
          if (result.token && result.userId) {
            setShowImage(true);
            setUserId(result.userId);
            
            console.log(result);
        
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('token', result.token);
            console.log("token:", result.token, "userId", result.userId);
            
            navigate('/main')
          } else {
            alert(result.message);
          }
        } catch (error) {
          console.error('웹캠불러오기 에러', error);
        } finally {
          setLoading(false);
        }
      };

      const handleCheckboxChange = (e) => {
        setCheckboxChecked(e.target.checked);
        setPopup(e.target.checked); 
        setShowPhotoModal(e.target.checked); 
      };
  
      const handleImageChange = (e) => {
        const file = e.target.files[0]; // 선택된 파일
        if (file) {
          setFormData({
            ...formData,
            userImage: file,
          });
          setSelectedFile(file); // 선택된 파일을 상태에 저장
        } else {
          setFormData({
            ...formData,
            userImage: null, // 이미지를 선택하지 않았을 때 null 값으로 저장
          });
          setSelectedFile(null); // 선택된 파일 상태를 null로 설정
        }
      };
      
  
      const handleClosePhotoModal = () => {
        setShowPhotoModal(false);
        setCheckboxChecked(true); 
      };
  
  
  
    return (
    <div className="wrapper" >
      <div className="container" style={{
        borderRadius : '10px',
        boxShadow: '-5px -5px 10px #fff, 5px 5px 10px #babebc',
        position: 'absolute',
        width: '950px',
        minHeight: '850px',
        overflow: 'hidden'
      }}>
        <div className="sign-up-container">
          <form onSubmit={handleSubmit2} >
            <h3>회원가입</h3>
            <div className="social-links" style={{marginTop:28}}>
              <GoogleLogin /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <NaverLogin /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <KakaoLogin /> &nbsp;&nbsp;
            </div><br/>
            <div style={{marginTop:-20}}>
            <input type="text" 
                className="userName_input" 
                placeholder="   이름" 
                name="userName"
                value={formData.userName}
                onChange={handleChange} />
            <input type="text"
                className="userId_input" 
                placeholder="   아이디" 
                name="userId"
                id="userId"
                value={formData.userId} 
                onChange={handleChange}/>
            <Row>
              <Col >
              <input type="password"
                className="userPw_input"
                id="userPw" 
                placeholder="  비밀번호" 
                name="userPw"
                style={{marginLeft:100,fontSize:12}}
                value={formData.userPw}
                onChange={handleChange}/>
              </Col>
              <Col >
                <input type="password"
                  className="re_userPw_input"
                  id="re_userPw"
                  placeholder="비밀번호 확인"
                  name="re_userPw"
                  style={{marginLeft:-95,fontSize:12}}
                  value={formData.re_userPw}
                  onChange={handleChange} />
              </Col>
            </Row>
            <input type="text"
                className="userMail_input"
                id="userMail"
                placeholder="   이메일"
                name="userMail"
                value={formData.userMail}
                onChange={handleChange} />
            <div className="signupAddr1">
                <span>
                    <input className="userAddr1_input"
                        placeholder="    우편번호"
                        value={formData.userAddr1}
                        readOnly 
                        style={{ alignContent:'', width:210, marginLeft:-30, marginTop:7 }}></input></span>
                <span>
                  <div style={{ alignContent:'center', marginTop:-43, marginLeft:210 }}>
                      <i className="bi bi-search" name="addressSearch" onClick={handleShow}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                          </svg>
                      </i>
                  </div>
                  
                      <Modal show={showModal} onHide={handleClose}>
                        <Modal.Body>
                            <DaumPostcode autoClose onComplete={handleComplete} />
                        </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              닫기
                            </Button>
                          </Modal.Footer>
                      </Modal>
                </span>
            </div>
            <div className="signupAddr2">
            <input className="userAddr2_input"
                placeholder="   주소"
                value={formData.userAddr2}
                readOnly
                style={{ marginTop:25}} />
            <input className="userAddr3_input"
              placeholder="   상세 주소"
              value={formData.userAddr3}
              style={{ marginTop:5}}
              onChange={(e) => setFormData({ ...formData, userAddr3: e.target.value })}
            /></div>
            </div>
            <div key={`default-checkbox`} className="mb-3" style={{marginTop:10}}>
              <Form.Check 
                  id={`checkbox`} 
                  style={{marginLeft:-200}}  
                  onChange={handleCheckboxChange}
                  checked={checkboxChecked}
                />
                <p style={{marginTop:-37,marginLeft:35,fontSize:15}}>얼굴 인식 로그인 사용</p>
                {popup && (
                  <Modal show={showPhotoModal} onHide={handleClosePhotoModal}>
                    <Modal.Title><p2 style={{marginLeft:15}}>사진 등록</p2></Modal.Title>
                    <Modal.Body>
                      <input type="file" onChange={handleImageChange} /> {/* 파일 선택  input */}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClosePhotoModal}>저장</Button>
                    </Modal.Footer>
                  </Modal>
                )} 
            </div>
              {selectedFile && (
                <div>
                  <p>선택된 파일: {selectedFile.name}</p> {/* 선택된 파일 정보 표시 */}
                </div>
              )}
            <button type="submit" className="form_btn" style={{marginTop:-5}}>Sign Up</button>
            </form>
        </div>

        <div className="sign-in-container">
          <form onSubmit={handleSubmit}>
            <h3>로그인</h3><br/>
            <div className="social-links">
              <GoogleLogin /> &nbsp;&nbsp;&nbsp;&nbsp;
              <NaverLogin /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <KakaoLogin /> &nbsp;
              <Button onClick={recognition} variant="dark"
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
              </Button>
            </div>
            <br/>
            <input 
                type="text" 
                name="userId" 
                placeholder="   ID" 
                style={{width:220}}
                value={formData.userId}
                onChange={handleChange}/>
            <input 
                type="password" 
                name="userPw"
                placeholder="   Password"
                style={{width:220}}
                value={formData.userPw}
                onChange={handleChange}
                />
            <br/>
            <button type="submit" className="form_btn" onClick={handleLogin}>Sign In</button>
          </form>
        </div>
          

        <div className="overlay-container">
          <div className="overlay-left">
            <h3>로그인</h3><br/><br/>
            <button id="signInButton" className="overlay_btn">Sign In</button>
          </div>
          <div className="overlay-right">
            <h3>회원가입</h3><br/><br/>
 
            <button id="signUpButton" className="overlay_btn">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default T
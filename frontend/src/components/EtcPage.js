import React, { useState, useEffect, Component } from 'react';
import { Nav, NavDropdown, Navbar, Container, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Modal,Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import WeatherComponent from './Weather';



function EtcPage() {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')


  function getLocation() {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
        console.log(position.coords.latitude + ' ' + position.coords.longitude);
    
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  } getLocation();


    useEffect(() => {
    // 로컬 스토리지에서 사용자 정보를 가져옴
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
    }
    }, []);

    const handleLogin = (userData,flag) => {
        setUserData(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        handleClose(flag);
        navigate('/main'); // 리다이렉트
    };
    
    const handleLogout = () => {
    localStorage.removeItem('userData');
    alert("로그아웃 되었습니다.")
    setUserData(null); // 사용자 정보 초기화 (로그아웃 상태로 변경 등)
    };

    const [key, setKey] = useState('');
    const selectMenuHandler = (type) => {
      console.log(type);
      setKey(type);
    }

    const navbarStyle = {
      backgroundColor: '#010A30'
  };

  return (
    <>
      <Navbar style={navbarStyle}>
        <Container >
        <Navbar.Brand >
            <Nav variant="underline" >
                <Nav.Item>
                    <Nav.Link href="/main">
                        <img
                        alt=""
                        src="../logo.png"
                        width="110"
                        height="95"
                        className="d-inline-block align-top"
                        href="/main"
                        />
                    </Nav.Link >
                </Nav.Item>
                {' '} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    
                    <Nav.Item style={{ marginTop: '6vh', marginLeft: '40vh' }}>
                        <Nav.Link href="/mapdata">예보</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginTop: '6vh', marginLeft: '2vh' }}>
                        <Nav.Link href="/download">통계</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginTop: '6vh', marginLeft: '2vh' }}>
                        <Nav.Link href="/news">뉴스</Nav.Link>
                    </Nav.Item >
                    <Nav.Item style={{ marginTop: '6vh', marginLeft: '2vh' }}>
                        <Nav.Link href="/livedata">정보</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{ marginTop: '6vh', marginLeft: '2vh' }}>
                        <Nav.Link href="/data">알림</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{color:'#ffffff'}}>
                    {userData ? (
                        <NavDropdown title={userData.userId} className="text-white" style={{color: 'white' , marginTop: '6vh', marginLeft: '2vh',hover:'none'}}>
                            <NavDropdown.Item eventKey="4.1" style={{ textDecoration: 'none' }} onClick={handleLogout}>로그아웃</NavDropdown.Item>
                            </NavDropdown>
                            ) : (
                                <NavDropdown title="로그인" style={{marginTop: '6vh', marginLeft: '2vh' }}>
                                <NavDropdown.Item>
                                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>로그인</Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.3"style={{ textDecoration: 'none' }}>
                                    <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>회원가입</Link>
                                </NavDropdown.Item>
                        </NavDropdown>)}
                    </Nav.Item>
                    <Nav.Item style={{ marginTop: '5vh', marginLeft: '3vh' }}>
                        <WeatherComponent />                 
                    </Nav.Item >
                </Nav>
        </Navbar.Brand>
        </Container>
      </Navbar>
      <br/><br/><br/>
      <div style={{backgroundImage:'../111.jpg'}}></div>
      <Container style={{ width:1000 , alignItems:'center'}}>
        <Card >
          <Card.Header>
            <Tabs id="fill-tab-example" activeKey={key}
              onSelect={(k) => setKey(k)} className="mb-3" >
              <Tab eventKey="info1" title="고농도 미세먼지 7가지 대응요령"></Tab>
              <Tab eventKey="info2" title="고농도 미세먼지 단계별 대응요령"></Tab>
              <Tab eventKey="info3" title="고농도 미세먼지 계층별 대응요령"></Tab>
              <Tab eventKey="info4" title="보이지 않는 위협 미세먼지 안전수칙 영상"></Tab>
              <Tab eventKey="info5" title="미세먼지 대처법 영상"></Tab>
            </Tabs>
          </Card.Header>
          <Card.Body style={{height:1320 }}>
            {key === 'info1' && <img src = "../info1.png" alt='info1' style={{marginTop:10, marginLeft:20}}/>}
            {key === 'info2' && <img src = "../info2.png" alt='info2' style={{marginTop:10, marginLeft:20}}/>}
            {key === 'info3' && <img src = "../info3.png" alt='info3' style={{marginTop:10, marginLeft:20}}/>}
            {key === 'info4' && <video width="700" height="400" controls style={{marginLeft:-20, marginTop:70}}>
              <source src="../dust_.mp4" type="video/mp4"/></video>}
            {key === 'info5' && <video width="700" height="400" controls style={{marginLeft:-20, marginTop:70}}>
              <source src="../dust_2.mp4" type="video/mp4"/></video>}
          </Card.Body>
        </Card>
      </Container>
      <br/><br/>
    </>
  )
}

export default EtcPage;

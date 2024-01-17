import {React, useEffect, useState, StyleSheet } from "react";
import { Nav, NavDropdown, Navbar, DropdownButton, Dropdown, Container, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Modal,Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WeatherComponent from "./Weather";
import ChatbotComponent from "./Chatbot";
import ParticleSystem from './DustGPU';

import './LiveDataButtons.css'



function LiveData() {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [seoul, setSeoul] = useState('')
    const [gu,setGu] =useState('')
    const [apiDustData, setApiDustData] = useState('')
    const [token,setToken] = useState('')
    const [showImage, setShowImage] = useState(false);
    

    function getLocation() {
        if (navigator.geolocation) { // GPS를 지원하면
          navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            // console.log(position.coords.latitude + ' ' + position.coords.longitude);
         
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
    }, [seoul,gu, apiDustData]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
      
        if (storedToken && storedUserId) {
          setToken(storedToken);
          setUserData({ userId: storedUserId, token: storedToken });
        }
      }, []);

    const storedToken = localStorage.getItem('token');
    // console.log(storedToken)

    const storedUserData = localStorage.getItem('userId');
    // console.log(storedUserData)
    
    const handleLogout = () => {
    localStorage.removeItem('userId');
    alert("로그아웃 되었습니다.")
    setUserData(null); // 사용자 정보 초기화 (로그아웃 상태로 변경 등)
    };

    const navbarStyle = {
        backgroundColor: '#010A30'
    };

    const [showParticleSystem, setShowParticleSystem] = useState(false);
  
    const handleButtonClick = () => {
      setShowParticleSystem(!showParticleSystem);
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

    <Container>
        <Row>
            <Col xs={7} style={{marginLeft:20}}>

            { showParticleSystem && <ParticleSystem />}

            </Col>
            <Col xs={3} style={{marginTop:70, marginLeft:20}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="custom-btn btn-6" onClick={handleButtonClick}>
                  <p1 style={{fontSize:15}}>단계별 미세먼지 </p1></div>
                <br/><br/><br/><br/>
                <img src="../icon.png" style={{width:350}} />
            </Col>
        </Row>
    </Container>
    <br/><br/><br/>

    <Card style={{ position:'center', width:1200, marginLeft:350, boxShadow: '0px 0px 2px #fff, 5px 5px 10px #babebc', borderRadius : '10px'}}>
      <Card.Body bg="dark" data-bs-theme="dark" style={{ width:1100, marginLeft:50}}>
        <br/><br/>
        <Card.Title style={{backgroundColor:"#212122"}}><p1>미세먼지(PM-10)란?</p1></Card.Title><br/><br/>
        <strong>미세먼지는 초미세먼지(PM-2.5)와 미세먼지(PM-10)으로 구분된다.</strong><br/><br/>
        <p2>초미세먼지(PM-2.5)는 직경이 2.5㎛이하인 먼지이며, 미세먼지(PM-10)은 직경이 10㎛이하인 먼지이다.</p2><br/>
        <p2>일반적으로 사람 머리카락 두께와 비교할 때 초미세먼지(PM-2.5)는 1/20∼1/30, 미세먼지(PM-10)는 1/6∼1/7일 정도로 매우 작다.</p2><br/>
        <p2>(초)미세먼지는 주로 산업시설, 자동차, 난방 및 에너지 사용 등으로 인해 직접적으로 1차 배출되기도 하고, <br/>
            황산염, 질산염과 같이 대기 중 반응에 의해 2차 생성되기도 한다. <br/>
            주요 구성성분은 이온성분(SO<sub>4</sub><sup>2+</sup>, 
            NO<sub>3</sub><sup>2-</sup>, NH<sub>4</sub><sup>+</sup>), 탄소성분(유기탄소, 원소탄소), 금속화합물 등이다.
        </p2><br/><br/>
        <p2>(초)미세먼지를 흡입했을 때 기도에서 걸러지지 못하고 대부분 폐포까지 침투하여  <br/>
            심장질환과 호흡기질환을 유발하여 조기 사망률을 증가시킨다. <br/>
            또한, 시정을 악화시키고, 식물의 잎 표면에 침적되어 신진대사를 방해하며, 건축물에 퇴적되어 부식을 일으킨다.
        </p2><br/><br/><br/>
        <strong>미세먼지(PM-10)는 대기 중 고체상태의 입자와 액적상태의 입자의 혼합물로 공기역학직경이 10㎛ 이하인 부분을 의미한다. </strong><br/><br/>
        <p2>미세먼지는 주로 산업, 운송, 주거활동 등에 의한 연소나 기타 공정에서 직접 배출되는 <br/>
            1차 먼지와 황산염, 질산염과 같이 대기 중 반응에 의해 생성된 2차 먼지로 구분된다. <br/>
            인위적 발생원에는 산업시설, 자동차 등이 있으며 자연적 발생원으로는 화재, 황사, 화산폭발 등을 들 수 있다.</p2><br/>
        <p2>미세먼지는 천식 등과 같은 호흡기계 질환 및 심혈관계 질환을 일으키고 그에 따른 발병, 입원율 증가를 가져오며 <br/>
            사망률을 높이기도 하며 저체중이나 조기출산 같은 생식이상과도 연관성이 있는 것으로 보고되고 있다. <br/>
            또한 시정을 악화시키고, 식물의 잎 표면에 침적되어 신진대사를 방해하며, 건축물에 퇴적되어 부식을 일으킨다.</p2>
      </Card.Body>

      <Card.Body bg="dark" data-bs-theme="dark" style={{ width:1100, marginLeft:50 }}>
        <br/><br/>
        <Card.Title style={{backgroundColor:"#212122"}}><p1>미세먼지가 위험한 이유</p1></Card.Title><br/><br/>
            <p><strong>미세먼지란 무엇인가요?</strong></p><br/>
			<p2>지름이 10㎛ 이하의 우리눈에 보이지 않을 정도로가늘고 작은 먼지 입자,사람의 폐포까지 깊숙하게 침투해
            <br/>각종호흡기질환의 원인이 될 수 있습니다.
            <br/><br/>
            미세먼지가 문제가 되는 것은 여기에 포함된 각종 중금속과 오염물질 때문입니다. <br/>
            특히 미세먼지는 지름이 10㎛(마이크로미터, 1㎛=1000분의 1㎜)이하로 우리 눈에 보이지 않을 정도 작기 때문에 <br/>
            호흡기 깊은 곳까지 침투해 각종 호흡기 질환, 심장질환, 혈액과 폐의 염증 반응을 불러일으키고, <br/>
            피부 트러블의 원인이 되기도 하고 눈병과 알레르기를 악화시킬 수 있습니다.<br/>
            그 크기가 미세하여 한번 몸에 들어오면 좀처럼 몸에서 빠져나가지 않기 때문에 더욱 주의를 요하는 것입니다.</p2>
      </Card.Body>
      <br/><br/><br/>
    </Card>
    <br/><br/><br/>
    </>
  )
}

export default LiveData

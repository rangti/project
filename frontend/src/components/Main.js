import React, { useEffect, useState } from "react";
import { Nav, NavDropdown, Navbar, Container, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Modal,Button } from 'react-bootstrap';


import Time from './Time';
import KoreaMap from './KoreaMap';
import SeoulMap from './SeoulMap';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import Kakao1 from "./Kakao1";
import WeatherComponent from "./Weather";
import ChatbotComponent from "./Chatbot";
import CardNews from "./CardNews";
import TTT from "./TTT";
import "./Main.css";




function Main() {
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

    console.log(localStorage)
    
    const handleLogout = () => {
    localStorage.removeItem('userId');
    alert("로그아웃 되었습니다.")
    setUserData(null); // 사용자 정보 초기화 (로그아웃 상태로 변경 등)
    };

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
    <br/>
    
    <Container style={{width:1500}}>
        <Row >
        <Col xs={2} style={{marginLeft:-70}}>
            <div>
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src="../a1.jpg" />
                    <Card.Body style={{ marginBottom:-15}}>
                        <Card.Text style={{marginTop:5}}>
                        <Time/>
                        </Card.Text>
                        <Card.Text>
                            <Kakao1 x={latitude} y={longitude} gu={setGu}/>
                        </Card.Text>
                    </Card.Body>
                    {seoul && gu && (<ListGroup className="list-group-flush">
                        <ListGroup.Item>초미세먼지 PM - {seoul[gu][1]} ㎍/㎥</ListGroup.Item>
                        <ListGroup.Item>미세먼지 PM - {seoul[gu][2]} ㎍/㎥</ListGroup.Item>
                        <ListGroup.Item> 
                            {seoul[gu][3] === '좋음' && <div>통합대기 환경지수 <img src="../icon_b.png" style={{width:20, height:20}}/> 좋음</div>}
                            {seoul[gu][3] === '보통' && <div>통합대기 환경지수 <img src="../icon_g.png" style={{width:20, height:20}}/> 보통</div>}
                            {seoul[gu][3] === '나쁨' && <div>통합대기 환경지수 <img src="../icon_y.png" style={{width:20, height:20}}/> 나쁨</div>}
                            {seoul[gu][3] === '매우나쁨' && <div>통합대기 환경지수 <img src="../icon_r.png" style={{width:20, height:20}}/> 매우나쁨</div>}
                        </ListGroup.Item>
                    </ListGroup>)}
                </Card>
                <Card
                    style={{ width: '20rem', marginTop:20}}
                    className="mb-2"
                    >
                    <Card.Header> 예보 개황</Card.Header>
                    <Card.Body>
                        <Card.Text >
                            {apiDustData && (
                                <div>{apiDustData[0].informOverall}</div>
                            )}
                            
                        </Card.Text>
                        <Card.Img src = "../icon.png" />
                    </Card.Body>
                </Card>
            </div>
            <br/><br/>
        </Col>
        <Col xs={6} style={{marginLeft:110, marginRight:20}}>
            <div style={{width:650}}>
                <Tabs
                defaultActiveKey="/koreamap"
                id="justify-tab-example"
                className="mb-3"
                justify
                >
                    <Tab eventKey="/koreamap" title="실시간 대기정보" ><br/><br/><br/><br/><br/>
                        <KoreaMap />
                    </Tab>
                    <Tab eventKey="/seoulmap" title="서울시 실시간 대기정보"><br/><br/><br/><br/><br/>
                        <SeoulMap aa="grade_color_value" f={setSeoul} mainDustData={setApiDustData}/>
                    </Tab>
                </Tabs>
            </div>
        </Col>

        <Col xs={2}>
            <div style={{  width: '25rem', height: '2rem' }}>
                <CardNews />
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <div>
            <Link to="/mapdata">
                <img src="../dust_b.png" alt="dust" />
            </Link>
            </div>
            <div style={{marginTop:30, marginLeft:150}}>
                <ChatbotComponent/> 
            </div>
        </Col>

        </Row>   
    </Container>
    
    <br/><br/>
    </>
  );
}

export default Main;

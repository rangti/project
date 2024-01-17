import React, { useState, useEffect, Component } from 'react';
import { Nav, NavDropdown, Navbar, Container, Spinner, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Modal,Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import Kakao1 from "./Kakao1";
import WeatherComponent from './Weather';
import Logo_ from './Logo_';



function MapData() {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [dustData, setDustData] = useState({});
    console.log(dustData)


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

    // map animation image
    const fetchData = async () => {
        try {
            const response = await fetch('/api/data');
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const jsonData = await response.json();
            setDustData(jsonData);
            // console.log(jsonData.data_from_second_api)
            // console.log(jsonData.sido_pm_mean_data)
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };
        fetchData();
        return () => {
            // Cleanup code here if necessary
        };

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
    <br/>

        <Container style={{width:2500, height:1400, alignItems:'center'}}>
            <Card>
          <Card.Header>
                {dustData.data_from_first_api && (
                    <Tabs id="fill-tab-example" activeKey={key}
                    onSelect={(k) => setKey(k)} className="mb-3" >
                    <Tab eventKey="td10Data" title="오늘 미세먼지 예보"></Tab>
                    <Tab eventKey="tm10Data" title="내일 미세먼지 예보"></Tab>
                    <Tab eventKey="td25Data" title="오늘 초미세먼지 예보"></Tab>
                    <Tab eventKey="tm25Data" title="내일 초미세먼지 예보"></Tab>
                    </Tabs>
                )}
          </Card.Header>
          <Card.Body ><br/>
            {/* 데이터가 없는 경우 */}
            {!dustData.data_from_first_api && (
                <Logo_ />
            )}
            <Row>
                <Col xs={7}>
                    {key === 'td10Data' && <img src={dustData.data_from_first_api[0].imageUrl7} />}
                    {key === 'tm10Data' && <img src={dustData.data_from_first_api[1].imageUrl7} />}
                    {key === 'td25Data' && <img src={dustData.data_from_first_api[2].imageUrl8} />}
                    {key === 'tm25Data' && <img src={dustData.data_from_first_api[3].imageUrl8} />}
                </Col>
                <Col xs={3}>
                <Card style={{ width: '25em', position:'relative', marginTop:70, marginLeft:70 }}>
                    <Card.Header>실시간 시간대별 예측 모델 및 정보</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <p2><strong>통보 시간 : </strong>
                                {key === 'td10Data' && <p2>{dustData.data_from_first_api[0].dataTime}</p2>}
                                {key === 'tm10Data' && <p2>{dustData.data_from_first_api[1].dataTime}</p2>}
                                {key === 'td25Data' && <p2>{dustData.data_from_first_api[2].dataTime}</p2>}
                                {key === 'tm25Data' && <p2>{dustData.data_from_first_api[3].dataTime}</p2>}
                            </p2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p2><strong>예측통보시간 : </strong>
                                {key === 'td10Data' && <p2>{dustData.data_from_first_api[0].informData}</p2>}
                                {key === 'tm10Data' && <p2>{dustData.data_from_first_api[1].informData}</p2>}
                                {key === 'td25Data' && <p2>{dustData.data_from_first_api[2].informData}</p2>}
                                {key === 'tm25Data' && <p2>{dustData.data_from_first_api[3].informData}</p2>}
                            </p2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p2><strong>예보 개황 : </strong>
                                {key === 'td10Data' && <p2>{dustData.data_from_first_api[0].informOverall}</p2>}
                                {key === 'tm10Data' && <p2>{dustData.data_from_first_api[1].informOverall}</p2>}
                                {key === 'td25Data' && <p2>{dustData.data_from_first_api[2].informOverall.replace(/(^.{3}|.{4})/, "$1초")}</p2>}
                                {key === 'tm25Data' && <p2>{dustData.data_from_first_api[3].informOverall.replace(/(^.{3}|.{4})/, "$1초")}</p2>}
                            </p2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p2><strong>발생원인 : </strong>
                                {key === 'td10Data' && <p2>{dustData.data_from_first_api[0].informCause}</p2>}
                                {key === 'tm10Data' && <p2>{dustData.data_from_first_api[1].informCause}</p2>}
                                {key === 'td25Data' && <p2>{dustData.data_from_first_api[2].informCause.replace(/(^.{3}|.{4})/, "$1초")}</p2>}
                                {key === 'tm25Data' && <p2>{dustData.data_from_first_api[3].informCause.replace(/(^.{3}|.{4})/, "$1초")}</p2>}
                            </p2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p2><strong>예보등급 : </strong>
                                {key === 'td10Data' && <p2>{dustData.data_from_first_api[0].informGrade}</p2>}
                                {key === 'tm10Data' && <p2>{dustData.data_from_first_api[1].informGrade}</p2>}
                                {key === 'td25Data' && <p2>{dustData.data_from_first_api[2].informGrade}</p2>}
                                {key === 'tm25Data' && <p2>{dustData.data_from_first_api[3].informGrade}</p2>}
                            </p2>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
            </Row>
          </Card.Body><br/>
          </Card>
        </Container>
        <br/><br/><br/>
    </>
  )
}

export default MapData

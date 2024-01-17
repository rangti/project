import React, { useState, useEffect, Component } from 'react';
import { Nav, NavDropdown, Navbar, Container, Table, Tab, Tabs, ListGroup, Card, Row, Col, icon, Modal,Button } from 'react-bootstrap';
import { CartDashFill, PlayCircleFill } from 'react-bootstrap-icons';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import Kakao1 from "./Kakao1";
import WeatherComponent from './Weather';

import Video from './Video';
import Shorts from './Shorts';
import SearchBar from './SearchBar';
import '../App.css';




function News() {
    const [userData, setUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [newsData, setNewsData] = useState([]);

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
    // Flask API를 호출하는 함수
    async function fetchData() {
      try {
          const response = await fetch('/news'); // Flask API 엔드포인트
          if (!response.ok) {
              throw new Error('Failed to fetch news data');
          }

          const data = await response.json();

          // Parse the JSON string into a JavaScript object
          const parsedData = JSON.parse(data);

          console.log('newsData', parsedData);
          setNewsData(parsedData);
      } catch (error) {
          console.error('Error fetching news data:', error.message);
      }
    } fetchData();
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

      <Container style={{ marginTop:35}}>
      <Row>
        <Col xs={7}>
        <div><br/><br/>
          <div className='eight'>
            <h1>News</h1>
          </div>
          <Table striped bordered hover variant="dark">
          <thead></thead>
          <tbody>
          {Array.isArray(newsData) &&
                newsData.map((news, index) => (
                  <tr key={index}>
                    <td> 
                      <a href={news.url}  style={{ color:"#ffffff", textDecoration: "none"}} target="_blank"  rel="noopener noreferrer">
                      {news.title}</a></td>
                  </tr>
                ))}
          </tbody>
          </Table>
        </div>
        </Col>
        <Col xs ={3} style={{marginTop:30, marginLeft:40}}><br/>
          <Card style={{width:425, height:455}}>
            <Card.Header>실시간 뉴스 속보</Card.Header>
            <div style={{marginLeft:20}}>
              <Video />
            </div>
            <Card.Body>
              <Card.Text>
                <div>
                  <SearchBar />
                </div>  
              </Card.Text>
            </Card.Body>
          </Card>
        <div>
          
        </div>
        </Col>
      </Row>
      </Container>
      <br/><br/>
      <hr role="tournament2"/>
      <br/><br/>

      <Container>
        <Shorts />
      </Container>
      <br/><br/><br/>
    </>
  )

}




export default News ;

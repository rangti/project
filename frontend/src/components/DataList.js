import React, { useState, useEffect ,useRef} from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { Nav, NavDropdown, Navbar, Container, icon, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Button, Modal } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import ResponsiveExample from './ResponsiveExample';
import moment from 'moment';
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import Chart from './Chart';
import WeatherComponent from './Weather';


import reset from "styled-reset";
import styled, {createGlobalStyle} from 'styled-components';



function TestData() {
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [data, setData] = useState([]); // 선택된 데이터 타입의 데이터
  const [selectedType, setSelectedType] = useState('date25'); // 선택된 데이터 타입 (기본값: PM-25)
  const [selectedMonth, setSelectedMonth] = useState(''); // 선택된 월
  const [fetchFlag, setFetchFlag] = useState(false); // 조회 버튼 클릭 여부
  const csvLink = useRef(); // CsvLink 버튼 클릭한 데이터




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
    if (fetchFlag) {
      fetchData(selectedType, selectedMonth);
      setFetchFlag(false);
    }
    
  }, [fetchFlag, selectedType, selectedMonth]);

  const fetchData = async (type, month) => {
    if (type && month) {
      try {
        const response = await fetch(`/download?type=${selectedType}&month=${month}`);
        const jsonData = await response.json();
        const jsonArray = JSON.parse(jsonData);
        setData(jsonArray);
        console.log('데이터:', jsonArray);
        
      } catch (error) {
        console.error('데이터 가져오기 에러:', error);
      }
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleButtonClick = () => {
    setFetchFlag(true);
  };

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

  const f =()=>{
    console.log("여기 호출  ")
    csvLink.current.link.click()
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
    <br/><br/>

    <div >
      <h3>시도별 대기정보 조회</h3><br/>
          <label>
            <input
              type="radio"
              value="dates25"
              checked={selectedType === 'dates25'}
              onChange={handleTypeChange}
            />PM-2.5 초미세먼지
          </label>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              value="dates10"
              checked={selectedType === 'dates10'}
              onChange={handleTypeChange}
            />
            PM-10 미세먼지
          </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select
            name="dates"
            id="dates"
            onChange={handleMonthChange}
            value={selectedType && selectedMonth}
          >
            <option value="">선택</option>
            <option value="2022-10">2022-10</option>
            <option value="2022-11">2022-11</option>
            <option value="2022-12">2022-12</option>
            <option value="2023-01">2023-01</option>
            <option value="2023-02">2023-02</option>
            <option value="2023-03">2023-03</option>
            <option value="2023-04">2023-04</option>
            <option value="2023-05">2023-05</option>
            <option value="2023-06">2023-06</option>
            <option value="2023-07">2023-07</option>
            <option value="2023-08">2023-08</option>
            <option value="2023-09">2023-09</option>
            <option value="2023-10">2023-10</option>
            <option value="2023-11">2023-11</option>
            {selectedType === 'dates10' && <option value="2023-12">2023-12</option>}
          </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <Button variant="primary" onClick={handleButtonClick}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
          <i class="bi bi-search" style={{ color: '#ffffff' }}></i>
          </Button>{' '} &nbsp;&nbsp;&nbsp;&nbsp;
          
          <Button onClick={f}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-filetype-csv" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.517 14.841a1.13 1.13 0 0 0 .401.823c.13.108.289.192.478.252.19.061.411.091.665.091.338 0 .624-.053.859-.158.236-.105.416-.252.539-.44.125-.189.187-.408.187-.656 0-.224-.045-.41-.134-.56a1.001 1.001 0 0 0-.375-.357 2.027 2.027 0 0 0-.566-.21l-.621-.144a.97.97 0 0 1-.404-.176.37.37 0 0 1-.144-.299c0-.156.062-.284.185-.384.125-.101.296-.152.512-.152.143 0 .266.023.37.068a.624.624 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.092 1.092 0 0 0-.2-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.551.05-.776.15-.225.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.122.524.082.149.2.27.352.367.152.095.332.167.539.213l.618.144c.207.049.361.113.463.193a.387.387 0 0 1 .152.326.505.505 0 0 1-.085.29.559.559 0 0 1-.255.193c-.111.047-.249.07-.413.07-.117 0-.223-.013-.32-.04a.838.838 0 0 1-.248-.115.578.578 0 0 1-.255-.384h-.765ZM.806 13.693c0-.248.034-.46.102-.633a.868.868 0 0 1 .302-.399.814.814 0 0 1 .475-.137c.15 0 .283.032.398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.441 1.441 0 0 0-.489-.272 1.838 1.838 0 0 0-.606-.097c-.356 0-.66.074-.911.223-.25.148-.44.359-.572.632-.13.274-.196.6-.196.979v.498c0 .379.064.704.193.976.131.271.322.48.572.626.25.145.554.217.914.217.293 0 .554-.055.785-.164.23-.11.414-.26.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.799.799 0 0 1-.118.363.7.7 0 0 1-.272.25.874.874 0 0 1-.401.087.845.845 0 0 1-.478-.132.833.833 0 0 1-.299-.392 1.699 1.699 0 0 1-.102-.627v-.495Zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879l-1.327 4Z"/>
            </svg>
            <i class="bi bi-filetype-csv"></i>
          <CSVLink
            data={data}
            filename={`CSV 데이터_${selectedType === 'dates10' ? 'PM-10 미세먼지 시도별 대기정보' : 'PM-25 초미세먼지 시도별 대기정보'}_${moment().format('YYYYMMDD')}.csv`}
            ref={csvLink}
            target='_blank'
            //confirm 창에서 '확인'을 눌렀을 때만 csv 파일 다운로드
            onClick = {(data) => {
              console.log("저장 클릭함");
                if (window.confirm('csv 파일을 다운로드')){
                  return true;
                } else {
                  return false;
                }
              }}
            ></CSVLink>
          </Button>
        </div><br/>

        <div style={{ width: 900, height: 500 }}>
          <Chart data={data} />
        </div>
        <br/>

        <div style={{ marginLeft:230, marginRight:230 }}>
            <ResponsiveExample data={data}/>
        </div>


    </>
  );
}

export default TestData;

import React, { useState, useEffect, Component } from 'react';
import { Nav, NavDropdown, Navbar, Container, icon, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Modal,Button } from 'react-bootstrap';
import { PlayCircleFill } from 'react-bootstrap-icons';
import ReactPlayer from 'react-player';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Shorts ({ shortsUrl }) {
    return (
      <>
        <div style={{ marginRight:1250 }}>
          <i className="bi bi-play-circle-fill" ></i>
          <PlayCircleFill style={{  marginRight: '10px', fontSize: '2rem', color:'red'  }} />
          <h2 style={{ display: 'outline-block', marginTop:-35, marginLeft: '55px' }}>
            Shorts  
          </h2>
        </div>
          <br/>
        <div className='player-wrapper' style={{ marginTop:-60, marginLeft:150 }}>
          {/* YouTube에서 받아온 Embed 코드를 직접 사용 */}
          <iframe width="300" height="500" src="https://www.youtube.com/embed/idMBEsxr5C4"
           title="국민소통단 질문에 답해줌(@미세먼지)" frameborder="0" allow="accelerometer; autoplay; 
           clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
           &nbsp; &nbsp; &nbsp; &nbsp;
           <iframe width="300" height="500" src="https://www.youtube.com/embed/dMzq46FhLWM" title="미세먼지를 없애는 가장 현실적인 방법" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
           &nbsp; &nbsp; &nbsp; &nbsp;
           <iframe width="300" height="500" src="https://www.youtube.com/embed/Tny_4-5pai0" title="호흡기에 &#39;독&#39; 미세먼지 배출에 좋은 음식 2탄 #shorts" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
      </>
    );
  };

export default Shorts;
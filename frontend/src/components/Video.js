import React, { useState, useEffect, Component } from 'react';
import { Nav, NavDropdown, Navbar, Container, icon, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Modal,Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";



function Video({ videoUrl }) {
    const handleVideo = () => {
        // 동영상이 끝났을 때 실행할 로직을 작성합니다.
        console.log('동영상이 끝났습니다.');
    };

    return (
        <div style={{ marginTop:-5 }}> 
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={videoUrl}
                    width= '30px'
                    height= '20px'
                    playing={true}
                    muted={true}
                    controls={true}
                    light={false}
                    pip={true}
                    poster='https://video-phinf.pstatic.net/20231218_242/1702867216335wTSdi_JPEG/c497da7d-9d4e-11ee-bb69-a0369ff840a8_03.jpg'
                    onEnded={handleVideo}/>
                {/* Video 컴포넌트를 사용할 때 videoUrl을 지정해야 합니다. */}
                <video controls style={{width:370, height:220}}>
                <source src="https://b01-kr-naver-vod.pstatic.net/fine-particles/c/read/v2/VOD_ALPHA/fine-particles_2023_12_18_0/c59d634d-9d4e-11ee-9f1b-80615f0bce44.mp4?_lsu_sa_=6a356cfd91fa67b6ebdf452f6de512bcfe4435a8ff013f083b77ffc4b74339358c231ac961a5960b80413c52763bdbebd4e0c9de2a9165b766c6c745572b2d567f4665246051f2195208de174f92ee11" />
                </video>
            </div>
        </div>
    );
}

export default Video

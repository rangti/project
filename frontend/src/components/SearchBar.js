import React, { useState, useEffect, Component } from 'react';
import { Nav, NavDropdown, Navbar, Container, icon, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Modal,Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";



const SearchBar = () => {
    const buttonData = [
      { label: <strong>#오늘 미세먼지 농도</strong>, url: 'https://search.naver.com/search.naver?where=nexearch&sm=tab_clk.rqT&query=%EC%98%A4%EB%8A%98+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80+%EB%86%8D%EB%8F%84' }, 
      { label: <strong>#현재 미세먼지</strong>, url: 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%ED%98%84%EC%9E%AC+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&oquery=%EC%8B%A4%EC%8B%9C%EA%B0%84+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&tqi=iU%2BT1lqo1SossaAjAP8ssssssP0-382566' },
      { label: <strong>#미세먼지 예보</strong>, url: 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80+%EC%98%88%EB%B3%B4&oquery=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&tqi=iU%2BR9dqo15VssaPMaJRssssss0w-031327' },
      { label: <strong>#미세먼지 정의</strong>, url: 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80+%EC%A0%95%EC%9D%98&oquery=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80+%EC%98%88%EB%B3%B4&tqi=iU%2BSklqo1SossaEDJelsssssso4-501280' },
      { label: <strong>#미세먼지 현황</strong>, url: 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80+%ED%98%84%ED%99%A9&oquery=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80+%EC%A0%95%EC%9D%98&tqi=iU%2BSBlqo1LVss74KHjKssssst2o-001796' },
      { label: <strong>#실시간 미세먼지</strong>, url: 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%8B%A4%EC%8B%9C%EA%B0%84+%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80&oquery=%EB%AF%B8%EC%84%B8%EB%A8%BC%EC%A7%80+%ED%98%84%ED%99%A9&tqi=iU%2BS3wqo1e8ss4MQUNGssssss%2BC-459266' }
      // 다른 도시나 지역에 대한 버튼을 추가할 수 있습니다.
    ];
  
    const handleButtonClick = (url) => {
      window.open(url, '_blank');
    };

  
    return (
      <>
      <div style={{ padding: '10px', marginLeft:10 }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        {buttonData.map((button, index) => (
          <button class="btn btn-outline-secondary" key={index} onClick={() => handleButtonClick(button.url)}>
             <i className="bi bi-search ms-2" ></i>
            <span> {button.label} &nbsp;</span>
          </button> 
        ))}
      </div>
      </div>
      </>
    );
  };

export default SearchBar;
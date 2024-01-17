import React, { useEffect, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { fetchData } from './DustApi';
import { Nav, NavDropdown, Navbar, Container, Tab, Tabs, ListGroup, Card, Row, Col, fontSize, Modal,Button } from 'react-bootstrap';
import { useFormAction } from 'react-router-dom';
import { active } from 'd3';
// import { HeaderContainer } from 'react-router-dom';


const HeaderContainer = {
background: 'rgb(92, 130, 255)',
background: 'linear-gradient(90deg, rgba(157, 92, 255, 1), 0%, rgba(92, 130, 255, 1), 100%)',
width: '100%',
justifyContent: 'space-between',
alignItems: 'center',
padding: '1.4rem'
}

function Header() {
  return (
    <HeaderContainer>
      <i className="ri-arrow-left-s-line" />
      <i className="ri-close-line" />
    </HeaderContainer>
  );
}



const ChatbotComponent = () => {
  const [DustData, setDustData] = useState([]);
  const [Sido, setSido] = useState([])
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotEnded, setChatbotEnded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonDustData = await fetchData();
        // setDustData(jsonDustData);
        // console.log(jsonDustData)

        const dust = [ //0 오늘 미세, 1 내일 미세, 2 오늘 초미세, 3 내일 초미세
          { message: `${jsonDustData.data_from_first_api[0].informData}\n${jsonDustData.data_from_first_api[0].informCause}\n${jsonDustData.data_from_first_api[0].informOverall}` },
          { message: `${jsonDustData.data_from_first_api[1].informData} \n ${jsonDustData.data_from_first_api[1].informCause}\n${jsonDustData.data_from_first_api[1].informOverall}` },
          {
            message: `${jsonDustData.data_from_first_api[2].informData}\n${jsonDustData.data_from_first_api[2].informCause.replace(/(^.{3}|.{4})/, "$1초")}\n
          ${jsonDustData.data_from_first_api[2].informOverall.replace(/(^.{3}|.{4})/, "$1초")}`
          },
          {
            message: `${jsonDustData.data_from_first_api[3].informData}\n${jsonDustData.data_from_first_api[3].informCause.replace(/(^.{3}|.{4})/, "$1초")}\n
          ${jsonDustData.data_from_first_api[3].informOverall.replace(/(^.{3}|.{4})/, "$1초")}`
          }
        ]
        setDustData(dust)
        const sido = [
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].강원}
            초미세먼지 농도: ${jsonDustData.sido_pm_mean_data[1].강원}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].강원}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].강원}
            `
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].경기}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].경기}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].경기}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].경기}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].경남}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].경남}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].경남}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].경남}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].경북}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].경북}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].경북}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].경북}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].광주}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].광주}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].광주}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].광주}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].대구}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].대구}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].대구}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].대구}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].대전}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].대전}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].대전}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].대전}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].부산}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].부산}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].부산}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].부산}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].서울}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].서울}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].서울}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].서울}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].세종}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].세종}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].세종}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].세종}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].울산}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].울산}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].울산}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].울산}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].인천}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].인천}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].인천}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].인천}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].전남}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].전남}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].전남}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].전남}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].전북}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].전북}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].전북}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].전북}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].제주}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].제주}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].제주}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].제주}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].충남}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].충남}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].충남}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].충남}`
          },
          {
            message: `미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[0].충북}
            초미세먼지 농도 : ${jsonDustData.sido_pm_mean_data[1].충북}
            미세먼지 등급: ${jsonDustData.sido_pm_mean_data[2].충북}
            초미세먼지 등급: ${jsonDustData.sido_pm_mean_data[3].충북}`
          },
        ]
        setSido(sido)
        // console.log(sido.length)
        // setBotResponses(botResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();

  }, []);

  const handleToggleChatbot = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handleChatbotEnd = () => {
    setChatbotEnded(true);
    setShowModal(true); // Open modal when chatbot ends
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };



  return (
    <div>
      {DustData.length > 0 && Sido.length && (
        <img
          aria-modal='false'
          width='80px'
          src= {showChatbot ? '../chat1.png' : '../chat1.png'}
          alt= {showChatbot ? '챗봇 닫기' : '챗봇 열기'}
          onClick={handleToggleChatbot}>
        </img>
      )}
        <Modal show={showModal} onHide={closeModal} style={{ marginTop:80 }} >
        <Modal.Body style={{marginLeft:60}}>
        {DustData.length > 0 && Sido.length && (
            <ChatBot
              steps={[
                {
                  id: '1',
                  message: '무엇을 알려드릴까요?',
                  trigger: '2',
                },
                {
                  id: '2',
                  options: [
                    { value: 1, label: '미세먼지 예보', trigger: '3' },
                    { value: 2, label: '초미세먼지 예보', trigger: '4' },
                    { value: 3, label: '지역별 예보', trigger: '5' },
                  ],
                },
                {
                  id: '3', // 미세먼지 예보 클릭
                  options: [
                    { value: 1, label: '오늘', trigger: '6' },
                    { value: 2, label: '내일', trigger: '7' },
                  ],
                },
                {
                  id: '6', // 오늘 미세먼지 
                  message: DustData[0].message,
                  trigger: 'end',
                },
                {
                  id: 'end',
                  options: [
                    { value: 1, label: '대화 종료', trigger: 'finalEnd' },
                    { value: 2, label: '처음으로', trigger: '1' },
                  ],
                },

                {
                  id: 'finalEnd',
                  message: "감사합니다.",
                  trigger: 'closeChatbot',
                },
                {
                  id: 'closeChatbot',
                  message: '챗봇을 종료합니다.',
                  end : true
                },
                {
                  id: '7', // 내일 미세먼지 
                  message: DustData[1].message,
                  trigger: 'end',
                },
                {
                  id: '4', // 오늘 초미세먼지 예보 클릭
                  options: [
                    { value: 1, label: '오늘', trigger: '8' },
                    { value: 2, label: '내일', trigger: '9' },
                  ],
                },
                {
                  id: '8', // 오늘 초미세
                  message: DustData[2].message,
                  trigger: 'end',
                },
                {
                  id: '9', // 내일 초미세 
                  message: DustData[3].message,
                  trigger: 'end',
                },
                {
                  id: '5', // 시도별
                  options: [
                    { value: 1, label: '강원', trigger: '10' },
                    { value: 2, label: '경기', trigger: '11' },
                    { value: 3, label: '경남', trigger: '12' },
                    { value: 4, label: '경북', trigger: '13' },
                    { value: 5, label: '광주', trigger: '14' },
                    { value: 6, label: '대구', trigger: '15' },
                    { value: 7, label: '대전', trigger: '16' },
                    { value: 8, label: '부산', trigger: '17' },
                    { value: 9, label: '서울', trigger: '18' },
                    { value: 10, label: '세종', trigger: '19' },
                    { value: 12, label: '울산', trigger: '20' },
                    { value: 13, label: '인천', trigger: '21' },
                    { value: 14, label: '전남', trigger: '22' },
                    { value: 15, label: '전북', trigger: '23' },
                    { value: 16, label: '제주', trigger: '24' },
                    { value: 17, label: '충남', trigger: '25' },
                    { value: 18, label: '충북', trigger: '26' },
                  ],
                },
                {
                  id: '10', // 시도별
                  message: Sido[0].message,
                  trigger: 'end',
                },
                {
                  id: '11', // 시도별
                  message: Sido[1].message,
                  trigger: 'end',
                },
                {
                  id: '12', // 시도별
                  message: Sido[2].message,
                  trigger: 'end',
                },
                {
                  id: '13', // 시도별
                  message: Sido[3].message,
                  trigger: 'end',
                },
                {
                  id: '14', // 시도별
                  message: Sido[4].message,
                  trigger: 'end',
                },
                {
                  id: '15', // 시도별
                  message: Sido[5].message,
                  trigger: 'end',
                },
                {
                  id: '16', // 시도별
                  message: Sido[6].message,
                  trigger: 'end',
                },
                {
                  id: '17', // 시도별
                  message: Sido[7].message,
                  trigger: 'end',
                },
                {
                  id: '18', // 시도별
                  message: Sido[8].message,
                  trigger: 'end',
                },
                {
                  id: '19', // 시도별
                  message: Sido[9].message,
                  trigger: 'end',
                },
                {
                  id: '20', // 시도별
                  message: Sido[10].message,
                  trigger: 'end',
                },
                {
                  id: '21', // 시도별
                  message: Sido[11].message,
                  trigger: 'end',
                },
                {
                  id: '22', // 시도별
                  message: Sido[12].message,
                  trigger: 'end',
                },
                {
                  id: '23', // 시도별
                  message: Sido[13].message,
                  trigger: 'end',
                },
                {
                  id: '24', // 시도별
                  message: Sido[14].message,
                  trigger: 'end',
                },
                {
                  id: '25', // 시도별
                  message: Sido[15].message,
                  trigger: 'end',
                },
                {
                  id: '26', // 시도별
                  message: Sido[16].message,
                  trigger: 'end',
                },
              ]}
              handleEnd={handleChatbotEnd}
            />
        )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChatbotComponent;

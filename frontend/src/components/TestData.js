import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { json } from 'd3';

const kakaoApp_Key = '36a74c57aff77480a5b2e7013164cb4b'
const kakaoApi_Get = `https://dapi.kakao.com/v2/local/search/address.${kakaoApp_Key}`
const weatherXmlUrl = `https://www.kma.go.kr/XML/weather/sfc_web_map.xml`;



function TestData() {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    const key = process.env.REACT_APP_API_KEY; // .env파일에 저장해둔 API 서비스 키


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const x = position.coords.latitude;
            const y = position.coords.longitude;
            setX(x)
            setY(y)
        });
    }, []);

    // const getWeather = (x, y) => {
    //     fetch(
    //     `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=${kakaoApp_Key}&units=metric&lang=kr`
    // )
    //     .then((response) => {
    //     return response.json();
    //     })
    //     .then((json) => {
    //         console.log(json);
    //     })
  
  return (
    <div>
      <WeatherComponent x={x} y={y}></WeatherComponent>
    </div>
  )
}

function WeatherComponent(x,y) {
    const [weatherData, setWeatherData] = useState({});
  
    useEffect(() => {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     const x = position.coords.latitude;
    //     const y = position.coords.longitude;
    //   })
      
      const fetchData = async (x, y) => {
        try {
          let today = new Date();
          let year = today.getFullYear(); // 년도
          let month = today.getMonth() + 1; // 월
          let date = today.getDate(); // 날짜
          console.log(x,y)
          const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';
          let queryParams = `?serviceKey=ga6MZH3w0Nt1oHWjY04rN%2Fe2hLSxJhQuAukZTLNA1lcJCnPa4QT%2B%2FFqReIT2hH8lZjZoMQUAsxNCZFss3qWXNA%3D%3D`;
          queryParams += `&pageNo=1&numOfRows=1000&dataType=json&base_date=${year}${month}${date}&base_time=0630&nx=${y}&ny=${x}`;
  
          const response = await fetch(url + queryParams);
          const data = await response.json();
  
          setWeatherData(data);
          console.log(data); // API 응답 처리
  
        } catch (error) {
          console.error('데이터를 가져오는 중 오류 발생:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className='WeatherComponent'>
        <h3>날씨</h3>
        {weatherData.response && weatherData.response.body && weatherData.response.body.items && weatherData.response.body.items.item && (
          <p>{weatherData.response.body.items.item[0].baseDate}</p>
        )}
        {!weatherData && (
          <p>잠시 데이터를 가져오는 중입니다....😉</p>
        )}
      </div>
    );
  };
export default TestData;



import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';


function Kakao1({ x, y ,gu}) {
  const [locationObj, setLocationObj] = useState({});

  useEffect(() => {
    const _callApi = async () => {
      try {
        let url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${y}&y=${x}`;
        let res = await axios.get(url, {
          headers: {
            Authorization: 'KakaoAK 75f3fb18bcc4c88f3edab8d3a5a4cc8f',  // REST API 키
          },
        });
        
        console.log('응답:', res.data);

        if (res.data.documents && res.data.documents.length > 0) {
          const location = res.data.documents[0];

          if (location && location.address) {
            setLocationObj({
              si: location.address.region_1depth_name || '',
              gu: location.address.region_2depth_name || '',
              dong: location.address.region_3depth_name || '',
            });
          } else {
            console.error('주소 정보가 없습니다.');
          }
        } else {
          console.error('문서가 없거나 비어 있습니다.');
        }
      } catch (error) {
        console.error('에러:', error.message);
      }
    };

    // 컴포넌트가 마운트될 때 한 번만 _callApi 함수 호출
    _callApi();
  }, [x, y]); // x와 y 값이 변경될 때만 호출되도록
gu(locationObj.gu);

  const icon = (<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-crosshair" viewBox="0 0 16 16">
  <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7.001 7.001 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7.001 7.001 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7.001 7.001 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7.001 7.001 0 0 0 8.5 1.018zm-6.48 7A6.001 6.001 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6.001 6.001 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6.002 6.002 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6.001 6.001 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1h-.48M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
</svg>) 


  return (
    <div>
      <p>
        &nbsp; {icon}  {locationObj.si}&nbsp;{locationObj.gu}&nbsp;{locationObj.dong}  (현위치 기준)
      </p>
    </div>
  );
}

export default Kakao1;

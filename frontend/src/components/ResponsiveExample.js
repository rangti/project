import React from 'react'
import Table from 'react-bootstrap/Table';

const ResponsiveExample = ({data}) => {
    console.log('db data:',data)
  return ( 
    <Table striped bordered hover variant="white">
      <br/>
    <thead>
    <br/>
    </thead>
    <tbody>
      <tr>
        <th>날짜</th>
        <th>서울</th>
        <th>부산</th>
        <th>대구</th>
        <th>인천</th>
        <th>광주</th>
        <th>대전</th>
        <th>울산</th>
        <th>경기</th>
        <th>강원</th>
        <th>충북</th>
        <th>충남</th>
        <th>전북</th>
        <th>전남</th>
        <th>경북</th>
        <th>경남</th>
        <th>제주</th>
        <th>세종</th>
      </tr>
      {data.map((item, index) => (
        <tr key={index}>
          <td>{item.date.substr(0, 10)}</td>
          <td>{item.seoul}</td>
          <td>{item.busan}</td>
          <td>{item.daegu}</td>
          <td>{item.incheon}</td>
          <td>{item.gwangju}</td>
          <td>{item.daejeon}</td>
          <td>{item.ulsan}</td>
          <td>{item.gyeonggi}</td>
          <td>{item.gangwon}</td>
          <td>{item.chungbuk}</td>
          <td>{item.chungnam}</td>
          <td>{item.jeonbuk}</td>
          <td>{item.jeonnam}</td>
          <td>{item.gyeongbuk}</td>
          <td>{item.gyeongnam}</td>
          <td>{item.jeju}</td>
          <td>{item.sejong}</td>
        </tr>
      ))}
    </tbody>
  </Table>
  );

}

export default ResponsiveExample
import React from "react";
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart } from "recharts";
import TestData from "./DataList";


const Chart = ({ data }) => {
    console.log('그래프 -> ', data)
    // data가 유효한 배열인지 확인
    if (!Array.isArray(data) || data.length === 0) {
        return <div></div>;
    }
    // 데이터를 월별로 그룹화하여 합산
    const monthlyData = data.reduce((acc, item) => {
      const month = item.date.substr(0, 7); // 날짜에서 연도-월 추출 (YYYY-MM 형식)
      if (!acc[month]) {
        acc[month] = {
        date: month,
        // 각 지역의 합계 계산
        seoul: 0, busan: 0, daegu: 0, incheon:0, gwangju:0, daejeon:0, ulsan:0, gyeonggi:0,
        gangwon:0, chungbuk:0, chungnam:0, jeonbuk:0, jeonnam:0, gyeongbuk:0, gyeongnam:0,
        jeju:0, sejong:0
        };
      }
      // 각 지역의 값을 누적
      acc[month].seoul += item.seoul;
      acc[month].busan += item.busan;
      acc[month].daegu += item.daegu;
      acc[month].incheon += item.incheon;
      acc[month].gwangju += item.gwangju;
      acc[month].daejeon += item.daejeon;
      acc[month].ulsan += item.ulsan;
      acc[month].gyeonggi += item.gyeonggi;
      acc[month].gangwon += item.gangwon;
      acc[month].chungbuk += item.chungbuk;
      acc[month].chungnam += item.chungnam;
      acc[month].jeonbuk += item.jeonbuk;
      acc[month].jeonnam += item.jeonnam;
      acc[month].gyeongbuk += item.gyeongbuk;
      acc[month].gyeongnam += item.gyeongnam;
      acc[month].jeju += item.jeju;
      acc[month].sejong += item.sejong;
      // 나머지 지역도 동일하게 누적 처리
      console.log('seoul data: ', acc[month].seoul)
      return acc;
    }, {});
  
    // 월별 데이터를 차트에 맞게 변환
    const chartData = Object.values(monthlyData);

    return (
        <ResponsiveContainer width="100%" height="100%" style={{ marginTop:50, marginLeft:500}}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="seoul" stackId="seoul" fill="#ffa500" />
          <Bar dataKey="busan" stackId="busan" fill="#228b22" />
          <Bar dataKey="daegu" stackId="daegu" fill="#ffb6c1" />
          <Bar dataKey="incheon" stackId="incheon" fill="#87cefa" />
          <Bar dataKey="gwangju" stackId="gwangju" fill="#db7093" />
          <Bar dataKey="daejeon" stackId="daejeon" fill="#6b8e23" />
          <Bar dataKey="ulsan" stackId="ulsan" fill="#5f9ea0" />
          <Bar dataKey="gyeonggi" stackId="gyeonggi" fill="#f5deb3" />
          <Bar dataKey="gangwon" stackId="gangwon" fill="#c71585" />
          <Bar dataKey="chungbuk" stackId="chungbuk" fill="#48d1cc" />
          <Bar dataKey="chungnam" stackId="chungnam" fill="#ffc0cb" />
          <Bar dataKey="jeonbuk" stackId="jeonbuk" fill="#8b4513" />
          <Bar dataKey="jeonnam" stackId="jeonnam" fill="#2e8b57" />
          <Bar dataKey="gyeongbuk" stackId="gyeongbuk" fill="#6a5acd" />
          <Bar dataKey="gyeongnam" stackId="gyeongnam" fill="#d2b48c" />
          <Bar dataKey="jeju" stackId="jeju" fill="#9acd32" />
          <Bar dataKey="sejong" stackId="sejong" fill="#e9967a" />
          </BarChart>
      </ResponsiveContainer> 
    )
}

export default Chart;


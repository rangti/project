import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './Map.css';
import { fetchData } from './DustApi';
import Logo_ from './Logo_';


function koreaMapRegionName(d) { // ex) 서울특별시 -> 서울 
  if (d.properties.name.length === 4) {
    return d.properties.name.charAt(0) + d.properties.name.charAt(2);
  } else {
    return d.properties.name.substring(0, 2);
  }
}

function useMapData() {
  const [dustData, setDustData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonDustData = await fetchData();
        setDustData(jsonDustData);
        console.log(jsonDustData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  return {
    dustData
  };
}

const MapVisualization = ({ dustData }) => {
  useEffect(() => {
    const sido_pm_mean_data = dustData.sido_pm_mean_data
    if (sido_pm_mean_data) {
      const mapDataUrl = 'https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_geo_simple.json';
      const width = 760;
      const height = 590;
      const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
      const svg = d3.select("#mapClick").append("svg").attr("width", width).attr("height", height);
      d3.json(mapDataUrl).then(function (mapData) {
        const projection = d3.geoMercator().fitSize([width, height], mapData);
        const path = d3.geoPath().projection(projection);
        const paths = svg.selectAll("path")
          .data(mapData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .style("fill", "lightgray")
          .style("stroke", "white")
          .on("click", (event, d) => {
            // 클릭 이벤트 핸들링 로직 작성
            const clickRegion = koreaMapRegionName(d); // ex) 서울특별시 -> 서울
            if (dustData.sido_pm_mean_data) {
              const pm25_dust_grade = function (clickRegion) { //초미세 등급
                const pm_25num = Math.round(sido_pm_mean_data[3][clickRegion]);
                if (pm_25num <= 1) {
                  return '좋음'
                } else if (pm_25num <= 2) {
                  return '보통'
                } else if (pm_25num <= 3) {
                  return '나쁨'
                } else if (pm_25num <= 4) {
                  return '메우나쁨'
                }
              };
              const dust_grade_color = function (clickRegion) { //0 등급 마다 클릭시 지도 색상, 1 등급
                const pm_10num = Math.round(sido_pm_mean_data[2][clickRegion]);
                if (pm_10num <= 1) { //좋음
                  return ['skyblue', '좋음']
                } else if (pm_10num <= 2) {//보통
                  return ['green', '보통']
                } else if (pm_10num <= 3) {//나쁨
                  return ['yellow', '나쁨']
                } else if (pm_10num <= 4) {//매우나쁨
                  return ['red', '매우나쁨']
                }
              };

              tooltip
                .transition()
                .duration(200)
                .style("opacity", 0.9)
                .style("left", `${event.pageX}px`)
                .style("top", `${event.pageY}px`)
                .on("start", function () {
                  d3.select(this).html(`${clickRegion}<br>미세먼지 등급: ${dust_grade_color(clickRegion)[1]}<br>미세먼지 농도: ${(sido_pm_mean_data[0][clickRegion]).toFixed(2)}µg/m³
                          <br>초미세먼지 등급: ${pm25_dust_grade(clickRegion)}<br>초미세먼지 농도: ${(sido_pm_mean_data[1][clickRegion]).toFixed(2)}µg/m³`);
                });
              paths.style("fill", "lightgray"); // 기존에 강조된 지역 효과 초기화
              d3.select(event.currentTarget).style("fill", dust_grade_color(clickRegion)[0]); // 클릭한 지역 강조
            }
          })
          .on("mouseout", (event, d) => {
            tooltip.transition().duration(500).style("opacity", 0);
            d3.select(event.currentTarget).style("fill", "lightgray"); // 마우스가 벗어난 지역 효과 제거
          });
        // 기타 지도에 표시될 텍스트, 레이블 등 추가하는 로직
        svg.selectAll("text")
          .data(mapData.features)
          .enter()
          .append("text")
          .attr("pointer-events", "none") // 마우스 이벤트 비활성화
          .attr("transform", function (d) {
            return "translate(" + path.centroid(d) + ")";
          })
          .attr("font-size", "0.8rem")
          .style("text-anchor", "middle")
          .attr("dy", function (d) {
            const regionName = d.properties.name;
            if (regionName === "충청남도") {
              return "1em";
            } else if (regionName === "경기도") {
              return "3em";
            } else if (regionName === "세종특별자치시" || regionName === "인천광역시") {
              return "0.1em";
            } else {
              return ".5em"; // 나머지 지역의 경우 기본값으로 설정
            }
          })
          .text(function (d) {
            if (d.properties.name.length === 4) {
              return d.properties.name.charAt(0) + d.properties.name.charAt(2)
            } else {
              return d.properties.name.substring(0, 2);
            }
          });
      });
    }
    return () => {
      // 클린업 로직 (필요한 경우)
    };
  }, [dustData]);

  return (
    <div className="MapVisualization" style={{marginTop:-70}}>
      <div id="mapClick"></div>
    </div>
  );
}

function KoreaMap() {
  const { dustData } = useMapData();
  return (
    <div className="KoreaMapComponent">
      <MapVisualization dustData={dustData} />
      {/* 데이터가 없는 경우 */}
      {!dustData.data_from_first_api && (
        <div style={{marginLeft:-250}}><Logo_ /></div>
        )}
    </div>
  );
}

export default KoreaMap;

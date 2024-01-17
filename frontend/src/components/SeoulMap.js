import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './Map.css';
import { fetchData } from './DustApi';

function useMapData() {
  const [dustData, setDustData] = useState({});
  

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonDustData = await fetchData();
        setDustData(jsonDustData);
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

function MapVisualization({ dustData ,f , mainDustData}) {
  useEffect(() => {

    if (dustData.seoul_data) {
      const mapDataUrl = 'https://raw.githubusercontent.com/southkorea/seoul-maps/master/kostat/2013/json/seoul_municipalities_geo_simple.json';

      const width = 700;
      const height = 500;

      const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

      const svg = d3.select("#seoulMapClick").append("svg").attr("width", width).attr("height", height);

      d3.json(mapDataUrl).then(function (mapData) {

        const dust_grade_color = function (feature_list) {
          const colors_grade = {}; // 각 특징의 색상, 등급, 먼지농도 저장
          feature_list.forEach((feature) => {
            const featureName = feature.properties.name;
            const foundData = dustData.seoul_data.data.find((data) => data[0] === featureName);
            if (foundData) {
              const pm_10value = Math.round(foundData[3]);
              const pm_25value = Math.round(foundData[4]);
              const pm_10grade = Math.round(foundData[5]);
              const pm_25grade = Math.round(foundData[6]);

              if (pm_10grade <= 1) {
                colors_grade[featureName] = ['skyblue', pm_10value, pm_25value, '좋음'];
              } else if (pm_10grade <= 2) {
                colors_grade[featureName] = ['green', pm_10value, pm_25value, '보통'];
              } else if (pm_10grade <= 3) {
                colors_grade[featureName] = ['yellow', pm_10value, pm_25value, '나쁨'];
              } else if (pm_10grade <= 4) {
                colors_grade[featureName] = ['red', pm_10value, pm_25value, '매우나쁨'];
              }

              if (pm_25grade <= 1) {
                colors_grade[featureName].push('좋음');
              } else if (pm_25grade <= 2) {
                colors_grade[featureName].push('보통');
              } else if (pm_25grade <= 3) {
                colors_grade[featureName].push('나쁨');
              } else if (pm_25grade <= 4) {
                colors_grade[featureName].push('매우나쁨');
              }
            }
          });
          return colors_grade;
        }

        mainDustData(dustData.data_from_first_api)

        

        const projection = d3.geoMercator().fitSize([width, height], mapData);

        const path = d3.geoPath().projection(projection);
        const grade_color_value = dust_grade_color(mapData.features);
        console.log(grade_color_value)
        f(grade_color_value)
        const paths = svg.selectAll("path")
          .data(mapData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .style("fill", (d) => grade_color_value[d.properties.name][0])
          .style("opacity", 0.8)
          .style("stroke", "white")
          .on("click", (event, d) => {
            // console.log(mapData.features)
            // console.log(dust_grade_color(mapData.features))
            // console.log(d)/
            tooltip
              .transition()
              .duration(200)
              .style("opacity", 0.8)
              .style("left", `${event.pageX}px`)
              .style("top", `${event.pageY}px`)
              .on("start", function () {
                d3.select(this).html(`${d.properties.name}<br>
                미세먼지 농도 : ${grade_color_value[d.properties.name][1]} µg/m³ 
                <br>초미세먼지 농도 ${grade_color_value[d.properties.name][2]}µg/m³ 
                <br>미세먼지 등급: ${grade_color_value[d.properties.name][3]}
                <br>초미세먼지 등급: ${grade_color_value[d.properties.name][3]}`);
              });


            paths.style("stroke", "white"); // 기존에 강조된 지역 효과 초기화
            d3.select(event.currentTarget).style("opacity", 1); // 클릭한 지역 강조
          })
          .on("mouseout", (event, d) => {
            tooltip.transition().duration(500).style("opacity", 0);
            d3.select(event.currentTarget).style("opacity", 0.8); // 마우스가 벗어난 지역 효과 제거
          });

        svg.selectAll("text")
          .data(mapData.features)
          .enter()
          .append("text")
          .attr("transform", function (d) {
            return "translate(" + path.centroid(d) + ")";
          })
          .attr("dy", ".5em")
          .attr("font-size", "0.8rem")
          .attr("pointer-events", "none") // 텍스트에 마우스 이벤트 비활성화
          .style("text-anchor", "middle")
          .text(function (d) {
            return d.properties.name; // 지역 이름을 가져와 표시
          });
      });
    }
  }, [dustData, f, mainDustData]);

  return (
    <div className="MapVisualization" style={{marginTop:-40}}>
      <div id="seoulMapClick"></div>
    </div >
  );
}


function SeoulMap( {f, mainDustData}) {
  const { dustData } = useMapData();

  return (
    <div className="SeoulMapComponent">
      <MapVisualization dustData={dustData} f={f} mainDustData={mainDustData}/>
    </div>
  );
}




export default SeoulMap;
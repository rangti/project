import requests
import xml.etree.ElementTree as ET
from flask import Flask, request, jsonify
from datetime import datetime, timedelta

app = Flask(__name__)

def parse_weather_data(xml_data):
    root = ET.fromstring(xml_data)
    data = {"weather_info": []}

    # resultCode가 00이 아니면 오류 메시지 반환
    result_code = root.find("./resultCode").text
    if result_code != "00":
        result_msg = root.find("./resultMsg").text
        return {"error": result_msg}

    # 성공적으로 데이터를 받아온 경우
    items = root.findall("./item")
    for item in items:
        fcst_date = item.find("fcstDate").text
        fcst_time = item.find("fcstTime").text
        category = item.find("category").text
        fcst_value = item.find("fcstValue").text

        # 필요한 카테고리에 따라 데이터 저장
        if category == "PTY":  # 강수형태
            data["weather_info"].append({"fcst_date": fcst_date, "fcst_time": fcst_time, "precipitation_type": fcst_value})
        elif category == "SKY":  # 하늘상태
            data["weather_info"].append({"fcst_date": fcst_date, "fcst_time": fcst_time, "sky_state": fcst_value})
        elif category == "T1H":  # 기온
            data["weather_info"].append({"fcst_date": fcst_date, "fcst_time": fcst_time, "temperature": fcst_value})
        elif category == "REH":  # 습도
            data["weather_info"].append({"fcst_date": fcst_date, "fcst_time": fcst_time, "humidity": fcst_value})

        # Java 코드의 해당 부분을 파이썬으로 변환
        if "PTY" == "0":
            if "SKY" == "1":
                data[2] = "맑음"
            elif "SKY" == "3":
                data[2] = "구름많음"
            elif "SKY" == "4":
                data[2] = "흐림"
        elif "PTY" == "1":
            data[2] = "비"
        elif "PTY" == "2":
            data[2] = "비/눈"
        elif "PTY" == "3":
            data[2] = "눈"
        elif "PTY" == "5":
            data[2] = "빗방울"
        elif "PTY" == "6":
            data[2] = "빗방울눈날림"
        elif "PTY" == "7":
            data[2] = "눈날림"

    return data

@app.route('/weather', methods=['GET'])
def get_weather():
    x = request.args.get('x')
    y = request.args.get('y')

    now = datetime.now() - timedelta(minutes=30)
    base_date = now.strftime("%Y%m%d")
    base_time = now.strftime("%H%M")

    service_key = "ga6MZH3w0Nt1oHWjY04rN%2Fe2hLSxJhQuAukZTLNA1lcJCnPa4QT%2B%2FFqReIT2hH8lZjZoMQUAsxNCZFss3qWXNA%3D%3D"

    url = f"http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst" \
          f"?ServiceKey={service_key}" \
          f"&numOfRows=60" \
          f"&base_date={base_date}" \
          f"&base_time={base_time}" \
          f"&nx={x}" \
          f"&ny={y}"

    try:
        response = requests.get(url)
        xml_data = response.content

        # XML 데이터 파싱 및 처리
        weather_data = parse_weather_data(xml_data)

        return jsonify({"result": "success", "weather_data": weather_data})
    except Exception as e:
        error_message = str(e)
        return jsonify({"result": "error", "error_message": error_message})

if __name__ == '__main__':
    app.run(debug=True)

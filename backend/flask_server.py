from bs4 import BeautifulSoup
from flask import Flask, jsonify, request, Response
from flask_cors import CORS, cross_origin  # CORS 추가
import os
import cv2
import face_recognition
import pickle
import requests
import face_recognition_knn
from camera import VideoCamera
from project03_최종.app.dbModule import Database
import MySQLdb
import json
import re
import jwt
from datetime import datetime
import pandas as pd

# 로그인/회원가입
db = Database()

URL = "http://192.168.0.129"
cap = cv2.VideoCapture(URL + ":81/stream")

app = Flask(__name__)
CORS(app)

conn = MySQLdb.connect(host='127.0.0.1', user='root', password='1234', db='project3')


def set_face_detect(url: str, face_detect: int = 1):
    try:
        requests.get(url + "/control?var=face_detect&val={}".format(1 if face_detect else 0))
    except:
        print("SET_FACE_DETECT: something went wrong")
    return face_detect


@app.route('/')
def hello():
    return 'Hello, World!'


def to_json2(df, orient='split'):
    df_json = df.to_json(orient=orient, force_ascii=False)
    return json.loads(df_json)


# 파일 다운로드
@app.route('/download', methods=['GET', 'POST'])
@cross_origin()
def download_file():
    type = request.args.get("type")
    month = request.args.get("month")
    print(type)
    print(month)
    # print("react dropdown option에서 가져온 : ",getdate25)
    cur = conn.cursor()
    # print("download야 와라 ")
    sql_25 = "SELECT * FROM sidopm25Tbl"
    cur.execute(sql_25)
    results_25 = cur.fetchall()
    # print(results_25)

    sql_10 = "SELECT * FROM sidopm10Tbl"
    cur.execute(sql_10)
    results_10 = cur.fetchall()
    # print(results_10)

    # db에서 가져 온 튜플 타입의 데이터 리스트
    data25_result = [i for i in results_25]
    # print(data25_result)
    data10_result = [j for j in results_10]
    # print(data10_result)
    dict_data_25 = {'mno': [], 'date': [], 'seoul': [], 'busan': [], 'daegu': [], 'incheon': [], 'gwangju': [],
                    'daejeon': [], 'ulsan': [], 'gyeonggi': [], 'gangwon': [], 'chungbuk': [], 'chungnam': [],
                    'jeonbuk': [], 'jeonnam': [], 'gyeongbuk': [], 'gyeongnam': [], 'jeju': [], 'sejong': []}

    dict_data_10 = {'mno': [], 'date': [], 'seoul': [], 'busan': [], 'daegu': [], 'incheon': [], 'gwangju': [],
                    'daejeon': [], 'ulsan': [], 'gyeonggi': [], 'gangwon': [], 'chungbuk': [], 'chungnam': [],
                    'jeonbuk': [], 'jeonnam': [], 'gyeongbuk': [], 'gyeongnam': [], 'jeju': [], 'sejong': []}

    for i_25 in data25_result:
        for idx, k_25 in enumerate(dict_data_25.keys()):
            dict_data_25[k_25].append(i_25[idx])
    df_25 = pd.DataFrame(dict_data_25)
    # df_25.to_csv("test_25db.csv")
    # print(df_25)

    for i_10 in data10_result:
        for idx, k_10 in enumerate(dict_data_10.keys()):
            dict_data_10[k_10].append(i_10[idx])
    df_10 = pd.DataFrame(dict_data_10)
    # df_25.to_csv("test_25db.csv")
    # print(df_10)

    # 'date' 열을 datetime 형식으로 변환
    df_25['date'] = pd.to_datetime(df_25['date'])
    df_10['date'] = pd.to_datetime(df_10['date'])

    # 'month' 열에 'date' 열의 월 정보 저장
    df_25['month'] = df_25['date'].dt.month
    df_25['year'] = df_25['date'].dt.year
    df_10['month'] = df_10['date'].dt.month
    df_10['year'] = df_10['date'].dt.year
    # print(df_10)
    # print(df_25)

    # PM-25 미세먼지 년/월별 분리
    list_of_month25 = {"25-22-10": df_25[(df_25['month'] == 10) & (df_25['year'] == 2022)],
                       "25-22-11": df_25[(df_25['month'] == 11) & (df_25['year'] == 2022)],
                       "25-22-12": df_25[(df_25['month'] == 12) & (df_25['year'] == 2022)],
                       "25-23-01": df_25[(df_25['month'] == 1) & (df_25['year'] == 2023)],
                       "25-23-02": df_25[(df_25['month'] == 2) & (df_25['year'] == 2023)],
                       "25-23-03": df_25[(df_25['month'] == 3) & (df_25['year'] == 2023)],
                       "25-23-04": df_25[(df_25['month'] == 4) & (df_25['year'] == 2023)],
                       "25-23-05": df_25[(df_25['month'] == 5) & (df_25['year'] == 2023)],
                       "25-23-06": df_25[(df_25['month'] == 6) & (df_25['year'] == 2023)],
                       "25-23-07": df_25[(df_25['month'] == 7) & (df_25['year'] == 2023)],
                       "25-23-08": df_25[(df_25['month'] == 8) & (df_25['year'] == 2023)],
                       "25-23-09": df_25[(df_25['month'] == 9) & (df_25['year'] == 2023)],
                       "25-23-10": df_25[(df_25['month'] == 10) & (df_25['year'] == 2023)],
                       "25-23-11": df_25[(df_25['month'] == 11) & (df_25['year'] == 2023)]}
    # print(list_of_month25)
    # PM-10 미세먼지 년/월별 분리
    list_of_month10 = {"10-22-10": df_10[(df_10['month'] == 10) & (df_10['year'] == 2022)],
                       "10-22-11": df_10[(df_10['month'] == 11) & (df_10['year'] == 2022)],
                       "10-22-12": df_10[(df_10['month'] == 12) & (df_10['year'] == 2022)],
                       "10-23-01": df_10[(df_10['month'] == 1) & (df_10['year'] == 2023)],
                       "10-23-02": df_10[(df_10['month'] == 2) & (df_10['year'] == 2023)],
                       "10-23-03": df_10[(df_10['month'] == 3) & (df_10['year'] == 2023)],
                       "10-23-04": df_10[(df_10['month'] == 4) & (df_10['year'] == 2023)],
                       "10-23-05": df_10[(df_10['month'] == 5) & (df_10['year'] == 2023)],
                       "10-23-06": df_10[(df_10['month'] == 6) & (df_10['year'] == 2023)],
                       "10-23-07": df_10[(df_10['month'] == 7) & (df_10['year'] == 2023)],
                       "10-23-08": df_10[(df_10['month'] == 8) & (df_10['year'] == 2023)],
                       "10-23-09": df_10[(df_10['month'] == 9) & (df_10['year'] == 2023)],
                       "10-23-10": df_10[(df_10['month'] == 10) & (df_10['year'] == 2023)],
                       "10-23-11": df_10[(df_10['month'] == 11) & (df_10['year'] == 2023)],
                       "10-23-12": df_10[(df_10['month'] == 12) & (df_10['year'] == 2023)]}
    if type == 'dates25':
        print('25')
        for k, v in list_of_month25.items():
            # print(v)
            if month[-5:] == k[-5:]:
                # print("react pm-25 option getdate25 데이터 요청")
                result25 = v.to_json(orient='records', date_format="iso")
        return jsonify(result25)
    elif type == 'dates10':
        for k2, v2 in list_of_month10.items():
            print('10')
            if month[-5:] == k2[-5:]:
                print("react pm-10 option getdate10 데이터 요청")
                result10 = v2.to_json(orient='records', date_format="iso")
        return jsonify(result10)


@app.route('/api/data', methods=['GET'])
@cross_origin()
def get_combined_data():
    print("여기 서버에 들어와라 얍 ")
    servicekey = 'fVSutdVRP6yZHm5o9/ZDSp5XzK8qRWcEBFfIvFUrRZPiOG5MJWvoTU1DRRv6qYUnRrtSX40ihIw5Jvs046Io4Q=='

    # Fetching data from first API
    url1 = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth'  # 대기질 예보 통보
    params1 = {
        'serviceKey': servicekey,
        'returnType': 'json',
        "searchDate": datetime.now().strftime("%Y-%m-%d"),
        "ver": "1.1"
    }
    response1 = requests.get(url1, params=params1).json()
    data1 = response1['response']['body']['items']

    # Fetching data from second API
    url2 = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'  # 시도별 실시간 측정정보 조회
    params2 = {
        'serviceKey': servicekey,
        'returnType': 'json',
        'numOfRows': 650,
        "sidoName": '전국',
        "ver": "1.5"
    }
    response2 = requests.get(url2, params=params2).json()
    data2 = response2['response']['body']['items']

    new_data2 = []
    for data in data2:
        inner_dict = {'stationName': '', 'sidoName': '', 'dataTime': '', 'pm10Value': '', 'pm25Value': '',
                      'pm10Grade1h': '', 'pm25Grade1h': ''}
        for key, value in data.items():
            if key in inner_dict.keys():
                inner_dict[key] = value
        new_data2.append(inner_dict)

    # 시도별 평균 데이터 따로 만둠
    df = pd.DataFrame(new_data2)
    df['pm10Value'] = pd.to_numeric(df['pm10Value'], errors='coerce')  # 숫자로 변환
    df['pm25Value'] = pd.to_numeric(df['pm25Value'], errors='coerce')
    df['pm10Grade1h'] = pd.to_numeric(df['pm10Grade1h'], errors='coerce')
    df['pm25Grade1h'] = pd.to_numeric(df['pm25Grade1h'], errors='coerce')

    sido_pm_mean_list = [to_json2(j) for j in
                         [df.groupby('sidoName')[str(i)].mean() for i in
                          ['pm10Value', 'pm25Value', 'pm10Grade1h', 'pm25Grade1h']]]

    sido_pm_mean_data = []  # 진짜 보낼 데이터 리액트에서 쓰기 쉽게 키(지역명)와 값(데이터)으로 변환
    for d in sido_pm_mean_list:
        inner_dict = {}
        # print(d)
        for k, v in zip(d['index'], d['data']):
            inner_dict[k] = v
        sido_pm_mean_data.append(inner_dict)  # 0번지 미세먼지,1 초미세,2미세 등급,3초미세 등급
    # print(sido_pm_mean_data)

    seoul_df = df[df['sidoName'] == '서울']  # 시도명 서울인 데이터만
    print(json.loads(seoul_df.to_json(orient='split', force_ascii=False)))
    seoul_data = json.loads(seoul_df.to_json(orient='split', force_ascii=False))

    # Combining data from both APIs
    combined_data = {
        'data_from_first_api': data1,  # 대기질 예보 통보
        'data_from_second_api': new_data2,  # 시도별 실시간 측정정보 조회
        'sido_pm_mean_data': sido_pm_mean_data,  # 시도별 평균 미세 먼지 농도
        'seoul_data': seoul_data,
        'asd': data2
    }
    # print(combined_data)
    return jsonify(combined_data)


# 여기부터 로그인/회원가입
def is_valid_email(email):
    # 이메일 정규 표현식
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_pattern, email)
def is_valid_id(id):
    # 숫자 또는 영어만 허용하는 정규식
    id_pattern = r'^[a-zA-Z0-9]+$'
    return re.match(id_pattern, id)

with open("trained_knn_model.clf", 'rb') as f:
    knn_clf = pickle.load(f)


@app.route('/signin', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()

    userId = data.get('userId')
    userPw = data.get('userPw')

    if not (userId and userPw):
        return jsonify({'message': '아이디와 비밀번호를 모두 입력해주세요.'})

    query = "SELECT userId, userPw FROM userTbl WHERE userId = %s"
    args = (userId,)
    db.execute(query, args)
    user_data = db.fetchone()
    print(userId, userPw)

    if user_data:
        if user_data['userPw'] == userPw:
            # 토큰 생성
            token = jwt.encode({'userId': userId}, 'secret_key', algorithm='HS256')
            return jsonify({'message': '로그인 성공', 'token': token}), 200
        else:
            return jsonify({'message': '비밀번호를 확인해주세요.'}), 400
    else:
        return jsonify({'message': '존재하지 않는 아이디입니다.'}), 400





@app.route('/facelogin')
@cross_origin()
def face_recognition_login():
    print("얼굴인식 로그인")
    set_face_detect(URL, 1)
    # cap = cv2.VideoCapture(0)
    while True:
        if cap.isOpened():
            ret, frame = cap.read()
            print(ret)
            if ret:
                # Find all face locations in the current frame
                face_locations = face_recognition.face_locations(frame)
                print(face_locations)
                # If no faces are found in the frame, continue to the next frame
                if len(face_locations) == 0:
                    continue

                # Find face encodings for the faces in the frame
                faces_encodings = face_recognition.face_encodings(frame, known_face_locations=face_locations)

                # Use the KNN model to find the best matches for the faces
                closest_distances = knn_clf.kneighbors(faces_encodings, n_neighbors=1)
                are_matches = [closest_distances[0][i][0] <= 0.6 for i in range(len(face_locations))]

                # Draw rectangles and display names on the video frame
                for (_, _, _, _), are_match in zip(face_locations, are_matches):
                    if are_match:
                        name = knn_clf.predict([faces_encodings[are_matches.index(True)]])[0]
                        print("인증성공", name)
                        query = "SELECT userId FROM userTbl WHERE userId = %s"
                        args = (name,)
                        db.execute(query, args)
                        user_data = db.fetchone()

                        if user_data:  # 사용자가 DB에 존재하는 경우
                            # 로그인 토큰 생성
                            token = jwt.encode({'userId': user_data['userId']}, 'secret_key', algorithm='HS256')
                            return jsonify({'userId': user_data['userId'], 'token': token}), 200
                    else:
                        print("인증실패")

                return jsonify({'message': '존재하지 않는 사용자입니다.'}), 400

    return jsonify({'message': '존재하지 않는 사용자입니다.'}), 400


@app.route('/signup', methods=['POST'])
@cross_origin()
def register():
    data = request.form  # React에서 POST로 전송한 데이터 받기

    userId = data.get('userId')
    userName = data.get('userName')
    userPw = data.get('userPw')
    re_userPw = data.get('re_userPw')
    userMail = data.get('userMail')
    userAddr1 = data.get('userAddr1')
    userAddr2 = data.get('userAddr2')
    userAddr3 = data.get('userAddr3')

    userImage = request.files.get('userImage')
    print(userImage)

    # 아이디 중복 확인을 위한 쿼리
    query = "SELECT userId FROM userTbl WHERE userId = %s"
    args = (userId,)
    db.execute(query, args)
    existing_user = db.fetchone()

    if existing_user:
        return jsonify({'message': '이미 존재하는 아이디입니다. 다른 아이디를 사용하세요.'}), 400
    elif not is_valid_id(userId):
        return jsonify({'message': '아이디는 영문자 또는 숫자로만 이루어져야 합니다.'}), 400
    elif not (userId and userName and userPw and re_userPw and userMail and userAddr1 and userAddr2 and userAddr3):
        return jsonify({'message': '모든 필드를 입력하세요.'}), 400
    elif userPw != re_userPw:
        return jsonify({'message': '비밀번호가 일치하지 않습니다.'}), 400
    elif len(userPw) < 4:
        return jsonify({'message': '비밀번호는 4자이상 입니다'}), 400
    elif not is_valid_email(userMail):
        return jsonify({'message': '올바른 이메일 주소를 입력하세요.'}), 400
    elif userImage and userImage.filename != '':
            # 이미지가 있는 경우에만
            project_path = './knn_examples/train'
            user_folder_path = os.path.join(project_path, userId)
            os.makedirs(user_folder_path, exist_ok=True)

            image_filename = f"{userId}.jpg"
            image_path = os.path.join(user_folder_path, image_filename)
            userImage.save(image_path)

            image_db_path = f"/user_images/{userId}/{image_filename}"
            query = "INSERT INTO userTbl (userId, userName, userPw, userMail, userAddr1, userAddr2, userAddr3, userImage) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
            args = (userId, userName, userPw, userMail, userAddr1, userAddr2, userAddr3, image_db_path)
            db.execute(query, args)
            db.commit()

            classifier = face_recognition_knn.train(project_path, model_save_path="trained_knn_model.clf",
                                                    n_neighbors=2)

            return jsonify({'message': '회원가입이 완료되었습니다.'}), 200
    else:
        query = "INSERT INTO userTbl (userId, userName, userPw, userMail, userAddr1, userAddr2, userAddr3) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        args = (userId, userName, userPw, userMail, userAddr1, userAddr2, userAddr3)
        db.execute(query, args)
        db.commit()

        return jsonify({'message': '회원가입이 완료되었습니다.'}), 200



# 카카오 로그인
@app.route('/kakao/callback/<string:code>', methods=['POST'])
def kakao_callback(code):
    REST_API_KEY = 'c2939714c142db58382b1c1e02bd9efe'
    REDIRECT_URI = 'http://localhost:3000/kakao/callback'

    # 카카오 API로 토큰 요청
    data = {
        'grant_type': 'authorization_code',
        'client_id': REST_API_KEY,
        'redirect_uri': REDIRECT_URI,
        'code': code
    }
    token_url = 'https://kauth.kakao.com/oauth/token'
    response = requests.post(token_url, data=data)

    if response.status_code == 200:
        access_token = response.json().get('access_token')

        # 받은 access_token을 통해 사용자 정보 요청
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        user_info_url = 'https://kapi.kakao.com/v2/user/me'
        user_response = requests.get(user_info_url, headers=headers)

        if user_response.status_code == 200:
            user_data = user_response.json()

            # 필요한 사용자 정보 추출
            snsNickName = user_data.get('properties', {}).get('nickname')  # 닉네임 가져오기
            print(snsNickName)

            query_check = "SELECT snsNickName FROM snsuserTbl WHERE snsNickName = %s"

            args_check = (snsNickName,)
            db.execute(query_check, args_check)
            existing_nickname = db.fetchone()

            if existing_nickname:
                return jsonify({'message': '로그인 성공', 'snsNickName': snsNickName, 'token': access_token}), 200
            else:
                # 존재하지 않는 경우에만 새로운 사용자 정보 추가
                query_insert = "INSERT INTO snsuserTbl (snsNickName) VALUES (%s)"
                args_insert = (snsNickName,)
                db.execute(query_insert, args_insert)
                db.commit()
                return jsonify({'message': '회원가입 완료'}), 200  # 새로운 사용자 정보 추가 성공
        else:
            return jsonify({'error': 'Failed to get user information'}), 400
    else:
        return jsonify({'error': 'Failed to get access token'}), 400


# 구글로그인
@app.route('/google/callback', methods=['POST'])
def google_callback():
    REST_API_KEY = '195627799059-r8mnagk7o9d5tudve0qjjntd1a6s44sd.apps.googleusercontent.com'
    REDIRECT_URI = 'http://localhost:3000/google/callback'
    CLIENT_SECRET = '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'

    code = request.json.get('code')

    # 구글 API로 토큰 요청
    data = {
        'code': code,
        'client_id': REST_API_KEY,
        'redirect_uri': REDIRECT_URI,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code'
    }
    token_url = 'https://oauth2.googleapis.com/token'
    response = requests.post(token_url, data=data)

    if response.status_code == 200:
        access_token = response.json().get('access_token')

        # 받은 access_token을 통해 사용자 정보 요청
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        user_info_url = 'https://www.googleapis.com/oauth2/v1/userinfo'
        user_response = requests.get(user_info_url, headers=headers)

        if user_response.status_code == 200:
            user_data = user_response.json()

            # 필요한 사용자 정보 추출
            snsNickName = user_data.get('name')
            print(snsNickName)

            query_check = "SELECT snsNickName FROM snsuserTbl WHERE snsNickName = %s"
            args_check = (snsNickName,)
            db.execute(query_check, args_check)
            existing_nickname = db.fetchone()

            if existing_nickname:
                return jsonify({'message': '로그인 성공', 'snsNickName': snsNickName, 'token': access_token}), 200
            else:
                # 존재하지 않는 경우에만 새로운 사용자 정보 추가
                query_insert = "INSERT INTO snsuserTbl (snsNickName) VALUES (%s)"
                args_insert = (snsNickName,)
                db.execute(query_insert, args_insert)
                db.commit()
                return jsonify({'message': '회원가입 완료'}), 200  # 새로운 사용자 정보 추가 성공
        else:
            return jsonify({'error': 'Failed to get user information'}), 400
    else:
        return jsonify({'error': 'Failed to get access token'}), 400


# 네이버 로그인
@app.route('/naver/callback', methods=['POST'])
def naver_callback():
    REST_API_KEY = 'T_LsuaICNEnJMPuWT2fW'
    REDIRECT_URI = 'http://localhost:3000/naver/callback'
    CLIENT_SECRET = 'a3YFganju0'
    STATE_STRING = 'false'

    code = request.json.get('code')

    # 네이버 API로 토큰 요청
    data = {
        'grant_type': 'authorization_code',
        'client_id': REST_API_KEY,
        'client_secret': CLIENT_SECRET,
        'code': code,
        'state': STATE_STRING,
        'redirectURI': REDIRECT_URI
    }
    token_url = 'https://nid.naver.com/oauth2.0/token'
    response = requests.post(token_url, data=data)

    if response.status_code == 200:
        access_token = response.json().get('access_token')

        # 받은 access_token을 통해 사용자 정보 요청
        headers = {
            'Authorization': f'Bearer {access_token}'
        }
        user_info_url = 'https://openapi.naver.com/v1/nid/me'
        user_response = requests.get(user_info_url, headers=headers)

        if user_response.status_code == 200:
            user_data = user_response.json()

            # 필요한 사용자 정보 추출
            snsNickName = user_data.get('response', {}).get('name')
            print(snsNickName)

            query_check = "SELECT snsNickName FROM snsuserTbl WHERE snsNickName = %s"
            args_check = (snsNickName,)
            db.execute(query_check, args_check)
            existing_nickname = db.fetchone()

            if existing_nickname:
                return jsonify({'message': '로그인 성공', 'snsNickName': snsNickName, 'token': access_token}), 200
            else:
                # 존재하지 않는 경우에만 새로운 사용자 정보 추가
                query_insert = "INSERT INTO snsuserTbl (snsNickName) VALUES (%s)"
                args_insert = (snsNickName,)
                db.execute(query_insert, args_insert)
                db.commit()
                return jsonify({'message': '회원가입 완료'}), 200  # 새로운 사용자 정보 추가 성공
        else:
            return jsonify({'error': 'Failed to get user information'}), 400
    else:
        return jsonify({'error': 'Failed to get access token'}), 400


# 뉴스
@app.route('/news', methods=['GET'])
def scraping_news():
    print("여기 들어오는가?")
    query = '미세먼지'
    url = 'https://search.naver.com/search.naver?where=news&sm=tab_jum&query=' + query

    response = requests.get(url).content
    soup_response = BeautifulSoup(response, 'html.parser')
    news_subject = soup_response.find_all('a', {'class': 'news_tit'})

    news_list = []
    data_title = []
    for sub in news_subject:
        title = sub.get_text()
        url = sub.attrs['href']
        # print('Title: {}, URL: {}'.format(title, url))
        news_list.append({'title': title, 'url': url})

        # news_list를 JSON 형식으로 변환합니다.
    news_json = json.dumps(news_list, ensure_ascii=False)
    return jsonify(news_json)


if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template, request, redirect,jsonify,session
from flask_cors import CORS
import re

from app.dbModule import Database

app = Flask(__name__)
# app.secret_key = 'qlalfqjsghdla'  # 세션에 사용될 비밀키
db = Database()
CORS(app)

def is_valid_email(email):
    # 이메일 정규 표현식
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_pattern, email)

@app.route('/signup', methods=['POST'])
def register():
    data = request.get_json()  # React에서 POST로 전송한 데이터 받기

    userId = data.get('userId')
    userName = data.get('userName')
    userPw = data.get('userPw')
    re_userPw = data.get('re_userPw')
    userMail = data.get('userMail')
    userAddr1 = data.get('userAddr1')
    userAddr2 = data.get('userAddr2')
    userAddr3 = data.get('userAddr3')

    # 데이터베이스에 저장하기 전에 유효성 검사 등 필요한 처리 수행

    # 아이디 중복 확인을 위한 쿼리
    query = "SELECT userId FROM userTbl WHERE userId = %s"
    args = (userId,)
    db.execute(query, args)
    existing_user = db.fetchone()

    if existing_user:
        return jsonify({'message': '이미 존재하는 아이디입니다. 다른 아이디를 사용하세요.'}), 400
    elif not (userId and userName and userPw and re_userPw and userMail and userAddr1 and userAddr2 and userAddr3):
        return jsonify({'message': '모든 필드를 입력하세요.'}), 400
    elif userPw != re_userPw:
        return jsonify({'message': '비밀번호가 일치하지 않습니다.'}), 400
    elif len(userPw) < 4:
        return jsonify({'message': '비밀번호는 4자이상 입니다'}), 400
    elif not is_valid_email(userMail):
        return jsonify({'message': '올바른 이메일 주소를 입력하세요.'}), 400
    else:
         # 회원가입 정보 삽입을 위한 쿼리
        query = "INSERT INTO userTbl (userId, userName, userPw, userMail, userAddr1, userAddr2, userAddr3) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        args = (userId, userName, userPw, userMail, userAddr1, userAddr2, userAddr3)
        db.execute(query, args)
        db.commit()
        return jsonify({'message': '회원가입이 완료되었습니다.'}), 200

@app.route('/signin' , methods=['POST'])
def login():
    data = request.get_json()

    userId = data.get('userId')
    userPw = data.get('userPw')

    if not(userId and userPw):
        return jsonify({'message': '아이디와 비밀번호를 모두 입력해주세요.'})

    query = "SELECT userId, userPw FROM userTbl WHERE userId = %s"
    args = (userId,)
    db.execute(query, args)
    user_data = db.fetchone()

    if user_data:
        if user_data['userPw'] == userPw:
            # 로그인 성공 시 세션 생성
            # session['userId'] = userId
            # print(userId)
            return jsonify({'message': '로그인 성공'}), 200
        else:
            return jsonify({'message': '비밀번호를 확인해주세요.'}), 400
    else:
        return jsonify({'message': '존재하지 않는 아이디입니다.'}), 400

# @app.route('/logout')
# def logout():
#     session.pop('userId',None)
#     return jsonify({'message': '로그아웃 되었습니다.'}),200

if __name__ == '__main__':
    app.run(debug=True)

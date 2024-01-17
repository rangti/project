import pymysql
from flask import Flask, render_template, request
import timer

# Flask 객체 인스턴스 생성
app = Flask(__name__)







if __name__ == "__main__":
    app.run(host="0.0.0.0", port="8080", debug=True)
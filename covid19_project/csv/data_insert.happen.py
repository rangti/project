from flask import Flask, render_template, jsonify
import csv
import pymysql


app = Flask(__name__)

conn = pymysql.connect(host="localhost", port=3306, user="root", passwd="1234", db="covid_database")
print(conn)

# 코로나 확진환자 일자별 발생(국내발생+해외유입) 및 사망 현황
with open('covid_happen.csv') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=',')
    for idx, row in enumerate(reader):
        print(row['일자'], row['계(명)'], row['서울'], row['부산'], row['대구'], row['대전'], row['경기'])
        sql_insert_1 = 'insert into covid_happen(date_no , total, seoul , busan , daegu , daejeon , gyeonggi) values(%s, %s, %s, %s, %s, %s, %s)'
        cur = conn.cursor()
        cur.execute(sql_insert_1, (row['일자'], row['계(명)'], row['서울'], row['부산'], row['대구'], row['대전'], row['경기']))
        conn.escape_string(sql_insert_1)
        conn.commit()
        if idx%100==0:
            print("저장중:" ,idx)

print('완료')




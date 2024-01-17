from flask import Flask, render_template, jsonify
import csv
import pymysql
import  pandas as pd


app = Flask(__name__)

conn = pymysql.connect(host="localhost", port=3306, user="root", passwd="1234", db="covid_database")
print(conn)


# 코로나 확진환자 일자별 발생(국내발생+해외유입) 및 사망 현황
with open('covid_date.csv') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=',')
    for idx, row in enumerate(reader):
        print(row['일자'], row['계(명)'], row['국내발생(명)'], row['해외유입(명)'], row['사망(명)'])
        sql_insert_1 = 'insert into covid_date(date_no, total , korea,abroad,death) values(%s, %s, %s, %s, %s)'
        cur = conn.cursor()

        cur.execute(sql_insert_1, (row['일자'], row['계(명)'], row['국내발생(명)'], row['해외유입(명)'], row['사망(명)']))

        conn.escape_string(sql_insert_1)
        conn.commit()

print('완료')
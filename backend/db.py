import csv

import os
from flask import Flask
import pymysql


conn = pymysql.connect(host='127.0.0.1', user='root', password='1234', db='project3')


# 시도별 초미세먼지(PM-2.5)
data_path_25 = './content/sido_pm25/'
file_list_25 = os.listdir(data_path_25)
# print('file_list_25',file_list_25)

data_path_list_25 = []
for file1 in data_path_25:
    file25_path = os.path.join(data_path_25, file1)
    if file25_path not in data_path_list_25:  # 중복된 파일 경로가 아닌 경우만 추가
        data_path_list_25.append(file25_path)
# print(data_path_list)

for any_file in file_list_25:
    with open(data_path_25+"/"+any_file,"r") as csvfile:
        reader25 = csv.DictReader(csvfile, delimiter=',')
        for idx, row in enumerate(reader25):
            print(row)
            sql_insert = 'insert into sidoPm25Tbl(date,seoul,busan,daegu,incheon,gwangju,daejeon,ulsan,gyeonggi,gangwon,' \
                         'chungbuk,chungnam,jeonbuk,jeonnam,gyeongbuk,gyeongnam,jeju,sejong) ' \
                         'values(%s, %s, %s, %s,%s, %s, %s, %s, %s,%s, %s, %s, %s, %s,%s, %s, %s, %s)'
            cur = conn.cursor()
            cur.executemany(sql_insert, [(row['날짜'], row['서울'], row['부산'], row['대구'], row['인천'], row['광주'],
                                          row['대전'], row['울산'], row['경기'], row['강원'], row['충북'], row['충남'],
                                          row['전북'], row['전남'], row['경북'], row['경남'], row['제주'], row['세종'])])
            conn.escape_string(sql_insert)
            conn.commit()


# 시도별 미세먼지(PM-10)
data_path_10 = './content/sido_pm10/'
file_list_10 = os.listdir(data_path_10)

data_path_list_10 = []
for file2 in data_path_10:
    file10_path = os.path.join(data_path_10, file2)
    if file10_path not in data_path_list_10:  # 중복된 파일 경로가 아닌 경우만 추가
        data_path_list_10.append(file10_path)
# print(data_path_list)

for any_file in file_list_10:
    with open(data_path_10+"/"+any_file,"r") as csvfile:
        reader10 = csv.DictReader(csvfile, delimiter=',')
        for idx, row in enumerate(reader10):
            print(row)
            sql_insert = 'insert into sidoPm10Tbl(date,seoul,busan,daegu,incheon,gwangju,daejeon,ulsan,gyeonggi,gangwon,' \
                         'chungbuk,chungnam,jeonbuk,jeonnam,gyeongbuk,gyeongnam,jeju,sejong) ' \
                         'values(%s, %s, %s, %s,%s, %s, %s, %s, %s,%s, %s, %s, %s, %s,%s, %s, %s, %s)'
            cur = conn.cursor()
            cur.executemany(sql_insert, [(row['날짜'], row['서울'], row['부산'], row['대구'], row['인천'], row['광주'],
                                          row['대전'], row['울산'], row['경기'], row['강원'], row['충북'], row['충남'],
                                          row['전북'], row['전남'], row['경북'], row['경남'], row['제주'], row['세종'])])
            conn.escape_string(sql_insert)
            conn.commit()
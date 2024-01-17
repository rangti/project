import csv
import pandas as pd
from flask import render_template, Flask
import pymysql
import matplotlib.pyplot as plt
import mpld3
import matplotlib
import  json
import sys

plt.rcParams['font.family'] = 'Malgun Gothic' #한글 오류

app = Flask(__name__)

covid_db = pymysql.connect(
    user='root',
    passwd='1234',
    host='127.0.0.1',
    db='covid_database',
    charset='utf8'
)


cursor = covid_db.cursor()

matplotlib.use('Agg')

def to_json2(df,orient='split'):
    df_json = df.to_json(orient = orient, force_ascii = False)
    return json.loads(df_json)
def number_handling(v):
    #print('v',v)
    v= v.replace({'\$':'',',':''}, regex = True)
    v= v.apply(pd.to_numeric, errors='coerce').dropna().astype(int)
    return v

@app.route('/')
def grape():
    happen = "SELECT * FROM covid_happen"
    cursor.execute(happen)
    datas = cursor.fetchall()

    # 데이터를 DataFrame으로 변환
    df = pd.DataFrame(datas, columns=['date_no', 'total', 'seoul', 'busan', 'daegu', 'daejeon', 'gyeonggi'])
    df['date_no'] = pd.to_datetime(df['date_no'])
    df.set_index('date_no', inplace=True)

    # 월별 합계 데이터 생성
    quarterly_sum = df[['gyeonggi']].apply(lambda x: number_handling(x), axis=1).resample('Q').sum()

    # 데이터 분기별로 나누기
   # total_a= [quarterly_sum[i:i+4] for i in range(0,len(quarterly_sum),4)]
    #df[['total']] = df[['total']].apply(lambda x: number_handling(x), axis=1)
    label_list = quarterly_sum.index
    total_list = quarterly_sum['gyeonggi']
    first_data = pd.DataFrame({'data':total_list[:4]})
    second_data = pd.DataFrame({'data':total_list[4:8]})
    third_data = pd.DataFrame({'data':total_list[8:12]})
    fourth_data = pd.DataFrame({'data':total_list[12:16]})
    print(first_data)
    #print(quarterly_sum['total'])

    #df = pd.DataFrame({'data': total_a[0]})
    #json_1 = to_json2(df)
    return render_template('graph_happen.html'
                           ,data_list1=to_json2(first_data) ,
                           data_list2=to_json2(second_data),
                           data_list3=to_json2(third_data),
                           data_list4=to_json2(fourth_data)
                           )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
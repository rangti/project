import pandas as pd
from flask import render_template, Flask,request
import matplotlib.pyplot as plt
import matplotlib
import json
import MySQLdb

plt.rcParams['font.family'] = 'Malgun Gothic' #한글 오류해결을 위해 글꼴을 지정해줌

app = Flask(__name__)

conn = MySQLdb.connect(host="localhost", port=3306, user="root", passwd="1234", db="covid_database")
cursor = conn.cursor()

matplotlib.use('Agg')

def to_json2(df,orient='split'):
    df_json = df.to_json(orient = orient, force_ascii = False)
    return json.loads(df_json)
def number_handling(v):
    v= v.apply(pd.to_numeric, errors='coerce').dropna().astype(int)
    return v
 #==============================메인페이지===================
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/charts')
def charts_date():
    return render_template('charts_date.html')

@app.route('/happen')
def charts_happen():
    return render_template('charts_happen.html')

@app.route('/die')
def charts_die():
    return render_template('charts_die.html')

#==============================메인페이지==========================

#=================그래프를 그리기 위한 데이터를 가공하는곳==============
@app.route('/date_graph')
def date_graph_write():
    year = request.args.get('year')
    # print('year:',year)
    year_list =[
        "SELECT * FROM covid_date where  date_no between 20200101 and 20201230"  ,
        "SELECT * FROM covid_date where  date_no between 20210101 and 20211230",
        "SELECT * FROM covid_date where  date_no between 20220101 and 20221230",
        "SELECT * FROM covid_date where  date_no between 20230101 and 20231230"
    ]
    if year == '2020':
        covid_date= year_list[0]
    elif year == '2021':
        covid_date = year_list[1]
    elif year == '2022':
        covid_date = year_list[2]
    else:
        covid_date =year_list[3]
    # print(happen)
    cursor.execute(covid_date)
    datas = cursor.fetchall()
    # print(happen)

    # 데이터를 DataFrame으로 변환
    df = pd.DataFrame(datas, columns=['date_no', 'total', 'korea', 'abroad', 'death'])
    df['date_no'] = pd.to_datetime(df['date_no'])
    df.set_index('date_no', inplace=True)
    result = {}
    for i in df.columns:
        cleaned_column = df[i].str.replace(',', '').astype(int)
        # print(cleaned_column)
        quarterly_sum = cleaned_column.dropna().resample('Q').sum()
        result[i] = quarterly_sum
        # print(result[i])
    result_df = pd.DataFrame(result)
    json_result = result_df.to_json(orient='index',date_format='iso')
    #print(pd.DataFrame(result))
    return json_result

@app.route('/happen_graph')
def happen_graph_write():
    year = request.args.get('year')
    # print('year:',year)
    year_list =[
        "SELECT * FROM covid_happen where  date_no between 20200101 and 20201230"  ,
        "SELECT * FROM covid_happen where  date_no between 20210101 and 20211230",
        "SELECT * FROM covid_happen where  date_no between 20220101 and 20221230",
        "SELECT * FROM covid_happen where  date_no between 20230101 and 20231230"
    ]
    if year == '2020':
        covid_happen= year_list[0]
    elif year == '2021':
        covid_happen = year_list[1]
    elif year == '2022':
        covid_happen = year_list[2]
    else:
        covid_happen =year_list[3]
    # print(happen)
    cursor.execute(covid_happen)
    datas = cursor.fetchall()
    # print(happen)

    # 데이터를 DataFrame으로 변환
    df = pd.DataFrame(datas, columns=['date_no', 'total', 'seoul', 'busan', 'daegu', 'daejeon', 'gyeonggi'])
    df['date_no'] = pd.to_datetime(df['date_no'])
    df.set_index('date_no', inplace=True)
    result = {}
    for i in df.columns:
        cleaned_column = df[i].str.replace(',', '').astype(int)
        # print(cleaned_column)
        quarterly_sum = cleaned_column.dropna().resample('Q').sum()
        result[i] = quarterly_sum
        # print(result[i])
    result_df = pd.DataFrame(result)
    json_result = result_df.to_json(orient='index',date_format='iso')
    print(pd.DataFrame(result))
    return json_result

@app.route('/die_graph')
def die_graph_write():
    year = request.args.get('year')
    # print('year:',year)
    year_list =[
        "SELECT * FROM covid_die where  date_no between 20200101 and 20201230"  ,
        "SELECT * FROM covid_die where  date_no between 20210101 and 20211230",
        "SELECT * FROM covid_die where  date_no between 20220101 and 20221230",
        "SELECT * FROM covid_die where  date_no between 20230101 and 20231230"
    ]
    if year == '2020':
        covid_happen= year_list[0]
    elif year == '2021':
        covid_happen = year_list[1]
    elif year == '2022':
        covid_happen = year_list[2]
    else:
        covid_happen =year_list[3]
    # print(happen)
    cursor.execute(covid_happen)
    datas = cursor.fetchall()
    # print(happen)

    # 데이터를 DataFrame으로 변환
    df = pd.DataFrame(datas, columns=['date_no', 'total', 'seoul', 'busan', 'daegu', 'daejeon', 'gyeonggi'])
    df['date_no'] = pd.to_datetime(df['date_no'])
    df.set_index('date_no', inplace=True)
    result = {}
    for i in df.columns:
        cleaned_column = df[i].str.replace(',', '').astype(int)
        # print(cleaned_column)
        quarterly_sum = cleaned_column.dropna().resample('Q').sum()
        result[i] = quarterly_sum
        # print(result[i])
    result_df = pd.DataFrame(result)
    json_result = result_df.to_json(orient='index',date_format='iso')
    # print(pd.DataFrame(result))
    return json_result


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000", debug=True)
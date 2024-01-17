
# 파일 다운로드를 관리하는 라우트 핸들러
# 클라이언트로부터의 POST 요청을 처리, 요청된 파일을 지정된 디렉토리에서 찾아 다운로드
# files25_list = os.listdir("./content/sido_pm25/")
#     if request.method == 'POST':
#         sw = 0
#         for x in files25_list:
#             if (x == request.form['file']):
#                 sw = 1
#         try:
#             path = './content/sido_pm25/'
#             return send_file(path + request.form['file'],
#                              download_name=request.form['file'],
#                              as_attachment=True)
#         except:
#             print("download error")
#
# files10_list = os.listdir("./content/sido_pm10/")
#     if request.method == 'POST':
#         sw = 0
#         for x in files10_list:
#             if (x == request.form['file']):
#                 sw = 1
#         try:
#             path = './content/sido_pm10/'
#             return send_file(path + request.form['file'],
#                              download_name=request.form['file'],
#                              as_attachment=True)
#         except:
#             print("download error")




package com.five.controller;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import org.json.JSONArray;
import org.json.JSONObject;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

//반복문을 통해 pageNo를 1부터 7까지 변경하여 API에 요청하고 데이터를 처리하고 저장하는 코드
public class JsonToMySQLJDBC {

 public static void main(String[] args) {
     try {
         String api_key = "CMeWOR88bn6npOdLcTx0uRLVx9I%2FFCSHaHjKDHGWW40XS4gSyH0IZltowSP%2BL6m4KfSBsE%2Fn3QcMK%2BBR7grxwA%3D%3D"; // 여기에 본인의 API 키를 넣으세요
         String dbUrl = "jdbc:mysql://localhost:3306/webproject?serverTimezone=UTC";
         String username = "root";
         String password = "1234";

         Class.forName("com.mysql.cj.jdbc.Driver");
         Connection connDB = DriverManager.getConnection(dbUrl, username, password);

         String insertQuery = "INSERT INTO trip_data (trip_title, trip_images, trip_addr,trip_contentId) VALUES (?, ?, ?, ?)";
         PreparedStatement pstmt = connDB.prepareStatement(insertQuery);

         for (int pageNo = 1; pageNo <= 7; pageNo++) {
             String apiUrl = "http://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=12&pageNo=" + pageNo + "&MobileOS=ETC&MobileApp=AppTest&ServiceKey=" + api_key + "&listYN=Y&arrange=A&contentTypeId=12&areaCode=1&sigunguCode=&cat1=A01&cat2=A0101&cat3=&_type=json";
             URL url = new URL(apiUrl);
             HttpURLConnection conn = (HttpURLConnection) url.openConnection();
             conn.setRequestMethod("GET");

             BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
             StringBuilder jsonBuilder = new StringBuilder();
             String line;

             while ((line = reader.readLine()) != null) {
                 jsonBuilder.append(line);
             }
             reader.close();

             String jsonData = jsonBuilder.toString();
             JSONObject rootNode = new JSONObject(jsonData);
             JSONObject responseNode = rootNode.getJSONObject("response");
             JSONObject bodyNode = responseNode.getJSONObject("body");
             JSONObject itemsNode = bodyNode.getJSONObject("items");
             JSONArray itemArray = itemsNode.getJSONArray("item");

             for (int i = 0; i < itemArray.length(); i++) {
                 JSONObject itemNode = itemArray.getJSONObject(i);
                 String tripTitle = itemNode.getString("title");
                 String tripImages = itemNode.optString("firstimage", "");
                 String tripAddr = itemNode.optString("addr1", "");
                 String tripContentId = itemNode.optString("contentid", "");

                 pstmt.setString(1, tripTitle);
                 pstmt.setString(2, tripImages);
                 pstmt.setString(3, tripAddr);
                 pstmt.setString(4, tripContentId);

                 pstmt.executeUpdate();
             }
         }

         pstmt.close();
         connDB.close();

         System.out.println("Data inserted successfully.");
     } catch (Exception e) {
         e.printStackTrace();
     }
 }
}


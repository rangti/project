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
import java.sql.ResultSet;

public class JsonToMySQLJDBC_detail {

    public static void main(String[] args) {
        try {
            String api_key = "CMeWOR88bn6npOdLcTx0uRLVx9I%2FFCSHaHjKDHGWW40XS4gSyH0IZltowSP%2BL6m4KfSBsE%2Fn3QcMK%2BBR7grxwA%3D%3D"; // 본인의 API 키를 넣으세요
            String dbUrl = "jdbc:mysql://localhost:3306/webproject?serverTimezone=UTC";
            String username = "root";
            String password = "1234";

            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection connDB = DriverManager.getConnection(dbUrl, username, password);

            String selectQuery = "SELECT trip_contentId FROM trip_data";
            PreparedStatement selectPstmt = connDB.prepareStatement(selectQuery);
            ResultSet resultSet = selectPstmt.executeQuery();

            String insertQuery = "INSERT INTO trip_detail (trip_title, trip_images, trip_addr, trip_contentId, trip_overview) VALUES (?, ?, ?, ?, ?)";
            PreparedStatement pstmt = connDB.prepareStatement(insertQuery);

            while (resultSet.next()) {
                String contentId = resultSet.getString("trip_contentId");

                String apiUrl = "http://apis.data.go.kr/B551011/KorService1/detailCommon1?ServiceKey=" + api_key + "&contentTypeId=12&contentId=" + contentId + "&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json";
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

                // 데이터를 가져와서 DB에 저장하는 작업
                for (int i = 0; i < itemArray.length(); i++) {
                    JSONObject itemNode = itemArray.getJSONObject(i);
                    String tripTitle = itemNode.getString("title");
                    String tripImages = itemNode.optString("firstimage", "");
                    String tripAddr = itemNode.optString("addr1", "");
                    String tripContentId = itemNode.optString("contentid", "");
                    String tripOverview = itemNode.optString("overview", "");

                    pstmt.setString(1, tripTitle);
                    pstmt.setString(2, tripImages);
                    pstmt.setString(3, tripAddr);
                    pstmt.setString(4, tripContentId);
                    pstmt.setString(5, tripOverview);

                    pstmt.executeUpdate();
                }
            }

            pstmt.close();
            selectPstmt.close();
            connDB.close();

            System.out.println("Data inserted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

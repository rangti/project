package com.five.model;

import java.sql.Date;

import lombok.Data;

@Data
public class PostVO {
	private Long board_id;
	private String board_title;
	private String board_content;
	private String board_writer;
	private int board_view_cnt;
	private Boolean board_delete_yn;
	private Date board_created_date;
	private Date board_modified_date;
	
}

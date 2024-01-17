create database covid_database;

select * from covid1;
drop table covid1;
use covid_database;
drop table covid_date;
create table covid_date(
	date_no datetime,
	total varchar(20) ,
    korea varchar(20),
    abroad varchar(20),
    death varchar(20) 
    );
select * from covid_date;


create table covid_happen(
	date_no datetime,
    total varchar(20),
    seoul varchar(20),
    busan varchar(20),
    daegu varchar(20),
    daejeon varchar(20),
    gyeonggi varchar(20)
    );
    
drop table covid_happen;
select * from covid_happen;


create table covid_die(
	date_no datetime,
    total varchar(20),
    seoul varchar(20),
    busan varchar(20),
    daegu varchar(20),
    daejeon varchar(20),
    gyeonggi varchar(20)
    );
    
drop table covid_die;
select * from covid_die;
select * from covid_die order by date_no desc;

commit;
select @@global.time_zone, @@session.time_zone;
SET GLOBAL time_zone='Asia/Seoul';
SET time_zone='Asia/Seoul'

    
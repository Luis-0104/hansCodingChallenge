drop table MOCK_DATA;

create table MOCK_DATA (
	id INT PRIMARY KEY,
	user_name VARCHAR(30) UNIQUE,
	first_name VARCHAR(150),
	last_name VARCHAR(150),
	birth_date DATE,
	email VARCHAR(300),
	password VARCHAR(150),
	last_login DATETIME,
	CHECK(
		id > 9999
		AND id < 100000
	),
	CHECK(LENGTH(user_name) > 2),
	CHECK(user_name REGEXP "^[A-Za-z0-9]*$")
);
insert into MOCK_DATA (
		id,
		user_name,
		first_name,
		last_name,
		birth_date,
		email,
		password,
		last_login
	)
values (
		17442,
		'ecolcutt0',
		'Erick',
		'Colcutt',
		'2022-6-27',
		'ecolcutt0@upenn.edu',
		'hHW2gYBRKZlz',
		'2022-6-27 10:19:49'
	);

select * from MOCK_DATA;
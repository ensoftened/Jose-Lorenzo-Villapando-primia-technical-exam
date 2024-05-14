# Instructions on how to install and run this system in your local environment

To run this application on your local machine, please make sure you have already installed Node.js (for running npm), and mysql (mysql server and MySQL 8.0 Command Line Client). 
Make sure your mysql credentials are already configured and the necessary environment variables as well.


After cloning this repository, please do follow the instructions from sections A. to C.


## A. Setting up the MySQL database using MySQL 8.0 Command Line Client

1. Start MySQL 8.0 Command Line Client
2. Please enter the MySQL password you configured in your machine
3. The name of the database is "hr_hiring" it has three (3) tables named "positions", "position_candidate", and "system_users"
4. Paste this SQL script to your MySQL Command Line Client:
```
CREATE DATABASE IF NOT EXISTS hr_hiring;
USE hr_hiring;

CREATE TABLE positions(position_id INT AUTO_INCREMENT PRIMARY KEY, position_name varchar(255));


CREATE TABLE position_candidate (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    position_id INT ,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    is_hired BOOLEAN,


    FOREIGN KEY (position_id) REFERENCES positions(position_id)

);



CREATE TABLE system_users (
    id  INT AUTO_INCREMENT PRIMARY KEY,
    position_id INT ,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    date_hired DATETIME DEFAULT CURRENT_TIMESTAMP,
    


    FOREIGN KEY (position_id) REFERENCES positions(position_id)


);
```

4. You have successfully set up your database.

## B. Setting up and starting the Backend/Server project
1. Go to the project folder named "Jose-Lorenzo-Villapando-primia-technical-exam"
2. Click the "backend" folder
3. Open ".env" using your preferred editor (e.g. VS code or nodepad)
4. You will see these inside the .env file
	```
	MYSQL_HOST="localhost"
	MYSQL_USER="root"
	MYSQL_PASSWORD=""
	MYSQL_DATABASE="hr_hiring"
	PORT = 5000
	```
5. To match the credentials setup in your MySQL, you have to change MYSQL_HOST, MYSQL_USER, and MYSQL_PASSWORD
6. Open this folder: Jose-Lorenzo-Villapando-primia-technical-exam
7. Run command line in this folder
8. Input these commands:
	```
	cd backend
	npm install
	npm start
	```
9. Your server is now running on localhost:5000

## C. Setting up and starting the Frontend/Client project

1. Open this folder: Jose-Lorenzo-Villapando-primia-technical-exam
2. Run command line in this folder
3. Input these commands:
```
	cd frontend
	npm install
	npm start
```
4. The client side will run on localhost:3001 on the browser

# Explanation

I just followed the basic flow of MERN stack. Actually, I have my own built-in component libraries and own structure in my client side that are customizable to make coding with styles easier. 
I also used the axios library to make an http request from the client side to server side.

If you are going to ask me what will be the improvements I would like to implement if I have more time, I want to add the following:

1. E-mail module. Once the candidate gets hired, he/she will get a verification email to completely setup his/her account
2. Login feature. This is essential because every activity needs to be authorized by each user.
3. Audit trail feature. In order to keep track all the activities of every user on the system.
4. Dashboard. A Dashboard that shows charts and graphs that summarize the activities within given periods.
5. More necessary fields that are relevant for each entity.


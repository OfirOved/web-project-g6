-- script for building all SQL tables for our project
DROP DATABASE `web-project-g6`;

CREATE DATABASE `web-project-g6`;

USE `web-project-g6`;

CREATE TABLE Users(
    username VARCHAR(255) PRIMARY KEY,
    `password` VARCHAR(255)
);

CREATE TABLE Todos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL, 
    task VARCHAR(255) NOT NULL,
    dueDate VARCHAR(255) NOT NULL
);

CREATE TABLE UsersYears(
    username VARCHAR(255),
    `year` INT NOT NULL,
    `group` INT NOT NULL
);

CREATE TABLE CommitteeMessages(
    id INT AUTO_INCREMENT PRIMARY KEY,
    `year` INT NOT NULL,
    `group` INT NOT NULL, 
    date VARCHAR(255) NOT NULL,
    `from` VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message VARCHAR(500) NOT NULL
);

CREATE TABLE Mentors(
    phoneNumber VARCHAR(10) PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    about VARCHAR(255), 
    availability VARCHAR(255) NOT NULL,
    teachingPrivateLessons BOOL NOT NULL,
    pricePerHour INT
);

CREATE TABLE MentorsCourses(
    mentorPhoneNumber VARCHAR(10),
    course VARCHAR(255)
);

CREATE TABLE MentorsReviews(
    id INT AUTO_INCREMENT PRIMARY KEY,
    mentorPhoneNumber VARCHAR(10),
    date VARCHAR(255) NOT NULL,
    stars INT NOT NULL,
    `from` VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL
);

CREATE TABLE ContactMessages(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message VARCHAR(500) NOT NULL
);

CREATE TABLE RequestsMessages(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL
);

CREATE TABLE Grades(
    username VARCHAR(255),
    course_id VARCHAR(255),
    course_name VARCHAR(255),
    credit DOUBLE,
    grade DOUBLE
);

CREATE TABLE Marathons(
    course_id VARCHAR(255),
    course_name VARCHAR(255),
    type VARCHAR(255),
    tutor VARCHAR(255),
    price DOUBLE
);

CREATE TABLE Documents(
    title VARCHAR(50),
    caption VARCHAR(50),
    `file` VARCHAR(50)    
    );

CREATE TABLE HWforum(
    course VARCHAR(50),
    title VARCHAR(50),
    content VARCHAR(255)
);

CREATE TABLE OurMarathons(
    courseNum VARCHAR(255),
    courseName VARCHAR(255),
    `type` VARCHAR(255),
    mentor VARCHAR(255),
    placesAvi INT,
    numOfReg INT,
    startDate VARCHAR(255)
);

INSERT INTO Users (username, `password`) VALUES ('student1', '123456');
INSERT INTO Users (username, `password`) VALUES ('student2', '123456');

INSERT INTO UsersYears (username, `year`, `group`) VALUES ('student1', 2020, 2);
INSERT INTO UsersYears (username, `year`, `group`) VALUES ('student2', 2021, 1);

INSERT INTO CommitteeMessages (`year`, `group`, date, `from`, title, message) VALUES (2020, 2, '02.10.2021', 'ועד שנתון 2020', 'פקטור בקורס חקבץ מועד א', 'קיבלנו פקטור במועד א מן הרמצה בסך 5 נקודות');
INSERT INTO CommitteeMessages (`year`, `group`, date, `from`, title, message) VALUES (2021, 1, '02.10.2021', 'ועד שנתון 2021', 'פקטור בקורס חשבונאות מועד ב', 'קיבלנו פקטור במועד ב מן הרמצה בסך 2 נקודות');

INSERT INTO Todos (username, task, dueDate) VALUES ('student1', 'מעבדה ב react', '3.10.2021' );
INSERT INTO Todos (username, task, dueDate) VALUES ('student1', 'מעבדה ב angular', '5.10.2021' );
INSERT INTO Todos (username, task, dueDate) VALUES ('student1', 'מעבדה ב flutter', '15.10.2021' );

INSERT INTO Todos (username, task, dueDate) VALUES ('student2', 'צריך לסיים את העבודה להגשה בניתוץ', '15.11.2021' );
INSERT INTO Todos (username, task, dueDate) VALUES ('student2', 'מבחן בניתוץ', '1.12.2021' );

INSERT INTO RequestsMessages(name, date, content) VALUES ('student1', '4.10.2021', 'מתי נקבל את המתנה לחג?');
INSERT INTO RequestsMessages(name, date, content) VALUES ('student1', '1.10.2021', 'מתי ניתן להירשם למתרונים?');
INSERT INTO RequestsMessages(name, date, content) VALUES ('student2', '9.9.2021', 'האם ניתן להגיש שוב את עבודה מספר 1 בחשבונאות');

INSERT INTO Grades(username, course_id, course_name, credit, grade) VALUES ('student1', '372.1.200', 'חשבונאות', 3.5, 100);
INSERT INTO Grades(username, course_id, course_name, credit, grade) VALUES ('student1', '372.2.201', 'ניתוץ', 3.5, 100);
INSERT INTO Grades(username, course_id, course_name, credit, grade) VALUES ('student2', '372.3.202', 'בססי נתונים', 3.5, 100);
INSERT INTO Grades(username, course_id, course_name, credit, grade) VALUES ('student2', '372.3.202', 'דטא סיינס', 3.5, 100);

INSERT INTO MentorsReviews(mentorPhoneNumber, date, stars, `from`, content) VALUES ( '0503334444', '2.10.2021', 5, 'תלמיד חרוץ', 'המתרגל הכי טוב שיש!');
INSERT INTO MentorsReviews(mentorPhoneNumber, date, stars, `from`, content) VALUES ( '0503334444', '4.10.2021', 5, 'תלמיד חרוץ 2', 'המתרגל הכי טוב שיש!');

INSERT INTO MentorsCourses(mentorPhoneNumber, course) VALUES ('0503334444', 'חשבונאות');
INSERT INTO MentorsCourses(mentorPhoneNumber, course) VALUES ('0503334444', 'חדווא 1');

INSERT INTO Mentors(phoneNumber, firstName, lastName, about, availability, teachingPrivateLessons, pricePerHour) VALUES ('0503334444', 'ניר', 'תברשש', 'מתרגל פצץ', 'פנוי', true, 200);

INSERT INTO ContactMessages (name, email, subject, message) VALUES ('נעימה', 'naimma@post.bgu.ac.il', 'יש אפליקציה?' ,'האתר לא עובד לי בפלאפון, האם יש כבר אפליקציה');

INSERT INTO OurMarathons(courseNum, courseName, `type`, mentor, placesAvi, numOfReg, startDate) VALUES('372.3.202', 'חשבונאות', '2', 'Master itzik', 30, 10, '11.10.2021');
INSERT INTO OurMarathons(courseNum, courseName, `type`, mentor, placesAvi, numOfReg, startDate) VALUES('372.3.202', 'כלכלה', '1', 'Master splinter', 30, 21, '28.10.2021');

INSERT INTO Documents(title, caption ,`file`) VALUES ('Math101', 'intro to math', 'Math101.pdf');

INSERT INTO HWforum(course, title, content) VALUES('372.3.202', 'עזרה בשאלה 2', 'מישהו יודע למה הרכבת הגיע לםני המכונית?');

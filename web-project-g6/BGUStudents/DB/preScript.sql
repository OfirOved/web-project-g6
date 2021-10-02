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

INSERT INTO Users (username, `password`) VALUES ('ofir oved', '123456');
INSERT INTO UsersYears (username, `year`, `group`) VALUES ('ofir oved', 2021, 1);
INSERT INTO CommitteeMessages (`year`, `group`, date, `from`, title, message) VALUES (2021, 1, '02.10.2021', 'ועד שנתון 2019', 'פקטור בקורס חקבץ מועד א', 'קיבלנו פקטור במועד א מן הרמצה בסך 5 נקודות');
INSERT INTO Todos (username, task, dueDate) VALUES ('ofir oved', 'מעבדה ב react', '20.10.2021' );
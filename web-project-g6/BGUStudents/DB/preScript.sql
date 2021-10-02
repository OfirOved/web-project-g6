-- script for building all SQL tables for our project
DROP DATABASE `web-project-g6`;

CREATE DATABASE `web-project-g6`;

USE `web-project-g6`;

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




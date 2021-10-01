-- script for building all SQL tables for our project
DROP DATABASE `web-project-g6`;

CREATE DATABASE `web-project-g6`;

USE `web-project-g6`;

CREATE TABLE Mentors(
    PhoneNumber VARCHAR(10) PRIMARY KEY,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    About VARCHAR(255), 
    Availability VARCHAR(255) NOT NULL,
    TeachingPrivateLessons BOOL NOT NULL,
    PricePerHour INT
);

CREATE TABLE MentorsCourses(
    MentorPhoneNumber VARCHAR(10),
    Course VARCHAR(255)
);

CREATE TABLE MentorsReviews(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    MentorPhoneNumber VARCHAR(10),
    Date DATETIME NOT NULL,
    Stars INT NOT NULL,
    Reviewer VARCHAR(255) NOT NULL,
    Content VARCHAR(255) NOT NULL
);




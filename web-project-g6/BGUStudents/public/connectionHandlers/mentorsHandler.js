// Client Handler functions

import {GET, POST} from './clientHandler.js';

export const buildMentor = function(phone, firstName, lastName, about, courses, availability, teachingPrivateLessons, price) {
    return { 
        phoneNumber: phone, 
        firstName: firstName,
        lastName: lastName,
        about: about,
        courses: courses,
        availability: availability,
        teachingPrivateLessons: teachingPrivateLessons,
        pricePerHour: price
    };
} 

export const buildSearchReq = function(firstName, courseName) {
    return {
        firstName: firstName,
        courseName: courseName
    };
}

export const sendCreateMentor = function(mentor, onSuccess = null, onFail = null) {
    POST('/mentors', mentor, onSuccess, onFail);
}

export const sendGetMentors = function(onSuccess, searchReq = null, onFail = null) {
    GET('/mentors', searchReq, onSuccess);
}
import {GET, POST} from './clientHandler.js';

export const createMarathon = function(courseNum,  courseName, type, mentor, placesAvi, numOfReg, startDate) {
    return {
        courseNum: courseNum,
        courseName: courseName,
        type: type,
        mentor: mentor,
        placesAvi: placesAvi,
        numOfReg: numOfReg,
        startDate: startDate
    };
}

export const sendGetMarathons = function(onSuccess) {
    GET('/marathons', null, onSuccess);
}
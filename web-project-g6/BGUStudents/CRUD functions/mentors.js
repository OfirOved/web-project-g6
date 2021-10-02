const sql = require('../DB/db.js');

const createMentor = function(req, res) {
    let mentor = req.body;

    if(mentor === undefined) {
        res.status(400).send({message: "error in creating mentor got undifend"});
    }

    let insertMentor = `INSERT INTO Mentors (phoneNumber, firstName, lastName, about, availability, teachingPrivateLessons, pricePerHour) 
        VALUES ('${mentor.phoneNumber}', '${mentor.firstName}', '${mentor.lastName}', '${mentor.about}','${mentor.availability}', ${mentor.teachingPrivateLessons}, ${mentor.pricePerHour});`;
    
    sql.query(insertMentor, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating mentor: " + err});
        }
        else {
            res.status(200).send();
        }
    });

    if(mentor.courses != undefined && mentor.courses.length != 0) {
        let insertMentorCourses = `INSERT INTO MentorsCourses (MentorPhoneNumber, Course) VALUES `;
        mentor.courses.forEach(course => {
            insertMentorCourses += `('${mentor.phoneNumber}', '${course}'), `    
        });
        insertMentorCourses = insertMentorCourses.slice(0, -2);
        insertMentorCourses += ";"
    
        sql.query(insertMentorCourses, (err, sqlRes) => {
            if (err) {
                console.log("error: ", err);
                res.status(400).send({message: "error in creating mentor: " + err});
            }
            else {
                res.status(200).send();
            }
        });
    }
}

const getMentor = function(req, res) {
    let mentorPhoneNumber = req.params.phoneNumber;
    if(req == null) {
        res.status(400).send({message: "invalid request for get mentor"});
    }

    helperGetMentor(res, mentorPhoneNumber, (mentors) => {
        let mentor = mentors[0];
        helperGetMentorCourses(res, mentorPhoneNumber, (courses)=> {
            console.log(courses);
            mentor.courses = courses.map(x => x.Course);
            helperGetMentorReviews(res, mentorPhoneNumber, (reviews) => {
                mentor.reviews = reviews;
                res.status(200).send(mentor);
            });
        });
    });     
}

const getMentors = function(req, res) {
    
    let searchReq = req.query;

    let getQuery = 
    `SELECT * FROM Mentors 
    LEFT JOIN MentorsCourses 
    ON Mentors.PhoneNumber = MentorsCourses.MentorPhoneNumber`

    if(searchReq != undefined) {
        if(searchReq.firstName != null) {
            getQuery += ` WHERE Mentors.FirstName = '${searchReq.firstName}';`;
        }
        else if(searchReq.courseName != null) {
            getQuery += ` WHERE MentorsCourses.course = '${searchReq.courseName}';`;
        }
    }

    sql.query(getQuery, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating mentor: " + err});
        }
        else {
            let output = buildMentorsContract(sqlRes);
            res.status(200).send(output);
        }
    });
}

const createMentorReview = function(req, res) {
    let request = req.body;
    let insertMentor = `INSERT INTO MentorsReviews (mentorPhoneNumber, date, stars, \`from\`, content) 
    VALUES ('${request.mentorPhoneNumber}', '${request.date}', ${request.stars}, '${request.from}', '${request.content}');`;

    sql.query(insertMentor, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating mentor: " + err});
        }
        else {
            res.status(200).send();
        }
    });
}

function buildMentorsContract(sqlRes) {
    let coursesPerMentor = {};
    sqlRes.forEach(row => {
        if(coursesPerMentor[row.phoneNumber] == undefined ) {
            coursesPerMentor[row.phoneNumber] = [];
        }
        if(row.course != null) {
            coursesPerMentor[row.phoneNumber].push(row.course);
        }
    });

    let output = [];
    sqlRes.forEach( row => {
        if(!output.some(x => x.phoneNumber == row.phoneNumber)) {
            row.courses = coursesPerMentor[row.phoneNumber];
            delete row.course; 
            output.push(row);
        }
    });
    return output;
}

function helperGetMentor(res, mentorPhoneNumber, promise) {
    let getQueryMentor = `SELECT * FROM Mentors WHERE phoneNumber LIKE '${mentorPhoneNumber}';`
    sql.query(getQueryMentor, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating mentor: " + err});
        }
        else {
            promise(sqlRes);
        }
    });
}

function helperGetMentorCourses(res, mentorPhoneNumber, promise) {
    let getQueryCourses = `SELECT Course FROM MentorsCourses WHERE mentorPhoneNumber LIKE '${mentorPhoneNumber}';`
    sql.query(getQueryCourses, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating mentor: " + err});
        }
        else {
            promise(sqlRes);
        }
    });
}

function helperGetMentorReviews(res, mentorPhoneNumber, promise) {
    let getQueryReviews = `SELECT * FROM MentorsReviews WHERE mentorPhoneNumber LIKE '${mentorPhoneNumber}';`

    sql.query(getQueryReviews, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in creating mentor: " + err});
        }
        else {
            promise(sqlRes);
        }
    });
}

module.exports = {createMentor, getMentor, getMentors,  createMentorReview}



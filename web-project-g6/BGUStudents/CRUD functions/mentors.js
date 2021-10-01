const sql = require('../DB/db.js');

const createMentor = function(req, res) {
    let mentor = req.body;
    console.log(mentor); 
    
    let insertMentor = 
        `INSERT INTO Mentors (PhoneNumber, FirstName, LastName, About, Availability, TeachingPrivateLessons, PricePerHour) 
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

    let insertMentorCourses = "";
    if(mentor.courses != null && mentor.courses.length != 0) {
        insertMentorCourses = `INSERT INTO MentorsCourses (MentorPhoneNumber, Course) VALUES `;
        mentor.courses.forEach(course => {
            insertMentorCourses += `('${mentor.phoneNumber}', '${course}'), `    
        });
        insertMentorCourses = insertMentorCourses.slice(0, -2);
        insertMentorCourses += ";"
    }

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

function getMentor() {

}

function searchMentor() {

}

module.exports = {createMentor}




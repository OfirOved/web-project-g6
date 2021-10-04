const sql = require('../DB/db.js');

const getMarathons = function(req, res) {

    let getQuery = `SELECT courseNum, courseName, type, mentor, placesAvi, numOfReg, startDate FROM OurMarathons;`;

    console.log(getQuery);
    
    sql.query(getQuery, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in create committe message: " + err});
        }
        else {
            res.status(200).send(sqlRes);
        }
    });
};

const createMarhon = function(req, res) {
    let getQuery = `INSERT INTO Marathons();`;

    sql.query(getQuery, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in create committe message: " + err});
        }
        else {
            res.status(200).send();
        }
    });
}


module.exports = {getMarathons};



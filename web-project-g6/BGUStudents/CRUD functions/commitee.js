const sql = require('../DB/db.js');

const createCommitteeMessage = function(req, res) {

}

const getCommitteeMessages = function(req, res) {
    let username = req.params.username;
    console.log(username);
    
    if(username == undefined) {
        res.status(400).send({message: "bad request"});
    }

    let getQuery = `SELECT CommitteeMessages.date, CommitteeMessages.from, CommitteeMessages.title, CommitteeMessages.message as msg FROM UsersYears 
        LEFT JOIN CommitteeMessages 
        ON UsersYears.year = CommitteeMessages.year AND UsersYears.group = CommitteeMessages.group   
        WHERE UsersYears.username LIKE '${username}';`;

    console.log(getQuery);

    sql.query(getQuery, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in get todo: " + err});
        }
        else {
            res.status(200).send(sqlRes);
        }
    });
}

module.exports = {createCommitteeMessage, getCommitteeMessages}


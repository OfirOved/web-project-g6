const sql = require('../DB/db.js');

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

const getRequestMessages = function(req, res) {
    let getQuery = `SELECT name, date, content FROM RequestsMessages;`;

    console.log(getQuery);

    sql.query(getQuery, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in get requests: " + err});
        }
        else {
            res.status(200).send(sqlRes);
        }
    });
}

const createCommitteMessage = function(req, res) {
    let message = req.body;
    console.log(message);
    let getQuery = `INSERT INTO CommitteeMessages (\`year\`, \`group\`, date, \`from\`, title, message) 
    VALUES (${message.year}, ${message.group}, '${message.date}', '${message.from}', '${message.title}', '${message.msg}');`;

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

module.exports = {getCommitteeMessages, getRequestMessages, createCommitteMessage}


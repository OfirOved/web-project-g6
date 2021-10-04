const sql = require('../DB/db.js');

const sendMessage = function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let subject = req.body.subject;
    let message = req.body.message;
    let query = `INSERT INTO ContactMessages (name,email,subject,message) VALUES ('${name}', '${email}','${subject}', '${message}')`
    sql.query(query, function(err, sqlRes) {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in sending message: " + err });
        } else {
            res.status(200).send();
        }
    });
}

module.exports = { sendMessage }
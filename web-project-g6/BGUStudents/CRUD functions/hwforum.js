const sql = require('../DB/db.js');


const uploadMessage = function(req, res) {
    let title = req.body.title;
    let course = req.body.course;
    let content = req.body.content;
    let query = `INSERT INTO HWForum (course, title, content) VALUES ('${course}', '${title}', '${content}')`
    sql.query(query, function(err, sqlRes) {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in sending message: " + err });
        } else {
            res.status(200).send();
        }
    });

};

module.exports = { uploadMessage }
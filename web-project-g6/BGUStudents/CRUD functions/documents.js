const sql = require('../DB/db.js');


const uploadFile = function(req, res) {
    let title = req.body.title;
    let caption = req.body.caption;
    let file = req.body.file;
    console.log(title, caption, file);
    let query = `INSERT INTO Documents (title, caption, file) VALUES ('${title}', '${caption}', '${file}')`
    sql.query(query, function(err, sqlRes) {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({ message: "error in sending message: " + err });
        } else {
            res.status(200).send();
        }
    });

};

module.exports = { uploadFile }
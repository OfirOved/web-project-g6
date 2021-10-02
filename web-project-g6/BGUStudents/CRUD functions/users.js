const sql = require('../DB/db.js');

const getUserTodos = function(req, res) {

    let username = req.params.username;
    console.log(username);
    
    if(username == undefined) {
        res.status(400).send({message: "bad request"});
    }

    let getQuery = `SELECT * FROM Todos  WHERE username LIKE '${username}';`;

    sql.query(getQuery, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in get todo: " + err});
        }
        else {
            let output = sqlRes.map(x => helperBuilderTaskContract(x));
            res.status(200).send(output);
        }
    });
}

const createUserTodo = function (req, res) {
   let todo = req.body;
   let getQuery = `INSERT INTO Todos (username, task, dueDate) VALUES ('${todo.username}', '${todo.task}', '${todo.dueDate}');`;

   sql.query(getQuery, (err, sqlRes) => {
       if (err) {
           console.log("error: ", err);
           res.status(400).send({message: "error in create todo: " + err});
       }
       else {
           res.status(200).send();
       }
   });
}

const deleteUserTodo = function(req, res) {
    let id = req.params.id;
    let getQuery = `DELETE FROM Todos WHERE id = ${id};`;

    sql.query(getQuery, (err, sqlRes) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in delete todo: " + err});
        }
        else {
            res.status(200).send();
        }
    });
}

function helperBuilderTaskContract(row) {
    return {id: row.id, task: row.task, dueDate: row.dueDate};
}

module.exports = {getUserTodos, createUserTodo, deleteUserTodo}


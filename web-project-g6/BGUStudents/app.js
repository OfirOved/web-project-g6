var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db_api = require('./DB/db.js');
const { rejects } = require('assert');
const { resolve } = require('path');
const PORT = 3000;

const userCRUD = require("./CRUD functions/users");
const mentorsCRUD = require("./CRUD functions/mentors");
const commiteCRUD = require("./CRUD functions/commitee");
const contactCRUD = require("./CRUD functions/contact")
var app = express();

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/azraton/active', function(req, res, next) {
    res.render('activeAzraton');
});

app.get('/azraton/manage', function(req, res, next) {
    res.render('manageAzraton');
});

app.get('/committee', function(req, res, next) {
    res.render('committee');
});

// ---------------------------- Contact page ------------------------------------
app.get('/contact', function(req, res, next) {
    res.render('contactUs');
});
app.post('/contact', contactCRUD.sendMessage);


app.get('/documents', function(req, res, next) {
    res.render('documents');
});

app.get('/grades', function(req, res, next) {
    res.render('grades');
});

app.get('/hwforum', function(req, res, next) {
    res.render('HWforum');
});

app.get('/map', function(req, res, next) {
    res.render('map');
});

// ---------------------------- Home pages ------------------------------------

app.get('/', function(req, res, next) {
    res.render('HomePage');
});

app.get('/login', function(req, res, next) {
    res.render('LogIn');
});

app.get('/about', function(req, res, next) {
    res.render('aboutUs');
});

// ---------------------------- users API ------------------------------------

app.get('/users/:username/todos', userCRUD.getUserTodos);
app.post('/users/todos', userCRUD.createUserTodo);
app.delete('/users/todos/:id', userCRUD.deleteUserTodo);
// ---------------------------- commite API ------------------------------------

app.get('/commite/messages/:username', commiteCRUD.getCommitteeMessages);

// ---------------------------- mentors pages ------------------------------------

app.get('/mentors/create', function(req, res, next) {
    res.render('CreateMentorProfile');
});

app.get('/mentors/profile', function(req, res, next) {
    res.render('MentorProfile');
});

app.get('/mentors/search', function(req, res, next) {
    res.render('MentorsSearch');
});

// ---------------------------- mentors API ------------------------------------

app.post('/mentors', mentorsCRUD.createMentor);
app.get('/mentors', mentorsCRUD.getMentors);
app.get('/mentors/:phoneNumber', mentorsCRUD.getMentor);
app.post('/mentors/reviews', mentorsCRUD.createMentorReview);

// ----------------------------  ------------------------------------


app.get('/marathon/new', function(req, res, next) {
    res.render('newMarathon');
});

app.get('/yearly', function(req, res, next) {
    res.render('yearlyPage');
});

app.post('/db/api', function(req, res, next) {
    db_api.query(`${req.body.query}`, function(err, result) {
        if (result == undefined) {
            res.status(400).send('Data not found');
        } else {
            res.status(200).send(result)
        }
    })


});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
var is_logged_in = window.localStorage.getItem('logged_user')
var logged_user = window.localStorage.getItem('logged_user')

var users = {
    'galyaviv': "גלי אביב"
}


var users_db = {
    'galyaviv': '1234'
}

function set_user_name() {
    if (is_logged_in) {
        document.getElementById("username").innerText = `!היי, ${users[logged_user]}`
        document.getElementById("login_function").innerText = `התנתק`
    } else {
        document.getElementById("username").innerText = `!היי, אורח`
        document.getElementById("login_function").innerText = `התחבר`
    }
}

function login() {
    let username = document.getElementById("login_username").value;
    if (!username in users_db) {
        alert('שם משתמש או סיסמה לא תקינים!')
        return false;
    }
    let password = document.getElementById("login_password").value;
    if (users_db[username] != password) {
        alert('שם משתמש או סיסמה לא תקינים!')
        return false;
    }
    logged_user = username;
    window.localStorage.setItem('logged_user', username)
    window.localStorage.getItem('is_logged_in', true)
    set_user_name(username);
    window.location.href = "HomePage.html";
    // return true;
}

function login_function() {
    if (is_logged_in) {
        is_logged_in = false;
        logged_user = undefined;
        window.localStorage.removeItem('logged_user')
        window.localStorage.removeItem('is_logged_in')
    }
    window.location.href = "Login.html";
    set_user_name(logged_user)
}
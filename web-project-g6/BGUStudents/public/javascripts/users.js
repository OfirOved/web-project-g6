var is_logged_in = window.localStorage.getItem('logged_user')
var logged_user = window.localStorage.getItem('logged_user')
var current_year = {
    value: null
};
var users = {
    'galyaviv': "גלי אביב"
}


var users_db = {
    'galyaviv': '1234'
}

var classes = {
    'galyaviv': {
        '2021A': `תשפ"א 2021 תבנית א'`,
        '2021B': `תשפ"א 2021 תבנית ב'`,
    }
}

function change_yearly_value(value) {
    // console.log(value);
    current_year.value = value;
}

function set_active_classes() {
    let active_yearly = document.getElementById('activeYearly');
    // console.log(active_yearly);
    for (yearly in classes[logged_user]) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        li.appendChild(a);
        active_yearly.appendChild(li);
        a.innerText = classes[logged_user][yearly];
        a.href = '/yearly'
        a.setAttribute('id', yearly)
        let reference = document.getElementById(yearly)
        reference.onclick = change_yearly_value(classes[logged_user][yearly])
    }
}



function set_user_name() {
    if (is_logged_in) {
        document.getElementById("username").innerText = `!היי, ${users[logged_user]}`
        document.getElementById("login_function").innerText = `התנתק`
    } else {
        document.getElementById("username").innerText = `!היי, אורח`
        document.getElementById("login_function").innerText = `התחבר`
    }
    // set_active_classes()
}

function login() {
    console.log('here');
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
    set_user_name();
    // set_active_classes()
    window.location.href = "/";
    // return true;
}

function login_function() {
    console.log('log');
    if (is_logged_in) {
        is_logged_in = false;
        logged_user = undefined;
        window.localStorage.removeItem('logged_user')
        window.localStorage.removeItem('is_logged_in')
    }
    window.location.href = "/login";
    set_user_name(logged_user)
}

window.onload = function() {
    set_user_name()
    set_active_classes()
}
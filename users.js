var is_logged_in = window.localStorage.getItem('logged_user')
var logged_user = window.localStorage.getItem('logged_user')

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

function set_active_classes() {
    console.log('here');
    let active_yearly = document.getElementById('activeYearly');
    let ul = document.createElement('ul');
    active_yearly.appendChild(ul);
    console.log('here2');
    for (yearly in classes[logged_user]) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        li.appendChild(a);
        ul.appendChild(li);
        a.innerText = classes[logged_user][yearly];
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
    set_active_classes()
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
    set_user_name();
    set_active_classes()
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
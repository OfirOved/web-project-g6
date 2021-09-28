var is_logged_in = window.localStorage.getItem('is_logged_in')
var logged_user = window.localStorage.getItem('logged_user')
var logged_user_full_name = window.localStorage.getItem('logged_user_full_name')
var current_year = {
    value: null
};

var classes = {
    'galyaviv': {
        '2021A': `תשפ"א 2021 תבנית א'`,
        '2021B': `תשפ"א 2021 תבנית ב'`,
    }
}

function change_yearly_value(value) {
    current_year.value = value;
}

function set_active_classes() {
    let active_yearly = document.getElementById('activeYearly');
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
        document.getElementById("username").innerText = `!היי, ${logged_user_full_name}`
        document.getElementById("login_function").innerText = `התנתק`
    } else {
        document.getElementById("username").innerText = `!היי, אורח`
        document.getElementById("login_function").innerText = `התחבר`
    }
    // set_active_classes()
}

function login() {
    let username = document.getElementById("login_username").value;
    let password = document.getElementById("login_password").value;
    let query = `query=SELECT * FROM Users WHERE username='${username}' and password='${password}'`
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/db/api', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(query)
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let result = this.responseText.substring(1, this.responseText.length - 1);
            if (result.length == 0) {
                alert('שם משתמש או סיסמה לא תקינים!')
                return false;
            }
            let json_result = JSON.parse(result);
            logged_user = username;
            window.localStorage.setItem('logged_user', username)
            window.localStorage.setItem('is_logged_in', true)
            window.localStorage.setItem('logged_user_full_name', json_result.fullname)
            set_user_name();
            window.location.href = "/";
        }
    };
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

document.body.onload = function() {
    // console.log('HERE');
    // let coursename = 'פיסיקה 1ב'
    // let query = `query=INSERT INTO Grades VALUES ('galyaviv', '203.1.1391','${coursename}', 3.5, 91);`
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', '/db/api', true);
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhr.send(query)
    set_user_name()
    set_active_classes()
}
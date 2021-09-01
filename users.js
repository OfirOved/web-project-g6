let is_logged_in = false;
let logged_user = 'galy'

let users = {
    'galy': "גלי אביב"
}

function set_user_name(username) {
    if (is_logged_in) {
        document.getElementById("username").innerText = `!היי, ${users[username]}`
        document.getElementById("login_function").innerText = `התנתק`
    } else {
        document.getElementById("username").innerText = `!היי, אורח`
        document.getElementById("login_function").innerText = `התחבר`
    }
}


function login_function() {
    if (is_logged_in)
        is_logged_in = false;
    else
        is_logged_in = true;
    set_user_name(logged_user)
}
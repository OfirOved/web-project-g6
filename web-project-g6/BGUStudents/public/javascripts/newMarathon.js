function write_request_to_db(course_id, course_name, type, tutor, price) {
    let query = `query=INSERT INTO Marathons VALUES ('${course_id}', '${course_name}', '${type}', '${tutor}', ${price});`
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/db/api', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(query)
    console.log('sent query');
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
            alert("מרתון/עזרתון נפתח בהצלחה!");
    };
}

function sendRequestforOpenMarathon() {
    let course_id = document.getElementById('course_num').value;
    let course_name = document.getElementById('course_name').value;
    let type = document.getElementById('select_input').value;
    let tutor = document.getElementById('mentor').value;
    let price = document.getElementById('marathonPrice').value;
    write_request_to_db(course_id, course_name, type, tutor, price);
}
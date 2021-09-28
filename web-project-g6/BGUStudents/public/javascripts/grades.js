var users_grades = {};
var users_grades_original = {};


function calc_total_credit_points() {
    let total_credit_points = 0
    for (course in users_grades[logged_user]) {
        total_credit_points += users_grades[logged_user][course].credit_points
    }
    return total_credit_points
}

function calc_current_GPA() {
    let total_credit_points = 0
    let sum = 0
    for (course in users_grades_original[logged_user]) {
        sum += users_grades_original[logged_user][course].grade * users_grades_original[logged_user][course].credit_points
        total_credit_points += users_grades_original[logged_user][course].credit_points
    }
    if (total_credit_points > 0)
        return (sum / total_credit_points).toFixed(2);
    return total_credit_points
}

function add_table_record(course, tbody) {
    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = course;
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = user_gradesheet[course].name;
    let row_2_data_3 = document.createElement('td');
    row_2_data_3.innerHTML = user_gradesheet[course].credit_points;
    let row_2_data_4 = document.createElement('td');
    row_2_data_4.innerHTML = user_gradesheet[course].grade;
    let row_2_data_5 = document.createElement('td');
    let row_2_data_5_input = document.createElement('input');
    let row_2_data_6 = document.createElement('td');
    let row_2_data_6_button = document.createElement('button');
    row_2_data_6_button.style.width = "40px"
    row_2_data_6_button.style.height = "40px"
    row_2_data_6_button.innerHTML = "-"
    row_2_data_6_button.style.fontSize = "24px"
    row_2_data_6_button.style.borderRadius = "50%"
    row_2_data_6_button.style.backgroundColor = "#ffb004"
    row_2_data_6_button.style.color = "white"
    row_2_data_6_button.onclick = function() {
        delete user_gradesheet[course]
        row_2.remove();
    }
    row_2_data_5_input.style.width = "60px"
    row_2_data_5_input.style.height = "25px"
    row_2_data_5_input.style.marginInline = 'auto'
    row_2_data_5_input.style.textAlign = 'center'
    row_2_data_5_input.type = 'number'
    row_2_data_5_input.pattern = "\d"
    row_2_data_5_input.oninput = function() {
        if (this.value.length > 3) {
            this.value = this.value.slice(0, 3);
        }
    }
    row_2_data_5_input.maxLength = "3"
    row_2_data_5_input.min = '0'
    row_2_data_5_input.max = '100'
    row_2_data_5_input.placeholder = user_gradesheet[course].grade
    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2.appendChild(row_2_data_4);
    row_2.appendChild(row_2_data_5);
    row_2.appendChild(row_2_data_6);
    row_2_data_5.appendChild(row_2_data_5_input)
    row_2_data_6.appendChild(row_2_data_6_button)
    tbody.appendChild(row_2);
}


function set_gradesheet_table() {
    let table = document.getElementById("gradesheet")
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    user_gradesheet = users_grades[logged_user]
        // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "קורס";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "שם הקורס";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = `נק"ז`;
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "ציון";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "ציון אחר לחישוב";
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    thead.appendChild(row_1);
    for (course in user_gradesheet) {
        add_table_record(course, tbody)
    }
}

function is_valid_grade(grade) {
    int_grade = Number.parseInt(grade)
    return Number.isInteger(int_grade) && int_grade >= 0 && int_grade <= 100
}


function calc_GPA() {
    let total_credit_points = calc_total_credit_points()
    let current_gpa = calc_current_GPA();
    let sum = 0
    let table = document.getElementById("gradesheet")
    for (var i = 1, row; row = table.rows[i]; i++) {
        let grade = row.cells[4].firstChild.value
        if (grade == '')
            grade = row.cells[4].firstChild.placeholder
        else if (!is_valid_grade(grade)) {
            alert('הוזן ציון לא חוקי!')
            return null;
        }
        let credit_points = row.cells[2].innerHTML
        sum += credit_points * grade
    }
    let new_gpa = (sum / total_credit_points).toFixed(2);
    document.getElementById("gpa_diff").style.display = "block"
    let current_gpa_element = document.getElementById("current_gpa")
    current_gpa_element.innerText = current_gpa
    let new_gpa_element = document.getElementById("new_gpa")
    new_gpa_element.innerText = new_gpa
    let notice = document.getElementById("notice")
    let gpa_change = document.getElementById("gpa_change")
    if (new_gpa > current_gpa) {
        notice.innerText = "הממוצע השתפר ב "
        gpa_change.innerText = (Math.abs(current_gpa - new_gpa)).toFixed(2);
        gpa_change.style.color = 'green'
    } else if (new_gpa < current_gpa) {
        notice.innerText = "הממוצע ירד ב "
        gpa_change.innerText = (Math.abs(current_gpa - new_gpa)).toFixed(2);
        gpa_change.style.color = 'red'

    } else {
        notice.innerText = "אין שינוי בממוצע " + String.fromCodePoint(128517);
        gpa_change.innerText = ''
    }
}


function setup_page() {
    set_user_name()
    if (logged_user) {
        document.getElementById("table_wrapper").style.display = 'block'
        document.getElementById("calc_gpa").style.display = 'block'
    }
    let query = `query=SELECT * FROM Grades WHERE username='${logged_user}'`
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/db/api', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(query)
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let result = this.responseText;
            // let courses = result.split(',')
            let json_result = JSON.parse(result);
            console.log(json_result);
            let courses = {}
            json_result.map((course) => {
                courses[course.course_id] = {
                    name: course.course_name,
                    credit_points: course.credit,
                    grade: course.grade
                }
            })
            users_grades[logged_user] = courses;
            users_grades_original[logged_user] = courses;
            loaded_from_db = true;
            console.log(users_grades, users_grades_original);
            set_gradesheet_table()
        }
    };

}


function add_course() {
    let course_inputs = document.getElementById("course_inputs");
    course_inputs.style.display = "flex";
}

function is_number(number) {
    for (let i = 0; i < number.length; i++) {
        if (!(number[i] >= "0" && number[i] <= "9"))
            return false;
    }
    return true;
}

function is_valid_course_number(course_num) {
    let fragments = course_num.split('.')
    return fragments.length == 3 && fragments[0].length == 3 && is_number(fragments[0]) && fragments[1].length == 1 && is_number(fragments[1]) && fragments[2].length == 4 && is_number(fragments[2])
}

function add_course_to_table() {
    let tbody = document.getElementById("gradesheet").getElementsByTagName('tbody')[0];
    let course_num = document.getElementById("course_num").value;
    let course_name = document.getElementById("course_name").value;
    let course_credit = document.getElementById("course_credit").value;
    let course_grade = document.getElementById("course_grade").value;
    if (!is_valid_course_number(course_num)) {
        alert("מספר קורס אינו חוקי!")
        return false;
    }
    if (course_num in user_gradesheet) {
        alert("הקורס כבר נמצא בגליון הציונים!")
        return false;
    }
    if (!is_valid_grade(course_grade)) {
        alert("ציון קורס אינו חוקי!")
        return false;
    }
    data = {
        name: course_name,
        credit_points: Number.parseInt(course_credit),
        grade: Number.parseInt(course_grade)
    }
    user_gradesheet[course_num] = data
    add_table_record(course_num, tbody)
    alert("קורס נוסף בהצלחה!")
}


window.onload = function() {
    setup_page()
}
users_grades = {
    'galy': {
        '364.1.1291': {
            name: 'אמידה ומבחני השערות',
            credit_points: 3.5,
            grade: 85
        },
        '203.1.1391': {
            name: 'פיסיקה 1ב',
            credit_points: 3.5,
            grade: 91
        },
        '201.1.9321': {
            name: 'אלגברה לינארית',
            credit_points: 4.5,
            grade: 88
        },
        '364.1.1421': {
            name: 'פיתוח תוכנה מונחה עצמים',
            credit_points: 3.5,
            grade: 83
        },
        '202.1.9031': {
            name: 'מבוא לתכנות בJava',
            credit_points: 4,
            grade: 86
        },
        '364.1.1901': {
            name: 'בסיסי נתונים',
            credit_points: 3.5,
            grade: 95
        }
    }
}


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
    for (course in users_grades[logged_user]) {
        sum += users_grades[logged_user][course].grade * users_grades[logged_user][course].credit_points
        total_credit_points += users_grades[logged_user][course].credit_points
    }
    if (total_credit_points > 0)
        return (sum / total_credit_points).toFixed(2);
    return total_credit_points
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
        row_2_data_5.appendChild(row_2_data_5_input)
        tbody.appendChild(row_2);
    }
}

function is_valid_grade(grade) {
    int_grade = Number.parseInt(grade)
    return Number.isInteger(int_grade) && int_grade >= 0 && int_grade <= 100
}


function calc_GPA() {
    let total_credit_points = calc_total_credit_points()
    let current_gpa = calc_current_GPA();
    console.log(total_credit_points);
    console.log(current_gpa);
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


function setup_page(username) {
    login_function()
    set_gradesheet_table()
}
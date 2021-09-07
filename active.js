marathons = {
        '364.1.1291': {
            name: 'אמידה ומבחני השערות',
            type: 'מרתון',
            tutor: 'חיים כהן',
            placesAvi: 7,
            numOfPpl: 13,
            startDate: '12.09.2021'
        },

        '364.1.1901': {
            name: 'בסיסי נתונים',
            type: 'מרתון',
            tutor: 'אדיר אבן',
            placesAvi: 5,
            numOfPpl: 11,
            startDate: '30.10.2021'
        },

        '364.1.1901': {
            name: 'בסיסי נתונים',
            type: 'עזרתון',
            tutor: 'גלי אביב',
            placesAvi: 1,
            numOfPpl: 15,
            startDate: '30.11.2021'
        }
}

function set_marathons_table() {
    let table = document.getElementById("marathonsTable")
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
        // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "מספר קורס";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "שם הקורס";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = `סוג`;
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "מתרגל";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "מקומות פנויים";
    let heading_6 = document.createElement('th');
    heading_6.innerHTML = "מספר נרשמים";
    let heading_7 = document.createElement('th');
    heading_7.innerHTML = "תאריך התחלה";
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    thead.appendChild(row_1);
    for (course in user_gradesheet) {
        add_table_record(course, tbody)
    }
}

function setup_page() {
    set_user_name(logged_user)
    if (logged_user) {
        document.getElementById("table_wrapper").style.display = 'block'
        document.getElementById("calc_gpa").style.display = 'block'
    }
    set_gradesheet_table()
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
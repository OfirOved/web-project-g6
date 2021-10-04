var azraton_course_num;
var azraton_capacity = 20;

var azratons = {
    '364.1.1291': {
        course_name: 'אמידה ומבחני השערות',
        registered: 2,
        payed: 0
    }
}


var registered_students = {
    '364.1.1291': {
        313525966: 'גלי אביב',
        316308170: 'אריאל שילה'
    }
}

var waiting_lists = {
    '364.1.1291': {
        123456789: 'ישראל ישראלי',
    }
}


function set_azraton_data() {
    document.getElementById("course_name").innerText = azratons[azraton_course_num].course_name;
    document.getElementById("course_num").innerText = azraton_course_num;
    document.getElementById("payed").innerText = 'שילמו: ' + azratons[azraton_course_num].payed;
    document.getElementById("registered").innerText = 'נרשמו: ' + azratons[azraton_course_num].registered;
}


function setup_page(course_num) {
    azraton_course_num = course_num
    set_user_name();
    set_azraton_data()
    set_registered_students_table()
    set_waiting_list_students_table()
}

function display_add_student() {
    document.getElementById("add_student").style.display = 'block'
}

function is_number(number) {
    for (let i = 0; i < number.length; i++) {
        if (!(number[i] >= "0" && number[i] <= "9"))
            return false;
    }
    return true;
}



function add_student_to_azraton() {
    let id = document.getElementById("student_id").value;
    let name = document.getElementById("student_name").value;
    if (!is_number(id) || id.length != 9) {
        alert('תעודת זהות שהוכנסה אינה חוקית')
        return false;
    }
    console.log(registered_students[azraton_course_num], waiting_lists[azraton_course_num]);
    if (id in registered_students[azraton_course_num] || id in waiting_lists[azraton_course_num]) {
        alert('סטודנט זה כבר רשום לעזרתון!')
        return false;
    }
    if (Object.keys(registered_students[azraton_course_num]).length >= azraton_capacity) {
        waiting_lists[azraton_course_num][id] = name;
        let tbody_waiting_list = document.getElementById("waiting_list_students").getElementsByTagName('tbody')[0];
        add_waiting_list_table_record(id, tbody_waiting_list)
        alert('אין מקום בערתון כעת, הסטודנט ייכנס לרשימת ההמתנה')
        return false;
    }
    registered_students[azraton_course_num][id] = name;
    let tbody_registered = document.getElementById("registered_students").getElementsByTagName('tbody')[0];
    add_registered_students_table_record(id, tbody_registered)
    azratons[azraton_course_num].registered++;
    set_azraton_data();
    alert('הסטודנט נוסף בהצלחה!')
    return true;
}

function set_registered_students_table() {
    let table = document.getElementById("registered_students")
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    let azraton_registered_students = registered_students[azraton_course_num]
        // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "תעודת זהות";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "שם הסטודנט";
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    thead.appendChild(row_1);
    for (id in azraton_registered_students) {
        add_registered_students_table_record(id, tbody)
    }
}

function add_registered_students_table_record(id, tbody) {
    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = id;
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = registered_students[azraton_course_num][id];
    let row_2_data_3 = document.createElement('td');
    let row_2_data_3_button = document.createElement('button');
    row_2_data_3_button.style.width = "40px"
    row_2_data_3_button.style.height = "40px"
    row_2_data_3_button.innerHTML = "-"
    row_2_data_3_button.style.fontSize = "24px"
    row_2_data_3_button.style.borderRadius = "50%"
    row_2_data_3_button.style.backgroundColor = "#ffb004"
    row_2_data_3_button.style.color = "white"
    row_2_data_3_button.onclick = function() {
        delete registered_students[azraton_course_num][id]
        row_2.remove();
        azratons[azraton_course_num].registered--;
        set_azraton_data();
    }
    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2_data_3.appendChild(row_2_data_3_button)
    tbody.appendChild(row_2);
}


function set_waiting_list_students_table() {
    // console.log('eere');
    let table = document.getElementById("waiting_list_students")
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    let azraton_waiting_list_students = waiting_lists[azraton_course_num]
        // Creating and adding data to first row of the table
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "תעודת זהות";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "שם הסטודנט";
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    thead.appendChild(row_1);
    for (id in azraton_waiting_list_students) {
        add_waiting_list_table_record(id, tbody)
    }
}

function add_waiting_list_table_record(id, tbody) {
    let row_2 = document.createElement('tr');
    let row_2_data_1 = document.createElement('td');
    row_2_data_1.innerHTML = id;
    let row_2_data_2 = document.createElement('td');
    row_2_data_2.innerHTML = waiting_lists[azraton_course_num][id];
    let row_2_data_3 = document.createElement('td');
    let row_2_data_3_button = document.createElement('button');
    row_2_data_3_button.style.width = "40px"
    row_2_data_3_button.style.height = "40px"
    row_2_data_3_button.innerHTML = "-"
    row_2_data_3_button.style.fontSize = "24px"
    row_2_data_3_button.style.borderRadius = "50%"
    row_2_data_3_button.style.backgroundColor = "#ffb004"
    row_2_data_3_button.style.color = "white"
    row_2_data_3_button.onclick = function() {
        delete waiting_lists[azraton_course_num][id]
        row_2.remove();
    }
    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2_data_3.appendChild(row_2_data_3_button)
    tbody.appendChild(row_2);
}
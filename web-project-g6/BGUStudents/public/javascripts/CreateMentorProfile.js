var courses = {};

function buildMentor(phone, firstName, lastName, about, courses, availability, teachingPrivateLessons, price) {
    return { 
        phoneNumber: phone, 
        firstName: firstName,
        lastName: lastName,
        about: about,
        courses: courses,
        availability: availability,
        teachingPrivateLessons: teachingPrivateLessons,
        pricePerHour: price
    };
} 

function sendCreateMentor(mentor, onSuccess = null, onFail = null) {
    POST('/mentors', mentor, onSuccess, onFail);
}

function sendRequestforOpenMentorProfile() {
    let phone = document.getElementById("phone").value;
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let about = document.getElementById("about").valueL;
    let availability = document.getElementById("availability");
    availability = availability.options[availability.selectedIndex].text;
    
    let teachingPrivateLessons = document.getElementById("teachingPrivateLessons").value;
    if(teachingPrivateLessons == "yes") {
        teachingPrivateLessons = true;
    }
    else {
        teachingPrivateLessons = false;
    }
    
    let price = document.getElementById("price").value;
    price = parseInt(price);

    let mentor = buildMentor(phone, firstName, lastName, about, Object.keys(courses), availability, teachingPrivateLessons, price);
    console.log(mentor);

    let onSuccess = () => alert("פרופיל נפתח בהצלחה");
    sendCreateMentor(mentor, onSuccess);
    clearPage();
}

function clearPage() {
    courses = {};
    document.getElementById("phone").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("about").value = "";
    document.getElementById("availability").selectedIndex = 0;
    document.getElementById("teachingPrivateLessons").selectedIndex = 0;
    document.getElementById("price").value = "";
}

function initCourses() {
    let coursesElement = document.getElementById("courses");
    let lastChild = coursesElement.lastChild;
    if(lastChild != null) {
        coursesElement.removeChild(lastChild);
    }
    let newCourses = buildCoursers();
    document.getElementById("courses").appendChild(newCourses);
}

function onInsertCourse() {
    let course = document.getElementById("course").value;
    if(courses[course] != null) {
        alert("הקורס נבחר כבר");
        return;
    }
    courses[course] = course;
    initCourses();
}

function buildCoursers() {
    let children = [];
    Object.keys(courses).forEach(course => {
        children.push(buildCourse(course));
    });
    return buildChild("ul", "coursesViewUl", children);
}

function buildCourse(course) {
    let text = buildText(course);
    let removeText = buildText("✗");
    let remvoeButton = buildButton("courseRemoveButton", [removeText]);
    remvoeButton.onclick = () => deleteCourse(course);
    let child = buildChild("li", "coursesViewLi", [text, remvoeButton]);
    return child;
}

function buildButton(className, children = []) {
    let child = buildChild("button", className, children);
    child.type = "button";
    return child;
}

function buildChild(type, className, children = []) {
    let element = document.createElement(type);
    element.classList.add(className);
    children.forEach(child => {
        element.appendChild(child)
    });
    return element;
}

function buildText(text) {
    let child = document.createElement("text");
    child.innerHTML = text;
    return child;
}

function deleteCourse(course) {
    delete courses[course];
    initCourses();
}

// Client Handler functions

function buildHttpRequest() {
    return httpRequest;
}

function GET(URL, obj, onSuccess = null, onFail = null) {
    let body = JSON.stringify(obj);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', URL, true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.open('GET', URL, true);
    httpRequest.send(body);
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 && onSuccess != null) {
            onSuccess();
        }
    };
}

function POST(URL, obj, onSuccess = null, onFail = null) {
    let body = JSON.stringify(obj);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', URL, true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(body);
    httpRequest.onreadystatechange = function() {
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200 && onSuccess != null) {
            onSuccess();
        }
    };
}
import { buildMentor, sendCreateMentor} from '../connectionHandlers/mentorsHandler.js';

// add global window functions
window.sendRequestforOpenMentorProfile = sendRequestforOpenMentorProfile;
window.onInsertCourse = onInsertCourse;

var courses = {};

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
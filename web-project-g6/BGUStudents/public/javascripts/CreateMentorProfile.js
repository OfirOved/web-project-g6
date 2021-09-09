var courses = {};

function sendRequestforOpenMentorProfile() {
    alert("פרופיל נפתח בהצלחה");
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
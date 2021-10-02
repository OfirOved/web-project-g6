import {sendGetMentors, buildSearchReq} from '../connectionHandlers/mentorsHandler.js'

window.onload = () => initMentorsPage();
window.openMyMentorProfie = openMyMentorProfie;
window.editMyMentorProfile = editMyMentorProfile;
window.search = () => {
    let searchRequest = null;
    let onName = document.getElementById("name").checked;
    let onCourseName = document.getElementById("course").checked;
    let searchvalue = document.getElementById("searchInput").value;
    console.log(onName);
    console.log(searchvalue);
    
    if(onName && searchvalue.length > 0) {
        searchRequest = buildSearchReq(searchvalue, null);
    }
    else if(onCourseName && searchvalue.length > 0) {
        searchRequest = buildSearchReq(null, searchvalue);
    }

    console.log(searchRequest);


    let onSuccess = (result) =>  {
        initMentors(result);
    };
    sendGetMentors(onSuccess, searchRequest);

    var mentorSection = document.getElementById("mentorsSection");
    mentorSection.removeChild(mentorSection.lastChild);

};

var mentors = [];

const OrderBy = {
    none: 0,
    firstName: 1,
    lastName: 2,
    courses: 3,
    privateLesssons: 4,
    phoneNumber: 5,
    availability: 6
};

const OrderType = {
    ascending: 1,
    descending: 2
}

var selectedOrderBy = OrderBy.firstName;
var selectedOrderType = OrderType.ascending;

function initMentorsPage() {
    let onSuccess = (result) =>  {
        initMentors(result);
    };
    sendGetMentors(onSuccess);
}

function initMentors(mentorsList) {
    mentors = mentorsList;
    var elements = [];
    // build headers
    var firstNameHeader = buildHeader(OrderBy.firstName, "שם פרטי");
    var lastNameHeader = buildHeader(OrderBy.lastName, "שם משפחה");
    var corusesHeader = buildHeader(OrderBy.courses, "קורסים");
    var privateLessonsHeader = buildHeader(OrderBy.privateLesssons, "שיעורים פרטיים");
    var availabilityHeader = buildHeader(OrderBy.availability, "זמינות");
    var phnoeHeader = buildHeader(OrderBy.phoneNumber, "טלפון");
    var headeres = buildChild("tr", "mentorsHeaders", [firstNameHeader, lastNameHeader, corusesHeader, privateLessonsHeader, availabilityHeader, phnoeHeader]);
    elements.push(headeres);

    // build rows
    if(mentors !== undefined && mentors.length > 0) {
        mentors.forEach(mentor => {
            elements.push(buildCustomMentor(mentor));
        });
    }

    // build table
    let table = buildChild("table", "mentorsTable", elements);
    document.getElementById("mentorsSection").appendChild(table);
}

function buildHeader(orderBy, headerText) {
    let element = null;
    if (orderBy == selectedOrderBy) {
        let orderByTypeElement = buildOrderType(selectedOrderType);
        let textHeader = buildText(headerText);
        element = buildChild("th", "mentorsHeader", [textHeader, orderByTypeElement]);
    } else {
        element = buildChildWithText("th", "mentorsHeader", headerText);
    }
    element.onclick = () => onChangeOrderBy(orderBy);
    return element;
}

function buildOrderType(orderType) {
    let text = '↑';
    if (orderType == OrderType.ascending) {
        text = '↓';
    }
    let child = buildText(text);
    child.style.padding = "5px";
    return child;
}

function buildCustomMentor(mentor) {
    var firstName = buildChildWithText("td", "mentorCol", mentor.firstName);
    var lastName = buildChildWithText("td", "mentorCol", mentor.lastName);
    var coruses = buildMentorCourses(mentor.courses);
    var privateLessons = buildMentorPrivateLeason(mentor.teachingPrivateLessons);
    var availability = buildChildWithText("th", "mentorCol", mentor.availability);
    var phnoe = buildChildWithText("td", "mentorCol", mentor.phoneNumber);
    var row = buildChild("tr", "mentorRow", [firstName, lastName, coruses, privateLessons, availability, phnoe]);
    row.onclick = () => openMentorProfile(mentor);
    return row;
}

function buildMentorCourses(courses) {
    let elements = [];
    if(courses !== undefined) {
        courses.forEach(course => {
            let element = buildChildWithText("li", "course", course);
            elements.push(element);
        });
    }
    let lst = buildChild("ul", "courses", elements);
    return buildChild("td", "mentorCol", [lst]);
}

function buildMentorPrivateLeason(teachingPrivateLessons) {
    let text = "לא";
    if (teachingPrivateLessons) {
        text = "כן";
    }
    return buildChildWithText("td", "mentorCol", text);
}

function buildChildWithText(type, className, text) {
    let childElement = buildText(text);
    return buildChild(type, className, [childElement]);
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
    let childElement = document.createElement("text");
    childElement.innerHTML = text;
    return childElement;
}

function openMyMentorProfie() {
    location.href = "/mentors/profile";
}

function editMyMentorProfile() {
    let content = 'לא נמצא פרופיל קיים!';
    alert(content);
}

function openMentorProfile(mentor) {
    window.location = "/mentors/profile";
    console.log(mentor);
}

function onChangeOrderBy(orderBy) {
    console.log(orderBy);
    if (orderBy != selectedOrderBy) {
        selectedOrderBy = orderBy;
        selectedOrderType = OrderType.ascending;
    } else {
        selectedOrderType = flipOrderType(selectedOrderType);
    }
    mentorsOrderBy(selectedOrderBy, selectedOrderType);
    var mentorSection = document.getElementById("mentorsSection");
    mentorSection.removeChild(mentorSection.lastChild);
    initMentors(mentors);
}

function flipOrderType(orderType) {
    if (orderType == OrderType.descending) {
        return OrderType.ascending;
    }
    return OrderType.descending;
}

function mentorsOrderBy(orderBy, orderByType) {
    switch (orderBy) {
        case OrderBy.firstName:
            mentorsOrderByFirstName(orderByType);
            break;
        case OrderBy.lastName:
            mentorsOrderByLastName(orderByType);
            break;
        case OrderBy.courses:
            mentorsOrderByCourses(orderByType);
            break;
        case OrderBy.privateLesssons:
            mentorsOrderByPrivateLessons(orderByType);
            break;
        case OrderBy.phoneNumber:
            mentorsOrderByPhoneNummber(orderByType);
            break;
        case OrderBy.availability:
            mentorsOrderByAvailability(orderByType);
            break;
        default:
            break;
    }
}

function mentorsOrderByFirstName(orderByType) {
    let comapareFunc = (current, next) => current.firstName.localeCompare(next.firstName);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    mentors.sort(comapareFunc);
}

function mentorsOrderByLastName(orderByType) {
    let comapareFunc = (current, next) => current.lastName.localeCompare(next.lastName);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    mentors.sort(comapareFunc);
}

function mentorsOrderByCourses(orderByType) {
    let comapareFunc = (current, next) => current.courses.length > next.courses.length ? 1 : -1;
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    mentors.sort(comapareFunc);
}

function mentorsOrderByPrivateLessons(orderByType) {
    let comapareFunc = (current, next) => {
        return current.privateLessons > next.privateLessons ? 1 : -1;
    };
    mentors.sort(comapareFunc);
}

function mentorsOrderByPhoneNummber(orderByType) {
    let comapareFunc = (current, next) => current.phoneNumber.localeCompare(next.phoneNumber);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    mentors.sort(comapareFunc);
}

function mentorsOrderByAvailability(orderByType) {
    let comapareFunc = (current, next) => current.availability.localeCompare(next.availability);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    mentors.sort(comapareFunc);
}

function getCompareFunc(comapareFunc, orderByType) {
    if (orderByType == OrderType.descending) {
        return (current, next) => -comapareFunc(current, next);
    }
    return comapareFunc;
}

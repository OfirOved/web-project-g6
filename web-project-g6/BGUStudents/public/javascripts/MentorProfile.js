import { buildMentorReview, sendGetMentor, sendCreateMentorReview } from '../connectionHandlers/mentorsHandler.js'

window.onload = () => init();
window.onAddReview = onAddReview;

/*var reviews = [
    createReview("6.9.2021", [ true, true, true, true, true], "קובי", "החונך הכי טוב בדיקנאט"),
    createReview("8.9.2021", [ true, true, true, true, false], "קובי", "קיבלתי בזכותו 90"),
];
*/

var stars = [ false, false, false, false, false];
var maxStars = 5;

function init() {
    initStars();

    let onSuccess = (mentor) => {
        console.log(mentor);
        initMentor(mentor);
        initReviews(mentor.reviews);   
    }
    let phoneNumber = window.localStorage.mentorPhoneNumber;
    sendGetMentor(phoneNumber, onSuccess);
}

function initMentor(mentor) {
    buildPic("../images/profilePic.png");
    buildName(mentor.firstName, mentor.lastName);
    buildAbout(mentor.about);
    buildCourses(mentor.courses);
    buildAvailability(mentor.availability);
    buildPrivateLessons(mentor.teachingPrivateLessons);
    buildPricePerHour(mentor.pricePerHour);
    buildPhoneNumber(mentor.phoneNumber);
}

function buildPic(url) {
    let child = buildImage(url);
    appendChild("mentorPic", child);
}

function buildName(firstName, lastName) {
    let text = buildText(firstName + " "+lastName, "h2");
    let child = buildChild("div", "attributeText", [text]);
    appendChild("mentorName", child);
}

function buildAbout(about) {
    let text = buildText(about);
    let child = buildChild("div", "attributeText", [text]);
    appendChild("mentorAbout", child);
}

function buildCourses(courses) {
    console.log(courses);
    let children = [];
    courses.forEach(course => {
        let text = buildText(course);
        let child = buildChild("li", "mentorCoursesLi", [text]);
        children.push(child);
    });
    let child = buildChild("ul","mentorCoursesUl", children);
    appendChild("mentorCourses", child);
}

function buildAvailability(availability) {
    let text = buildText(availability);
    let child = buildChild("div", "attributeText", [text]);
    appendChild("mentorAvailability", child);
}

function buildPrivateLessons(teachingPrivateLessons) {
    let text = "כן";
    if(!teachingPrivateLessons) {
        text = "לא";
    }
    let textChild = buildText(text);
    let child = buildChild("div", "attributeText", [textChild]);
    appendChild("mentorPrivateLessons", child);
}

function buildPricePerHour(price) {
    let text = price + " שקל";
    let textChild = buildText(text);
    let child = buildChild("div", "attributeText", [textChild]);
    appendChild("mentorPricePerHour", child);
}

function buildPhoneNumber(phoneNumber) {
    let textChild = buildText(phoneNumber);
    let child = buildChild("div", "attributeText", [textChild]);
    appendChild("mentorPhone", child);   
}

function initStars() {
    let index = 0;
    let children = [];
    stars.forEach(star => {
        children.push(buildStar(star,index ));
        index++;
    });
    
    let child = buildChild("div", "stars", children);
    appendChild("stars", child);
}

function buildStar(star, index, onclick = true) {
    let fullStar = "🟊";
    let emptyStar = "🟊";
    let element;
    if(star) {
        element = buildText(fullStar);
        element.classList.add("fullStar");
    }
    else {
        element = buildText(emptyStar);
        element.classList.add("emptyStar");
    }
    if(onclick) {
        element.onclick = () => toggleStar(index);
    }
    return element;
}

function initReviews(reviews) {
    let children = [];

    reviews.forEach(review => {
        let child = buildReview(review);
        children.push(child);
    });
    let child = buildChild("div", "allReviews", children);
    appendChild("reviews", child);
}

function buildReview(review) {
    let starChild = buildStarsForReview(review.stars);
    let dateChild = buildText(review.date);
    dateChild.classList.add("reviewDate");
    let fromChild = buildText(review.from, "h3");
    fromChild.classList.add("reviewFrom");
    let contentChild = buildText(review.content);
    contentChild.classList.add("reviewContent");
    return buildChild("div","review",[contentChild, fromChild, dateChild, starChild]);
}

function buildStarsForReview(starsNum) {
    let children = [];
    let stars = new Array(maxStars).fill(false);
    for(let i=0; i < maxStars && i < starsNum; i++) {
        stars[i] = true;
    }
    stars.forEach(star => {
        children.push(buildStar(star, 0, false));
    });
    return buildChild("div", "reviewStar", children);
}

function buildChild(type, className, children = []) {
    let element = document.createElement(type);
    element.classList.add(className);
    children.forEach(child => {
        element.appendChild(child);
    });
    return element;
}

function buildText(text, type = "text") {
    let childElement = document.createElement(type);
    childElement.innerHTML = text;
    return childElement;
}

function buildImage(url) {
    let childElement = document.createElement("img");
    childElement.src = url;
    return childElement;
}

function appendChild(elementName, child) {
    let element =  document.getElementById(elementName);
    // remove last child if needed
    let lastChild = element.lastChild;
    if(lastChild != null) {
        element.removeChild(lastChild);
    }
    // append new child
    element.appendChild(child);
}

function toggleStar(index) {
    stars[index] = !stars[index]; 
    stars.sort((cur, next) => cur < next ? 1 : -1);
    initStars();
}

function onAddReview() {
    let writer = document.getElementById("writer").value
    let comment = document.getElementById("comment").value;
    
    let copyStars = stars.reduce((acc, cur) => cur ? acc + 1 : acc, 0);
    let date = new Date().toString();
    let phoneNumber = window.localStorage.mentorPhoneNumber;

    let review = buildMentorReview(date, copyStars, writer, comment, phoneNumber);
    let onSucces = () => {
        alert('ביקורת נוספה בהצלחה.')
        init();
    }

    sendCreateMentorReview(review, onSucces);

}
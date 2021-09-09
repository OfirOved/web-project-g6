
var marathons = [];
marathons.push(createMarathon('201.1.1111', 'אלגברה לינארית', true, 'ניר ברששת', 1, 15, '12.09.21'));
marathons.push(createMarathon('201.2.1331', 'חדו"א 2', false, 'אורי יחזקאל',6, 10, '30.09.21'));

const OrderBy = {
    none: 0,
    courseNum: 1,
    courseName: 2,
    type: 3,
    mentor: 4,
    placesAvi: 5,
    numOfReg: 6,
    startDate: 7
};

const OrderType = {
    ascending: 1,
    descending: 2
}

var selectedOrderBy = OrderBy.courseNum;
var selectedOrderType = OrderType.ascending;

function createMarathon(courseNum,  courseName, type, mentor, placesAvi, numOfReg, startDate) {
    return {
        courseNum: courseNum,
        courseName: courseName,
        type: type,
        mentor: mentor,
        placesAvi: placesAvi,
        numOfReg: numOfReg,
        startDate: startDate
    };
}

function init() {
    initMarathons();
}

function initMarathons() {
    var elements = [];
    // build headers
    var courseNumHeader = buildHeader(OrderBy.courseNum, "מספר קורס");
    var courseNameHeader = buildHeader(OrderBy.courseName, "שם הקורס"); 
    var typeHeader = buildHeader(OrderBy.type, "סוג");
    var mentorHeader = buildHeader(OrderBy.mentor, "מתרגל");
    var placesAviHeader = buildHeader(OrderBy.placesAvi, "מקומות פנויים");   
    var numOfRegHeader =   buildHeader(OrderBy.numOfReg, "מספר נרשמים");
    var startDateHeader =   buildHeader(OrderBy.startDate, "תאריך התחלה");
    var headeres = buildChild("tr", "marathonsHeaders", [courseNumHeader, courseNameHeader, typeHeader, mentorHeader, placesAviHeader, numOfRegHeader, startDateHeader]);
    elements.push(headeres);

    // build rows
    marathons.forEach(marathon => {
        elements.push(buildCustomMarathon(marathon));
    });

    // build table
    let table = buildChild("table", "marathonsTable", elements);
    document.getElementById("marathonsSection").appendChild(table);
}

function buildHeader(orderBy, headerText) {
    let element = null;
    if(orderBy == selectedOrderBy) {
        let orderByTypeElement = buildOrderType(selectedOrderType);
        let textHeader = buildText(headerText);
        element = buildChild("th", "marathonsHeader", [textHeader, orderByTypeElement]);   
    }
    else {
        element = buildChildWithText("th", "marathonsHeader", headerText);
    }
    element.onclick = () => onChangeOrderBy(orderBy);
    return element;
}

function buildOrderType(orderType) {
    let text = '↑';
    if(orderType == OrderType.ascending) {
        text = '↓';
    }
    let child = buildText(text);
    child.style.padding = "5px";
    return child;
}

function buildCustomMarathon(marathon) {
    var courseNum = buildChildWithText("td", "marathonCol", marathon.courseNum);
    var courseName = buildChildWithText("td", "marathonCol", marathon.courseName);
    var type = buildMarathonType(marathon.type);
    var mentor = buildChildWithText("th", "marathonCol", marathon.mentor);   
    var placesAvi = buildChildWithText("td", "marathonCol", marathon.placesAvi);
    var numOfReg = buildChildWithText("td", "marathonCol", marathon.numOfReg);
    var startDate = buildChildWithText("td", "marathonCol", marathon.startDate);
    var row = buildChild("tr", "marathonRow", [courseNum, courseName, type, mentor, placesAvi, numOfReg, startDate]);
    return row;
}

function buildMarathonType(type) {
    let text = "עזרתון"; 
    if(type) {
        text = "מרתון";
    }
    return buildChildWithText("td", "marathonCol", text);
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

function onChangeOrderBy(orderBy) {
    console.log(orderBy);
    if(orderBy != selectedOrderBy) {
        selectedOrderBy = orderBy;
        selectedOrderType = OrderType.ascending;    
    }
    else {
        selectedOrderType = flipOrderType(selectedOrderType);
    }
    marathonsOrderBy(selectedOrderBy, selectedOrderType);
    var marathonsSection = document.getElementById("marathonsSection");
    marathonsSection.removeChild(marathonsSection.lastChild);
    initMarathons();
}

function flipOrderType(orderType) {
    if(orderType == OrderType.descending) {
        return OrderType.ascending;
    }
    return OrderType.descending;
}

function marathonsOrderBy(orderBy, orderByType) {
   switch(orderBy) {
        case OrderBy.courseNum: marathonsOrderBycourseNum(orderByType); break;
        case OrderBy.courseName: marathonsOrderBycourseName(orderByType); break;
        case OrderBy.type: marathonsOrderBytype(orderByType); break;
        case OrderBy.mentor: marathonsOrderBymentor(orderByType); break;
        case OrderBy.placesAvi: marathonsOrderByplacesAvi(orderByType); break;
        case OrderBy.numOfReg: marathonsOrderBynumOfReg(orderByType); break;
        case OrderBy.startDate: marathonsOrderBystartDate(orderByType); break;
        default: break;
   }
}

function marathonsOrderBycourseNum(orderByType) {
    let comapareFunc = (current, next) => current.courseNum.localeCompare(next.courseNum);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    marathons.sort(comapareFunc);
}

function marathonsOrderBycourseName(orderByType) {
    let comapareFunc = (current, next) => current.courseName.localeCompare(next.courseName);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    marathons.sort(comapareFunc);
}

function marathonsOrderBytype(orderByType) {
    let comapareFunc = (current, next) => {
        return current.type > next.type ? 1 : -1;
    };
    marathons.sort(comapareFunc);
}

function  marathonsOrderBymentor(orderByType) {
    let comapareFunc = (current, next) => current.mentor.localeCompare(next.mentor);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    marathons.sort(comapareFunc);
}

function marathonsOrderByplacesAvi(orderByType) {
    let comapareFunc = (current, next) => current.placesAvi.localeCompare(next.placesAvi);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    marathons.sort(comapareFunc);
}

function marathonsOrderBynumOfReg(orderByType) {
    let comapareFunc = (current, next) => current.numOfReg.localeCompare(next.numOfReg);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    marathons.sort(comapareFunc);
}

function marathonsOrderBystartDate(orderByType) {
    let comapareFunc = (current, next) => current.startDate.localeCompare(next.startDate);
    comapareFunc = getCompareFunc(comapareFunc, orderByType);
    marathons.sort(comapareFunc);
}

function getCompareFunc(comapareFunc, orderByType) {
    if(orderByType == OrderType.descending) {
        return (current, next) => -comapareFunc(current, next);
    }
    return comapareFunc;
}

function sendRequestforReg() {
    alert("ההרשמה נקלטה בהצלחה!");
}

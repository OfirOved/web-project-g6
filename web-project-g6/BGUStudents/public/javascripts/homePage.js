var myMessages = [];
myMessages.push(createMessage('6.9.2021', 'ועד שנתון 2019', 'פנייתך התקבלה', 'מס פנייה 20202013'));
myMessages.push(createMessage('6.9.2021', 'ועד שנתון 2019', 'פקטור בקורס חקבץ מועד א', 'קיבלנו פקטור במועד א מן הרמצה בסך 5 נקודות'));
myMessages.push(createMessage('6.9.2021', 'ועד שנתון 2019', 'הנחה לכרטיסים לפנגויה', 'הזינו קוד קופון 123456789 בשביל לקבל הנחה לאפנגויה'));

var todos = [];
todos.push(createTodo("עבודה להגשה פיזיקה" , "26.9.2021"));
todos.push(createTodo("לקרוא פרק 2 בסטיסטיקה", "5.10.2021"));

var taskInput;
var dueDateInput;

function createMessage(date, from, title, msg) {
    return {date: date, from: from, title: title, msg: msg};
}

function createTodo(task, dueDate) {
    return {id: todos.length, task: task, dueDate: dueDate};
}

function init() {
    getMessages();
    getTodos();
}

function getMessages() {
    var elements = [];
    myMessages.forEach(myMessage => {
        elements.push(buildCustomeMessage(myMessage));
    });

    elements.forEach(element => {
        document.getElementById("messagesSection").appendChild(element);
    });
}

function getTodos() {
    var elements = [];
    // build headers
    var taskHeader = buildChildWithText("th", "taskHeader", "משימה");
    var dateHeader = buildChildWithText("th", "dueDateHeader", "תאריך");
    var headeres = buildChild("tr", "todoHeaders", [taskHeader, dateHeader]);
    elements.push(headeres);

    // add line to input
    elements.push(buildAddTodo());
    
    // build rows
    todos.forEach(todo => {
        elements.push(buildCustomeTodo(todo));
    });
    // build table
    let table = buildChild("table", "todoTable", elements);
    document.getElementById("todosSection").appendChild(table);
}

function buildCustomeMessage(message) {
    let from = buildChildWithText("div", "from", message.from);
    let title = buildChildWithText("div", "msgTitle", message.title);
    let msg = buildChildWithText("div", "msgContent", message.msg);
    let date = buildChildWithText("div", "date", message.date);
    return buildChild("div", "message", [title, from, msg, date]);
}

function buildCustomeTodo(todo) {
    let task = buildChildWithText("td", "taskCol", todo.task);
    let date = buildChildWithText("td", "dueDateCol", todo.dueDate);
    let doneButton = buildChildWithText("button", "smallButton", "בוצע");
    let doneCol = buildChild("td", null, [doneButton]);
    let deleteButton = buildChildWithText("button", "smallButton", "מחק");
    let deleteCol = buildChild("td", null, [deleteButton]);
    let output = buildChild("tr", "todoRow", [task, date, doneCol, deleteCol]);
    doneButton.onclick = () => {
        done(task);
        done(date);
    };
    deleteButton.onclick = () => remove(output);
    return output;
}

function buildAddTodo() {
    taskInput = buildChild("input", "taskInput");
    dueDateInput = buildChildWithText("input", "taskInput");
    let taskCol = buildChild("td", "taskCol", [taskInput]);
    let dueDatekCol = buildChild("td", "dueDateCol", [dueDateInput]);
    let addButton = buildChildWithText("button", "smallButton", "הוסף");
    let addCol = buildChild("td", null, [addButton]);
    let output = buildChild("tr", "todoRow", [taskCol, dueDatekCol, addCol]);
    addButton.onclick = () => {
        let task = taskInput.value;
        let date = dueDateInput.value;
        let todo = createTodo(task, date);
        let elemntToAdd = buildCustomeTodo(todo);
        output.parentNode.appendChild(elemntToAdd);
    };
    return output;
}

function buildChildWithText(type, className, text) {
    let childElement = document.createElement("text");
    childElement.innerHTML = text;
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

function remove(element) {
    element.parentNode.removeChild(element);
}

function done(element) {
    if(element.style.textDecoration == "") {
        element.style.textDecoration = "line-through";
    }
    else {
        element.style.textDecoration = "";
    }
}

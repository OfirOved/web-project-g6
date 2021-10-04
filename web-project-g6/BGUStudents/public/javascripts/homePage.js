import { createTodo, sendGetTodos, sendCreateTodo, sendDeleteTodo } from '../connectionHandlers/usersHandler.js';
import { createMessage, sendGetCommiteMessages } from '../connectionHandlers/commiteHandler.js';

var todos = [];
var myMessages = [];

window.onload = () => initPage();

var taskInput;
var dueDateInput;

function initPage() {
    let onSuccessTodos = (todosList) => {
        getTodos(todosList);
    };
    sendGetTodos(logged_user, onSuccessTodos);

    getMessages(myMessages);

    let onSuccessMessages = (messages) => {
        console.log(messages);
        getMessages(messages);
    };
    sendGetCommiteMessages(logged_user, onSuccessMessages);
}

function getMessages(messagesList) {
    myMessages = messagesList;

    let el = document.getElementById("messagesSection");
    while (el.lastChild) {
        el.removeChild(el.lastChild);
    }

    var elements = [];
    myMessages.forEach(myMessage => {
        elements.push(buildCustomeMessage(myMessage));
    });

    elements.forEach(element => {
        document.getElementById("messagesSection").appendChild(element);
    });
}

function getTodos(todosList) {
    todos = todosList;
    let el = document.getElementById("todosSection");
    while (el.lastChild) {
        el.removeChild(el.lastChild);
    }

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

    let onSuccess = () => {
            alert('המשימה נמחקה בהצלחה');
            initPage();
        }
        //deleteButton.onclick = () => remove(output);
    deleteButton.onclick = () => {
        sendDeleteTodo(todo.id, onSuccess);
    };

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
        let todo = createTodo(task, date, logged_user);

        let onSuccess = () => {
            alert('המשימה נוספה בהצלחה');
            initPage();
        }

        sendCreateTodo(todo, onSuccess);
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
    if (element.style.textDecoration == "") {
        element.style.textDecoration = "line-through";
    } else {
        element.style.textDecoration = "";
    }
}
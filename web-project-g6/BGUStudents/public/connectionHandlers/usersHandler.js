// Client Handler functions

import {GET, POST, DELETE} from './clientHandler.js';

export const createTodo = function (task, dueDate, username) {
    return {username: username, task: task, dueDate: dueDate};
}

export const sendGetTodos = function(userName, onSuccess) {
    GET(`/users/${userName}/todos`, null, onSuccess);
}

export const sendCreateTodo = function(todo, onSuccess) {
    POST('/users/todos', todo, onSuccess);
}

export const sendDeleteTodo = function(id, onSuccess) {
    DELETE(`/users/todos/${id}`, null, onSuccess);
}



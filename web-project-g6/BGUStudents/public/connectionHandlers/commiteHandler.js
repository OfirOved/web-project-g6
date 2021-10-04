// Client Handler functions

import {GET, POST} from './clientHandler.js';

export const createMessage = function(year, group, date, from, title, msg) {
    return {year: year, group: group, date: date, from: from, title: title, msg: msg};
}

export const sendGetCommiteMessages = function(username, onSuccess) {
    GET(`/committee/messages/${username}`, null, onSuccess);
}

export const sendGetRequestMessagesFromUsers = function(onSuccess) {
    GET('/committee/requests', null, onSuccess);
}

export const sendCreateCommiteeMessage = function(message, onSuccess) {
    POST('/committe/messages', message, onSuccess);
}
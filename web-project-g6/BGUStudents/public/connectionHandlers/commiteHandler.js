// Client Handler functions

import {GET} from './clientHandler.js';

export const createMessage = function(date, from, title, msg) {
    return {date: date, from: from, title: title, msg: msg};
}

export const sendGetCommiteMessages = function(username, onSuccess) {
    GET(`/commite/messages/${username}`, null, onSuccess);
}
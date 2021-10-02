// Client Handler functions

export const POST = function (URL, obj, onSuccess = null, onFail = null) {
    let body = JSON.stringify(obj);
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', URL, true);
    httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    httpRequest.send(body);
    httpRequest.onreadystatechange = function() {
        console.log(this.readyState);
        console.log(this.status);
        if (this.readyState == 4 && this.status == 200 && onSuccess != null) {
            onSuccess();
        }
    };
}

export const GET =  async function (URL, obj = null, onSuccess = null, onFail = null) {
    let httpRequest = new XMLHttpRequest();
    console.log(URL + buildQueryParams(obj));
    httpRequest.open('GET', URL + buildQueryParams(obj), true);
    httpRequest.setRequestHeader("Content-Type", "application/application/json;charset=UTF-8");
    httpRequest.send();
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200 && onSuccess != null) {
            console.log(httpRequest.responseText);
            onSuccess(JSON.parse(httpRequest.responseText));
        }
    };
}

function buildQueryParams(obj) {
    if(obj == undefined) {
        return "";
    }
    let output = "?";
    for(var name in obj) {
        var value = obj[name];
        if(value != null) {
            output += `${name}=${value}&`;
        }
    }
    return output.slice(0,-1);
}
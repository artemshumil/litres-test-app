import {TData} from "../_tools/types";

export const userService = {
    login,
    register,
    logout,
    getData
};

(window as any)['userService'] = userService;

function XHRRequest(url: string, params: {[key: string]: string} = {}, method = 'GET'): Promise<any> {
    return new Promise((result, error) => {
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        let body = '';
        for (let key in params)
            body += '&' + key + '=' + (params[key]);
        body = body.substr(1);

        if (method === 'POST') xhr.open(method, url, true);
        if (method === 'GET') xhr.open(method, body ? url + '?' + body : url, true);

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = () => {
            if (xhr.status === 200)
                result(xhr.response);
            else
                error(xhr.response);
        };
        xhr.onerror = () => { error(xhr.response); };
        xhr.send(body);
    })
}

function login(user: string, password: string) {
    return XHRRequest(`http://devil-api.devlit.tech/api/login`, {user, password}, 'POST')
        .then(res => {
            console.log(`[api.Login]: ${user}, ${password} -> `, res);
            try {return JSON.parse(res);}
            catch (e) {return res;}
        });
}

function register(name: string, password: string) {
    return XHRRequest(`http://devil-api.devlit.tech/api/register`, {name, password}, 'POST')
        .then(res => {
            console.log(res);
            try {return JSON.parse(res);}
            catch (e) {return res;}
        });
}

function logout() {
    return XHRRequest(`http://devil-api.devlit.tech/api/logout`)
        .then(res => {
            console.log(res)
        });
}



function getData(): Promise<TData | string> {
    return XHRRequest(`http://devil-api.devlit.tech/api/data`)
        .then(res => {
            try {return JSON.parse(res);}
            catch (e) {return res;}
        });
}
import request from 'request';

const fetchGet = async (uri, auth = false) => {
    return await new Promise((resolve, reject) => request(uri + (auth !== false ? `?authorization=${auth}` : ""), { method: "GET" }, (error, response, body) => {
        if (error) {
            reject(error);
        }
        resolve(JSON.parse(body));
    }))
}

const fetchPost = async (uri, data, auth = false) => {
    const body = Object.keys(data).map(key => (`${encodeURI(key)}=${encodeURI(data[key])}`)).join("&") + (auth !== false ? `&authorization=${auth}` : "");
    return await new Promise((resolve, reject) => request(uri + (auth !== false ? `?authorization=${auth}` : ""), {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    }, (error, response, body) => {
        if (error) {
            reject(error);
        }
        resolve(JSON.parse(body));
    }))
}


export { fetchGet, fetchPost };
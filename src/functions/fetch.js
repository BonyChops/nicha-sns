import request from 'request';

const fetchGet = async (uri, auth = false, currentUser = false) => {
    const obj = {
        authorization: auth,
        current_user: currentUser
    }
    console.log(currentUser)
    return await new Promise((resolve, reject) => request(uri + ("?" + Object.keys(obj).map(key => (`${encodeURI(key)}=${encodeURI(obj[key])}`)).join("&")), { method: "GET" }, (error, response, body) => {
        if (error) {
            reject(error);
        }
        resolve(JSON.parse(body));
    }))
}

const fetchPost = async (uri, data, auth = false, currentUser = false) => {
    const body = Object.keys(data).map(key => (`${encodeURI(key)}=${encodeURI(data[key])}`)).join("&") + (auth !== false ? `&authorization=${auth}` : "")+ (currentUser !== false ? `&current_user=${currentUser}` : "");
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
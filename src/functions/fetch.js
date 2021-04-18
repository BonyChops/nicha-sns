import request from 'request';

const fetchGet = async (uri, auth = false, currentUser = false, params = {}) => {
    const obj = params;
    obj.authorization = auth;
    obj.current_user = currentUser;
    console.log(currentUser)
    return await new Promise((resolve, reject) => request(uri + ("?" + Object.keys(obj).map(key => (`${encodeURIComponent(String(key))}=${encodeURIComponent(String(obj[key]))}`)).join("&")), {method: "GET"}, (error, response, body) => {
        if (error) {
            reject({
                status: "error",
                type: "connection_refused",
                error
            });
        }
        let result;
        try {
            result = JSON.parse(body);
        } catch (e) {
            reject({
                status: "error",
                type: "json_not_parsable",
                mes: body
            });
        }
        resolve(result);
    }))
}

const fetchPost = async (uri, data, auth = false, currentUser = false, method = "POST") => {
    console.log(uri);
    console.log(data);
    const body = Object.keys(data).map(key => (`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)).join("&") + (auth !== false ? `&authorization=${auth}` : "") + (currentUser !== false ? `&current_user=${currentUser}` : "");
    return await new Promise((resolve, reject) => request(uri, {
        method,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    }, (error, response, body) => {
        if (error) {
            reject({
                status: "error",
                type: "connection_refused",
                error
            });
        }
        let result;
        try {
            result = JSON.parse(body);
        } catch (e) {
            reject({
                status: "error",
                type: "json_not_parsable",
                mes: body
            });
        }
        resolve(result);
    }))
}

const fetchPut = async (uri, data, auth = false, currentUser = false) => (await fetchPost(uri, data, auth, currentUser, "PUT"));
const fetchDelete = async (uri, data, auth = false, currentUser = false) => (await fetchPost(uri, data, auth, currentUser, "DELETE"));


export {fetchGet, fetchPost, fetchPut, fetchDelete};
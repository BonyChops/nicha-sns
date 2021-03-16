import request from 'request';

const fetchGet = async (uri, auth = false) => {
    return await new Promise((resolve, reject) => request(uri + (auth !== false ? `?authorization=${auth}` : ""), { method: "GET" }, (error, response, body) => {
        if (error) {
            reject(error);
        }
        resolve(JSON.parse(body));
    }))
}
export { fetchGet };
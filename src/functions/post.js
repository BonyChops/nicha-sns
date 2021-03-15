import config from '../nicha.config';
import request from 'request';
import { useEffect } from 'react';

const getPost = async (authData, id) => {
    if (authData === undefined) {
        console.log("Not ready");
        return false;
    }
    return new Promise((resolve, reject) => request(`${config.apiDomain}/v1/posts/${id}?authorization=${authData}`, { method: "GET" }, (error, response, body) => {
        //console.log(body);

        resolve(JSON.parse(body));
    }))
}
export { getPost };
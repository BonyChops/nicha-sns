import config from '../nicha.config';
import { useEffect } from 'react';
import { fetchGet, fetchPost } from './fetch';

const getPost = async (authData, currentUserId, id) => {
    if (authData === undefined) {
        return false;
    }
    if (id.match(/^[\d]{19,19}$/) === null) {
        return {
            status: "error",
            type: "not_found_post",
            mes: "Request not occurred because of invalid post id"
        }
    }
    return fetchGet(`${config.apiDomain}/v1/posts/${id}`, authData, currentUserId);
}

const postPost = async (authData, currentUserId, data) => {
    if (authData === undefined) {
        return false;
    }
    return fetchPost(`${config.apiDomain}/v1/posts`, data, authData, currentUserId);
}

export { getPost, postPost };
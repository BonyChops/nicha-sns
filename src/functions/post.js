import config from '../nicha.config';
import { useEffect } from 'react';
import { fetchGet, fetchPost } from './fetch';
import { cacheUsers } from './users';

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

const cachePost = (post, accessor) => {
    const postData = post;
    cacheUsers(postData.author, accessor);
    postData.author = postData.author.id;
    accessor({
        posts: {
            [postData.id]: postData
        }
    })
    return postData;
}

const getCacheList = async (authData, currentUserId, id) => {
    const post = await getPost(authData, currentUserId, id);
    return cachePost(post);
}

export { getPost, postPost, cachePost };
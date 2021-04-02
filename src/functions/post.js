import config from '../nicha.config';
import { useEffect } from 'react';
import { fetchGet, fetchPost, fetchPut } from './fetch';
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
    return await fetchGet(`${config.apiDomain}/v1/posts/${id}`, authData, currentUserId);
}

const postPost = async (authData, currentUserId, data) => {
    if (authData === undefined) {
        return false;
    }
    return await fetchPost(`${config.apiDomain}/v1/posts`, data, authData, currentUserId);
}

const putPost = async (authData, currentUserId, postId, data) => {
    if (authData === undefined) {
        return false;
    }
    console.log(data);
    console.log(postId)
    return await fetchPut(`${config.apiDomain}/v1/posts/${postId}`, data, authData, currentUserId);
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

const getCachePost = async (authData, currentUserId, id, accessor) => {
    const post = await getPost(authData, currentUserId, id);
    if (post.status !== "ok") return post;
    return cachePost(post, accessor);
}

export { getPost, postPost, cachePost, getCachePost, putPost };
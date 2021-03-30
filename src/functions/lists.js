import config from '../nicha.config';
import { useEffect } from 'react';
import { fetchGet, fetchPost } from './fetch';

const getList = async (authData, currentUserId, id, posts = false, members = false, posts_author = false) => {
    if (authData === undefined) {
        return false;
    }
    if (id.match(/^[\d]{16,17}$/) === null) {
        return {
            status: "error",
            type: "not_found_list",
            mes: "Request not occurred because of invalid list id"
        }
    }
    return fetchGet(`${config.apiDomain}/v1/lists/${id}`, authData, currentUserId, { posts, members, posts_author });
}

const postPost = async (authData, currentUserId, data) => {
    if (authData === undefined) {
        return false;
    }
    return fetchPost(`${config.apiDomain}/v1/posts`, data, authData, currentUserId);
}

const cacheList = async (authData, currentUserId, id, posts = false, members = false, posts_author = false, accessor) => {
    const list = await getList(authData, currentUserId, id, posts, members, posts_author);
    console.log(id);
    list.posts.forEach(post => accessor({
        posts: {
            [post.id]: post
        }
    }))
    accessor({
        lists: {
            [id]: list.posts.map(post => post.id)
        }
    });
    console.log({
        lists: {
            [id]: list.posts.map(post => post.id)
        }
    })
}

export { getList, cacheList };
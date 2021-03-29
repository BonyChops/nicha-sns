import config from '../nicha.config';
import { useEffect } from 'react';
import { fetchGet, fetchPost } from './fetch';

const getList = async (authData, currentUserId, id, posts = false, members = false) => {
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
    return fetchGet(`${config.apiDomain}/v1/lists/${id}`, authData, currentUserId, { posts, members });
}

const postPost = async (authData, currentUserId, data) => {
    if (authData === undefined) {
        return false;
    }
    return fetchPost(`${config.apiDomain}/v1/posts`, data, authData, currentUserId);
}

const cacheList = async (authData, currentUserId, id, posts = false, members = false, accessor) => {
    const list = await getList(authData, currentUserId, id, posts, members);
    console.log(id)
    console.log(list)
    accessor({
        lists: {
            [id]: list
        }
    });
}

export { getList, cacheList };
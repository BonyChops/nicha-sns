import config from '../nicha.config';
import {fetchGet, fetchPost} from './fetch';

const getUsers = async (authData, id = false, currentUser = false, posts = false) => {
    if (authData === undefined) {
        return false;
    }
    if (id !== false && currentUser === false) {
        return false;
    }
    return await fetchGet(`${config.apiDomain}/v1/users`, authData, currentUser, {posts});
}

const postUsers = async (data, authData) => {
    if (authData === undefined) {
        return false;
    }
    return await fetchPost(`${config.apiDomain}/v1/users`, data, authData);
}

const cacheUsers = (user, accessor) => {
    const userData = user;
    if (userData === undefined) return undefined;
    accessor({
        users: {
            [userData.id]: userData
        }
    })
}

const getCacheUsers = async(accessor, authData, id = false, currentUser = false, posts = false) => {
    const user = await getUsers(authData, id, currentUser, posts);
    if(user === false){
        return user;
    }
    cacheUsers(user, accessor);

}

export {getUsers, postUsers, cacheUsers, getCacheUsers};
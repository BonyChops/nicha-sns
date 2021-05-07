import config from '../nicha.config';
import {fetchGet, fetchPost} from './fetch';

const getUsers = async (authData, id = false, currentUser = false, posts = false, screen_id = false) => {
    if (authData === undefined) {
        return false;
    }
    if (id !== false && currentUser === false) {
        return false;
    }
    return await fetchGet(`${config.apiDomain}/v1/users`, authData, currentUser, {posts, screen_id});
}

const getUserProfile = async (authData, id = false, currentUser = false, requiredInfo = [], screen_id = false) => {
    if (authData === undefined) {
        return false;
    }
    if (id !== false && currentUser === false) {
        return false;
    }
    return await fetchGet(`${config.apiDomain}/v1/users/${id}/profile`, authData, currentUser, {required_info: requiredInfo.join(","), screen_id});
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

const getCacheUsersProfile = async(accessor, authData, id = false, currentUser = false, requiredInfo = false, screenNameMode = false) => {
    console.log(id);
    const user = await getUserProfile(authData, id, currentUser, requiredInfo, screenNameMode);
    if(user === false){
        return user;
    }
    cacheUsers(user, accessor);
    return user;
}

export {getUsers, postUsers, cacheUsers, getCacheUsersProfile};
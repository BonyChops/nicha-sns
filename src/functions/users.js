import config from '../nicha.config';
import { fetchGet, fetchPost } from './fetch';

const getUsers = async (authData) => {
    if (authData === undefined) {
        return false;
    }
    return await fetchGet(`${config.apiDomain}/v1/users`, authData);
}

const postUsers = async (data, authData) => {
    if (authData === undefined) {
        return false;
    }
    return await fetchPost(`${config.apiDomain}/v1/users`, data, authData)
}

const cacheUsers = (user, accessor) => {
    const userData = user;
    accessor({
        users: {
            [userData.id]: userData
        }
    })
}

export { getUsers, postUsers, cacheUsers };
import config from '../nicha.config';
import { fetchGet } from './fetch';

const getUsers = (authData) => {
    if (authData === undefined) {
        return false;
    }
    return fetchGet(`${config.apiDomain}/v1/users`, authData);
}


export {getUsers};
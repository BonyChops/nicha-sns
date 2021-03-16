import config from '../nicha.config';
import { useEffect } from 'react';
import {fetchGet} from './fetch';

const getPost = async (authData, id) => {
    if (authData === undefined) {
        return false;
    }
    return fetchGet(`${config.apiDomain}/v1/posts/${id}`, authData);
}
export { getPost };
import config from '../nicha.config';
import { useEffect } from 'react';
import { fetchGet, fetchPost, fetchPut, fetchDelete } from './fetch';
import { cacheUsers } from './users';

const sendFeedback = async (authData, content) => {
    if (authData === undefined) {
        return false;
    }
    return await fetchPost(`${config.apiDomain}/v1/appeal/feedback`, { content }, authData);
}

export { sendFeedback };
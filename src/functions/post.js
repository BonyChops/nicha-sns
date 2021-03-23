import config from '../nicha.config';
import { useEffect } from 'react';
import {fetchGet} from './fetch';

const getPost = async (authData, currentUserId , id) => {
    if (authData === undefined) {
        return false;
    }
    if (id.match(/^[\d]{19,19}$/) === null) return{
        status: "error",
        type: "not_found_post",
        mes: "Request not occurred because of invalid post id"
    }
    return fetchGet(`${config.apiDomain}/v1/posts/${id}`, authData, currentUserId);
}
export { getPost };
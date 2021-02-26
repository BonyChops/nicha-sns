import Configuration from '../../nicha.config';
import request from 'request';

export default async(id) => {
    request(`https://${config.apiDomain}/post`, {method: "GET"}, (error, response, body) => {
        console.log(response);
    })
}
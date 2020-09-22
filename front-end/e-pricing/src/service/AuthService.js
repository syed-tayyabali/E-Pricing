import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';

async function loginAsync() {
    const url = constructUrl(URLS.LOGIN);
    return axios.post(url);
}

async function registerAsync() {
    const url = constructUrl(URLS.REGISTER);
    return axios.post(url);
}

export { loginAsync, registerAsync }
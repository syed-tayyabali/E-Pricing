import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';

async function loginAsync(user) {
    const url = constructUrl(URLS.LOGIN);
    const email = user.email;
    const password = user.password;
    return axios.post(url, { email, password });
}

async function registerAsync(user) {
    const url = constructUrl(URLS.REGISTER);
    return axios.post(url, user);
}

export { loginAsync, registerAsync }
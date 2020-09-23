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
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const password = user.password;
    return axios.post(url, { firstName, lastName, email, password });
}

export { loginAsync, registerAsync }
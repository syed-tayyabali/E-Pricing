import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:3000/' });

//req interceptor
instance.interceptors.request.use(config => {
    const setToken = localStorage.getItem('token');
    if (setToken) {
        config.headers['x-auth-token'] = setToken;
    }
    return config;
}, e => {
    Promise.reject(e);
});

export default instance;
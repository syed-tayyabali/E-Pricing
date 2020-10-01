import { request, success, failure } from './index';
import { LOGIN_ACTIONS } from '../../constants/actions';
import { loginAsync, registerAsync } from '../../service/AuthService';

let TOKEN_KEY = 'token';

function fetchUser(user) {
    return async dispatch => {
        dispatch(request(LOGIN_ACTIONS.LOGIN_REQUEST));
        try {
            let res = await loginAsync(user);
            const { _id, firstName, lastName, email, token } = res.data;
            localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
            dispatch(success(LOGIN_ACTIONS.LOGIN_SUCCESS, { _id, firstName, lastName, email, token }));
        }
        catch (e) {
            console.log(e);
            dispatch(failure(LOGIN_ACTIONS.LOGIN_FAILURE, e.response.data))
        }
    }
}

function signUpUser(user) {
    return async dispatch => {
        dispatch(request(LOGIN_ACTIONS.REGISTRATION_REQUEST));
        try {
            let res = await registerAsync(user);
            const { _id, firstName, lastName, email, token } = res.data;
            localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
            dispatch(success(LOGIN_ACTIONS.REGISTRATION_SUCCESS, { _id, firstName, lastName, email, token }));
        }
        catch (e) {
            console.log(e);
            dispatch(failure(LOGIN_ACTIONS.REGISTRATION_FAILURE, e.response.data))
        }
    }
}

function checkLogin() {
    return async dispatch => {
        if (localStorage.getItem(TOKEN_KEY)) {
            dispatch(success(LOGIN_ACTIONS.CHECK_LOGIN_SUCCESS, true))
        } else {
            dispatch(success(LOGIN_ACTIONS.CHECK_LOGIN_SUCCESS, false))
        }
    }
}

function logOut() {
    return async dispatch => {
        dispatch(success(LOGIN_ACTIONS.LOGOUT_SUCCESS, localStorage.removeItem('token')))
    }
}

export { signUpUser, fetchUser, checkLogin, logOut };
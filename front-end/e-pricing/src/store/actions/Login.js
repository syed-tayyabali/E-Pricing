import { request, success, failure } from './index';
import { LOGIN_ACTIONS } from '../../constants/actions';
import { loginAsync, registerAsync } from '../../service/AuthService';
import { setToken, getToken, removeToken, setUser, getUser, removeUser } from '../../service/localStorageService';

let TOKEN_KEY = 'token';

function fetchUser(user) {
    return async dispatch => {
        dispatch(request(LOGIN_ACTIONS.LOGIN_REQUEST));
        try {
            let res = await loginAsync(user);
            const { _id, firstName, lastName, email, token } = res.data;
            setToken(token);
            setUser(_id, firstName, lastName, email, token);
            console.log('in login action ', getUser());
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
            // setToken(token);
            // setUser(_id, firstName, lastName, email, token);
            dispatch(success(LOGIN_ACTIONS.REGISTRATION_SUCCESS, { _id, firstName, lastName, email, token }));
        }
        catch (e) {
            console.log(e);
            dispatch(failure(LOGIN_ACTIONS.REGISTRATION_FAILURE, e.response.data))
        }
    }
}

function setRegisteredFlag(val = false) {
    return dispatch => dispatch(success(LOGIN_ACTIONS.SET_REGISTRATION_FLAG, val))
}

function checkLogin() {
    return async dispatch => {
        if (getToken()) {
            dispatch(success(LOGIN_ACTIONS.CHECK_LOGIN_SUCCESS, getUser()))
        } else {
            dispatch(failure(LOGIN_ACTIONS.CHECK_LOGIN_FAILURE, localStorage.removeItem('user')))
        }
    }
}

function logOut() {
    return async dispatch => {
        dispatch(success(LOGIN_ACTIONS.LOGOUT_SUCCESS, removeToken(TOKEN_KEY)));
        dispatch(success(LOGIN_ACTIONS.LOGOUT_SUCCESS, removeUser()));
    }
}

export { signUpUser, fetchUser, checkLogin, logOut, setRegisteredFlag };
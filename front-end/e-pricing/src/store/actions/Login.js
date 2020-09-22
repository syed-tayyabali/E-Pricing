import { request, success, failure } from './index';
import { LOGIN_ACTIONS } from '../../constants/actions';
import { loginAsync, registerAsync } from '../../service/AuthService';

function fetchUser(user) {
    return async dispatch => {
        dispatch(request(LOGIN_ACTIONS.LOGIN_REQUEST));
        try {
            let res = await loginAsync(user);
            const { firstName, lastName, email, token } = res.data;
            localStorage.setItem('token', JSON.stringify(token));
            dispatch(success(LOGIN_ACTIONS.LOGIN_SUCCESS, { firstName, lastName, email, token }));
        }
        catch (e) {
            console.log(e);
            dispatch(failure(LOGIN_ACTIONS.LOGIN_FAILURE, 'Something went wrong'))
        }
    }
}

function signUpUser(user) {
    return async dispatch => {
        dispatch(request(LOGIN_ACTIONS.REGISTRATION_REQUEST));
        try {
            let res = await registerAsync(user);
            const { firstName, lastName, email, token } = res.data;
            localStorage.setItem('token', JSON.stringify(token));
            dispatch(success(LOGIN_ACTIONS.REGISTRATION_SUCCESS, { firstName, lastName, email, token }));
        }
        catch (e) {
            console.log(e);
            dispatch(failure(LOGIN_ACTIONS.REGISTRATION_FAILURE, 'Something went wrong'))
        }
    }
}

export { signUpUser, fetchUser }
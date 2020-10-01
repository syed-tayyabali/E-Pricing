import { LOGIN_ACTIONS } from '../../constants/actions';

const initialState = {
    loggedIn: false,
    user: {},
    loginError: '',
    registerError: ''
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ACTIONS.LOGIN_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loggedIn: false,
                loginError: ''
            };
        case LOGIN_ACTIONS.LOGIN_SUCCESS:
            console.log('in success', action);
            return {
                ...state,
                loggedIn: true,
                user: { ...action.payload },
                loginError: ''
            };
        case LOGIN_ACTIONS.LOGIN_FAILURE:
            console.log('in failure', action);
            return {
                ...state,
                loggedIn: false,
                loginError: action.payload
            };

        case LOGIN_ACTIONS.REGISTRATION_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loggedIn: false,
                registerError: ''
            };
        case LOGIN_ACTIONS.REGISTRATION_SUCCESS:
            console.log('in success', action);
            return {
                ...state,
                loggedIn: true,
                user: { ...action.payload },
                registerError: ''
            };
        case LOGIN_ACTIONS.REGISTRATION_FAILURE:
            console.log('in failure', action);
            return {
                ...state,
                loggedIn: false,
                registerError: action.payload
            };

        case LOGIN_ACTIONS.LOGOUT_SUCCESS:
            return {
                loggedIn: false,
                user: {},
                loginError: '',
                registerError: '',
            }

        case LOGIN_ACTIONS.CHECK_LOGIN_SUCCESS:
            console.log('in success', action);
            return {
                ...state,
                loggedIn: action.payload,
            };
        default:
            return state;
    }
}

export default loginReducer;
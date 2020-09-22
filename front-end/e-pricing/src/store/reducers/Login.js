const { LOGIN_ACTIONS } = require("../../constants/actions");

const initialState = {
    loggedIn: false,
    user: {}
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_ACTIONS.LOGIN_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loggedIn: false
            };
        case LOGIN_ACTIONS.LOGIN_SUCCESS:
            console.log('in success', action);
            return {
                ...state,
                loggedIn: true,
                user: { ...action.payload }
            };
        case LOGIN_ACTIONS.LOGIN_FAILURE:
            console.log('in success', action);
            return {
                ...state,
                loggedIn: false
            };

        case LOGIN_ACTIONS.REGISTRATION_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loggedIn: false
            };
        case LOGIN_ACTIONS.REGISTRATION_SUCCESS:
            console.log('in success', action);
            return {
                ...state,
                loggedIn: true,
                user: { ...action.payload }
            };
        case LOGIN_ACTIONS.REGISTRATION_FAILURE:
            console.log('in success', action);
            return {
                ...state,
                loggedIn: false
            };

        case LOGIN_ACTIONS.LOGOUT_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loggedIn: true
            };
        case LOGIN_ACTIONS.LOGOUT_SUCCESS:
            localStorage.clear();
            return {
                loggedIn: false,
                user: {}
            }

        case LOGIN_ACTIONS.CHECK_LOGIN_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loggedIn: false
            };
        case LOGIN_ACTIONS.CHECK_LOGIN_SUCCESS:
            console.log('in success', action);
            return {
                ...state,
                loggedIn: true,
                user: { ...action.payload }
            };
        default:
            return state;
    }
}

export default loginReducer;
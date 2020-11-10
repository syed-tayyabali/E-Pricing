import { HOME_ACTIONS } from '../../constants/actions';

const initialState = {
    homeProducts: [],
}

const homeReducer = (state = initialState, action) => {
    switch (action.types) {
        case HOME_ACTIONS.GET_HOME_PRODUCT_REQUEST:
            console.log('in request', action);
            return {
                ...state,
            };
        case HOME_ACTIONS.GET_HOME_PRODUCT_SUCCUESS:
            console.log('in success', action);
            return {
                ...state,
                homeProducts: action.payload,
            };
        case HOME_ACTIONS.GET_HOME_PRODUCT_FAILURE:
            console.log('in success', action);
            return {
                ...state,
            };
        default:
            return state;
    }
}

export default homeReducer;
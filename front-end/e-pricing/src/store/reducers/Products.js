import { PRODUCTS_ACTIONS } from '../../constants/actions/index';

const initialState = {
    products: [],
    loading: false,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_ACTIONS.GET_PRODUCTS_REQUEST:
            console.log('in request', action)
            return {
                ...state,
                loading: true,
            };
        case PRODUCTS_ACTIONS.GET_PRODUCTS_SUCCESS:
            console.log('in success', action)
            return {
                ...state,
                products: action.payload,
                loading: false,
            };
        case PRODUCTS_ACTIONS.GET_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

export default productReducer;
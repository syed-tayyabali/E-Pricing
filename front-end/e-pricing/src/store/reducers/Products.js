import {
    PRODUCTS_ACTIONS
} from '../../constants/actions/index';

const initialState = {
    products: [],
    categories: [],
    maxPrice: 0,
    loading: false,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_ACTIONS.GET_PRODUCTSBY_WEBCOLLECTION_REQUEST:
        case PRODUCTS_ACTIONS.GET_PRODUCTS_REQUEST:
            console.log('in request', action)
            return {
                ...state,
                loading: true,
            };
        case PRODUCTS_ACTIONS.GET_PRODUCTSBY_WEBCOLLECTION_SUCCESS:
        case PRODUCTS_ACTIONS.GET_PRODUCTS_SUCCESS:
            console.log('in success', action)
            return {
                ...state,
                products: action.payload.products,
                categories: action.payload.categories,
                maxPrice: action.payload.maxPrice,
                loading: false,
            };

        case PRODUCTS_ACTIONS.GET_PRODUCTSBY_WEBCOLLECTION_FAILURE:
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
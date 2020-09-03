import { PRODUCT_COMPARISON_ACTIONS } from '../../constants/actions/index';

const initialState = {
    compairedProducts: [],
    loader: false,
}

const productComparsionReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_COMPARISON_ACTIONS.GET_PRODUCT_COMAPARSION_REQUEST:
            console.log('in request', action)
            return {
                ...state,
                loader: true,
            };
        case PRODUCT_COMPARISON_ACTIONS.GET_PRODUCT_COMAPARSION_SUCCESS:
            console.log('in success', action)
            return {
                ...state,
                compairedProducts: action.payload,
                loader: false,
            };
        case PRODUCT_COMPARISON_ACTIONS.GET_PRODUCT_COMAPARSION_FAILURE:
            return {
                ...state,
                loader: false,
            };
        default:
            return state;
    }
}

export default productComparsionReducer;
import { PRODUCT_COMPARISON_ACTIONS } from '../../constants/actions/index';

const initialState = {
    compairedProducts: [],
    loading: false,
}

const productComparsionReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_COMPARISON_ACTIONS.GET_PRODUCT_COMAPARSION_REQUEST:
            console.log('in request', action)
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_COMPARISON_ACTIONS.GET_PRODUCT_COMAPARSION_SUCCESS:
            console.log('in success', action)
            return {
                ...state,
                compairedProducts: action.payload,
                loading: false,
            };
        case PRODUCT_COMPARISON_ACTIONS.GET_PRODUCT_COMAPARSION_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

export default productComparsionReducer;
import { PRODUCT_DETAIL_ACTIONS } from '../../constants/actions/index';

const initialState = {
    product: [],
    loading: false,
}

const productDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_ACTIONS.GET_PRODUCTDETAIL_REQUEST:
            console.log('in request', action)
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_DETAIL_ACTIONS.GET_PRODUCTDETAIL_SUCCESS:
            console.log('in success', action)
            return {
                ...state,
                product: action.payload,
                loading: false,
            };
        case PRODUCT_DETAIL_ACTIONS.GET_PRODUCTDETAIL_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

export default productDetailReducer;
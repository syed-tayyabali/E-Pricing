import { PRODUCT_CATEGORY_ACTIONS } from '../../constants/actions/index';

const initialState = {
    productCategory: [],
    loading: false,
}

const productCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_CATEGORY_ACTIONS.GET_PRODUCT_BRAND_CATEGORY_REQUEST:
            console.log('in request', action)
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_CATEGORY_ACTIONS.GET_PRODUCT_BRAND_CATEGORY_SUCCESS:
            console.log('in success', action)
            return {
                ...state,
                productCategory: action.payload,
                loading: false,
            };
        case PRODUCT_CATEGORY_ACTIONS.GET_PRODUCT_BRAND_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

export default productCategoryReducer;
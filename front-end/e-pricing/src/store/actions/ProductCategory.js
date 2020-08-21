import { PRODUCT_CATEGORY_ACTIONS } from "../../constants/actions";
import { request, success, failure } from './index';
import { getProductCategoryAsync } from '../../service/ProductCategoryService';


function getProductCategory() {
    return async dispatch => {
        dispatch(request(PRODUCT_CATEGORY_ACTIONS.GET_PRODUCT_BRAND_CATEGORY_REQUEST));
        try {
            const res = await getProductCategoryAsync();
            const productCategory = res.data;
            dispatch(success(PRODUCT_CATEGORY_ACTIONS.GET_PRODUCT_BRAND_CATEGORY_SUCCESS, productCategory));
        } catch (e) {
            dispatch(failure(PRODUCT_CATEGORY_ACTIONS.GET_PRODUCT_BRAND_CATEGORY_FAILURE, 'Something went wrong'));
        }
    }
}

export { getProductCategory };
import { PRODUCT_DETAIL_ACTIONS } from "../../constants/actions";
import { request, success, failure } from './index';
import { getProductDetailAsync } from "../../service/productDetailService";


function getProductDetail(id) {
    return async dispatch => {
        dispatch(request(PRODUCT_DETAIL_ACTIONS.GET_PRODUCTDETAIL_REQUEST));
        try {
            const res = await getProductDetailAsync(id);
            const products = res.data;
            dispatch(success(PRODUCT_DETAIL_ACTIONS.GET_PRODUCTDETAIL_SUCCESS, products));
        } catch(e) {
            console.log(e);
            dispatch(failure(PRODUCT_DETAIL_ACTIONS.GET_PRODUCTDETAIL_FAILURE, 'Something went wrong'));
        }
    }
}

export { getProductDetail };
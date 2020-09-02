import { PRODUCT_COMPARISON_ACTIONS } from "../../constants/actions";
import { request, success, failure } from './index';
import { getProductComparsionAsync } from "../../service/ProductComparison";


function getProductComparsion(type, seller_keyId, heading) {
    return async dispatch => {
        dispatch(request(PRODUCT_COMPARISON_ACTIONS.GET_PRODUCT_COMAPARSION_REQUEST));
        try {
            const res = await getProductComparsionAsync(type, seller_keyId, heading);
            const compairedProducts = res.data;
            console.log('in actions', res)
            dispatch(success(PRODUCT_COMPARISON_ACTIONS.GET_PRODUCT_COMAPARSION_SUCCESS, compairedProducts));
        } catch (e) {
            console.log('error: ', e);
            dispatch(failure(PRODUCT_COMPARISON_ACTIONS.GET_PRODUCT_COMAPARSION_FAILURE, 'Something went wrong'));
        }
    }
}

export { getProductComparsion };
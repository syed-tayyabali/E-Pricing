import { PRODUCTS_ACTIONS } from "../../constants/actions";
import { request, success, failure } from './index';
import { getProductsAsync } from '../../service/ProductsService';


function getProducts(id) {
    return async dispatch => {
        dispatch(request(PRODUCTS_ACTIONS.GET_PRODUCTS_REQUEST));
        try {
            const res = await getProductsAsync(id);
            const products = res.data;
            dispatch(success(PRODUCTS_ACTIONS.GET_PRODUCTS_SUCCESS, products));
        } catch(e) {
            console.log(e);
            dispatch(failure(PRODUCTS_ACTIONS.GET_PRODUCTS_FAILURE, 'Something went wrong'));
        }
    }
}

export { getProducts };
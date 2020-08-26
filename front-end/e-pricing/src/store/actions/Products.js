import { PRODUCTS_ACTIONS } from "../../constants/actions";
import { request, success, failure } from './index';
import { getProductsAsync, getProductsByWebCollectionAsync } from '../../service/ProductsService';


function getProducts(id, params, webCollectionId) {
    return async dispatch => {
        dispatch(request(PRODUCTS_ACTIONS.GET_PRODUCTS_REQUEST));
        try {
            let res = null;
            if (webCollectionId) {
                res = await getProductsByWebCollectionAsync(id, webCollectionId, params);
            } else {
                res = await getProductsAsync(id, params);
            }
            const { products, categories, maxPrice, countProduct } = res.data;
            dispatch(success(PRODUCTS_ACTIONS.GET_PRODUCTS_SUCCESS, { products, categories, maxPrice, countProduct }));
        } catch (e) {
            console.log(e);
            dispatch(failure(PRODUCTS_ACTIONS.GET_PRODUCTS_FAILURE, 'Something went wrong'));
        }
    }
}

export { getProducts };
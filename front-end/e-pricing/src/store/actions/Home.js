import { HOME_ACTIONS } from '../../constants/actions';
import { request, success, failure } from './index';
import { getHomeProductsAsync } from '../../service/HomeService';

function getHomeProducts() {
    return async dispatch => {
        dispatch(request(HOME_ACTIONS.GET_HOME_PRODUCT_REQUEST));
        try {
            const res = await getHomeProductsAsync();
            const homeProducts = res.data;
            console.log('in home actions ', homeProducts);
            dispatch(success(HOME_ACTIONS.GET_HOME_PRODUCT_SUCCUSS, homeProducts));
        } catch (e) {
            dispatch(failure(HOME_ACTIONS.GET_HOME_PRODUCT_FAILURE, 'something went wrong'))
        }
    }
}

export { getHomeProducts };
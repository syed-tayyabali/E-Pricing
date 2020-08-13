import { CATEGORY_ACTIONS } from "../../constants/actions";
import { request, success, failure } from './index';
import { getCategoriesAsync } from '../../service/categoryService';


function getCategories() {
    return async dispatch => {
        dispatch(request(CATEGORY_ACTIONS.GET_CATEGORIES_REQUEST));
        try {
            const res = await getCategoriesAsync();
            const categories = res.data;
            dispatch(success(CATEGORY_ACTIONS.GET_CATEGORIES_SUCCESS, categories));
        } catch(e) {
            dispatch(failure(CATEGORY_ACTIONS.GET_CATEGORIES_FAILURE, 'Something went wrong'));
        }
    }
}

export { getCategories };
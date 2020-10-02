import { request, success, failure } from './index.js';
import { WISHLIST_ACTIONS } from '../../constants/actions';
import { getWishList, postWishList, updateWishList, deleteWishList } from '../../service/WishListService';

function getUserWishlist(id) {
    return async dispatch => {
        dispatch(request(WISHLIST_ACTIONS.GET_WISHLIST_REQUEST));
        try {
            let res = await getWishList(id);
            const { userId, products } = res.data;
            dispatch(success(WISHLIST_ACTIONS.GET_WISHLIST_SUCCESS, { userId, products }));
        } catch (e) {
            console.log(e);
            dispatch(failure(WISHLIST_ACTIONS.GET_WISHLIST_FAILURE, e.response.data));
        }
    }
}

function postUserWishlist(id, body) {
    return async dispatch => {
        dispatch(request(WISHLIST_ACTIONS.POST_WISHLIST_REQUEST));
        try {
            let res = await postWishList(id, body);
            console.log('response ',res);
            const { userId, products } = res.data;
            dispatch(success(WISHLIST_ACTIONS.POST_WISHLIST_SUCCESS, { userId, products }));
        } catch (e) {
            console.log(e);
            dispatch(failure(WISHLIST_ACTIONS.POST_WISHLIST_FAILURE, e.response.data));
        }
    }
}

function userUpdateWishlist(id, body) {
    return async dispatch => {
        dispatch(request(WISHLIST_ACTIONS.UPDATE_WISHLIST_REQUEST));
        try {
            let res = await updateWishList(id, body);
            const { userId, products } = res.data;
            dispatch(success(WISHLIST_ACTIONS.UPDATE_WISHLIST_SUCCESS, { userId, products }));
        } catch (e) {
            console.log(e);
            dispatch(failure(WISHLIST_ACTIONS.UPDATE_WISHLIST_FAILURE, e.response.data))
        }
    }
}

function deleteUserWishList(id, body) {
    return async dispatch => {
        dispatch(request(WISHLIST_ACTIONS.DELETE_WISHLIST_REQUEST));
        try {
            let res = await deleteWishList(id, body);
            const { userId, products } = res.data;
            dispatch(success(WISHLIST_ACTIONS.DELETE_WISHLIST_SUCCESS, { userId, products }));
        } catch (e) {
            console.log(e);
            dispatch(failure(WISHLIST_ACTIONS.DELETE_WISHLIST_FAILURE, e.response.data));
        }
    }
}

export { getUserWishlist, postUserWishlist, userUpdateWishlist, deleteUserWishList };
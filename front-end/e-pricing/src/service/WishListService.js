import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';
import instance from './interceptors';

async function getWishList(id) {
    const url = constructUrl(URLS.GET_WISHLIST + id);
    return instance.get(url);
}

async function postWishList(id, body) {
    const url = constructUrl(URLS.POST_WISHLIST + id);
    const userId = body.userId;
    const productId = body.productId;
    const quantity = body.quantity;
    return instance.post(url, { userId, productId, quantity });
}

async function updateWishList(id, body) {
    const url = constructUrl(URLS.UPDATE_WISHlIST + id);
    const quantity = body.quantity;
    return instance.put(url, { quantity });
}

async function deleteWishList(id, body) {
    const url = constructUrl(URLS.DELETE_WISHLISH + id);
    const productId = body.productId;
    console.log('wishlist service body', body);
    console.log('wishlist service user id', id);
    console.log('wishlist service url', url);
    return instance.delete(url, { data: { productId } });
}

export { getWishList, postWishList, updateWishList, deleteWishList };
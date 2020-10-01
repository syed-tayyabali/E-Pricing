import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';

async function getWishList(id) {
    const url = constructUrl(URLS.GET_WISHLIST + id);
    return axios.get(url);
}

async function postWishList(id, body) {
    const url = constructUrl(URLS.POST_WISHLIST + id);
    const userId = body.userId;
    const productId = body.productId;
    const quantity = body.quantity;
    return axios.post(url, { userId, productId, quantity });
}

async function updateWishList(id, body) {
    const url = constructUrl(URLS.UPDATE_WISHlIST + id);
    const quantity = body.quantity;
    return axios.put(url, { quantity });
}

async function deleteWishList(id, body) {
    const url = constructUrl(URLS.DELETE_WISHLISH + id);
    const productId = body.productId;
    axios.delete(url, { productId });
}

export { getWishList, postWishList, updateWishList, deleteWishList };
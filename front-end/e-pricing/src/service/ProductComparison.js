import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';
import instance from './interceptors';

async function getProductComparsionAsync(type, seller_keyId, params = null) {
    const url = constructUrl(URLS.GET_PRODUCT_COMPARISON + type + '/' + seller_keyId);
    if (params) {
        return instance.get(url, { params });
    }
    return instance.get(url);
}

export { getProductComparsionAsync };
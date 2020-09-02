import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';


async function getProductComparsionAsync(type, seller_keyId, params = null) {
    const url = constructUrl(URLS.GET_PRODUCT_COMPARISON + type + '/' + seller_keyId);
    if (params) {
        return axios.get(url, { params });
    }
    return axios.get(url);
}

export { getProductComparsionAsync };
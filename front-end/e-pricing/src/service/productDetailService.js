import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';
import instance from './interceptors';


async function getProductDetailAsync(id) {
    const url = constructUrl(URLS.GET_PRODUCT_DETAIL + id);
    return instance.get(url);
}

export { getProductDetailAsync };
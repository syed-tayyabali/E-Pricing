import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';
import instance from './interceptors';

async function getProductCategoryAsync() {
    const url = constructUrl(URLS.GET_PRODUCT_BRAND_CATEGORY);
    return instance.get(url);
}

export { getProductCategoryAsync };
import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';


async function getProductCategoryAsync() {
    const url = constructUrl(URLS.GET_PRODUCT_BRAND_CATEGORY);
    return axios.get(url);
}

export { getProductCategoryAsync };
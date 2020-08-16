import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';


async function getProductDetailAsync(id) {
    const url = constructUrl(URLS.GET_PRODUCT_DETAIL + id);
    return axios.get(url);
}

export { getProductDetailAsync };
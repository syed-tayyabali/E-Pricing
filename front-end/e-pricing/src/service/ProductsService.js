import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';


async function getProductsAsync(id, params = null) {
    const url = constructUrl(URLS.GET_PRODUCTS + id);
    if (params) {
        return axios.get(url, { params });
    }
    return axios.get(url);
}

async function getProductsByWebCollectionAsync(id, webCollectionId, params = null) {
    console.log(params);
    const url = constructUrl(`${URLS.GET_PRODUCTBYWEBCOLLECTION}${id}/${webCollectionId}`);
    if (params) {
        return axios.get(url, { params });
    }
    return axios.get(url);

}

export { getProductsAsync, getProductsByWebCollectionAsync };
import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';


async function getProductsAsync(id) {
    const url = constructUrl(URLS.GET_PRODUCTS + id);
    return axios.get(url);
}

async function getProductsByWebCollectionAsync(id,webCollectionId) {
    console.log('in web ocoasd');
    const url = constructUrl(`${URLS.GET_PRODUCTBYWEBCOLLECTION}${id}/${webCollectionId}`);
    return axios.get(url);
}

export { getProductsAsync, getProductsByWebCollectionAsync };
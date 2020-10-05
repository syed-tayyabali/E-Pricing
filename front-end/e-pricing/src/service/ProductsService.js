import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';
import instance from './interceptors';


async function getProductsAsync(id, params = null) {
    const url = constructUrl(URLS.GET_PRODUCTS + id);
    if (params) {
        return instance.get(url, { params });
    }
    return instance.get(url);
}

async function getProductsByWebCollectionAsync(id, webCollectionId, params = null) {
    console.log(params);
    const url = constructUrl(`${URLS.GET_PRODUCTBYWEBCOLLECTION}${id}/${webCollectionId}`);
    if (params) {
        return instance.get(url, { params });
    }
    return instance.get(url);

}

export { getProductsAsync, getProductsByWebCollectionAsync };
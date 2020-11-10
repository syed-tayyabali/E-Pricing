import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';
import instance from './interceptors';

async function getHomeProductsAsync() {
    const url = constructUrl(URLS.HOME);
    return instance.get(url);
}

export { getHomeProductsAsync };
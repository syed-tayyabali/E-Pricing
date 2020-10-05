import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';
import instance from './interceptors';

async function getWebCollectionAsync(id) {
    const url = constructUrl(URLS.GET_WEBCOLLECTION + id);
    return instance.get(url);
}

export { getWebCollectionAsync };
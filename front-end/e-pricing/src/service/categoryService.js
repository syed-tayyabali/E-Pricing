import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';
import instance from './interceptors';


async function getCategoriesAsync() {
    const url = constructUrl(URLS.GET_CATEGORY);
    return instance.get(url);
}

export { getCategoriesAsync };
import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';


async function getCategoriesAsync() {
    const url = constructUrl(URLS.GET_CATEGORY);
    return axios.get(url);
}

export { getCategoriesAsync };
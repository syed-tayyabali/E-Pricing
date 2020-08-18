import axios from 'axios';
import { URLS } from './../constants/APIConstants';
import { constructUrl } from '.';


async function getWebCollectionAsync(id) {
    const url = constructUrl(URLS.GET_WEBCOLLECTION + id);
    return axios.get(url);
}

export { getWebCollectionAsync };
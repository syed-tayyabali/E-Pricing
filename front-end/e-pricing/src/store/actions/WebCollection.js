import { WEBCOLLECTION_ACTIONS } from "../../constants/actions";
import { request, success, failure } from './index';
import { getWebCollectionAsync } from '../../service/WebCollectionService';


function getWebCollection(id) {
    return async dispatch => {
        dispatch(request(WEBCOLLECTION_ACTIONS.GET_WEBCOLLECTION_REQUEST));
        try {
            const res = await getWebCollectionAsync(id);
            const Webcollection = res.data;
            dispatch(success(WEBCOLLECTION_ACTIONS.GET_WEBCOLLECTION_SUCCESS, Webcollection));
        } catch(e) {
            console.log(e);
            dispatch(failure(WEBCOLLECTION_ACTIONS.GET_WEBCOLLECTION_FAILURE, 'Something went wrong'));
        }
    }
}

export { getWebCollection };
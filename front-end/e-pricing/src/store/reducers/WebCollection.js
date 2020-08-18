import { WEBCOLLECTION_ACTIONS } from '../../constants/actions/index';

const initialState = {
    WebCollection: [],
    loader: false,
}

const WebCollectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case WEBCOLLECTION_ACTIONS.GET_WEBCOLLECTION_REQUEST:
            console.log('in request', action)
            return {
                ...state,
                loader: true,
            };
        case WEBCOLLECTION_ACTIONS.GET_WEBCOLLECTION_SUCCESS:
            console.log('in success', action)
            return {
                ...state,
                WebCollection: action.payload,
                loader: false,
            };
        case WEBCOLLECTION_ACTIONS.GET_WEBCOLLECTION_FAILURE:
            return {
                ...state,
                loader: false,
            };
        default:
            return state;
    }
}

export default WebCollectionReducer;
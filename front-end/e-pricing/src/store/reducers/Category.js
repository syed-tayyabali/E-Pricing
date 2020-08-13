import { CATEGORY_ACTIONS } from '../../constants/actions/index';

const initialState = {
    categories: [],
    loading: false,
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_ACTIONS.GET_CATEGORIES_REQUEST:
            console.log('in request', action)
            return {
                ...state,
                loading: true,
            };
        case CATEGORY_ACTIONS.GET_CATEGORIES_SUCCESS:
            console.log('in success', action)
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        case CATEGORY_ACTIONS.GET_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}

export default categoryReducer;
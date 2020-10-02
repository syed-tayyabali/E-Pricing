import { WISHLIST_ACTIONS } from '../../constants/actions';

const initialState = {
    userId: '',
    products: {},
    loading: false,
}

const wishlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case WISHLIST_ACTIONS.GET_WISHLIST_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loading: true
            };
        case WISHLIST_ACTIONS.GET_WISHLIST_SUCCESS:
            console.log('in success', action);
            return {
                ...state,
                userId: action.payload.userId,
                products: action.payload.products
            };
        case WISHLIST_ACTIONS.GET_WISHLIST_FAILURE:
            console.log('in failure', action);
            return {
                ...state,
                loading: true
            };

        case WISHLIST_ACTIONS.POST_WISHLIST_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loading: true
            };
        case WISHLIST_ACTIONS.POST_WISHLIST_SUCCESS:
            console.log('in success', action);
            return {
                userId: action.payload.userId,
                products: {
                    productId: action.payload,
                    quantity: action.payload
                }
            };
        case WISHLIST_ACTIONS.POST_WISHLIST_FAILURE:
            console.log('in failure', action);
            return {
                ...state,
                loading: true
            };

        case WISHLIST_ACTIONS.UPDATE_WISHLIST_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loading: true
            };
        case WISHLIST_ACTIONS.UPDATE_WISHLIST_SUCCESS:
            console.log('in success', action);
            return {
                userId: action.payload.userId,
                products: {
                    productId: action.payload,
                    quantity: action.payload
                }
            };
        case WISHLIST_ACTIONS.UPDATE_WISHLIST_FAILURE:
            console.log('in failure', action);
            return {
                ...state,
                loading: true
            };

        case WISHLIST_ACTIONS.DELETE_WISHLIST_REQUEST:
            console.log('in request', action);
            return {
                ...state,
                loading: true
            };
        case WISHLIST_ACTIONS.DELETE_WISHLIST_SUCCESS:
            console.log('in success', action);
            return {
                userId: action.payload.userId,
                products: {
                    productId: action.payload,
                    quantity: action.payload
                }
            };
        case WISHLIST_ACTIONS.DELETE_WISHLIST_FAILURE:
            console.log('in failure', action);
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}

export default wishlistReducer;
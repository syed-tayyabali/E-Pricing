import { combineReducers } from 'redux'
import category from './Category';
import products from './Products';
import productDetailReducer from './productDetail';
import WebCollectionReducer from './WebCollection';

const reducers = combineReducers({
    category,
    products,
    productDetailReducer,
    WebCollectionReducer,
})

export default reducers;
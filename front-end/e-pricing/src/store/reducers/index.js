import { combineReducers } from 'redux'
import category from './Category';
import products from './Products';
import productDetailReducer from './productDetail';

const reducers = combineReducers({
    category,
    products,
    productDetailReducer
})

export default reducers;
import { combineReducers } from 'redux'
import category from './Category';
import products from './Products';
import productDetailReducer from './productDetail';
import WebCollectionReducer from './WebCollection';
import productCategoryReducer from './ProductCategory';

const reducers = combineReducers({
    category,
    products,
    productDetailReducer,
    WebCollectionReducer,
    productCategoryReducer,
})

export default reducers;
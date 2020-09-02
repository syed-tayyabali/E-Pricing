import { combineReducers } from 'redux'
import category from './Category';
import products from './Products';
import productDetailReducer from './productDetail';
import WebCollectionReducer from './WebCollection';
import productCategoryReducer from './ProductCategory';
import productComparsionReducer from './ProductComparison';

const reducers = combineReducers({
    category,
    products,
    productDetailReducer,
    WebCollectionReducer,
    productCategoryReducer,
    productComparsionReducer,
})

export default reducers;
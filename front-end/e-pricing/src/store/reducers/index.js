import { combineReducers } from 'redux'
import category from './Category';
import products from './Products';
import productDetailReducer from './productDetail';
import WebCollectionReducer from './WebCollection';
import productCategoryReducer from './ProductCategory';
import productComparsionReducer from './ProductComparison';
import loginReducer from './Login';
import wishlistReducer from './WishList';

const reducers = combineReducers({
    category,
    products,
    productDetailReducer,
    WebCollectionReducer,
    productCategoryReducer,
    productComparsionReducer,
    loginReducer,
    wishlistReducer
})

export default reducers;
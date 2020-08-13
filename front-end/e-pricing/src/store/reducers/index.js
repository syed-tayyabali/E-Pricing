import { combineReducers } from 'redux'
import category from './Category';
import products from './Products';

const reducers = combineReducers({
    category,
    products
})

export default reducers;
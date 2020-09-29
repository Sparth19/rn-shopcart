import Product from '../../models/Product';
import PRODUCT from '../../data/dummy-data';
import CATEGORY from '../../data/category-data';
import { FETCH_PRODUCT } from '../actions/products';

const initialState = {
    availableCategories: CATEGORY,
    availableProducts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT:

            console.log(action.availableProducts)
            return {
                ...state,
                availableCategories: CATEGORY,
                availableProducts: action.availableProducts
            };
        default:
            return state;
    }
};
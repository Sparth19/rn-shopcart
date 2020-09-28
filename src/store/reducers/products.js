import Product from '../../models/Product';
import PRODUCT from '../../data/dummy-data';
import CATEGORY from '../../data/category-data';
import { FETCH_PRODUCT } from '../actions/products';

const initialState = {
    availableCategories: CATEGORY,
    availableProducts: PRODUCT
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT:
            return {
                ...state,
                availableCategories: CATEGORY,
                availableProducts: PRODUCT
            };
        default:
            return state;
    }
};
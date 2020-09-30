import Product from '../../models/Product';
import PRODUCT from '../../data/dummy-data';
import CATEGORY from '../../data/category-data';
import {FETCH_PRODUCT, FETCH_USER_PRODUCT} from '../actions/products';

const initialState = {
  availableCategories: CATEGORY,
  availableProducts: [],
  userProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT:
      //console.log(action.availableProducts);
      return {
        ...state,
        availableCategories: CATEGORY,
        availableProducts: action.availableProducts,
      };
    case FETCH_USER_PRODUCT:
      return {
        ...state,
        userProducts: action.userProducts,
      };

    default:
      return state;
  }
};

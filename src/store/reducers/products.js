import Product from '../../models/Product';
import PRODUCT from '../../data/dummy-data';
import CATEGORY from '../../data/category-data';

import {FETCH_PRODUCT,TOGGLE_FAVORITE, FETCH_USER_PRODUCT} from '../actions/products';

const initialState = {
  availableCategories: CATEGORY,
  availableProducts: [],
  userProducts: [],
  favoriteProduct: []
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
    case TOGGLE_FAVORITE:
      const existingIndex = state.favoriteProduct.findIndex(prod => prod.id === action.productId);
      if (existingIndex >= 0) {
        const updatedFavProduct = [...state.favoriteProduct];
        updatedFavProduct.splice(existingIndex, 1);
        return { ...state, favoriteProduct: updatedFavProduct };
      } else {
        const product = state.availableProducts.find(prod => prod.id === action.productId);
        return { ...state, favoriteProduct: state.favoriteProduct.concat(product) };
      }
    case FETCH_USER_PRODUCT:
      return {
        ...state,
        userProducts: action.userProducts,
      };

    default:
      return state;
  }
};

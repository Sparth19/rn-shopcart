import {FETCH_FAVORITES} from '../actions/favorites';
import {TOGGLE_FAVORITE} from '../actions/products';

const initialState = {
  favoritesProduct: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAVORITES:
      return {
        ...state,
        favoritesProduct: action.favorites,
      };

    case TOGGLE_FAVORITE:
      return {...state};

    default:
      return state;
  }
};

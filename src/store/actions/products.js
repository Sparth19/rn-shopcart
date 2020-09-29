import PRODUCT from '../../data/dummy-data';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';

export const fetchProduct = () => {
  return {
    type: FETCH_PRODUCT,
    //availableProducts: PRODUCT
  };
};

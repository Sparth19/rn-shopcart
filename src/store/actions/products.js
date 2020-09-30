import Product from '../../models/Product';

export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const FETCH_USER_PRODUCT = 'FETCH_USER_PRODUCT';

//fetch all products
export const fetchProduct = (category) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/products/readAllProduct',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Fetching Product failed..');
      }
      const resData = await response.json();

      const loadedProducts = [];
      //id, title, imageUrl, description, price, category, owner
      for (var key = 0; key < resData.length; key++) {
        if (resData[key].category === category) {
          loadedProducts.push(
            new Product(
              resData[key]._id,
              resData[key].title,
              resData[key].imageUrl,
              resData[key].description,
              resData[key].price,
              resData[key].category,
              resData[key].owner,
            ),
          );
        }
      }
      dispatch({
        type: FETCH_PRODUCT,
        availableProducts: loadedProducts,
      });
    } catch (error) {
      throw new Error('No products available!');
    }
  };
};

//fetch user products from node api
export const fetchUserProduct = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/products/readUserProduct',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Fetching user Product failed..');
      }
      const resData = await response.json();

      const loadedUserProducts = [];
      //id, title, imageUrl, description, price, category, owner
      for (var key = 0; key < resData.length; key++) {
        loadedUserProducts.push(
          new Product(
            resData[key]._id,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
            resData[key].category,
            resData[key].owner,
          ),
        );
      }
      dispatch({
        type: FETCH_USER_PRODUCT,
        userProducts: loadedUserProducts,
      });
    } catch (error) {
      throw new Error('No user products available!');
    }
  };
};

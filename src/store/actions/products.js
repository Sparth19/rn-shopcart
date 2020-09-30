
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
import Product from '../../models/Product';





export const FETCH_USER_PRODUCT = 'FETCH_USER_PRODUCT';



export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, productId: id };
}
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

//crete new product from edit(new) products screen

export const createProduct = (title, image, price, description, category) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/products/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            title: title,
            imageUrl: image,
            description: description,
            price: price,
            category: category,
          }),
        },
      );

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Create product failed.');
      }

      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      throw new Error('Error in create product');
    }
  };
};

//edit product from edit products screen

export const updateProduct = (
  productId,
  title,
  image,
  description,
  category,
) => {
  return async (dispatch, getState) => {
    //console.log(title);
    try {
      const token = getState().auth.token;
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/products/updateProduct/' + productId,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            title: title,
            imageUrl: image,
            description: description,
            category: category,
          }),
        },
      );

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Update product failed.');
      }

      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      throw new Error('Error in update product');
    }
  };
};

//delete product from user products screen

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/products/delete/' + productId,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('delete product failed.');
      }

      const resData = await response.json();
      console.log(resData);
    } catch (err) {
      throw new Error('Error in delete product');
    }
  };
};


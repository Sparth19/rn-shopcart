export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
import Product from '../../models/Product';

export const toggleFavorite = (id) => {
  return { type: TOGGLE_FAVORITE, productId: id };
}

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



// export const fetchProduct = (category) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     try {
//       const response = await fetch(
//         'https://shopcartapi.herokuapp.com/products/readAllProduct',
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Bearer ' + token,
//           },
//         },
//       );

//       if (!response.ok) {
//         const resData = await response.json();
//         console.log(resData);
//         throw new Error('Fetching Product failed..');
//       }
//       const resData = await response.json();

//       const loadedProducts = [];
//       //id, title, imageUrl, description, price, category, owner
//       for (var key = 0; key < resData.length; key++) {
//         if (resData[key].category === category) {
//           loadedProducts.push(
//             new Product(
//               resData[key]._id,
//               resData[key].title,
//               resData[key].imageUrl,
//               resData[key].description,
//               resData[key].price,
//               resData[key].category,
//               resData[key].owner,
//             ),
//           );
//         }
//       }
//       dispatch({
//         type: FETCH_PRODUCT,
//         availableProducts: loadedProducts,
//       });
//     } catch (error) {
//       throw new Error('No products available!');
//     }
//   };
// };

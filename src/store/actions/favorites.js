export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';
export const FETCH_FAVORITES = 'FETCH_FAVORITES';

export const fetchFavorites = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/favorites/readUserFavorites',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Something Went wrong in Favorites api!');
      }

      const resData = await response.json();
      //console.log(resData);

      const loadedFav = [];

      for (const key in resData) {
        loadedFav.push({
          favId: resData[key]._id,
          favProductId: resData[key].productId,
        });
      }

      dispatch({
        type: FETCH_FAVORITES,
        favorites: loadedFav,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const toggleFavoritesApi = (productId) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/favorites/toggleFavorites/' +
          productId,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      if (!response.ok) {
        const resData = await response.json();
        console.log(resData);
        throw new Error('Update fav failed.');
      }

      const resData = await response.json();
      console.log('in toggle');
      console.log(resData);

      dispatch({
        type: TOGGLE_FAVORITES,
      });
    } catch (err) {
      console.log(err);
      throw new Error('Error in favorite toggles product');
    }
  };
};

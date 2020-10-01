import Order from '../../models/OrderItem';
import moment from 'moment';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDER';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        'https://shopcartapi.herokuapp.com/orders/read',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Something Went wrong!');
      }

      const resData = await response.json();

      const loadedOrders = [];

      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            resData[key].orderDate,
            // moment(resData[key].date).format('MMMM Do YYYY, hh:mm'),
          ),
        );
      }
      // console.log('fetch orders');
      // console.log(loadedOrders);
      dispatch({
        type: SET_ORDER,
        orders: loadedOrders,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const date = moment(new Date()).format('MMMM Do YYYY, hh:mm');
    const response = await fetch(
      'https://shopcartapi.herokuapp.com/orders/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          cartItems: cartItems,
          totalAmount: totalAmount,
          orderDate: date,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something Went wrong!');
    }

    const resData = await response.json();
    //console.log(resData);
    console.log('Add orders');
    console.log(resData);

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData._id,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};

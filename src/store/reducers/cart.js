import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/CartItem';

const initialState = {
    items: {},
    totalAmount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            const prodImage = addedProduct.imageUrl;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    prodImage,
                    state.items[addedProduct.id].sum + prodPrice
                );
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodImage, prodPrice);
            }//  console.log(state);
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid];
            const identifier = action.identifier;
            const currentQty = selectedCartItem.quantity;

            let variable;
            let sumVariable
            if (identifier === 'add') {
                variable = selectedCartItem.quantity + 1
                sumVariable = selectedCartItem.sum + selectedCartItem.productPrice
                totalVariable = state.totalAmount + selectedCartItem.productPrice
            } else {
                variable = selectedCartItem.quantity - 1
                sumVariable = selectedCartItem.sum - selectedCartItem.productPrice
                totalVariable = state.totalAmount - selectedCartItem.productPrice

            }
            let updatedCartItems;
            if (currentQty > 1) {
                const updatedCartItem = new CartItem(
                    variable,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.productImage,
                    sumVariable
                );
                updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.pid];
            }
            console.log(updatedCartItems);
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: totalVariable
            };
        case ADD_ORDER:
            return initialState;
        case DELETE_FROM_CART:
            if (!state.items[action.pid]) {
                return state;
            }
            const updatedItems = { ...state.items };
            const itemTotal = state.items[action.pid].sum;
            delete updatedItems[action.pid]
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            };
    }
    return state;
}
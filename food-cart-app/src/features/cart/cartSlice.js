import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      //payload = id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      //payload = id
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((sum, curr) => sum + curr.quantity, 0);
export const getTotalPrice = (store) =>
  store.cart.cart.reduce((sum, curr) => sum + curr.totalPrice, 0);
export const getCart = (store) => store.cart;
export function getCurrentQuantityById(id) {
  return function (store) {
    return store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
  };
}
// export const getCurrentQuantityById = (id) => store;

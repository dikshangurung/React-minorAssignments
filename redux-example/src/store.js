import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/AccountSlice";
import customerReducer from "./features/customers/CustomerSlice";
const store = configureStore({
	reducer: {
		account: accountReducer,
		customer: customerReducer,
	},
});
export default store;
// store.dispatch({ type: "account/deposit", payload: 500 });
// console.log(store.getState());
// store.dispatch({
// 	type: "account/returnLoan",
// 	payload: { amount: 1000, purpose: "Buy a car" },
// });
// console.log(store.getState());
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());
// store.dispatch(deposit(500));
// console.log(store.getState());
// store.dispatch(withdraw(200));
// console.log(store.getState());
// store.dispatch(requestLoan(1000, "car insurance"));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());

// store.dispatch(createCustomer("Dikshan Gurung", "9289103"));
// console.log(store.getState());

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};
export default function accountReducer(state = initialStateAccount, action) {
	switch (action.type) {
		case "account/deposit":
			return { ...state, balance: state.balance + action.payload };
		case "account/withdraw":
			return { ...state, balance: state.balance - action.payload };
		case "account/returnLoan":
			if (state.loan > 0) return state;
			return {
				...state,
				loan: action.payload.amount,
				loanPurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};
		case "account/payLoan":
			return {
				...state,
				loan: 0,
				loanPurpose: "",
				balance: state.balance - state.loan,
			};
		default:
			return state;
	}
}
//---------------------------ACTION CREATOR export FUNCTION ----------------------------------//

export function deposit(amount, currency) {
	if (currency === "USD") return { type: "account/deposit", payload: amount };
	return async function (dispatch, getState) {
		const res = await fetch(
			`https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD`
		);
	};
}

export function withdraw(amount) {
	return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
	return {
		type: "account/returnLoan",
		payload: { amount: amount, purpose: purpose },
	};
}
export function payLoan() {
	return { type: "account/payLoan" };
}

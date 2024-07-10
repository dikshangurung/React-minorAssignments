import { useDispatch, useSelector } from "react-redux";

function formatCurrency(value) {
	return new Intl.NumberFormat("en", {
		style: "currency",
		currency: "USD",
	}).format(value);
}

function BalanceDisplay() {
	const {
		loan: currentLoan,
		loanPurpose: currentLoanPurpose,
		balance,
	} = useSelector((state) => state.account);
	return <div className="balance">{formatCurrency(123456)}</div>;
}

export default BalanceDisplay;
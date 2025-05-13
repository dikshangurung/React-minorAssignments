import { useState, useEffect } from "react";

const useFinancialData = () => {
	const [transactions, setTransactions] = useState([]);
	const [loans, setLoans] = useState([]);
	const [balance, setBalance] = useState(0);

	// Function to add a transaction
	const addTransaction = (transaction) => {
		setTransactions([...transactions, transaction]);
		updateBalance(transaction);
	};

	// Function to add a loan
	const addLoan = (loan) => {
		setLoans([...loans, loan]);
	};

	// Function to update balance after each transaction
	const updateBalance = (transaction) => {
		if (transaction.type === "income") {
			setBalance((prev) => prev + transaction.amount);
		} else if (transaction.type === "expense") {
			setBalance((prev) => prev - transaction.amount);
		}
	};

	// Calculate total income and expenses
	const getTotalIncome = () => {
		return transactions
			.filter((t) => t.type === "income")
			.reduce((acc, curr) => acc + curr.amount, 0);
	};

	const getTotalExpenses = () => {
		return transactions
			.filter((t) => t.type === "expense")
			.reduce((acc, curr) => acc + curr.amount, 0);
	};

	// Effect to initially load data (simulated fetch here)
	useEffect(() => {
		// Simulated fetched data
		const fetchedTransactions = [
			{ id: 1, type: "income", amount: 1000 },
			{ id: 2, type: "expense", amount: 300 },
		];
		const fetchedLoans = [{ id: 1, name: "John Doe", amount: 5000 }];

		setTransactions(fetchedTransactions);
		setLoans(fetchedLoans);
		setBalance(
			fetchedTransactions.reduce((acc, txn) => {
				return txn.type === "income"
					? acc + txn.amount
					: acc - txn.amount;
			}, 0)
		);
	}, []);

	return {
		transactions,
		loans,
		balance,
		addTransaction,
		addLoan,
		getTotalIncome,
		getTotalExpenses,
	};
};

export default useFinancialData;

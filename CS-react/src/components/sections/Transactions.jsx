import React, { useState } from "react";

function Transactions() {
	const [transactions, setTransactions] = useState([
		{ id: 1, type: "deposit", amount: 500, date: "2023-01-01" },
		{ id: 2, type: "withdrawal", amount: 300, date: "2023-01-02" },
	]);

	// Function to handle adding a transaction (placeholder functionality)
	const addTransaction = (type) => {
		const newTransaction = {
			id: transactions.length + 1,
			type,
			amount: type === "deposit" ? 100 : -50,
			date: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
		};
		setTransactions([...transactions, newTransaction]);
	};

	return (
		<div className="transactions">
			<h2>Recent Transactions</h2>
			<ul>
				{transactions.map((tx) => (
					<li key={tx.id}>
						{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} of
						Rs. {Math.abs(tx.amount)} on {tx.date}
					</li>
				))}
			</ul>
			<button onClick={() => addTransaction("deposit")}>
				Add Deposit
			</button>
			<button onClick={() => addTransaction("withdrawal")}>
				Add Withdrawal
			</button>
		</div>
	);
}

export default Transactions;

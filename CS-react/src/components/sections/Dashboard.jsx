import React from "react";
import useFinancialData from "./hooks/useFinancialData";
import {
	calculateTotalBalance,
	calculateTotalIncome,
	calculateTotalExpenses,
	formatCurrency,
} from "./utils/calculations";

function Dashboard() {
	const { transactions } = useFinancialData();

	return (
		<div>
			<h1>Dashboard</h1>
			<p>
				Current Balance:{" "}
				{formatCurrency(calculateTotalBalance(transactions))}
			</p>
			<p>
				Total Income:{" "}
				{formatCurrency(calculateTotalIncome(transactions))}
			</p>
			<p>
				Total Expenses:{" "}
				{formatCurrency(calculateTotalExpenses(transactions))}
			</p>
		</div>
	);
}

export default Dashboard;

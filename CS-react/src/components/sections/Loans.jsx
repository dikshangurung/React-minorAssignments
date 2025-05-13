import React, { useState } from "react";

function Loans() {
	const [loans, setLoans] = useState([
		{ id: 1, name: "John Doe", amount: 2000, purpose: "Business Startup" },
		{ id: 2, name: "Jane Smith", amount: 1500, purpose: "Car Repair" },
	]);

	// Function to handle adding new loans (placeholder functionality)
	const addLoan = () => {
		const newLoan = {
			id: loans.length + 1,
			name: "New Person",
			amount: 1000,
			purpose: "New Loan",
		};
		setLoans([...loans, newLoan]);
	};

	return (
		<div className="loans">
			<h2>Loans Given</h2>
			<ul>
				{loans.map((loan) => (
					<li key={loan.id}>
						{loan.name} - Rs. {loan.amount} for {loan.purpose}
					</li>
				))}
			</ul>
			<button onClick={addLoan}>Add Loan</button>
		</div>
	);
}

export default Loans;

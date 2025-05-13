import React, { useState } from "react";
import NavBar from "../components/navigation";

function Loans({
	movements,
	setMovements,
	balance,
	setBalance,
	currency,
	setCurrency,
	handleConversion,
	convertedBalance,
}) {
	const [userName, setUserName] = useState("Avisek Karki");

	const handleClearLoan = (id, amount) => {
		// const updatedMovements = movements.map(movement =>
		//     movement.id === id ? { ...movement, cleared: true } : movement
		// );
		//convert to nrs
		setCurrency("NRS");

		const updatedMovements = movements.map((movement) => {
			if (movement.id === id) {
				return { ...movement, loan: false }; // Change loan:true to loan:false
			}
			return movement;
		});
		function getDate() {
			const date = new Date();
			const year = date.getFullYear();
			const month = `${date.getMonth() + 1}`.padStart(2, 0);
			const day = `${date.getDate()}`.padStart(2, 0);
			return `${year}/${month}/${day}`;
		}
		const newMovement = {
			id: movements.length + 1, // Assuming each movement has a unique id
			name: movements.find((movement) => movement.id === id).name,
			amount: amount,
			type: "in",
			date: getDate(), // Capture the current date-time as ISO string
			purpose: "Loan Cleared",
			loan: false,
		};

		setMovements([...updatedMovements, newMovement]);

		// Update the balance by adding the cleared loan amount
		const updatedBalance = balance + amount;
		setBalance(updatedBalance);

		console.log("Loan Cleared. Updated Balance:", updatedBalance);
	};

	return (
		<section className="hide_inner_two">
			<NavBar
				userName={userName}
				balance={balance}
				movements={movements}
				setBalance={setBalance}
				setMovements={setMovements}
				currency={currency}
				setCurrency={setCurrency}
				handleConversion={handleConversion}
				convertedBalance={convertedBalance}
			/>
			<div className="movement_activity">
				{movements
					.filter((movement) => movement.loan === true)
					.map((movement) => (
						<div key={movement.id} className="movement out">
							<div className="movement_position">
								<div className="movement_info">
									<h2>
										{movement.name}, {movement.purpose}
									</h2>
									<h3>{movement.date}</h3>
								</div>
								<div className="money_movement">
									Nrs. {movement.amount}
								</div>
								<div
									className="check"
									onClick={() =>
										handleClearLoan(
											movement.id,
											movement.amount
										)
									}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth="1.5"
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 12.75l6 6 9-13.5"
										/>
									</svg>
								</div>
							</div>
						</div>
					))}
			</div>
		</section>
	);
}

export default Loans;

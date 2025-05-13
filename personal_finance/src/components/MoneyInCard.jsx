import React, { useState } from "react";

function MoneyInCard({
	movements,
	setMovements,
	balance,
	setBalance,
	setCurrency,
}) {
	const [moneyIn, setMoneyIn] = useState({
		name: "",
		amount: "",
		purpose: "",
	});

	const handleChange = (e) => {
		setMoneyIn({ ...moneyIn, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//change the currency to nrs
		setCurrency("NRS");
		function getDate() {
			const date = new Date();
			const year = date.getFullYear();
			const month = `${date.getMonth() + 1}`.padStart(2, 0);
			const day = `${date.getDate()}`.padStart(2, 0);
			return `${year}/${month}/${day}`;
		}
		if (moneyIn.amount > 0) {
			// Calculate new balance
			const newBalance = balance + parseFloat(moneyIn.amount);
			// Update the balance state
			setBalance(newBalance);

			// Create a new movement
			const newMovement = {
				id: movements.length + 1, // Assuming each movement has a unique id
				name: moneyIn.name,
				amount: parseFloat(moneyIn.amount),
				type: "in",
				date: getDate(), // Capture the current date-time as ISO string
				purpose: moneyIn.purpose,
				loan: false,
			};

			// Update the movements array
			setMovements([...movements, newMovement]);

			// Optionally clear the form fields after submission
			setMoneyIn({
				name: "",
				amount: "",
				purpose: "",
			});

			console.log("Money In:", moneyIn, "New Balance:", newBalance);
		} else {
			console.log("Amount must be greater than 0.");
		}
	};

	return (
		<div className="card two">
			<div className="card_position">
				<h1>Money In</h1>
				<form autoComplete="off" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Name &nbsp; &nbsp;</label>
						<input
							type="text"
							placeholder=" "
							name="name"
							value={moneyIn.name}
							onChange={handleChange}
							className="form_input money_in_name"
						/>
					</div>
					<div className="form-group">
						<label>Amount</label>
						<input
							type="number"
							placeholder=" "
							name="amount"
							value={moneyIn.amount}
							onChange={handleChange}
							className="form_input money_in_amount"
						/>
					</div>
					<div className="form-group">
						<label>Purpose</label>
						<input
							type="text"
							placeholder=" "
							name="purpose"
							value={moneyIn.purpose}
							onChange={handleChange}
							className="form_input money_in_purpose"
						/>
					</div>
					<button type="submit" className="action money_in">
						→
					</button>
				</form>
			</div>
		</div>
	);
}

export default MoneyInCard;

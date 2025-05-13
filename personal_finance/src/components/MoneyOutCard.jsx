import React, { useState } from "react";

function MoneyOutCard({
	movements,
	setMovements,
	balance,
	setBalance,
	setCurrency,
}) {
	const [moneyOut, setMoneyOut] = useState({
		name: "",
		amount: "",
		purpose: "",
	});

	const handleChange = (e) => {
		setMoneyOut({ ...moneyOut, [e.target.name]: e.target.value });
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
		const amount = parseFloat(moneyOut.amount);

		if (amount > 0 && amount <= balance) {
			const newBalance = balance - amount;
			setBalance(newBalance);

			const newMovement = {
				id: movements.length + 1, // Assuming each movement has a unique id
				name: moneyOut.name,
				amount: amount,
				type: "out",
				date: getDate(), // Capture the current date-time as ISO string
				purpose: moneyOut.purpose,
				loan: false,
			};

			// Update the movements array
			setMovements([...movements, newMovement]);

			setMoneyOut({
				name: "",
				amount: "",
				purpose: "",
			});

			console.log(
				"Money Out Processed:",
				moneyOut,
				"New Balance:",
				newBalance
			);
		} else if (amount <= 0) {
			console.log("Amount must be greater than 0.");
		} else {
			console.log("Insufficient funds.");
		}
	};

	return (
		<div className="card three">
			<div className="card_position">
				<h1>Money Out</h1>
				<form autoComplete="off" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Name &nbsp; &nbsp;</label>
						<input
							type="text"
							placeholder=" "
							name="name"
							value={moneyOut.name}
							onChange={handleChange}
							className="form_input money_out_name"
						/>
					</div>
					<div className="form-group">
						<label>Amount</label>
						<input
							type="number"
							placeholder=" "
							name="amount"
							value={moneyOut.amount}
							onChange={handleChange}
							className="form_input money_out_amount"
						/>
					</div>
					<div className="form-group">
						<label>Purpose</label>
						<input
							type="text"
							placeholder=" "
							name="purpose"
							value={moneyOut.purpose}
							onChange={handleChange}
							className="form_input money_out_purpose"
						/>
					</div>
					<button type="submit" className="action money_out">
						→
					</button>
				</form>
			</div>
		</div>
	);
}

export default MoneyOutCard;

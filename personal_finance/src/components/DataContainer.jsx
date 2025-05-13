import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
function DataContainer({ movements, setMovements, currency }) {
	// State for movements

	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);
	const [saving, setSaving] = useState(0);
	useEffect(() => {
		let totalIncome = 0;
		let totalExpense = 0;

		movements.forEach((movement) => {
			if (movement.type === "in") {
				totalIncome += movement.amount;
			} else if (movement.type === "out") {
				totalExpense += movement.amount;
			}
		});

		// Update state for income and expense
		setIncome(totalIncome);
		setExpense(totalExpense);
		// Saving calculation: income - expense
		setSaving(totalIncome - totalExpense);
	}, [movements]);
	return (
		<section className="data_container">
			<aside className="movement_container">
				<div className="movement_activity">
					{movements.map((movement) => (
						<div
							key={movement.id}
							className={`movement ${movement.type}`}
						>
							<div className="movement_position">
								<div className="movement_info">
									<h2>
										{movement.name},{movement.purpose}
									</h2>
									<h3>{movement.date}</h3>
								</div>
								<div className="money_movement">
									<span className="money_movementz">
										NRS {movement.amount}
									</span>
									<br />
									<span className={`${movement.type}_number`}>
										{movement.type === "in"
											? " Deposit"
											: " Withdraw"}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</aside>
			<aside className="data">
				<div className="loan_box">
					Loan <br />
					Given{" "}
					<span className="view">
						<NavLink to="/loans">View ...</NavLink>
					</span>
				</div>
				<div className="census">
					<h2 style={{ color: "#10715d" }}>
						Income: <span className="income">{income}</span>
					</h2>
					<h2 style={{ color: "#e52a5a" }}>
						Expense: <span className="expense">{expense}</span>
					</h2>
					<h2>
						Saving: <span className="saving">{saving}</span>
					</h2>
				</div>
				{/* <div className="sorting">
					<label className="sort">Sorting: </label>
					<br />
					<label htmlFor="date">Date</label>
					<input type="radio" id="date" name="sort" value="date" />
					<br />
					<button
						className="sort_button"
						onClick={() =>
							updateFinancialData({
								income: 6000,
								expense: 4000,
								saving: 2000,
							})
						}
					>
						ascending
					</button>
				</div> */}
			</aside>
		</section>
	);
}

export default DataContainer;

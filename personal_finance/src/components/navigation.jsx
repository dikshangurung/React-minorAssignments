import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { NavLink, useLocation } from "react-router-dom";

function NavBar({
	userName,
	balance,
	onLogout,
	movements,
	setMovements,
	setBalance,
	currency,
	setCurrency,
	handleConversion,
	convertedBalance,
}) {
	// const [originalBalance, setOriginalBalance] = useState(balance);
	// const [convertedBalance, setConvertedBalance] = useState(balance);
	// const apiKey = "6751a618d5-1b4b4b413e-sbv3o9";
	// const [originalMovements, setOriginalMovements] = useState(movements);
	// const [convertedMovements, setConvertedMovements] = useState(movements);
	// console.log(originalBalance);
	// console.log(convertedBalance);
	// console.log(originalMovements);
	// // useEffect(() => {
	// // 	// setCurrency("NRS");
	// // 	console.log("ma ta on");
	// // 	setOriginalBalance(balance);
	// // 	setOriginalMovements(movements);
	// // }, [movements]);
	// const handleConversion = async () => {
	// 	if (currency === "NRS") {
	// 		const url = `https://api.fastforex.io/fetch-one?from=NPR&to=CAD&api_key=${apiKey}`;
	// 		try {
	// 			const response = await fetch(url);
	// 			const data = await response.json();
	// 			const rate = data.result.CAD;
	// 			if (rate && rate > 0) {
	// 				setConvertedBalance((originalBalance * rate).toFixed(2));
	// 				setCurrency("CAD");
	// 				setMovements((prevMovements) => {
	// 					return prevMovements.map((movement) => {
	// 						return {
	// 							...movement,
	// 							amount: (movement.amount * rate).toFixed(2),
	// 						};
	// 					});
	// 				});
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching conversion rate:", error);
	// 		}
	// 	} else {
	// 		setConvertedBalance(originalBalance);
	// 		setCurrency("NRS");
	// 		setMovements(originalMovements);
	// 	}
	// };
	const location = useLocation();
	return (
		<nav>
			<div className="ldata">
				<h2>
					Current balance <br />
					<span className="current_money">{`${convertedBalance} ${currency}`}</span>
					<button onClick={handleConversion}>
						{currency === "NRS"
							? "Convert to CAD"
							: "Convert to NRS"}
					</button>
				</h2>
			</div>
			<div className="pdata">
				<img src={logo} alt="Logo" className="logo" />
				<h1 className="highlight">{userName}</h1>
			</div>
			<div className="rdata">
				<div className="fix" onClick={onLogout}>
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
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
						/>
					</svg>
					<h2 className="logout">
						{location.pathname === "/" ? (
							<NavLink to="/loans">Loans</NavLink>
						) : (
							<NavLink to="/">Home</NavLink>
						)}
					</h2>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;

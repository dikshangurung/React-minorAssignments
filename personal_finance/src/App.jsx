import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Loans from "./pages/Loans";

function App() {
	const [movements, setMovements] = useState([
		{
			id: 1,
			name: "John Doe",
			date: "2020/09/11",
			amount: 500,
			type: "in",
			purpose: "KB Naan House",
			loan: false,
		},
		{
			id: 2,
			name: "Jack Hans",
			date: "2020/09/11",
			amount: 200,
			type: "out",
			purpose: "KB Naan House Demo",
			loan: true,
		},
	]);
	const [balance, setBalance] = useState(1000);

	//RestAPI currency conversion
	const [currency, setCurrency] = useState("NRS");
	const [originalBalance, setOriginalBalance] = useState(balance);
	const [convertedBalance, setConvertedBalance] = useState(balance);
	const apiKey = "6751a618d5-1b4b4b413e-sbv3o9";
	useEffect(() => {
		setOriginalBalance(balance);
		setConvertedBalance(balance);
		console.log(originalBalance);
	}, [balance]);

	const handleConversion = async () => {
		if (currency === "NRS") {
			const url = `https://api.fastforex.io/fetch-one?from=NPR&to=CAD&api_key=${apiKey}`;
			try {
				const response = await fetch(url);
				const data = await response.json();
				const rate = data.result.CAD;
				if (rate && rate > 0) {
					setConvertedBalance((originalBalance * rate).toFixed(2));
					setCurrency("CAD");
				}
			} catch (error) {
				console.error("Error fetching conversion rate:", error);
			}
		} else {
			setConvertedBalance(originalBalance);
			setCurrency("NRS");
		}
	};
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<Home
								movements={movements}
								setMovements={setMovements}
								balance={balance}
								setBalance={setBalance}
								currency={currency}
								setCurrency={setCurrency}
								handleConversion={handleConversion}
								convertedBalance={convertedBalance}
							/>
						}
					/>
					<Route
						path="/loans"
						element={
							<Loans
								movements={movements}
								setMovements={setMovements}
								balance={balance}
								setBalance={setBalance}
								currency={currency}
								setCurrency={setCurrency}
								handleConversion={handleConversion}
								convertedBalance={convertedBalance}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

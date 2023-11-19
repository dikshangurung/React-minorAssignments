// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { Children, useEffect } from "react";
import { useState } from "react";
export default function App() {
	const [input, setInput] = useState(0);
	const [convertedAmount, setConvertedAmount] = useState(0);
	const [transferFromCurr, setTransferFromCurr] = useState("EUR");
	const [transferToCurr, setTransferToCurr] = useState("USD");
	function handleTransferFrom(event) {
		setTransferFromCurr(event.target.value);
	}
	function handleTransferTo(event) {
		setTransferToCurr(event.target.value);
	}
	useEffect(
		function () {
			async function getCurr() {
				// const response = await fetch(
				// 	`https://api.frankfurter.app/latest?amount=100&from=INR&to=USD`
				// );
				const response = await fetch(
					`https://api.frankfurter.app/latest?amount=${input}&from=${transferFromCurr}&to=${transferToCurr}`
				);
				const data = await response.json();
				console.log(data);
				setConvertedAmount(data.rates[transferToCurr]);
			}
			getCurr();
		},
		[input, transferFromCurr, transferToCurr]
	);
	return (
		<div>
			<Input input={input} setInput={setInput} />
			<TransferFrom
				handleTransferFrom={handleTransferFrom}
				value={transferFromCurr}
			/>
			<TransferTo
				handleTransferTo={handleTransferTo}
				value={transferToCurr}
			/>
			<Output>
				{convertedAmount} {transferToCurr}
			</Output>
		</div>
	);
}
function Input({ input, setInput }) {
	function handleInputChange(event) {
		if (isNaN(event.target.value)) {
			setInput("NaN");
			return;
		}
		setInput(event.target.value);
	}
	return <input type="text" onChange={handleInputChange} value={input} />;
}
function TransferFrom({ handleTransferFrom, value }) {
	return (
		<select onChange={handleTransferFrom} value={value}>
			<option value="USD">USD</option>
			<option value="EUR">EUR</option>
			<option value="CAD">CAD</option>
			<option value="INR">INR</option>
		</select>
	);
}
function TransferTo({ handleTransferTo, value }) {
	return (
		<select onChange={handleTransferTo} value={value}>
			<option value="USD">USD</option>
			<option value="EUR">EUR</option>
			<option value="CAD">CAD</option>
			<option value="INR">INR</option>
		</select>
	);
}
function Output({ children }) {
	return <p>{children}</p>;
}

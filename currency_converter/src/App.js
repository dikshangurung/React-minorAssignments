// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect } from "react";
import { useState } from "react";
export default function App() {
	return (
		<div>
			<Input />
			<TransferFrom />
			<TransferTo />
			<Output />
		</div>
	);
}
function Input() {
	const [input, setInput] = useState(0);
	function handleInputChange(event) {
		if (isNaN(event.target.value)) {
			setInput("NaN");
			return;
		}
		setInput(event.target.value);
	}
	console.log(input);
	return <input type="text" onChange={handleInputChange} value={input} />;
}
function TransferFrom() {
	return (
		<select>
			<option value="USD">USD</option>
			<option value="EUR">EUR</option>
			<option value="CAD">CAD</option>
			<option value="INR">INR</option>
		</select>
	);
}
function TransferTo() {
	return (
		<select>
			<option value="USD">USD</option>
			<option value="EUR">EUR</option>
			<option value="CAD">CAD</option>
			<option value="INR">INR</option>
		</select>
	);
}
function Output() {
	return (
		<p>
			OUTPUT: <span>0</span>
		</p>
	);
}

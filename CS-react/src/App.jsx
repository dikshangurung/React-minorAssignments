import React from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/sections/Dashboard";
import Transactions from "./components/sections/Transactions";
import Loans from "./components/sections/Loans";

function App() {
	return (
		<Layout>
			<Dashboard /> // Your dashboard view component
			<Transactions /> // Component for handling transactions
			<Loans /> // Component for managing loans
		</Layout>
	);
}

export default App;

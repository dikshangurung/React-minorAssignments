import NavBar from "../components/navigation";
import CardSection from "../components/CardSection";

import React, { useState } from "react";
function Home({
	movements,
	setMovements,
	balance,
	setBalance,
	currency,
	setCurrency,
	handleConversion,
	convertedBalance,
}) {
	const [userName, setUserName] = useState("Avisekh Karki");

	return (
		<section className="hide_two">
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
			<CardSection
				movements={movements}
				setMovements={setMovements}
				balance={balance}
				setBalance={setBalance}
				currency={currency}
				handleConversion={handleConversion}
				setCurrency={setCurrency}
			/>
		</section>
	);
}

export default Home;

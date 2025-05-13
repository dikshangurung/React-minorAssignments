import React, { useState } from "react";
import LoanCard from "./LoanCard";
import MoneyInCard from "./MoneyInCard";
import MoneyOutCard from "./MoneyOutCard";
import DataContainer from "./DataContainer";

function CardSection({
	movements,
	setMovements,
	balance,
	setBalance,
	currency,
	setCurrency,
}) {
	return (
		<section className="hide_inner_one">
			<main>
				<section className="cards">
					<LoanCard
						movements={movements}
						setMovements={setMovements}
						balance={balance}
						setBalance={setBalance}
						setCurrency={setCurrency}
					/>
					<MoneyInCard
						movements={movements}
						setMovements={setMovements}
						balance={balance}
						setBalance={setBalance}
						setCurrency={setCurrency}
					/>
					<MoneyOutCard
						movements={movements}
						setMovements={setMovements}
						balance={balance}
						setBalance={setBalance}
						setCurrency={setCurrency}
					/>
				</section>
				<DataContainer
					movements={movements}
					setMovements={setMovements}
					currency={currency}
				/>
			</main>
		</section>
	);
}

export default CardSection;

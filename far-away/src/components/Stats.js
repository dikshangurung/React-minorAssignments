export function Stats({ items }) {
	if (items.length === 0) {
		return (
			<footer className="stats">
				<em>Start adding items to your cart</em>
			</footer>
		);
	}
	const numItems = items.length;
	const numPacked = items.filter((item) => item.packed === true).length;
	const percentage = Math.round((numPacked / numItems) * 100) || 0;
	return (
		<footer className="stats">
			<em>
				{percentage === 100
					? `You have already packed everything, you are ready to go`
					: `You have ${numItems} items on your list, and you already packed 
				${numPacked}(${percentage}%)`}
			</em>
		</footer>
	);
}

export function Item({ item, handleDeleteItem, handleCheckbox }) {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => handleCheckbox(item.id)}
			/>
			<span style={item.packed ? { textDecoration: "line-through" } : {}}>
				{item.quantity} {item.description}
			</span>
			<button
				onClick={() => handleDeleteItem(item.id)}
				style={{ color: "red", fontSize: "30px" }}
			>
				&times;
			</button>
		</li>
	);
}

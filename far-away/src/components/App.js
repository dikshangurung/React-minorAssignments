import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

export default function App() {
	const [items, setItems] = useState([]);
	function handleAddItems(item) {
		setItems((prevItems) => {
			// console.log(items);
			return [...prevItems, item];
		});
		// console.log(items);
	}
	function handleDeleteItem(id) {
		setItems((prevItems) => prevItems.filter((item) => item.id !== id));
	}
	function handleCheckbox(id) {
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}
	function handleClearlist() {
		const confirmed = window.confirm(
			"Are you sure you want to delete all items?"
		);
		if (confirmed) {
			setItems([]);
		}
	}
	return (
		<div className="app">
			<Logo />
			<Form handleAddItems={handleAddItems} />
			<PackingList
				items={items}
				handleDeleteItem={handleDeleteItem}
				handleCheckbox={handleCheckbox}
				handleClearlist={handleClearlist}
			/>
			<Stats items={items} />
		</div>
	);
}

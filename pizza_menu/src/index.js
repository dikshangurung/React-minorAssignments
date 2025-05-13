import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { ReactDOM } from "react";
const pizzaData = [
	{
		name: "Focaccia",
		ingredients: "Bread with italian olive oil and rosemary",
		price: 6,
		photoName: "pizzas/focaccia.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Margherita",
		ingredients: "Tomato and mozarella",
		price: 10,
		photoName: "pizzas/margherita.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Spinaci",
		ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
		price: 12,
		photoName: "pizzas/spinaci.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Funghi",
		ingredients: "Tomato, mozarella, mushrooms, and onion",
		price: 12,
		photoName: "pizzas/funghi.jpg",
		soldOut: false,
	},
	{
		name: "Pizza Salamino",
		ingredients: "Tomato, mozarella, and pepperoni",
		price: 15,
		photoName: "pizzas/salamino.jpg",
		soldOut: true,
	},
	{
		name: "Pizza Prosciutto",
		ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
		price: 18,
		photoName: "pizzas/prosciutto.jpg",
		soldOut: false,
	},
];

function App() {
	return (
		<div className="container">
			<h1>Hello React</h1>
			<Header />
			<Menu />
			<Footer />
		</div>
	);
}
function Header() {
	return (
		<header className="header">
			<h1>Fast React Pizza Co.</h1>
		</header>
	); // using JSX
}

function Menu() {
	const pizzas = pizzaData;
	const numPizzas = pizzas.length;
	return (
		<main className="menu">
			<h2>Our Menu</h2>
			{<h1>OK will this work?</h1>}
			{numPizzas > 0 ? (
				<>
					<p>
						Bro you need to try this pizzas man they are top notch
					</p>
					<ul className="pizzas">
						{/*Here the ul expects its child should have EJX */}
						{pizzas.map((pizza) => (
							<Pizza pizzaObj={pizza} />
						))}
						{/*Maps returns a array so we used it instead of using forEach
				Here the JSX expects a JS element i.e array if we had used For Each then It would create a html element inside the {} JS tag which is not acceptable so we have used map method here */}
					</ul>
				</>
			) : (
				<p>We are out of pizza buddy</p>
			)}

			{/* <Pizza
				name="Pizza Spinaci"
				ingredient="Tomato, mozarella, spinach, and ricotta cheese"
				price={10}
				photoName="pizzas/spinaci.jpg"
			/>
			<Pizza
				name="Pizza Funghi"
				ingredient="Tomato, mozarella"
				price={12}
				photoName="pizzas/funghi.jpg"
			/> */}
		</main>
	);
}
function Pizza({ pizzaObj }) {
	return (
		<li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
			<img src={pizzaObj.photoName} alt={pizzaObj.name} />
			<div>
				<h3>{pizzaObj.name}</h3>
				<p>{pizzaObj.ingredients}</p>
				<span>{pizzaObj.soldOut ? "Sold out" : pizzaObj.price}</span>
			</div>
		</li>
	);
}
function Footer() {
	const hour = new Date().getHours();
	const openHour = 10;
	const closeHour = 22;
	const isOpen = hour >= openHour && hour <= closeHour;
	// console.log(isOpen);
	// const isOpen = true;
	// console.log(isOpen);
	// if (hour >= openHour && hour <= closeHour) alert("We are currently open");
	// else alert("We are close");
	// console.log(hour);

	return (
		<footer className="footer">
			{isOpen ? <Order closeHour={closeHour} /> : "Nothing"}
		</footer>
	);
	// return React.createElement("footer", null, "We're currently open"); //pure React
}
function Order({ closeHour }) {
	return (
		<div className="order">
			<p>We're open until {closeHour}:00.Come visit us or order online</p>
			<button className="btn">Order</button>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

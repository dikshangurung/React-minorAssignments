import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css"; // Assuming global styles are imported here

// This is the point where your React app starts and is mounted to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

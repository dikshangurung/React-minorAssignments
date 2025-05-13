import React from "react";
import Header from "./Header"; // Adjust the path based on your actual file structure
import Footer from "./Footer";

const Layout = ({ children }) => {
	return (
		<div className="layout">
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;

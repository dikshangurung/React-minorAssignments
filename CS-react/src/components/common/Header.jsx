import React from "react";

function Header() {
	return (
		<header>
			<nav>
				<h1 className="highlight">My Financial App</h1>
				<div>
					{/* Navigation items could be links or just buttons */}
					<button
						className="highlight"
						onClick={() => console.log("Navigating to dashboard")}
					>
						Dashboard
					</button>
					<button onClick={() => console.log("Logging out")}>
						Logout
					</button>
				</div>
			</nav>
		</header>
	);
}

export default Header;

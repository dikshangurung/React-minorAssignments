import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import geojsonData from "./nepal-district.js"; // Adjust the path to your GeoJSON file
import styled from "styled-components";
import MapWrapperContainer from "./MapWrapperContainer.jsx";
import { Toaster } from "react-hot-toast";

// Styled components
const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
`;

const StartButton = styled.button`
	margin: 10px;
	padding: 10px 20px;
	font-size: 16px;
	cursor: pointer;
`;

const Timer = styled.div`
	margin: 10px;
	font-size: 18px;
`;

const App = () => {
	const [gameActive, setGameActive] = useState(false);
	const [targetDistrict, setTargetDistrict] = useState(null);
	const [timeElapsed, setTimeElapsed] = useState(0); // Stopwatch (time elapsed)
	const [districtColors, setDistrictColors] = useState({});
	const [fine, setFine] = useState(0);
	const [answeredDistricts, setAnsweredDistricts] = useState([]); // New state to track answered districts

	const intervalRef = useRef(null);

	// Set random district excluding answered ones
	function getRandomDistrict() {
		const unAnsweredDistricts = geojsonData.features.filter(
			(feature) =>
				!answeredDistricts.includes(feature.properties.DISTRICT)
		);
		if (unAnsweredDistricts.length > 0) {
			const randomDistrict =
				unAnsweredDistricts[
					Math.floor(Math.random() * unAnsweredDistricts.length)
				].properties.DISTRICT;
			setTargetDistrict(randomDistrict);
		} else {
			alert("All districts have been answered!");
			endGame();
		}
	}

	// Start the game
	const startGame = () => {
		setGameActive(true);
		setTimeElapsed(0); // Reset stopwatch
		getRandomDistrict();
		setDistrictColors({});
		setAnsweredDistricts([]); // Reset answered districts
		setFine(0);
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setTimeElapsed((prev) => prev + 1); // Increment timeElapsed every second
		}, 1000);
	};

	// End the game
	const endGame = () => {
		setGameActive(false);
		clearInterval(intervalRef.current);
		alert("Game over! Try again.");
	};

	// Clean up timer on component unmount
	useEffect(() => {
		return () => clearInterval(intervalRef.current);
	}, []);

	return (
		<MainContainer>
			<StartButton onClick={startGame}>Start Game</StartButton>

			<Timer>
				{gameActive
					? `Time Elapsed: ${timeElapsed}s`
					: "Press Start to Play!"}
			</Timer>
			<MapWrapperContainer
				isActive={gameActive}
				startGame={startGame}
				targetDistrict={targetDistrict}
				districtColors={districtColors}
				setDistrictColors={setDistrictColors}
				getRandomDistrict={getRandomDistrict}
				setAnsweredDistricts={setAnsweredDistricts} // Pass the setter to MapWrapperContainer
				fine={fine}
				setFine={setFine}
			/>
			<Toaster
				position="center"
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: {
						duration: 2000,
					},
					error: {
						duration: 2000,
					},
					style: {
						fontSize: "16px",
						maxWidth: "900px",
						padding: "16px 24px",
						backgroundColor: "#fff",
						color: "#374151",
					},
				}}
			/>
		</MainContainer>
	);
};

export default App;

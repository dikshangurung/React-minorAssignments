import { useState, useRef, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import geojsonData from "./nepal-district.js"; // Adjust the path to your GeoJSON file
import styled from "styled-components";
import MapWrapperContainer from "./MapWrapperContainer.jsx";

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
	const [timeLeft, setTimeLeft] = useState(30); // 30-second timer
	const [districtColors, setDistrictColors] = useState({});

	const intervalRef = useRef(null);
	//Set random discrict
	function getRandomDistrict() {
		setTargetDistrict(
			geojsonData.features[
				Math.floor(Math.random() * geojsonData.features.length)
			].properties.DISTRICT
		);
	}
	// Start the game
	const startGame = () => {
		setGameActive(true);
		setTimeLeft(3000);
		getRandomDistrict();
		setDistrictColors({});
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev === 1) {
					endGame();
					return 0;
				}
				return prev - 1;
			});
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
					? `Time Left: ${timeLeft}s`
					: "Press Start to Play!"}
			</Timer>
			<MapWrapperContainer
				isActive={gameActive}
				startGame={startGame}
				targetDistrict={targetDistrict}
				districtColors={districtColors}
				setDistrictColors={setDistrictColors}
				getRandomDistrict={getRandomDistrict}
			/>
		</MainContainer>
	);
};

export default App;

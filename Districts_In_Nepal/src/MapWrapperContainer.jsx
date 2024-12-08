import { useState, useEffect } from "react";
import { MapContainer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "./nepal-district.js"; // Adjust the path to your GeoJSON file
import styled from "styled-components";
import toast from "react-hot-toast";

const MapWrapper = styled.div`
	height: 80vh;
	width: 90%;
	position: relative;
`;
// Container for score and timer
const TopLeftOverlay = styled.div`
	position: absolute;
	top: 10px;
	left: 50px;
	background: rgba(255, 255, 255, 0.9);
	padding: 10px;
	border-radius: 8px;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
	font-size: 16px;
	z-index: 1000;
`;

// Container for color indicator
const TopRightOverlay = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	background: rgba(255, 255, 255, 0.9);
	padding: 10px;
	border-radius: 8px;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
	font-size: 16px;
	z-index: 1000;
	display: flex;
	align-items: center;
	gap: 8px;
`;

// Circle representing the color indicator
const ColorIndicator = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: ${(props) => props.color || "gray"};
`;
const FloatingText = styled.div`
	position: absolute;
	pointer-events: none; /* Prevent interference with clicking */
	background-color: white;
	padding: 5px 10px;
	border-radius: 5px;
	box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
	font-size: 14px;
	white-space: nowrap;
	z-index: 600;
`;
function MapWrapperContainer({
	isActive,
	getRandomDistrict,
	targetDistrict,
	districtColors,
	setDistrictColors,
	setAnsweredDistricts, // New prop to update answered districts
	setFine,
	fine,
}) {
	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [popupPosition, setPopupPosition] = useState(null);
	const [popupDistrict, setPopupDistrict] = useState(null);
	const [score, setScore] = useState(0);
	const [points, setPoints] = useState(0);
	const colors = ["green", "orange", "yellow"];

	// Track mouse position
	useEffect(() => {
		const handleMouseMove = (e) => {
			setCursorPosition({ x: e.pageX, y: e.pageY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);
	function endGame(targetDistrict, latlng) {
		setPopupDistrict(targetDistrict);
		setPopupPosition(latlng);
		setDistrictColors((prev) => ({
			...prev,
			[targetDistrict]: "#ff6666",
		}));
		setFine((prev) => prev + 1); // Add 1 to the fine
		// Remove popup after 3 seconds
		// Inside the click event handler of onEachDistrict
		setTimeout(() => {
			setPopupDistrict(null);
			setPopupPosition(null);

			// Reset the color of the clicked district to its default color
			setDistrictColors((prev) => {
				const updatedColors = { ...prev };
				/*
							I made a copy of the prev object using the spread operator ({ ...prev }) to avoid directly mutating the previous state in React.
							React uses immutable state management, which means you should never directly modify the previous state. Instead, you should create a new object or array with the desired changes. This allows React to detect changes and trigger re-renders correctly.
							*/
				// Remove the clicked district color or set it to blue (default color)
				if (updatedColors[targetDistrict]) {
					delete updatedColors[targetDistrict]; // Remove the red color
				}
				// updatedColors[clickedDistrict] = "blue"; // Optionally set it back to blue if you want
				return updatedColors;
			});
		}, 1000);
	}

	// Event handlers for district interactions
	function onEachDistrict(feature, layer) {
		layer.on({
			mouseover: (e) => {
				const layer = e.target;
				layer.setStyle({
					fillOpacity: 0.9,
				});
			},
			mouseout: (e) => {
				const layer = e.target;
				layer.setStyle({
					fillOpacity: 0.7,
				});
			},
			click: (e) => {
				if (!isActive) return;
				const clickedDistrict = feature.properties.DISTRICT;
				const latlng = e.latlng;
				if (fine >= 2) {
					// endGame(targetDistrict, latlng);
					setDistrictColors((prev) => ({
						...prev,
						[targetDistrict]: "#990000",
					}));
					setAnsweredDistricts((prev) => [...prev, targetDistrict]); // Mark district as answered
					getRandomDistrict(); // Get the next random district
					setFine(-1);
					toast.error("Ooops! Missed it");
					// return;
				}

				//check if clicked district already has the answer
				if (colors.includes(districtColors[clickedDistrict])) {
					toast.success("Already Answered!");
					return;
				}
				if (clickedDistrict === targetDistrict) {
					console.log("Correct");
					toast.success("Correct!");
					setDistrictColors((prev) => ({
						...prev,
						[clickedDistrict]: colors[fine],
					}));
					setScore((prev) => prev + 1);
					setAnsweredDistricts((prev) => [...prev, clickedDistrict]); // Mark district as answered
					getRandomDistrict(); // Get the next random district
				} else {
					endGame(clickedDistrict, latlng);
				}
			},
		});
	}

	// Set style dynamically based on districtColors
	const getStyle = (feature) => {
		const district = feature.properties.DISTRICT;
		// console.log(districtColors);
		return {
			fillColor: districtColors[district] || "blue",
			weight: 2,
			opacity: 1,
			color: "white",
			fillOpacity: 0.7,
		};
	};

	// Define the bounds to limit the map
	const maxBounds = [
		[26.347, 80.058], // Southwest corner (minLat, minLng)
		[30.422, 88.201], // Northeast corner (maxLat, maxLng)
	];

	return (
		<>
			{isActive && targetDistrict && (
				<FloatingText
					style={{
						top: `${cursorPosition.y + 15}px`,
						left: `${cursorPosition.x + 15}px`,
					}}
				>
					Click on: {targetDistrict}
				</FloatingText>
			)}
			<MapWrapper>
				<TopLeftOverlay>
					<div>District score: {score}/77</div>
					<div>Points:</div>
				</TopLeftOverlay>
				<TopRightOverlay>
					<span>Next Color:</span>
					<ColorIndicator color={colors[fine] || "gray"} />
				</TopRightOverlay>
				<MapContainer
					key={isActive}
					//By default, React keeps the same instance of the component when its props do not change (or only shallow updates occur). The key prop, however, instructs React to treat the component as a completely new one, forcing it to destroy and recreate the component. This is useful for cases where you need to force a complete re-render of a component and its children

					center={[28.3949, 84.124]} // Center on Nepal's latitude and longitude
					zoom={7}
					style={{ height: "100%", width: "100%" }}
					scrollWheelZoom={false}
					maxBounds={maxBounds} // Set maxBounds property
					maxBoundsViscosity={1.0} // Makes sure the map stops when reaching the boundary
				>
					<GeoJSON
						key={`${targetDistrict}-${fine}`} // Combine targetDistrict and fine as the key
						data={geojsonData}
						style={getStyle}
						onEachFeature={onEachDistrict}
					/>
					{popupPosition && (
						<Popup position={popupPosition} closeButton={false}>
							<div>{popupDistrict}</div>
						</Popup>
					)}
				</MapContainer>
			</MapWrapper>
		</>
	);
}

export default MapWrapperContainer;

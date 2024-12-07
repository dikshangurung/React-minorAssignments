import { useState, useEffect } from "react";
import { MapContainer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geojsonData from "./nepal-district.js"; // Adjust the path to your GeoJSON file
import styled from "styled-components";

const MapWrapper = styled.div`
	height: 80vh;
	width: 90%;
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
}) {
	// const [targetDistrict, setTargetDistrict] = useState(null);
	// const [districtColors, setDistrictColors] = useState({});

	const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
	const [popupPosition, setPopupPosition] = useState(null);
	const [popupDistrict, setPopupDistrict] = useState(null);
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
				console.log("Clicked" + clickedDistrict);
				console.log("Target" + targetDistrict);
				if (clickedDistrict === targetDistrict) {
					console.log("Correct");
					setDistrictColors((prev) => ({
						...prev,
						[clickedDistrict]: "white",
					}));
					getRandomDistrict();
					// startGame(); // Restart game
				} else {
					setPopupDistrict(clickedDistrict);
					setPopupPosition(latlng);

					// Remove popup after 3 seconds
					setTimeout(() => {
						setPopupDistrict(null);
						setPopupPosition(null);
					}, 1000);

					setDistrictColors((prev) => ({
						...prev,
						[clickedDistrict]: "red",
					}));
				}
			},
		});
	}

	// Set style dynamically based on districtColors
	const getStyle = (feature) => {
		const district = feature.properties.DISTRICT;
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
						key={targetDistrict}
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

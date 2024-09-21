import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const ChartBox = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 2.4rem 3.2rem;
	grid-column: 3 / span 2;

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}
`;

const startDataLight = [
	{
		duration: "1 night",
		value: 0,
		color: "#ef4444",
	},
	{
		duration: "2 nights",
		value: 0,
		color: "#f97316",
	},
	{
		duration: "3 nights",
		value: 0,
		color: "#eab308",
	},
	{
		duration: "4-5 nights",
		value: 0,
		color: "#84cc16",
	},
	{
		duration: "6-7 nights",
		value: 0,
		color: "#22c55e",
	},
	{
		duration: "8-14 nights",
		value: 0,
		color: "#14b8a6",
	},
	{
		duration: "15-21 nights",
		value: 0,
		color: "#3b82f6",
	},
	{
		duration: "21+ nights",
		value: 0,
		color: "#a855f7",
	},
];

const startDataDark = [
	{
		duration: "1 night",
		value: 0,
		color: "#b91c1c",
	},
	{
		duration: "2 nights",
		value: 0,
		color: "#c2410c",
	},
	{
		duration: "3 nights",
		value: 0,
		color: "#a16207",
	},
	{
		duration: "4-5 nights",
		value: 0,
		color: "#4d7c0f",
	},
	{
		duration: "6-7 nights",
		value: 0,
		color: "#15803d",
	},
	{
		duration: "8-14 nights",
		value: 0,
		color: "#0f766e",
	},
	{
		duration: "15-21 nights",
		value: 0,
		color: "#1d4ed8",
	},
	{
		duration: "21+ nights",
		value: 0,
		color: "#7e22ce",
	},
];

// Fake data
const fakeData = [
	{
		duration: "1 night",
		value: 5,
		color: "#ef4444",
	},
	{
		duration: "2 nights",
		value: 8,
		color: "#f97316",
	},
	{
		duration: "3 nights",
		value: 6,
		color: "#eab308",
	},
	{
		duration: "4-5 nights",
		value: 12,
		color: "#84cc16",
	},
	{
		duration: "6-7 nights",
		value: 10,
		color: "#22c55e",
	},
	{
		duration: "8-14 nights",
		value: 4,
		color: "#14b8a6",
	},
	{
		duration: "15-21 nights",
		value: 2,
		color: "#3b82f6",
	},
	{
		duration: "21+ nights",
		value: 1,
		color: "#a855f7",
	},
];

function DurationChart() {
	return (
		<ChartBox>
			<Heading as="h2">Stay duration summary</Heading>
			<ResponsiveContainer width="100%" height={240}>
				<PieChart>
					<Pie
						data={fakeData}
						nameKey="duration"
						dataKey="value"
						innerRadius={85}
						outerRadius={110}
						cx="40%"
						cy="50%"
						paddingAngle={3}
					>
						{fakeData.map((entry) => (
							<Cell
								fill={entry.color}
								stroke={entry.color}
								key={entry.duration}
							/>
						))}
					</Pie>
					<Tooltip />
					<Legend
						verticalAlign="middle"
						align="right"
						width="30%"
						layout="vertical"
						iconSize={15}
						iconType="circle"
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	);
}

export default DurationChart;

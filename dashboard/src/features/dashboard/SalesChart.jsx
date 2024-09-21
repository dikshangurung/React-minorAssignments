import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useState } from "react";

// Styled component for SalesChart
const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

// Main SalesChart component
function SalesChart({ bookings, numDays }) {
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numDays - 1),
		end: new Date(),
	});

	const data = allDates.map((date) => {
		return {
			label: format(date, "MMM dd"),
			totalSales: bookings
				.filter((booking) =>
					isSameDay(date, new Date(booking.created_at))
				)
				.reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: bookings
				.filter((booking) =>
					isSameDay(date, new Date(booking.created_at))
				)
				.reduce((acc, cur) => acc + cur.extrasPrice, 0),
		};
	});

	const colors = {
		totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
		extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
		text: "#374151",
		background: "#fff",
	};

	return (
		<StyledSalesChart>
			<Heading as="h2">
				Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
				{format(allDates.at(-1), "MMM dd yyyy")}{" "}
			</Heading>

			<ResponsiveContainer height={300} width="100%">
				<AreaChart data={data}>
					<XAxis
						dataKey="label"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<YAxis
						unit="$"
						tick={{ fill: colors.text }}
						tickLine={{ stroke: colors.text }}
					/>
					<CartesianGrid strokeDasharray="4" />
					<Tooltip
						contentStyle={{ backgroundColor: colors.background }}
					/>
					<Area
						dataKey="totalSales"
						type="monotone"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={2}
						name="Total sales"
						unit="$"
					/>
					<Area
						dataKey="extrasSales"
						type="monotone"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={2}
						name="Extras sales"
						unit="$"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}

// Function to generate mock data
function generateFakeBookings(numDays) {
	const bookings = [];
	for (let i = 0; i < numDays * 2; i++) {
		// Random date within the last `numDays`
		const daysAgo = Math.floor(Math.random() * numDays);
		const created_at = new Date();
		created_at.setDate(created_at.getDate() - daysAgo);

		// Random total and extras sales prices
		const totalPrice = parseFloat((Math.random() * 500 + 50).toFixed(2));
		const extrasPrice = parseFloat((Math.random() * 100).toFixed(2));

		bookings.push({
			created_at: created_at.toISOString(), // Format date as string
			totalPrice,
			extrasPrice,
		});
	}
	return bookings;
}

// Main component to render SalesChart with fake data
function FakeDataSalesChart() {
	const numDays = 30; // Show sales for the past 30 days
	const fakeBookings = generateFakeBookings(numDays);

	return <SalesChart bookings={fakeBookings} numDays={numDays} />;
}

export default FakeDataSalesChart;

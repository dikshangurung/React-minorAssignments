import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
	// 1.
	// const numBookings = bookings.length;
	const numBookings = 12;

	// 2.
	// const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
	const sales = 100;

	// 3.
	// const checkins = confirmedStays.length;
	const checkins = 5;

	// 4.
	// const occupation =
	// 	confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
	// 	(numDays * cabinCount);
	const occupation = 0.31;
	// num checked in nights / all available nights (num days * num cabins)

	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				color="indigo"
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>
			<Stat
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + "%"}
			/>
		</>
	);
}

export default Stats;

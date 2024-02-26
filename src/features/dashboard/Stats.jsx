import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat.jsx";
import { formatCurrency } from "../../utils/helpers.js";

/* 
  (numDays * cabinCount): This represents the total number of available nights, assuming that all cabins are available for numDays each. 
    
    and confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) represents total no of nights each guest stayed
    */

function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkIns = confirmedStays.filter(
    (stay) => stay.status === "checked-in"
  ).length;

  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation * 100)}%`}
      />
    </>
  );
}

export default Stats;

import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

function Stats() {
  // 1.
  const numBookings = 30;

  // 2.
  const sales = 20;

  // 3.
  const checkins = 15;

  // 4.
  const occupation = 3;
  // num checked in nights / all available nights (num days * num cabins)

  return (
    <div className="flex items-start gap-4">
      <span className="flex flex-col gap-4">
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
      </span>
      <span className="flex flex-col gap-4">
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
      </span>
    </div>
  );
}

export default Stats;

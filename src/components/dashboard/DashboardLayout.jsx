import styled from "styled-components";
// import { useRecentStays } from "./useRecentStays";
// import { useRecentBookings } from "./useRecentBookings";
// import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
// import { useCabins } from "../cabins/useCabins";
// import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesChart";
// import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2rem;
  margin-top: 2rem;
`;

const bookings = [
  {
    id: 1,
    created_at: "2024-01-16 11:27:28.526909+00",
    startDate: "2024-01-19 16:24:42",
    endDate: "2024-01-22 16:25:04",
    numNights: 3,
    numGuest: 2,
    cabinPrice: 1200,
    extrasPrice: 120,
    totalPrice: 420,
    status: "unconfirmed",
    hasBreakfast: true,
    isPaid: true,
    observations: "I will arrive at 10pm",
    cabinId: 1,
    guestId: 1,
  },
];

function DashboardLayout() {
  // const { bookings, isLoading: isLoading1 } = useRecentBookings();
  // const { confirmedStays, isLoading: isLoading2, numDays } = useRecentStays();
  // const { cabins, isLoading: isLoading3 } = useCabins();

  // if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats />
      <DurationChart />
      {/* <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} /> */}
      <SalesChart bookings={bookings} numDays={30} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

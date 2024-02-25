import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import { useRecentStays } from "./useRecentStays.js";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading } = useRecentBookings();
  const { stays, confirmedStays, isLoading: isloadingStays } = useRecentStays();
  if (isLoading || isloadingStays) return <Spinner />;
  console.log(bookings);
  return (
    <StyledDashboardLayout>
      <div>Stats</div>
      <div>Todays Activity</div>
      <div>Chart stay duration</div>
      <div>Chart of sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

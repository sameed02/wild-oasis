import styled from "styled-components";
import Tag from "../../ui/Tag.jsx";
import { Flag } from "../../ui/Flag.jsx";
import Button from "../../ui/Button.jsx";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useCheckOut } from "../bookings/useCheckOut.js";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const navigate = useNavigate();
  const { mutateCheckOut, isCheckingOut } = useCheckOut();
  const { id: bookingId, status, numNights, guests } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>
      {status === "unconfirmed" && (
        <Button
          $size="small"
          $icon={<HiArrowDownOnSquare />}
          onClick={() => navigate(`/checkIn/${bookingId}`)}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          $size="small"
          $icon={<HiArrowUpOnSquare />}
          onClick={() => mutateCheckOut(bookingId)}
          disabled={isCheckingOut}
        >
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;

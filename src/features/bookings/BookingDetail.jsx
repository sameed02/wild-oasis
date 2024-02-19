import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useFetchBooking } from "./useFetchBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import { useNavigate } from "react-router";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckOut } from "./useCheckOut.js";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking = [], isLoading } = useFetchBooking();
  const { mutateCheckOut, isCheckingOut } = useCheckOut();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { status, id: bookingId } = booking;

  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row $type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkIn/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            $icon={<HiArrowUpOnSquare />}
            onClick={() => mutateCheckOut(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;

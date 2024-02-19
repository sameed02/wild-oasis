import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useFetchBooking } from "../bookings/useFetchBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useCheckIn } from "../bookings/useCheckIn.js";
import { useFetchSettings } from "../settings/useFetchSettings.js";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { data: booking = [], isLoading } = useFetchBooking();
  const { settings, isLoading: isLoadingSettings } = useFetchSettings();
  const { mutateCheckIn, isCheckingIn } = useCheckIn();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      mutateCheckIn({
        bookingId,
        breakfast: { hasBreakfast: true, extrasPrice: optionalBreakfastPrice },
        totalPrice: totalPrice + optionalBreakfastPrice,
      });
    } else {
      mutateCheckIn({ bookingId, breakfast: {} });
    }
  }
  return (
    <>
      <Row $type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(!addBreakfast);
              setConfirmPaid(!confirmPaid);
            }}
            id="breakfast"
            disabled={addBreakfast || isLoadingSettings}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          id="confirm"
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid total amount of {""}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

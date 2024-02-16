import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty.jsx";
import { useFetchBookings } from "./useFetchBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Pagination from "../../ui/Pagination.jsx";

function BookingTable() {
  const {
    bookings = [],
    count = [],
    isLoading: isFetching,
  } = useFetchBookings();

  if (!bookings.length) return <Empty resourceName="Bookings" />;
  if (isFetching) <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count}></Pagination>
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;

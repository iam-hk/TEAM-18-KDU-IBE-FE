import { useSelector } from "react-redux";
import EachBooking from "../../Component/Bookings/EachBooking";
import "./MyBookings.scss";
import { RootState } from "../../redux/Store";
export function MyBookings() {
  const myBookings = useSelector(
    (state: RootState) => state.myBookings.myBookings
  );
  return (
    <div className="my-bookings-wrapper">
      <div className="my-bookings-content">
        {myBookings.map((booking) => (
          <EachBooking key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

import calendar from "../../../assets/calendar.svg";
import "./RoomCalendar.scss"
export function RoomCalendar() {
  return (
    <div className="date-component">
        <div className="date-checkin">
            <div className="checkin-heading">
                <p>Check in between</p>
            </div>
            <div className="checkin-date">
            <p>Any Date</p>
            </div>
        </div>
        <div className="border-line"></div>
        <div className="date-checkout">
            <div className="checkout-details">
            <div className="checkout-heading">
                <p>Check out between</p>
            </div>
            <div className="checkout-date">
                <p>Any Date</p>
            </div>
            </div>
            <div className="img">
            <img src={calendar} alt="notfound" />
            </div>
        </div>
    </div>
  )
}

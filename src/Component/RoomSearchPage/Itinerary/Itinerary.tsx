import "./Itinerary.scss";
import downArrow from "../../../assets/down-arrow.png";
import upArrow from "../../../assets/up-arrow.png";
import { useState } from "react";
import infoIcon from "../../../assets/info-icon.png";
import "react-responsive-modal/styles.css";
import PromoModal from "../../Modals/PromoModal/PromoModal";
import TaxModal from "../../Modals/TaxModal/TaxModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import { setDefaultValues } from "../../../redux/ItinerarySlice";
import { useNavigate } from "react-router-dom";
import { setStepperState } from "../../../redux/StepperSlice";
export function Itinerary() {
  const reduxDispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };
  const propertyName = useSelector(
    (state: RootState) => state.itineraryInfo.propertyName
  );
  const priceOfRoomTypeInParticularDate = useSelector(
    (state: RootState) => state.itineraryInfo.priceOfRoomTypeInParticularDate
  );
  const promoCode = useSelector(
    (state: RootState) => state.itineraryInfo.promoCode
  );
  const roomCount = useSelector(
    (state: RootState) => state.itineraryInfo.roomCount
  );
  const guestCount = useSelector(
    (state: RootState) => state.itineraryInfo.guestCount
  );
  const guestDisplayInfo = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestDisplayInfo
  );
  const startDate = useSelector(
    (state: RootState) => state.itineraryInfo.startDate
  );
  const endDate = useSelector(
    (state: RootState) => state.itineraryInfo.endDate
  );
  const stepperState = useSelector(
    (state: RootState) => state.stepper.currentState
  );
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const onOpenModal1 = () => setOpenModal1(true);
  const onCloseModal1 = () => setOpenModal1(false);

  const onOpenModal2 = () => setOpenModal2(true);
  const onCloseModal2 = () => setOpenModal2(false);
  const navigate = useNavigate();
  function formatDates() {
    const startDateFormat = new Date(startDate);
    const endDateFormat = new Date(endDate);

    const formattedStartDate = startDateFormat.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    const formattedEndDate = endDateFormat.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return `${formattedStartDate} - ${formattedEndDate}`;
  }
  function calculateTotalPrice() {
    let totalPrice = 0;
    for (const date in priceOfRoomTypeInParticularDate) {
      if (
        Object.prototype.hasOwnProperty.call(
          priceOfRoomTypeInParticularDate,
          date
        )
      ) {
        totalPrice += priceOfRoomTypeInParticularDate[date];
      }
    }

    return totalPrice;
  }
  function resetItinerary() {
    reduxDispatch(setDefaultValues());
    reduxDispatch(setStepperState(0));
  }
  function handleCheckout() {
    if (stepperState == 1) {
      reduxDispatch(setStepperState(2));
      navigate("/checkout");
    } else {
      const previousSearch = window.localStorage.getItem("prevSearch");
      reduxDispatch(setStepperState(1));
      navigate(`/rooms/${previousSearch}`);
    }
  }
  return (
    <div className="itinerary">
      <div className="itinerary-heading-container" onClick={toggleDetails}>
        <div className="itinerary-heading">Your Trip Itinerary</div>
        <div className="itinerary-heading-arrow">
          <img src={isOpen ? upArrow : downArrow} alt="arrow" />
        </div>
      </div>
      <div className={`itinerary-details ${isOpen ? "open" : "closed"}`}>
        <div className="itinerary-hotel-details">
          <div className="itinerary-hotel-name">{propertyName}</div>
          <button className="itinerary-hotel-remove" onClick={resetItinerary}>
            Remove
          </button>
        </div>
        <div className="itinerary-trip-details">
          <div className="date-details">{formatDates()}</div>
          <div className="border"></div>
          <div className="itinerary-guest-information">{guestDisplayInfo}</div>
        </div>
        <div className="itinerary-room-details">
          <div className="room-name">Executive Room</div>
          <div className="room-count">{roomCount} room</div>
        </div>
        {Object.entries(priceOfRoomTypeInParticularDate)
          .sort(
            ([dateStringA], [dateStringB]) =>
              new Date(dateStringA) - new Date(dateStringB)
          )
          .map(([dateString, price]) => {
            const date = new Date(dateString);
            const options = { weekday: "long", day: "numeric", month: "short" };
            const formattedDate = date.toLocaleDateString("en-US", options);
            return (
              <div key={dateString} className="itinerary-each-day-rate-details">
                <div className="itinerary-day">{formattedDate}</div>
                <div className="itinerary-rate">${price.toFixed(1)}</div>
              </div>
            );
          })}

        <div className="itinerary-promocode">
          <div className="itinerary-promoname">
            Special Promoname
            <button className="modal-button" onClick={onOpenModal1}>
              <img src={infoIcon} alt="Info Icon" />
            </button>
            <PromoModal open={openModal1} onClose={onCloseModal1} />
          </div>
          <div className="itinerary-promoname-rate">$0.0</div>
        </div>
        <div className="itinerary-border-bottom"></div>
        <div className="itinerary-subtotal">
          <div className="itinerary-subtotal-heading">Subtotal</div>
          <div className="itinerary-subtotal-value">
            ${calculateTotalPrice()}
          </div>
        </div>
        <div className="itinerary-taxes">
          <div className="itinerary-taxes-field">
            Taxes,Surcharges,Fees
            <button className="modal-button" onClick={onOpenModal2}>
              <img src={infoIcon} alt="Info Icon" />
            </button>
            <TaxModal open={openModal2} onClose={onCloseModal2} />
          </div>
          <div className="itinerary-taxes-cost">$0.0</div>
        </div>
        <div className="itinerary-vat">
          <div className="itinerary-vat-field">VAT</div>
          <div className="itinerary-vat-price">$0.0</div>
        </div>
        <div className="itinerary-border-bottom"></div>
        <div className="itinerary-amount-details">
          <div className="itinerary-due-now">Due Now</div>
          <div className="itinarary-due-price">$0.0</div>
        </div>
        <div className="itinerary-submit-container">
          <button
            className="itinerary-checkout-button"
            onClick={handleCheckout}
          >
            {stepperState === 1 ? "CHECKOUT" : "CONTINUE SHOPPING"}
          </button>
        </div>
      </div>
    </div>
  );
}

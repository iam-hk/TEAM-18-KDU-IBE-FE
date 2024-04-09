import "./Itinerary.scss";
import downArrow from "../../../assets/down-arrow.png";
import upArrow from "../../../assets/up-arrow.png";
import { useEffect, useRef, useState } from "react";
import infoIcon from "../../../assets/info-icon.png";
import "react-responsive-modal/styles.css";
import PromoModal from "../../Modals/PromoModal/PromoModal";
import TaxModal from "../../Modals/TaxModal/TaxModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import {
  setDefaultValues,
  setDueAtResort,
  setDueNow,
  setPromoDiscount,
  setSubtotal,
  setTaxes,
  setTotalPayment,
  setVat,
} from "../../../redux/ItinerarySlice";
import { useNavigate } from "react-router-dom";
import { setStepperState,setTimeLeft } from "../../../redux/StepperSlice";
import { useTranslation } from "react-i18next";
import { CurrencyExchangeRates } from "../../../types/CurrencyExchange";
import { CurrencySymbols } from "../../../Constants/CurrencySymbols";
export function Itinerary() {
  const { t } = useTranslation();
  const reduxDispatch: AppDispatch = useDispatch();
  const timeLeft=useSelector((state:RootState)=>state.stepper.timeLeft);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };
  const timeLeftRef = useRef<number>(timeLeft);
  const navigate = useNavigate();
  useEffect(() => {
    let startTime = timeLeft;
    const remainingTime = 600 - (Date.now() - startTime) / 1000;
    reduxDispatch(setTimeLeft(remainingTime > 0 ? remainingTime : 0));

    const timerId = setInterval(() => {
      if (timeLeft < 0) {
        reduxDispatch(setTimeLeft(0));
        navigate("/");
      } else {
        timeLeftRef.current -= 1
        reduxDispatch(setTimeLeft(timeLeftRef.current));
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [navigate]);
  const priceFactor = useSelector(
    (state: RootState) => state.itineraryInfo.promoCodeInfo.priceFactor
  );
  const propertyName = useSelector(
    (state: RootState) => state.itineraryInfo.roomName
  );
  const priceOfRoomTypeInParticularDate = useSelector(
    (state: RootState) => state.itineraryInfo.priceOfRoomTypeInParticularDate
  );
  const percentPayableHotel=useSelector((state:RootState)=>state.tenantInfo.percentPayableAtHotel);
  const taxes = useSelector((state: RootState) => state.tenantInfo.taxes);
  const vat = useSelector((state: RootState) => state.tenantInfo.vat);
  const promoCode = useSelector(
    (state: RootState) => state.itineraryInfo.promoCodeInfo
  );
  const roomCount = useSelector(
    (state: RootState) => state.itineraryInfo.roomCount
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
  const currentSelectedCurrency = useSelector(
    (state: RootState) => state.currencyRate.currentSelectedCurrency
  ) as keyof CurrencyExchangeRates;
  
  const currentPrice = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
  );
  function updatePrice(price: number) {
    return parseFloat( (price * roomCount * currentPrice[currentSelectedCurrency]).toFixed(
      1
    ));
  }
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
  function currencyAmountChange(price:number)
  {
    return (price * currentPrice[currentSelectedCurrency]).toFixed(1);
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
    reduxDispatch(setSubtotal(totalPrice * roomCount));
    return totalPrice;
  }
  function calculateDueNow() {
    let totalAmt = calculateTotalPrice() * roomCount;
    let vatPayable = calculateVat();
    let taxPayable = calculateTaxes();
    let promo = handlePromoCalculation();
    const payable = totalAmt + vatPayable + taxPayable - promo;
    reduxDispatch(setTotalPayment(payable));
    const dueNowAmt =(1-percentPayableHotel)*payable;
    reduxDispatch(setDueNow(dueNowAmt));
    return dueNowAmt;
  }
  function calculateDueAtResort() {
    let totalAmt = calculateTotalPrice() * roomCount;
    let vatPayable = calculateVat();
    let taxPayable = calculateTaxes();
    let promo = handlePromoCalculation();
    const payable = totalAmt + vatPayable + taxPayable - promo;
    const dueAtresortAmt =(percentPayableHotel)*payable;
    reduxDispatch(setDueAtResort(dueAtresortAmt));
    return dueAtresortAmt;
  }
  function priceTotal() {
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
    const previousSearch = window.localStorage.getItem("prevSearch");
    reduxDispatch(setTimeLeft(600));
    navigate(`/rooms/${previousSearch}`);
  }
  function handlePromoCalculation() {
    const totalPrice = calculateTotalPrice();
    const promoDiscount = parseFloat(
      ((1 - priceFactor) * totalPrice).toFixed(1)
    );
    reduxDispatch(setPromoDiscount(promoDiscount));
    return promoDiscount;
  }
  function handleCheckout() {
    if (stepperState <= 1) {
      reduxDispatch(setStepperState(2));
      navigate("/checkout");
    } else {
      const previousSearch = window.localStorage.getItem("prevSearch");
      reduxDispatch(setStepperState(1));
      navigate(`/rooms/${previousSearch}`);
    }
  }
  function calculateTaxes() {
    const totalPrice = priceTotal();
    const taxPayable = parseFloat((taxes * totalPrice).toFixed(1));
    reduxDispatch(setTaxes(taxPayable));
    return taxPayable;
  }
  function calculateVat() {
    const totalPrice = priceTotal();
    const vatPayable = parseFloat((vat * totalPrice).toFixed(1));
    reduxDispatch(setVat(vatPayable));
    return vatPayable;
  }


  return (
    <div className="itinerary">
      <div className="itinerary-heading-container" onClick={toggleDetails}>
        <div className="itinerary-heading">
          {t("itinerary.itineraryHeading")}
        </div>
        <div className="itinerary-heading-arrow">
          <img src={isOpen ? upArrow : downArrow} alt="arrow" />
        </div>
      </div>
      <div className={`itinerary-details ${isOpen ? "open" : "closed"}`}>
        <div className="itinerary-hotel-details">
          <div className="itinerary-hotel-name">
            {t(`${propertyName}.name`)}
          </div>
          <button className="itinerary-hotel-remove" onClick={resetItinerary}>
            {t("itinerary.remove")}
          </button>
        </div>
        <div className="itinerary-trip-details">
          <div className="date-details">{formatDates()}</div>
          <div className="border"></div>
          <div className="itinerary-guest-information">{guestDisplayInfo}</div>
        </div>
        <div className="itinerary-room-details">
          <div className="room-name">{t(`${propertyName}.name`)}</div>
          <div className="room-count">
            {roomCount} {t("itinerary.room")}
          </div>
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
                <div className="itinerary-rate">
                  {(CurrencySymbols as any)[currentSelectedCurrency]}
                  {currencyAmountChange(updatePrice(price))}
                </div>
              </div>
            );
          })}

        <div className="itinerary-promocode">
          <div className="itinerary-promoname">
            {t("itinerary.specialPromo")}
            <button className="modal-button" onClick={onOpenModal1}>
              <img src={infoIcon} alt="Info Icon" />
            </button>
            <PromoModal open={openModal1} onClose={onCloseModal1} />
          </div>
          <div className="itinerary-promoname-rate">
            {(CurrencySymbols as any)[currentSelectedCurrency]}
            {currencyAmountChange(handlePromoCalculation())}
          </div>
        </div>
        <div className="itinerary-border-bottom"></div>
        <div className="itinerary-subtotal">
          <div className="itinerary-subtotal-heading">
            {t("itinerary.subtotal")}
          </div>
          <div className="itinerary-subtotal-value">
            {(CurrencySymbols as any)[currentSelectedCurrency]}
            {currencyAmountChange(updatePrice(calculateTotalPrice()))}
          </div>
        </div>
        <div className="itinerary-taxes">
          <div className="itinerary-taxes-field">
            {t("itinerary.taxesCharges")}
            <button className="modal-button" onClick={onOpenModal2}>
              <img src={infoIcon} alt="Info Icon" />
            </button>
            <TaxModal open={openModal2} onClose={onCloseModal2} />
          </div>
          <div className="itinerary-taxes-cost">
            {(CurrencySymbols as any)[currentSelectedCurrency]}
            {currencyAmountChange(calculateTaxes())}
          </div>
        </div>
        <div className="itinerary-vat">
          <div className="itinerary-vat-field">{t("itinerary.vat")}</div>
          <div className="itinerary-vat-price">
            {(CurrencySymbols as any)[currentSelectedCurrency]}
            {currencyAmountChange(calculateVat())}
          </div>
        </div>
        <div className="itinerary-border-bottom"></div>
        <div className="itinerary-amount-details">
          <div className="itinerary-due-now">{t("itinerary.dueNow")}</div>
          <div className="itinarary-due-price">
            {(CurrencySymbols as any)[currentSelectedCurrency]}
            {currencyAmountChange(calculateDueNow())}
          </div>
        </div>
        <div className="itinerary-amount-details">
          <div className="itinerary-at-resort">Due at Resort</div>
          <div className="itinarary-due-price">
            {(CurrencySymbols as any)[currentSelectedCurrency]}
            {currencyAmountChange(calculateDueAtResort())}
          </div>
        </div>
        <div className="itinerary-submit-container">
          <button
            className="itinerary-checkout-button"
            onClick={handleCheckout}
          >
            {stepperState <= 1
              ? t("itinerary.checkout")
              : t("itinerary.continue")}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import QRCodeGenerator from "../QRCode/QRCode";
import "./EachBooking.scss";
import { useNavigate } from "react-router-dom";
import { IMyBookings } from "../../redux/MyBookings";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { CurrencyExchangeRates } from "../../types/CurrencyExchange";
import { CurrencySymbols } from "../../Constants/CurrencySymbols";
interface EachBookingProps {
  booking: IMyBookings;
}
const EachBooking: React.FC<EachBookingProps> = ({ booking }) => {
  const { t } = useTranslation();
  const currentSelectedCurrency = useSelector(
    (state: RootState) => state.currencyRate.currentSelectedCurrency
  ) as keyof CurrencyExchangeRates;
  const currentPrice = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
  );
  function updatePrice(price: number) {
    return (price * currentPrice[currentSelectedCurrency]).toFixed(1);
  }
  const navigate=useNavigate(); 
  function handleBookingClick() {
    navigate(`/confirmation?id=${booking.id}`)
  }
  return (
    <div className="each-booking-wrapper">
      <div className="booking-image">
        <img
          src={booking.imageUrl}
          alt=""
        />
      </div>
      <div className="all-info-wrapper">
        <div className="top-booking-id-info">
          <div className="booking-information-text">{t("bookingId")}:{" "}
          <span className="booking-information-button" onClick={handleBookingClick}>#{booking.id}</span>
          </div>
          <div className={`cancelled-div ${booking.status ? 'upcoming' : 'cancelled'}`}>
            <span className="cross">{booking.status ? t("upcoming") : t("cancelled")}</span>
          </div>
        </div>
        <div className="stay-info">
          <div className="room-type-name">{t(`${booking.roomType}.name`)}</div>
            <div className="booking-checkin">
              <div className="checkin-heading"><i>{t("search.checkin")}</i></div>
              <div className="checkin-date">{booking.startDate}</div>
            </div>
          <div className="booking-checkout">
              <div className="checkout-heading"><i>{t("search.checkout")}</i></div>
              <div className="checkout-date">{booking.endDate}</div>
            </div>
          <div className="guests-details">
            <div className="each-guest-wrapper">
              <div className="guest-type-name"><i>{t("itinerary.subtotal")}</i></div>
              <div className="guest-type-count">
              {(CurrencySymbols as any)[currentSelectedCurrency]}
                {updatePrice(booking.totalCost)}
              </div>
            </div>
          </div>
          <div className="qr-component">
            <div className="qr-code-heading">{t("scan")}</div>
            <QRCodeGenerator
              link={
                `https://team18-ibe-hyaheff6heahgra2.z02.azurefd.net/confirmation?id=${booking.id}`
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default EachBooking;
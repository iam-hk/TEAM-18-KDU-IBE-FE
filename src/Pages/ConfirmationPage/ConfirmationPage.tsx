import { useEffect, useState } from "react";
import "./ConfirmationPage.scss";
import downArrow from "../../assets/down-arrow.png";
import upArrow from "../../assets/up-arrow.png";
import userIcon from "../../assets/u_user.png";
import CancelModal from "../../Component/Modals/CancelModal/CancelModal";
import CancellationPolicies from "../../Component/Modals/CancellationPolicies/CancellationPolicies";
import { getPropertyConfig } from "../../redux/thunk/GetPropertyConfig";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { CurrencyExchangeRates } from "../../types/CurrencyExchange";
import { CurrencySymbols } from "../../Constants/CurrencySymbols";
import { decodeCardNumber } from "../../utils/CreditCard/creditCardDecoder";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  setBillingInfo,
  setCheckoutPage,
  setImage,
  setPaymentInfo,
  setTravlerInfo,
} from "../../redux/CheckoutSlice";
export default function ConfirmationPage() {
  const { t } = useTranslation();
  const [totalSummary, setTotalSummary] = useState<boolean>(false);
  const [guestInformation, setGuestInformation] = useState<boolean>(false);
  const [billing, setBilling] = useState<boolean>(false);
  const [paymentInformation, setPaymentInformation] = useState<boolean>(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [bookingActive, setBookingActive] = useState(false);
  const [id, setId] = useState("0");
  const reduxDispatch: AppDispatch = useDispatch();

  const maxDays = useSelector(
    (state: RootState) => state.tenantInfo.maximumDays
  );
  const guests = useSelector(
    (state: RootState) => state.propertyConfigInfo.guests
  );

  const travelerInfo = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo
  );

  const billingInfo = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo
  );

  const paymentInfo = useSelector(
    (state: RootState) => state.checkoutRoom.paymentInfo
  );

  const confirmationDetails = useSelector(
    (state: RootState) => state.checkoutRoom.confirmationDetails
  );
  const guestCount = useSelector(
    (state: RootState) => state.checkoutRoom.confirmationDetails.guestCount
  );
  const currentIndex = useSelector(
    (state: RootState) => state.checkoutRoom.currentIndex
  );

  const termsAndPolicies = useSelector(
    (state: RootState) => state.checkoutRoom.termsAndPolicies
  );

  const specialOffers = useSelector(
    (state: RootState) => state.checkoutRoom.specialOffers
  );

  const imageUrl = useSelector(
    (state: RootState) => state.checkoutRoom.imageUrl
  );
  const currentSelectedCurrency = useSelector(
    (state: RootState) => state.currencyRate.currentSelectedCurrency
  ) as keyof CurrencyExchangeRates;
  const currentPrice = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
  );
  function updatePrice(price: number) {
    return (price * currentPrice[currentSelectedCurrency]).toFixed(1);
  }
  const onOpenModal1 = () => {
    setOpenModal1(true);
  };
  const onCloseModal1 = () => {
    setOpenModal1(false);
  };
  const onOpenModal2 = () => {
    setOpenModal2(true);
  };
  const onCloseModal2 = () => {
    setOpenModal2(false);
  };
  async function handlePrint() {
    await setTotalSummary(true);
    await setGuestInformation(true);
    await setBilling(true);
    await setPaymentInformation(true);

    window.print();
  }
  const fetchAllData = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const bookingId = urlParams.get("id");
      console.log(bookingId);
      const backendUrl =
        import.meta.env.VITE_REACT_APP_BACKEND_URL2 + `/book?id=${bookingId}`;
      console.log(backendUrl);
      const bookingDetails = await axios.get(backendUrl);
      const result = await bookingDetails.data;
      console.log(result);
      setBookingActive(result.active);
      setId(bookingId);
      reduxDispatch(setTravlerInfo(result.bookingDetails.travelerInfo));
      reduxDispatch(setBillingInfo(result.bookingDetails.billingInfo));
      reduxDispatch(setPaymentInfo(result.bookingDetails.paymentInfo));
      reduxDispatch(setCheckoutPage(result.bookingDetails.confirmationDetails));
      reduxDispatch(setImage(result.bookingDetails.imageUrl));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    reduxDispatch(getPropertyConfig());
  }, []);
  useEffect(() => {
    if (guests.length !== 0 && maxDays > 0) {
      fetchAllData();
    }
  }, [guests, maxDays]);
  const toggleSummary = () => {
    setTotalSummary(!totalSummary);
  };

  const toggleGuestInformation = () => {
    setGuestInformation(!guestInformation);
  };

  const toggleBilling = () => {
    setBilling(!billing);
  };

  const togglePayment = () => {
    setPaymentInformation(!paymentInformation);
  };
  function findGuestInformation() {
    const guestString = guestCount
      .map((count, index) => {
        const guestType = guests[index]?.type;
        if (guestType && count > 0) {
          return `${guestType} ${count}`;
        }
        return null;
      })
      .filter((guest) => guest !== null)
      .join(" ");
    return guestString;
  }
  const maskCardNumber = (cardNumber: string) => {
    const maskedDigits = cardNumber.slice(0, -4).replace(/[0-9]/g, "*");
    const lastFourDigits = cardNumber.slice(-4);
    return maskedDigits + lastFourDigits;
  };
  const convertToMonthName = (monthNumber: number) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = monthNumber - 1;
    return months[monthIndex];
  };
const greenSpanClass = bookingActive ? 'green-span' : '';
const redSpanClass = !bookingActive ? 'red-span' : '';
  return (
    <div className="confirmation_main_container" id="printable_content">
      <CancelModal open={openModal1} onClose={onCloseModal1} />
      <CancellationPolicies open={openModal2} onClose={onCloseModal2} />
      <div className="bookingId_print_or_email_container">
        <div className="reservation_id_container">
          {t("confirmationPage.reservation")} <span className={`confirmation-page-id ${greenSpanClass} ${redSpanClass}`}>
  #{id}</span>
        </div>
        <div className="print_or_email_box">
          <button className="print_button" onClick={handlePrint}>
            {t("confirmationPage.print")}
          </button>
          <button className="email_button">
            {t("confirmationPage.Email")}
          </button>
        </div>
      </div>

      <div className="all_information_of_reservation_container">
        <div className="room_type_details_container">
          <div className="title_of_booked_room">
            <div className="roomType_title_and_guest_container">
              <div className="room_type_name">
                {t("search.rooms")} {confirmationDetails.roomCount} :{" "}
                {t(`${confirmationDetails.roomName}.name`)}
              </div>
              <div className="guest_type_count_box">
                <img
                  className="user_icon_count"
                  src={userIcon}
                  alt="notfound"
                />
                <span className="content_count_guest">
                  {findGuestInformation()}
                </span>
              </div>
            </div>
            <div className="cancel_button_container">
              <button className="cancel_button" onClick={onOpenModal1}>
                {t("confirmationPage.cancelRoom")}
              </button>
            </div>
          </div>
          <div className="image_and_details_container">
            <div className="image_container_of_room_type">
              <img className="actual_image" src={imageUrl}></img>
            </div>
            <div className="dates_promocode_container">
              <div className="checkin_checkout_date_container">
                <div className="checkin_box">
                  <div className="checkin_title">{t("search.checkin")}</div>
                  <div className="checkin_day">
                    {new Date(confirmationDetails.startDate).getDate()}
                  </div>
                  <div className="checkin_month_year">
                    {new Date(confirmationDetails.startDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
                <div className="checkout_box">
                  <div className="checkout_title">{t("search.checkout")}</div>
                  <div className="checkout_day">
                    {new Date(confirmationDetails.endDate).getDate()}
                  </div>
                  <div className="checkout_month_year">
                    {new Date(confirmationDetails.endDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>

              <div className="package_information">
                <div className="package_title_box">
                  {confirmationDetails.promoCodeInfo.promotionTitle}
                </div>
                <div className="package_description">
                  {confirmationDetails.promoCodeInfo.promotionDescription}
                </div>
              </div>

              <div className="cancellation_and_bill_information">
                <div className="cancellation_policy " onClick={onOpenModal2}>
                  {t("confirmationPage.cancellation")}
                </div>
                <div className="total_bill">
                  {(CurrencySymbols as any)[currentSelectedCurrency]}
                  {updatePrice(confirmationDetails.nightlyRate)}/
                  {t("confirmationPage.eachNight")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bill_summary_container">
          <div className="arrow_button" onClick={toggleSummary}>
            <img
              src={downArrow}
              alt="down-arrow"
              style={{ display: totalSummary ? "none" : "block" }}
            />
            <img
              src={upArrow}
              alt="down-arrow"
              style={{ display: totalSummary ? "block" : "none" }}
            />
          </div>
          <div className="all_details">
            <div className="title_bill_summary" onClick={toggleSummary}>
              {t("confirmationPage.roomTotal.heading")}
            </div>
            {totalSummary && (
              <div className="break_down_bill_box">
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.roomTotal.nightRate")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {(CurrencySymbols as any)[currentSelectedCurrency]}
                    {updatePrice(confirmationDetails.nightlyRate)}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.roomTotal.subtotal")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {(CurrencySymbols as any)[currentSelectedCurrency]}
                    {updatePrice(confirmationDetails.subTotal)}
                  </div>
                </div>

                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.roomTotal.taxes")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {(CurrencySymbols as any)[currentSelectedCurrency]}
                    {updatePrice(confirmationDetails.taxes)}
                  </div>
                </div>

                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.roomTotal.vat")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {(CurrencySymbols as any)[currentSelectedCurrency]}
                    {updatePrice(confirmationDetails.vat)}
                  </div>
                </div>

                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.roomTotal.total")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {(CurrencySymbols as any)[currentSelectedCurrency]}
                    {updatePrice(confirmationDetails.totalCost)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="guest_information_container">
          <div className="arrow_button" onClick={toggleGuestInformation}>
            <img
              src={downArrow}
              alt="down-arrow"
              style={{ display: guestInformation ? "none" : "block" }}
            />
            <img
              src={upArrow}
              alt="down-arrow"
              style={{ display: guestInformation ? "block" : "none" }}
            />
          </div>
          <div className="all_details">
            <div
              className="title_bill_summary"
              onClick={toggleGuestInformation}
            >
              {t("confirmationPage.guestInfo.heading")}
            </div>
            {guestInformation && (
              <div className="break_down_bill_box">
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.guestInfo.firstName")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {travelerInfo.tfirstName}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.guestInfo.middleName")}
                  </div>
                  <div className="value_of_nightly_rate"> -- </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.guestInfo.lastName")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {travelerInfo.tlastName}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.guestInfo.phone")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {travelerInfo.tphone}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.guestInfo.altPhone")}
                  </div>
                  <div className="value_of_nightly_rate">--</div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.guestInfo.email")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {travelerInfo.temail}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.guestInfo.altEmail")}
                  </div>
                  <div className="value_of_nightly_rate"> -- </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="billing_address_box">
          <div className="arrow_button" onClick={toggleBilling}>
            <img
              src={downArrow}
              alt="down-arrow"
              style={{ display: billing ? "none" : "block" }}
            />
            <img
              src={upArrow}
              alt="down-arrow"
              style={{ display: billing ? "block" : "none" }}
            />
          </div>
          <div className="all_details">
            <div className="title_bill_summary" onClick={toggleBilling}>
              {t("confirmationPage.billingAddress.heading")}
            </div>
            {billing && (
              <div className="break_down_bill_box">
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {" "}
                    {t("confirmationPage.billingAddress.firstName")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {billingInfo.firstName}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {" "}
                    {t("confirmationPage.billingAddress.middleName")}
                  </div>
                  <div className="value_of_nightly_rate"> -- </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {" "}
                    {t("confirmationPage.billingAddress.lastName")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {billingInfo.lastName}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {" "}
                    {t("confirmationPage.billingAddress.mailAddress")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {billingInfo.mailPrimary}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.billingAddress.altMailingAddress")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {billingInfo.mailSecondary}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("billingInfo.Country")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {billingInfo.country}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("billingInfo.State")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {billingInfo.state}
                  </div>
                </div>

                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("billingInfo.City")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {billingInfo.city}
                  </div>
                </div>

                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("billingInfo.Zip")}
                  </div>
                  <div className="value_of_nightly_rate">{billingInfo.zip}</div>
                </div>

                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("billingInfo.Phone")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {billingInfo.phone}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.guestInfo.altPhone")}
                  </div>
                  <div className="value_of_nightly_rate">--</div>
                </div>

                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("billingInfo.Email")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {billingInfo.email}
                  </div>
                </div>

                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.guestInfo.altEmail")}
                  </div>
                  <div className="value_of_nightly_rate">
                    ankushrauni@gmail.com
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="payment_details_box">
          <div className="arrow_button" onClick={togglePayment}>
            <img
              src={downArrow}
              alt="down-arrow"
              style={{ display: paymentInformation ? "none" : "block" }}
            />
            <img
              src={upArrow}
              alt="down-arrow"
              style={{ display: paymentInformation ? "block" : "none" }}
            />
          </div>
          <div className="all_details">
            <div className="title_bill_summary" onClick={togglePayment}>
              {t("paymentInformation")}
            </div>
            {paymentInformation && (
              <div className="break_down_bill_box">
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("paymentInfoData.card")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {maskCardNumber(decodeCardNumber(paymentInfo.cardNumber))}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.paymentInfo.expMM")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {convertToMonthName(parseInt(paymentInfo.expMM))}
                  </div>
                </div>
                <div className="nightly_rate_box">
                  <div className="title_nightly_rate">
                    {t("confirmationPage.paymentInfo.expYY")}
                  </div>
                  <div className="value_of_nightly_rate">
                    {paymentInfo.expYY}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Grid, TextField } from "@mui/material";
import "./PaymentInfo.scss";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import {
  ICheckoutPage,
  IPaymentInfo,
  setCheckoutPage,
  setCurrentIndex,
  setImage,
  setPaymentInfo,
  setSpecialOffer,
} from "../../../redux/CheckoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import TermsAndPromoModal from "../../Modals/TermsAndPoliciesModal/TermsAndPolicies";
import { encodeCardNumber } from "../../../utils/CreditCard/creditCardEncoder";
import { CurrencyExchangeRates } from "../../../types/CurrencyExchange";
import { CurrencySymbols } from "../../../Constants/CurrencySymbols";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { decodeCardNumber } from "../../../utils/CreditCard/creditCardDecoder";
import CustomizedSnackbars from "../../../Component/snackbar/CustomizedSnackbars";
import axios from "axios";
import Loader2 from "../../Loaders/Loader2/Loader2";
import { setBookingStatus } from "../../../redux/StepperSlice";
export function PaymentInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const cardNumberSlice = useSelector(
    (state: RootState) => state.checkoutRoom.paymentInfo.cardNumber
  );
  const expMMSlice = useSelector(
    (state: RootState) => state.checkoutRoom.paymentInfo.expMM
  );
  const expYYSlice = useSelector(
    (state: RootState) => state.checkoutRoom.paymentInfo.expYY
  );
  const travelerEmail = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.temail
  );
  const Sliceguests = useSelector(
    (state: RootState) => state.propertyConfigInfo.guests
  );
  const sliceGuestCount = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestCounts
  );
  const nightlyRate = useSelector(
    (state: RootState) => state.itineraryInfo.priceDetails.nightlyRate
  );
  const slicesubtotal = useSelector(
    (state: RootState) => state.itineraryInfo.priceDetails.subtotal
  );
  const taxes = useSelector(
    (state: RootState) => state.itineraryInfo.priceDetails.taxes
  );
  const vat = useSelector(
    (state: RootState) => state.itineraryInfo.priceDetails.vat
  );
  const totalCost = useSelector(
    (state: RootState) => state.itineraryInfo.priceDetails.totalPayment
  );
  const amountDueAtResort = useSelector(
    (state: RootState) => state.itineraryInfo.priceDetails.dueAtResort
  );
  const travelerInfo = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo
  );
  const billingInfo = useSelector(
    (state: RootState) => state.checkoutRoom.billingInfo
  );
  const currentIndex = useSelector(
    (state: RootState) => state.checkoutRoom.currentIndex
  );
  const [openModal1, setOpenModal1] = useState(false);
  const [cardNumber, setCardNumber] = useState(
    decodeCardNumber(cardNumberSlice)
  );
  const [cardMonth, setCardMonth] = useState(expMMSlice);
  const [cardYear, setCardYear] = useState(expYYSlice);
  const [CVV, setCVV] = useState("");
  const [termsAndPolicies, setTermsAndPolicies] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);
  const [isBookingClicked, setIsBookingClicked] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [cardNumberError, setCardNumberError] = useState<string>("");
  const [cardYearError, setCardYearError] = useState<string>("");
  const [cardMonthError, setCardMonthError] = useState<string>("");
  const [cardCVVError, setCardCVVError] = useState<string>("");
  const [reqError, setReqError] = useState<string>("");
  const [keepCheck, setKeepCheck] = useState<boolean>(false);
  const roomName = useSelector(
    (state: RootState) => state.itineraryInfo.roomName
  );
  const totalPayment = useSelector(
    (state: RootState) => state.itineraryInfo.priceDetails.totalPayment
  );
  const promoCodeInfo = useSelector(
    (state: RootState) => state.itineraryInfo.promoCodeInfo
  );
  const roomCount = useSelector(
    (state: RootState) => state.itineraryInfo.roomCount
  );
  const startDate = useSelector(
    (state: RootState) => state.itineraryInfo.startDate
  );
  const endDate = useSelector(
    (state: RootState) => state.itineraryInfo.endDate
  );
  const guestCount = useSelector(
    (state: RootState) => state.itineraryInfo.guestCount
  );
  const roomTypeId = useSelector(
    (state: RootState) => state.itineraryInfo.roomTypeId
  );
  const imgUrl = useSelector(
    (state: RootState) => state.itineraryInfo.imageUrl
  );
  const currentSelectedCurrency = useSelector(
    (state: RootState) => state.currencyRate.currentSelectedCurrency
  ) as keyof CurrencyExchangeRates;
  const currentPrice = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
  );
  const checkoutDetailsSlice = useSelector(
    (state: RootState) => state.checkoutRoom
  );
  function createObjectToSend() {
    let adultCount = 0;
    let childCount = 0;

    Sliceguests.forEach((guest, index) => {
      if (guest.type === "Adults") {
        adultCount = sliceGuestCount[index];
      } else if (guest.type === "Kids") {
        childCount = sliceGuestCount[index];
      }
    });
    const checkoutPageData: ICheckoutPage = {
      travelerInfo: travelerInfo,
      billingInfo: billingInfo,
      paymentInfo: {
        cardNumber: encodeCardNumber(cardNumber),
        expMM: cardMonth,
        expYY: cardYear,
      },
      confirmationDetails: {
        roomName: roomName,
        startDate: startDate,
        endDate: endDate,
        roomTypeId: roomTypeId,
        guestCount: guestCount,
        promoCodeInfo: {
          promoCode: promoCodeInfo.promoCode,
          priceFactor: promoCodeInfo.priceFactor,
          promotionDescription: promoCodeInfo.promotionDescription,
          promotionTitle: promoCodeInfo.promotionTitle,
          promotionId: promoCodeInfo.promotionId,
        },
        roomCount: roomCount,
        adultCount: adultCount,
        childCount: childCount,
        totalCost: totalCost,
        amountDueAtResort: amountDueAtResort,
        propertyId: 18,
        nightlyRate: nightlyRate,
        subTotal: slicesubtotal,
        taxes: taxes,
        vat: vat,
      },
      currentIndex: currentIndex,
      termsAndPolicies: false,
      specialOffers: false,
      imageUrl: imgUrl,
    };
    return checkoutPageData;
  }
  // const sendInfoToBackend = async () => {
  //   try {
  //     const data = createObjectToSend();
  //     let url = import.meta.env.VITE_REACT_APP_POST_REQ;
  //     url += "/book";
  //     const response = await axios.post(url, data);
  //     setLoader(false);
  //     setSuccess(true);
  //     setMessage(`Your Booking id is ${response.data.toString()}`);
  //     setShowSnackbar(true);
  //     //add here
  //     setTimeout(() => {
  //       navigate(`/confirmation?id=${response.data}`);
  //     }, 3000);
  //   } catch (error) {
  //     setLoader(false);
  //     setIsBookingClicked(false);
  //     const errorMessage =
  //       error.response?.data?.message || "Error occurred while booking";
  //     setShowSnackbar(true);
  //     setMessage(errorMessage);
  //     const timeoutId = setTimeout(() => {
  //      navigate("/");
  //     }, 4000);
  //   }
  // };
  const sendInfoToBackend = async () => {
    try {
      const data = createObjectToSend();
      let url = import.meta.env.VITE_REACT_APP_POST_REQ;
      url += "/book";
      const response = await axios.post(url, data);
      setLoader(false);
      setSuccess(true);
      setMessage(`Your Booking id is ${response.data.toString()}`);
      reduxDispatch(setBookingStatus(true));
      setShowSnackbar(true);

      const backendUrl =
        import.meta.env.VITE_REACT_APP_API_MGT +
        `/email-booking?id=${response.data}&email=${travelerEmail}`;
      const emailBookingResponse = await axios.get(backendUrl);

      setTimeout(() => {
        navigate(`/confirmation?id=${response.data}`);
      }, 3000);
    } catch (error) {
      setLoader(false);
      setIsBookingClicked(false);
      const errorMessage =
        error.response?.data?.message || "Error occurred while booking";
      setShowSnackbar(true);
      setMessage(errorMessage);
      const timeoutId = setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  function updatePrice(price: number) {
    return (price * currentPrice[currentSelectedCurrency]).toFixed(1);
  }
  const onOpenModal1 = () => setOpenModal1(true);
  const onCloseModal1 = () => setOpenModal1(false);
  const reduxDispatch: AppDispatch = useDispatch();
  function isCardExpired() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const expYear = parseInt(cardYear);
    const expMonth = parseInt(cardMonth);
    const fullExpYear = currentYear - (currentYear % 100) + expYear;

    if (
      fullExpYear > currentYear ||
      (fullExpYear === currentYear && expMonth > currentMonth)
    ) {
      setIsDateValid(true);
      return false;
    } else if (
      fullExpYear < currentYear ||
      (fullExpYear === currentYear && expMonth < currentMonth)
    ) {
      setIsDateValid(false);
      return true;
    } else {
      setIsDateValid(true);
      return false;
    }
  }

  function isValidCreditCardNumber(cardNumber: string): boolean {
    const cleanedNumber = cardNumber.replace(/\D/g, "");
    if (cleanedNumber.length < 13 || cleanedNumber.length > 19) {
      return false;
    }
    const reversedDigits = cleanedNumber.split("").reverse().map(Number);
    let sum = 0;
    for (let i = 0; i < reversedDigits.length; i++) {
      let digit = reversedDigits[i];
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }
  function handleCardChange(value: string) {
    setCardNumber(value);
    setCardNumberError("");
  }
  function handleMonthChange(value: string) {
    setIsDateValid(true);
    setCardMonth(value);
    setCardMonthError("");
  }
  function handleYearChange(value: string) {
    setIsDateValid(true);
    setCardYear(value);
    setCardYearError("");
  }
  function handleCVV(value: string) {
    setCVV(value);
    setCardCVVError("");
  }
  function handlePolicyChange() {
    if (!termsAndPolicies) {
      onOpenModal1();
    }
    setTermsAndPolicies(!termsAndPolicies);

    setKeepCheck(false);
    setReqError("");
  }
  function checkValidations() {
    if (!cardNumber) {
      setCardNumberError("Please Enter Card Number");
    }
    if (!cardMonth) {
      setCardMonthError("Please Enter Card Month");
    }
    if (!cardYear) {
      setCardYearError("Please Enter Card Year");
    }
    if (!CVV) {
      setCardCVVError("Please Enter CVV ");
    }
    if (termsAndPolicies) {
      setKeepCheck(false);
    } else {
      setKeepCheck(true);
    }
    if (isCardExpired()) {
      setIsDateValid(false);
      return false;
    }
    if (!termsAndPolicies) {
      return false;
    }

    if (
      !isValidCreditCardNumber(cardNumber) ||
      !cardMonth ||
      !cardYear ||
      !CVV ||
      isCardExpired() ||
      !setKeepCheck
    ) {
      return false;
    }
    return true;
  }
  function handleEditBilling(event: { preventDefault: () => void }) {
    reduxDispatch(setCurrentIndex(1));
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isBookingClicked) {
      return;
    }
    let adultCount = 0;
    let childCount = 0;

    Sliceguests.forEach((guest, index) => {
      if (guest.type === "Adults") {
        adultCount = sliceGuestCount[index];
      } else if (guest.type === "Kids") {
        childCount = sliceGuestCount[index];
      }
    });
    if (checkValidations()) {
      const paymentInfo: IPaymentInfo = {
        cardNumber: encodeCardNumber(cardNumber),
        expMM: cardMonth,
        expYY: cardYear,
      };
      setLoader(true);
      setIsBookingClicked(true);
      const confirmationDetails = {
        roomName: roomName,
        startDate: startDate,
        endDate: endDate,
        roomTypeId: roomTypeId,
        guestCount: guestCount,
        promoCodeInfo: {
          promoCode: promoCodeInfo.promoCode,
          priceFactor: promoCodeInfo.priceFactor,
          promotionDescription: promoCodeInfo.promotionDescription,
          promotionTitle: promoCodeInfo.promotionTitle,
          promotionId: promoCodeInfo.promotionId,
        },
        roomCount: roomCount,
        adultCount: adultCount,
        childCount: childCount,
        totalCost: totalCost,
        amountDueAtResort: amountDueAtResort,
        propertyId: 18,
        nightlyRate: nightlyRate,
        subTotal: slicesubtotal,
        taxes: taxes,
        vat: vat,
      };
      reduxDispatch(setPaymentInfo(paymentInfo));
      reduxDispatch(setImage(imgUrl));
      reduxDispatch(setCheckoutPage(confirmationDetails));
      sendInfoToBackend();
    }
  }
  function handleSpecialOffers() {
    setSpecialOffers(!specialOffers);
    reduxDispatch(setSpecialOffer());
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="payment-form-info-wrapper">
        <div className="payment-info-wrapper">
          <div className="payment-card-wrapper">
            <div className="payment-cardname-wrapper">
              <Grid
                container
                spacing={0.5}
                direction="column"
                className="input-container"
              >
                <Grid item>
                  <label htmlFor="card-name" className="payment-cardname-label">
                    {t("paymentInfoData.card")}
                  </label>
                </Grid>
                <Grid item>
                  <TextField
                    type="text"
                    id="card-name"
                    variant="outlined"
                    className="text-field"
                    value={cardNumber}
                    error={
                      !!cardNumberError ||
                      (cardNumber && !isValidCreditCardNumber(cardNumber))
                    }
                    helperText={
                      cardNumberError ||
                      (cardNumber && !isValidCreditCardNumber(cardNumber))
                        ? "Please enter a valid card number"
                        : ""
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" ||
                        e.key === "Tab" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight" ||
                        e.key === "-"
                      ) {
                        return;
                      }
                      const pattern = /^[0-9]*$/;
                      if (!pattern.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => handleCardChange(e.target.value)}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="payment-month-year-wrapper">
              <div className="payment-month-wrapper">
                <Grid
                  container
                  spacing={0.5}
                  direction="column"
                  className="input-container"
                >
                  <Grid item>
                    <label htmlFor="exp-mm" className="payment-month-label">
                      {t("paymentInfoData.month")}
                    </label>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="exp-mm"
                      variant="outlined"
                      className="text-field"
                      type="text"
                      value={cardMonth}
                      onChange={(e) => handleMonthChange(e.target.value)}
                      inputProps={{
                        maxLength: 2,
                      }}
                      error={
                        (cardMonth !== "" &&
                          !/^(0?[1-9]|1[0-2])$/.test(cardMonth)) ||
                        cardMonthError !== "" ||
                        (!isDateValid && cardMonth !== "")
                      }
                      helperText={
                        cardMonth !== "" &&
                        !/^(0?[1-9]|1[0-2])$/.test(cardMonth)
                          ? "Please enter a valid month (01-12)"
                          : cardMonthError || (!isDateValid && cardMonth !== "")
                          ? cardMonthError || "Card already expired"
                          : ""
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" ||
                          e.key === "Tab" ||
                          e.key === "ArrowLeft" ||
                          e.key === "ArrowRight"
                        ) {
                          return;
                        }
                        const pattern = /^[0-9]*$/;
                        if (!pattern.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className="payment-year-wrapper">
                <Grid
                  container
                  spacing={0.5}
                  direction="column"
                  className="input-container"
                >
                  <Grid item>
                    <label htmlFor="exp-yy" className="payment-year-label">
                      {t("paymentInfoData.year")}
                    </label>
                  </Grid>
                  <Grid item>
                    <TextField
                      id="exp-yy"
                      variant="outlined"
                      className="text-field"
                      onChange={(e) => handleYearChange(e.target.value)}
                      inputProps={{
                        maxLength: 2,
                      }}
                      value={cardYear}
                      error={
                        (cardYear !== "" &&
                          (!/^\d{2}$/.test(cardYear) ||
                            parseInt(cardYear, 10) <
                              new Date().getFullYear() % 100)) ||
                        cardYearError !== ""
                      }
                      helperText={
                        (cardYear !== "" &&
                          ((!/^\d{2}$/.test(cardYear) &&
                            "Please enter a valid 2-digit year") ||
                            (parseInt(cardYear, 10) <
                              new Date().getFullYear() % 100 &&
                              "Year must be greater than current year"))) ||
                        cardYearError
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" ||
                          e.key === "Tab" ||
                          e.key === "ArrowLeft" ||
                          e.key === "ArrowRight"
                        ) {
                          return;
                        }
                        const pattern = /^[0-9]*$/;
                        if (!pattern.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className="payment-cvv-wrapper">
            <Grid
              container
              spacing={0.5}
              direction="column"
              className="input-container"
            >
              <Grid item>
                <label htmlFor="cvv" className="payment-cvv-label">
                  CVV
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="cvv"
                  variant="outlined"
                  className="text-field"
                  type="password"
                  value={CVV}
                  autoComplete="off"
                  inputProps={{
                    minLength: 3,
                    maxLength: 4,
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" ||
                      e.key === "Tab" ||
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight"
                    ) {
                      return;
                    }
                    const pattern = /^[0-9]*$/;
                    if (!pattern.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  error={
                    (CVV && !/^[0-9]{3,4}$/.test(CVV)) || cardCVVError !== ""
                  }
                  helperText={
                    (CVV && !/^[0-9]{3,4}$/.test(CVV)) || cardCVVError !== ""
                      ? cardCVVError ||
                        "Please enter a valid CVV (3 or 4 digits)"
                      : ""
                  }
                  onChange={(e) => handleCVV(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
          <div className="checkbox-wrapper">
            <div className="special-offers">
              <input type="checkbox" onClick={handleSpecialOffers} />
              <div className="special-offer-text">
                {t("paymentInfoData.offers")}
              </div>
            </div>
            <div className="terms-policies">
              <input type="checkbox" onClick={handlePolicyChange} />
              <div className="terms-test">
                {t("paymentInfoData.termsPart1")}{" "}
                <span className="terms-button" onClick={onOpenModal1}>
                  {t("paymentInfoData.termsPart2")}
                </span>{" "}
                {t("paymentInfoData.termsPart3")}
              </div>
              <TermsAndPromoModal open={openModal1} onClose={onCloseModal1} />
            </div>
            {keepCheck && (
              <p className="error-message">{t("paymentInfoData.policy")}</p>
            )}
          </div>
          <div className="payment-bottom-wrapper">
            <div className="payment-amount-container">
              <div className="payment-amount-text">
                {t("paymentInfoData.due")}
              </div>
              <div className="payment-amount-figure">
                {(CurrencySymbols as any)[currentSelectedCurrency]}
                {updatePrice(totalPayment)}
              </div>
            </div>
            <div className="payment-button-wrapper">
              <button className="edit-billing" onClick={handleEditBilling}>
                {t("paymentInfoData.editBilling")}
              </button>
              <button
                className="purchase-button"
                disabled={isBookingClicked}
                style={{ opacity: isBookingClicked ? 0.5 : 1 }}
              >
                {t("paymentInfoData.button")}
              </button>
            </div>
            {loader && (
              <div className="loader2-wrapper">
                <Box sx={{ display: "flex" }}>
                  <Loader2 />
                </Box>
              </div>
            )}
          </div>
        </div>
      </form>
      {showSnackbar && (
        <CustomizedSnackbars
          status={success ? "success" : "error"}
          message={message}
          setShowSnackbar={setShowSnackbar}
        />
      )}
    </>
  );
}

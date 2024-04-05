import { Grid, TextField } from "@mui/material";
import "./PaymentInfo.scss";
import { useState } from "react";
import {
  IPaymentInfo,
  setCheckoutPage,
  setCurrentIndex,
  setPaymentInfo,
  setSpecialOffer,
} from "../../../redux/CheckoutSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import TermsAndPromoModal from "../../Modals/TermsAndPoliciesModal/TermsAndPolicies";
export function PaymentInfo() {
  const cardNumberSlice = useSelector(
    (state: RootState) => state.checkoutRoom.paymentInfo.cardNumber
  );
  const expMMSlice = useSelector(
    (state: RootState) => state.checkoutRoom.paymentInfo.expMM
  );
  const expYYSlice = useSelector(
    (state: RootState) => state.checkoutRoom.paymentInfo.expYY
  );
  const Sliceguests = useSelector(
    (state: RootState) => state.propertyConfigInfo.guests
  );
  const sliceGuestCount = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestCounts
  );
  const nightlyRate=useSelector((state:RootState)=>state.itineraryInfo.priceDetails.nightlyRate);
  const slicesubtotal=useSelector((state:RootState)=>state.itineraryInfo.priceDetails.subtotal);
  const taxes=useSelector((state:RootState)=>state.itineraryInfo.priceDetails.taxes);
  const vat=useSelector((state:RootState)=>state.itineraryInfo.priceDetails.vat);
  const totalCost=useSelector((state:RootState)=>state.itineraryInfo.priceDetails.totalPayment);
  const amountDueAtResort=useSelector((state:RootState)=>state.itineraryInfo.priceDetails.dueAtResort);
  const [openModal1, setOpenModal1] = useState(false);
  const [cardNumber, setCardNumber] = useState(cardNumberSlice);
  const [cardMonth, setCardMonth] = useState(expMMSlice);
  const [cardYear, setCardYear] = useState(expYYSlice);
  const [CVV, setCVV] = useState("");
  const [termsAndPolicies, setTermsAndPolicies] = useState(false);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);
  const roomName = useSelector(
    (state: RootState) => state.itineraryInfo.roomName
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
  const onOpenModal1 = () => setOpenModal1(true);
  const onCloseModal1 = () => setOpenModal1(false);
  const reduxDispatch: AppDispatch = useDispatch();
  function isCardExpired() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const expYear = parseInt(cardYear);
    const expMonth = parseInt(cardMonth);
    const fullExpYear = currentYear - (currentYear % 100) + expYear;
    if (fullExpYear > currentYear) {
      setIsDateValid(true);
      return true;
    }
    if (
      fullExpYear < currentYear ||
      (fullExpYear === currentYear && expMonth >= currentDate.getMonth() + 1)
    ) {
      setIsDateValid(true);
      return true;
    } else {
      setIsDateValid(false);
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
  }
  function handleMonthChange(value: string) {
    setIsDateValid(true);
    setCardMonth(value);
  }
  function handleYearChange(value: string) {
    setIsDateValid(true);
    setCardYear(value);
  }
  function handleCVV(value: string) {
    setCVV(value);
  }
  function handlePolicyChange() {
    setTermsAndPolicies(!termsAndPolicies);
  }
  function checkValidations() {
    isCardExpired();
    if (!isDateValid) {
      setIsDateValid(false);
      return false;
    }
    if (!termsAndPolicies) {
      return false;
    }
    return true;
  }
  function handleEditBilling(event: { preventDefault: () => void }) {
    reduxDispatch(setCurrentIndex(1));
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      console.log(specialOffers, "here");
      const paymentInfo: IPaymentInfo = {
        cardNumber: cardNumber,
        expMM: cardMonth,
        expYY: cardYear,
      };

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
        adultCount:adultCount,
        childCount:childCount,
        totalCost:totalCost,
        amountDueAtResort:amountDueAtResort,
        propertyId:18,
        nightlyRate:nightlyRate,
        subtotal:slicesubtotal,
        taxes:taxes,
        vat:vat
      };
      reduxDispatch(setPaymentInfo(paymentInfo));
      reduxDispatch(setCheckoutPage(confirmationDetails));
    }
  }
  function handleSpecialOffers() {
    setSpecialOffers(!specialOffers);
    reduxDispatch(setSpecialOffer());
  }
  return (
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
                  Card Number
                </label>
              </Grid>
              <Grid item>
                <TextField
                  id="card-name"
                  variant="outlined"
                  className="text-field"
                  value={cardNumber}
                  required
                  inputProps={{
                    pattern: "[0-9]{13,19}",
                  }}
                  error={cardNumber && !isValidCreditCardNumber(cardNumber)}
                  helperText={
                    cardNumber && !isValidCreditCardNumber(cardNumber)
                      ? "Please enter a valid card number"
                      : ""
                  }
                  onChange={(e) => handleCardChange(e.target.value)}
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
                    Exp MM
                  </label>
                </Grid>
                <Grid item>
                  <TextField
                    id="exp-mm"
                    variant="outlined"
                    className="text-field"
                    required
                    type="text"
                    value={cardMonth}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    inputProps={{
                      pattern: "^(0?[1-9]|1[0-2])$",
                      maxLength: 2,
                    }}
                    error={
                      (cardMonth !== "" &&
                        !/^(0?[1-9]|1[0-2])$/.test(cardMonth)) ||
                      (!isDateValid && cardMonth !== "")
                    }
                    helperText={
                      cardMonth !== "" && !/^(0?[1-9]|1[0-2])$/.test(cardMonth)
                        ? "Please enter a valid month (01-12)"
                        : !isDateValid && cardMonth !== ""
                        ? "Card already expired"
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
                    Exp YY
                  </label>
                </Grid>
                <Grid item>
                  <TextField
                    id="exp-yy"
                    variant="outlined"
                    className="text-field"
                    required
                    onChange={(e) => handleYearChange(e.target.value)}
                    inputProps={{
                      pattern: "^(\\d{2})$",
                      maxLength: 2,
                    }}
                    value={cardYear}
                    error={
                      cardYear !== "" &&
                      (!/^\d{2}$/.test(cardYear) ||
                        parseInt(cardYear, 10) < new Date().getFullYear() % 100)
                    }
                    helperText={
                      cardYear !== "" &&
                      ((!/^\d{2}$/.test(cardYear) &&
                        "Please enter a valid 2-digit year") ||
                        (parseInt(cardYear, 10) <
                          new Date().getFullYear() % 100 &&
                          "Year must be greater than current year"))
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
                required
                autoComplete="off"
                inputProps={{
                  pattern: "[0-9]*",
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
                error={CVV && !/^[0-9]{3,4}$/.test(CVV)}
                helperText={
                  CVV && !/^[0-9]{3,4}$/.test(CVV)
                    ? "Please enter a valid CVV (3 or 4 digits)"
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
            <div className="special-offer-text">Send me special offers</div>
          </div>

          <div className="terms-policies">
            <input type="checkbox" required onClick={handlePolicyChange} />
            <div className="terms-test">
              I agree to the{" "}
              <span className="terms-button" onClick={onOpenModal1}>
                Terms and Policies
              </span>{" "}
              of travel*
            </div>
            <TermsAndPromoModal open={openModal1} onClose={onCloseModal1} />
          </div>
          {!termsAndPolicies && (
            <p className="error-message">
              Please agree to the Terms and Policies
            </p>
          )}
        </div>
        <div className="payment-bottom-wrapper">
          <div className="payment-amount-container">
            <div className="payment-amount-text">Total Due</div>
            <div className="payment-amount-figure">$XXX.XX</div>
          </div>
          <div className="payment-button-wrapper">
            <button className="edit-billing" onClick={handleEditBilling}>
              Edit Billing Info.
            </button>
            <button className="purchase-button">PURCHASE</button>
          </div>
        </div>
      </div>
    </form>
  );
}

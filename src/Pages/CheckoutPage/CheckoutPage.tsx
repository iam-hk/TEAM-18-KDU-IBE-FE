import "./Checkout.scss";
import { StepperUI } from "../../Component/RoomSearchPage/ReactStepper/StepperUI";
import { Itinerary } from "../../Component/RoomSearchPage/Itinerary/Itinerary";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { SetStateAction, useState } from "react";
import axios from "axios";
import CustomizedSnackbars from "../../Component/snackbar/CustomizedSnackbars";
import { TravelerInfo } from "../../Component/CheckoutPage/TravelerInfo/TravelerInfo";
import { BillingInfo } from "../../Component/CheckoutPage/BillingInfo/BillingInfo";
import { PaymentInfo } from "../../Component/CheckoutPage/PaymentInfo/PaymentInfo";
import { useTranslation } from "react-i18next";
import { Help } from "../../Component/CheckoutPage/HelpComponent/Help";
import CountdownTimer from "../../Component/CheckoutPage/TimerComponent/TimerComponent";
import { useNavigate } from "react-router-dom";
export default function CheckoutPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const itineraryPropertyName = useSelector(
    (state: RootState) => state.itineraryInfo.roomName
  );
  const roomTypeId = useSelector(
    (state: RootState) => state.itineraryInfo.roomTypeId
  );
  const currentIndex = useSelector(
    (state: RootState) => state.checkoutRoom.currentIndex
  );
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };
  const navigate=useNavigate();
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setEmail("");
    setMessage("A Review link has been sent to your Mail .");
    setShowSnackbar(true);
    sendEmailDetails();
  };
  async function sendEmailDetails() {
    let customUrl = import.meta.env.VITE_REACT_APP_EMAIL_REVIEW;
    customUrl += `roomTypeId=${roomTypeId}&email=${email}`;
    try {
      await axios.get(customUrl);
    } catch (error) {
      console.log(error);
    }
  }
  const handleNavigate = () => {
    setTimeout(() => {
      navigate("/");
    }, 3500);
  };
  if (!itineraryPropertyName) {
    handleNavigate(); 
    return (
      <>
      <div className="checkout-page">
        <h1 className="error-in-checkout">Please select a room first.</h1>
        <h3 className="redirecting-home-page">Redirectiong to home page.....</h3>
      </div>
      </>
    );
  }
  return (
    <>
      <div className="checkout-page">
        <StepperUI onStepClick={undefined} />
        <div className="checkout-wrapper">
          <div className="checkout-binder">
            <div className="checkout-form">
              <div className="form-wrapper">
                <div className="form-heading">{t("paymentInfo")}</div>
                <div className="traveler-div">
                  <div className="traveler-heading">
                    {t("travelerInfo.heading")}
                  </div>
                  {currentIndex === 0 && <TravelerInfo />}
                </div>
                <div className="billing-container">
                  <div className="billing-heading">
                    {t("billingInfo.heading")}
                  </div>
                  {currentIndex === 1 && <BillingInfo />}
                </div>

                <div className="payment-container">
                  <div className="payment-heading">
                    {t("paymentInfoData.heading")}
                  </div>
                  {currentIndex === 2 && <PaymentInfo />}
                </div>
              </div>
            </div>
          </div>
          <div className="itinerary-help-wrapper">
            {itineraryPropertyName && (
              <div className="itinerary-content">
                <Itinerary />
              </div>
            )}
            <div className="help-wrapper">
              <div className="spacing-component"></div>
              <div className="help-component">
                <Help />
              </div>
            </div>
          </div>
        </div>
        <CountdownTimer />
      </div>
      {showSnackbar && (
        <CustomizedSnackbars
          status="success"
          message={message}
          setShowSnackbar={setShowSnackbar}
        />
      )}
    </>
  );
}

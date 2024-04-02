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
export default function CheckoutPage() {
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
    console.log(customUrl);
    try {
      await axios.get(customUrl);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="checkout-page">
        <StepperUI onStepClick={undefined} />
        <div className="checkout-wrapper">
          {/* <div className="checkout-form">
            <div className="form-wrapper">
              <div className="form-heading">Payment Info</div>
              <div className="traveler-div">
                <div className="traveler-heading">1.Traveler Info</div>
                <TravelerInfo />
              </div>
              <div className="billing-container">
                <div className="billing-heading">2.Billing Info</div>
                <BillingInfo />
              </div>
              <div className="payment-container">
                <div className="payment-heading">3.Payment Info</div>
                <PaymentInfo />
              </div>
            </div>
          </div> */}
          <div className="checkout-wrapper">
            <div className="checkout-form">
              <div className="form-wrapper">
                <div className="form-heading">Payment Info</div>
                  <div className="traveler-div">
                    <div className="traveler-heading">1. Traveler Info</div>
                    {currentIndex === 0 && (
                    <TravelerInfo />
                    )}
                  </div>
                  <div className="billing-container">
                    <div className="billing-heading">2. Billing Info</div>
                    {currentIndex === 1 && (
                    <BillingInfo />
                    )}
                  </div>
                
                  <div className="payment-container">
                    <div className="payment-heading">3. Payment Info</div>
                    {currentIndex === 2 && (
                    <PaymentInfo />
                    )}
                  </div>
              </div>
            </div>
          </div>
          {itineraryPropertyName && (
            <div className="itinerary-content">
              <Itinerary />
            </div>
          )}
        </div>
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

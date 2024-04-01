import "./Checkout.scss";
import { StepperUI } from "../../Component/RoomSearchPage/ReactStepper/StepperUI";
import { Itinerary } from "../../Component/RoomSearchPage/Itinerary/Itinerary";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { SetStateAction, useState } from "react";
import axios from "axios";
export default function CheckoutPage() {
  const [email, setEmail] = useState("");
  const itineraryPropertyName = useSelector(
    (state: RootState) => state.itineraryInfo.roomName
  );
  const roomTypeId = useSelector(
    (state: RootState) => state.itineraryInfo.roomTypeId
  );
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    sendEmailDetails();
  };
  async function sendEmailDetails() {
    let customUrl= import.meta.env.VITE_REACT_APP_EMAIL_REVIEW;
     customUrl+= `roomTypeId=${roomTypeId}&email=${email}`;
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
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div>
                <label className="email-heading" htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
          {itineraryPropertyName && (
            <div className="itinerary-content">
              <Itinerary />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

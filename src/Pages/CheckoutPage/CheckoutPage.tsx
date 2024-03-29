import "./Checkout.scss";
import { StepperUI } from "../../Component/RoomSearchPage/ReactStepper/StepperUI";
import { Itinerary } from "../../Component/RoomSearchPage/Itinerary/Itinerary";
export default function CheckoutPage() {
  return (
    <>
      <div className="room-page">
        <StepperUI onStepClick={undefined} />
        <div className="itinerary-wrapper">
          <div className="itinerary-content">
            <Itinerary />
          </div>
        </div>
      </div>
    </>
  );
}

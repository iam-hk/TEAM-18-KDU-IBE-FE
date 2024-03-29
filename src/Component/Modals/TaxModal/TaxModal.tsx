import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./TaxModal.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
interface TaxModalProps {
  open: boolean;
  onClose: () => void;
}
const TaxModal: React.FC<TaxModalProps> = ({ open, onClose }) => {
  const priceOfRoomTypeInParticularDate = useSelector(
    (state: RootState) => state.itineraryInfo.priceOfRoomTypeInParticularDate
  );
  function totalCost() {
    let totalPrice = 0;
    Object.values(priceOfRoomTypeInParticularDate).forEach((price) => {
      totalPrice += price;
    });
    return totalPrice;
  }
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="tax-modal-content">
        <div className="tax-modal-heading">Rate Breakdown</div>
        <div className="tax-modal-room-type">Room type</div>
        <div className="tax-modal-nightly-rate">Nightly Rate(per room)</div>
        <div className="tax-modal-promotions">Circus savings promotion</div>
        {Object.entries(priceOfRoomTypeInParticularDate).map(
          ([dateString, price]) => {
            const date = new Date(dateString);
            const options = { weekday: "long", day: "numeric", month: "short" };
            const formattedDate = date.toLocaleDateString("en-US", options);
            return (
              <div key={dateString} className="tax-modal-date-rate">
                <div className="tax-modal-date">{formattedDate}</div>
                <div className="tax-modal-rate">${price.toFixed(1)}</div>
              </div>
            );
          }
        )}

        <div className="tax-modal-total">
          <div className="tax-modal-total-heading">Room Total</div>
          <div className="tax-modal-total-price">${totalCost()}</div>
        </div>
        <div className="tax-modal-border-bottom"></div>
        <div className="tax-modal-taxes-details">
          <div className="tax-modal-taxes-heading">
            Taxes and fees(per room)
          </div>
          <div className="tax-modal-tax-type">
            <div className="tax-modal-type-heading">Resort fee</div>
            <div className="tax-modal-type-price">$132</div>
          </div>
          <div className="tax-modal-tax-type">
            <div className="tax-modal-type-heading">Occupancy tax</div>
            <div className="tax-modal-type-price">$132</div>
          </div>
        </div>
        <div className="tax-modal-border-bottom"></div>
        <div className="tax-modal-due-amount">
          <div className="tax-modal-due-now">
            <div className="due-now-heading">Due now</div>
            <div className="due-amount">$400</div>
          </div>
          <div className="tax-modal-due-at-resort">
            <div className="resort-heading">Due at resort</div>
            <div className="resort-due-price">$1288</div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default TaxModal;

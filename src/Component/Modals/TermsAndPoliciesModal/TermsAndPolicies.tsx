import { useSelector } from "react-redux";
import "./TermsAndPolicies.scss";
import { RootState } from "../../../redux/Store";
import { CurrencyExchangeRates } from "../../../types/CurrencyExchange";
import Modal from "react-responsive-modal";
interface TermsAndPromoProps {
  open: boolean;
  onClose: () => void;
}
const TermsAndPromoModal: React.FC<TermsAndPromoProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="modal-content">
        <div className="terms-heading">Terms And Conditions .</div>
        <div className="terms-points">
          <ul>
            <li>
              Book hotel rooms through our website, mobile app, or reservation
              desk. All bookings are subject to availability and confirmation by
              the Hotel.
            </li>
            <li>
              Cancellation and modification policies vary; refer to booking
              confirmation for details. Modifications may incur charges and
              depend on availability.
            </li>
            <li>
              Payment due upon check-in, unless specified otherwise. Rates
              subject to applicable taxes and fees.
            </li>
            <li>
              No smoking indoors; smoking in designated areas only. Pets not
              allowed unless specified. Guests liable for any damage to hotel
              property.
            </li>
            <li>
              Hotel not liable for loss, damage, or injury, except where
              required by law. Right to refuse service to anyone for any reason.
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
export default TermsAndPromoModal;

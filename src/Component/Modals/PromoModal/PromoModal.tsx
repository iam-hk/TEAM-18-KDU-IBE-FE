import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./PromoModal.scss";
interface PromoModalProps {
  open: boolean;
  onClose: () => void;
}
const PromoModal: React.FC<PromoModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="modal-content">
        <h1 className="modal-heading-title">Circus Saving Promotion</h1>
        <p className="modal-offer-title">
          Save upto 30% OFF room rates w/2 night minimum stay
        </p>
        <div className="modal-bottom">
          <h3 className="modal-package-total">Package Total</h3>
          <h3>$2570.60</h3>
        </div>
      </div>
    </Modal>
  );
};
export default PromoModal;

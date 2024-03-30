import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./PromoModal.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
interface PromoModalProps {
  open: boolean;
  onClose: () => void;
}
const PromoModal: React.FC<PromoModalProps> = ({ open, onClose }) => {
  const promoCodeInfo=useSelector((state:RootState)=>state.itineraryInfo.promoCodeInfo);
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="modal-content">
        <h1 className="modal-heading-title">{promoCodeInfo.promotionTitle}</h1>
        <p className="modal-offer-title">
          {promoCodeInfo.promotionDescription}
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

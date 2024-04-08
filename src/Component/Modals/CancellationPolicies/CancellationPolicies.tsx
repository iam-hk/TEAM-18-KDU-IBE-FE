import "./CancellationPolicies.scss"
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import { useTranslation } from "react-i18next";

interface ICancellationPolicies {
  open: boolean;
  onClose: () => void;
}
const CancellationPolicies: React.FC<ICancellationPolicies> = ({ open, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="cancellation-policies-modal">
        <div className="cancellation-policies-heading">
           {t("confirmationPage.cancellationPolicies.heading")}
        </div>
        <ul className="cancellation-policies-wrapper">
        <li>{t("confirmationPage.cancellationPolicies.point1")}</li>
        <li>{t("confirmationPage.cancellationPolicies.point2")}</li>
        <li>{t("confirmationPage.cancellationPolicies.point3")}</li>
        </ul>
      </div>
    </Modal>
  );
};
export default CancellationPolicies;

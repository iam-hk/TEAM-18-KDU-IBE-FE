import { useTranslation } from "react-i18next";
import "./TermsAndPolicies.scss";
import Modal from "react-responsive-modal";
interface TermsAndPromoProps {
  open: boolean;
  onClose: () => void;
}
const TermsAndPromoModal: React.FC<TermsAndPromoProps> = ({
  open,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="modal-content">
        <div className="terms-heading">{t("confirmationPage.terms.heading")}</div>
        <div className="terms-points">
          <ul>
            <li>
            {t("confirmationPage.terms.point1")}
            </li>
            <li>
            {t("confirmationPage.terms.point2")}
            </li>
            <li>
            {t("confirmationPage.terms.point3")}
            </li>
            <li>
            {t("confirmationPage.terms.point4")}
            </li>
            <li>
            {t("confirmationPage.terms.point5")}
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};
export default TermsAndPromoModal;

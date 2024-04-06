import "./CancelModal.scss";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useTranslation } from "react-i18next";
interface ICancelModal {
  open: boolean;
  onClose: () => void;
}
const CancelModal: React.FC<ICancelModal> = ({ open, onClose }) => {
  function handleNoButtonClick() {
    onClose();
  }
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={onClose} center>
      <AuthenticatedTemplate>
        <div className="cancel-modal-wrapper-auth">
          <div className="cancel-modal-auth-heading">{t("confirmationPage.cancellationPolicies.sure")}</div>
          <div className="cancel-modal-auth-button">
            <button>{t("confirmationPage.cancellationPolicies.yes")}</button>
          </div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className="cancel-modal-wrapper">
          <div className="cancel-heading-text">
          {t("confirmationPage.cancellationPolicies.otp")}
          </div>
          <div className="otp-input-box">
            <input type="number" />
          </div>
          <div className="otp-submit-button">
            <button>{t("confirmationPage.cancellationPolicies.confirm")}</button>
          </div>
        </div>
      </UnauthenticatedTemplate>
    </Modal>
  );
};
export default CancelModal;

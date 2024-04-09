import "./CancelModal.scss";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import CustomizedSnackbars from "../../../Component/snackbar/CustomizedSnackbars";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface ICancelModal {
  open: boolean;
  onClose: () => void;
}
const CancelModal: React.FC<ICancelModal> = ({ open, onClose }) => {
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loader, setLoader] = useState(false);
  const [sentOtp,setSentOtp]=useState(false);
  const navigate=useNavigate();
  const email = useSelector(
    (state: RootState) => state.checkoutRoom.travelerInfo.temail
  );
  const [otp, setOtp] = useState("");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  function handleNoButtonClick() {
    onClose();
  }
  const sendOtpToUser = async () => {
    try {
      setLoader(true);
      const otpUrl=import.meta.env.VITE_REACT_APP_API_MGT+`/otp-cancel?id=${id}&email=${email}`
      const response = await axios.get(
       otpUrl
      );
      setSentOtp(true);
      setLoader(false);
      if (response.data.message === "OTP sent to your mail successfully") {
        setSuccess(true);
        setShowSnackbar(true);
        setMessage("OTP sent successfully");
      } else {
        setShowSnackbar(true);
        setMessage("Error sending OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoader(false);
      setShowSnackbar(true);
      setMessage("Error sending OTP");
    }
  };
  const confirmOtpOfUser = async () => {
    if(!otp)
      {
        return;
      }
    try {
      setLoader(true);
      const confirmOtpUrl=import.meta.env.VITE_REACT_APP_API_MGT+`/validate-otp?id=${id}&otp=${otp}`;
      const response = await axios.get(
        confirmOtpUrl
      );
      setLoader(false);
      setSuccess(true);
      setMessage(response.data.message);
      setShowSnackbar(true);
      if (response.data.message === "Booking cancellation successful") {
        setSuccess(true);
      }
      setOtp("");
    } catch (error) {
      setLoader(false);
      console.error("Error confirming OTP:", error);
      setShowSnackbar(true);
      setSuccess(false);
      setMessage("Error confirming OTP");
      setOtp("");
    }
  };
  const cancelLoggedInBooking = async () => {
    try {
      setLoader(true);
      const cancelLoggedIn=import.meta.env.VITE_REACT_APP_API_MGT+`/cancel?id=${id}`;
      const response = await axios.get(
        cancelLoggedIn
      );
      setLoader(false);
      if (response.data.message === "Booking Cancelled Successfully") {
        setSuccess(true);
        setMessage("Booking cancelled successfully");
        setTimeout(() => {
          navigate(`/confirmation?id=${id}`);
        }, 4000);
      } else {
        setSuccess(false);
        setMessage(response.data.message);
      }
      setShowSnackbar(true);
    } catch (error) {
      setLoader(false);
      console.error("Error cancelling booking:", error);
      setSuccess(false);
      setShowSnackbar(true);
      setMessage("Error cancelling booking");
    }
  };
  
  const { t } = useTranslation();
  return (
    <>
      <Modal open={open} onClose={onClose} center>
        <AuthenticatedTemplate>
        <div className="cancel-modal-wrapper-auth">
            <div className="cancel-modal-auth-heading">
              {t("confirmationPage.cancellationPolicies.sure")}
            </div>
            <div className="cancel-modal-auth-button">
              <button onClick={cancelLoggedInBooking}>{t("confirmationPage.cancellationPolicies.yes")}</button>
              {loader && (
                <div className="loader-wrapper">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              )}
              <button onClick={handleNoButtonClick}>{t("confirmationPage.cancellationPolicies.no")}</button>
            </div>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="cancel-modal-wrapper">
            <div className="cancel-heading-text">
              {t("confirmationPage.cancellationPolicies.otp")}
            </div>
            <div className="otp-input-box">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="button-wrapper-cancel-modal">
              {loader && (
                <div className="loader-wrapper">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              )}
              <div className="send-otp-button">
                <button onClick={sendOtpToUser} disabled={sentOtp} style={{ opacity: sentOtp ? 0.5 : 1 }}>SEND OTP</button>
              </div>
              <div className="otp-submit-button">
                <button onClick={confirmOtpOfUser} disabled={otp === ""} style={{ opacity: otp === "" ? 0.5 : 1 }} >
                  {t("confirmationPage.cancellationPolicies.confirm")}
                </button>
              </div>
            </div>
          </div>
        </UnauthenticatedTemplate>
      </Modal>
      {showSnackbar && (
        <CustomizedSnackbars
          status={success ? "success" : "error"}
          message={message}
          setShowSnackbar={setShowSnackbar}
        />
      )}
    </>
  );
};
export default CancelModal;

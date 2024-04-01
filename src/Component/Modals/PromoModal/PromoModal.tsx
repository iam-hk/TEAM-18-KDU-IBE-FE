import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./PromoModal.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { useTranslation } from "react-i18next";
import { CurrencyExchangeRates } from "../../../types/CurrencyExchange";
import { CurrencySymbols } from "../../../Constants/CurrencySymbols";
interface PromoModalProps {
  open: boolean;
  onClose: () => void;
}
const PromoModal: React.FC<PromoModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const promoCodeInfo = useSelector(
    (state: RootState) => state.itineraryInfo.promoCodeInfo
  );
  const currentSelectedCurrency = useSelector(
    (state: RootState) => state.currencyRate.currentSelectedCurrency
  ) as keyof CurrencyExchangeRates;

  const currentPrice = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
  );
  function updatePrice(price: number) {
    return (price * currentPrice[currentSelectedCurrency]).toFixed(1);
  }
  return (
    <Modal open={open} onClose={onClose} center>
      <div className="modal-content">
        <h1 className="modal-heading-title">
          {t(`${promoCodeInfo.promotionTitle}.title`)}
        </h1>
        <p className="modal-offer-title">
          {t(`${promoCodeInfo.promotionTitle}.description`)}
        </p>
        <div className="modal-bottom">
          <h3 className="modal-package-total">{t("packageTotal")}</h3>
          <h3>
          {(CurrencySymbols as any)[currentSelectedCurrency]}
                        {updatePrice(2340)}
          </h3>
        </div>
      </div>
    </Modal>
  );
};
export default PromoModal;

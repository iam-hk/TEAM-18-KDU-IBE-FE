import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./TaxModal.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";
import { useTranslation } from "react-i18next";
import { CurrencyExchangeRates } from "../../../types/CurrencyExchange";
import { CurrencySymbols } from "../../../Constants/CurrencySymbols";
interface TaxModalProps {
  open: boolean;
  onClose: () => void;
}
const TaxModal: React.FC<TaxModalProps> = ({ open, onClose }) => {
  const priceOfRoomTypeInParticularDate = useSelector(
    (state: RootState) => state.itineraryInfo.priceOfRoomTypeInParticularDate
  );
  const promoCodeInfo = useSelector(
    (state: RootState) => state.itineraryInfo.promoCodeInfo
  );
  function updatePrice(price: number) {
    return (price * currentPrice[currentSelectedCurrency]).toFixed(1);
  }
  const { t } = useTranslation();
  const currentSelectedCurrency = useSelector(
    (state: RootState) => state.currencyRate.currentSelectedCurrency
  ) as keyof CurrencyExchangeRates;

  const currentPrice = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
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
        <div className="tax-modal-heading">{t("taxModal.rateBreakdown")}</div>
        <div className="tax-modal-room-type">{t("taxModal.roomType")}</div>
        <div className="tax-modal-nightly-rate">
          {t("taxModal.nightlyRate")}
        </div>
        <div className="tax-modal-promotions">
          {t(`${promoCodeInfo.promotionTitle}.title`)}
        </div>
        {Object.entries(priceOfRoomTypeInParticularDate)
          .sort(
            ([dateStringA], [dateStringB]) =>
              new Date(dateStringA) - new Date(dateStringB)
          )
          .map(([dateString, price]) => {
            const date = new Date(dateString);
            const options = { weekday: "long", day: "numeric", month: "short" };
            const formattedDate = date.toLocaleDateString("en-US", options);
            return (
              <div key={dateString} className="tax-modal-date-rate">
                <div className="tax-modal-date">{formattedDate}</div>
                <div className="tax-modal-rate">
                {(CurrencySymbols as any)[currentSelectedCurrency]}
                  {updatePrice(price)}
                </div>
              </div>
            );
          })}

        <div className="tax-modal-total">
          <div className="tax-modal-total-heading">
            {t("taxModal.roomTotal")}
          </div>
          <div className="tax-modal-total-price">
            {(CurrencySymbols as any)[currentSelectedCurrency]}
            {updatePrice(totalCost())}
          </div>
        </div>
        <div className="tax-modal-border-bottom"></div>
        <div className="tax-modal-taxes-details">
          <div className="tax-modal-taxes-heading">{t("taxModal.taxes")}</div>
          <div className="tax-modal-tax-type">
            <div className="tax-modal-type-heading">
              {t("taxModal.resortFee")}
            </div>
            <div className="tax-modal-type-price">
              {(CurrencySymbols as any)[currentSelectedCurrency]}
              {updatePrice(120)}
            </div>
          </div>
          <div className="tax-modal-tax-type">
            <div className="tax-modal-type-heading">
              {t("taxModal.occupancyFee")}
            </div>
            <div className="tax-modal-type-price">
              {(CurrencySymbols as any)[currentSelectedCurrency]}
              {updatePrice(130)}
            </div>
          </div>
        </div>
        <div className="tax-modal-border-bottom"></div>
        <div className="tax-modal-due-amount">
          <div className="tax-modal-due-now">
            <div className="due-now-heading">{t("taxModal.dueNow")}</div>
            <div className="due-amount">
              {(CurrencySymbols as any)[currentSelectedCurrency]}
              {updatePrice(400)}
            </div>
          </div>
          <div className="tax-modal-due-at-resort">
            <div className="resort-heading">{t("taxModal.dueAtResort")}</div>
            <div className="resort-due-price">
              {(CurrencySymbols as any)[currentSelectedCurrency]}
              {updatePrice(800)}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default TaxModal;

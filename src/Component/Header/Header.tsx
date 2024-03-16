import "./Header.scss";
import siteLogo from "../../assets/globe.png";
import { useState } from "react";
import i18n from "../../Constants/LanguageTranslator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { changeCurrentCurrency } from "../../redux/CurrencySlice";
export function Header() {
  const [isRightCopyOpen, setIsRightCopyOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const reduxDispatch: AppDispatch = useDispatch();
  const selectedCurrency = useSelector(
    (state: RootState) => state.currencyRate.currentSelectedCurrency
  );
  const toggleRightCopy = () => {
    setIsRightCopyOpen(!isRightCopyOpen);
  };
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setSelectedLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    reduxDispatch(changeCurrentCurrency(newCurrency));
  };
  return (
    <div className="header">
      <div className="headings">
        <h4 className="main-heading">{i18n.t("mainHeading")}</h4>
        <h4 className="sub-heading">{i18n.t("subHeading")}</h4>
      </div>
      <div className="right-part">
        <h4 className="my-bookings">{i18n.t("myBookings")}</h4>
        <div className="choice-components">
          <div className="language-component">
            <img src={siteLogo} alt="imagenotfound" />
            <select
              className="language-selection"
              name="language"
              onChange={handleLanguageChange}
              value={selectedLanguage}
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
          </div>
          <div className="currency-component">
            <select
              name="currency"
              className="currency-selection"
              onChange={handleCurrencyChange}
              value={selectedCurrency}
            >
              <option value="USD">$ USD</option>
              <option value="INR">₹ RS</option>
              <option value="CAD">$ CAD</option>
            </select>
          </div>
        </div>
        <button className="login-button">{i18n.t("login")}</button>
      </div>
      {isRightCopyOpen && (
        <div className="right-part-copy">
          <h4>{i18n.t("myBookings")}</h4>
          <div className="language-component">
            <img src={siteLogo} alt="logo not found" />
            <select
              className="language-selection"
              name="language"
              onChange={handleLanguageChange}
              value={selectedLanguage}
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
              <option value="de">DE</option>
            </select>
          </div>
          <div className="currency-component">
            <select
              name="currency"
              className="currency-selection"
              onChange={handleCurrencyChange}
              value={selectedCurrency}
            >
              <option value="USD">$ USD</option>
              <option value="RS">₹ RS</option>
              <option value="CAD">$ CAD</option>
            </select>
          </div>
          <button className="login-button">{i18n.t("login")}</button>
        </div>
      )}
      <div className="hamburger" onClick={toggleRightCopy}>
        <i className="ri-menu-line"></i>
      </div>
    </div>
  );
}

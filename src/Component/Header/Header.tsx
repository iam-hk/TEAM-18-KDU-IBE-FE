import "./Header.scss";
import siteLogo from "../../assets/globe.png";
import { useState } from "react";
import i18n from "../../Constants/LanguageTranslator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/Store";
import { changeCurrentCurrency } from "../../redux/CurrencySlice";
import { useNavigate } from "react-router-dom";
import LoggIn from "../LoggIn/LoggIn";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import axios from "axios";
import { setMyBookings } from "../../redux/MyBookings";
export function Header() {
  const navigate = useNavigate();
  const [isRightCopyOpen, setIsRightCopyOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const reduxDispatch: AppDispatch = useDispatch();
  const selectedCurrency: string = useSelector(
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
  function handleRedirect() {
    navigate("/");
  }
  async function handleAllBookings() {
    let username = "";
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      const value = sessionStorage.getItem(key);
      if (value) {
        try {
          const data = JSON.parse(value);
          if (data && data.username) {
            username = data.username;
            break;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    const url =
      import.meta.env.VITE_REACT_APP_POST_REQ +
      `/my-bookings?email=${username}`;
    try {
      const response = await axios.get(url);
      reduxDispatch(setMyBookings(response.data));
      navigate("/myBookings");
    } catch (error) {
      navigate("/error");
    }
  }
  return (
    <div className="header">
      <div className="headings">
        <button className="main-heading" onClick={handleRedirect}>
          {i18n.t("mainHeading")}
        </button>
        <h4 className="sub-heading">{i18n.t("subHeading")}</h4>
      </div>
      <div className="right-part">
        <AuthenticatedTemplate>
          <button className="my-bookings" onClick={handleAllBookings}>
            {i18n.t("myBookings")}
          </button>
        </AuthenticatedTemplate>
        <div className="choice-components">
          <div className="language-component">
            <img
              src={siteLogo}
              alt="imagenotfound"
              className="language-component-img"
            />
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
              <option value="EUR">€ EUR</option>
              <option value="CAD">$ CAD</option>
            </select>
          </div>
        </div>
        <LoggIn />
      </div>
      {isRightCopyOpen && (
        <div className="right-part-copy">
          <button className="my-bookings">{i18n.t("myBookings")}</button>
          <div className="language-component">
            <img
              src={siteLogo}
              alt="logo not found"
              className="language-component-img"
            />
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
              <option value="EUR">€ EUR</option>
              <option value="CAD">$ CAD</option>
            </select>
          </div>
          <LoggIn />
        </div>
      )}
      <div className="hamburger" onClick={toggleRightCopy}>
        <i className="ri-menu-line"></i>
      </div>
    </div>
  );
}

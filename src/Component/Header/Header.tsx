import "./Header.scss";
import siteLogo from "../../assets/globe.png";
import { useState } from "react";
export function Header() {
  const [isRightCopyOpen, setIsRightCopyOpen] = useState(false);
  const toggleRightCopy = () => {
    setIsRightCopyOpen(!isRightCopyOpen);
  };
  return (
    <div className="header">
      <div className="headings">
        <h4 className="main-heading">Kickdrum</h4>
        <h4 className="sub-heading">Internet Booking Engine</h4>
      </div>
      <div className="right-part">
        <h4>MY BOOKINGS</h4>
        <div className="choice-components">
          <div className="language-component">
            <img src={siteLogo} alt="bye" />
            <select className="language-selection" name="language">
              <option value="English">EN</option>
              <option value="French">FR</option>
              <option value="German">DE</option>
            </select>
          </div>
          <div className="currency-component">
            <select name="currency" className="currency-selection">
              <option value="USD">$ USD</option>
              <option value="RS">₹ RS</option>
            </select>
          </div>
        </div>
        <button className="login-button">Login</button>
      </div>
      {isRightCopyOpen && (
        <div className="right-part-copy">
          <h4>MY BOOKINGS</h4>
          <div className="language-component">
            <img src={siteLogo} alt="logo not found" />
            <select className="language-selection" name="language">
              <option value="English">EN</option>
              <option value="French">FR</option>
              <option value="German">DE</option>
            </select>
          </div>
          <div className="currency-component">
            <select name="currency" className="currency-selection">
              <option value="USD">$ USD</option>
              <option value="RS">₹ RS</option>
            </select>
          </div>
          <button className="login-button">Login</button>
        </div>
      )}
      <div className="hamburger" onClick={toggleRightCopy}>
        <i className="ri-menu-line"></i>
      </div>
    </div>
  );
}

import { useState } from 'react';
import './PriceFilterSelect.scss'; // Assuming you have a CSS file for styling
import upArrow from"../../../assets/up-arrow.png"
import downArrow from "../../../assets/down-arrow.png"
const PriceFilterSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Price Low');

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="selected-option" onClick={toggleOptions}>
        {selectedOption}
        {isOpen ? <img src={upArrow} alt="Up Arrow" /> : <img src={downArrow} alt="Down Arrow" />}
      </div>
      {isOpen && (
        <div className="options">
          <div className="option" onClick={() => handleOptionClick('Price Low')}>Price Low</div>
          <div className="option" onClick={() => handleOptionClick('Price High')}>Price High</div>
        </div>
      )}
    </div>
  );
};

export default PriceFilterSelect;

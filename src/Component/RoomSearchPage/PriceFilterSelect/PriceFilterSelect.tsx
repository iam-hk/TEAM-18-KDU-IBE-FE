import { useEffect, useState } from 'react';
import './PriceFilterSelect.scss'; // Assuming you have a CSS file for styling
import upArrow from"../../../assets/up-arrow.png"
import downArrow from "../../../assets/down-arrow.png"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/Store';
import { changeSelectedSortingParam } from '../../../redux/FilterRoomSlice';
const PriceFilterSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSortingParam=useSelector((state:RootState)=>state.filterRoom.selectedSortingParam);
  const reduxDispatch: AppDispatch = useDispatch();
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    reduxDispatch(changeSelectedSortingParam(option));
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="selected-option" onClick={toggleOptions}>
        {selectedSortingParam}
        {isOpen ? <img src={upArrow} alt="Up Arrow" /> : <img src={downArrow} alt="Down Arrow" />}
      </div>
      {isOpen && (
        <div className="options">
          <div className='option' onClick={()=>handleOptionClick('Select')}>Select</div>
          <div className="option" onClick={() => handleOptionClick('Price Low')}>Price Low</div>
          <div className="option" onClick={() => handleOptionClick('Price High')}>Price High</div>
        </div>
      )}
    </div>
  );
};

export default PriceFilterSelect;

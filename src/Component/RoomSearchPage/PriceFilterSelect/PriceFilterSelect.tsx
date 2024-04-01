import { useState } from "react";
import "./PriceFilterSelect.scss";
import upArrow from "../../../assets/up-arrow.png";
import downArrow from "../../../assets/down-arrow.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import {
  changeSelectedSortingParam,
  changeSortingTechnique,
} from "../../../redux/FilterRoomSlice";
import { IDropDownSort } from "../../../types/PropertyConfigs";
import { updateSortDisplay } from "../../../redux/FilterSlice";

const PriceFilterSelect = (props: IDropDownSort) => {
  const [isOpen, setIsOpen] = useState(false);
  const displaySort = useSelector(
    (state: RootState) => state.filterInfo.displaySortName
  );

  const reduxDispatch: AppDispatch = useDispatch();
  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (
    variable: string,
    sort: boolean,
    displayName: string
  ) => {
    reduxDispatch(changeSelectedSortingParam(variable));
    reduxDispatch(updateSortDisplay(displayName));

    if (variable != "Select") reduxDispatch(changeSortingTechnique(sort));
    setIsOpen(false);
  };

  return (
    <div className="custom-select">
      <div className="selected-option" onClick={toggleOptions}>
        {displaySort}
        {isOpen ? (
          <img src={upArrow} alt="Up Arrow" />
        ) : (
          <img src={downArrow} alt="Down Arrow" />
        )}
      </div>
      {isOpen && (
        <div className="options">
          <div
            className="option"
            onClick={() => handleOptionClick("Select", false, "Select")}
          >
            Select
          </div>
          {props.sorts.map((individualOption) => {
            return (
              <div
                className="option"
                onClick={() =>
                  handleOptionClick(
                    individualOption.variable,
                    individualOption.order,
                    individualOption.sortDisplayName
                  )
                }
                data-variable={individualOption.variable}
                data-sort={individualOption.order}
                key={individualOption.sortDisplayName}
              >
                {individualOption.sortDisplayName}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PriceFilterSelect;

import { useDispatch, useSelector } from "react-redux";
import {
  toggleFilterVisibility,
  setAllFilterOptions,
  addFilters,
  removeFilters,
} from "../../../redux/FilterSlice";
import downArrow from "../../../assets/down-arrow.png";
import upArrow from "../../../assets/up-arrow.png";
import "./Filters.scss";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useState } from "react";

export default function Filters() {
  const reduxDispatch: AppDispatch = useDispatch();
  const isFilterVisible = useSelector(
    (state: RootState) => state.filterInfo.isFilterVisible
  );
  const appliedFilters = useSelector(
    (state: RootState) => state.filterInfo.appliedFilters
  );
  const filters = useSelector(
    (state: RootState) => state.propertyConfigInfo.filters
  );
  const [toggleFilters, setToggleFilters] = useState(false);
  const handleToggleFilterVisibility = (index: number) => {
    reduxDispatch(toggleFilterVisibility(index));
  };

  const handleToggleFilterOption = (filterIndex: number, option: string) => {
    if (appliedFilters.includes(option)) {
      reduxDispatch(removeFilters(option));
    } else {
      reduxDispatch(addFilters(option));
    }
  };

  function handleToggleFilter() {
    if (toggleFilters === true) {
      reduxDispatch(setAllFilterOptions());
    }
    setToggleFilters(!toggleFilters);
  }

  return (
    <div className="filter-wrapper">
      <div className="filter-container">
        <div className="filter-heading">
          <h2 className="filter-heading-text">Narrow your results</h2>
          <div className="arrow toggleDisplay" onClick={handleToggleFilter}>
            <img
              src={downArrow}
              alt=""
              style={{ display: toggleFilters ? "none" : "block" }}
            />
            <img
              src={upArrow}
              alt=""
              style={{ display: toggleFilters ? "block" : "none" }}
            />
          </div>
        </div>
        {filters.map((filter, index) => (
          <div className="each-filter" key={index}>
            <div
              className="filter-name"
              onClick={() => handleToggleFilterVisibility(index)}
            >
              <h3 className="filter-content">{filter.filterTitle}</h3>
              <div className="arrow">
                <img
                  src={downArrow}
                  alt=""
                  style={{ display: isFilterVisible[index] ? "none" : "block" }}
                />
                <img
                  src={upArrow}
                  alt=""
                  style={{ display: isFilterVisible[index] ? "block" : "none" }}
                />
              </div>
            </div>
            {isFilterVisible[index] && (
              <div className="filter-type">
                {filter.options.map((option, optionIndex) => (
                  <div className="filter-options" key={optionIndex}>
                    <input
                      type="checkbox"
                      onChange={() => handleToggleFilterOption(index, option)}
                      checked={appliedFilters.includes(option)}
                    />
                    <p className="filter-text">{option}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {toggleFilters && (
          <>
            {filters.map((filter, index) => (
              <div className="each-filter-copy" key={index}>
                <div
                  className="filter-name"
                  onClick={() => handleToggleFilterVisibility(index)}
                >
                  <h3 className="filter-content">{filter.filterTitle}</h3>
                  <div className="arrow">
                    <img
                      src={downArrow}
                      alt=""
                      style={{
                        display: isFilterVisible[index] ? "none" : "block",
                      }}
                    />
                    <img
                      src={upArrow}
                      alt=""
                      style={{
                        display: isFilterVisible[index] ? "block" : "none",
                      }}
                    />
                  </div>
                </div>
                {isFilterVisible[index] && (
                  <div className="filter-type">
                    {filter.options.map((option, optionIndex) => (
                      <div className="filter-options" key={optionIndex}>
                        <input
                          type="checkbox"
                          onChange={() =>
                            handleToggleFilterOption(index, option)
                          }
                          checked={appliedFilters.includes(option)}
                        />
                        <p className="filter-text">{option}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { Property } from "../property/Property";
import { Rooms } from "../rooms/Rooms";
import { Guests } from "../guests/Guests";
import { useDispatch, useSelector } from "react-redux";
import { getTenantConfig } from "../../../redux/thunk/GetTenantConfig";
import { DateCalender } from "../dateCalendar/DateCalendar";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "../../../redux/Store";
import "./SearchForm.scss";
export function SearchForm() {
  const disabledGuest = useSelector(
    (state: RootState) => state.propertyConfigInfo.showDisabilityOption
  );
  const reduxDispatch: AppDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(getTenantConfig());
  }, []);
  const { t } = useTranslation();
  return (
    <div className="search-form">
      <div className="all-search-fields">
        <Property />
        <div className="search-property-calendar">
          <h4>{t("search.selectDates")}</h4>
          <DateCalender />
        </div>
        <div className="guests-and-rooms">
          <Guests />
          <Rooms />
        </div>
        {disabledGuest && (
          <div className="disabled-checkbox">
            <input type="checkbox" />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Wheelchair_symbol.svg"
              alt=""
            />
            <h5>{t("search.disabled")}</h5>
          </div>
        )}
      </div>
      <div className="submit-button">
        <button>{t("search.searchButton")}</button>
      </div>
    </div>
  );
}

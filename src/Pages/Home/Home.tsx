import { useEffect } from "react";
import "./Home.scss";
import { Property } from "../../Component/Search/property/Property";
import { Rooms } from "../../Component/Search/rooms/Rooms";
import { Guests } from "../../Component/Search/guests/Guests";
import { AppDispatch, RootState } from "../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { getTenantConfig } from "../../redux/thunk/GetTenantConfig";
import { DateCalender } from "../../Component/Search/dateCalendar/DateCalendar";
import { useTranslation } from "react-i18next";
export function Home() {
  const bannerImage = useSelector(
    (state: RootState) => state.tenantInfo.bannerImage
  );
  const disabledGuest = useSelector(
    (state: RootState) => state.propertyConfigInfo.showDisabilityOption
  );
  const reduxDispatch: AppDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(getTenantConfig());
  }, []);
  const { t } = useTranslation();
  return (
    <div className="home" style={{ "--banner-image": `url(${bannerImage})` }}>
      <div className="home-wrapper">
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
      </div>
    </div>
  );
}

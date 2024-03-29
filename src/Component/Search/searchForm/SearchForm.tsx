import { useEffect } from "react";
import { Property } from "../property/Property";
import { Rooms } from "../rooms/Rooms";
import { Guests } from "../guests/Guests";
import { useDispatch, useSelector } from "react-redux";
import { getTenantConfig } from "../../../redux/thunk/GetTenantConfig";
import { DateCalender } from "../dateCalendar/DateCalendar";
import { useTranslation } from "react-i18next";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useNavigate } from "react-router-dom";
import "./SearchForm.scss";
export function SearchForm() {
  const navigate = useNavigate();
  const disabledGuest = useSelector(
    (state: RootState) => state.propertyConfigInfo.showDisabilityOption
  );
  const reduxDispatch: AppDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(getTenantConfig());
  }, []);
  const showRoomsSearch = useSelector(
    (state: RootState) => state.propertyConfigInfo.showRoomSearch
  );
  const showGuestSearch = useSelector(
    (state: RootState) => state.propertyConfigInfo.showGuestSearch
  );
  const guests = useSelector(
    (state: RootState) => state.propertyConfigInfo.guests
  );
  const roomCount = useSelector(
    (state: RootState) => state.searchRoomInfo.rooms
  );
  const guestCounts = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestCounts
  );
  function createUrl() {
    const totalGuests = guestCounts.reduce((total, count) => total + count, 0);
    const guestTypeParams = guests
      .map((guest, index) => `${guest.type}=${guestCounts[index]}`)
      .join("&");
    const url = `/rooms?id=18&guestCount=${totalGuests}&roomCount=${roomCount}&startDate=${startDate}&endDate=${endDate}&${guestTypeParams}&bedCount=1`;
    return url;
  }
  function handleSubmitButtonClick() {
    navigate(createUrl());
  }

  const startDate: string = useSelector(
    (state: RootState) => state.searchRoomInfo.startDate
  );
  const endDate: string = useSelector(
    (state: RootState) => state.searchRoomInfo.endDate
  );
  const selectedProperty: string = useSelector(
    (state: RootState) => state.searchRoomInfo.selectedProperty
  );
  const isDisabled =
    startDate === "" || endDate === "" || selectedProperty === "";

  const { t } = useTranslation();
  return (
    <div className="search-form">
      <div className="all-search-fields">
        <Property />
        <div className="search-property-calendar">
          <DateCalender />
        </div>
        <div className="guests-and-rooms">
          <>{showGuestSearch && <Guests />}</>
          <>{showRoomsSearch && <Rooms />}</>
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
        <button onClick={handleSubmitButtonClick} disabled={isDisabled}>
          {t("search.searchButton")}
        </button>
      </div>
    </div>
  );
}

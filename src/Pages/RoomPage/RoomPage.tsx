import { useDispatch, useSelector } from "react-redux";
import "./RoomPage.scss";
import { AppDispatch, RootState } from "../../redux/Store";
import { StepperUI } from "../../Component/RoomSearchPage/ReactStepper/StepperUI";
import Guests from "../../Component/RoomSearchPage/Guests/RoomGuests";
import RoomPageRoom from "../../Component/RoomSearchPage/Rooms/RoomSelectedRoom";
import RoomBeds from "../../Component/RoomSearchPage/RoomBeds/RoomBeds";
import { RoomCalendar } from "../../Component/RoomSearchPage/RoomCalendar/RoomCalendar";
import wheelchair from "../../assets/disabled.png";
import Filters from "../../Component/RoomSearchPage/Filters/Filters";
import { RoomCard } from "../../Component/RoomSearchPage/RoomCard/RoomCard";
import { useEffect, useState } from "react";
import { updateGuestDispInfo } from "../../redux/PropertyConfigSlice";
import PriceFilterSelect from "../../Component/RoomSearchPage/PriceFilterSelect/PriceFilterSelect";
import {
  updateRooms,
  updateStartDate,
  updateEndDate,
  updateBeds,
} from "../../redux/SearchRoomSlice";
import CustomizedSnackbars from "../../Component/snackbar/CustomizedSnackbars";
import { validateDates } from "../../utils/RoomValidations/HandleDateValidations";
import { validateGuestCount } from "../../utils/RoomValidations/HandleGuestCount";
import { validateRooms } from "../../utils/RoomValidations/HandleRoomValidation";
import { assignGuests } from "../../redux/PropertyConfigSlice";
import { validateOthers } from "../../utils/RoomValidations/HandleOtherValidations";
import { getPropertyConfig } from "../../redux/thunk/GetPropertyConfig";
export function RoomPage() {
  const bannerImage = useSelector(
    (state: RootState) => state.tenantInfo.bannerImage
  );
  const guests = useSelector(
    (state: RootState) => state.propertyConfigInfo.guests
  );
  const guestCounts = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestCounts
  );
  const adultIndex = useSelector(
    (state: RootState) => state.propertyConfigInfo.adultIndex
  );
  const maxGuests = useSelector(
    (state: RootState) => state.tenantInfo.maixmumGuests
  );
  const maxDays = useSelector(
    (state: RootState) => state.tenantInfo.maximumDays
  );

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const reduxDispatch: AppDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(updateGuestDispInfo());
  }, [guestCounts]);
  function invalidParam(error: string) {
    console.log(error);
    setMessage(error);
    setShowSnackbar(true);
    // setTimeout(() => {
    //   window.location.href = "/";
    // }, 3000);
  }
  useEffect(() => {
    reduxDispatch(getPropertyConfig());
  }, []);
  useEffect(() => {
    if (guests.length !== 0 && maxDays > 0) {
      const url = window.location.href;
      const params = new URL(url).searchParams;
      const id = params.get("id");
      const guestCount = params.get("guestCount");
      const roomCount = params.get("roomCount");
      const startDate = params.get("startDate");
      const endDate = params.get("endDate");
      const bedCount = params.get("bedCount");

      // Check if any of the required parameters are missing
      if (
        !id ||
        !guestCount ||
        !roomCount ||
        !startDate ||
        !endDate ||
        !bedCount
      ) {
        invalidParam("Please Enter All The Required Parameters");
        return;
      }
      const countOfGuests: number[] = [];
      guests.forEach((guest, index) => {
        const typeInURL = params.get(guest.type);

        if (typeInURL !== null) {
          const count = parseInt(typeInURL);
          if (!isNaN(count)) {
            countOfGuests[index] = count;
          } else {
            invalidParam("Please Enter Proper Count Of Guests");
            return;
          }
        } else {
          invalidParam("This Type Of Guest Is Not Allowed In This Property");
          return;
        }
      });
      const otherRes = validateOthers(id, bedCount);
      if (otherRes !== "") {
        invalidParam(otherRes);
        return;
      }
      const dateRes = validateDates(startDate, endDate, maxDays);
      if (dateRes !== "") {
        invalidParam(dateRes);
        return;
      }
      const guestCountRes = validateGuestCount(
        guestCount,
        roomCount,
        countOfGuests,
        adultIndex,
        maxGuests
      );
      if (guestCountRes !== "") {
        invalidParam(guestCountRes);
        return;
      }
      reduxDispatch(updateBeds(bedCount));
      reduxDispatch(assignGuests(countOfGuests));
      reduxDispatch(updateRooms(parseInt(roomCount)));
      reduxDispatch(updateStartDate(startDate));
      reduxDispatch(updateEndDate(endDate));
    }
  }, [guests, maxDays]);
  function updateSearchParams(){
    
  }
  return (
    <>
      {
        <div className="room-page">
          <div
            className="bg-image"
            style={
              { "--banner-image": `url(${bannerImage})` } as React.CSSProperties
            }
          ></div>
          <StepperUI />
          <div className="select-form">
            <Guests />
            <RoomPageRoom />
            <RoomBeds />
            <RoomCalendar />
            <div className="disabled-person">
              <input className="checkbox-input" type="checkbox" />
              <div className="disabled-image">
                <img src={wheelchair} alt="notfound" />
              </div>
              <div className="text">
                <p>I need an Accessible Room.</p>
              </div>
            </div>
            <div className="search-submit-button">
              <button className="search-submit" onClick={updateSearchParams}>SEARCH DATES</button>
            </div>
          </div>
          <div className="display-content">
            <div className="left-display-content">
              <Filters />
            </div>
            <div className="right-display-content">
              <div className="right-top-heading">
                <div className="top-left-heading">
                  <h3 className="room-results">Room Results</h3>
                </div>
                <div className="top-right-heading">
                  <h3>Showing 1-4 of 5 Results</h3>
                  <div className="border"></div>
                  <PriceFilterSelect />
                </div>
              </div>
              <div className="all-cards-display">
                <RoomCard />
                <RoomCard />
                <RoomCard />
              </div>
            </div>
          </div>
        </div>
      }
      {showSnackbar && (
        <CustomizedSnackbars
          status="error"
          message={message}
          setShowSnackbar={setShowSnackbar}
        />
      )}
    </>
  );
}

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
  updateSelectedProperty,
} from "../../redux/SearchRoomSlice";
import { assignGuests } from "../../redux/PropertyConfigSlice";
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
  const reduxDispatch: AppDispatch = useDispatch();
  useEffect(() => {
    reduxDispatch(updateGuestDispInfo());
  }, [guestCounts]);
  useEffect(() => {
    const url = window.location.href;
    const params = new URL(url).searchParams;
    const id = params.get("id");
    const guestCount = params.get("guestCount");
    const roomCount = params.get("roomCount");
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const countOfGuests: number[] = [];
    guests.forEach((guest, index) => {
      console.log(guest);
      const typeInURL = params.get(guest.type);
      // console.log(typeInURL, "hello");
      if (typeInURL !== null) {
        const count = parseInt(typeInURL);
        console.log(count, "countttt");
        if (!isNaN(count)) {
          countOfGuests[index] = count;
        }
      }
    });
    const bedCount = params.get("bedCount");
    console.log(countOfGuests, "countofguest");
    reduxDispatch(assignGuests(countOfGuests));
    reduxDispatch(updateRooms(parseInt(roomCount)));
    reduxDispatch(updateStartDate(startDate));
    reduxDispatch(updateEndDate(endDate));
  }, []);
  return (
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
          <button className="search-submit">SEARCH DATES</button>
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
            {/* <div className="room-display">
              <RoomCard />
            </div>
            <div className="room-display">
              <RoomCard />
            </div>
            <div className="room-display">
              <RoomCard />
            </div> */}
            <RoomCard />
            <RoomCard />
            <RoomCard />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useSelector } from "react-redux";
import "./RoomPage.scss";
import { RootState } from "../../redux/Store";
import { StepperUI } from "../../Component/RoomSearchPage/ReactStepper/StepperUI";
import Guests from "../../Component/RoomSearchPage/Guests/RoomGuests";
import RoomPageRoom from "../../Component/RoomSearchPage/Rooms/RoomSelectedRoom";
import RoomBeds from "../../Component/RoomSearchPage/RoomBeds/RoomBeds";
import { RoomCalendar } from "../../Component/RoomSearchPage/RoomCalendar/RoomCalendar";
import wheelchair from "../../assets/disabled.png";
import Filters from "../../Component/RoomSearchPage/Filters/Filters";
import { RoomCard } from "../../Component/RoomSearchPage/RoomCard/RoomCard";
import { useState } from "react";
import PriceFilterSelect from "../../Component/RoomSearchPage/PriceFilterSelect/PriceFilterSelect";
export function RoomPage() {
  const bannerImage = useSelector(
    (state: RootState) => state.tenantInfo.bannerImage
  );
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

import { useDispatch, useSelector } from "react-redux";
import {
  toggleBedTypeVisibility,
  toggleRoomTypeVisibility,
  toggleBedType,
  toggleRoomType,
  setBedTypeVisibility,
  setRoomTypeVisibility,
} from "../../../redux/FilterRoomSlice";
import downArrow from "../../../assets/down-arrow.png";
import upArrow from "../../../assets/up-arrow.png";
import "./Filters.scss";
import { roomTypeNames } from "../../../Constants/RoomTypeNames";
import { RootState } from "../../../redux/Store";
import { useState } from "react";

export default function Filters() {
  const dispatch = useDispatch();
  const [toggleFilters, setToggleFilters] = useState(false);
  const bedTypeVisible = useSelector(
    (state: RootState) => state.filterRoom.bedType
  );
  const roomTypeVisible = useSelector(
    (state: RootState) => state.filterRoom.roomType
  );
  const handleToggleBedTypeVisibility = () => {
    dispatch(toggleBedTypeVisibility());
  };

  const handleToggleRoomTypeVisibility = () => {
    dispatch(toggleRoomTypeVisibility());
  };

  const handleToggleBedType = (bedType: string) => {
    dispatch(toggleBedType(bedType));
  };

  const handleToggleRoomType = (roomType: string) => {
    dispatch(toggleRoomType(roomType));
  };
  function handleToggleFilter() {
    if (toggleFilters === true) {
      dispatch(setBedTypeVisibility(false));
      dispatch(setRoomTypeVisibility(false));
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
        <div className="each-filter">
          <div className="filter-name" onClick={handleToggleBedTypeVisibility}>
            <h3 className="filter-content">Bed type</h3>
            <div className="arrow">
              <img
                src={downArrow}
                alt=""
                style={{ display: bedTypeVisible ? "none" : "block" }}
              />
              <img
                src={upArrow}
                alt=""
                style={{ display: bedTypeVisible ? "block" : "none" }}
              />
            </div>
          </div>
          {bedTypeVisible && (
            <div className="filter-type">
              <div className="filter-options">
                <input
                  type="checkbox"
                  onChange={() => handleToggleBedType("Single bed")}
                />
                <p className="filter-text">Single bed</p>
              </div>
              <div className="filter-options">
                <input
                  type="checkbox"
                  onChange={() => handleToggleBedType("Double bed")}
                />
                <p className="filter-text">Double bed</p>
              </div>
            </div>
          )}
        </div>
        <div className="each-filter">
          <div className="filter-name" onClick={handleToggleRoomTypeVisibility}>
            <h3 className="filter-content">Room type</h3>
            <div className="arrow">
              <img
                src={downArrow}
                alt=""
                style={{ display: roomTypeVisible ? "none" : "block" }}
              />
              <img
                src={upArrow}
                alt=""
                style={{ display: roomTypeVisible ? "block" : "none" }}
              />
            </div>
          </div>
          {roomTypeVisible && (
            <div className="filter-type">
              {roomTypeNames.map((roomType, index) => (
                <div
                  className="filter-options"
                  key={index}
                  onClick={() => handleToggleRoomType(roomType)}
                >
                  <input type="checkbox" />
                  <p className="filter-text">{roomType}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {toggleFilters && (
          <>
            <div className="each-filter-copy">
              <div
                className="filter-name"
                onClick={handleToggleBedTypeVisibility}
              >
                <h3 className="filter-content">Bed type</h3>
                <div className="arrow">
                  <img
                    src={downArrow}
                    alt=""
                    style={{ display: bedTypeVisible ? "none" : "block" }}
                  />
                  <img
                    src={upArrow}
                    alt=""
                    style={{ display: bedTypeVisible ? "block" : "none" }}
                  />
                </div>
              </div>
              {bedTypeVisible && (
                <div className="filter-type">
                  <div className="filter-options">
                    <input
                      type="checkbox"
                      onChange={() => handleToggleBedType("Single bed")}
                    />
                    <p className="filter-text">Single bed</p>
                  </div>
                  <div className="filter-options">
                    <input
                      type="checkbox"
                      onChange={() => handleToggleBedType("Double bed")}
                    />
                    <p className="filter-text">Double bed</p>
                  </div>
                </div>
              )}
            </div>
            <div className="each-filter-copy">
              <div
                className="filter-name"
                onClick={handleToggleRoomTypeVisibility}
              >
                <h3 className="filter-content">Room type</h3>
                <div className="arrow">
                  <img
                    src={downArrow}
                    alt=""
                    style={{ display: roomTypeVisible ? "none" : "block" }}
                  />
                  <img
                    src={upArrow}
                    alt=""
                    style={{ display: roomTypeVisible ? "block" : "none" }}
                  />
                </div>
              </div>
              {roomTypeVisible && (
                <div className="filter-type">
                  {roomTypeNames.map((roomType, index) => (
                    <div
                      className="filter-options"
                      key={index}
                      onClick={() => handleToggleRoomType(roomType)}
                    >
                      <input type="checkbox" />
                      <p className="filter-text">{roomType}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

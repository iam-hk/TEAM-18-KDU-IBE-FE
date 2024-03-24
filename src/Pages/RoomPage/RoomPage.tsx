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
import { assignGuests } from "../../redux/PropertyConfigSlice";
import { validateOthers } from "../../utils/RoomValidations/HandleOtherValidations";
import { getPropertyConfig } from "../../redux/thunk/GetPropertyConfig";
import axios from "axios";
import { RoomCardResponse } from "../../types/RoomCardResponse";
import { useNavigate } from "react-router-dom";
import {
  changeSelectedSortingParam,
  setResponseReceived,
} from "../../redux/FilterRoomSlice";
import { changePageNumber } from "../../redux/FilterRoomSlice";
import CircularProgress from "@mui/material/CircularProgress";
import nextIcon from "../../assets/right-arrow-icon.png";
import prevIcon from "../../assets/left-arrow-icon.png";
export function RoomPage() {
  let maxCards = 2;
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
  const startDate = useSelector(
    (state: RootState) => state.searchRoomInfo.startDate
  );
  const endDate = useSelector(
    (state: RootState) => state.searchRoomInfo.endDate
  );
  const bedsSelected = useSelector(
    (state: RootState) => state.searchRoomInfo.beds
  );
  const roomsSelected = useSelector(
    (state: RootState) => state.searchRoomInfo.rooms
  );
  const bedFilters = useSelector(
    (state: RootState) => state.filterRoom.bedTypeOptions
  );
  const roomFilters = useSelector(
    (state: RootState) => state.filterRoom.roomTypeOptions
  );
  const selectedSortingParams = useSelector(
    (state: RootState) => state.filterRoom.selectedSortingParam
  );
  const responseReceived = useSelector(
    (state: RootState) => state.filterRoom.responseReceived
  );
  const pageNumber = useSelector(
    (state: RootState) => state.filterRoom.pageNumber
  );
  const [roomCardResponse, setRoomCardResponse] = useState<RoomCardResponse>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const reduxDispatch: AppDispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    reduxDispatch(updateGuestDispInfo());
  }, [guestCounts]);
  function invalidParam(error: string) {
    console.log(error);
    setMessage(error);
    setShowSnackbar(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }
  const fetchRoomCards = async (roomUrl: string) => {
    try {
      setLoader(true);
      const roomCardsUrl = `http://localhost:8000/api/v1${roomUrl}`;
      console.log(roomCardsUrl, "roomurl");
      const roomCardFromBackend = await axios.get(roomCardsUrl);
      const result = await roomCardFromBackend.data;
      setRoomCardResponse(result);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };
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
      const sortType = params.get("sortType");
      const sortTerm = params.get("sortTerm");
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
      const totalGuests = guestCounts.reduce(
        (total, count) => total + count,
        0
      );
      let redirectUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomCount}&startDate=${startDate}&endDate=${endDate}&bedCount=1`;
      if (sortType !== null && sortTerm !== null) {
        let sortOptn = "Price";
        if (sortType === "false") {
          sortOptn += " High";
        } else {
          sortOptn += " Low";
        }
        reduxDispatch(changeSelectedSortingParam(sortOptn));
        redirectUrl += `&sortType=${sortType}&sortTerm=${sortTerm}`;
      }
      reduxDispatch(updateBeds(parseInt(bedCount)));
      reduxDispatch(assignGuests(countOfGuests));
      reduxDispatch(updateRooms(parseInt(roomCount)));
      reduxDispatch(updateStartDate(startDate));
      reduxDispatch(updateEndDate(endDate));
      reduxDispatch(setResponseReceived(true));
      fetchRoomCards(redirectUrl);
    }
  }, [guests, maxDays]);
  useEffect(() => {
    if (responseReceived) {
      const totalGuests = guestCounts.reduce(
        (total, count) => total + count,
        0
      );
      const guestTypeParams = guests
        .map((guest, index) => `${guest.type}=${guestCounts[index]}`)
        .join("&");
      let activeUrl = "";
      let backendUrl = "";
      const sortType = selectedSortingParams === "Price Low" ? true : false;
      if (selectedSortingParams === "Select") {
        activeUrl = `/rooms?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&${guestTypeParams}&bedCount=${bedsSelected}`;
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&page=${1}`;
      } else {
        activeUrl = `/rooms?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&${guestTypeParams}&bedCount=${bedsSelected}&sortType=${sortType}&sortTerm=price`;
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&sortType=${sortType}&sortTerm=price&page=${1}`;
      }
      reduxDispatch(changePageNumber(1));
      navigate(activeUrl);
      console.log(backendUrl);
      fetchRoomCards(backendUrl);
    }
  }, [bedFilters, roomFilters, selectedSortingParams]);
  function gotoBackPage() {
    if (pageNumber > 1) {
      reduxDispatch(changePageNumber(pageNumber - 1));
      console.log(pageNumber);
      const totalGuests = guestCounts.reduce(
        (total, count) => total + count,
        0
      );
      let backendUrl = "";
      const sortType = selectedSortingParams === "Price Low" ? true : false;
      if (selectedSortingParams === "Select") {
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&page=${
          pageNumber - 1
        }`;
      } else {
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&sortType=${sortType}&sortTerm=price&page=${
          pageNumber - 1
        }`;
      }
      fetchRoomCards(backendUrl);
    }
  }
  function gotoNextPage() {
    console.log("going to next page");
    console.log(roomCardResponse?.totalRoomCards);
    if (maxCards * (pageNumber + 1) <= roomCardResponse!.totalRoomCards) {
      reduxDispatch(changePageNumber(pageNumber + 1));
      console.log(pageNumber, "pgno");
      const totalGuests = guestCounts.reduce(
        (total, count) => total + count,
        0
      );
      let backendUrl = "";
      const sortType = selectedSortingParams === "Price Low" ? true : false;
      if (selectedSortingParams === "Select") {
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&page=${
          pageNumber + 1
        }`;
      } else {
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&sortType=${sortType}&sortTerm=price&page=${
          pageNumber + 1
        }`;
      }
      fetchRoomCards(backendUrl);
    } else {
      console.log("errorrrr");
    }
  }
  function updateSearchParams() {
    const totalGuests = guestCounts.reduce((total, count) => total + count, 0);
    const guestTypeParams = guests
      .map((guest, index) => `${guest.type}=${guestCounts[index]}`)
      .join("&");
    const activeUrl = `/rooms?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&${guestTypeParams}&bedCount=${bedsSelected}`;
    const backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}`;
    navigate(activeUrl);
    fetchRoomCards(backendUrl);
  }
  return (
    <>
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
            <button className="search-submit" onClick={updateSearchParams}>
              SEARCH DATES
            </button>
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
                <button className="back-page" onClick={gotoBackPage}>
                  <img src={prevIcon} alt="" />
                </button>
                <h3>
                  Showing {maxCards * pageNumber} out of{" "}
                  {roomCardResponse?.totalRoomCards}
                  {" Rooms"}
                </h3>
                <button className="next-page" onClick={gotoNextPage}>
                  <img src={nextIcon} alt="" />
                </button>
                <div className="border"></div>
                <PriceFilterSelect />
              </div>
            </div>
            {loader ? (
              <div className="wrapper">
                <div className="loader-container">
                  <CircularProgress size={100} />
                </div>
              </div>
            ) : (
              <div className="all-cards-display">
                {roomCardResponse?.roomCards.map((room) => {
                  return (
                    <RoomCard
                      key={room.roomTypeId}
                      property={roomCardResponse.propertyInformation}
                      currentRoom={room}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
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

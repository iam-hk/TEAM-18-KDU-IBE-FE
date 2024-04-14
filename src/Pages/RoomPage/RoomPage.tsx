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
  toggleIsMilitaryVetran,
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
  changeSortingTechnique,
  setResponseReceived,
  changePageNumber,
} from "../../redux/FilterRoomSlice";
import nextIcon from "../../assets/right-arrow-icon.png";
import prevIcon from "../../assets/left-arrow-icon.png";
import { addFilters } from "../../redux/FilterSlice";
import { useTranslation } from "react-i18next";
import { Itinerary } from "../../Component/RoomSearchPage/Itinerary/Itinerary";
import { setRoomCards } from "../../redux/FilterRoomSlice";
import { GlobalPromotions } from "../../types/PromotionList";
import fighterJet from "../../assets/fighter-jet.png";
import SkeletonRoomCard from "../../Component/RoomSearchPage/SkeletonRoomCard/SkeletonRoomCard";
import RoomTourModal from "../../Component/Modals/RoomTourModal/RoomTourModal";
import { Carousel } from "react-responsive-carousel";
export function RoomPage() {
  const { t } = useTranslation();
  const itineraryPropertyName = useSelector(
    (state: RootState) => state.itineraryInfo.roomName
  );
  const maxCards = useSelector(
    (state: RootState) => state.propertyConfigInfo.maxCards
  );
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
  const selectedSortingParams = useSelector(
    (state: RootState) => state.filterRoom.selectedSortingParam
  );
  const responseReceived = useSelector(
    (state: RootState) => state.filterRoom.responseReceived
  );
  const pageNumber = useSelector(
    (state: RootState) => state.filterRoom.pageNumber
  );
  const sortingOptions = useSelector(
    (state: RootState) => state.propertyConfigInfo.sorting
  );
  const sortingTechnique = useSelector(
    (state: RootState) => state.filterRoom.selectedSortingOrder
  );

  const appliedFilters = useSelector(
    (state: RootState) => state.filterInfo.appliedFilters
  );
  const militaryVeteran = useSelector(
    (state: RootState) => state.searchRoomInfo.isMilitaryVetran
  );
  const [globalApplicablePromotions, setGlobalApplicablePromotions] =
    useState<GlobalPromotions>({
      highestPromotion: {
        priceFactor: 100,
        minimumDaysOfStay: 100,
        promotionDescription: "",
        promotionTitle: "",
        promotionId: 1,
      },
      allApplicablePromotions: [],
    });
  const [roomCardResponse, setRoomCardResponse] = useState<RoomCardResponse>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const reduxDispatch: AppDispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [open,setOpen] = useState<boolean>(false);
  function onClose(){
    setOpen(!open);
  }
  let start = (pageNumber - 1) * maxCards + 1;
  let end = Math.min(pageNumber * maxCards, roomCardResponse?.totalRoomCards);
  if (Number.isNaN(end)) {
    start = 0;
    end = 0;
  }
  if (roomCardResponse?.totalRoomCards === 0) {
    start = 0;
  }
  const militaryServiceVetran = useSelector(
    (state: RootState) => state.searchRoomInfo.isMilitaryVetran
  );
  useEffect(() => {
    reduxDispatch(updateGuestDispInfo());
  }, [guestCounts]);
  function invalidParam(error: string) {
    setMessage(error);
    setShowSnackbar(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 3000);
  }
  const checkSeniorCitizenGuest = (): boolean => {
    const seniorCitizenIndex = guests.findIndex(
      (guest) => guest.type === "Senior Citizen"
    );
    if (seniorCitizenIndex !== -1) {
      return guestCounts[seniorCitizenIndex] > 0;
    } else {
      return false;
    }
  };
  function formPromotionsUrl() {
    const seniorCitizen = checkSeniorCitizenGuest();
    let url = import.meta.env.VITE_REACT_APP_GLOBAL_PROMOTION;
    if (!startDate && !endDate) {
      const getUrl = window.location.href;
      const params = new URL(getUrl).searchParams;
      const sDate = params.get("startDate");
      const eDate = params.get("endDate");
      url += `startDate=${sDate}&endDate=${eDate}`;
    } else {
      url += `startDate=${startDate}&endDate=${endDate}`;
    }
    if (seniorCitizen) {
      url += "&elderGuest=true";
    }
    if (militaryVeteran) {
      url += "&militaryGuest=true";
    }
    return url;
  }
  const fetchRoomCards = async (roomUrl: string) => {
    try {
      setLoader(true);
      const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
      const roomCardsUrl = `${backendUrl}${roomUrl}`;
      const roomCardFromBackend = await axios.get(roomCardsUrl);
      const result = await roomCardFromBackend.data;
      const promoUrl = formPromotionsUrl();
      const getAllPromotions = await axios.get(
        promoUrl
      );
      const data_promotions = await getAllPromotions.data;
      setGlobalApplicablePromotions(data_promotions);
      setRoomCardResponse(result);
      reduxDispatch(setRoomCards(result));
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reduxDispatch(getPropertyConfig());
  }, []);

  const previousSearch = window.localStorage.getItem("prevSearch");

  if (window.location.search === "") {
    if (previousSearch === null) {
      window.location.href = "/";
    } else {
      window.location.search = previousSearch;
    }
  }
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
      const filterContent = params.get("filterContent")?.split(",");
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
        const technique = sortType == "true" ? true : false;
        reduxDispatch(changeSelectedSortingParam(sortTerm));
        reduxDispatch(changeSortingTechnique(technique));
        redirectUrl += `&sortType=${sortType}&sortTerm=${sortTerm}`;
      }
      if (filterContent != null && filterContent.length > 0) {
        redirectUrl += `&filterContent=`;
        filterContent.forEach((filterWord, index) => {
          reduxDispatch(addFilters(filterWord));
          if (index != filterContent.length - 1)
            redirectUrl += `${filterWord},`;
          else redirectUrl += `${filterWord}`;
        });
      }
      window.localStorage.setItem("prevSearch", `?${url.split("?")[1]}`);
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

      if (selectedSortingParams === "Select") {
        activeUrl = `/rooms?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&${guestTypeParams}&bedCount=${bedsSelected}`;
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&page=${1}`;
      } else {
        activeUrl = `/rooms?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&${guestTypeParams}&bedCount=${bedsSelected}&sortType=${sortingTechnique}&sortTerm=${selectedSortingParams}`;
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&sortType=${sortingTechnique}&sortTerm=${selectedSortingParams}&page=${1}`;
      }
      if (appliedFilters.length != 0) {
        activeUrl += `&filterContent=`;
        backendUrl += `&filterContent=`;
        appliedFilters.forEach((filterWord, index) => {
          if (index != appliedFilters.length - 1) {
            activeUrl += `${filterWord},`;
            backendUrl += `${filterWord},`;
          } else {
            activeUrl += `${filterWord}`;
            backendUrl += `${filterWord}`;
          }
        });
      }

      reduxDispatch(changePageNumber(1));
      window.localStorage.setItem("prevSearch", `?${activeUrl.split("?")[1]}`);
      navigate(activeUrl);
      fetchRoomCards(backendUrl);
    }
  }, [selectedSortingParams, sortingTechnique, appliedFilters]);
  function gotoBackPage() {
    if (pageNumber > 1) {
      reduxDispatch(changePageNumber(pageNumber - 1));
      const totalGuests = guestCounts.reduce(
        (total, count) => total + count,
        0
      );
      let backendUrl = "";
      if (selectedSortingParams === "Select") {
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&page=${
          pageNumber - 1
        }`;
      } else {
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&sortType=${sortingTechnique}&sortTerm=${selectedSortingParams}&page=${
          pageNumber - 1
        }`;
      }
      fetchRoomCards(backendUrl);
    }
  }
  function gotoNextPage() {
    if (maxCards * pageNumber <= roomCardResponse!.totalRoomCards) {
      reduxDispatch(changePageNumber(pageNumber + 1));
      const totalGuests = guestCounts.reduce(
        (total, count) => total + count,
        0
      );
      let backendUrl = "";

      if (selectedSortingParams === "Select") {
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}`;
      } else {
        backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}&sortType=${sortingTechnique}&sortTerm=${selectedSortingParams}`;
      }

      if (appliedFilters.length != 0) {
        backendUrl += `&filterContent=`;
        backendUrl += appliedFilters.join(",");
      }
      backendUrl += `&page=${pageNumber + 1}`;

      fetchRoomCards(backendUrl);
    }
  }
  function toggleMilitaryServiceVetran() {
    reduxDispatch(toggleIsMilitaryVetran());
  }
  function updateSearchParams() {
    const totalGuests = guestCounts.reduce((total, count) => total + count, 0);
    const guestTypeParams = guests
      .map((guest, index) => `${guest.type}=${guestCounts[index]}`)
      .join("&");
    const activeUrl = `/rooms?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&${guestTypeParams}&bedCount=${bedsSelected}`;
    window.localStorage.setItem("prevSearch", `?${activeUrl.split("?")[1]}`);
    const backendUrl = `/roomtype?id=18&guestCount=${totalGuests}&roomCount=${roomsSelected}&startDate=${startDate}&endDate=${endDate}&bedCount=${bedsSelected}`;
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
        <StepperUI onStepClick={undefined} />
        <div className="select-form">
          <Guests />
          <RoomPageRoom />
          <RoomBeds />
          <RoomCalendar />
          <div className="checkbox-wrapper">
            <div className="disabled-person">
              <label className="wrapper-label">
                <input className="checkbox-input" type="checkbox" />
                <div className="disabled-image">
                  <img src={wheelchair} alt="notfound" />
                </div>
              </label>

              <div className="text">
                <p>I need an Accessible Room.</p>
              </div>
            </div>
            <div className="military-veteran">
              <label className="wrapper-label">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={militaryServiceVetran}
                  onChange={toggleMilitaryServiceVetran}
                />
                <div className="military-image">
                  <img src={fighterJet} alt="" />
                </div>
              </label>
              <div className="text">
                <p>Military Service Veteran?</p>
              </div>
            </div>
          </div>
          <div className="search-submit-button">
            <button
              className="search-submit"
              onClick={() => {
                updateSearchParams();
              }}
            >
              {t("searchDates")}
            </button>
          </div>
        </div>
        <div className="display-content">
          <div className="left-display-content">
            <Filters />
            {/* <div className="carousal-room-tour" style={{width:"100%"}}>
              <Carousel autoPlay infiniteLoop interval={3000}>
                <div className="tour-modal-image" onClick={onClose}>
                <img className="room-tour-image"src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                <div className="legend">Property 18 Tour</div>
                <RoomTourModal open={open} onClose={onClose} srcImg="https://my.matterport.com/show/?m=NUJz97HJ5w9&play=1"/>
                </div>
                <div className="tour-modal-image" onClick={onClose}>
                  <img src="https://images.unsplash.com/photo-1612637968894-660373e23b03?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="room-tour-image"/>
                  <div className="legend">Premium Tour</div>
                  <RoomTourModal open={open} onClose={onClose} srcImg="https://my.matterport.com/show/?m=NUJz97HJ5w9&play=1"/>
                </div>
              </Carousel>
            
            </div> */}
          </div>
          <div className="right-display-content">
            {itineraryPropertyName && (
              <div className="itinerary-copy">
                <Itinerary />
              </div>
            )}
            {loader ? (
              <div style={{display:'flex',flexWrap:'wrap'}}>
                <SkeletonRoomCard />
                <SkeletonRoomCard />
                <SkeletonRoomCard />
                <SkeletonRoomCard />
              </div>
            ) : (
              <>
                <div className="right-top-heading">
                  <div className="top-left-heading">
                    <h3 className="room-results">{t("roomResults")}</h3>
                  </div>
                  <div className="top-right-heading">
                    <div className="page-info">
                      <button className="back-page" onClick={gotoBackPage}>
                        <img src={prevIcon} alt="" />
                      </button>
                      <h3>
                        {t("showing")} {start}-{end} of{" "}
                        {isNaN(roomCardResponse?.totalRoomCards)
                          ? 0
                          : roomCardResponse?.totalRoomCards}{" "}
                        {t("results")}
                      </h3>
                      <button className="next-page" onClick={gotoNextPage}>
                        <img src={nextIcon} alt="" />
                      </button>
                    </div>
                    <div className="border"></div>
                    <PriceFilterSelect sorts={sortingOptions} />
                  </div>
                </div>
                <div className="itinerary-display-content">
                  <div className="all-cards-display">
                    {roomCardResponse?.roomCards.length === 0 ? (
                      <h3>No results found</h3>
                    ) : (
                      roomCardResponse?.roomCards.map((room) => (
                        <RoomCard
                          key={room.roomTypeId}
                          property={roomCardResponse.propertyInformation}
                          currentRoom={room}
                          globalPromotion={globalApplicablePromotions}
                        />
                      ))
                    )}
                  </div>
                  {itineraryPropertyName && (
                    <div className="itinerary-content">
                      <Itinerary />
                    </div>
                  )}
                </div>
              </>
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

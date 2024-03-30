import { Carousel } from "react-responsive-carousel";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./RoomModal.scss";
import { increaseStepperState } from "../../../redux/StepperSlice";
import { AppDispatch, RootState } from "../../../redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IItinerary } from "../../../redux/ItinerarySlice";
import { setItineraryDetails } from "../../../redux/ItinerarySlice";
import { RoomCardProp } from "../../RoomSearchPage/RoomCard/RoomCard";
import userIcon from "../../../assets/u_user.png";
import {
  GlobalPromotions,
  Promotion,
  SuccessfulCustomPromo,
} from "../../../types/PromotionList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import tick from "../../../assets/Icontick.png";
import doubleBed from "../../../assets/u_bed-double.png";
import { CurrencyExchangeRates } from "../../../types/CurrencyExchange";
import { CurrencySymbols } from "../../../Constants/CurrencySymbols";
interface IRoomModal {
  open: boolean;
  updateOpen: (data: boolean) => void;
  room: RoomCardProp;
  globalPromotions: GlobalPromotions;
}
export default function RoomModal(props: IRoomModal) {
  const reduxDispatch: AppDispatch = useDispatch();
  const [promoCode, setPromoCode] = useState("");
  const stepperState = useSelector(
    (state: RootState) => state.stepper.currentState
  );
  const roomCardResponse = useSelector(
    (state: RootState) => state.filterRoom.roomCardIndividual
  );
  const startDate = useSelector(
    (state: RootState) => state.searchRoomInfo.startDate
  );
  const endDate = useSelector(
    (state: RootState) => state.searchRoomInfo.endDate
  );
  const selectedRooms = useSelector(
    (state: RootState) => state.searchRoomInfo.rooms
  );
  const guestCount = useSelector(
    (state: RootState) => state.propertyConfigInfo.guestCounts
  );
  const [promotionsAvailable, setpromotionsAvailable] = useState<Promotion[]>(
    []
  );
  const { t } = useTranslation();
  const currentSelectedCurrency = useSelector(
    (state: RootState) => state.currencyRate.currentSelectedCurrency
  ) as keyof CurrencyExchangeRates;

  const currentPrice = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
  );
  function updatePrice(price: number) {
    return (price * currentPrice[currentSelectedCurrency]).toFixed(1);
  }
  useEffect(() => {
    setpromotionsAvailable(props.globalPromotions.allApplicablePromotions);
  }, []);
  function changeStepperState() {
    reduxDispatch(increaseStepperState(stepperState + 1));
  }
  function updateItinerary(index: number) {
    const promo = {
      promoCode: "",
      priceFactor: props.globalPromotions.allApplicablePromotions[index].priceFactor,
      promotionDescription: props.globalPromotions.allApplicablePromotions[index].promotionDescription,
      promotionTitle: props.globalPromotions.allApplicablePromotions[index].promotionTitle,
    };
    console.log(props.globalPromotions.allApplicablePromotions[index]);
    const itinerary: IItinerary = {
      roomName: props.room.currentRoom.roomTypeName,
      priceOfRoomTypeInParticularDate:
        props.room.currentRoom.priceOfRoomTypeInParticularDate,
      promoCodeInfo:promo,
      roomCount: selectedRooms,
      startDate: startDate,
      endDate: endDate,
      guestCount: guestCount,
    };
    reduxDispatch(setItineraryDetails(itinerary));
  }

  async function checkCustomPromoCode() {
    const customPromoCodeUrl = `http://localhost:8000/api/v1/promocode?promotionCode=${promoCode}&roomTypeId=${props.room.currentRoom.roomTypeId}`;
    try {
      const customPromotionCard = await axios.get(customPromoCodeUrl);
      console.log(customPromotionCard.data);
      const succesfulCustomPromo: SuccessfulCustomPromo =
        customPromotionCard.data;
      const customPromo: Promotion = {
        minimumDaysOfStay: 1,
        priceFactor: succesfulCustomPromo.priceFactor,
        promotionDescription: succesfulCustomPromo.promotionDescription,
        promotionTitle: succesfulCustomPromo.promotionName,
        promotionId: promotionsAvailable.length + 1,
      };
      setpromotionsAvailable((previousPromotions: Promotion[]) => [
        ...previousPromotions,
        customPromo,
      ]);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  const navigate = useNavigate();
  return (
    <div className="modal-Container_custom" style={{ width: "80vw" }}>
      <Modal
        open={props.open}
        classNames={{ modal: "custom_modal" }}
        onClose={() => props.updateOpen(false)}
      >
        <div className="nameOfTheRoomType">
          {t(`${props.room.currentRoom.roomTypeName}`)}
        </div>
        <div className="individualRoomTypeModal">
          <div className="imagesOfRoomModalContainer">
            <Carousel autoPlay infiniteLoop>
              {props.room.currentRoom.arrayOfImages.map(
                (particularImage, index) => (
                  <div key={index}>
                    <img
                      className="imageOfRoomTypeModal"
                      src={particularImage}
                      alt="room Type photo"
                    />
                  </div>
                )
              )}
            </Carousel>
          </div>
          <div className="roomModalInforamtionContainer">
            <div className="roomModalInforamtion-leftContainer">
              <div className="left_roomtype_in_details">
                <div className="roomTypeDetailsContainer">
                  <div className="area_maximumGuests_Beds-Container">
                    <div className="maximumGuest_inRoomType">
                      <img
                        className="user-icon"
                        src={userIcon}
                        alt="notfound"
                      />
                      1-{props.room.currentRoom.maxCapacity}
                    </div>
                    <div className="beds_in_roomType">
                      <img
                        src={doubleBed}
                        className="double-bed-img"
                        alt="notfound"
                      />
                      <span className="bed_content">
                        {props.room.currentRoom.singleBed !== 0
                          ? `King - ${props.room.currentRoom.singleBed} `
                          : ""}
                        {props.room.currentRoom.doubleBed !== 0
                          ? `Queen - ${props.room.currentRoom.doubleBed}`
                          : ""}
                      </span>
                    </div>
                    <div className="area_of_room_type">
                      {props.room.currentRoom.areaInSquareFeet} ft
                    </div>
                  </div>
                  <div className="descriptionOfRoomType">
                    {props.room.currentRoom.description}
                  </div>
                </div>
                <div className="roomModalInforamtion-rightContainer">
                  <div className="amenitiesTitleContainer">Amenitities</div>
                  <div className="amenitiesListContainer">
                    {props.room.currentRoom.amenitiesOfRoom.map(
                      (currentAmenity, index) => {
                        return (
                          <div className="individual_amenity" key={index}>
                            <img
                              className="tick-icon"
                              src={tick}
                              alt="not found"
                            />
                            <span>{currentAmenity}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="standard-Container">
                <div className="standardRate-title">Standard Rate</div>
                <div className="individualDeal_rateContainer">
                  <div className="left-container_rateBox">
                    <div className="individual_promotion_title">
                      Lorem ipsum dolor sit amet.
                    </div>
                    <div className="individual_promotion_description">
                      Spend $10 every night you stay and earm $150 in dining
                      credit at the resort.
                    </div>
                  </div>
                  <div className="right-container_rateBox">
                    <div className="rate_price_of_promotion">
                      {(CurrencySymbols as any)[currentSelectedCurrency]}
                      {updatePrice(props.room.currentRoom.price)}
                    </div>
                    <div className="perNightContainer">per Night</div>
                    <button
                      className="selectPackageButton"
                      onClick={() => {
                        changeStepperState();
                        updateItinerary();
                        navigate("/checkout");
                      }}
                    >
                      SELECT PACKAGE
                    </button>
                  </div>
                </div>
              </div>
              <div className="dealsAndPackagesContainer">
                <div className="titleOfDealsContainer">Deals and Packages</div>
                {promotionsAvailable.map((individualPromotion, index) => {
                  return (
                    <div className="individualDeal_rateContainer" key={index}>
                      <div className="left-container_rateBox">
                        <div className="individual_promotion_title">
                          {individualPromotion.promotionTitle}
                        </div>
                        <div className="individual_promotion_description">
                          {individualPromotion.promotionDescription}
                        </div>
                      </div>
                      <div className="right-container_rateBox">
                        <div className="rate_price_of_promotion">
                          {(CurrencySymbols as any)[currentSelectedCurrency]}
                          {updatePrice(
                            individualPromotion.priceFactor *
                              props.room.currentRoom.price
                          )}
                        </div>
                        <div className="perNightContainer">per Night</div>
                        <button
                          className="selectPackageButton"
                          onClick={() => {
                            changeStepperState();
                            updateItinerary(index);
                            navigate("/checkout");
                          }}
                        >
                          SELECT PACKAGE
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="applyPromoCodeContainer">
                <div className="promoCode_title">Enter a promo code</div>
                <div className="promocode-wrapper">
                  <input
                    className="promo_code_enter_box"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  ></input>
                  <button
                    className="apply_promoCode_button"
                    onClick={checkCustomPromoCode}
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import { Carousel } from "react-responsive-carousel";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./RoomModal.scss";
import { setStepperState } from "../../../redux/StepperSlice";
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
  const guestTypes = useSelector(
    (state: RootState) => state.propertyConfigInfo.guests
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
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    setpromotionsAvailable(props.globalPromotions.allApplicablePromotions);
  }, []);
  function changeStepperState() {
    reduxDispatch(setStepperState(2));
  }
  function updateItinerary(index: number) {
    if (index == -1) {
      const promo = {
        promoCode: "",
        priceFactor: 0.85,
        promotionDescription:
          "Spend $10 every night you stay and earm $150 in dining credit at the resort.",
        promotionTitle: "Exclusive Retreat",
        promotionId: 0,
      };

      const priceDetails = {
        nightlyRate: props.room.currentRoom.price,
        subtotal: 0,
        taxes: 0,
        vat: 0,
        totalPayment: 0,
        promoDiscount: 0,
        dueNow: 0,
        dueAtResort: 0,
      };

      const itinerary: IItinerary = {
        roomName: props.room.currentRoom.roomTypeName,
        priceOfRoomTypeInParticularDate:
          props.room.currentRoom.priceOfRoomTypeInParticularDate,
        promoCodeInfo: promo,
        roomCount: selectedRooms,
        startDate: startDate,
        endDate: endDate,
        guestCount: guestCount,
        roomTypeId: props.room.currentRoom.roomTypeId,
        priceDetails: priceDetails,
      };
      reduxDispatch(setItineraryDetails(itinerary));
    } else {
      const promo = {
        promoCode: "",
        priceFactor: promotionsAvailable[index].priceFactor,
        promotionDescription: promotionsAvailable[index].promotionDescription,
        promotionTitle: promotionsAvailable[index].promotionTitle,
        promotionId: promotionsAvailable[index].promotionId,
      };
      const priceDetails = {
        nightlyRate: props.room.currentRoom.price,
        subtotal: 0,
        taxes: 0,
        vat: 0,
        totalPayment: 0,
        promoDiscount: 0,
        dueNow: 0,
        dueAtResort: 0,
      };
      const itinerary: IItinerary = {
        roomName: props.room.currentRoom.roomTypeName,
        priceOfRoomTypeInParticularDate:
          props.room.currentRoom.priceOfRoomTypeInParticularDate,
        promoCodeInfo: promo,
        roomCount: selectedRooms,
        startDate: startDate,
        endDate: endDate,
        guestCount: guestCount,
        roomTypeId: props.room.currentRoom.roomTypeId,
        priceDetails: priceDetails,
        imageUrl:props.room.currentRoom.arrayOfImages[0]
      };
      reduxDispatch(setItineraryDetails(itinerary));
    }
  }
  async function checkCustomPromoCode() {
    let customPromoCodeUrl = import.meta.env.VITE_REACT_APP_CUSTOM_PROMOTION;
    customPromoCodeUrl += `${promoCode}&roomTypeId=${props.room.currentRoom.roomTypeId}`;
    setPromoCode("");
    try {
      const customPromotionCard = await axios.get(customPromoCodeUrl);
      const succesfulCustomPromo: SuccessfulCustomPromo =
        customPromotionCard.data;
      const customPromo: Promotion = {
        minimumDaysOfStay: 1,
        priceFactor: succesfulCustomPromo.priceFactor,
        promotionDescription: succesfulCustomPromo.promotionDescription,
        promotionTitle: succesfulCustomPromo.promotionName,
        promotionId:1099,
      };
      setpromotionsAvailable((previousPromotions: Promotion[]) => [
        customPromo,
        ...previousPromotions,
      ]);
    } catch (error) {
      showMessageForDuration(error.response.data.message, 3000);
    }
  }
  const showMessageForDuration = (message: string, duration: number) => {
    setMessage(message);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, duration);
  };
  const navigate = useNavigate();
  return (
    <div className="modal-Container_custom" style={{ width: "80vw" }}>
      <Modal
        open={props.open}
        classNames={{ modal: "custom_modal" }}
        onClose={() => props.updateOpen(false)}
      >
        <div className="nameOfTheRoomType">
          {t(`${props.room.currentRoom.roomTypeName}.name`)}
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
                          ? `${t("king")} - ${
                              props.room.currentRoom.singleBed
                            } `
                          : ""}
                        {props.room.currentRoom.doubleBed !== 0
                          ? `${t("queen")} - ${
                              props.room.currentRoom.doubleBed
                            }`
                          : ""}
                      </span>
                    </div>
                    <div className="area_of_room_type">
                      {props.room.currentRoom.areaInSquareFeet} ft
                    </div>
                  </div>
                  <div className="descriptionOfRoomType">
                    {t(`${props.room.currentRoom.roomTypeName}.description`)}
                  </div>
                </div>
                <div className="roomModalInforamtion-rightContainer">
                  <div className="amenitiesTitleContainer">
                    {t(
                      `${props.room.currentRoom.roomTypeName}.amenities.amenitiesHeading`
                    )}
                  </div>
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
                            <span>
                              {t(
                                `${props.room.currentRoom.roomTypeName}.amenities.${currentAmenity}`
                              )}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="standard-Container">
                <div className="standardRate-title">{t("standardRate")}</div>
                <div className="individualDeal_rateContainer">
                  <div className="left-container_rateBox">
                    <div className="individual_promotion_title">
                      {t("Exclusive Retreat.title")}
                    </div>
                    <div className="individual_promotion_description">
                      {t("Exclusive Retreat.description")}
                    </div>
                  </div>
                  <div className="right-container_rateBox">
                    <div className="rate_price_of_promotion">
                      {(CurrencySymbols as any)[currentSelectedCurrency]}
                      {updatePrice(props.room.currentRoom.price)}
                    </div>
                    <div className="perNightContainer">{t("perNight")}</div>
                    <button
                      className="selectPackageButton"
                      onClick={() => {
                        changeStepperState();
                        updateItinerary(-1);
                        navigate("/checkout");
                      }}
                    >
                      {t("selectPackage")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="dealsAndPackagesContainer">
                <div className="titleOfDealsContainer">
                  {t("dealsNPackages")}
                </div>
                {promotionsAvailable.map((individualPromotion, index) => {
                  return (
                    <div className="individualDeal_rateContainer" key={index}>
                      <div className="left-container_rateBox">
                        <div className="individual_promotion_title">
                          {t(`${individualPromotion.promotionTitle}.title`)}
                        </div>
                        <div className="individual_promotion_description">
                          {t(
                            `${individualPromotion.promotionTitle}.description`
                          )}
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
                        <div className="perNightContainer">{t("perNight")}</div>
                        <button
                          className="selectPackageButton"
                          onClick={() => {
                            changeStepperState();
                            updateItinerary(index);
                            navigate("/checkout");
                          }}
                        >
                          {t("selectPackage")}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="applyPromoCodeContainer">
                <div className="promoCode_title">{t("promoHeading")}</div>
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
                    disabled={promoCode === ""}
                    style={{ opacity: promoCode === "" ? 0.5 : 1 }} 
                  >
                    {t("apply")}
                  </button>
                </div>
                {showMessage && <h2 className="show-message">{message}</h2>}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import "./RoomCard.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  PropertyInformation,
  RoomCardIndividual,
} from "../../../types/RoomCardResponse";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/Store";
import { CurrencyExchangeRates } from "../../../types/CurrencyExchange";
import { CurrencySymbols } from "../../../Constants/CurrencySymbols";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import RoomModal from "../../Modals/RoomModal/RoomModal";
import {
  setStepperState,
  increaseStepperState,
} from "../../../redux/StepperSlice";
import { GlobalPromotions } from "../../../types/PromotionList";
export interface RoomCardProp {
  property: PropertyInformation;
  currentRoom: RoomCardIndividual;
  globalPromotion: GlobalPromotions;
}
export function RoomCard(props: RoomCardProp) {
  const [open, setOpen] = useState(false);
  const selectedPropertyName = useSelector(
    (state: RootState) => state.itineraryInfo.roomName
  );
  useEffect(() => {
    if (open == false) {
      if (selectedPropertyName) {
        reduxDispatch(setStepperState(1));
      } else {
        reduxDispatch(setStepperState(0));
      }
    }
  }, [open]);
  function updateOpen(data: boolean) {
    setOpen(data);
  }
  const { t } = useTranslation();
  const currentSelectedCurrency = useSelector(
    (state: RootState) => state.currencyRate.currentSelectedCurrency
  ) as keyof CurrencyExchangeRates;

  const currentPrice = useSelector(
    (state: RootState) => state.currencyRate.currentPrice
  );

  function updatePrice(price: number) {
    return price * currentPrice[currentSelectedCurrency].toFixed(1);
  }
  const reduxDispatch: AppDispatch = useDispatch();
  const stepperState = useSelector(
    (state: RootState) => state.stepper.currentState
  );
  function changeStepperState() {
    reduxDispatch(increaseStepperState(stepperState + 1));
  }
  return (
    <div className="room-display">
      <div className="individual-roomCard">
        <div className="imageOfRoomTypeContainer">
          <Carousel autoPlay infiniteLoop>
            {props.currentRoom.arrayOfImages.map((imageUrl) => {
              return (
                <div key={imageUrl}>
                  <img
                    className="imageOfRoomType"
                    src={imageUrl}
                    alt="room photo"
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className="informationOfRoomType">
          <div className="propertyAndReviewContainer">
            <div className="propertyNameContainer">
              {t(`${props.currentRoom.roomTypeName}.name`)}
            </div>
            <div className="reviewAndRatingContainer">
              {props.currentRoom.newProperty ? (
                <div className="newProperty">{t("newProperty")}</div>
              ) : (
                <>
                  <div className="ratingContainer">
                    <i className="fi fi-sr-star"></i>
                    {props.currentRoom.rating}
                  </div>
                  <div className="reviewCountContainer">
                    {props.currentRoom.reviewCount} reviews
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="otherDetailsOfRoomType">
            <div className="locationContainer">
              <span>
                <svg
                  className="locationIcon"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0001 2.98693C10.9392 1.92607 9.50041 1.33008 8.00012 1.33008C6.49982 1.33008 5.06098 1.92607 4.00012 2.98693C2.93925 4.0478 2.34326 5.48664 2.34326 6.98693C2.34326 8.48722 2.93925 9.92607 4.00012 10.9869L7.51345 14.5069C7.57542 14.5694 7.64916 14.619 7.7304 14.6529C7.81164 14.6867 7.89877 14.7041 7.98678 14.7041C8.07479 14.7041 8.16193 14.6867 8.24317 14.6529C8.32441 14.619 8.39814 14.5694 8.46011 14.5069L12.0001 10.9536C13.0565 9.89715 13.65 8.4643 13.65 6.97027C13.65 5.47623 13.0565 4.04338 12.0001 2.98693ZM11.0468 10.0003L8.00012 13.0603L4.95345 10.0003C4.35155 9.39781 3.94177 8.63043 3.77591 7.79513C3.61006 6.95982 3.69557 6.0941 4.02165 5.30739C4.34773 4.52068 4.89973 3.8483 5.60787 3.37525C6.31601 2.9022 7.14851 2.64972 8.00012 2.64972C8.85173 2.64972 9.68422 2.9022 10.3924 3.37525C11.1005 3.8483 11.6525 4.52068 11.9786 5.30739C12.3047 6.0941 12.3902 6.95982 12.2243 7.79513C12.0585 8.63043 11.6487 9.39781 11.0468 10.0003ZM6.00012 4.94027C5.46193 5.48011 5.15971 6.21131 5.15971 6.9736C5.15971 7.73589 5.46193 8.46708 6.00012 9.00693C6.39996 9.40746 6.90917 9.68099 7.46388 9.7932C8.01859 9.90542 8.59408 9.85132 9.11816 9.6377C9.64224 9.42408 10.0916 9.06045 10.4098 8.59243C10.728 8.12441 10.9009 7.57285 10.9068 7.00693C10.9098 6.62907 10.837 6.25444 10.6927 5.90519C10.5484 5.55594 10.3356 5.23917 10.0668 4.9736C9.80256 4.70332 9.4875 4.48796 9.13973 4.33991C8.79196 4.19186 8.41834 4.11405 8.04038 4.11095C7.66242 4.10785 7.28758 4.17953 6.93743 4.32186C6.58728 4.46419 6.26873 4.67435 6.00012 4.94027ZM9.12678 8.06027C8.87414 8.31676 8.54026 8.47754 8.1822 8.5151C7.82414 8.55267 7.46416 8.46469 7.16379 8.26622C6.86342 8.06774 6.64131 7.77109 6.53545 7.42699C6.42959 7.08288 6.44655 6.71269 6.58342 6.3797C6.72029 6.04671 6.96858 5.77161 7.28584 5.60142C7.6031 5.43124 7.96962 5.37654 8.32274 5.44668C8.67586 5.51682 8.99366 5.70744 9.22179 5.98595C9.44992 6.26447 9.57423 6.61358 9.57345 6.9736C9.56375 7.38511 9.39111 7.77595 9.09345 8.06027H9.12678Z"
                    fill="#858685"
                  />
                </svg>
              </span>
              <span className="location_content">
                {props.property.propertyAddress}
              </span>
            </div>
            <div className="roomCategoryAndSizeContainer">
              <div className="category_container">{t("inclusive")}</div>
              <div className="roomSizeContainer">
                {props.currentRoom.areaInSquareFeet} ft
              </div>
            </div>
            <div className="maximumNumberOfGuestsContainer">
              <svg
                className="guest_count_icon"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.4733 8.47374C11.1269 7.95951 11.604 7.25436 11.8382 6.45637C12.0723 5.65838 12.0519 4.80725 11.7799 4.02139C11.5078 3.23552 10.9975 2.554 10.32 2.07165C9.64259 1.58929 8.83163 1.33008 8 1.33008C7.16836 1.33008 6.35741 1.58929 5.67995 2.07165C5.0025 2.554 4.49223 3.23552 4.22014 4.02139C3.94805 4.80725 3.92767 5.65838 4.16184 6.45637C4.396 7.25436 4.87307 7.95951 5.52666 8.47374C4.40672 8.92244 3.42952 9.66664 2.69926 10.627C1.969 11.5874 1.51304 12.7279 1.38 13.9271C1.37037 14.0146 1.37808 14.1032 1.40268 14.1878C1.42729 14.2723 1.46831 14.3512 1.52341 14.42C1.63468 14.5587 1.79652 14.6476 1.97333 14.6671C2.15014 14.6865 2.32744 14.6349 2.46621 14.5237C2.60499 14.4124 2.69388 14.2506 2.71333 14.0737C2.85972 12.7705 3.48112 11.5669 4.45881 10.6929C5.4365 9.81892 6.70193 9.33576 8.01333 9.33576C9.32473 9.33576 10.5902 9.81892 11.5679 10.6929C12.5455 11.5669 13.1669 12.7705 13.3133 14.0737C13.3315 14.2376 13.4096 14.3888 13.5327 14.4984C13.6559 14.608 13.8152 14.6681 13.98 14.6671H14.0533C14.2281 14.647 14.3878 14.5586 14.4977 14.4212C14.6076 14.2839 14.6587 14.1086 14.64 13.9337C14.5063 12.7312 14.0479 11.5877 13.3139 10.6259C12.5799 9.66402 11.5979 8.92006 10.4733 8.47374ZM8 8.00041C7.47258 8.00041 6.95701 7.84401 6.51848 7.55099C6.07995 7.25798 5.73815 6.8415 5.53632 6.35423C5.33449 5.86696 5.28168 5.33078 5.38457 4.8135C5.48746 4.29622 5.74144 3.82106 6.11438 3.44812C6.48732 3.07518 6.96247 2.82121 7.47976 2.71831C7.99704 2.61542 8.53322 2.66823 9.02049 2.87006C9.50776 3.0719 9.92423 3.41369 10.2173 3.85222C10.5103 4.29075 10.6667 4.80633 10.6667 5.33374C10.6667 6.04099 10.3857 6.71926 9.88562 7.21936C9.38552 7.71946 8.70724 8.00041 8 8.00041Z"
                  fill="#858685"
                />
              </svg>
              <span className="numberOfGuests_content">
                {props.currentRoom.maxCapacity}
              </span>
            </div>
            <div className="bedInformation">
              <span className="bedIconSpan">
                <svg
                  className="bedIcon"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3334 2.33301H2.66675C2.13631 2.33301 1.62761 2.54372 1.25253 2.91879C0.877462 3.29387 0.666748 3.80257 0.666748 4.33301V12.9997C0.666748 13.1765 0.736986 13.3461 0.86201 13.4711C0.987034 13.5961 1.1566 13.6663 1.33341 13.6663H4.00008C4.10989 13.6658 4.21785 13.6381 4.31438 13.5858C4.41091 13.5334 4.49302 13.458 4.55341 13.3663L5.69341 11.6663H10.3067L11.4467 13.3663C11.5071 13.458 11.5892 13.5334 11.6858 13.5858C11.7823 13.6381 11.8903 13.6658 12.0001 13.6663H14.6667C14.8436 13.6663 15.0131 13.5961 15.1382 13.4711C15.2632 13.3461 15.3334 13.1765 15.3334 12.9997V4.33301C15.3334 3.80257 15.1227 3.29387 14.7476 2.91879C14.3726 2.54372 13.8638 2.33301 13.3334 2.33301ZM14.0001 12.333H12.3601L11.2201 10.6663C11.1637 10.5684 11.0833 10.4865 10.9865 10.4282C10.8897 10.3699 10.7797 10.3371 10.6667 10.333H5.33341C5.22361 10.3336 5.11565 10.3613 5.01911 10.4136C4.92258 10.4659 4.84047 10.5413 4.78008 10.633L3.64008 12.333H2.00008V8.99967H14.0001V12.333ZM4.66675 7.66634V6.99967C4.66675 6.82286 4.73699 6.65329 4.86201 6.52827C4.98703 6.40325 5.1566 6.33301 5.33341 6.33301H6.66675C6.84356 6.33301 7.01313 6.40325 7.13815 6.52827C7.26318 6.65329 7.33341 6.82286 7.33341 6.99967V7.66634H4.66675ZM8.66675 7.66634V6.99967C8.66675 6.82286 8.73699 6.65329 8.86201 6.52827C8.98703 6.40325 9.1566 6.33301 9.33341 6.33301H10.6667C10.8436 6.33301 11.0131 6.40325 11.1382 6.52827C11.2632 6.65329 11.3334 6.82286 11.3334 6.99967V7.66634H8.66675ZM14.0001 7.66634H12.6667V6.99967C12.6667 6.46924 12.456 5.96053 12.081 5.58546C11.7059 5.21039 11.1972 4.99967 10.6667 4.99967H9.33341C8.84004 5.00261 8.36517 5.18781 8.00008 5.51967C7.63499 5.18781 7.16012 5.00261 6.66675 4.99967H5.33341C4.80298 4.99967 4.29427 5.21039 3.9192 5.58546C3.54413 5.96053 3.33341 6.46924 3.33341 6.99967V7.66634H2.00008V4.33301C2.00008 4.1562 2.07032 3.98663 2.19534 3.8616C2.32037 3.73658 2.48994 3.66634 2.66675 3.66634H13.3334C13.5102 3.66634 13.6798 3.73658 13.8048 3.8616C13.9298 3.98663 14.0001 4.1562 14.0001 4.33301V7.66634Z"
                    fill="#5D5D5D"
                  />
                </svg>
              </span>
              <span className="bed_content">
                {props.currentRoom.singleBed != 0
                  ? `${t("king")} - ${props.currentRoom.singleBed} `
                  : ""}
                {props.currentRoom.doubleBed != 0
                  ? `${t("queen")} - ${props.currentRoom.doubleBed}`
                  : ""}
              </span>
            </div>
          </div>
        </div>
        {props.globalPromotion.allApplicablePromotions.length != 0 && (
          <div className="promotionOfRoomType">
            <div className="BannerOfSpecialDeal">
              <div className="banner_title_of_promotion">
                {t("specialDeal")}
              </div>
              <svg
                width="121"
                height="32"
                viewBox="0 0 121 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M120.759 0H0V32H120.759L112.775 14.9677L120.759 0Z"
                  fill="#26266D"
                />
              </svg>
            </div>
            <div className="descriptionOfSpecialDeal">
              {t(`${props.globalPromotion.highestPromotion.promotionTitle}.description`)}
            </div>
          </div>
        )}
        <div className="price_containerOfRoomType">
          <div className="minimumPriceOfRoomType">
            {(CurrencySymbols as any)[currentSelectedCurrency]}
            {updatePrice(props.currentRoom.price)}
          </div>
          <div className="priceLabelContainer">{t("perNight")}</div>
          <button
            className="selectRoom-btn"
            onClick={() => {
              setOpen(true);
              changeStepperState();
            }}
          >
            {t("selectRoom")}
          </button>
          <RoomModal
            open={open}
            updateOpen={updateOpen}
            room={props}
            globalPromotions={props.globalPromotion}
          />
        </div>
      </div>
    </div>
  );
}

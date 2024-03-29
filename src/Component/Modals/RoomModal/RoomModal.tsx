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
import { GlobalPromotions, Promotion, SuccessfulCustomPromo } from "../../../types/PromotionList";
import axios from "axios";
import { useEffect, useState } from "react";
import { Exception } from "@sentry/react";
import { availableParallelism } from "os";
interface IRoomModal {
  open: boolean;
  updateOpen: (data: boolean) => void;
  room: RoomCardProp;
  globalPromotions: GlobalPromotions;
}
export default function RoomModal(props: IRoomModal) {
  const reduxDispatch: AppDispatch = useDispatch();
  const [promoCode, setPromoCode] = useState('');
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
  const [promotionsAvailable,setpromotionsAvailable] = useState<Promotion[]>([]);
  useEffect(()=>{

    setpromotionsAvailable(props.globalPromotions.allApplicablePromotions)
  },[])
  function changeStepperState() {
    reduxDispatch(increaseStepperState(stepperState + 1));
  }
  function updateItinerary() {
    const itinerary: IItinerary = {
      propertyName: props.room.currentRoom.roomTypeName,
      priceOfRoomTypeInParticularDate:
        props.room.currentRoom.priceOfRoomTypeInParticularDate,
      promoCode: "",
      roomCount: selectedRooms,
      startDate: startDate,
      endDate: endDate,
      guestCount: guestCount,
    };
    reduxDispatch(setItineraryDetails(itinerary));
  }

  async function checkCustomPromoCode(){
    const customPromoCodeUrl = `http://localhost:8000/api/v1/promocode?promotionCode=${promoCode}&roomTypeId=${props.room.currentRoom.roomTypeId}`;
    try{
      const customPromotionCard = await axios.get(customPromoCodeUrl);
      console.log(customPromotionCard.data);
      const succesfulCustomPromo : SuccessfulCustomPromo= customPromotionCard.data;
      const customPromo : Promotion = {
        "minimumDaysOfStay":1,
        "priceFactor":succesfulCustomPromo.priceFactor,
        "promotionDescription":succesfulCustomPromo.promotionDescription,
        "promotionTitle":succesfulCustomPromo.promotionName,
        "promotionId":promotionsAvailable.length + 1

      }
      setpromotionsAvailable((previousPromotions : Promotion[]) => [...previousPromotions, customPromo]);
    }catch(error){
      console.log(error.response.data.message);
    }
  }
  const navigate = useNavigate();
  return (
    <div className="modal-Container_custom" style={{ width: "80vw"}}>
      <Modal
        open={props.open}
        classNames={{ modal: "custom_modal" }}
        onClose={() => props.updateOpen(false)}
      >
        <div className="nameOfTheRoomType">{props.room.currentRoom.roomTypeName}</div>
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
                    <div className="maximumGuest_inRoomType">{props.room.currentRoom.maxCapacity}</div>
                    <div className="beds_in_roomType">queen</div>
                    <div className="area_of_room_type">{props.room.currentRoom.areaInSquareFeet} ft</div>
                  </div>
                  <div className="descriptionOfRoomType">
                    {props.room.currentRoom.description}
                  </div>
                </div>
                <div className="roomModalInforamtion-rightContainer">
                  <div className="amenitiesTitleContainer">Amenitities</div>
                  <div className="amenitiesListContainer">
                    {
                      props.room.currentRoom.amenitiesOfRoom.map((currentAmenity,index)=>{
                        return (
                          <div className="individual_amenity" key={index}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_5027_1810)">
                              <path
                                d="M11.4812 6.25551C11.4846 6.44981 11.4125 6.63785 11.28 6.78003L7.78 10.28C7.63937 10.4205 7.44875 10.4994 7.25 10.4994C7.05125 10.4994 6.86062 10.4205 6.72 10.28L4.72 8.28003C4.58752 8.13785 4.5154 7.94981 4.51882 7.75551C4.52225 7.56121 4.60096 7.37582 4.73838 7.23841C4.87579 7.10099 5.06118 7.02228 5.25548 7.01885C5.44978 7.01543 5.63782 7.08755 5.78 7.22003L7.25 8.69003L10.22 5.72003C10.3622 5.58755 10.5502 5.51543 10.7445 5.51885C10.9388 5.52228 11.1242 5.60099 11.2616 5.73841C11.399 5.87582 11.4777 6.06121 11.4812 6.25551Z"
                                fill="#2F2F2F"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569ZM12.5962 12.5962C13.8152 11.3772 14.5 9.72391 14.5 8C14.5 6.27609 13.8152 4.62279 12.5962 3.40381C11.3772 2.18482 9.72391 1.5 8 1.5C6.27609 1.5 4.62279 2.18482 3.40381 3.40381C2.18482 4.62279 1.5 6.27609 1.5 8C1.5 9.72391 2.18482 11.3772 3.40381 12.5962C4.62279 13.8152 6.27609 14.5 8 14.5C9.72391 14.5 11.3772 13.8152 12.5962 12.5962Z"
                                fill="#2F2F2F"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_5027_1810">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          <span>{currentAmenity}</span>
                        </div>
                        )
                      })
                    }
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
                      Spend $10 every night you stay and earm $150 in dining credit at the resort.
                    </div>
                  </div>
                  <div className="right-container_rateBox">
                    <div className="rate_price_of_promotion">{props.room.currentRoom.price}</div>
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
                {
                  promotionsAvailable.map((individualPromotion,index)=>{
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
                    <div className="rate_price_of_promotion">{individualPromotion.priceFactor * props.room.currentRoom.price}</div>
                    <div className="perNightContainer">per Night</div>
                    <button className="selectPackageButton"
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
                    )
                  })
                }
              </div>
              <div className="applyPromoCodeContainer">
                <div className="promoCode_title">Enter a promo code</div>
                <input className="promo_code_enter_box" type="text"
                 value={promoCode}
                 onChange={(e) => setPromoCode(e.target.value)}
                 ></input>
                <button className="apply_promoCode_button" onClick={checkCustomPromoCode}>APPLY</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

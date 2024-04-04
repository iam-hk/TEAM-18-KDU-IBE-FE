import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface IItineraryPromo{
  promoCode:string,
  priceFactor: number,
  promotionDescription:string,
  promotionTitle: string,
  promotionId:number
}
export interface IItinerary {
  roomName: string;
  priceOfRoomTypeInParticularDate: { [key: string]: number };
  promoCodeInfo: IItineraryPromo;
  roomCount: number;
  startDate: string;
  endDate: string;
  guestCount: number[];
  roomTypeId:number;
}
const initialState: IItinerary = {
  roomName: "",
  priceOfRoomTypeInParticularDate: {},
  promoCodeInfo: {
    promoCode: "",
    priceFactor: 0,
    promotionDescription: "",
    promotionTitle: "",
    promotionId:0
  },
  roomCount: 0,
  startDate: "",
  endDate: "",
  guestCount: [],
  roomTypeId:0,
};
const ItinerarySlice = createSlice({
  name: "itineraryInfo",
  initialState,
  reducers: {
    setItineraryDetails(state, action: PayloadAction<IItinerary>) {
      state.roomName = action.payload.roomName;
      state.priceOfRoomTypeInParticularDate =
      action.payload.priceOfRoomTypeInParticularDate;
      state.guestCount = action.payload.guestCount;
      state.roomCount = action.payload.roomCount;
      state.promoCodeInfo=action.payload.promoCodeInfo;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.roomTypeId=action.payload.roomTypeId;
    },
    setDefaultValues(state) {
      state.roomName = "";
      state.priceOfRoomTypeInParticularDate = {};
      state.guestCount = [];
      state.roomCount = 0;
      state.promoCodeInfo = { 
        promoCode: "",
        priceFactor: 0,
        promotionDescription: "",
        promotionTitle: "",
        promotionId:0
      };
      state.startDate = "";
      state.endDate = "";
      state.roomTypeId=0;
    },
  },
});
export const { setItineraryDetails, setDefaultValues } = ItinerarySlice.actions;
export const ItineraryReducer = ItinerarySlice.reducer;

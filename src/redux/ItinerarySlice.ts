import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface IItineraryPromo{
  promoCode:string,
  priceFactor: number,
  promotionDescription:string,
  promotionTitle: string,
}
export interface IItinerary {
  roomName: string;
  priceOfRoomTypeInParticularDate: { [key: string]: number };
  promoCodeInfo: IItineraryPromo;
  roomCount: number;
  startDate: string;
  endDate: string;
  guestCount: number[];
}
const initialState: IItinerary = {
  roomName: "",
  priceOfRoomTypeInParticularDate: {},
  promoCodeInfo: {
    promoCode: "",
    priceFactor: 0,
    promotionDescription: "",
    promotionTitle: ""
  },
  roomCount: 0,
  startDate: "",
  endDate: "",
  guestCount: [],
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
        promotionTitle: ""
      };
      state.startDate = "";
      state.endDate = "";
    },
  },
});
export const { setItineraryDetails, setDefaultValues } = ItinerarySlice.actions;
export const ItineraryReducer = ItinerarySlice.reducer;
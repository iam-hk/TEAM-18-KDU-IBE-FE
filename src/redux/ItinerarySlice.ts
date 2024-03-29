import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface IItinerary {
  propertyName: string;
  priceOfRoomTypeInParticularDate: { [key: string]: number };
  promoCode: string;
  roomCount: number;
  startDate: string;
  endDate: string;
  guestCount: number[];
}
const initialState: IItinerary = {
  propertyName: "",
  priceOfRoomTypeInParticularDate: {},
  promoCode: "",
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
      state.propertyName = action.payload.propertyName;
      state.priceOfRoomTypeInParticularDate =
        action.payload.priceOfRoomTypeInParticularDate;
      state.guestCount = action.payload.guestCount;
      state.roomCount = action.payload.roomCount;
      state.promoCode = action.payload.promoCode;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
    },
    setDefaultValues(state) {
      state.propertyName = "";
      state.priceOfRoomTypeInParticularDate = {};
      state.guestCount = [];
      state.roomCount = 0;
      state.promoCode = "";
      state.startDate = "";
      state.endDate = "";
    },
  },
});
export const { setItineraryDetails, setDefaultValues } = ItinerarySlice.actions;
export const ItineraryReducer = ItinerarySlice.reducer;

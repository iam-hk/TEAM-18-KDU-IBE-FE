import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface IItineraryPromo {
  promoCode: string;
  priceFactor: number;
  promotionDescription: string;
  promotionTitle: string;
  promotionId: number;
}
export interface IPriceDetails {
  nightlyRate: number;
  subtotal: number;
  taxes: number;
  vat: number;
  totalPayment: number;
  promoDiscount: number;
  dueNow: number;
  dueAtResort: number;
}
export interface IItinerary {
  roomName: string;
  priceOfRoomTypeInParticularDate: { [key: string]: number };
  promoCodeInfo: IItineraryPromo;
  roomCount: number;
  startDate: string;
  endDate: string;
  guestCount: number[];
  roomTypeId: number;
  priceDetails: IPriceDetails;
  imageUrl:string,
}
const initialState: IItinerary = {
  roomName: "",
  priceOfRoomTypeInParticularDate: {},
  promoCodeInfo: {
    promoCode: "",
    priceFactor: 0,
    promotionDescription: "",
    promotionTitle: "",
    promotionId: 0,
  },
  priceDetails: {
    nightlyRate: 0,
    subtotal: 0,
    taxes: 0,
    vat: 0,
    totalPayment: 0,
    promoDiscount: 0,
    dueNow: 0,
    dueAtResort: 0,
  },
  roomCount: 0,
  startDate: "",
  endDate: "",
  guestCount: [],
  roomTypeId: 0,
  imageUrl:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww"
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
      state.promoCodeInfo = action.payload.promoCodeInfo;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.roomTypeId = action.payload.roomTypeId;
      state.priceDetails=action.payload.priceDetails;
      state.imageUrl=action.payload.imageUrl;
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
        promotionId: 0,
      };
      state.priceDetails = {
        nightlyRate: 0,
        subtotal: 0,
        taxes: 0,
        vat: 0,
        totalPayment: 0,
        promoDiscount: 0,
        dueNow: 0,
        dueAtResort: 0,
      };
      state.startDate = "";
      state.endDate = "";
      state.roomTypeId = 0;
    },
    setNightlyRate: (state, action: PayloadAction<number>) => {
      state.priceDetails.nightlyRate = action.payload;
    },
    setSubtotal: (state, action: PayloadAction<number>) => {
      state.priceDetails.subtotal = action.payload;
    },
    setTaxes: (state, action: PayloadAction<number>) => {
      state.priceDetails.taxes = action.payload;
    },
    setVat: (state, action: PayloadAction<number>) => {
      state.priceDetails.vat = action.payload;
    },
    setTotalPayment: (state, action: PayloadAction<number>) => {
      state.priceDetails.totalPayment = action.payload;
    },
    setPromoDiscount: (state, action: PayloadAction<number>) => {
      state.priceDetails.promoDiscount = action.payload;
    },
    setDueNow: (state, action: PayloadAction<number>) => {
      state.priceDetails.dueNow = action.payload;
    },
    setDueAtResort: (state, action: PayloadAction<number>) => {
      state.priceDetails.dueAtResort = action.payload;
    },
  },
});
export const {
  setItineraryDetails,
  setDefaultValues,
  setNightlyRate,
  setSubtotal,
  setTaxes,
  setTotalPayment,
  setVat,
  setPromoDiscount,
  setDueAtResort,
  setDueNow,
} = ItinerarySlice.actions;
export const ItineraryReducer = ItinerarySlice.reducer;

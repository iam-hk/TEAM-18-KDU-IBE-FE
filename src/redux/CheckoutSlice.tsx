import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICountry, ICity, IState, Country } from "country-state-city";
export interface ITravelerInfo {
  tfirstName: string;
  tlastName: string;
  tphone: string;
  temail: string;
}
export interface IBillingInfo {
  firstName: string;
  lastName: string;
  mailPrimary: string;
  mailSecondary: string;
  country: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  isoCode: string;
}
export interface IPromo{
      promoCode:string,
      priceFactor: number,
      promotionDescription: string,
      promotionTitle: string,
      promotionId:number
}
export interface IPaymentInfo {
  cardNumber: string;
  expMM: string;
  expYY: string;
  specialOffers: boolean;
}
export interface IConformationDetails {
  roomName: string;
  startDate: string;
  endDate: string;
  roomTypeId: number;
  guestCount: number[];
  promoCodeInfo: IPromo;
  roomCount: number;

}
interface ICheckoutPage {
  travelerInfo: ITravelerInfo;
  billingInfo: IBillingInfo;
  paymentInfo: IPaymentInfo;
  conformationDetails: IConformationDetails;
  currentIndex: number;
  termsAndPolicies: boolean;
  countriesInSlice: ICountry[];
  cityInSlice: ICity[];
  stateInSlice: IState[];
}
const initialState: ICheckoutPage = {
  travelerInfo: {
    tfirstName: "",
    tlastName: "",
    tphone: "",
    temail: "",
  },
  billingInfo: {
    firstName: "",
    lastName: "",
    mailPrimary: "",
    mailSecondary: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    isoCode: "",
  },
  paymentInfo: {
    cardNumber: "",
    expMM: "",
    expYY: "",
    specialOffers: false,
  },
  conformationDetails: {
    roomName: "",
    startDate: "",
    endDate: "",
    roomTypeId: 0,
    guestCount: [],
    promoCodeInfo: {
      promoCode: "",
      priceFactor: 0,
      promotionDescription: "",
      promotionTitle: "",
      promotionId:0
    },
    roomCount: 0,
  },
  currentIndex: 0,
  termsAndPolicies: false,
  countriesInSlice: Country.getAllCountries(),
  stateInSlice: [],
  cityInSlice: [],
};
const CheckoutSlice = createSlice({
  name: "checkoutRoom",
  initialState,
  reducers: {
    setTravlerInfo: (state, action: PayloadAction<ITravelerInfo>) => {
      state.travelerInfo = action.payload;
      console.log(state.travelerInfo);
    },
    setBillingInfo: (state, action: PayloadAction<IBillingInfo>) => {
      state.billingInfo = action.payload;
    },
    setPaymentInfo: (state, action: PayloadAction<IPaymentInfo>) => {
      console.log(action.payload);
      state.paymentInfo = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setTermsAndPolicies: (state, action: PayloadAction<boolean>) => {
      state.termsAndPolicies = action.payload;
    },
    setCountries: (state, action: PayloadAction<ICountry[]>) => {
      state.countriesInSlice = action.payload;
    },
    setStates: (state, action: PayloadAction<IState[]>) => {
      state.stateInSlice = action.payload;
    },
    setCitySlice: (state, action: PayloadAction<ICity[]>) => {
      state.cityInSlice = action.payload;
    },
    setCheckoutPage: (state, action: PayloadAction<IConformationDetails>) => {
      console.log(action.payload);
      state.conformationDetails = action.payload;
    },
  },
});
export const {
  setTravlerInfo,
  setBillingInfo,
  setPaymentInfo,
  setCurrentIndex,
  setTermsAndPolicies,
  setCountries,
  setStates,
  setCitySlice,
  setCheckoutPage,
} = CheckoutSlice.actions;
export const CheckoutReducer = CheckoutSlice.reducer;

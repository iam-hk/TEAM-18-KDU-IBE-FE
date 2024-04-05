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
export interface IPromo {
  promoCode: string;
  priceFactor: number;
  promotionDescription: string;
  promotionTitle: string;
  promotionId: number;
}
export interface IPaymentInfo {
  cardNumber: string;
  expMM: string;
  expYY: string;
}
export interface IConformationDetails {
  roomName: string;
  startDate: string;
  endDate: string;
  roomTypeId: number;
  guestCount: number[];
  promoCodeInfo: IPromo;
  roomCount: number;
  adultCount: number;
  childCount: number;
  totalCost: number;
  amountDueAtResort: number;
  propertyId: number;
  nightlyRate: number;
  subtotal: number;
  taxes: number;
  vat: number;
}
interface ICheckoutPage {
  travelerInfo: ITravelerInfo;
  billingInfo: IBillingInfo;
  paymentInfo: IPaymentInfo;
  conformationDetails: IConformationDetails;
  currentIndex: number;
  termsAndPolicies: boolean;
  specialOffers: boolean;
  // countriesInSlice: ICountry[];
  // cityInSlice: ICity[];
  // stateInSlice: IState[];
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
      promotionId: 0,
    },
    roomCount: 0,
    adultCount: 0,
    childCount: 0,
    totalCost: 0,
    amountDueAtResort: 0,
    propertyId: 18,
    nightlyRate: 0,
    subtotal: 0,
    taxes: 0,
    vat: 0,
  },
  currentIndex: 0,
  termsAndPolicies: false,
  specialOffers: false,
};
const CheckoutSlice = createSlice({
  name: "checkoutRoom",
  initialState,
  reducers: {
    setSpecialOffer: (state) => {
      state.specialOffers = !state.specialOffers;
    },
    setTravlerInfo: (state, action: PayloadAction<ITravelerInfo>) => {
      state.travelerInfo = action.payload;
    },
    setBillingInfo: (state, action: PayloadAction<IBillingInfo>) => {
      state.billingInfo = action.payload;   
    },
    setPaymentInfo: (state, action: PayloadAction<IPaymentInfo>) => {
      state.paymentInfo = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setTermsAndPolicies: (state, action: PayloadAction<boolean>) => {
      state.termsAndPolicies = action.payload;
    },
    setCheckoutPage: (state, action: PayloadAction<IConformationDetails>) => {
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
  setCheckoutPage,
  setSpecialOffer,
} = CheckoutSlice.actions;
export const CheckoutReducer = CheckoutSlice.reducer;

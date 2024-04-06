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
export interface IConfirmationDetails {
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
  subTotal: number;
  taxes: number;
  vat: number;
}
export interface ICheckoutPage {
  travelerInfo: ITravelerInfo;
  billingInfo: IBillingInfo;
  paymentInfo: IPaymentInfo;
  confirmationDetails: IConfirmationDetails;
  currentIndex: number;
  termsAndPolicies: boolean;
  specialOffers: boolean;
  imageUrl: string;
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
  confirmationDetails: {
    roomName: "",
    startDate: "2024-04-20",
    endDate: "2024-04-24",
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
    subTotal: 0,
    taxes: 0,
    vat: 0,
  },
  currentIndex: 0,
  termsAndPolicies: false,
  specialOffers: false,
  imageUrl:
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww",
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
      console.log(state.paymentInfo);
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setTermsAndPolicies: (state, action: PayloadAction<boolean>) => {
      state.termsAndPolicies = action.payload;
    },
    setCheckoutPage: (state, action: PayloadAction<IConfirmationDetails>) => {
      state.confirmationDetails = action.payload;
      console.log(state.confirmationDetails);
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
      console.log(state.imageUrl);
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
  setImage,
} = CheckoutSlice.actions;
export const CheckoutReducer = CheckoutSlice.reducer;

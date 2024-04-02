import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
}
export interface IPaymentInfo {
  cardNumber: string;
  expMM: string;
  expYY: string;
  cvv: string;
}
interface ICheckoutPage {
  travelerInfo: ITravelerInfo;
  billingInfo: IBillingInfo;
  paymentInfo: IPaymentInfo;
  currentIndex: number;
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
  },
  paymentInfo: {
    cardNumber: "",
    expMM: "",
    expYY: "",
    cvv: "",
  },
  currentIndex: 0,
};
const CheckoutSlice = createSlice({
  name: "checkoutRoom",
  initialState,
  reducers: {
    setTravlerInfo: (state, action: PayloadAction<ITravelerInfo>) => {
      state.travelerInfo = action.payload;
    },
    setTravelerFirstName: (state, action: PayloadAction<string>) => {
      state.travelerInfo.tfirstName = action.payload;
    },
    setTravelerLastName: (state, action: PayloadAction<string>) => {
      state.travelerInfo.tlastName = action.payload;
    },
    setTravelerPhone: (state, action: PayloadAction<string>) => {
      state.travelerInfo.tphone = action.payload;
    },
    setTravelerEmail: (state, action: PayloadAction<string>) => {
      state.travelerInfo.temail = action.payload;
    },
    setBillingInfo: (state, action: PayloadAction<IBillingInfo>) => {
      state.billingInfo = action.payload;
    },
    setBillingFirstName: (state, action: PayloadAction<string>) => {
      state.billingInfo.firstName = action.payload;
    },
    setBillingLastName: (state, action: PayloadAction<string>) => {
      state.billingInfo.lastName = action.payload;
    },
    setBillingMailPrimary: (state, action: PayloadAction<string>) => {
      state.billingInfo.mailPrimary = action.payload;
    },
    setBillingMailSecondary: (state, action: PayloadAction<string>) => {
      state.billingInfo.mailSecondary = action.payload;
    },
    setBillingCountry: (state, action: PayloadAction<string>) => {
      state.billingInfo.country = action.payload;
    },
    setBillingCity: (state, action: PayloadAction<string>) => {
      state.billingInfo.city = action.payload;
    },
    setBillingState: (state, action: PayloadAction<string>) => {
      state.billingInfo.state = action.payload;
    },
    setBillingZip: (state, action: PayloadAction<string>) => {
      state.billingInfo.zip = action.payload;
    },
    setBillingPhone: (state, action: PayloadAction<string>) => {
      state.billingInfo.phone = action.payload;
    },
    setBillingEmail: (state, action: PayloadAction<string>) => {
      state.billingInfo.email = action.payload;
    },
    setPaymentInfo: (state, action: PayloadAction<IPaymentInfo>) => {
      state.paymentInfo = action.payload;
    },
    setPaymentCardNumber: (state, action: PayloadAction<string>) => {
        state.paymentInfo.cardNumber = action.payload;
    },
    setPaymentExpMM: (state, action: PayloadAction<string>) => {
        state.paymentInfo.expMM = action.payload;
    },
    setPaymentExpYY: (state, action: PayloadAction<string>) => {
        state.paymentInfo.expYY = action.payload;
    },
    setPaymentCVV: (state, action: PayloadAction<string>) => {
        state.paymentInfo.cvv = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
  },
});
export const {
    setTravlerInfo,
    setTravelerFirstName,
    setTravelerLastName,
    setTravelerPhone,
    setTravelerEmail,
    setBillingInfo,
    setBillingFirstName,
    setBillingLastName,
    setBillingMailPrimary,
    setBillingMailSecondary,
    setBillingCountry,
    setBillingCity,
    setBillingState,
    setBillingZip,
    setBillingPhone,
    setBillingEmail,
    setPaymentInfo,
    setPaymentCardNumber,
    setPaymentExpMM,
    setPaymentExpYY,
    setPaymentCVV,
    setCurrentIndex,
} = CheckoutSlice.actions;
export const CheckoutReducer = CheckoutSlice.reducer;

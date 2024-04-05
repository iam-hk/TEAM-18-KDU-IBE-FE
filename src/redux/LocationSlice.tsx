import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICountry, ICity, IState, Country } from "country-state-city";
export interface ICountryDetails {
    countriesInSlice: ICountry[];
    cityInSlice: ICity[];
    stateInSlice: IState[];
}
const initialState: ICountryDetails = {
  countriesInSlice: Country.getAllCountries(),
  stateInSlice: [],
  cityInSlice: [],
};
const LocationSlice =createSlice({
  name: "locations",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<ICountry[]>) => {
      state.countriesInSlice = action.payload;
    },
    setStates: (state, action: PayloadAction<IState[]>) => {
      state.stateInSlice = action.payload;
    },
    setCitySlice: (state, action: PayloadAction<ICity[]>) => {
      state.cityInSlice = action.payload;
    },
  },
});
export const {
  setCountries,
  setStates,
  setCitySlice,
} = LocationSlice.actions;
export const LocationReducer = LocationSlice.reducer;

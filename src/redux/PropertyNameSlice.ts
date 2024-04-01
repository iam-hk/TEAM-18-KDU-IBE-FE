import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EachProperty, ListProperties } from "../types/PropertyName";
import { getPropertyNames } from "./thunk/GetPropertyNames";
export interface IPropertyResponse {
  data: ListProperties;
}
interface IPropertySlice {
  propertyResponse: EachProperty[];
  propertyList: string[];
  state: string;
  errorMessage: string;
}
const initialState: IPropertySlice = {
  propertyResponse: [],
  propertyList: [],
  state: "",
  errorMessage: "",
};
const PropertyNameSlice = createSlice({
  name: "propertyNameInfo",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPropertyNames.pending, (state) => {
        state.state = "pending";
      })
      .addCase(
        getPropertyNames.fulfilled,
        (state, action: PayloadAction<IPropertyResponse>) => {
          state.state = "fulfilled";
          state.propertyResponse = action.payload.data.listProperties;
          state.propertyList = state.propertyResponse.map(
            (property) => property.property_name
          );
        }
      )
      .addCase(getPropertyNames.rejected, (state, action) => {
        state.errorMessage = action.error.message!;
        state.state = "rejected";
      });
  },
});

export const PropertyNameReducer = PropertyNameSlice.reducer;

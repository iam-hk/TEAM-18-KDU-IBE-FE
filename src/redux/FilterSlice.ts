import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPropertyConfig } from "./thunk/GetPropertyConfig";
import { IEachGuest } from "../types/PropertyConfig";
import { Filter, Sorting } from "../types/PropertyConfigs";
interface IFilterSlice {
  appliedFilters: string[]
}
const initialState: IFilterSlice = {
  appliedFilters:[],
};
const FilterSlice = createSlice({
  name: "filterInfo",
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction<string>) => {
      state.appliedFilters.push(action.payload);
      console.log(state.appliedFilters);
    },
    removeFilters: (state,action : PayloadAction<string>)=>{
      const itemToRemove = action.payload;
      state.appliedFilters = state.appliedFilters.filter(item => item !== itemToRemove);
    }
  },
});
export const {
  removeFilters,
  addFilters
} = FilterSlice.actions;
export const FilterReducer = FilterSlice.reducer;

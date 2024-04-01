import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IFilterSlice {
  displaySortName : string;
  appliedFilters: string[];
  isFilterVisible: boolean[];
}
const initialState: IFilterSlice = {
  displaySortName:"Select",
  appliedFilters: [],
  isFilterVisible: [],
};
const FilterSlice = createSlice({
  name: "filterInfo",
  initialState,
  reducers: {
    addFilters: (state, action: PayloadAction<string>) => {
      const filterToAdd = action.payload;
      if (!state.appliedFilters.includes(filterToAdd)) {
        state.appliedFilters.push(filterToAdd);
      }
    },
    removeFilters: (state, action: PayloadAction<string>) => {
      const itemToRemove = action.payload;
      state.appliedFilters = state.appliedFilters.filter(
        (item) => item !== itemToRemove
      );
    },
    updateSortDisplay:(state,action: PayloadAction<string>)=>{
      state.displaySortName = action.payload;
    },
    toggleFilterVisibility(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.isFilterVisible[index] = !state.isFilterVisible[index];
    },
    setAllFilterOptions(state) {
      state.isFilterVisible = Array(state.isFilterVisible.length).fill(false);
    },
  },
});
export const {
  removeFilters,
  addFilters,
  updateSortDisplay,
  toggleFilterVisibility,
  setAllFilterOptions,
} = FilterSlice.actions;
export const FilterReducer = FilterSlice.reducer;

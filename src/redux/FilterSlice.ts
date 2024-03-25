import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IFilterSlice {
  appliedFilters: string[];
  isFilterVisible: boolean[];
}
const initialState: IFilterSlice = {
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
  toggleFilterVisibility,
  setAllFilterOptions,
} = FilterSlice.actions;
export const FilterReducer = FilterSlice.reducer;

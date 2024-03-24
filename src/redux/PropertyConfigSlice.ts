import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPropertyConfig } from "./thunk/GetPropertyConfig";
import { IEachGuest } from "../types/PropertyConfig";
import { Filter, Sorting } from "../types/PropertyConfigs";
interface IPropertyConfigSlice {
  guests: IEachGuest[];
  promocode: [];
  showDisabilityOption: boolean;
  showGuestSearch: boolean;
  showRoomSearch: boolean;
  guestDisplayInfo: string;
  guestCounts: number[];
  adultIndex: number;
  state: string;
  errorMessage: string;
  roomType: boolean;
  bedType: boolean;
  maxBeds: number;
  maxCards: number;
  sorting: Sorting[];
  filters: Filter[];
  isFilterVisible: boolean[];
  selectedFilters: string[];
}
const initialState: IPropertyConfigSlice = {
  guests: [],
  promocode: [],
  showDisabilityOption: false,
  showGuestSearch: false,
  guestDisplayInfo: "",
  guestCounts: [],
  adultIndex: 0,
  showRoomSearch: false,
  state: "",
  errorMessage: "",
  roomType: false,
  bedType: false,
  maxBeds: 1,
  maxCards: 2,
  sorting: [],
  filters: [],
  isFilterVisible: [],
  selectedFilters: [],
};
const PropertyConfigSlice = createSlice({
  name: "propertyConfigInfo",
  initialState,
  reducers: {
    updateGuestCounts: (
      state,
      action: PayloadAction<{ index: number; increment: boolean }>
    ) => {
      const { index, increment } = action.payload;
      if (index >= 0 && index < state.guestCounts.length) {
        state.guestCounts[index] += increment ? 1 : -1;
        state.guestCounts[index] = Math.max(0, state.guestCounts[index]);
      }
    },
    updateAdultCount: (state, action: PayloadAction<number>) => {
      state.guestCounts[state.adultIndex] = action.payload;
    },
    updateGuestDispInfo: (state) => {
      let guestInfo = "";
      state.guestCounts.forEach((count, index) => {
        if (count > 0) {
          guestInfo += `${state.guests[index].type}=${count}, `;
        }
      });
      state.guestDisplayInfo = guestInfo.trim().slice(0, -1);
    },
    resetGuests: (state, action: PayloadAction<number>) => {
      state.guestCounts = state.guests.map((item) =>
        item.type === "Adults" ? action.payload : 0
      );
    },
    assignGuests: (state, action: PayloadAction<number[]>) => {
      console.log("hello", action.payload);
      state.guestCounts = action.payload;
    },
    toggleFilterVisibility(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.isFilterVisible[index] = !state.isFilterVisible[index];
    },
    toggleFilterOption(state, action: PayloadAction<{ filterIndex: number; option: string }>) {
      const { filterIndex, option } = action.payload;
      const index = state.selectedFilters[filterIndex].indexOf(option);
      if (index === -1) {
        state.selectedFilters[filterIndex].push(option);
      } else {
        state.selectedFilters[filterIndex].splice(index, 1);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPropertyConfig.pending, (state) => {
        state.state = "pending";
      })
      .addCase(
        getPropertyConfig.fulfilled,
        (state, action: PayloadAction<IPropertyConfigSlice>) => {
          console.log(action.payload);
          state.state = "fulfilled";
          state.guests = action.payload.guests;
          state.guestCounts = state.guests.map((item) =>
            item.type === "Adults" ? 1 : 0
          );
          state.promocode = action.payload.promocode;
          state.showDisabilityOption = action.payload.showDisabilityOption;
          state.showGuestSearch = action.payload.showGuestSearch;
          state.showRoomSearch = action.payload.showRoomSearch;
          const adultIndex = state.guests.findIndex(
            (guest) => guest.type === "Adults"
          );
          state.adultIndex = adultIndex !== -1 ? adultIndex : 0;
          state.roomType = action.payload.roomType;
          state.bedType = action.payload.bedType;
          state.maxBeds = action.payload.maxBeds;
          state.maxCards = action.payload.maxCards;
          state.sorting = action.payload.sorting;
          state.filters = action.payload.filters;
          state.isFilterVisible = new Array(state.filters.length).fill(false);
          state.selectedFilters = new Array(state.filters.length).fill([]);
          console.log(state.selectedFilters, "", " ", state.isFilterVisible);
        }
      )
      .addCase(getPropertyConfig.rejected, (state, action) => {
        state.errorMessage = action.error.message!;
        state.state = "rejected";
      });
  },
});
export const {
  updateGuestCounts,
  updateGuestDispInfo,
  updateAdultCount,
  resetGuests,
  assignGuests,
  toggleFilterOption,
  toggleFilterVisibility,
} = PropertyConfigSlice.actions;
export const PropertyConfigReducer = PropertyConfigSlice.reducer;

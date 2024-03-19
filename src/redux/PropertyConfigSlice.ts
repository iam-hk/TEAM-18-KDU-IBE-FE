import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPropertyConfig } from "./thunk/GetPropertyConfig";
import { IEachGuest } from "../types/PropertyConfig";
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
    resetGuests: (state,action:PayloadAction<number>) => {
      state.guestCounts = state.guests.map((item) =>
        item.type === "Adults" ? action.payload : 0
      );
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
} = PropertyConfigSlice.actions;
export const PropertyConfigReducer = PropertyConfigSlice.reducer;

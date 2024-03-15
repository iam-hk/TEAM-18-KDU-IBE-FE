import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import guestArray from "../Constants/GuestType";

interface ISearchSlice{
  guestDispInfo: string,
  guestCounts: number[],
  property: string,
  rooms: number,
}
const initialState: ISearchSlice = {
  guestDispInfo: "",
  guestCounts: guestArray.map((item) => (item.type === "Adults" ? 1 : 0)),
  property: "Property 18",
  rooms: 1,
};
const SearchSlice = createSlice({
  name: "searchInfo",
  initialState,
  reducers: {
    updateProperty: (state, action: PayloadAction<string>) => {
      state.property = action.payload;
    },
    updateRooms: (state, action: PayloadAction<number>) => {
      state.rooms = action.payload;
    },
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
    updateAdultCount:(state,action:PayloadAction<number>)=>{
        state.guestCounts[0]=action.payload;
    },
    updateGuestDispInfo: (state) => {
      let guestInfo = "";
      state.guestCounts.forEach((count, index) => {
        if (count > 0) {
          guestInfo += `${guestArray[index].type}: ${count}, `;
        }
      });
      state.guestDispInfo = guestInfo.trim().slice(0, -1);
    },
  },
});
export const {
  updateProperty,
  updateRooms,
  updateGuestCounts,
  updateGuestDispInfo,
  updateAdultCount
} = SearchSlice.actions;
export const SearchReducer = SearchSlice.reducer;

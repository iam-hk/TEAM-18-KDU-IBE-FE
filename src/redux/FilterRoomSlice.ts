import {createSlice } from "@reduxjs/toolkit";
interface IFilterRoom {
    bedType: boolean,
    roomType: boolean,
    bedTypeOptions: string[],
    roomTypeOptions: string[],

}
const initialState: IFilterRoom = {
          bedType: false,
          roomType: false,
          bedTypeOptions: [],
          roomTypeOptions: []
};
const FilterRoomSlice = createSlice({
  name: "filterRoom",
  initialState,
  reducers: {
    toggleBedTypeVisibility: (state) => {
      state.bedType = !state.bedType;
    },
    toggleRoomTypeVisibility: (state) => {
      state.roomType = !state.roomType;
    },
    toggleBedType: (state, action) => {
      const option = action.payload;
      const index = state.bedTypeOptions.indexOf(option);
      if (index === -1) {
        state.bedTypeOptions.push(option);
      } else {
        state.bedTypeOptions.splice(index, 1);
      }
    },
    toggleRoomType: (state, action) => {
      const option = action.payload;
      const index = state.roomTypeOptions.indexOf(option);
      if (index === -1) {
        state.roomTypeOptions.push(option);
      } else {
        state.roomTypeOptions.splice(index, 1);
      }
    }
  },
});
export const {
    toggleBedTypeVisibility,
    toggleRoomTypeVisibility,
    toggleBedType,
    toggleRoomType
  } = FilterRoomSlice.actions;
export const FilterRoomReducer = FilterRoomSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ISearchRoomSlice {
  rooms: number;
}
const initialState: ISearchRoomSlice = {
  rooms: 1,
};
const SearchRoomSlice = createSlice({
  name: "searchRoomInfo",
  initialState,
  reducers: {
    updateRooms: (state, action: PayloadAction<number>) => {
      state.rooms = action.payload;
    },
  },
});
export const { updateRooms } = SearchRoomSlice.actions;
export const SearchRoomReducer = SearchRoomSlice.reducer;

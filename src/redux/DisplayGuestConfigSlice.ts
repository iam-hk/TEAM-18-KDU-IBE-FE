import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IGuestConfig {
    guestDisplayInfo: string;
}
const initialState: IGuestConfig = {
  guestDisplayInfo:""
};
const FilterRoomSlice = createSlice({
  name: "guestDisplayInfo",
  initialState,
  reducers: {
    updateGuestDisplayInfo:(state,action:PayloadAction<string>)=>{
      state.guestDisplayInfo=action.payload;
    }
  },
});
export const {
 updateGuestDisplayInfo
} = FilterRoomSlice.actions;
export const FilterRoomReducer = FilterRoomSlice.reducer;

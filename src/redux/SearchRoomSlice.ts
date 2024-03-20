import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ISearchRoomSlice {
  rooms: number;
  startDate:string;
  endDate:string;
  selectedProperty:string;
}
const initialState: ISearchRoomSlice = {
  rooms: 1,
  startDate:"",
  endDate:"",
  selectedProperty:"",
};
const SearchRoomSlice = createSlice({
  name: "searchRoomInfo",
  initialState,
  reducers: {
    updateRooms: (state, action: PayloadAction<number>) => {
      state.rooms = action.payload;
    },
    updateStartDate:(state,action:PayloadAction<string>)=>{
      state.startDate = action.payload;
    },
    updateEndDate:(state,action:PayloadAction<string>)=>{
      state.endDate = action.payload;
    },
    updateSelectedProperty:(state,action: PayloadAction<string>)=>{
      state.selectedProperty = action.payload;
    }
  },
});
export const { updateRooms,updateEndDate,updateStartDate,updateSelectedProperty} = SearchRoomSlice.actions;
export const SearchRoomReducer = SearchRoomSlice.reducer;

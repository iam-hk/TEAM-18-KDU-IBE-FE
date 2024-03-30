import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface ISearchRoomSlice {
  beds: number;
  rooms: number;
  startDate: string;
  endDate: string;
  selectedProperty: string;
  dateInitial: boolean;
  isMilitaryVetran: boolean;
  seniorCitizen: boolean;
}
const initialState: ISearchRoomSlice = {
  beds: 1,
  rooms: 1,
  startDate: "",
  endDate: "",
  selectedProperty: "",
  dateInitial: false,
  isMilitaryVetran: false,
  seniorCitizen: false,
};
const SearchRoomSlice = createSlice({
  name: "searchRoomInfo",
  initialState,
  reducers: {
    updateRooms: (state, action: PayloadAction<number>) => {
      state.rooms = action.payload;
    },
    updateStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    updateEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    updateSelectedProperty: (state, action: PayloadAction<string>) => {
      state.selectedProperty = action.payload;
    },
    updateBeds: (state, action: PayloadAction<number>) => {
      state.beds = action.payload;
    },
    setDateInitials: (state, action: PayloadAction<boolean>) => {
      state.dateInitial = action.payload;
    },
    toggleIsMilitaryVetran: (state) => {
      state.isMilitaryVetran = !state.isMilitaryVetran;
    },
    toggleSeniorCitizen: (state) => {
      state.seniorCitizen = !state.seniorCitizen;
    },
  },
});
export const {
  updateRooms,
  updateEndDate,
  updateStartDate,
  updateSelectedProperty,
  updateBeds,
  setDateInitials,
  toggleIsMilitaryVetran,
  toggleSeniorCitizen,
} = SearchRoomSlice.actions;
export const SearchRoomReducer = SearchRoomSlice.reducer;
